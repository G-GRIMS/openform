"use client"

import { FormField } from "./form-field"
import { EditableHeader } from "./editable-header"
import { PerFieldView } from "./per-field-view"
import { Button } from "@/components/ui/button"
import { Trash2, Copy, ChevronUp, ChevronDown, LayoutGrid, LayoutList, Zap } from "lucide-react"
import { useState } from "react"

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
  viewMode = "quick",
  onViewModeChange,
  onAddField,
  onOpenLogic,
}) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const fieldType = e.dataTransfer.getData("fieldType")
    if (fieldType && onAddField) {
      onAddField(fieldType)
    }
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      <div className="border-b border-border bg-card px-8 py-3 flex items-center justify-end gap-2">
        <span className="text-sm text-muted-foreground mr-2">Layout:</span>
        <Button
          size="sm"
          variant={viewMode === "quick" ? "default" : "outline"}
          onClick={() => onViewModeChange("quick")}
          className="gap-2"
        >
          <LayoutGrid className="w-4 h-4" />
          Quick Layout
        </Button>
        <Button
          size="sm"
          variant={viewMode === "interactive" ? "default" : "outline"}
          onClick={() => onViewModeChange("interactive")}
          className="gap-2"
        >
          <LayoutList className="w-4 h-4" />
          Interactive Layout
        </Button>
      </div>

      {viewMode === "interactive" ? (
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
          <div className="max-w-2xl mx-auto">
            <EditableHeader
              title={formTitle}
              description={formDescription}
              onTitleChange={onTitleChange}
              onDescriptionChange={onDescriptionChange}
            />

            {/* Fields Container */}
            <div
              className={`space-y-4 transition-all ${isDragOver ? "ring-2 ring-primary ring-offset-4 rounded-lg" : ""}`}
            >
              {fields.length === 0 ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    isDragOver ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <p className="text-muted-foreground">
                    {isDragOver ? "Drop field here to add" : "No fields yet. Add one from the left panel."}
                  </p>
                </div>
              ) : (
                fields.map((field, index) => (
                  <div
                    key={field.id}
                    className={`relative group p-4 border rounded-lg transition-all ${
                      selectedFieldId === field.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                    onClick={() => onSelectField(field.id)}
                  >
                    {/* Field Content with inline logic indicator */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-foreground">
                          {field.label}
                          {field.required && <span className="text-destructive ml-1">*</span>}
                        </label>
                        {field.logic && field.logic.length > 0 && (
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-md text-xs font-medium">
                            <Zap className="w-3 h-3" />
                            Logic
                          </div>
                        )}
                      </div>
                      <FormField field={field} />
                    </div>

                    {/* Field Actions */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          onOpenLogic?.(field.id)
                        }}
                        className="h-8 w-8 p-0"
                        title="Add conditional logic"
                      >
                        <Zap className="w-4 h-4" />
                      </Button>
                      {index > 0 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            onMoveField(field.id, "up")
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                      )}
                      {index < fields.length - 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            onMoveField(field.id, "down")
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDuplicateField(field.id)
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeleteField(field.id)
                        }}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {fields.length > 0 && (
              <div className="mt-8 pt-6 border-t border-border">
                <Button className="w-full">Submit</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
