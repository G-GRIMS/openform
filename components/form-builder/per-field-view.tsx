"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { FormField } from "./form-field"
import { EditableHeader } from "./editable-header"
import { FormFieldInput } from "@/components/form-submission/form-field-input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Trash2, Copy, ChevronUp, ChevronDown, GripVertical, Zap } from "lucide-react"

interface PerFieldViewProps {
  fields: any[]
  formTitle: string
  formDescription: string
  isBuilder?: boolean
  selectedFieldId?: string | null
  onSelectField?: (id: string) => void
  formData?: Record<string, any>
  onFieldChange?: (fieldId: string, value: any) => void
  errors?: Record<string, string>
  onSubmit?: (e: React.FormEvent) => void
  onDeleteField?: (fieldId: string) => void
  onDuplicateField?: (fieldId: string) => void
  onMoveField?: (fieldId: string, direction: "up" | "down") => void
  onAddField?: (fieldType: string) => void
  onValidationError?: (fieldId: string, error: string) => void
  onOpenLogic?: (fieldId: string) => void
  onTitleChange?: (title: string) => void
  onDescriptionChange?: (description: string) => void
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragOver, setIsDragOver] = useState(false)
  const currentField = fields[currentIndex]
  const totalFields = fields.length
  const progress = ((currentIndex + 1) / totalFields) * 100

  const isSubmissionMode = !isBuilder && formData && onFieldChange

  useEffect(() => {
    if (isBuilder && selectedFieldId && fields.length > 0) {
      const newFieldIndex = fields.findIndex((f) => f.id === selectedFieldId)
      if (newFieldIndex !== -1 && newFieldIndex !== currentIndex) {
        setCurrentIndex(newFieldIndex)
      }
    }
  }, [fields.length, selectedFieldId, isBuilder])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const fieldType = e.dataTransfer.getData("fieldType")
    if (fieldType && onAddField) {
      onAddField(fieldType)
    }
  }

  const handleNext = () => {
    if (isSubmissionMode && currentField.required) {
      const value = formData[currentField.id]
      if (!value || (Array.isArray(value) && value.length === 0)) {
        // Show validation error to user
        if (onValidationError) {
          onValidationError(currentField.id, "This field is required")
        }
        return // Don't proceed if required field is empty
      }
    }

    if (currentIndex < totalFields - 1) {
      setCurrentIndex(currentIndex + 1)
      if (isBuilder && onSelectField) {
        onSelectField(fields[currentIndex + 1].id)
      }
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      if (isBuilder && onSelectField) {
        onSelectField(fields[currentIndex - 1].id)
      }
    }
  }

  const handleDelete = () => {
    if (onDeleteField && currentField) {
      onDeleteField(currentField.id)
      if (currentIndex >= fields.length - 1 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      }
    }
  }

  const handleDuplicate = () => {
    if (onDuplicateField && currentField) {
      onDuplicateField(currentField.id)
    }
  }

  const handleMoveUp = () => {
    if (onMoveField && currentField && currentIndex > 0) {
      onMoveField(currentField.id, "up")
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleMoveDown = () => {
    if (onMoveField && currentField && currentIndex < totalFields - 1) {
      onMoveField(currentField.id, "down")
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(e)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && currentField.type !== "textarea") {
      e.preventDefault()
      if (currentIndex < totalFields - 1) {
        handleNext()
      } else if (onSubmit) {
        handleSubmit(e as any)
      }
    }
  }

  if (fields.length === 0) {
    return (
      <div
        className="flex items-center justify-center h-full"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div
          className={`text-center border-2 border-dashed rounded-lg p-12 transition-colors ${
            isDragOver ? "border-primary bg-primary/5" : "border-border"
          }`}
        >
          <p className="text-muted-foreground">
            {isDragOver ? "Drop field here to add" : "No fields yet. Add one from the left panel."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="flex flex-col h-full"
      onKeyDown={handleKeyDown}
      onDragOver={isBuilder ? handleDragOver : undefined}
      onDragLeave={isBuilder ? handleDragLeave : undefined}
      onDrop={isBuilder ? handleDrop : undefined}
    >
      {/* Progress Bar */}
      <div className="w-full h-1 bg-muted">
        <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
      </div>

      {/* Content Area */}
      <div
        className={`flex-1 flex items-center justify-center p-8 overflow-y-auto transition-colors ${
          isDragOver ? "bg-primary/5" : ""
        }`}
      >
        <div className="w-full max-w-2xl">
          {currentIndex === 0 && (
            <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {isBuilder && onTitleChange && onDescriptionChange ? (
                <EditableHeader
                  title={formTitle}
                  description={formDescription}
                  onTitleChange={onTitleChange}
                  onDescriptionChange={onDescriptionChange}
                />
              ) : (
                <>
                  <h1 className="text-4xl font-bold text-foreground mb-3">{formTitle}</h1>
                  <p className="text-lg text-muted-foreground">{formDescription}</p>
                </>
              )}
            </div>
          )}

          {isDragOver && (
            <div className="mb-6 p-4 border-2 border-dashed border-primary rounded-lg bg-primary/5 text-center">
              <p className="text-sm text-primary font-medium">Drop field here to add</p>
            </div>
          )}

          {/* Field Content with Animation */}
          <div key={currentField.id} className="animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  {currentIndex + 1} → {totalFields}
                </span>
                {currentField.logic && currentField.logic.length > 0 && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-md text-xs font-medium">
                    <Zap className="w-3 h-3" />
                    Conditional logic
                  </div>
                )}
              </div>
            </div>

            {/* Field management controls for builder mode */}
            <div className="relative">
              {isBuilder && (
                <div className="absolute -right-16 top-0 flex flex-col gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onOpenLogic?.(currentField.id)}
                    className="h-8 w-8 p-0"
                    title="Add conditional logic"
                  >
                    <Zap className="w-4 h-4" />
                  </Button>
                  <div className="h-px bg-border my-1" />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleMoveUp}
                    disabled={currentIndex === 0}
                    className="h-8 w-8 p-0"
                    title="Move field up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleMoveDown}
                    disabled={currentIndex === totalFields - 1}
                    className="h-8 w-8 p-0"
                    title="Move field down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                  <div className="h-px bg-border my-1" />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleDuplicate}
                    className="h-8 w-8 p-0"
                    title="Duplicate field"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleDelete}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    title="Delete field"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <div className="h-px bg-border my-1" />
                  <div className="h-8 w-8 flex items-center justify-center text-muted-foreground cursor-grab active:cursor-grabbing">
                    <GripVertical className="w-4 h-4" />
                  </div>
                </div>
              )}

              {isSubmissionMode ? (
                <FormFieldInput
                  field={currentField}
                  value={formData[currentField.id]}
                  onChange={(value) => onFieldChange(currentField.id, value)}
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
      <div className="border-t border-border bg-card p-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="gap-2 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="text-sm text-muted-foreground">
            Question {currentIndex + 1} of {totalFields}
          </div>

          {currentIndex < totalFields - 1 ? (
            <Button onClick={handleNext} className="gap-2">
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={isSubmissionMode ? handleSubmit : undefined} className="gap-2">
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
