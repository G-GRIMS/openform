import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const deleteField = mutation({
    args: { fieldId: v.id('formFields') },
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) throw new Error('Unauthorized');

        // Handle compound user IDs (split on pipe if present)
        const convexUserId = userId.subject.split('|')[0];

        const field = await ctx.db.get(args.fieldId);
        if (!field) throw new Error('Field not found');

        const form = await ctx.db.get(field.formId);
        if (!form || form.userId !== convexUserId) {
            throw new Error('Form not found');
        }

        if (form.status === 'published') {
            throw new Error('Cannot delete fields from a published form');
        }

        await ctx.db.delete(args.fieldId);

        // Reorder remaining fields
        const remainingFields = await ctx.db
            .query('formFields')
            .withIndex('by_form_order', (q) => q.eq('formId', field.formId))
            .order('asc')
            .collect();

        for (let i = 0; i < remainingFields.length; i++) {
            if (remainingFields[i].order !== i) {
                await ctx.db.patch(remainingFields[i]._id, { order: i });
            }
        }

        // Update form's updatedAt timestamp
        await ctx.db.patch(field.formId, { updatedAt: Date.now() });

        return args.fieldId;
    },
});
