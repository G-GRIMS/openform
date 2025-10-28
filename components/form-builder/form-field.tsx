'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function FormField({ field, showLabel = true }) {
    const renderField = () => {
        const commonProps = {
            placeholder:
                field.placeholder || `Enter ${field.label.toLowerCase()}`,
            disabled: true,
        };

        switch (field.type) {
            case 'text':
                return <Input {...commonProps} type="text" />;
            case 'email':
                return <Input {...commonProps} type="email" />;
            case 'phone':
                return <Input {...commonProps} type="tel" />;
            case 'date':
                return <Input {...commonProps} type="date" />;
            case 'textarea':
                return <Textarea {...commonProps} rows={4} />;
            case 'image':
                return (
                    <div className="border-border hover:border-primary/50 rounded-lg border-2 border-dashed p-8 text-center transition-colors">
                        <Upload className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
                        <p className="text-muted-foreground mb-1 text-sm">
                            Click to upload or drag and drop
                        </p>
                        <p className="text-muted-foreground text-xs">
                            {field.acceptedFormats
                                ?.map((f) => f.split('/')[1].toUpperCase())
                                .join(', ')}{' '}
                            (max {field.maxSize}MB)
                        </p>
                    </div>
                );
            case 'checkbox':
                return (
                    <div className="space-y-2">
                        {field.options.map((option, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <Checkbox disabled />
                                <Label className="cursor-pointer text-sm">
                                    {option}
                                </Label>
                            </div>
                        ))}
                    </div>
                );
            case 'radio':
                return (
                    <RadioGroup disabled>
                        {field.options.map((option, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <RadioGroupItem
                                    value={option}
                                    id={`${field.id}-${idx}`}
                                    disabled
                                />
                                <Label
                                    htmlFor={`${field.id}-${idx}`}
                                    className="cursor-pointer text-sm"
                                >
                                    {option}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                );
            case 'select':
                return (
                    <Select disabled>
                        <SelectTrigger>
                            <SelectValue
                                placeholder={
                                    field.placeholder || 'Select an option'
                                }
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {field.options.map((option, idx) => (
                                <SelectItem key={idx} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            case 'toggle':
                return (
                    <div className="flex items-center gap-2">
                        <input type="checkbox" disabled className="h-4 w-4" />
                        <Label className="cursor-pointer text-sm">
                            {field.label}
                        </Label>
                    </div>
                );
            default:
                return <Input {...commonProps} />;
        }
    };

    return (
        <div className="space-y-2">
            {showLabel !== false && (
                <Label className="text-foreground text-sm font-medium">
                    {field.label}
                    {field.required && (
                        <span className="text-destructive ml-1">*</span>
                    )}
                </Label>
            )}
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
        </div>
    );
}
