import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const createForm = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        settings: v.optional(
            v.object({
                allowAnonymous: v.boolean(),
                requireAuth: v.boolean(),
                redirectUrl: v.optional(v.string()),
                emailNotifications: v.boolean(),
                webhookUrl: v.optional(v.string()),
                maxSubmissions: v.optional(v.number()),
                submissionLimit: v.optional(v.number()),
            }),
        ),
    },
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) throw new Error('Unauthorized');

        const now = Date.now();

        const formId = await ctx.db.insert('forms', {
            userId: userId.subject as any,
            title: args.title,
            description: args.description,
            status: 'draft',
            settings: {
                allowAnonymous: args.settings?.allowAnonymous ?? true,
                requireAuth: args.settings?.requireAuth ?? false,
                redirectUrl: args.settings?.redirectUrl,
                emailNotifications: args.settings?.emailNotifications ?? false,
                webhookUrl: args.settings?.webhookUrl,
                maxSubmissions: args.settings?.maxSubmissions,
                submissionLimit: args.settings?.submissionLimit,
            },
            createdAt: now,
            updatedAt: now,
        });

        return formId;
    },
});
