'use client';

import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Button, buttonVariants } from './button';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';

type ButtonProps = React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    };

interface AsyncButtonProps extends ButtonProps {
    loading?: boolean;
    loadingText?: string;
    spinnerClassName?: string;
}

export const AsyncButton = forwardRef<HTMLButtonElement, AsyncButtonProps>(
    (
        {
            children,
            loading = false,
            loadingText,
            disabled,
            className,
            spinnerClassName,
            ...props
        },
        ref,
    ) => {
        const isDisabled = disabled || loading;

        return (
            <Button
                ref={ref}
                disabled={isDisabled}
                className={cn(className)}
                {...props}
            >
                {loading && (
                    <Loader2
                        className={cn(
                            'mr-2 h-4 w-4 animate-spin',
                            spinnerClassName,
                        )}
                    />
                )}
                {loading && loadingText ? loadingText : children}
            </Button>
        );
    },
);

AsyncButton.displayName = 'AsyncButton';

// Specialized button for form submissions
interface SubmitButtonProps extends AsyncButtonProps {
    submitting?: boolean;
    submitText?: string;
}

export const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
    ({ submitting = false, submitText = 'Submitting...', ...props }, ref) => {
        return (
            <AsyncButton
                ref={ref}
                loading={submitting}
                loadingText={submitText}
                {...props}
            />
        );
    },
);

SubmitButton.displayName = 'SubmitButton';

// Specialized button for mutations (create, update, delete)
interface MutationButtonProps extends AsyncButtonProps {
    mutating?: boolean;
    mutationText?: string;
}

export const MutationButton = forwardRef<
    HTMLButtonElement,
    MutationButtonProps
>(({ mutating = false, mutationText = 'Saving...', ...props }, ref) => {
    return (
        <AsyncButton
            ref={ref}
            loading={mutating}
            loadingText={mutationText}
            {...props}
        />
    );
});

MutationButton.displayName = 'MutationButton';
