import type { FormAnalytics } from "@/types/form"

export const dummyAnalytics: Record<string, FormAnalytics> = {
  "contact-form": {
    formId: "contact-form",
    views: 543,
    submissions: 127,
    completionRate: 23.4,
    averageTime: 145,
    viewsByDate: [
      { date: "2024-02-05", count: 45 },
      { date: "2024-02-06", count: 52 },
      { date: "2024-02-07", count: 48 },
      { date: "2024-02-08", count: 61 },
      { date: "2024-02-09", count: 55 },
      { date: "2024-02-10", count: 67 },
      { date: "2024-02-11", count: 72 },
    ],
    submissionsByDate: [
      { date: "2024-02-05", count: 8 },
      { date: "2024-02-06", count: 12 },
      { date: "2024-02-07", count: 10 },
      { date: "2024-02-08", count: 15 },
      { date: "2024-02-09", count: 13 },
      { date: "2024-02-10", count: 18 },
      { date: "2024-02-11", count: 20 },
    ],
  },
  "survey-form": {
    formId: "survey-form",
    views: 312,
    submissions: 89,
    completionRate: 28.5,
    averageTime: 98,
    viewsByDate: [
      { date: "2024-02-05", count: 32 },
      { date: "2024-02-06", count: 38 },
      { date: "2024-02-07", count: 41 },
      { date: "2024-02-08", count: 45 },
      { date: "2024-02-09", count: 48 },
      { date: "2024-02-10", count: 52 },
      { date: "2024-02-11", count: 56 },
    ],
    submissionsByDate: [
      { date: "2024-02-05", count: 9 },
      { date: "2024-02-06", count: 11 },
      { date: "2024-02-07", count: 12 },
      { date: "2024-02-08", count: 14 },
      { date: "2024-02-09", count: 13 },
      { date: "2024-02-10", count: 15 },
      { date: "2024-02-11", count: 15 },
    ],
  },
  "job-application": {
    formId: "job-application",
    views: 198,
    submissions: 45,
    completionRate: 22.7,
    averageTime: 312,
    viewsByDate: [
      { date: "2024-02-05", count: 18 },
      { date: "2024-02-06", count: 22 },
      { date: "2024-02-07", count: 25 },
      { date: "2024-02-08", count: 28 },
      { date: "2024-02-09", count: 31 },
      { date: "2024-02-10", count: 35 },
      { date: "2024-02-11", count: 39 },
    ],
    submissionsByDate: [
      { date: "2024-02-05", count: 4 },
      { date: "2024-02-06", count: 5 },
      { date: "2024-02-07", count: 6 },
      { date: "2024-02-08", count: 7 },
      { date: "2024-02-09", count: 7 },
      { date: "2024-02-10", count: 8 },
      { date: "2024-02-11", count: 8 },
    ],
  },
}

export function getAnalyticsByFormId(formId: string): FormAnalytics | undefined {
  return dummyAnalytics[formId]
}
