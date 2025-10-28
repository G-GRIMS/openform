'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FormField } from './form-field';
import { PerFieldView } from './per-field-view';
import { ArrowLeft, LayoutGrid, LayoutList } from 'lucide-react';

export function PreviewMode({ formTitle, formDescription, fields, onExit }) {
    const [viewMode, setViewMode] = useState('quick');

    return (
        <div className="bg-background flex min-h-screen flex-col">
            {/* Header */}
            <div className="border-border bg-card sticky top-0 z-10 border-b">
                <div className="mx-auto flex max-w-2xl items-center justify-between px-8 py-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onExit}
                        className="gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Editor
                    </Button>

                    <div className="flex items-center gap-2">
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
                </div>
            </div>

            {viewMode === 'interactive' ? (
                <div className="flex-1">
                    <PerFieldView
                        fields={fields}
                        formTitle={formTitle}
                        formDescription={formDescription}
                        isBuilder={false}
                    />
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="mx-auto max-w-2xl">
                        <div className="mb-8">
                            <h1 className="text-foreground mb-2 text-3xl font-bold">
                                {formTitle}
                            </h1>
                            <p className="text-muted-foreground">
                                {formDescription}
                            </p>
                        </div>

                        <form className="space-y-6">
                            {fields.map((field) => (
                                <FormField key={field.id} field={field} />
                            ))}

                            {fields.length > 0 && (
                                <div className="pt-4">
                                    <Button className="w-full">Submit</Button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
