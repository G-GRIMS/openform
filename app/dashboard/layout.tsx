import type React from "react"
import { DashboardNav } from "@/components/navigation/dashboard-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      {children}
    </div>
  )
}
