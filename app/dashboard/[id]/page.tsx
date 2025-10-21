"use client"

import Link from "next/link"
import { ArrowLeft, BarChart3, FileText, Settings, ExternalLink, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getFormById } from "@/lib/data/forms"
import { getSubmissionsByFormId } from "@/lib/data/submissions"
import { getAnalyticsByFormId } from "@/lib/data/analytics"
import { notFound } from "next/navigation"

export default function FormManagementPage({ params }: { params: { id: string } }) {
  const { id } = params
  const form = getFormById(id)
  const submissions = getSubmissionsByFormId(id)
  const analytics = getAnalyticsByFormId(id)

  if (!form) {
    notFound()
  }

  const statusColors = {
    published: "bg-green-500/10 text-green-700 dark:text-green-400",
    draft: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    archived: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{form.title}</h1>
            <Badge variant="secondary" className={statusColors[form.status]}>
              {form.status}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{form.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/f/${form.id}`} target="_blank">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <ExternalLink className="h-4 w-4" />
              Preview
            </Button>
          </Link>
          <Link href={`/dashboard/${form.id}/edit`}>
            <Button size="sm" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Form
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList>
          <TabsTrigger value="analytics" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="submissions" className="gap-2">
            <FileText className="h-4 w-4" />
            Submissions
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          {analytics ? (
            <>
              <div className="grid gap-6 md:grid-cols-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Total Views</CardDescription>
                    <CardTitle className="text-3xl">{analytics.views}</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Submissions</CardDescription>
                    <CardTitle className="text-3xl">{analytics.submissions}</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Completion Rate</CardDescription>
                    <CardTitle className="text-3xl">{analytics.completionRate}%</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Avg. Time</CardDescription>
                    <CardTitle className="text-3xl">{analytics.averageTime}s</CardTitle>
                  </CardHeader>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Views & Submissions Over Time</CardTitle>
                  <CardDescription>Last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Chart visualization would go here
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="flex h-[400px] items-center justify-center">
                <p className="text-muted-foreground">No analytics data available</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="submissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
              <CardDescription>
                {submissions.length} total submission{submissions.length !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submissions.length === 0 ? (
                <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                  No submissions yet
                </div>
              ) : (
                <div className="space-y-4">
                  {submissions.slice(0, 10).map((submission) => (
                    <div key={submission.id} className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">Submission #{submission.id}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(submission.submittedAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm">
                        {Object.entries(submission.data).map(([fieldId, value]) => {
                          const field = form.fields.find((f) => f.id === fieldId)
                          return (
                            <div key={fieldId} className="flex gap-2">
                              <span className="font-medium text-muted-foreground">{field?.label}:</span>
                              <span>{Array.isArray(value) ? value.join(", ") : String(value)}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Settings</CardTitle>
              <CardDescription>Configure your form options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Form Status</label>
                <p className="mt-1 text-sm text-muted-foreground">
                  Current status: <Badge className={statusColors[form.status]}>{form.status}</Badge>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Public URL</label>
                <p className="mt-1 text-sm text-muted-foreground">
                  {typeof window !== "undefined" ? `${window.location.origin}/f/${form.id}` : `/f/${form.id}`}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Created</label>
                <p className="mt-1 text-sm text-muted-foreground">{new Date(form.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Last Updated</label>
                <p className="mt-1 text-sm text-muted-foreground">{new Date(form.updatedAt).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
