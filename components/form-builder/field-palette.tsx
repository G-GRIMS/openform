"use client"

import { Button } from "@/components/ui/button"
import { Type, Mail, Phone, Calendar, CheckSquare, Radio, List, FileText, ToggleRight, ImageIcon } from "lucide-react"

const FIELD_TYPES = [
  { type: "text", label: "Text", icon: Type },
  { type: "email", label: "Email", icon: Mail },
  { type: "phone", label: "Phone", icon: Phone },
  { type: "date", label: "Date", icon: Calendar },
  { type: "textarea", label: "Textarea", icon: FileText },
  { type: "checkbox", label: "Checkbox", icon: CheckSquare },
  { type: "radio", label: "Radio", icon: Radio },
  { type: "select", label: "Select", icon: List },
  { type: "toggle", label: "Toggle", icon: ToggleRight },
  { type: "image", label: "Image Upload", icon: ImageIcon },
]

export function FieldPalette({ onAddField }) {
  const handleDragStart = (e, fieldType) => {
    e.dataTransfer.effectAllowed = "copy"
    e.dataTransfer.setData("fieldType", fieldType)
  }

  return (
    <div className="w-64 border-r border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-foreground">Fields</h2>
        <p className="text-xs text-muted-foreground mt-1">Drag or click to add</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {FIELD_TYPES.map(({ type, label, icon: Icon }) => (
          <Button
            key={type}
            variant="outline"
            className="w-full justify-start gap-2 h-auto py-2 bg-transparent cursor-grab active:cursor-grabbing"
            onClick={() => onAddField(type)}
            draggable
            onDragStart={(e) => handleDragStart(e, type)}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
