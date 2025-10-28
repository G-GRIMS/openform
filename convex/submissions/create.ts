import { mutation } from '../_generated/server';
import { v } from 'convex/values';
// import { triggerWebhooks } from '../webhooks/trigger'; // Will implement later

export const submitForm = mutation({
    args: {
        formId: v.id('forms'),
        data: v.any(),
        metadata: v.optional(
            v.object({
                userAgent: v.optional(v.string()),
                ipAddress: v.optional(v.string()),
                referrer: v.optional(v.string()),
                completionTime: v.optional(v.number()),
                startedAt: v.number(),
            }),
        ),
    },
    handler: async (ctx, args) => {
        const form = await ctx.db.get(args.formId);
        if (!form) throw new Error('Form not found');
        if (form.status !== 'published')
            throw new Error('Form is not published');

        const userId = await ctx.auth.getUserIdentity();

        // Handle compound user IDs (split on pipe if present)
        const convexUserId = userId?.subject.split('|')[0];

        // Check authentication requirements
        if (form.settings.requireAuth && !userId) {
            throw new Error('Authentication required');
        }

        // Check submission limits
        if (form.settings.submissionLimit) {
            const existingSubmissions = await ctx.db
                .query('submissions')
                .withIndex('by_form', (q: any) => q.eq('formId', args.formId))
                .collect();

            if (existingSubmissions.length >= form.settings.submissionLimit) {
                throw new Error('Submission limit reached');
            }
        }

        // Validate form data
        const validationErrors = await validateFormData(
            ctx,
            args.formId,
            args.data,
        );
        if (validationErrors.length > 0) {
            throw new Error(
                `Validation failed: ${validationErrors.join(', ')}`,
            );
        }

        const submissionId = await ctx.db.insert('submissions', {
            formId: args.formId,
            userId: convexUserId as any,
            data: args.data,
            metadata: {
                userAgent: args.metadata?.userAgent,
                ipAddress: args.metadata?.ipAddress,
                referrer: args.metadata?.referrer,
                completionTime: args.metadata?.completionTime,
                startedAt: args.metadata?.startedAt ?? Date.now(),
            },
            status: 'completed',
            submittedAt: Date.now(),
        });

        // Update form analytics
        await updateFormAnalytics(ctx, args.formId);

        // Trigger webhooks (will implement later)
        // if (form.settings.webhookUrl) {
        //   await triggerWebhooks(ctx, args.formId, 'submission.created', {
        //     submissionId,
        //     formId: args.formId,
        //     data: args.data,
        //     submittedAt: Date.now(),
        //   });
        // }

        return submissionId;
    },
});

async function validateFormData(
    ctx: any,
    formId: string,
    data: Record<string, any>,
): Promise<string[]> {
    const errors: string[] = [];

    // Get form fields
    const fields = await ctx.db
        .query('formFields')
        .withIndex('by_form_order', (q: any) => q.eq('formId', formId))
        .order('asc')
        .collect();

    for (const field of fields) {
        const value = data[field.fieldKey];

        // Check required fields
        if (
            field.required &&
            (value === undefined || value === null || value === '')
        ) {
            errors.push(`${field.label} is required`);
            continue;
        }

        // Skip validation if field is not required and empty
        if (
            !field.required &&
            (value === undefined || value === null || value === '')
        ) {
            continue;
        }

        // Type-specific validation
        switch (field.type) {
            case 'email':
                if (value && !isValidEmail(value)) {
                    errors.push(`${field.label} must be a valid email address`);
                }
                break;
            case 'number':
                if (value && isNaN(Number(value))) {
                    errors.push(`${field.label} must be a valid number`);
                }
                break;
            case 'url':
                if (value && !isValidUrl(value)) {
                    errors.push(`${field.label} must be a valid URL`);
                }
                break;
            case 'date':
                if (value && isNaN(Date.parse(value))) {
                    errors.push(`${field.label} must be a valid date`);
                }
                break;
        }

        // Custom validation rules
        if (field.config.validation) {
            const validation = field.config.validation;

            if (
                validation.pattern &&
                value &&
                !new RegExp(validation.pattern).test(value)
            ) {
                errors.push(
                    validation.customError ||
                        `${field.label} format is invalid`,
                );
            }

            if (validation.min !== undefined && value < validation.min) {
                errors.push(
                    `${field.label} must be at least ${validation.min}`,
                );
            }

            if (validation.max !== undefined && value > validation.max) {
                errors.push(`${field.label} must be at most ${validation.max}`);
            }
        }

        // Length validation
        if (typeof value === 'string') {
            if (
                field.config.minLength &&
                value.length < field.config.minLength
            ) {
                errors.push(
                    `${field.label} must be at least ${field.config.minLength} characters`,
                );
            }

            if (
                field.config.maxLength &&
                value.length > field.config.maxLength
            ) {
                errors.push(
                    `${field.label} must be at most ${field.config.maxLength} characters`,
                );
            }
        }
    }

    return errors;
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

async function updateFormAnalytics(ctx: any, formId: string) {
    const today = new Date().toISOString().split('T')[0];

    const existing = await ctx.db
        .query('formAnalytics')
        .withIndex('by_form_date', (q: any) =>
            q.eq('formId', formId).eq('date', today),
        )
        .first();

    if (existing) {
        await ctx.db.patch(existing._id, {
            submissions: existing.submissions + 1,
            completionRate:
                Math.round(
                    ((existing.submissions + 1) / existing.views) * 100 * 100,
                ) / 100,
        });
    } else {
        await ctx.db.insert('formAnalytics', {
            formId,
            date: today,
            views: 0,
            submissions: 1,
            uniqueViews: 0,
            bounceRate: 0,
            completionRate: 0,
            averageTime: 0,
            deviceBreakdown: { desktop: 0, mobile: 0, tablet: 0 },
            referrerBreakdown: {},
        });
    }
}
