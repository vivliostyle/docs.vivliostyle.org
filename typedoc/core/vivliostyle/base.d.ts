/**
 * RegExp pattern for ::first-letter pseudo element:
 * https://drafts.csswg.org/css-pseudo-4/#first-letter-pseudo
 */
export declare const firstLetterPattern: RegExp;
/**
 * Indicates the offset position of an element in a document
 */
export declare const ELEMENT_OFFSET_ATTR = "data-adapt-eloff";
export declare let emptyObj: {};
export declare type JSON = any;
export declare function jsonToString(json: JSON): string;
export declare function stringToJSON(str: string): JSON;
export declare function stripFragment(url: string): string;
export declare function stripFragmentAndQuery(url: string): string;
/**
 * Base URL relative to which URLs of resources are resolved.
 */
export declare let baseURL: string;
export declare function setBaseURL(value: string): void;
/**
 * Base URL relative to which URLs of resources such as validation.txt and
 * user-agent.css are resolved.
 */
export declare let resourceBaseURL: string;
export declare function setResourceBaseURL(value: string): void;
/**
 * @param relURL relative URL
 * @param baseURL base (absolute) URL
 * @return resolved (absolute) URL
 */
export declare function resolveURL(relURL: string, baseURL: string): string;
/**
 * @return converted URL
 */
export declare function convertSpecialURL(url: string): string;
export interface DocumentURLTransformer {
    transformFragment(fragment: string, baseURL: string): string;
    transformURL(url: string, baseURL: string): string;
    restoreURL(encoded: string): string[];
}
/**
 * Various namespaces.
 * @enum {string}
 */
export declare enum NS {
    epub = "http://www.idpf.org/2007/ops",
    EV = "http://www.w3.org/2001/xml-events",
    MATHML = "http://www.w3.org/1998/Math/MathML",
    XML = "http://www.w3.org/XML/1998/namespace",
    XHTML = "http://www.w3.org/1999/xhtml",
    XLINK = "http://www.w3.org/1999/xlink",
    SHADOW = "http://www.pyroxy.com/ns/shadow",
    SVG = "http://www.w3.org/2000/svg",
    DC = "http://purl.org/dc/elements/1.1/",
    NCX = "http://www.daisy.org/z3986/2005/ncx/"
}
/**
 * @param name parameter name
 * @param opt_url URL; window.location.href is used if not provided
 * @return parameter value
 */
export declare function getURLParam(name: string, opt_url?: string): string | null;
/**
 * @param name parameter name
 * @param value parameter value
 * @return new url
 */
export declare function setURLParam(url: string, name: string, value: string): string;
export declare function asString(v: any): string | null;
export interface Comparable {
    /**
     * @return -1 when this less then other, 0 when this equals other
     */
    compare(other: Comparable): number;
}
/**
 * A priority queue.
 */
export declare class PriorityQueue {
    queue: Comparable[];
    length(): number;
    add(item: Comparable): void;
    /**
     * @return highest priority Comparable.
     */
    peek(): Comparable;
    /**
     * Remove the highest-priority item from the queue.
     * @return removed item.
     */
    remove(): Comparable;
}
export declare const knownPrefixes: string[];
export declare const propNameMap: {
    [key: string]: string[];
};
export declare function checkIfPropertySupported(prefix: string, prop: string): boolean;
export declare function getPrefixedPropertyNames(prop: string): string[] | null;
export declare function setCSSProperty(elem: Element, prop: string, value: string): void;
export declare function getCSSProperty(elem: Element, prop: string, opt_value?: string): string;
export declare function getLangAttribute(element: Element): string;
export declare class StringBuffer {
    list: string[];
    append(str: string): StringBuffer;
    clear(): void;
    /** @override */
    toString(): string;
}
export declare function escapeChar(str: string): string;
export declare function escapeCSSIdent(name: string): string;
export declare function escapeCSSStr(str: string): string;
export declare function lightURLEncode(str: string): string;
export declare function isLetter(ch: string): boolean;
export declare function escapeCharToHex(str: string, prefix?: string): string;
export declare function escapeNameStrToHex(str: string, prefix?: string): string;
export declare function escapeRegExp(str: string): string;
export declare function unescapeCharFromHex(str: string, prefix?: string): string;
export declare function unescapeStrFromHex(str: string, prefix?: string): string;
/**
 * Function good is defined for ints from 0 to high-1. It is such that for
 * each i between 1 and high-1 !good(i-1) || good(i) is true. In other words,
 * it goes like false ... false true ... true.
 * Find i such that (i == 0 || !good(i-1)) && (i == h || good(i))
 * In other words, good(i) is the "first" good = true.
 */
export declare function binarySearch(high: number, good: (p1: number) => boolean): number;
/**
 * Function to sort numbers low to high
 */
export declare function numberCompare(a: number, b: number): number;
export declare const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
export declare function appendBase64(sb: StringBuffer, data: string): void;
/**
 * Index array using key function. First encountered item wins on collision.
 * Elements with empty and null keys are dropped.
 */
export declare function indexArray<T>(arr: T[], key: (p1: T) => string | null): {
    [key: string]: T;
};
/**
 * Convert array of strings to an object with the values in the array set to
 * true.
 */
export declare function arrayToSet(arr: string[]): {
    [key: string]: boolean;
};
/**
 * Index array using key function. Repeated indices are all combined into
 * arrays. Elements with empty and null keys are dropped. Ordering of the
 * elements in arrays is preserved.
 */
export declare function multiIndexArray<T>(arr: T[], key: (p1: T) => string | null): {
    [key: string]: T[];
};
/**
 * Apply function to each value of the object
 * @param fn second parameter is the key
 */
export declare function mapObj<P, R>(obj: {
    [key: string]: P;
}, fn: (p1: P, p2: string) => R): {
    [key: string]: R;
};
export declare function mapSize(obj: object): number;
export declare type Event = {
    type: string;
    target?: any;
    currentTarget?: any;
    preventDefault?: any;
    newPage?: any;
    anchorElement?: any;
    href?: any;
    content?: any;
};
export declare type EventListener = (p1: Event) => void;
/**
 * Extemely simple-minded EventTarget implementation. Consider using
 * goog.events.EventTarget if you are using Closure library.
 */
export declare class SimpleEventTarget {
    listeners: {
        [key: string]: EventListener[];
    };
    dispatchEvent(evt: Event): void;
    addEventListener(type: string, listener: EventListener, capture?: boolean): void;
    removeEventListener(type: string, listener: EventListener, capture?: boolean): void;
}
export declare type EventTarget = SimpleEventTarget;
export declare let hasLShapeFloatBug: boolean | null;
/**
 * Check if there is a bug with L-shape floats overlapping text.
 */
export declare function checkLShapeFloatBug(body: HTMLElement): boolean;
export declare let hasVerticalBBoxBug: boolean | null;
/**
 * Check if there is a bug with the bounding boxes of vertical text characters.
 * Though method used to be used check Chrome bug, it seems that the bug has
 * been already fixed:
 *   https://bugs.chromium.org/p/chromium/issues/detail?id=297808
 * We now use this method to check Firefox bug:
 *   https://bugzilla.mozilla.org/show_bug.cgi?id=1159309
 */
export declare function checkVerticalBBoxBug(body: HTMLElement): boolean;
export declare let hasInlineBlockJustificationBug: boolean | null;
export declare function checkInlineBlockJustificationBug(body: HTMLElement): boolean;
export declare let hasSoftWrapOpportunityAfterHyphenBug: boolean | null;
export declare function checkSoftWrapOpportunityAfterHyphenBug(body: HTMLElement): boolean;
export declare let hasSoftWrapOpportunityByWbrBug: boolean | null;
export declare function checkSoftWrapOpportunityByWbrBug(body: HTMLElement): boolean;
