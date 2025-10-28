import { defineSchema, defineTable } from 'convex/server';
import { authTables } from '@convex-dev/auth/server';
import { v } from 'convex/values';

const schema = defineSchema({
    ...authTables,

    // Core form management
    forms: defineTable({
        userId: v.id('users'),
        title: v.string(),
        description: v.string(),
        status: v.union(
            v.literal('draft'),
            v.literal('published'),
            v.literal('archived'),
        ),
        settings: v.object({
            allowAnonymous: v.boolean(),
            requireAuth: v.boolean(),
            redirectUrl: v.optional(v.string()),
            emailNotifications: v.boolean(),
            webhookUrl: v.optional(v.string()),
            maxSubmissions: v.optional(v.number()),
            submissionLimit: v.optional(v.number()),
        }),
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index('by_user', ['userId'])
        .index('by_status', ['status'])
        .index('by_user_status', ['userId', 'status']),

    // Form fields with advanced configuration
    formFields: defineTable({
        formId: v.id('forms'),
        fieldKey: v.string(), // Unique identifier within form
        type: v.union(
            v.literal('text'),
            v.literal('email'),
            v.literal('number'),
            v.literal('date'),
            v.literal('textarea'),
            v.literal('select'),
            v.literal('radio'),
            v.literal('checkbox'),
            v.literal('image'),
            v.literal('file'),
            v.literal('url'),
            v.literal('phone'),
        ),
        label: v.string(),
        placeholder: v.optional(v.string()),
        description: v.optional(v.string()),
        required: v.boolean(),
        order: v.number(),

        // Field-specific configuration
        config: v.object({
            options: v.optional(v.array(v.string())), // For select/radio/checkbox
            maxLength: v.optional(v.number()),
            minLength: v.optional(v.number()),
            maxSize: v.optional(v.number()), // File size in MB
            acceptedFormats: v.optional(v.array(v.string())), // MIME types
            defaultValue: v.optional(v.any()),
            validation: v.optional(
                v.object({
                    pattern: v.optional(v.string()),
                    min: v.optional(v.number()),
                    max: v.optional(v.number()),
                    customError: v.optional(v.string()),
                }),
            ),
        }),

        // Conditional logic
        logic: v.optional(
            v.array(
                v.object({
                    id: v.string(),
                    triggerFieldId: v.string(),
                    condition: v.union(
                        v.literal('equals'),
                        v.literal('not_equals'),
                        v.literal('contains'),
                        v.literal('not_contains'),
                        v.literal('greater_than'),
                        v.literal('less_than'),
                        v.literal('is_empty'),
                        v.literal('is_not_empty'),
                        v.literal('matches_regex'),
                    ),
                    value: v.any(),
                    action: v.union(
                        v.literal('show'),
                        v.literal('hide'),
                        v.literal('require'),
                        v.literal('disable'),
                    ),
                }),
            ),
        ),
    })
        .index('by_form', ['formId'])
        .index('by_form_order', ['formId', 'order']),

    // Form submissions
    submissions: defineTable({
        formId: v.id('forms'),
        userId: v.optional(v.id('users')), // Anonymous submissions allowed
        data: v.any(), // Form field responses
        metadata: v.object({
            userAgent: v.optional(v.string()),
            ipAddress: v.optional(v.string()),
            referrer: v.optional(v.string()),
            completionTime: v.optional(v.number()), // Time to complete in seconds
            startedAt: v.number(),
        }),
        status: v.union(
            v.literal('pending'),
            v.literal('completed'),
            v.literal('spam'),
        ),
        submittedAt: v.number(),
    })
        .index('by_form', ['formId'])
        .index('by_user', ['userId'])
        .index('by_form_date', ['formId', 'submittedAt'])
        .index('by_status', ['status']),

    // Analytics and metrics
    formAnalytics: defineTable({
        formId: v.id('forms'),
        date: v.string(), // YYYY-MM-DD format
        views: v.number(),
        submissions: v.number(),
        uniqueViews: v.number(),
        bounceRate: v.number(),
        completionRate: v.number(),
        averageTime: v.number(), // Average completion time in seconds
        deviceBreakdown: v.object({
            desktop: v.number(),
            mobile: v.number(),
            tablet: v.number(),
        }),
        referrerBreakdown: v.record(v.string(), v.number()),
    })
        .index('by_form', ['formId'])
        .index('by_form_date', ['formId', 'date']),

    // Form views tracking
    formViews: defineTable({
        formId: v.id('forms'),
        userId: v.optional(v.id('users')),
        sessionId: v.string(), // For anonymous tracking
        timestamp: v.number(),
        metadata: v.object({
            userAgent: v.optional(v.string()),
            referrer: v.optional(v.string()),
            country: v.optional(v.string()),
            device: v.optional(v.string()),
        }),
    })
        .index('by_form', ['formId'])
        .index('by_session', ['sessionId'])
        .index('by_form_date', ['formId', 'timestamp']),

    // File uploads for form fields
    formFiles: defineTable({
        submissionId: v.id('submissions'),
        fieldId: v.string(),
        fileId: v.id('_storage'), // Convex file storage
        fileName: v.string(),
        fileSize: v.number(),
        mimeType: v.string(),
        uploadedAt: v.number(),
    }).index('by_submission', ['submissionId']),

    // Webhooks for form submissions
    webhooks: defineTable({
        formId: v.id('forms'),
        url: v.string(),
        events: v.array(
            v.union(
                v.literal('submission.created'),
                v.literal('submission.updated'),
            ),
        ),
        secret: v.string(), // For webhook signature verification
        active: v.boolean(),
        createdAt: v.number(),
    }).index('by_form', ['formId']),

    // Webhook delivery logs
    webhookLogs: defineTable({
        webhookId: v.id('webhooks'),
        event: v.string(),
        payload: v.any(),
        response: v.optional(
            v.object({
                status: v.number(),
                body: v.string(),
            }),
        ),
        success: v.boolean(),
        deliveredAt: v.number(),
        retryCount: v.number(),
    })
        .index('by_webhook', ['webhookId'])
        .index('by_success', ['success']),
});

export default schema;
