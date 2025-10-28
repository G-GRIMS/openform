import { mutation } from '../_generated/server';
import { v } from 'convex/values';

export const trackFormView = mutation({
    args: {
        formId: v.id('forms'),
        sessionId: v.string(),
        metadata: v.optional(
            v.object({
                userAgent: v.optional(v.string()),
                referrer: v.optional(v.string()),
                country: v.optional(v.string()),
                device: v.optional(v.string()),
            }),
        ),
    },
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();

        // Handle compound user IDs (split on pipe if present)
        const convexUserId = userId?.subject.split('|')[0];

        // Check if we've already tracked this session today
        const today = new Date().toISOString().split('T')[0];
        const existingView = await ctx.db
            .query('formViews')
            .withIndex('by_form', (q: any) => q.eq('formId', args.formId))
            .filter((q: any) => q.eq('sessionId', args.sessionId))
            .filter((q: any) => {
                const viewDate = new Date(q.field('timestamp'))
                    .toISOString()
                    .split('T')[0];
                return viewDate === today;
            })
            .first();

        if (!existingView) {
            await ctx.db.insert('formViews', {
                formId: args.formId,
                userId: convexUserId as any,
                sessionId: args.sessionId,
                timestamp: Date.now(),
                metadata: {
                    userAgent: args.metadata?.userAgent,
                    referrer: args.metadata?.referrer,
                    country: args.metadata?.country,
                    device: args.metadata?.device,
                },
            });

            // Update analytics
            await updateAnalyticsForView(
                ctx,
                args.formId,
                args.metadata?.device,
            );
        }

        return args.formId;
    },
});

async function updateAnalyticsForView(
    ctx: any,
    formId: string,
    device?: string,
) {
    const today = new Date().toISOString().split('T')[0];

    const existing = await ctx.db
        .query('formAnalytics')
        .withIndex('by_form_date', (q: any) =>
            q.eq('formId', formId).eq('date', today),
        )
        .first();

    if (existing) {
        const deviceBreakdown = { ...existing.deviceBreakdown };
        if (device) {
            const deviceType = getDeviceType(device);
            deviceBreakdown[deviceType] =
                (deviceBreakdown[deviceType] || 0) + 1;
        }

        await ctx.db.patch(existing._id, {
            views: existing.views + 1,
            uniqueViews: existing.uniqueViews + 1,
            deviceBreakdown,
            completionRate:
                existing.submissions > 0
                    ? Math.round(
                          (existing.submissions / (existing.views + 1)) *
                              100 *
                              100,
                      ) / 100
                    : 0,
        });
    } else {
        const deviceBreakdown = { desktop: 0, mobile: 0, tablet: 0 };
        if (device) {
            const deviceType = getDeviceType(device);
            deviceBreakdown[deviceType] = 1;
        }

        await ctx.db.insert('formAnalytics', {
            formId,
            date: today,
            views: 1,
            submissions: 0,
            uniqueViews: 1,
            bounceRate: 0,
            completionRate: 0,
            averageTime: 0,
            deviceBreakdown,
            referrerBreakdown: {},
        });
    }
}

function getDeviceType(userAgent: string): 'desktop' | 'mobile' | 'tablet' {
    const ua = userAgent.toLowerCase();
    if (
        ua.includes('mobile') ||
        ua.includes('android') ||
        ua.includes('iphone')
    ) {
        return ua.includes('tablet') || ua.includes('ipad')
            ? 'tablet'
            : 'mobile';
    }
    return 'desktop';
}
