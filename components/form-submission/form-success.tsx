"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

interface FormSuccessProps {
  formTitle: string
  onReset: () => void
}

export function FormSuccess({ formTitle, onReset }: FormSuccessProps) {
  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-6">
            <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Thank You!</h2>
          <p className="text-muted-foreground">
            Your response to <span className="font-medium text-foreground">{formTitle}</span> has been submitted
            successfully.
          </p>
        </div>

        <Button onClick={onReset} variant="outline">
          Submit Another Response
        </Button>
      </div>
    </div>
  )
}
