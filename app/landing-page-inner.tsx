'use client';
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
    Home,
    Bot,
    Settings,
    Eye,
    Smartphone,
    Moon,
} from 'lucide-react';
import Image from 'next/image';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { lora } from '@/lib/fonts';

export default function LandingPageInner() {
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
                                    <span className="hidden md:block">
                                        GitHub
                                    </span>
                                </Button>
                            </Link>
                            <Link href="/dashboard">
                                <Button variant="ghost">
                                    <Home className="h-4 w-4" />
                                    <span className="hidden md:block">
                                        Dashboard
                                    </span>
                                </Button>
                            </Link>
                            <Link
                                href="/dashboard/new"
                                className="hidden md:block"
                            >
                                <Button>Get Started</Button>
                            </Link>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <motion.section
                    className="containerd px-6 py-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col items-center gap-8">
                        <div className="text-center">
                            <motion.h1
                                className={cn(
                                    'text-5xl leading-tight font-medium tracking-tight',
                                    lora.className,
                                )}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                Create Stunning Forms in Minutes
                                <br />
                                with AI-Powered Simplicity
                            </motion.h1>
                            <motion.p
                                className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-zinc-600"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                Describe your form in plain language, and let AI
                                build it for you. Our open-source form builder
                                combines drag-and-drop ease with intelligent
                                automation.
                            </motion.p>
                            <motion.div
                                className="mt-8 flex items-center justify-center gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <Link href="/dashboard/new">
                                    <Button size="lg" className="gap-2">
                                        Start with AI
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href="/f/contact-form">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-zinc-400 text-zinc-800"
                                    >
                                        View Demo
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <Image
                                src="/preview.jpg"
                                alt="Dashboard Preview"
                                width={800}
                                height={600}
                                className="h-auto w-full rounded-lg shadow-lg"
                            />
                        </motion.div>
                    </div>
                </motion.section>

                {/* Features Section */}
                <motion.section
                    className="bg-muted/30 containerd border-t border-zinc-400 py-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="container mx-auto px-6">
                        <motion.h2
                            className="text-center text-3xl font-bold"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Why Choose OpenForm?
                        </motion.h2>
                        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <motion.div
                                className="flex flex-col items-center text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                                    <Bot className="text-primary h-6 w-6" />
                                </div>
                                <h3 className="mt-4 font-semibold">
                                    AI-Powered Generation
                                </h3>
                                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                                    Describe your form in plain language, and
                                    let AI create a robust form instantly
                                </p>
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
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
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                                    <Settings className="text-primary h-6 w-6" />
                                </div>
                                <h3 className="mt-4 font-semibold">
                                    Form Logic
                                </h3>
                                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                                    Add conditional logic to show/hide fields
                                    based on user responses
                                </p>
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                                    <Eye className="text-primary h-6 w-6" />
                                </div>
                                <h3 className="mt-4 font-semibold">
                                    Real-time Preview
                                </h3>
                                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                                    See your form changes instantly with live
                                    preview
                                </p>
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                viewport={{ once: true }}
                            >
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
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                                    <Shield className="text-primary h-6 w-6" />
                                </div>
                                <h3 className="mt-4 font-semibold">
                                    Open Source
                                </h3>
                                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                                    Free and open source, built by the community
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* How It Works Section */}
                <motion.section
                    className="containerd px-6 py-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="container mx-auto">
                        <motion.h2
                            className="mb-12 text-center text-3xl font-bold"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            How It Works
                        </motion.h2>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            <motion.div
                                className="flex flex-col items-center text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold">
                                    1
                                </div>
                                <h3 className="mt-4 font-semibold">
                                    Describe Your Form
                                </h3>
                                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                                    Use AI to generate forms from simple
                                    prompts, or start with our drag-and-drop
                                    builder
                                </p>
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold">
                                    2
                                </div>
                                <h3 className="mt-4 font-semibold">
                                    Customize & Add Logic
                                </h3>
                                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                                    Fine-tune fields, add conditional logic, and
                                    configure validation rules
                                </p>
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold">
                                    3
                                </div>
                                <h3 className="mt-4 font-semibold">
                                    Preview & Test
                                </h3>
                                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                                    See real-time changes and test your form on
                                    all devices
                                </p>
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold">
                                    4
                                </div>
                                <h3 className="mt-4 font-semibold">
                                    Publish & Analyze
                                </h3>
                                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                                    Share your form and track performance with
                                    built-in analytics
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

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

                {/* Roadmap Section */}
                <motion.section
                    className="bg-muted/30 containerd border-t border-zinc-400 py-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="container mx-auto px-6">
                        <motion.h2
                            className="mb-12 text-center text-3xl font-bold"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            What's Coming Next
                        </motion.h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <motion.div
                                className="bg-background rounded-lg border p-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <div className="mb-3 flex items-center gap-3">
                                    <Bot className="text-primary h-5 w-5" />
                                    <h3 className="font-semibold">
                                        AI Integration
                                    </h3>
                                    <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
                                        Soon
                                    </span>
                                </div>
                                <p className="text-muted-foreground text-sm">
                                    Generate forms from natural language prompts
                                    with AI assistance
                                </p>
                            </motion.div>
                            <motion.div
                                className="bg-background rounded-lg border p-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <div className="mb-3 flex items-center gap-3">
                                    <Settings className="text-primary h-5 w-5" />
                                    <h3 className="font-semibold">
                                        Form Templates
                                    </h3>
                                    <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
                                        Soon
                                    </span>
                                </div>
                                <p className="text-muted-foreground text-sm">
                                    Pre-built templates for common form types
                                    and use cases
                                </p>
                            </motion.div>
                            <motion.div
                                className="bg-background rounded-lg border p-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <div className="mb-3 flex items-center gap-3">
                                    <BarChart className="text-primary h-5 w-5" />
                                    <h3 className="font-semibold">
                                        Advanced Analytics
                                    </h3>
                                    <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
                                        Soon
                                    </span>
                                </div>
                                <p className="text-muted-foreground text-sm">
                                    Enhanced reporting and insights for form
                                    performance
                                </p>
                            </motion.div>
                            <motion.div
                                className="bg-background rounded-lg border p-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <div className="mb-3 flex items-center gap-3">
                                    <CheckCircle className="text-primary h-5 w-5" />
                                    <h3 className="font-semibold">
                                        Collaboration
                                    </h3>
                                    <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
                                        Soon
                                    </span>
                                </div>
                                <p className="text-muted-foreground text-sm">
                                    Team features for collaborative form
                                    building
                                </p>
                            </motion.div>
                            <motion.div
                                className="bg-background rounded-lg border p-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                viewport={{ once: true }}
                            >
                                <div className="mb-3 flex items-center gap-3">
                                    <Zap className="text-primary h-5 w-5" />
                                    <h3 className="font-semibold">
                                        API Integrations
                                    </h3>
                                    <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
                                        Soon
                                    </span>
                                </div>
                                <p className="text-muted-foreground text-sm">
                                    Webhooks, Zapier, and third-party service
                                    integrations
                                </p>
                            </motion.div>
                            <motion.div
                                className="bg-background rounded-lg border p-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <div className="mb-3 flex items-center gap-3">
                                    <Smartphone className="text-primary h-5 w-5" />
                                    <h3 className="font-semibold">
                                        Mobile App
                                    </h3>
                                    <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
                                        Soon
                                    </span>
                                </div>
                                <p className="text-muted-foreground text-sm">
                                    Native mobile companion for form management
                                    on the go
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* Footer */}
                <footer className="bg-muted/30 border-t border-zinc-400">
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

                        <div className="text-muted-foreground mt-8 border-t border-zinc-400 pt-8 text-center text-sm">
                            © 2025 G'GRIMS OpenForm. Open source form builder.
                            Made with ❤️ by the community.
                        </div>
                    </div>
                </footer>
            </div>
        </Fragment>
    );
}
