import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    ArrowRight,
    CheckCircle,
    Zap,
    Shield,
    BarChart,
    Github,
    Mail,
    Instagram,
} from 'lucide-react';
import Image from 'next/image';
import { Fragment } from 'react';

export default function LandingPage() {
    return (
        <Fragment>
            <div className="grainy-background absolute">
                <svg>
                    <filter id="grainy-texture">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.6"
                            numOctaves="3"
                            stitchTiles="stitch"
                        />
                        <feColorMatrix type="saturate" values="0" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.5" />
                        </feComponentTransfer>
                    </filter>
                </svg>
            </div>
            <div className="min-h-screen">
                {/* Header */}
                <header className="containerd">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <div className="text-xl font-bold">
                            G'GRIMS OpenForm
                        </div>
                        <nav className="flex items-center gap-4">
                            <Link
                                href="https://github.com/G-GRIMS/openform"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-2"
                                >
                                    <Github className="h-4 w-4" />
                                    GitHub
                                </Button>
                            </Link>
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
                <section className="containerd px-6 py-20">
                    <div className="flex flex-col items-center gap-8">
                        <div className="text-center">
                            <h1 className="text-5xl leading-tight font-medium tracking-tight">
                                Build Beautiful Forms
                                <br />
                                <span className="text-muted-foreground">
                                    In Minutes, Not Hours
                                </span>
                            </h1>
                            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-relaxed md:mx-0">
                                An open-source form builder with a focus on
                                simplicity and flexibility. Create stunning
                                forms with our intuitive drag-and-drop interface
                                and powerful features.
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
                        </div>
                        <div>
                            <Image
                                src="/preview.jpg"
                                alt="Dashboard Preview"
                                width={800}
                                height={600}
                                className="h-auto w-full rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-muted/30 containerd border-t py-20">
                    <div className="container mx-auto px-6">
                        <h2 className="text-center text-3xl font-bold">
                            Why Choose OpenForm?
                        </h2>
                        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                                    <Zap className="text-primary h-6 w-6" />
                                </div>
                                <h3 className="mt-4 font-semibold">
                                    Easy to Use
                                </h3>
                                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                                    Intuitive drag-and-drop interface makes form
                                    building a breeze
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                                    <CheckCircle className="text-primary h-6 w-6" />
                                </div>
                                <h3 className="mt-4 font-semibold">
                                    Customizable
                                </h3>
                                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                                    Tailor your forms with extensive
                                    customization options
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                                    <BarChart className="text-primary h-6 w-6" />
                                </div>
                                <h3 className="mt-4 font-semibold">
                                    Analytics
                                </h3>
                                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                                    Track form performance with detailed
                                    analytics
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                                    <Shield className="text-primary h-6 w-6" />
                                </div>
                                <h3 className="mt-4 font-semibold">
                                    Open Source
                                </h3>
                                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                                    Free and open source, built by the community
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container mx-auto px-6 py-20 text-center">
                    <h2 className="text-3xl font-bold">
                        Ready to Get Started?
                    </h2>
                    <p className="text-muted-foreground mx-auto mt-4 max-w-xl leading-relaxed">
                        Join thousands of users who trust OpenForm for their
                        form building needs
                    </p>
                    <Link href="/dashboard/new">
                        <Button size="lg" className="mt-8 gap-2">
                            Create Your First Form
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </section>

                {/* Footer */}
                <footer className="bg-muted/30 border-t">
                    <div className="containerd px-6 py-12">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {/* Project Links */}
                            <div>
                                <h3 className="text-foreground mb-4 font-semibold">
                                    Project Links
                                </h3>
                                <div className="space-y-2">
                                    <Link
                                        href="https://github.com/G-GRIMS/openform"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground block text-sm transition-colors"
                                    >
                                        GitHub Repository
                                    </Link>
                                    <Link
                                        href="https://github.com/G-GRIMS/openform/blob/main/CONTRIBUTING.md"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground block text-sm transition-colors"
                                    >
                                        Contributing Guidelines
                                    </Link>
                                    <Link
                                        href="https://github.com/G-GRIMS/openform/issues"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground block text-sm transition-colors"
                                    >
                                        Report Issues
                                    </Link>
                                    <Link
                                        href="https://github.com/G-GRIMS/openform/blob/main/README.md"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground block text-sm transition-colors"
                                    >
                                        Documentation
                                    </Link>
                                </div>
                            </div>

                            {/* Connect */}
                            <div>
                                <h3 className="text-foreground mb-4 font-semibold">
                                    Connect
                                </h3>
                                <div className="space-y-2">
                                    <Link
                                        href="mailto:contact@ggrims.com"
                                        className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
                                    >
                                        <Mail className="h-4 w-4" />
                                        contact@ggrims.com
                                    </Link>
                                    <Link
                                        href="https://instagram.com/g.grims_"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
                                    >
                                        <Instagram className="h-4 w-4" />
                                        @g.grims_
                                    </Link>
                                </div>
                            </div>

                            {/* Legal/Info */}
                            <div>
                                <h3 className="text-foreground mb-4 font-semibold">
                                    Legal & Info
                                </h3>
                                <div className="space-y-2">
                                    <Link
                                        href="https://github.com/G-GRIMS/openform/blob/main/LICENSE"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground block text-sm transition-colors"
                                    >
                                        License (MIT)
                                    </Link>
                                    <div className="text-muted-foreground text-sm">
                                        Version 0.1.0
                                    </div>
                                </div>
                            </div>

                            {/* About */}
                            <div>
                                <h3 className="text-foreground mb-4 font-semibold">
                                    About OpenForm
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    An open-source form builder focused on
                                    simplicity and flexibility. Built with
                                    Next.js, React, and TypeScript.
                                </p>
                            </div>
                        </div>

                        <div className="border-border text-muted-foreground mt-8 border-t pt-8 text-center text-sm">
                            © 2025 G'GRIMS OpenForm. Open source form builder.
                            Made with ❤️ by the community.
                        </div>
                    </div>
                </footer>
            </div>
        </Fragment>
    );
}
