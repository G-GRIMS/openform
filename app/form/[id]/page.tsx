import { getFormById, getAllForms } from "@/lib/data/forms"
import { FormRenderer } from "@/components/form-submission/form-renderer"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function generateStaticParams() {
  const forms = getAllForms()
  return forms.map((form) => ({
    id: form.id,
  }))
}

export default function FormSubmissionPage({ params }: { params: { id: string } }) {
  const form = getFormById(params.id)

  if (!form) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Builder
            </Button>
          </Link>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">{form.title}</h1>
          <p className="text-lg text-muted-foreground">{form.description}</p>
        </div>

        <FormRenderer form={form} />
      </div>
    </div>
  )
}
