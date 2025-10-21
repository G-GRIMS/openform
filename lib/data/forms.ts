import type { Form } from "@/types/form"

export const dummyForms: Form[] = [
  {
    id: "contact-form",
    title: "Contact Us",
    description: "We'd love to hear from you. Fill out the form below and we'll get back to you soon.",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    status: "published",
    submissionCount: 127,
    viewCount: 543,
    fields: [
      {
        id: "field-1",
        type: "text",
        label: "Full Name",
        placeholder: "John Doe",
        required: true,
      },
      {
        id: "field-2",
        type: "email",
        label: "Email Address",
        placeholder: "john@example.com",
        required: true,
      },
      {
        id: "field-3",
        type: "select",
        label: "How did you hear about us?",
        required: false,
        options: ["Search Engine", "Social Media", "Friend", "Advertisement", "Other"],
      },
      {
        id: "field-4",
        type: "textarea",
        label: "Message",
        placeholder: "Tell us what's on your mind...",
        required: true,
      },
    ],
  },
  {
    id: "survey-form",
    title: "Customer Satisfaction Survey",
    description: "Help us improve by sharing your feedback. This survey takes about 2 minutes.",
    createdAt: "2024-01-20T14:30:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
    status: "published",
    submissionCount: 89,
    viewCount: 312,
    fields: [
      {
        id: "field-1",
        type: "radio",
        label: "How satisfied are you with our service?",
        required: true,
        options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
      },
      {
        id: "field-2",
        type: "checkbox",
        label: "Which features do you use most? (Select all that apply)",
        required: false,
        options: ["Dashboard", "Reports", "Analytics", "Integrations", "API Access"],
      },
      {
        id: "field-3",
        type: "number",
        label: "On a scale of 1-10, how likely are you to recommend us?",
        placeholder: "1-10",
        required: true,
      },
      {
        id: "field-4",
        type: "textarea",
        label: "Any additional comments?",
        placeholder: "Share your thoughts...",
        required: false,
      },
    ],
  },
  {
    id: "job-application",
    title: "Job Application Form",
    description: "Apply for a position at our company. Please fill out all required fields.",
    createdAt: "2024-01-25T09:00:00Z",
    updatedAt: "2024-01-25T09:00:00Z",
    status: "published",
    submissionCount: 45,
    viewCount: 198,
    fields: [
      {
        id: "field-1",
        type: "text",
        label: "Full Name",
        placeholder: "Jane Smith",
        required: true,
      },
      {
        id: "field-2",
        type: "email",
        label: "Email",
        placeholder: "jane@example.com",
        required: true,
      },
      {
        id: "field-3",
        type: "text",
        label: "Phone Number",
        placeholder: "+1 (555) 123-4567",
        required: true,
      },
      {
        id: "field-4",
        type: "select",
        label: "Position Applied For",
        required: true,
        options: ["Software Engineer", "Product Manager", "Designer", "Marketing Manager", "Sales Representative"],
      },
      {
        id: "field-5",
        type: "date",
        label: "Available Start Date",
        required: true,
      },
      {
        id: "field-6",
        type: "image",
        label: "Upload Resume (PDF or Image)",
        required: true,
        maxSize: 5,
        acceptedFormats: ["image/jpeg", "image/png", "application/pdf"],
      },
      {
        id: "field-7",
        type: "textarea",
        label: "Why do you want to work with us?",
        placeholder: "Tell us about your motivation...",
        required: true,
      },
    ],
  },
  {
    id: "event-registration",
    title: "Event Registration",
    description: "Register for our upcoming conference. Limited seats available!",
    createdAt: "2024-02-01T08:00:00Z",
    updatedAt: "2024-02-01T08:00:00Z",
    status: "draft",
    submissionCount: 0,
    viewCount: 23,
    fields: [
      {
        id: "field-1",
        type: "text",
        label: "Full Name",
        placeholder: "Your name",
        required: true,
      },
      {
        id: "field-2",
        type: "email",
        label: "Email",
        placeholder: "your@email.com",
        required: true,
      },
      {
        id: "field-3",
        type: "select",
        label: "Ticket Type",
        required: true,
        options: ["Early Bird", "Regular", "VIP"],
      },
    ],
  },
]

export function getFormById(id: string): Form | undefined {
  return dummyForms.find((form) => form.id === id)
}

export function getAllForms(): Form[] {
  return dummyForms
}
