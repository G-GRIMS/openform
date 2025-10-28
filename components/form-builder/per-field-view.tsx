'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { FormField } from './form-field';
import { EditableHeader } from './editable-header';
import { FormFieldInput } from '@/components/form-submission/form-field-input';
import { Button } from '@/components/ui/button';
import {
    ChevronLeft,
    ChevronRight,
    Trash2,
    Copy,
    ChevronUp,
    ChevronDown,
    GripVertical,
    Zap,
} from 'lucide-react';

interface PerFieldViewProps {
    fields: any[];
    formTitle: string;
    formDescription: string;
    isBuilder?: boolean;
    selectedFieldId?: string | null;
    onSelectField?: (id: string) => void;
    formData?: Record<string, any>;
    onFieldChange?: (fieldId: string, value: any) => void;
    errors?: Record<string, string>;
    onSubmit?: (e: React.FormEvent) => void;
    onDeleteField?: (fieldId: string) => void;
    onDuplicateField?: (fieldId: string) => void;
    onMoveField?: (fieldId: string, direction: 'up' | 'down') => void;
    onAddField?: (fieldType: string) => void;
    onValidationError?: (fieldId: string, error: string) => void;
    onOpenLogic?: (fieldId: string) => void;
    onTitleChange?: (title: string) => void;
    onDescriptionChange?: (description: string) => void;
}

export function PerFieldView({
    fields,
    formTitle,
    formDescription,
    isBuilder = false,
    selectedFieldId,
    onSelectField,
    formData,
    onFieldChange,
    errors,
    onSubmit,
    onDeleteField,
    onDuplicateField,
    onMoveField,
    onAddField,
    onValidationError,
    onOpenLogic,
    onTitleChange,
    onDescriptionChange,
}: PerFieldViewProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragOver, setIsDragOver] = useState(false);
    const currentField = fields[currentIndex];
    const totalFields = fields.length;
    const progress = ((currentIndex + 1) / totalFields) * 100;

    const isSubmissionMode = !isBuilder && formData && onFieldChange;

    useEffect(() => {
        if (isBuilder && selectedFieldId && fields.length > 0) {
            const newFieldIndex = fields.findIndex(
                (f) => f.id === selectedFieldId,
            );
            if (newFieldIndex !== -1 && newFieldIndex !== currentIndex) {
                setCurrentIndex(newFieldIndex);
            }
        }
    }, [fields.length, selectedFieldId, isBuilder]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const fieldType = e.dataTransfer.getData('fieldType');
        if (fieldType && onAddField) {
            onAddField(fieldType);
        }
    };

    const handleNext = () => {
        if (isSubmissionMode && currentField.required) {
            const value = formData[currentField.id];
            if (!value || (Array.isArray(value) && value.length === 0)) {
                // Show validation error to user
                if (onValidationError) {
                    onValidationError(
                        currentField.id,
                        'This field is required',
                    );
                }
                return; // Don't proceed if required field is empty
            }
        }

        if (currentIndex < totalFields - 1) {
            setCurrentIndex(currentIndex + 1);
            if (isBuilder && onSelectField) {
                onSelectField(fields[currentIndex + 1].id);
            }
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            if (isBuilder && onSelectField) {
                onSelectField(fields[currentIndex - 1].id);
            }
        }
    };

    const handleDelete = () => {
        if (onDeleteField && currentField) {
            onDeleteField(currentField.id);
            if (currentIndex >= fields.length - 1 && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
        }
    };

    const handleDuplicate = () => {
        if (onDuplicateField && currentField) {
            onDuplicateField(currentField.id);
        }
    };

    const handleMoveUp = () => {
        if (onMoveField && currentField && currentIndex > 0) {
            onMoveField(currentField.id, 'up');
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleMoveDown = () => {
        if (onMoveField && currentField && currentIndex < totalFields - 1) {
            onMoveField(currentField.id, 'down');
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(e);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (
            e.key === 'Enter' &&
            !e.shiftKey &&
            currentField.type !== 'textarea'
        ) {
            e.preventDefault();
            if (currentIndex < totalFields - 1) {
                handleNext();
            } else if (onSubmit) {
                handleSubmit(e as any);
            }
        }
    };

    if (fields.length === 0) {
        return (
            <div
                className="flex h-full items-center justify-center"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div
                    className={`rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
                        isDragOver
                            ? 'border-primary bg-primary/5'
                            : 'border-border'
                    }`}
                >
                    <p className="text-muted-foreground">
                        {isDragOver
                            ? 'Drop field here to add'
                            : 'No fields yet. Add one from the left panel.'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="flex h-full flex-col"
            onKeyDown={handleKeyDown}
            onDragOver={isBuilder ? handleDragOver : undefined}
            onDragLeave={isBuilder ? handleDragLeave : undefined}
            onDrop={isBuilder ? handleDrop : undefined}
        >
            {/* Progress Bar */}
            <div className="bg-muted h-1 w-full">
                <div
                    className="bg-primary h-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Content Area */}
            <div
                className={`flex flex-1 items-center justify-center overflow-y-auto p-8 transition-colors ${
                    isDragOver ? 'bg-primary/5' : ''
                }`}
            >
                <div className="w-full max-w-2xl">
                    {currentIndex === 0 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 mb-12 duration-500">
                            {isBuilder &&
                            onTitleChange &&
                            onDescriptionChange ? (
                                <EditableHeader
                                    title={formTitle}
                                    description={formDescription}
                                    onTitleChange={onTitleChange}
                                    onDescriptionChange={onDescriptionChange}
                                />
                            ) : (
                                <>
                                    <h1 className="text-foreground mb-3 text-4xl font-bold">
                                        {formTitle}
                                    </h1>
                                    <p className="text-muted-foreground text-lg">
                                        {formDescription}
                                    </p>
                                </>
                            )}
                        </div>
                    )}

                    {isDragOver && (
                        <div className="border-primary bg-primary/5 mb-6 rounded-lg border-2 border-dashed p-4 text-center">
                            <p className="text-primary text-sm font-medium">
                                Drop field here to add
                            </p>
                        </div>
                    )}

                    {/* Field Content with Animation */}
                    <div
                        key={currentField.id}
                        className="animate-in fade-in slide-in-from-right-8 duration-500"
                    >
                        <div className="mb-6">
                            <div className="mb-4 flex items-baseline gap-2">
                                <span className="text-muted-foreground text-sm font-medium">
                                    {currentIndex + 1} → {totalFields}
                                </span>
                                {currentField.logic &&
                                    currentField.logic.length > 0 && (
                                        <div className="bg-primary/10 text-primary flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium">
                                            <Zap className="h-3 w-3" />
                                            Conditional logic
                                        </div>
                                    )}
                            </div>
                        </div>

                        {/* Field management controls for builder mode */}
                        <div className="relative">
                            {isBuilder && (
                                <div className="absolute top-0 -right-16 flex flex-col gap-1">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() =>
                                            onOpenLogic?.(currentField.id)
                                        }
                                        className="h-8 w-8 p-0"
                                        title="Add conditional logic"
                                    >
                                        <Zap className="h-4 w-4" />
                                    </Button>
                                    <div className="bg-border my-1 h-px" />
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={handleMoveUp}
                                        disabled={currentIndex === 0}
                                        className="h-8 w-8 p-0"
                                        title="Move field up"
                                    >
                                        <ChevronUp className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={handleMoveDown}
                                        disabled={
                                            currentIndex === totalFields - 1
                                        }
                                        className="h-8 w-8 p-0"
                                        title="Move field down"
                                    >
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                    <div className="bg-border my-1 h-px" />
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={handleDuplicate}
                                        className="h-8 w-8 p-0"
                                        title="Duplicate field"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={handleDelete}
                                        className="text-destructive hover:text-destructive h-8 w-8 p-0"
                                        title="Delete field"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <div className="bg-border my-1 h-px" />
                                    <div className="text-muted-foreground flex h-8 w-8 cursor-grab items-center justify-center active:cursor-grabbing">
                                        <GripVertical className="h-4 w-4" />
                                    </div>
                                </div>
                            )}

                            {isSubmissionMode ? (
                                <FormFieldInput
                                    field={currentField}
                                    value={formData[currentField.id]}
                                    onChange={(value) =>
                                        onFieldChange(currentField.id, value)
                                    }
                                    error={errors?.[currentField.id]}
                                />
                            ) : (
                                <FormField field={currentField} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Footer */}
            <div className="border-border bg-card border-t p-6">
                <div className="mx-auto flex max-w-2xl items-center justify-between">
                    <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className="gap-2 bg-transparent"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Button>

                    <div className="text-muted-foreground text-sm">
                        Question {currentIndex + 1} of {totalFields}
                    </div>

                    {currentIndex < totalFields - 1 ? (
                        <Button onClick={handleNext} className="gap-2">
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            onClick={
                                isSubmissionMode ? handleSubmit : undefined
                            }
                            className="gap-2"
                        >
                            Submit
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
