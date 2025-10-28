'use client';

import { useState } from 'react';
import { FormCanvas } from './form-canvas';
import { FieldPalette } from './field-palette';
import { FormSettings } from './form-settings';
import { PreviewMode } from './preview-mode';
import { LogicPanel } from './logic-panel';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

export function FormBuilder() {
    const [fields, setFields] = useState([]);
    const [selectedFieldId, setSelectedFieldId] = useState(null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [formTitle, setFormTitle] = useState('Untitled Form');
    const [formDescription, setFormDescription] = useState(
        'Build your form by adding fields',
    );
    const [viewMode, setViewMode] = useState('quick'); // Changed default viewMode from "full" to "quick"
    const [logicPanelFieldId, setLogicPanelFieldId] = useState(null);

    const addField = (fieldType) => {
        const newField = {
            id: `field-${Date.now()}`,
            type: fieldType,
            label: `${fieldType} Field`,
            placeholder: '',
            required: false,
            options:
                fieldType === 'select' ||
                fieldType === 'radio' ||
                fieldType === 'checkbox'
                    ? ['Option 1', 'Option 2']
                    : [],
            ...(fieldType === 'image' && {
                label: 'Image Upload',
                maxSize: 5,
                acceptedFormats: ['image/jpeg', 'image/png', 'image/gif'],
            }),
        };
        setFields([...fields, newField]);
        setSelectedFieldId(newField.id);
    };

    const updateField = (fieldId, updates) => {
        setFields(
            fields.map((f) => (f.id === fieldId ? { ...f, ...updates } : f)),
        );
    };

    const deleteField = (fieldId) => {
        setFields(fields.filter((f) => f.id !== fieldId));
        setSelectedFieldId(null);
    };

    const duplicateField = (fieldId) => {
        const fieldToDuplicate = fields.find((f) => f.id === fieldId);
        if (fieldToDuplicate) {
            const newField = {
                ...fieldToDuplicate,
                id: `field-${Date.now()}`,
            };
            setFields([...fields, newField]);
        }
    };

    const moveField = (fieldId, direction) => {
        const index = fields.findIndex((f) => f.id === fieldId);
        if (
            (direction === 'up' && index > 0) ||
            (direction === 'down' && index < fields.length - 1)
        ) {
            const newFields = [...fields];
            const newIndex = direction === 'up' ? index - 1 : index + 1;
            [newFields[index], newFields[newIndex]] = [
                newFields[newIndex],
                newFields[index],
            ];
            setFields(newFields);
        }
    };

    const updateFieldLogic = (fieldId, logic) => {
        setFields(fields.map((f) => (f.id === fieldId ? { ...f, logic } : f)));
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
                onDeleteField={deleteField}
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
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsPreviewMode(true)}
                        className="gap-2"
                    >
                        <Eye className="h-4 w-4" />
                        Preview
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {selectedFieldId ? (
                        <FormSettings
                            field={fields.find((f) => f.id === selectedFieldId)}
                            onUpdate={(updates) =>
                                updateField(selectedFieldId, updates)
                            }
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
                    field={fields.find((f) => f.id === logicPanelFieldId)}
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
