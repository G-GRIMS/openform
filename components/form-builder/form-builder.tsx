'use client';

import { useState, useEffect } from 'react';
import { FormCanvas } from './form-canvas';
import { FieldPalette } from './field-palette';
import { FormSettings } from './form-settings';
import { PreviewMode } from './preview-mode';
import { LogicPanel } from './logic-panel';
import { Button } from '@/components/ui/button';
import { Eye, Save } from 'lucide-react';
import { useForm, useCreateForm, useFieldActions } from '@/lib/hooks/use-forms';
import {
    generateFieldKey,
    getDefaultFieldConfig,
} from '@/lib/utils/form-helpers';
import type { FormWithFields, FormField, FieldType } from '@/types/form';

interface FormBuilderProps {
    formId?: string;
    initialForm?: FormWithFields;
}

export function FormBuilder({ formId, initialForm }: FormBuilderProps) {
    // Load existing form if formId is provided
    const existingFormQuery = formId ? useForm(formId as any) : null;
    const existingForm = existingFormQuery || initialForm;

    // Form mutations
    const createForm = useCreateForm();
    const {
        createField,
        updateField: updateFieldMutation,
        deleteField: deleteFieldMutation,
        reorderFields,
    } = useFieldActions();

    // Local state
    const [fields, setFields] = useState<FormField[]>([]);
    const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [formTitle, setFormTitle] = useState('Untitled Form');
    const [formDescription, setFormDescription] = useState(
        'Build your form by adding fields',
    );
    const [viewMode, setViewMode] = useState('quick');
    const [logicPanelFieldId, setLogicPanelFieldId] = useState<string | null>(
        null,
    );
    const [isSaving, setIsSaving] = useState(false);

    // Initialize form data when existing form loads
    useEffect(() => {
        const form = existingForm || initialForm;
        if (form) {
            setFormTitle(form.title);
            setFormDescription(form.description);
            setFields(form.fields || []);
        }
    }, [existingForm, initialForm]);

    const addField = async (fieldType: FieldType) => {
        const fieldKey = generateFieldKey();
        const defaultConfig = getDefaultFieldConfig(fieldType);

        if (!formId) {
            // For new forms, add field to local state only
            const newField = {
                _id: fieldKey as any, // Temporary ID for local state
                formId: '' as any, // Will be set when form is created
                fieldKey,
                type: fieldType,
                label: defaultConfig.label || `${fieldType} Field`,
                required: defaultConfig.required || false,
                config: defaultConfig.config || {},
                order: fields.length,
            } as FormField;
            setFields([...fields, newField]);
            return;
        }

        // For existing forms, create field in Convex
        try {
            await createField({
                formId: formId as any,
                fieldKey,
                type: fieldType,
                label: defaultConfig.label || `${fieldType} Field`,
                required: defaultConfig.required || false,
                config: defaultConfig.config || {},
            });

            // Form data will automatically update via Convex subscription
        } catch (error) {
            console.error('Failed to create field:', error);
        }
    };

    const updateFieldLocal = (
        fieldKey: string,
        updates: Partial<FormField>,
    ) => {
        setFields(
            fields.map((f) =>
                f.fieldKey === fieldKey ? { ...f, ...updates } : f,
            ),
        );
    };

    const deleteFieldLocal = async (fieldId: string) => {
        if (formId) {
            // For existing forms, delete from Convex
            try {
                await deleteFieldMutation({ fieldId: fieldId as any });
            } catch (error) {
                console.error('Failed to delete field:', error);
                return;
            }
        }
        // Remove from local state
        setFields(fields.filter((f) => (f._id || f.fieldKey) !== fieldId));
        setSelectedFieldId(null);
    };

    const duplicateField = (fieldKey: string) => {
        const fieldToDuplicate = fields.find((f) => f.fieldKey === fieldKey);
        if (fieldToDuplicate) {
            addField(fieldToDuplicate.type);
        }
    };

    const moveField = async (fieldKey: string, direction: 'up' | 'down') => {
        const currentIndex = fields.findIndex((f) => f.fieldKey === fieldKey);
        if (
            (direction === 'up' && currentIndex > 0) ||
            (direction === 'down' && currentIndex < fields.length - 1)
        ) {
            const newIndex =
                direction === 'up' ? currentIndex - 1 : currentIndex + 1;
            const reorderedFields = [...fields];
            [reorderedFields[currentIndex], reorderedFields[newIndex]] = [
                reorderedFields[newIndex],
                reorderedFields[currentIndex],
            ];

            // Update order in database
            const orderUpdates = reorderedFields.map((field, index) => ({
                _id: field._id,
                order: index,
            }));

            try {
                await reorderFields({
                    formId: formId as any,
                    fieldOrders: orderUpdates.map((update) => ({
                        fieldId: update._id,
                        order: update.order,
                    })),
                });
                setFields(reorderedFields);
            } catch (error) {
                console.error('Failed to reorder fields:', error);
            }
        }
    };

    const updateFieldLogic = (fieldKey: string, logic: any) => {
        updateFieldLocal(fieldKey, { logic });
    };

    const saveForm = async () => {
        if (formId) {
            // This is an existing form, just redirect to edit
            window.location.href = `/dashboard/${formId}/edit`;
            return;
        }

        if (fields.length === 0) {
            alert('Please add at least one field to your form before saving.');
            return;
        }

        setIsSaving(true);
        try {
            // Create the form
            const newFormId = await createForm({
                title: formTitle,
                description: formDescription,
            });

            // Create all local fields in Convex
            const fieldPromises = fields.map(async (field) => {
                const convexField = await createField({
                    formId: newFormId as any,
                    fieldKey: field.fieldKey,
                    type: field.type,
                    label: field.label,
                    placeholder: field.placeholder,
                    description: field.description,
                    required: field.required,
                    config: field.config,
                    logic: field.logic,
                });
                return { localFieldKey: field.fieldKey, convexField };
            });

            await Promise.all(fieldPromises);

            // Redirect to the form edit page
            window.location.href = `/dashboard/${newFormId}/edit`;
        } catch (error) {
            console.error('Failed to save form:', error);
            alert('Failed to save form. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isPreviewMode) {
        return (
            <PreviewMode
                formTitle={formTitle}
                formDescription={formDescription}
                fields={fields}
                onExit={() => setIsPreviewMode(false)}
            />
        );
    }

    return (
        <div className="bg-background flex h-full">
            <FieldPalette onAddField={addField} />

            <FormCanvas
                formTitle={formTitle}
                formDescription={formDescription}
                fields={fields}
                selectedFieldId={selectedFieldId}
                onSelectField={setSelectedFieldId}
                onDeleteField={deleteFieldLocal}
                onDuplicateField={duplicateField}
                onMoveField={moveField}
                onTitleChange={setFormTitle}
                onDescriptionChange={setFormDescription}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onAddField={addField}
                onOpenLogic={setLogicPanelFieldId}
            />

            <div className="border-border bg-card flex w-80 flex-col border-l">
                <div className="border-border flex items-center justify-between border-b p-4">
                    <h2 className="text-foreground font-semibold">Settings</h2>
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            onClick={saveForm}
                            disabled={isSaving}
                            className="gap-2"
                        >
                            <Save className="h-4 w-4" />
                            {isSaving ? 'Saving...' : 'Save Form'}
                        </Button>
                        <Button size="sm" onClick={saveForm} className="gap-2">
                            Save Form
                        </Button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {selectedFieldId ? (
                        <FormSettings
                            field={
                                fields.find(
                                    (f) =>
                                        (f._id || f.fieldKey) ===
                                        selectedFieldId,
                                )!
                            }
                            onUpdate={(updates: any) => {
                                const selectedField = fields.find(
                                    (f) =>
                                        (f._id || f.fieldKey) ===
                                        selectedFieldId,
                                );
                                if (!selectedField) return;

                                // Check if this is a proper Convex ID (not a temporary local ID)
                                const isConvexId =
                                    selectedField._id &&
                                    typeof selectedField._id === 'string' &&
                                    !selectedField._id.startsWith('field_');

                                if (formId && isConvexId) {
                                    // Update remote field in Convex
                                    updateFieldMutation({
                                        fieldId: selectedFieldId as any,
                                        ...updates,
                                    });
                                } else {
                                    // Update local field
                                    updateFieldLocal(
                                        selectedField.fieldKey,
                                        updates,
                                    );
                                }
                            }}
                        />
                    ) : (
                        <div className="text-muted-foreground p-4 text-center">
                            <p className="text-sm">
                                Select a field to edit its properties
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {logicPanelFieldId && (
                <LogicPanel
                    field={fields.find((f) => f._id === logicPanelFieldId)!}
                    allFields={fields}
                    onUpdate={(logic) =>
                        updateFieldLogic(logicPanelFieldId, logic)
                    }
                    onClose={() => setLogicPanelFieldId(null)}
                />
            )}
        </div>
    );
}
