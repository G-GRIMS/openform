'use client';

import type React from 'react';
import { useState } from 'react';
import { useSubmitForm, usePublicForm } from '@/lib/hooks/use-forms';
import {
    transformSubmissionData,
    validateSubmission,
} from '@/lib/utils/form-helpers';
import { Button } from '@/components/ui/button';

import { FormFieldInput } from './form-field-input';
import { FormSuccess } from './form-success';
import { LayoutGrid, LayoutList } from 'lucide-react';
import type { Id } from '../../convex/_generated/dataModel';

interface FormRendererProps {
    formId: string;
}

export function FormRenderer({ formId }: FormRendererProps) {
    const form = usePublicForm(formId as Id<'forms'>);
    const submitForm = useSubmitForm();

    const [viewMode, setViewMode] = useState<'quick' | 'interactive'>(
        'interactive',
    );
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFieldChange = (fieldKey: string, value: any) => {
        setFormData((prev) => ({ ...prev, [fieldKey]: value }));
        if (errors[fieldKey]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[fieldKey];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form) return;

        // Validate form data
        const validationErrors = validateSubmission(formData, form.fields);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setIsSubmitting(true);
            const transformedData = transformSubmissionData(
                formData,
                form.fields,
            );

            await submitForm({
                formId: form._id,
                data: transformedData,
            });

            setIsSubmitted(true);
        } catch (error) {
            console.error('Failed to submit form:', error);
            setErrors({ submit: 'Failed to submit form. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted && form) {
        return (
            <FormSuccess
                formTitle={form.title}
                onReset={() => {
                    setFormData({});
                    setErrors({});
                    setIsSubmitted(false);
                }}
            />
        );
    }

    if (!form) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
                    <p>Loading form...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex flex-1 flex-col items-center px-4 py-8">
                <div className="w-full max-w-3xl">
                    <div className="mb-8 flex items-center justify-end gap-2">
                        <span className="text-muted-foreground text-sm">
                            Layout:
                        </span>
                        <Button
                            size="sm"
                            variant={
                                viewMode === 'quick' ? 'default' : 'outline'
                            }
                            onClick={() => setViewMode('quick')}
                            className="gap-2"
                        >
                            <LayoutGrid className="h-4 w-4" />
                            Quick Layout
                        </Button>
                        <Button
                            size="sm"
                            variant={
                                viewMode === 'interactive'
                                    ? 'default'
                                    : 'outline'
                            }
                            onClick={() => setViewMode('interactive')}
                            className="gap-2"
                        >
                            <LayoutList className="h-4 w-4" />
                            Interactive Layout
                        </Button>
                    </div>

                    <div className="mx-auto max-w-2xl">
                        <div className="mb-12">
                            <h1 className="text-foreground mb-3 text-4xl font-bold">
                                {form.title}
                            </h1>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                {form.description}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {form.fields.map((field: any) => (
                                <FormFieldInput
                                    key={field.fieldKey}
                                    field={field}
                                    value={formData[field.fieldKey]}
                                    onChange={(value) =>
                                        handleFieldChange(field.fieldKey, value)
                                    }
                                    error={errors[field.fieldKey]}
                                />
                            ))}

                            {errors.submit && (
                                <div className="text-destructive text-center text-sm">
                                    {errors.submit}
                                </div>
                            )}

                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
