'use client';

import type React from 'react';

import type { FormField } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface FormFieldInputProps {
    field: FormField;
    value: any;
    onChange: (value: any) => void;
    error?: string;
}

export function FormFieldInput({
    field,
    value,
    onChange,
    error,
}: FormFieldInputProps) {
    const [fileName, setFileName] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            onChange(file);
        }
    };

    const renderField = () => {
        switch (field.type) {
            case 'text':
            case 'email':
            case 'number':
                return (
                    <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        className={error ? 'border-destructive' : ''}
                    />
                );

            case 'date':
                return (
                    <Input
                        type="date"
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        className={error ? 'border-destructive' : ''}
                    />
                );

            case 'textarea':
                return (
                    <Textarea
                        placeholder={field.placeholder}
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        rows={4}
                        className={error ? 'border-destructive' : ''}
                    />
                );

            case 'select':
                return (
                    <Select value={value || ''} onValueChange={onChange}>
                        <SelectTrigger
                            className={error ? 'border-destructive' : ''}
                        >
                            <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                            {field.options?.map((option) => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );

            case 'radio':
                return (
                    <RadioGroup value={value || ''} onValueChange={onChange}>
                        {field.options?.map((option) => (
                            <div
                                key={option}
                                className="flex items-center space-x-2"
                            >
                                <RadioGroupItem
                                    value={option}
                                    id={`${field.id}-${option}`}
                                />
                                <Label
                                    htmlFor={`${field.id}-${option}`}
                                    className="cursor-pointer font-normal"
                                >
                                    {option}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                );

            case 'checkbox':
                return (
                    <div className="space-y-2">
                        {field.options?.map((option) => (
                            <div
                                key={option}
                                className="flex items-center space-x-2"
                            >
                                <Checkbox
                                    id={`${field.id}-${option}`}
                                    checked={value?.includes(option) || false}
                                    onCheckedChange={(checked) => {
                                        const currentValue = value || [];
                                        if (checked) {
                                            onChange([...currentValue, option]);
                                        } else {
                                            onChange(
                                                currentValue.filter(
                                                    (v: string) => v !== option,
                                                ),
                                            );
                                        }
                                    }}
                                />
                                <Label
                                    htmlFor={`${field.id}-${option}`}
                                    className="cursor-pointer font-normal"
                                >
                                    {option}
                                </Label>
                            </div>
                        ))}
                    </div>
                );

            case 'image':
                return (
                    <div>
                        <label
                            htmlFor={field.id}
                            className={`hover:bg-muted/50 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                                error ? 'border-destructive' : 'border-border'
                            }`}
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="text-muted-foreground mb-2 h-8 w-8" />
                                <p className="text-muted-foreground text-sm">
                                    {fileName ||
                                        'Click to upload or drag and drop'}
                                </p>
                                {field.maxSize && (
                                    <p className="text-muted-foreground mt-1 text-xs">
                                        Max size: {field.maxSize}MB
                                    </p>
                                )}
                            </div>
                            <input
                                id={field.id}
                                type="file"
                                className="hidden"
                                accept={field.acceptedFormats?.join(',')}
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-2">
            <Label htmlFor={field.id}>
                {field.label}
                {field.required && (
                    <span className="text-destructive ml-1">*</span>
                )}
            </Label>
            {field.description && (
                <div className="text-muted-foreground prose prose-sm max-w-none text-sm">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            a: ({ href, children }) => (
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    {children}
                                </a>
                            ),
                        }}
                    >
                        {field.description}
                    </ReactMarkdown>
                </div>
            )}
            {renderField()}
            {error && <p className="text-destructive text-sm">{error}</p>}
        </div>
    );
}
