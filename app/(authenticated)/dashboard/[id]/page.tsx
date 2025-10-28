'use client';

import React from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    BarChart3,
    FileText,
    Settings,
    ExternalLink,
    Edit,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { AsyncErrorBoundary } from '@/components/ui/error-boundary';
import { useForm, useSubmissions, useFormMetrics } from '@/lib/hooks/use-forms';
import { notFound } from 'next/navigation';
import type { Id } from '../../../convex/_generated/dataModel';

export default function FormManagementPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = React.use(params);

    const formQuery = useForm(id as Id<'forms'>);
    const submissionsQuery = useSubmissions(id as Id<'forms'>);
    const analyticsQuery = useFormMetrics(id as Id<'forms'>);

    const form = formQuery;
    const submissions = submissionsQuery?.page || [];
    const analytics = analyticsQuery;

    // Handle loading and error states
    const isLoading = formQuery === undefined;
    const hasError = formQuery === null;

    if (isLoading) {
        return (
            <div className="container mx-auto px-6 py-8">
                <LoadingSkeleton className="mb-6 h-8 w-64" />
                <LoadingSkeleton variant="card" />
            </div>
        );
    }

    if (hasError) {
        console.error('Form not found or error:', { formQuery, form });
        notFound();
    }

    const statusColors = {
        published: 'bg-green-500/10 text-green-700 dark:text-green-400',
        draft: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
        archived: 'bg-gray-500/10 text-gray-700 dark:text-gray-400',
    };

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
                        <Badge
                            variant="secondary"
                            className={statusColors[form.status]}
                        >
                            {form.status}
                        </Badge>
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm">
                        {form.description}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Link href={`/f/${form._id}`} target="_blank">
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 bg-transparent"
                        >
                            <ExternalLink className="h-4 w-4" />
                            Preview
                        </Button>
                    </Link>
                    <Link href={`/dashboard/${form._id}/edit`}>
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
                    {analyticsQuery.isLoading ? (
                        <div className="grid gap-6 md:grid-cols-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <Card key={i}>
                                    <CardHeader className="pb-3">
                                        <LoadingSkeleton className="mb-2 h-4 w-20" />
                                        <LoadingSkeleton className="h-8 w-16" />
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    ) : analytics ? (
                        <>
                            <div className="grid gap-6 md:grid-cols-4">
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardDescription>
                                            Total Views
                                        </CardDescription>
                                        <CardTitle className="text-3xl">
                                            {analytics.totalViews || 0}
                                        </CardTitle>
                                    </CardHeader>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardDescription>
                                            Submissions
                                        </CardDescription>
                                        <CardTitle className="text-3xl">
                                            {analytics.totalSubmissions || 0}
                                        </CardTitle>
                                    </CardHeader>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardDescription>
                                            Completion Rate
                                        </CardDescription>
                                        <CardTitle className="text-3xl">
                                            {analytics.completionRate || 0}%
                                        </CardTitle>
                                    </CardHeader>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardDescription>
                                            Avg. Time
                                        </CardDescription>
                                        <CardTitle className="text-3xl">
                                            {analytics.averageTime || 0}s
                                        </CardTitle>
                                    </CardHeader>
                                </Card>
                            </div>

                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Views & Submissions Over Time
                                    </CardTitle>
                                    <CardDescription>
                                        Last 7 days
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-muted-foreground flex h-[300px] items-center justify-center">
                                        Chart visualization would go here
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <Card>
                            <CardContent className="flex h-[400px] items-center justify-center">
                                <p className="text-muted-foreground">
                                    No analytics data available
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                <TabsContent value="submissions" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Submissions</CardTitle>
                            <CardDescription>
                                {submissionsQuery.isLoading
                                    ? 'Loading...'
                                    : `${submissions.length} total submission${
                                          submissions.length !== 1 ? 's' : ''
                                      }`}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {submissionsQuery.isLoading ? (
                                <div className="space-y-4">
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="rounded-lg border p-4"
                                        >
                                            <LoadingSkeleton className="mb-2 h-4 w-32" />
                                            <div className="space-y-2">
                                                <LoadingSkeleton className="h-3 w-full" />
                                                <LoadingSkeleton className="h-3 w-3/4" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : submissions.length === 0 ? (
                                <div className="text-muted-foreground flex h-[300px] items-center justify-center">
                                    No submissions yet
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {submissions
                                        .slice(0, 10)
                                        .map((submission) => (
                                            <div
                                                key={submission._id}
                                                className="rounded-lg border p-4"
                                            >
                                                <div className="mb-2 flex items-center justify-between">
                                                    <span className="text-sm font-medium">
                                                        Submission #
                                                        {submission._id.slice(
                                                            -8,
                                                        )}
                                                    </span>
                                                    <span className="text-muted-foreground text-xs">
                                                        {new Date(
                                                            submission.submittedAt,
                                                        ).toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="space-y-2 text-sm">
                                                    {Object.entries(
                                                        submission.data,
                                                    ).map(
                                                        ([fieldKey, value]) => {
                                                            const field =
                                                                form.fields?.find(
                                                                    (f) =>
                                                                        f.fieldKey ===
                                                                        fieldKey,
                                                                );
                                                            return (
                                                                <div
                                                                    key={
                                                                        fieldKey
                                                                    }
                                                                    className="flex gap-2"
                                                                >
                                                                    <span className="text-muted-foreground font-medium">
                                                                        {
                                                                            field?.label
                                                                        }
                                                                        :
                                                                    </span>
                                                                    <span>
                                                                        {Array.isArray(
                                                                            value,
                                                                        )
                                                                            ? value.join(
                                                                                  ', ',
                                                                              )
                                                                            : String(
                                                                                  value,
                                                                              )}
                                                                    </span>
                                                                </div>
                                                            );
                                                        },
                                                    )}
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
                            <CardDescription>
                                Configure your form options
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">
                                    Form Status
                                </label>
                                <p className="text-muted-foreground mt-1 text-sm">
                                    Current status:{' '}
                                    <Badge
                                        className={statusColors[form.status]}
                                    >
                                        {form.status}
                                    </Badge>
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium">
                                    Public URL
                                </label>
                                <p className="text-muted-foreground mt-1 text-sm">
                                    {typeof window !== 'undefined'
                                        ? `${window.location.origin}/f/${form._id}`
                                        : `/f/${form._id}`}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium">
                                    Created
                                </label>
                                <p className="text-muted-foreground mt-1 text-sm">
                                    {new Date(form.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium">
                                    Last Updated
                                </label>
                                <p className="text-muted-foreground mt-1 text-sm">
                                    {new Date(form.updatedAt).toLocaleString()}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
