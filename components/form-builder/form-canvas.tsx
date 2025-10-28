'use client';

import { FormField } from './form-field';
import { EditableHeader } from './editable-header';
import { PerFieldView } from './per-field-view';
import { Button } from '@/components/ui/button';
import {
    Trash2,
    Copy,
    ChevronUp,
    ChevronDown,
    LayoutGrid,
    LayoutList,
    Zap,
} from 'lucide-react';
import { useState } from 'react';

export function FormCanvas({
    formTitle,
    formDescription,
    fields,
    selectedFieldId,
    onSelectField,
    onDeleteField,
    onDuplicateField,
    onMoveField,
    onTitleChange,
    onDescriptionChange,
    viewMode = 'quick',
    onViewModeChange,
    onAddField,
    onOpenLogic,
}) {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const fieldType = e.dataTransfer.getData('fieldType');
        if (fieldType && onAddField) {
            onAddField(fieldType);
        }
    };

    return (
        <div className="bg-background flex flex-1 flex-col overflow-hidden">
            <div className="border-border bg-card flex items-center justify-end gap-2 border-b px-8 py-3">
                <span className="text-muted-foreground mr-2 text-sm">
                    Layout:
                </span>
                <Button
                    size="sm"
                    variant={viewMode === 'quick' ? 'default' : 'outline'}
                    onClick={() => onViewModeChange('quick')}
                    className="gap-2"
                >
                    <LayoutGrid className="h-4 w-4" />
                    Quick Layout
                </Button>
                <Button
                    size="sm"
                    variant={viewMode === 'interactive' ? 'default' : 'outline'}
                    onClick={() => onViewModeChange('interactive')}
                    className="gap-2"
                >
                    <LayoutList className="h-4 w-4" />
                    Interactive Layout
                </Button>
            </div>

            {viewMode === 'interactive' ? (
                <PerFieldView
                    fields={fields}
                    formTitle={formTitle}
                    formDescription={formDescription}
                    isBuilder={true}
                    selectedFieldId={selectedFieldId}
                    onSelectField={onSelectField}
                    onDeleteField={onDeleteField}
                    onDuplicateField={onDuplicateField}
                    onMoveField={onMoveField}
                    onAddField={onAddField}
                    onOpenLogic={onOpenLogic}
                    onTitleChange={onTitleChange}
                    onDescriptionChange={onDescriptionChange}
                />
            ) : (
                <div
                    className="flex-1 overflow-y-auto p-8"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="mx-auto max-w-2xl">
                        <EditableHeader
                            title={formTitle}
                            description={formDescription}
                            onTitleChange={onTitleChange}
                            onDescriptionChange={onDescriptionChange}
                        />

                        {/* Fields Container */}
                        <div
                            className={`space-y-4 transition-all ${isDragOver ? 'ring-primary rounded-lg ring-2 ring-offset-4' : ''}`}
                        >
                            {fields.length === 0 ? (
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
                            ) : (
                                fields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className={`group relative rounded-lg border p-4 transition-all ${
                                            selectedFieldId === field.id
                                                ? 'border-primary bg-primary/5'
                                                : 'border-border bg-card hover:border-primary/50'
                                        }`}
                                        onClick={() => onSelectField(field.id)}
                                    >
                                        {/* Field Content with inline logic indicator */}
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <label className="text-foreground text-sm font-medium">
                                                    {field.label}
                                                    {field.required && (
                                                        <span className="text-destructive ml-1">
                                                            *
                                                        </span>
                                                    )}
                                                </label>
                                                {field.logic &&
                                                    field.logic.length > 0 && (
                                                        <div className="bg-primary/10 text-primary flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium">
                                                            <Zap className="h-3 w-3" />
                                                            Logic
                                                        </div>
                                                    )}
                                            </div>
                                            <FormField field={field} />
                                        </div>

                                        {/* Field Actions */}
                                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onOpenLogic?.(field.id);
                                                }}
                                                className="h-8 w-8 p-0"
                                                title="Add conditional logic"
                                            >
                                                <Zap className="h-4 w-4" />
                                            </Button>
                                            {index > 0 && (
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onMoveField(
                                                            field.id,
                                                            'up',
                                                        );
                                                    }}
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <ChevronUp className="h-4 w-4" />
                                                </Button>
                                            )}
                                            {index < fields.length - 1 && (
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onMoveField(
                                                            field.id,
                                                            'down',
                                                        );
                                                    }}
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <ChevronDown className="h-4 w-4" />
                                                </Button>
                                            )}
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDuplicateField(field.id);
                                                }}
                                                className="h-8 w-8 p-0"
                                            >
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDeleteField(field.id);
                                                }}
                                                className="text-destructive hover:text-destructive h-8 w-8 p-0"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {fields.length > 0 && (
                            <div className="border-border mt-8 border-t pt-6">
                                <Button className="w-full">Submit</Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
