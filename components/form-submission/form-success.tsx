'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

interface FormSuccessProps {
    formTitle: string;
    onReset: () => void;
}

export function FormSuccess({ formTitle, onReset }: FormSuccessProps) {
    return (
        <div className="flex min-h-[90vh] items-center justify-center">
            <div className="max-w-md space-y-6 text-center">
                <div className="flex justify-center">
                    <div className="rounded-full bg-green-100 p-6 dark:bg-green-900/20">
                        <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-500" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-foreground text-2xl font-bold">
                        Thank You!
                    </h2>
                    <p className="text-muted-foreground">
                        Your response to{' '}
                        <span className="text-foreground font-medium">
                            {formTitle}
                        </span>{' '}
                        has been submitted successfully.
                    </p>
                </div>

                <Button onClick={onReset} variant="outline">
                    Submit Another Response
                </Button>
            </div>
        </div>
    );
}
