import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Zap, Shield, BarChart } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="text-xl font-bold">G'GRIMS OpenForm</div>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/dashboard/new">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold leading-tight tracking-tight">
          Build Beautiful Forms
          <br />
          <span className="text-muted-foreground">In Minutes, Not Hours</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          An open-source form builder with a focus on simplicity and flexibility. Create stunning forms with our
          intuitive drag-and-drop interface and powerful features.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/dashboard/new">
            <Button size="lg" className="gap-2">
              Create Your First Form
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/f/contact-form">
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-3xl font-bold">Why Choose OpenForm?</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Easy to Use</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Intuitive drag-and-drop interface makes form building a breeze
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Customizable</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Tailor your forms with extensive customization options
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Analytics</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Track form performance with detailed analytics
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Open Source</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Free and open source, built by the community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
          Join thousands of users who trust OpenForm for their form building needs
        </p>
        <Link href="/dashboard/new">
          <Button size="lg" className="mt-8 gap-2">
            Create Your First Form
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          © 2025 G'GRIMS OpenForm. Open source form builder.
        </div>
      </footer>
    </div>
  )
}
