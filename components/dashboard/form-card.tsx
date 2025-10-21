import Link from "next/link"
import { Calendar, Eye, FileText, MoreVertical } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Form } from "@/types/form"

interface FormCardProps {
  form: Form
}

export function FormCard({ form }: FormCardProps) {
  const statusColors = {
    published: "bg-green-500/10 text-green-700 dark:text-green-400",
    draft: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    archived: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
  }

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">
                <Link href={`/dashboard/${form.id}`} className="hover:underline">
                  {form.title}
                </Link>
              </CardTitle>
              <Badge variant="secondary" className={statusColors[form.status]}>
                {form.status}
              </Badge>
            </div>
            <CardDescription className="mt-1 line-clamp-2">{form.description}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/${form.id}`}>View Details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/${form.id}/edit`}>Edit Form</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/f/${form.id}`} target="_blank">
                  Preview
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>{form.submissionCount} submissions</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{form.viewCount} views</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(form.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
