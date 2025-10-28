import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const updateForm = mutation({
    args: {
        formId: v.id('forms'),
        title: v.optional(v.string()),
        description: v.optional(v.string()),
        settings: v.optional(
            v.object({
                allowAnonymous: v.optional(v.boolean()),
                requireAuth: v.optional(v.boolean()),
                redirectUrl: v.optional(v.string()),
                emailNotifications: v.optional(v.boolean()),
                webhookUrl: v.optional(v.string()),
                maxSubmissions: v.optional(v.number()),
                submissionLimit: v.optional(v.number()),
            }),
        ),
    },
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) throw new Error('Unauthorized');

        // Handle compound user IDs (split on pipe if present)
        const convexUserId = userId.subject.split('|')[0];

        const form = await ctx.db.get(args.formId);
        if (!form || form.userId !== convexUserId) {
            throw new Error('Form not found');
        }

        const updates: any = {
            updatedAt: Date.now(),
        };

        if (args.title !== undefined) updates.title = args.title;
        if (args.description !== undefined)
            updates.description = args.description;

        if (args.settings) {
            updates.settings = {
                ...form.settings,
                ...args.settings,
            };
        }

        await ctx.db.patch(args.formId, updates);
        return args.formId;
    },
});

export const publishForm = mutation({
    args: { formId: v.id('forms') },
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) throw new Error('Unauthorized');

        // Handle compound user IDs (split on pipe if present)
        const convexUserId = userId.subject.split('|')[0];

        const form = await ctx.db.get(args.formId);
        if (!form || form.userId !== convexUserId) {
            throw new Error('Form not found');
        }

        // Check if form has at least one field
        const fieldCount = await ctx.db
            .query('formFields')
            .withIndex('by_form', (q) => q.eq('formId', args.formId))
            .collect()
            .then((fields) => fields.length);

        if (fieldCount === 0) {
            throw new Error(
                'Form must have at least one field to be published',
            );
        }

        await ctx.db.patch(args.formId, {
            status: 'published',
            updatedAt: Date.now(),
        });

        return args.formId;
    },
});

export const archiveForm = mutation({
    args: { formId: v.id('forms') },
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) throw new Error('Unauthorized');

        // Handle compound user IDs (split on pipe if present)
        const convexUserId = userId.subject.split('|')[0];

        const form = await ctx.db.get(args.formId);
        if (!form || form.userId !== convexUserId) {
            throw new Error('Form not found');
        }

        await ctx.db.patch(args.formId, {
            status: 'archived',
            updatedAt: Date.now(),
        });

        return args.formId;
    },
});
