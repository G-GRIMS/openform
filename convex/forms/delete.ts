import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const deleteForm = mutation({
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

        // Delete all related data in the correct order to maintain referential integrity

        // Delete form files
        const submissions = await ctx.db
            .query('submissions')
            .withIndex('by_form', (q) => q.eq('formId', args.formId))
            .collect();

        for (const submission of submissions) {
            const files = await ctx.db
                .query('formFiles')
                .withIndex('by_submission', (q) =>
                    q.eq('submissionId', submission._id),
                )
                .collect();

            for (const file of files) {
                await ctx.storage.delete(file.fileId);
                await ctx.db.delete(file._id);
            }
        }

        // Delete submissions
        for (const submission of submissions) {
            await ctx.db.delete(submission._id);
        }

        // Delete form fields
        const fields = await ctx.db
            .query('formFields')
            .withIndex('by_form', (q) => q.eq('formId', args.formId))
            .collect();

        for (const field of fields) {
            await ctx.db.delete(field._id);
        }

        // Delete analytics
        const analytics = await ctx.db
            .query('formAnalytics')
            .withIndex('by_form', (q) => q.eq('formId', args.formId))
            .collect();

        for (const analytic of analytics) {
            await ctx.db.delete(analytic._id);
        }

        // Delete form views
        const views = await ctx.db
            .query('formViews')
            .withIndex('by_form', (q) => q.eq('formId', args.formId))
            .collect();

        for (const view of views) {
            await ctx.db.delete(view._id);
        }

        // Delete webhooks and their logs
        const webhooks = await ctx.db
            .query('webhooks')
            .withIndex('by_form', (q) => q.eq('formId', args.formId))
            .collect();

        for (const webhook of webhooks) {
            const logs = await ctx.db
                .query('webhookLogs')
                .withIndex('by_webhook', (q) => q.eq('webhookId', webhook._id))
                .collect();

            for (const log of logs) {
                await ctx.db.delete(log._id);
            }

            await ctx.db.delete(webhook._id);
        }

        // Finally delete the form
        await ctx.db.delete(args.formId);

        return args.formId;
    },
});

export const duplicateForm = mutation({
    args: { formId: v.id('forms') },
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) throw new Error('Unauthorized');

        // Handle compound user IDs (split on pipe if present)
        const convexUserId = userId.subject.split('|')[0];

        const originalForm = await ctx.db.get(args.formId);
        if (!originalForm || originalForm.userId !== convexUserId) {
            throw new Error('Form not found');
        }

        const now = Date.now();

        // Create new form
        const newFormId = await ctx.db.insert('forms', {
            userId: convexUserId as any,
            title: `${originalForm.title} (Copy)`,
            description: originalForm.description,
            status: 'draft',
            settings: originalForm.settings,
            createdAt: now,
            updatedAt: now,
        });

        // Duplicate form fields
        const fields = await ctx.db
            .query('formFields')
            .withIndex('by_form_order', (q) => q.eq('formId', args.formId))
            .order('asc')
            .collect();

        for (const field of fields) {
            await ctx.db.insert('formFields', {
                formId: newFormId,
                fieldKey: field.fieldKey,
                type: field.type,
                label: field.label,
                placeholder: field.placeholder,
                description: field.description,
                required: field.required,
                order: field.order,
                config: field.config,
                logic: field.logic,
            });
        }

        return newFormId;
    },
});
