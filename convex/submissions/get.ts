import { query } from '../_generated/server';
import { v } from 'convex/values';
import { paginationOptsValidator } from 'convex/server';

export const getSubmissions = query({
    args: {
        formId: v.id('forms'),
        status: v.optional(
            v.union(
                v.literal('pending'),
                v.literal('completed'),
                v.literal('spam'),
            ),
        ),
        paginationOpts: paginationOptsValidator,
    },
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) throw new Error('Unauthorized');

        const form = await ctx.db.get(args.formId);
        if (!form || form.userId !== userId.subject) {
            throw new Error('Form not found');
        }

        let submissionsQuery = ctx.db
            .query('submissions')
            .withIndex('by_form', (q: any) => q.eq('formId', args.formId));

        if (args.status) {
            submissionsQuery = submissionsQuery.filter((q: any) =>
                q.eq('status', args.status),
            );
        }

        const submissions = await submissionsQuery
            .order('desc')
            .paginate(args.paginationOpts);

        return submissions;
    },
});

export const getSubmission = query({
    args: { submissionId: v.id('submissions') },
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) throw new Error('Unauthorized');

        const submission = await ctx.db.get(args.submissionId);
        if (!submission) throw new Error('Submission not found');

        const form = await ctx.db.get(submission.formId);
        if (!form || form.userId !== userId.subject) {
            throw new Error('Form not found');
        }

        return submission;
    },
});

export const getSubmissionCount = query({
    args: { formId: v.id('forms') },
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) throw new Error('Unauthorized');

        const form = await ctx.db.get(args.formId);
        if (!form || form.userId !== userId.subject) {
            throw new Error('Form not found');
        }

        const count = await ctx.db
            .query('submissions')
            .withIndex('by_form', (q: any) => q.eq('formId', args.formId))
            .collect()
            .then((submissions) => submissions.length);

        return count;
    },
});
