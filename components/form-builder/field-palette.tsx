'use client';

import { Button } from '@/components/ui/button';
import {
    Type,
    Mail,
    Phone,
    Calendar,
    CheckSquare,
    Radio,
    List,
    FileText,
    ToggleRight,
    ImageIcon,
} from 'lucide-react';

const FIELD_TYPES = [
    { type: 'text', label: 'Text', icon: Type },
    { type: 'email', label: 'Email', icon: Mail },
    { type: 'phone', label: 'Phone', icon: Phone },
    { type: 'date', label: 'Date', icon: Calendar },
    { type: 'textarea', label: 'Textarea', icon: FileText },
    { type: 'checkbox', label: 'Checkbox', icon: CheckSquare },
    { type: 'radio', label: 'Radio', icon: Radio },
    { type: 'select', label: 'Select', icon: List },
    { type: 'toggle', label: 'Toggle', icon: ToggleRight },
    { type: 'image', label: 'Image Upload', icon: ImageIcon },
];

export function FieldPalette({ onAddField }) {
    const handleDragStart = (e, fieldType) => {
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('fieldType', fieldType);
    };

    return (
        <div className="border-border bg-card flex w-64 flex-col border-r">
            <div className="border-border border-b p-4">
                <h2 className="text-foreground font-semibold">Fields</h2>
                <p className="text-muted-foreground mt-1 text-xs">
                    Drag or click to add
                </p>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-3">
                {FIELD_TYPES.map(({ type, label, icon: Icon }) => (
                    <Button
                        key={type}
                        variant="outline"
                        className="h-auto w-full cursor-grab justify-start gap-2 bg-transparent py-2 active:cursor-grabbing"
                        onClick={() => onAddField(type)}
                        draggable
                        onDragStart={(e) => handleDragStart(e, type)}
                    >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm">{label}</span>
                    </Button>
                ))}
            </div>
        </div>
    );
}
