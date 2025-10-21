"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FormField } from "./form-field"
import { PerFieldView } from "./per-field-view"
import { ArrowLeft, LayoutGrid, LayoutList } from "lucide-react"

export function PreviewMode({ formTitle, formDescription, fields, onExit }) {
  const [viewMode, setViewMode] = useState("quick")

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-8 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onExit} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Editor
          </Button>

          <div className="flex items-center gap-2">
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
        </div>
      </div>

      {viewMode === "interactive" ? (
        <div className="flex-1">
          <PerFieldView fields={fields} formTitle={formTitle} formDescription={formDescription} isBuilder={false} />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">{formTitle}</h1>
              <p className="text-muted-foreground">{formDescription}</p>
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
  )
}
