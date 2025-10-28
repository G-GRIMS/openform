import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const createField = mutation({
    args: {
        formId: v.id('forms'),
        fieldKey: v.string(),
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
        required: v.optional(v.boolean()),
        config: v.optional(
            v.object({
                options: v.optional(v.array(v.string())),
                maxLength: v.optional(v.number()),
                minLength: v.optional(v.number()),
                maxSize: v.optional(v.number()),
                acceptedFormats: v.optional(v.array(v.string())),
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
        ),
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

        if (form.status === 'published') {
            throw new Error('Cannot modify fields of a published form');
        }

        // Check if field key is unique within the form
        const existingField = await ctx.db
            .query('formFields')
            .withIndex('by_form', (q) => q.eq('formId', args.formId))
            .filter((q) => q.eq('fieldKey', args.fieldKey))
            .first();

        if (existingField) {
            throw new Error('Field key must be unique within the form');
        }

        // Get the next order number
        const lastField = await ctx.db
            .query('formFields')
            .withIndex('by_form_order', (q) => q.eq('formId', args.formId))
            .order('desc')
            .first();

        const order = lastField ? lastField.order + 1 : 0;

        const fieldId = await ctx.db.insert('formFields', {
            formId: args.formId,
            fieldKey: args.fieldKey,
            type: args.type,
            label: args.label,
            placeholder: args.placeholder,
            description: args.description,
            required: args.required ?? false,
            order,
            config: args.config ?? {},
            logic: args.logic,
        });

        // Update form's updatedAt timestamp
        await ctx.db.patch(args.formId, { updatedAt: Date.now() });

        return fieldId;
    },
});
