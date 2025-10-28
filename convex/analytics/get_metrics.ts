import { query } from '../_generated/server';
import { v } from 'convex/values';

export const getFormMetrics = query({
    args: {
        formId: v.id('forms'),
        startDate: v.optional(v.string()), // YYYY-MM-DD format
        endDate: v.optional(v.string()), // YYYY-MM-DD format
    },
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) throw new Error('Unauthorized');

        const form = await ctx.db.get(args.formId);
        if (!form || form.userId !== userId.subject) {
            throw new Error('Form not found');
        }

        const startDate =
            args.startDate ||
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split('T')[0];
        const endDate = args.endDate || new Date().toISOString().split('T')[0];

        // Get analytics data for the date range
        const analytics = await ctx.db
            .query('formAnalytics')
            .withIndex('by_form', (q: any) => q.eq('formId', args.formId))
            .collect();

        const filteredAnalytics = analytics.filter((item) => {
            return item.date >= startDate && item.date <= endDate;
        });

        // Calculate aggregated metrics
        const totalViews = filteredAnalytics.reduce(
            (sum, item) => sum + item.views,
            0,
        );
        const totalSubmissions = filteredAnalytics.reduce(
            (sum, item) => sum + item.submissions,
            0,
        );
        const totalUniqueViews = filteredAnalytics.reduce(
            (sum, item) => sum + item.uniqueViews,
            0,
        );

        const completionRate =
            totalViews > 0
                ? Math.round((totalSubmissions / totalViews) * 100 * 100) / 100
                : 0;

        // Calculate average completion time
        const submissions = await ctx.db
            .query('submissions')
            .withIndex('by_form_date', (q: any) => q.eq('formId', args.formId))
            .collect();

        const validSubmissions = submissions.filter(
            (sub) =>
                sub.metadata.completionTime && sub.metadata.completionTime > 0,
        );

        const averageTime =
            validSubmissions.length > 0
                ? Math.round(
                      validSubmissions.reduce(
                          (sum, sub) => sum + sub.metadata.completionTime!,
                          0,
                      ) / validSubmissions.length,
                  )
                : 0;

        // Device breakdown
        const deviceBreakdown = filteredAnalytics.reduce(
            (acc, item) => ({
                desktop: acc.desktop + item.deviceBreakdown.desktop,
                mobile: acc.mobile + item.deviceBreakdown.mobile,
                tablet: acc.tablet + item.deviceBreakdown.tablet,
            }),
            { desktop: 0, mobile: 0, tablet: 0 },
        );

        // Views by date
        const viewsByDate = filteredAnalytics
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((item) => ({ date: item.date, count: item.views }));

        // Submissions by date
        const submissionsByDate = filteredAnalytics
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((item) => ({ date: item.date, count: item.submissions }));

        return {
            formId: args.formId,
            totalViews,
            totalSubmissions,
            totalUniqueViews,
            completionRate,
            averageTime,
            deviceBreakdown,
            viewsByDate,
            submissionsByDate,
            dateRange: { startDate, endDate },
        };
    },
});

export const getFormInsights = query({
    args: { formId: v.id('forms') },
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) throw new Error('Unauthorized');

        const form = await ctx.db.get(args.formId);
        if (!form || form.userId !== userId.subject) {
            throw new Error('Form not found');
        }

        // Get recent submissions for insights
        const recentSubmissions = await ctx.db
            .query('submissions')
            .withIndex('by_form', (q: any) => q.eq('formId', args.formId))
            .order('desc')
            .take(100);

        // Calculate insights
        const insights = {
            totalSubmissions: recentSubmissions.length,
            averageCompletionTime:
                calculateAverageCompletionTime(recentSubmissions),
            peakHours: calculatePeakHours(recentSubmissions),
            topReferrers: calculateTopReferrers(recentSubmissions),
            deviceDistribution: calculateDeviceDistribution(recentSubmissions),
            formHealth: calculateFormHealth(form, recentSubmissions),
        };

        return insights;
    },
});

function calculateAverageCompletionTime(submissions: any[]): number {
    const validTimes = submissions
        .map((sub) => sub.metadata.completionTime)
        .filter((time) => time && time > 0);

    return validTimes.length > 0
        ? Math.round(
              validTimes.reduce((sum, time) => sum + time, 0) /
                  validTimes.length,
          )
        : 0;
}

function calculatePeakHours(
    submissions: any[],
): { hour: number; count: number }[] {
    const hourCounts: Record<number, number> = {};

    submissions.forEach((sub) => {
        const hour = new Date(sub.submittedAt).getHours();
        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    return Object.entries(hourCounts)
        .map(([hour, count]) => ({ hour: parseInt(hour), count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
}

function calculateTopReferrers(
    submissions: any[],
): { referrer: string; count: number }[] {
    const referrerCounts: Record<string, number> = {};

    submissions.forEach((sub) => {
        const referrer = sub.metadata.referrer || 'direct';
        referrerCounts[referrer] = (referrerCounts[referrer] || 0) + 1;
    });

    return Object.entries(referrerCounts)
        .map(([referrer, count]) => ({ referrer, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
}

function calculateDeviceDistribution(
    submissions: any[],
): Record<string, number> {
    const deviceCounts: Record<string, number> = {
        desktop: 0,
        mobile: 0,
        tablet: 0,
        unknown: 0,
    };

    submissions.forEach((sub) => {
        const ua = sub.metadata.userAgent?.toLowerCase() || '';
        if (
            ua.includes('mobile') ||
            ua.includes('android') ||
            ua.includes('iphone')
        ) {
            if (ua.includes('tablet') || ua.includes('ipad')) {
                deviceCounts.tablet++;
            } else {
                deviceCounts.mobile++;
            }
        } else if (
            ua.includes('desktop') ||
            (!ua.includes('mobile') && !ua.includes('tablet'))
        ) {
            deviceCounts.desktop++;
        } else {
            deviceCounts.unknown++;
        }
    });

    return deviceCounts;
}

function calculateFormHealth(
    form: any,
    submissions: any[],
): {
    score: number;
    issues: string[];
    recommendations: string[];
} {
    const issues: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // Check if form has submissions
    if (submissions.length === 0) {
        issues.push('No submissions yet');
        recommendations.push('Share your form to start collecting responses');
        score -= 20;
    }

    // Check completion rate (assuming we have view data)
    // This would need actual view tracking to be accurate

    // Check if form is published
    if (form.status !== 'published') {
        issues.push('Form is not published');
        recommendations.push(
            'Publish your form to start accepting submissions',
        );
        score -= 30;
    }

    // Check field count
    const fieldCount = form.fields?.length || 0;
    if (fieldCount === 0) {
        issues.push('Form has no fields');
        recommendations.push('Add fields to your form');
        score -= 50;
    } else if (fieldCount > 20) {
        issues.push('Form has many fields');
        recommendations.push('Consider splitting into multiple forms or steps');
        score -= 10;
    }

    return {
        score: Math.max(0, score),
        issues,
        recommendations,
    };
}
