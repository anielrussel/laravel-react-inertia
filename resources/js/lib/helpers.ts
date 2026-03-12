// Helper function to avoid attaching filters to url params when null or empty string
export function cleanParams<T extends Record<string, any>>(
    params: T,
): Partial<T> {
    return Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== '' && v !== null),
    ) as Partial<T>;
}
