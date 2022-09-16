import * as Task from "./task";
/**
 * A class that can fetch or compute a resource that may be needed by multiple
 * tasks. The first time a resource is requested, it is fetched and then given
 * to everyone requesting it.
 * @template T
 * @param fetch function that fetches/computes
 *    a resource; it will be run in a separate task.
 */
export declare class Fetcher<T> {
    readonly fetch: () => Task.Result<T>;
    name: string;
    arrived: boolean;
    resource: T;
    task: Task.Task;
    piggybacks: ((p1: any) => void)[] | null;
    constructor(fetch: () => Task.Result<T>, opt_name?: string);
    /**
     * Start fetching/computing a resource, don't block current task.
     */
    start(): void;
    piggyback(fn: (p1: T) => void): void;
    /**
     * Fetches the resource, waits for it to arrive if it is already being
     * fetched.
     */
    get(): Task.Result<T>;
    hasArrived(): boolean;
}
/**
 * Wait for all Fetcher objects in the array to arrive
 */
export declare const waitForFetchers: <T>(fetchers: Fetcher<T>[]) => Task.Result<boolean>;
/**
 * @return holding event type (load/error/abort)
 */
export declare function loadElement(elem: Element, src?: string): Fetcher<string>;
