"use client"

import type React from "react"
import { useState } from "react"
import type { Form } from "@/types/form"
import { Button } from "@/components/ui/button"
import { FormFieldInput } from "./form-field-input"
import { FormSuccess } from "./form-success"
import { PerFieldView } from "@/components/form-builder/per-field-view"
import { LayoutGrid, LayoutList } from "lucide-react"

interface FormRendererProps {
  form: Form
}

export function FormRenderer({ form }: FormRendererProps) {
  const [viewMode, setViewMode] = useState<"quick" | "interactive">("quick")
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))
    if (errors[fieldId]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[fieldId]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    form.fields.forEach((field) => {
      if (field.required) {
        const value = formData[field.id]
        if (!value || (Array.isArray(value) && value.length === 0)) {
          newErrors[field.id] = "This field is required"
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      console.log("[v0] Form submitted:", { formId: form.id, data: formData })
      setIsSubmitted(true)
    }
  }

  const handleReset = () => {
    setFormData({})
    setErrors({})
    setIsSubmitted(false)
  }

  const handleValidationError = (fieldId: string, error: string) => {
    setErrors((prev) => ({ ...prev, [fieldId]: error }))
  }

  if (isSubmitted) {
    return <FormSuccess formTitle={form.title} onReset={handleReset} />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-3xl">
          <div className="flex items-center justify-end gap-2 mb-8">
            <span className="text-sm text-muted-foreground">Layout:</span>
            <Button
              size="sm"
              variant={viewMode === "quick" ? "default" : "outline"}
              onClick={() => setViewMode("quick")}
              className="gap-2"
            >
              <LayoutGrid className="w-4 h-4" />
              Quick Layout
            </Button>
            <Button
              size="sm"
              variant={viewMode === "interactive" ? "default" : "outline"}
              onClick={() => setViewMode("interactive")}
              className="gap-2"
            >
              <LayoutList className="w-4 h-4" />
              Interactive Layout
            </Button>
          </div>

          {viewMode === "interactive" ? (
            <div className="h-[calc(100vh-12rem)]">
              <PerFieldView
                fields={form.fields}
                formTitle={form.title}
                formDescription={form.description}
                isBuilder={false}
                formData={formData}
                onFieldChange={handleFieldChange}
                errors={errors}
                onSubmit={handleSubmit}
                onValidationError={handleValidationError}
              />
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="mb-12">
                <h1 className="text-4xl font-bold text-foreground mb-3">{form.title}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">{form.description}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {form.fields.map((field) => (
                  <FormFieldInput
                    key={field.id}
                    field={field}
                    value={formData[field.id]}
                    onChange={(value) => handleFieldChange(field.id, value)}
                    error={errors[field.id]}
                  />
                ))}

                <div className="pt-6">
                  <Button type="submit" size="lg" className="w-full">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
