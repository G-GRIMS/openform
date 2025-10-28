'use client';

import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
    className?: string;
    variant?: 'default' | 'card' | 'text' | 'avatar';
    lines?: number;
}

export function LoadingSkeleton({
    className,
    variant = 'default',
    lines = 1,
}: LoadingSkeletonProps) {
    if (variant === 'card') {
        return (
            <div className={cn('bg-card rounded-lg border p-4', className)}>
                <div className="space-y-3">
                    <div className="bg-muted h-4 w-3/4 animate-pulse rounded" />
                    <div className="bg-muted h-3 w-1/2 animate-pulse rounded" />
                    <div className="flex gap-2">
                        <div className="bg-muted h-6 w-16 animate-pulse rounded" />
                        <div className="bg-muted h-6 w-16 animate-pulse rounded" />
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'avatar') {
        return (
            <div
                className={cn(
                    'bg-muted h-10 w-10 animate-pulse rounded-full',
                    className,
                )}
            />
        );
    }

    if (variant === 'text') {
        return (
            <div className={cn('space-y-2', className)}>
                {Array.from({ length: lines }).map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            'bg-muted h-4 animate-pulse rounded',
                            i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full',
                        )}
                    />
                ))}
            </div>
        );
    }

    return (
        <div
            className={cn(
                'bg-muted h-4 w-full animate-pulse rounded',
                className,
            )}
        />
    );
}

interface FormSkeletonProps {
    className?: string;
}

export function FormSkeleton({ className }: FormSkeletonProps) {
    return (
        <div className={cn('space-y-6', className)}>
            <div className="space-y-2">
                <LoadingSkeleton className="h-6 w-48" />
                <LoadingSkeleton className="h-4 w-64" />
            </div>
            <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                        <LoadingSkeleton className="h-4 w-32" />
                        <LoadingSkeleton className="h-10 w-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}

interface DashboardSkeletonProps {
    className?: string;
}

export function DashboardSkeleton({ className }: DashboardSkeletonProps) {
    return (
        <div className={cn('space-y-6', className)}>
            <div className="space-y-2">
                <LoadingSkeleton className="h-8 w-64" />
                <LoadingSkeleton className="h-4 w-96" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <LoadingSkeleton key={i} variant="card" />
                ))}
            </div>
        </div>
    );
}
