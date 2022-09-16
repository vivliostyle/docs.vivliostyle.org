/**
 * Performance profiler measuring execution time of the script.
 */
export declare class Profiler {
    readonly performanceInstance: Performance;
    timestamps: {
        [key: string]: {
            [key: string]: number;
        };
    };
    private registerTiming;
    registerStartTiming: (name: string, timestamp?: number) => any;
    registerEndTiming: (name: string, timestamp?: number) => any;
    constructor(performanceInstance: Performance);
    /**
     * Registers start timing of some event, even if profile is disabled.
     * @param name Name of event
     * @param timestamp Used as the actual timestamp of the event if specified,
     *     instead of "now"
     */
    forceRegisterStartTiming(name: string, timestamp?: number): void;
    /**
     * Registers end timing of some event, even if profile is disabled.
     * @param name Name of event
     * @param timestamp Used as the actual timestamp of the event if specified,
     *     instead of "now"
     */
    forceRegisterEndTiming(name: string, timestamp?: number): void;
    /**
     * Log registered timings (start/end/duration).
     * All values are printed in ms unit.
     */
    printTimings(): void;
    /**
     * Disable profiling.
     */
    disable(): void;
    /**
     * Enable profiling.
     */
    enable(): void;
    /**
     * Returns if profiling is enabled or not.
     */
    isEnabled(): boolean;
}
export declare const profiler: Profiler;
/**
 * Pubilc members of the bundled library.
 */
export declare const profile: {
    profiler: {
        registerStartTiming: (name: string, timestamp?: number) => any;
        registerEndTiming: (name: string, timestamp?: number) => any;
        printTimings: () => void;
        disable: () => void;
        enable: () => void;
    };
};
