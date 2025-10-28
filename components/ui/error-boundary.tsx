'use client';

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './card';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.props.onError?.(error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <Card className="mx-auto max-w-md">
                    <CardHeader className="text-center">
                        <div className="bg-destructive/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                            <AlertTriangle className="text-destructive h-6 w-6" />
                        </div>
                        <CardTitle>Something went wrong</CardTitle>
                        <CardDescription>
                            An unexpected error occurred. Please try again.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <Button onClick={this.handleRetry} className="gap-2">
                            <RefreshCw className="h-4 w-4" />
                            Try Again
                        </Button>
                        {process.env.NODE_ENV === 'development' &&
                            this.state.error && (
                                <details className="mt-4 text-left">
                                    <summary className="cursor-pointer text-sm font-medium">
                                        Error Details (Development)
                                    </summary>
                                    <pre className="text-muted-foreground mt-2 text-xs whitespace-pre-wrap">
                                        {this.state.error.message}
                                        {'\n'}
                                        {this.state.error.stack}
                                    </pre>
                                </details>
                            )}
                    </CardContent>
                </Card>
            );
        }

        return this.props.children;
    }
}

interface AsyncErrorBoundaryProps {
    children: ReactNode;
    loading?: ReactNode;
    error?: Error | null;
    onRetry?: () => void;
    fallback?: ReactNode;
}

export function AsyncErrorBoundary({
    children,
    loading,
    error,
    onRetry,
    fallback,
}: AsyncErrorBoundaryProps): React.JSX.Element {
    if (error) {
        if (fallback) {
            return <>{fallback}</>;
        }

        return (
            <Card className="mx-auto max-w-md">
                <CardHeader className="text-center">
                    <div className="bg-destructive/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                        <AlertTriangle className="text-destructive h-6 w-6" />
                    </div>
                    <CardTitle>Failed to load data</CardTitle>
                    <CardDescription>
                        {error.message || 'An unexpected error occurred.'}
                    </CardDescription>
                </CardHeader>
                {onRetry && (
                    <CardContent className="text-center">
                        <Button
                            onClick={onRetry}
                            variant="outline"
                            className="gap-2"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Retry
                        </Button>
                    </CardContent>
                )}
            </Card>
        );
    }

    if (loading) {
        return <>{loading}</>;
    }

    return <>{children}</>;
}
