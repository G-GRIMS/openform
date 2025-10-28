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
    FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<'form'>) {
    const { signIn } = useAuthActions();
    const [step, setStep] = useState<'signUp' | 'signIn'>('signIn');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <form
            className={cn('flex flex-col gap-6', className)}
            onSubmit={async (event) => {
                event.preventDefault();
                setIsLoading(true);
                setError(null);

                try {
                    const formData = new FormData(event.currentTarget);
                    await signIn('password', formData);
                } catch (err) {
                    // Map technical errors to user-friendly messages
                    let errorMessage =
                        'An unexpected error occurred. Please try again.';

                    if (err instanceof Error) {
                        const message = err.message.toLowerCase();

                        if (
                            message.includes('invalidaccountid') ||
                            message.includes('invalid credentials') ||
                            message.includes('wrong password')
                        ) {
                            errorMessage =
                                'Invalid email or password. Please check your credentials and try again.';
                        } else if (
                            message.includes('account not found') ||
                            message.includes('user not found')
                        ) {
                            errorMessage =
                                'Invalid email or password. Please check your credentials and try again.';
                        } else if (
                            message.includes('email not verified') ||
                            message.includes('unverified')
                        ) {
                            errorMessage =
                                'Please verify your email address before signing in.';
                        } else if (
                            message.includes('too many attempts') ||
                            message.includes('rate limit')
                        ) {
                            errorMessage =
                                'Too many login attempts. Please wait a few minutes before trying again.';
                        } else if (
                            message.includes('network') ||
                            message.includes('connection')
                        ) {
                            errorMessage =
                                'Network error. Please check your connection and try again.';
                        } else if (err.message) {
                            // For any other specific error messages, show them if they seem user-friendly
                            errorMessage = err.message;
                        }
                    }

                    setError(errorMessage);
                } finally {
                    setIsLoading(false);
                }
            }}
            {...props}
        >
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">
                        {step === 'signIn'
                            ? 'Login to your account'
                            : 'Create an account'}
                    </h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        {step === 'signIn'
                            ? 'Enter your email below to login to your account'
                            : 'Enter your email below to create your account'}
                    </p>
                </div>
                {step === 'signUp' && (
                    <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your name"
                            required
                        />
                    </Field>
                )}
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
                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        {step === 'signIn' && (
                            <a
                                href="/reset-password"
                                className="ml-auto text-sm underline-offset-4 hover:underline"
                            >
                                Forgot your password?
                            </a>
                        )}
                    </div>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                    />
                </Field>
                <input name="flow" type="hidden" value={step} />
                {error && (
                    <Field>
                        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </div>
                    </Field>
                )}
                <Field>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading
                            ? 'Loading...'
                            : step === 'signIn'
                              ? 'Login'
                              : 'Sign up'}
                    </Button>
                </Field>
                <FieldSeparator>Or continue with</FieldSeparator>
                <Field>
                    <Button variant="outline" type="button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                                fill="currentColor"
                            />
                        </svg>
                        Login with GitHub
                    </Button>
                    <FieldDescription className="text-center">
                        {step === 'signIn'
                            ? "Don't have an account?"
                            : 'Already have an account?'}{' '}
                        <button
                            type="button"
                            className="underline underline-offset-4"
                            onClick={() => {
                                setStep(
                                    step === 'signIn' ? 'signUp' : 'signIn',
                                );
                            }}
                        >
                            {step === 'signIn' ? 'Sign up' : 'Sign in'}
                        </button>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    );
}
