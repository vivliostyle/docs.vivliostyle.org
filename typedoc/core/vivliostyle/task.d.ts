/**
 * Copyright 2013 Google, Inc.
 * Copyright 2015 Trim-marks Inc.
 * Copyright 2019 Vivliostyle Foundation
 *
 * Vivliostyle.js is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Vivliostyle.js is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Vivliostyle.js.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @fileoverview Task - Support for asynchronous execution and cooperative
 * multitasking.
 */
import * as Base from "./base";
/**
 * External timer. Only needed for testing.
 */
export interface Timer {
    /**
     * @return current time in milliseconds.
     */
    currentTime(): number;
    /**
     * Calls function after a given timeout.
     * @param fn function to call.
     * @param delay timeout in milliseconds.
     * @return unique number that can be used to clear the timeout.
     */
    setTimeout(fn: () => void, delay: number): number;
    /**
     * Calls function after a given timeout.
     * @param token timeout token.
     */
    clearTimeout(token: number): void;
}
/**
 * Result of an asynchronous function that may be available immediately or
 * some time later. Similar to Deferred.
 * @template T
 */
export interface Result<T> {
    /**
     * Call the given function when asynchronous function is finished. Callback
     * is executed in the task's context.
     */
    then(callback: (p1: T) => void): void;
    /**
     * Call the given asynchronous function when some asynchronous function is
     * finished. Callback is executed in the task's context.
     * @template T1
     */
    thenAsync<T1>(callback: (p1: T) => Result<T1>): Result<T1>;
    /**
     * Produce a Result that resolves to the given value when this Result is
     * resolved.
     * @template T1
     */
    thenReturn<T1>(result: T1): Result<T1>;
    /**
     * Finish given frame with the result value when result becomes ready.
     */
    thenFinish(frame: Frame<T>): void;
    /**
     * Check if this Result is still pending.
     */
    isPending(): boolean;
    /**
     * If this Result is resolved, return the value that it holds.
     */
    get(): T | null;
}
export declare let privateCurrentTask: Task | null;
export declare let primaryScheduler: Scheduler | null;
/**
 * Returns current task.
 */
export declare function currentTask(): Task | null;
/**
 * Create and return a new frame with the given name.
 */
export declare function newFrame<T>(name: string): Frame<T>;
export declare function newEventSource(): EventSource;
export declare function newScheduler(opt_timer?: Timer): Scheduler;
/**
 * @template T
 */
export declare function newResult<T>(opt_value: T): Result<T>;
/**
 * Creates a new frame and runs code in its context, catching synchronous and
 * asynchronous errors. If an error occurs, onErr is run (in the context of
 * the same frame). As usual, onErr is supposed either produce a result or raise
 * an exception.
 */
export declare function handle<T>(name: any, code: (p1: Frame<T>) => void, onErr: (p1: Frame<T>, p2: Error) => void): Result<T>;
export declare function start<T>(func: () => Result<T>, opt_name?: string): Task;
/**
 * Frame state.
 * @enum {number}
 */
export declare enum FrameState {
    INIT = 0,
    ACTIVE = 1,
    FINISHED = 2,
    DEAD = 3
}
export declare class TimerImpl implements Timer {
    /** @override */
    currentTime(): number;
    /** @override */
    setTimeout(fn: () => void, delay: number): number;
    /** @override */
    clearTimeout(token: number): void;
}
/**
 * A class to create tasks.
 */
export declare class Scheduler {
    timer: Timer;
    timeout: number;
    slice: number;
    sliceOverTime: number;
    queue: Base.PriorityQueue;
    wakeupTime: number | null;
    timeoutToken: number | null;
    inTimeSlice: boolean;
    order: number;
    constructor(timer: Timer);
    /**
     * Sets time slice length.
     * @param slice length in milliseconds.
     */
    setSlice(slice: number): void;
    /**
     * Sets timeout between time slices.
     * @param timeout in milliseconds.
     */
    setTimeout(timeout: number): void;
    /**
     * Checks if the current time slice is over.
     */
    isTimeSliceOver(): boolean;
    private arm;
    schedule(continuation: Continuation<any>, opt_delay?: number): void;
    private doTimeSlice;
    run(func: () => Result<any>, opt_name?: string): Task;
}
/**
 * Task suspension point.
 * @template T
 */
export declare class Continuation<T> implements Base.Comparable {
    task: Task;
    scheduledTime: number;
    order: number;
    result: T;
    canceled: boolean;
    constructor(task: Task);
    /** @override */
    compare(otherComp: Base.Comparable): number;
    /**
     * Continuation's task
     */
    getTask(): Task;
    /**
     * Schedule task continuation after the given (optional) delay.
     * @param opt_delay optional delay in milliseconds.
     */
    schedule(result: T, opt_delay?: number): void;
    resumeInternal(): boolean;
    /**
     * Cancel continuation
     */
    cancel(): void;
}
/**
 * An asynchronous, time-sliced task.
 */
export declare class Task {
    scheduler: Scheduler;
    name: string;
    callbacks: (() => void)[];
    exception: Error | null;
    running: boolean;
    result: any;
    waitTarget: string | null;
    top: Frame<any> | null;
    continuation: Continuation<any> | null;
    constructor(scheduler: Scheduler, name: string);
    /**
     * @return task name.
     */
    getName(): string;
    /**
     * @param err exception to throw in the task's context.
     */
    interrupt(err: Error): void;
    /**
     * @return this task's scheduler.
     */
    getScheduler(): Scheduler;
    /**
     * @return true if task is still running.
     */
    isRunning(): boolean;
    /**
     * Register a callback to be called when the task is done. Callback is not
     * executed in any task context. Multiple callbacks can be registered and
     * they will be called in the registration order.
     */
    whenDone(callback: () => void): void;
    /**
     * Wait for task to finish (from another task).
     */
    join(): Result<any>;
    /**
     * Unwind the stack. We have two stacks: async (maintained by frame
     * parent link) and sync (regular JavaScript stack).
     */
    unwind(): void;
    raise(err: Error, opt_frame?: Frame<any>): void;
    /**
     * Fill the stack trace in the exception
     * @param err exception
     */
    fillStack(err: Error): void;
}
/**
 * @template T
 */
export declare class SyncResultImpl<T> implements Result<T> {
    value: T;
    constructor(value: T);
    /** @override */
    then(callback: (T: any) => void): void;
    /** @override */
    thenAsync<T1>(callback: (p1: T) => Result<T1>): Result<T1>;
    /** @override */
    thenReturn<T1>(result: T1): SyncResultImpl<T1>;
    /** @override */
    thenFinish(frame: Frame<T>): void;
    /** @override */
    isPending(): boolean;
    /** @override */
    get(): T | null;
}
/**
 * @template T
 */
export declare class ResultImpl<T> implements Result<T> {
    readonly frame: Frame<T>;
    constructor(frame: Frame<T>);
    /** @override */
    then(callback: (p1: T) => void): void;
    /** @override */
    thenAsync<T1>(callback: (p1: T) => Result<T1>): Result<T1>;
    /** @override */
    thenReturn<T1>(result: T1): Result<any> | SyncResultImpl<T1>;
    /** @override */
    thenFinish(frame: Frame<T>): void;
    /** @override */
    isPending(): boolean;
    /** @override */
    get(): T | null;
}
/**
 * Asynchronous execution frame. Corresponds to an asynchronous function
 * invocation.
 * @template T
 */
export declare class Frame<T> {
    task: Task;
    parent: Frame<T>;
    name: string;
    res: T;
    state: FrameState;
    callback: ((p1: any) => void) | null;
    handler: ((p1: Frame<any>, p2: Error) => void) | null;
    constructor(task: Task, parent: Frame<T>, name: string);
    private checkEnvironment;
    /**
     * @return to be returned as this asynchronous function return value.
     */
    result(): Result<T>;
    finish(res: T): void;
    getTask(): Task;
    /**
     * @return frame name.
     */
    getName(): string;
    getScheduler(): Scheduler;
    then(callback: (p1: T) => void): void;
    /**
     * If this task was executed longer than task's slice parameter.
     * @return holds true
     */
    timeSlice(): Result<boolean>;
    /**
     * Yield to other tasks for the specified time.
     * @param delay in milliseconds.
     * @return holds true
     */
    sleep(delay: number): Result<boolean>;
    /**
     * Repeatedly execute the given function asynchronously until it returns
     * false.
     * @return holds true.
     */
    loop(func: () => Result<boolean>): Result<boolean>;
    /**
     * Similar to loop(), but provides a Frame for loop body function.
     * @return holds true.
     */
    loopWithFrame(func: (p1: LoopBodyFrame) => void): Result<boolean>;
    suspend(opt_waitTarget?: any): Continuation<T>;
}
export declare class LoopBodyFrame extends Frame<boolean> {
    constructor(task: Task, parent: Frame<boolean>);
    continueLoop(): void;
    breakLoop(): void;
}
export declare class EventItem {
    event: Base.Event;
    next: EventItem;
    constructor(event: Base.Event);
}
/**
 * An class to listen to evens and present them as a readable asynchronous
 * stream to tasks.
 */
export declare class EventSource {
    continuation: Continuation<boolean>;
    listeners: {
        target: Base.EventTarget;
        type: string;
        listener: Base.EventListener;
    }[];
    head: EventItem;
    tail: EventItem;
    constructor();
    /**
     * Attaches as an event listener to an EventTarget.
     */
    attach(target: Base.EventTarget, type: string, opt_preventDefault?: boolean): void;
    detach(target: Base.EventTarget, type: string): void;
    /**
     * Read next dispatched event, blocking the current task if needed.
     */
    nextEvent(): Result<Base.Event>;
}
