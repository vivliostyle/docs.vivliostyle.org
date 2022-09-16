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
 * @fileoverview Exprs - `-epubx-expr` Adaptive Layout expressions.
 */
import * as Base from "./base";
export declare type Preferences = {
    fontFamily: string;
    lineHeight: number;
    margin: number;
    hyphenate: boolean;
    columnWidth: number;
    horizontal: boolean;
    nightMode: boolean;
    spreadView: boolean;
    pageBorder: number;
    enabledMediaTypes: {
        [key: string]: boolean;
    };
    defaultPaperSize?: {
        [key: string]: number;
    };
};
export declare function defaultPreferences(): Preferences;
export declare function clonePreferences(pref: Preferences): Preferences;
export declare const defaultPreferencesInstance: Preferences;
interface Pending {
}
declare type Special = Pending;
/**
 * Special marker value that indicates that the expression result is being
 * calculated.
 */
export declare const Special: {
    PENDING: Pending;
};
export declare type Result = string | number | boolean | undefined;
export declare type PendingResult = Special | Result;
export declare function letterbox(viewW: number, viewH: number, objW: number, objH: number): string;
/**
 * @return string that can be parsed as CSS string with value str
 */
export declare function cssString(str: string): string;
/**
 * @return string that can be parsed as CSS name
 */
export declare function cssIdent(name: string): string;
export declare function makeQualifiedName(objName: string | null, memberName: string): string;
export declare let nextKeyIndex: number;
/**
 * Lexical scope of the expression.
 */
export declare class LexicalScope {
    parent: LexicalScope;
    resolver?: (p1: string, p2: boolean) => Val;
    scopeKey: string;
    children: LexicalScope[];
    zero: Const;
    one: Const;
    _true: Const;
    _false: Const;
    values: {
        [key: string]: Val;
    };
    funcs: {
        [key: string]: Val;
    };
    builtIns: {
        [key: string]: (...p1: Result[]) => Result;
    };
    constructor(parent: LexicalScope, resolver?: (p1: string, p2: boolean) => Val);
    defineBuiltInName(name: string, fn: () => Result): void;
    defineName(qualifiedName: string, val: Val): void;
    defineFunc(qualifiedName: string, val: Val): void;
    defineBuiltIn(qualifiedName: string, fn: (...p1: Result[]) => Result): void;
}
export declare function isAbsoluteLengthUnit(unit: string): boolean;
export declare function isViewportRelativeLengthUnit(unit: string): boolean;
export declare function isFontRelativeLengthUnit(unit: string): boolean;
export declare const defaultUnitSizes: {
    [key: string]: number;
};
/**
 * Returns if a unit should be converted to px before applied to the raw DOM.
 */
export declare function needUnitConversion(unit: string): boolean;
export declare type ScopeContext = {
    [key: string]: Result;
};
/**
 * Run-time instance of a scope and its children.
 */
export declare class Context {
    readonly rootScope: LexicalScope;
    readonly viewportWidth: number;
    readonly viewportHeight: number;
    protected actualPageWidth: number | null;
    pageWidth: () => number;
    protected actualPageHeight: number | null;
    pageHeight: () => number;
    initialFontSize: number;
    rootFontSize: number | null;
    isRelativeRootFontSize: boolean | null;
    fontSize: () => number;
    pref: Preferences;
    scopes: {
        [key: string]: ScopeContext;
    };
    pageAreaWidth: number | null;
    pageAreaHeight: number | null;
    pageVertical: boolean | null;
    pubTitle: string | null;
    docTitle: string | null;
    constructor(rootScope: LexicalScope, viewportWidth: number, viewportHeight: number, fontSize: number);
    private getScopeContext;
    clearScope(scope: LexicalScope): void;
    queryUnitSize(unit: string, isRoot: boolean): number;
    evalName(scope: LexicalScope, qualifiedName: string): Val;
    /**
     * @param noBuiltInEval don't evaluate built-ins (for dependency calculations)
     */
    evalCall(scope: LexicalScope, qualifiedName: string, params: Val[], noBuiltInEval: boolean): Val;
    evalMediaName(name: string, not: boolean): boolean;
    evalMediaTest(feature: string, value: Val): boolean;
    evalSupportsTest(name: string, value: string, isFunc: boolean): boolean;
    queryVal(scope: LexicalScope, key: string): Result | undefined;
    storeVal(scope: LexicalScope, key: string, val: Result): void;
}
export declare type DependencyCache = {
    [key: string]: boolean | Special;
};
export declare class Val {
    scope: LexicalScope;
    key: string;
    constructor(scope: LexicalScope);
    /** @override */
    toString(): string;
    appendTo(buf: Base.StringBuffer, priority: number): void;
    protected evaluateCore(context: Context): Result;
    expand(context: Context, params: Val[]): Val;
    dependCore(other: Val, context: Context, dependencyCache: DependencyCache): boolean;
    dependOuter(other: Val, context: Context, dependencyCache: DependencyCache): boolean;
    depend(other: Val, context: Context): boolean;
    evaluate(context: Context): Result;
    isMediaName(): boolean;
}
export declare class Prefix extends Val {
    val: Val;
    constructor(scope: LexicalScope, val: Val);
    protected getOp(): string;
    evalPrefix(val: Result): Result;
    evaluateCore(context: Context): Result;
    dependCore(other: Val, context: Context, dependencyCache: DependencyCache): boolean;
    appendTo(buf: Base.StringBuffer, priority: number): void;
    expand(context: Context, params: Val[]): Val;
}
export declare class Infix extends Val {
    lhs: Val;
    rhs: Val;
    constructor(scope: LexicalScope, lhs: Val, rhs: Val);
    getPriority(): number;
    getOp(): string;
    evalInfix(lhs: Result, rhs: Result): Result;
    evaluateCore(context: Context): Result;
    dependCore(other: Val, context: Context, dependencyCache: DependencyCache): boolean;
    appendTo(buf: Base.StringBuffer, priority: number): void;
    expand(context: Context, params: Val[]): Val;
}
export declare class Logical extends Infix {
    constructor(scope: LexicalScope, lhs: Val, rhs: Val);
    getPriority(): number;
}
export declare class Comparison extends Infix {
    constructor(scope: LexicalScope, lhs: Val, rhs: Val);
    getPriority(): number;
}
export declare class Additive extends Infix {
    constructor(scope: LexicalScope, lhs: Val, rhs: Val);
    getPriority(): number;
}
export declare class Multiplicative extends Infix {
    constructor(scope: LexicalScope, lhs: Val, rhs: Val);
    getPriority(): number;
}
export declare class Not extends Prefix {
    constructor(scope: LexicalScope, val: Val);
    getOp(): string;
    evalPrefix(val: Result): Result;
}
export declare class NotMedia extends Not {
    constructor(scope: LexicalScope, val: Val);
    getOp(): string;
}
export declare class Negate extends Prefix {
    constructor(scope: LexicalScope, val: Val);
    getOp(): string;
    evalPrefix(val: Result): Result;
}
export declare class And extends Logical {
    constructor(scope: LexicalScope, lhs: Val, rhs: Val);
    getOp(): string;
    evaluateCore(context: Context): Result;
}
export declare class AndMedia extends And {
    constructor(scope: LexicalScope, lhs: Val, rhs: Val);
    getOp(): string;
}
export declare class Or extends Logical {
    constructor(scope: LexicalScope, lhs: Val, rhs: Val);
    getOp(): string;
    evaluateCore(context: Context): Result;
}
export declare class Comma extends Or {
    constructor(scope: LexicalScope, lhs: Val, rhs: Val);
    getOp(): string;
}
export declare class OrMedia extends Or {
    constructor(scope: LexicalScope, lhs: Val, rhs: Val);
    getOp(): string;
}
export declare class Lt extends Comparison {
    constructor(scope: LexicalScope, lhs: Val, rhs: Val);
    getOp(): string;
    evalInfix(lhs: Result, rhs: Result): Result;
}
export declare class Le extends Comparison {
    constructor(scope: LexicalScope, lhs: Val, rhs: Val);
    getOp(): string;
    evalInfix(lhs: Result, rhs: Result): Result;
}
export declare class Gt extends Comparison {
    constructor(scope: LexicalScope, lhs: Val, rhs: Val);
    getOp(): string;
    evalInfix(lhs: Result, rhs: Result): Result;
}
export declare class Ge extends Comparison {
    constructor(scope: LexicalScope, lhs: Val, rhs: Val);
    getOp(): string;
    evalInfix(lhs: Result, rhs: Result): Result;
}
export declare class Eq extends Comparison {
    constructor(scope: LexicalScope, lhs: Val, rhs: Val);
    getOp(): string;
    evalInfix(lhs: Result, rhs: Result): Result;
}
export declare class Ne extends Comparison {
    constructor(scope: LexicalScope, lhs: Val, rhs: Val);
    getOp(): string;
    evalInfix(lhs: Result, rhs: Result): Result;
}
export declare class Add extends Additive {
    constructor(scope: LexicalScope, lhs: Val, rhs: Val);
    getOp(): string;
    evalInfix(lhs: Result, rhs: Result): Result;
}
export declare class Subtract extends Additive {
    constructor(scope: LexicalScope, lhs: Val, rhs: Val);
    getOp(): string;
    evalInfix(lhs: Result, rhs: Result): Result;
}
export declare class Multiply extends Multiplicative {
    constructor(scope: LexicalScope, lhs: Val, rhs: Val);
    getOp(): string;
    evalInfix(lhs: Result, rhs: Result): Result;
}
export declare class Divide extends Multiplicative {
    constructor(scope: LexicalScope, lhs: Val, rhs: Val);
    getOp(): string;
    evalInfix(lhs: Result, rhs: Result): Result;
}
export declare class Modulo extends Multiplicative {
    constructor(scope: LexicalScope, lhs: Val, rhs: Val);
    getOp(): string;
    evalInfix(lhs: Result, rhs: Result): Result;
}
/**
 * Numerical value with a unit.
 */
export declare class Numeric extends Val {
    num: number;
    unit: string;
    constructor(scope: LexicalScope, num: number, unit: string);
    appendTo(buf: Base.StringBuffer, priority: number): void;
    evaluateCore(context: Context): Result;
}
/**
 * Named value.
 * @param qualifiedName CSS-escaped name sequence separated by dots.
 */
export declare class Named extends Val {
    qualifiedName: string;
    constructor(scope: LexicalScope, qualifiedName: string);
    appendTo(buf: Base.StringBuffer, priority: number): void;
    evaluateCore(context: Context): Result;
    dependCore(other: Val, context: Context, dependencyCache: DependencyCache): boolean;
}
/**
 * Named value.
 */
export declare class MediaName extends Val {
    not: boolean;
    name: string;
    constructor(scope: LexicalScope, not: boolean, name: string);
    appendTo(buf: Base.StringBuffer, priority: number): void;
    evaluateCore(context: Context): Result;
    isMediaName(): boolean;
}
/**
 * A value that is calculated by calling a JavaScript function. Note that the
 * result is cached and this function will be called only once between any
 * clears for its scope in the context.
 * @param fn function to call.
 * @param str a way to represent this value in toString() call.
 */
export declare class Native extends Val {
    fn: () => Result;
    str: string;
    constructor(scope: LexicalScope, fn: () => Result, str: string);
    appendTo(buf: Base.StringBuffer, priority: number): void;
    evaluateCore(context: Context): Result;
}
export declare function appendValArray(buf: Base.StringBuffer, arr: Val[]): void;
export declare function expandValArray(context: Context, arr: Val[], params: Val[]): Val[];
export declare function evalValArray(context: Context, arr: Val[]): Result[];
export declare class Call extends Val {
    qualifiedName: string;
    params: Val[];
    constructor(scope: LexicalScope, qualifiedName: string, params: Val[]);
    appendTo(buf: Base.StringBuffer, priority: number): void;
    evaluateCore(context: Context): Result;
    dependCore(other: Val, context: Context, dependencyCache: DependencyCache): boolean;
    expand(context: Context, params: Val[]): Val;
}
export declare class Cond extends Val {
    cond: Val;
    ifTrue: Val;
    ifFalse: Val;
    constructor(scope: LexicalScope, cond: Val, ifTrue: Val, ifFalse: Val);
    appendTo(buf: Base.StringBuffer, priority: number): void;
    evaluateCore(context: Context): Result;
    dependCore(other: Val, context: Context, dependencyCache: DependencyCache): boolean;
    expand(context: Context, params: Val[]): Val;
}
export declare class Const extends Val {
    val: Result;
    constructor(scope: LexicalScope, val: Result);
    appendTo(buf: Base.StringBuffer, priority: number): void;
    evaluateCore(context: Context): Result;
}
export declare class MediaTest extends Val {
    name: MediaName;
    value: Val;
    constructor(scope: LexicalScope, name: MediaName, value: Val);
    appendTo(buf: Base.StringBuffer, priority: number): void;
    evaluateCore(context: Context): Result;
    dependCore(other: Val, context: Context, dependencyCache: DependencyCache): boolean;
    expand(context: Context, params: Val[]): Val;
}
export declare class SupportsTest extends Val {
    name: string;
    value: string;
    isFunc: boolean;
    constructor(scope: LexicalScope, name: string, value: string, isFunc: boolean);
    appendTo(buf: Base.StringBuffer, priority: number): void;
    evaluateCore(context: Context): Result;
}
export declare class Param extends Val {
    index: number;
    constructor(scope: LexicalScope, index: number);
    appendTo(buf: Base.StringBuffer, priority: number): void;
    expand(context: Context, params: Val[]): Val;
}
export declare function and(scope: LexicalScope, v1: Val, v2: Val): Val;
export declare function add(scope: LexicalScope, v1: Val, v2: Val): Val;
export declare function sub(scope: LexicalScope, v1: Val, v2: Val): Val;
export declare function mul(scope: LexicalScope, v1: Val, v2: Val): Val;
export declare function div(scope: LexicalScope, v1: Val, v2: Val): Val;
export {};
