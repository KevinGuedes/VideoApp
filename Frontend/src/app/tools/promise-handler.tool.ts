export async function handlePromise<T>(promise: Promise<T>): Promise<[T | null, any]> {
    try {
        return [await promise, null];
    } catch (error) {
        console.error(error)
        return [null, error];
    }
}
