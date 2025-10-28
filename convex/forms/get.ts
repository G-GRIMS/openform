import { query } from '../_generated/server';
import { v } from 'convex/values';
import { paginationOptsValidator } from 'convex/server';

export const getForms = query({
    args: {
        status: v.optional(
            v.union(
                v.literal('draft'),
                v.literal('published'),
                v.literal('archived'),
            ),
        ),
        paginationOpts: paginationOptsValidator,
    },
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) throw new Error('Unauthorized');

        let formsQuery = ctx.db
            .query('forms')
            .withIndex('by_user', (q) => q.eq('userId', userId.subject as any));

        if (args.status) {
            formsQuery = formsQuery.filter((q) => q.eq('status', args.status));
        }

        const forms = await formsQuery
            .order('desc')
            .paginate(args.paginationOpts);

        // Get field counts and recent submissions for each form
        const formsWithMeta = await Promise.all(
            forms.page.map(async (form) => {
                const fieldCount = await ctx.db
                    .query('formFields')
                    .withIndex('by_form', (q) => q.eq('formId', form._id))
                    .collect()
                    .then((fields) => fields.length);

                const recentSubmission = await ctx.db
                    .query('submissions')
                    .withIndex('by_form', (q) => q.eq('formId', form._id))
                    .order('desc')
                    .first();

                return {
                    ...form,
                    fieldCount,
                    lastSubmissionAt: recentSubmission?.submittedAt,
                };
            }),
        );

        return {
            ...forms,
            page: formsWithMeta,
        };
    },
});

export const getFormWithFields = query({
    args: { formId: v.id('forms') },
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) throw new Error('Unauthorized');

        const form = await ctx.db.get(args.formId);
        if (!form || form.userId !== userId.subject) {
            throw new Error('Form not found');
        }

        const fields = await ctx.db
            .query('formFields')
            .withIndex('by_form_order', (q) => q.eq('formId', args.formId))
            .order('asc')
            .collect();

        return {
            ...form,
            fields,
        };
    },
});

export const getPublicForm = query({
    args: { formId: v.id('forms') },
    handler: async (ctx, args) => {
        const form = await ctx.db.get(args.formId);
        if (!form || form.status !== 'published') {
            throw new Error('Form not found');
        }

        const fields = await ctx.db
            .query('formFields')
            .withIndex('by_form_order', (q) => q.eq('formId', args.formId))
            .order('asc')
            .collect();

        return {
            _id: form._id,
            title: form.title,
            description: form.description,
            fields,
            settings: {
                allowAnonymous: form.settings.allowAnonymous,
                requireAuth: form.settings.requireAuth,
            },
        };
    },
});
