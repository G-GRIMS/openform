import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const updateField = mutation({
    args: {
        fieldId: v.id('formFields'),
        fieldKey: v.optional(v.string()),
        type: v.optional(
            v.union(
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
        ),
        label: v.optional(v.string()),
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

        const field = await ctx.db.get(args.fieldId);
        if (!field) throw new Error('Field not found');

        const form = await ctx.db.get(field.formId);
        if (!form || form.userId !== userId.subject) {
            throw new Error('Form not found');
        }

        if (form.status === 'published') {
            throw new Error('Cannot modify fields of a published form');
        }

        // Check if field key is unique within the form (if changing)
        if (args.fieldKey && args.fieldKey !== field.fieldKey) {
            const existingField = await ctx.db
                .query('formFields')
                .withIndex('by_form', (q) => q.eq('formId', field.formId))
                .filter((q) => q.eq('fieldKey', args.fieldKey))
                .first();

            if (existingField) {
                throw new Error('Field key must be unique within the form');
            }
        }

        const updates: any = {};

        if (args.fieldKey !== undefined) updates.fieldKey = args.fieldKey;
        if (args.type !== undefined) updates.type = args.type;
        if (args.label !== undefined) updates.label = args.label;
        if (args.placeholder !== undefined)
            updates.placeholder = args.placeholder;
        if (args.description !== undefined)
            updates.description = args.description;
        if (args.required !== undefined) updates.required = args.required;
        if (args.config !== undefined) updates.config = args.config;
        if (args.logic !== undefined) updates.logic = args.logic;

        if (Object.keys(updates).length > 0) {
            await ctx.db.patch(args.fieldId, updates);
            // Update form's updatedAt timestamp
            await ctx.db.patch(field.formId, { updatedAt: Date.now() });
        }

        return args.fieldId;
    },
});

export const reorderFields = mutation({
    args: {
        formId: v.id('forms'),
        fieldOrders: v.array(
            v.object({
                fieldId: v.id('formFields'),
                order: v.number(),
            }),
        ),
    },
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) throw new Error('Unauthorized');

        const form = await ctx.db.get(args.formId);
        if (!form || form.userId !== userId.subject) {
            throw new Error('Form not found');
        }

        if (form.status === 'published') {
            throw new Error('Cannot reorder fields of a published form');
        }

        // Update all field orders in a batch
        for (const fieldOrder of args.fieldOrders) {
            await ctx.db.patch(fieldOrder.fieldId, { order: fieldOrder.order });
        }

        // Update form's updatedAt timestamp
        await ctx.db.patch(args.formId, { updatedAt: Date.now() });

        return args.formId;
    },
});
