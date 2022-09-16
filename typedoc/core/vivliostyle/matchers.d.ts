/**
 * Checkes whether given order can be represented as an+b with a non-negative
 * interger n
 */
export declare function matchANPlusB(order: number, a: number, b: number): boolean;
export interface Matcher {
    matches(): boolean;
}
export declare class AnyMatcher implements Matcher {
    readonly matchers: Matcher[];
    constructor(matchers: Matcher[]);
    /** @override */
    matches(): boolean;
}
export declare class AllMatcher implements Matcher {
    readonly matchers: Matcher[];
    constructor(matchers: Matcher[]);
    /** @override */
    matches(): boolean;
}
export declare class NthFragmentMatcher implements Matcher {
    readonly elementOffset: number;
    readonly a: number;
    readonly b: number;
    static fragmentIndices: {};
    static registerFragmentIndex(elementOffset: number, fragmentIndex: number, priority: number): void;
    static clearFragmentIndices(): void;
    constructor(elementOffset: number, a: number, b: number);
    /** @override */
    matches(): boolean;
}
export declare class MatcherBuilder {
    static buildViewConditionMatcher(elementOffset: number, viewCondition: string): Matcher;
    static buildAllMatcher(matchers: Matcher[]): Matcher;
    static buildAnyMatcher(matchers: Matcher[]): Matcher;
}
