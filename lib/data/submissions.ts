import type { FormSubmission } from "@/types/form"

export const dummySubmissions: FormSubmission[] = [
  {
    id: "sub-1",
    formId: "contact-form",
    data: {
      "field-1": "John Doe",
      "field-2": "john@example.com",
      "field-3": "Search Engine",
      "field-4": "I'm interested in learning more about your services.",
    },
    submittedAt: "2024-02-10T14:30:00Z",
  },
  {
    id: "sub-2",
    formId: "contact-form",
    data: {
      "field-1": "Jane Smith",
      "field-2": "jane@example.com",
      "field-3": "Social Media",
      "field-4": "Can you provide pricing information?",
    },
    submittedAt: "2024-02-11T09:15:00Z",
  },
  {
    id: "sub-3",
    formId: "contact-form",
    data: {
      "field-1": "Bob Johnson",
      "field-2": "bob@example.com",
      "field-3": "Friend",
      "field-4": "I'd like to schedule a demo.",
    },
    submittedAt: "2024-02-11T16:45:00Z",
  },
  {
    id: "sub-4",
    formId: "survey-form",
    data: {
      "field-1": "Very Satisfied",
      "field-2": ["Dashboard", "Analytics", "Reports"],
      "field-3": "9",
      "field-4": "Great product! Keep up the good work.",
    },
    submittedAt: "2024-02-09T11:20:00Z",
  },
  {
    id: "sub-5",
    formId: "survey-form",
    data: {
      "field-1": "Satisfied",
      "field-2": ["Dashboard", "Integrations"],
      "field-3": "8",
      "field-4": "Would love to see more integrations.",
    },
    submittedAt: "2024-02-10T13:30:00Z",
  },
  {
    id: "sub-6",
    formId: "job-application",
    data: {
      "field-1": "Alice Williams",
      "field-2": "alice@example.com",
      "field-3": "+1 (555) 987-6543",
      "field-4": "Software Engineer",
      "field-5": "2024-03-01",
      "field-6": "resume.pdf",
      "field-7": "I'm passionate about building great products and would love to contribute to your team.",
    },
    submittedAt: "2024-02-08T10:00:00Z",
  },
]

export function getSubmissionsByFormId(formId: string): FormSubmission[] {
  return dummySubmissions.filter((sub) => sub.formId === formId)
}

export function getAllSubmissions(): FormSubmission[] {
  return dummySubmissions
}
