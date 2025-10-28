import type { Id } from '../../convex/_generated/dataModel';

/**
 * Helper function to convert Convex ID to string for use in URLs or comparisons
 */
export function convexIdToString(id: Id<any>): string {
    return id;
}

/**
 * Helper function to check if a Convex query is loading
 */
export function isConvexLoading<T>(data: T | undefined): data is undefined {
    return data === undefined;
}

/**
 * Helper function to handle Convex pagination options
 */
export function createPaginationOpts(numItems: number, cursor?: string | null) {
    return {
        numItems,
        cursor: cursor || null,
    };
}

/**
 * Helper function to extract error message from Convex errors
 */
export function getConvexErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }
    return 'An unexpected error occurred';
}

/**
 * Helper function to create optimistic updates for Convex mutations
 */
export function createOptimisticUpdate<T>(
    currentData: T[] | undefined,
    updateFn: (item: T) => T,
    filterFn?: (item: T) => boolean,
): T[] | undefined {
    if (!currentData) return currentData;

    return currentData.map((item) => {
        if (!filterFn || filterFn(item)) {
            return updateFn(item);
        }
        return item;
    });
}

/**
 * Helper function to remove items optimistically
 */
export function createOptimisticRemove<T>(
    currentData: T[] | undefined,
    filterFn: (item: T) => boolean,
): T[] | undefined {
    if (!currentData) return currentData;

    return currentData.filter((item) => !filterFn(item));
}

/**
 * Helper function to add items optimistically
 */
export function createOptimisticAdd<T>(
    currentData: T[] | undefined,
    newItem: T,
    position: 'start' | 'end' = 'end',
): T[] | undefined {
    if (!currentData) return [newItem];

    return position === 'start'
        ? [newItem, ...currentData]
        : [...currentData, newItem];
}
