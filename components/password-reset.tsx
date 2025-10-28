'use client';

import { useAuthActions } from '@convex-dev/auth/react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function PasswordReset({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const { signIn } = useAuthActions();
    const [step, setStep] = useState<'forgot' | { email: string }>('forgot');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            {step === 'forgot' ? (
                <form
                    onSubmit={async (event) => {
                        event.preventDefault();
                        setIsLoading(true);
                        setError(null);

                        try {
                            const formData = new FormData(event.currentTarget);
                            await signIn('password', formData);
                            setStep({ email: formData.get('email') as string });
                        } catch (err) {
                            setError(
                                err instanceof Error
                                    ? err.message
                                    : 'An error occurred',
                            );
                        } finally {
                            setIsLoading(false);
                        }
                    }}
                >
                    <FieldGroup>
                        <div className="flex flex-col items-center gap-1 text-center">
                            <h1 className="text-2xl font-bold">
                                Reset your password
                            </h1>
                            <p className="text-muted-foreground text-sm text-balance">
                                Enter your email address and we'll send you a
                                reset code
                            </p>
                        </div>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </Field>
                        <input name="flow" type="hidden" value="reset" />
                        {error && step === 'forgot' && (
                            <Field>
                                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                                    {error}
                                </div>
                            </Field>
                        )}
                        <Field>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Send reset code'}
                            </Button>
                        </Field>
                        <FieldDescription className="text-center">
                            <button
                                type="button"
                                className="underline underline-offset-4"
                                onClick={() => window.history.back()}
                            >
                                Back to sign in
                            </button>
                        </FieldDescription>
                    </FieldGroup>
                </form>
            ) : (
                <form
                    onSubmit={async (event) => {
                        event.preventDefault();
                        setIsLoading(true);
                        setError(null);

                        try {
                            const formData = new FormData(event.currentTarget);
                            await signIn('password', formData);
                        } catch (err) {
                            setError(
                                err instanceof Error
                                    ? err.message
                                    : 'An error occurred',
                            );
                        } finally {
                            setIsLoading(false);
                        }
                    }}
                >
                    <FieldGroup>
                        <div className="flex flex-col items-center gap-1 text-center">
                            <h1 className="text-2xl font-bold">
                                Enter reset code
                            </h1>
                            <p className="text-muted-foreground text-sm text-balance">
                                We sent a code to {step.email}
                            </p>
                        </div>
                        <Field>
                            <FieldLabel htmlFor="code">Reset code</FieldLabel>
                            <Input
                                id="code"
                                name="code"
                                type="text"
                                placeholder="123456"
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="newPassword">
                                New password
                            </FieldLabel>
                            <Input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                required
                            />
                        </Field>
                        <input name="email" value={step.email} type="hidden" />
                        <input
                            name="flow"
                            value="reset-verification"
                            type="hidden"
                        />
                        {error && 'email' in step && (
                            <Field>
                                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                                    {error}
                                </div>
                            </Field>
                        )}
                        <Field>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Resetting...' : 'Reset password'}
                            </Button>
                        </Field>
                        <FieldDescription className="text-center">
                            <button
                                type="button"
                                className="underline underline-offset-4"
                                onClick={() => setStep('forgot')}
                            >
                                Try different email
                            </button>
                        </FieldDescription>
                    </FieldGroup>
                </form>
            )}
        </div>
    );
}
