import * as Css from "./css";
import * as CssParser from "./css-parser";
import * as CssTokenizer from "./css-tokenizer";
import * as CssValidator from "./css-validator";
import * as Exprs from "./exprs";
import * as Matchers from "./matchers";
import * as Vtree from "./vtree";
import { CssStyler } from "./types";
export declare type ElementStyle = {
    [key: string]: CascadeValue | CascadeValue[] | ElementStyleMap | {
        matcher: Matchers.Matcher;
        styles: ElementStyle;
    }[];
};
export declare const inheritedProps: {
    "border-collapse": boolean;
    "border-spacing": boolean;
    "caption-side": boolean;
    "clip-rule": boolean;
    color: boolean;
    "color-interpolation": boolean;
    "color-rendering": boolean;
    cursor: boolean;
    direction: boolean;
    "empty-cells": boolean;
    fill: boolean;
    "fill-opacity": boolean;
    "fill-rule": boolean;
    "font-kerning": boolean;
    "font-size": boolean;
    "font-size-adjust": boolean;
    "font-family": boolean;
    "font-feature-settings": boolean;
    "font-style": boolean;
    "font-stretch": boolean;
    "font-variant-ligatures": boolean;
    "font-variant-caps": boolean;
    "font-variant-numeric": boolean;
    "font-variant-east-asian": boolean;
    "font-weight": boolean;
    "glyph-orientation-vertical": boolean;
    "hanging-punctuation": boolean;
    hyphens: boolean;
    "hyphenate-character": boolean;
    "hyphenate-limit-chars": boolean;
    "hyphenate-limit-last": boolean;
    "image-rendering": boolean;
    "image-resolution": boolean;
    "letter-spacing": boolean;
    "line-break": boolean;
    "line-height": boolean;
    "list-style-image": boolean;
    "list-style-position": boolean;
    "list-style-type": boolean;
    marker: boolean;
    "marker-end": boolean;
    "marker-mid": boolean;
    "marker-start": boolean;
    orphans: boolean;
    "overflow-wrap": boolean;
    "paint-order": boolean;
    "pointer-events": boolean;
    quotes: boolean;
    "ruby-align": boolean;
    "ruby-position": boolean;
    "shape-rendering": boolean;
    stroke: boolean;
    "stroke-dasharray": boolean;
    "stroke-dashoffset": boolean;
    "stroke-linecap": boolean;
    "stroke-linejoin": boolean;
    "stroke-miterlimit": boolean;
    "stroke-opacity": boolean;
    "stroke-width": boolean;
    "tab-size": boolean;
    "text-align": boolean;
    "text-align-last": boolean;
    "text-anchor": boolean;
    "text-decoration-skip": boolean;
    "text-emphasis-color": boolean;
    "text-emphasis-position": boolean;
    "text-emphasis-style": boolean;
    "text-combine-upright": boolean;
    "text-indent": boolean;
    "text-justify": boolean;
    "text-orientation": boolean;
    "text-rendering": boolean;
    "text-size-adjust": boolean;
    "text-spacing": boolean;
    "text-transform": boolean;
    "text-underline-position": boolean;
    visibility: boolean;
    "white-space": boolean;
    widows: boolean;
    "word-break": boolean;
    "word-spacing": boolean;
    "writing-mode": boolean;
};
export declare const polyfilledInheritedProps: string[];
export declare function getPolyfilledInheritedProps(): string[];
export declare const supportedNamespaces: {
    "http://www.idpf.org/2007/ops": boolean;
    "http://www.w3.org/1999/xhtml": boolean;
    "http://www.w3.org/2000/svg": boolean;
};
export declare const coupledPatterns: string[];
export declare const coupledExtentPatterns: string[];
export declare const geomNames: {
    [key: string]: boolean;
};
export declare function buildCouplingMap(sideMap: {
    [key: string]: string;
}, extentMap: {
    [key: string]: string;
}): {
    [key: string]: string;
};
export declare const couplingMapVert: {
    [key: string]: string;
};
export declare const couplingMapHor: {
    [key: string]: string;
};
export declare const couplingMapVertRtl: {
    [key: string]: string;
};
export declare const couplingMapHorRtl: {
    [key: string]: string;
};
export declare class CascadeValue {
    readonly value: Css.Val;
    readonly priority: number;
    constructor(value: Css.Val, priority: number);
    getBaseValue(): CascadeValue;
    filterValue(visitor: Css.Visitor): CascadeValue;
    increaseSpecificity(specificity: number): CascadeValue;
    evaluate(context: Exprs.Context, propName?: string): Css.Val;
    isEnabled(context: Exprs.Context): boolean;
}
/**
 * Internal subclass of CascadeValue. Should never be seen outside of the
 * cascade engine.
 */
export declare class ConditionalCascadeValue extends CascadeValue {
    readonly condition: Exprs.Val;
    constructor(value: Css.Val, priority: number, condition: Exprs.Val);
    getBaseValue(): CascadeValue;
    filterValue(visitor: Css.Visitor): CascadeValue;
    increaseSpecificity(specificity: number): CascadeValue;
    isEnabled(context: Exprs.Context): boolean;
}
/**
 * @param tv current value (cannot be conditional)
 * @param av cascaded value (can be conditional)
 */
export declare function cascadeValues(context: Exprs.Context, tv: CascadeValue, av: CascadeValue): CascadeValue;
/**
 * setProp with priority checking.
 * If context is given it is same as
 * setProp(style, name, cascadeValues(context, getProp(style, name), value))
 */
export declare function setPropCascadeValue(style: ElementStyle, name: string, value: CascadeValue, context?: Exprs.Context): void;
export declare type ElementStyleMap = {
    [key: string]: ElementStyle;
};
export declare const SPECIALS: {
    "region-id": boolean;
    "fragment-selector-id": boolean;
};
export declare function isSpecialName(name: string): boolean;
export declare function isMapName(name: string): boolean;
export declare function isPropName(name: string): boolean;
export declare function isInherited(name: string): boolean;
export declare function getProp(style: ElementStyle, name: string): CascadeValue;
export declare function setProp(style: ElementStyle, name: string, value: CascadeValue): void;
export declare function getStyleMap(style: ElementStyle, name: string): ElementStyleMap;
export declare function getMutableStyleMap(style: ElementStyle, name: string): ElementStyleMap;
export declare const getViewConditionalStyleMap: (style: ElementStyle) => {
    matcher: Matchers.Matcher;
    styles: ElementStyle;
}[];
export declare function getSpecial(style: ElementStyle, name: string): CascadeValue[];
export declare function getMutableSpecial(style: ElementStyle, name: string): CascadeValue[];
export declare function mergeIn(context: Exprs.Context, target: ElementStyle, style: ElementStyle, specificity: number, pseudoelement: string | null, regionId: string | null, viewConditionMatcher: Matchers.Matcher | null): void;
export declare function mergeAll(context: Exprs.Context, styles: ElementStyle[]): ElementStyle;
export declare function chainActions(chain: ChainedAction[], action: CascadeAction): CascadeAction;
export declare class InheritanceVisitor extends Css.FilterVisitor {
    readonly props: ElementStyle;
    readonly context: Exprs.Context;
    propName: string;
    constructor(props: ElementStyle, context: Exprs.Context);
    setPropName(name: string): void;
    private getFontSize;
    visitNumeric(numeric: Css.Numeric): Css.Val;
    visitExpr(expr: Css.Expr): Css.Val;
}
export declare function convertFontRelativeLengthToPx(numeric: Css.Numeric, baseFontSize: number, context: Exprs.Context): Css.Numeric;
export declare function convertFontSizeToPx(numeric: Css.Numeric, parentFontSize: number, context: Exprs.Context): Css.Numeric;
export declare type ActionTable = {
    [key: string]: CascadeAction;
};
export declare class CascadeAction {
    apply(cascadeInstance: CascadeInstance): void;
    mergeWith(other: CascadeAction): CascadeAction;
    clone(): CascadeAction;
}
export declare class ConditionItemAction extends CascadeAction {
    readonly conditionItem: ConditionItem;
    constructor(conditionItem: ConditionItem);
    apply(cascadeInstance: CascadeInstance): void;
}
export declare class CompoundAction extends CascadeAction {
    readonly list: CascadeAction[];
    constructor(list: CascadeAction[]);
    apply(cascadeInstance: CascadeInstance): void;
    mergeWith(other: CascadeAction): CascadeAction;
    clone(): CascadeAction;
}
export declare class ApplyRuleAction extends CascadeAction {
    readonly style: ElementStyle;
    readonly specificity: number;
    readonly pseudoelement: string | null;
    readonly regionId: string | null;
    readonly viewConditionId: string | null;
    constructor(style: ElementStyle, specificity: number, pseudoelement: string | null, regionId: string | null, viewConditionId: string | null);
    apply(cascadeInstance: CascadeInstance): void;
}
export declare class ChainedAction extends CascadeAction {
    chained: CascadeAction;
    constructor();
    apply(cascadeInstance: CascadeInstance): void;
    getPriority(): number;
    makePrimary(cascade: Cascade): boolean;
}
export declare class CheckClassAction extends ChainedAction {
    readonly className: string;
    constructor(className: string);
    apply(cascadeInstance: CascadeInstance): void;
    getPriority(): number;
    makePrimary(cascade: Cascade): boolean;
}
export declare class CheckIdAction extends ChainedAction {
    readonly id: string;
    constructor(id: string);
    apply(cascadeInstance: CascadeInstance): void;
    getPriority(): number;
    makePrimary(cascade: Cascade): boolean;
}
export declare class CheckLocalNameAction extends ChainedAction {
    readonly localName: string;
    constructor(localName: string);
    apply(cascadeInstance: CascadeInstance): void;
    getPriority(): number;
    makePrimary(cascade: Cascade): boolean;
}
export declare class CheckNSTagAction extends ChainedAction {
    readonly ns: string;
    readonly localName: string;
    constructor(ns: string, localName: string);
    apply(cascadeInstance: CascadeInstance): void;
    getPriority(): number;
    makePrimary(cascade: Cascade): boolean;
}
export declare class CheckTargetEpubTypeAction extends ChainedAction {
    readonly epubTypePatt: RegExp;
    constructor(epubTypePatt: RegExp);
    apply(cascadeInstance: CascadeInstance): void;
}
export declare class CheckNamespaceAction extends ChainedAction {
    readonly ns: string;
    constructor(ns: string);
    apply(cascadeInstance: CascadeInstance): void;
}
export declare class CheckAttributePresentAction extends ChainedAction {
    readonly ns: string;
    readonly name: string;
    constructor(ns: string, name: string);
    apply(cascadeInstance: CascadeInstance): void;
}
export declare class CheckAttributeEqAction extends ChainedAction {
    readonly ns: string;
    readonly name: string;
    readonly value: string;
    constructor(ns: string, name: string, value: string);
    apply(cascadeInstance: CascadeInstance): void;
    getPriority(): number;
    makePrimary(cascade: Cascade): boolean;
}
export declare class CheckNamespaceSupportedAction extends ChainedAction {
    readonly ns: string;
    readonly name: string;
    constructor(ns: string, name: string);
    apply(cascadeInstance: CascadeInstance): void;
    getPriority(): number;
    makePrimary(cascade: Cascade): boolean;
}
export declare class CheckAttributeRegExpAction extends ChainedAction {
    readonly ns: string;
    readonly name: string;
    readonly regexp: RegExp;
    constructor(ns: string, name: string, regexp: RegExp);
    apply(cascadeInstance: CascadeInstance): void;
}
export declare class CheckLangAction extends ChainedAction {
    readonly langRegExp: RegExp;
    constructor(langRegExp: RegExp);
    apply(cascadeInstance: CascadeInstance): void;
}
export declare class IsFirstAction extends ChainedAction {
    constructor();
    apply(cascadeInstance: CascadeInstance): void;
    getPriority(): number;
}
export declare class IsRootAction extends ChainedAction {
    constructor();
    apply(cascadeInstance: CascadeInstance): void;
    getPriority(): number;
}
export declare class IsNthAction extends ChainedAction {
    readonly a: number;
    readonly b: number;
    constructor(a: number, b: number);
    /**
     * Checkes whether given order can be represented as an+b with a non-negative
     * interger n
     */
    protected matchANPlusB(order: number): boolean;
}
export declare class IsNthSiblingAction extends IsNthAction {
    constructor(a: number, b: number);
    apply(cascadeInstance: CascadeInstance): void;
    getPriority(): number;
}
export declare class IsNthSiblingOfTypeAction extends IsNthAction {
    constructor(a: number, b: number);
    apply(cascadeInstance: CascadeInstance): void;
    getPriority(): number;
}
export declare class IsNthLastSiblingAction extends IsNthAction {
    constructor(a: number, b: number);
    apply(cascadeInstance: CascadeInstance): void;
    getPriority(): number;
}
export declare class IsNthLastSiblingOfTypeAction extends IsNthAction {
    constructor(a: number, b: number);
    apply(cascadeInstance: CascadeInstance): void;
    getPriority(): number;
}
export declare class IsEmptyAction extends ChainedAction {
    constructor();
    apply(cascadeInstance: CascadeInstance): void;
    getPriority(): number;
}
export declare class IsEnabledAction extends ChainedAction {
    constructor();
    apply(cascadeInstance: CascadeInstance): void;
    getPriority(): number;
}
export declare class IsDisabledAction extends ChainedAction {
    constructor();
    apply(cascadeInstance: CascadeInstance): void;
    getPriority(): number;
}
export declare class IsCheckedAction extends ChainedAction {
    constructor();
    apply(cascadeInstance: CascadeInstance): void;
    getPriority(): number;
}
export declare class CheckConditionAction extends ChainedAction {
    readonly condition: string;
    constructor(condition: string);
    apply(cascadeInstance: CascadeInstance): void;
    getPriority(): number;
}
export declare class CheckAppliedAction extends CascadeAction {
    applied: boolean;
    constructor();
    apply(cascadeInstance: CascadeInstance): void;
    clone(): CascadeAction;
}
export declare class NegateActionsSet extends ChainedAction {
    checkAppliedAction: CheckAppliedAction;
    firstAction: CascadeAction;
    constructor(list: ChainedAction[]);
    apply(cascadeInstance: CascadeInstance): void;
    getPriority(): number;
}
/**
 * An object that is notified as elements are pushed and popped and typically
 * controls a "named condition" (which is a count associated with a name).
 */
export interface ConditionItem {
    /**
     * Returns a "fresh" copy of this item. May be this if immutable.
     */
    fresh(cascadeInstance: CascadeInstance): ConditionItem;
    /**
     * Depth is 0 for element itself and its siblings, 1 for direct children and
     * -1 for the parent.
     */
    push(cascadeInstance: CascadeInstance, depth: number): boolean;
    /**
     * @return return true if no more notifications are desired
     */
    pop(cascadeInstance: CascadeInstance, depth: number): boolean;
}
export declare class AbstractConditionItem {
    readonly condition: string;
    readonly viewConditionId: string | null;
    readonly viewCondition: Matchers.Matcher;
    constructor(condition: string, viewConditionId: string | null, viewCondition: Matchers.Matcher);
    increment(cascadeInstance: CascadeInstance): void;
    decrement(cascadeInstance: CascadeInstance): void;
    buildViewConditionMatcher(cascadeInstance: CascadeInstance): Matchers.Matcher;
}
export declare class DescendantConditionItem extends AbstractConditionItem implements ConditionItem {
    constructor(condition: string, viewConditionId: string | null, viewCondition: Matchers.Matcher);
    /** @override */
    fresh(cascadeInstance: CascadeInstance): ConditionItem;
    /** @override */
    push(cascadeInstance: CascadeInstance, depth: number): boolean;
    /** @override */
    pop(cascadeInstance: CascadeInstance, depth: number): boolean;
}
export declare class ChildConditionItem extends AbstractConditionItem implements ConditionItem {
    constructor(condition: string, viewConditionId: string | null, viewCondition: Matchers.Matcher);
    /** @override */
    fresh(cascadeInstance: CascadeInstance): ConditionItem;
    /** @override */
    push(cascadeInstance: CascadeInstance, depth: number): boolean;
    /** @override */
    pop(cascadeInstance: CascadeInstance, depth: number): boolean;
}
export declare class AdjacentSiblingConditionItem extends AbstractConditionItem implements ConditionItem {
    fired: boolean;
    constructor(condition: string, viewConditionId: string | null, viewCondition: Matchers.Matcher);
    /** @override */
    fresh(cascadeInstance: CascadeInstance): ConditionItem;
    /** @override */
    push(cascadeInstance: CascadeInstance, depth: number): boolean;
    /** @override */
    pop(cascadeInstance: CascadeInstance, depth: number): boolean;
}
export declare class FollowingSiblingConditionItem extends AbstractConditionItem implements ConditionItem {
    fired: boolean;
    constructor(condition: string, viewConditionId: string | null, viewCondition: Matchers.Matcher);
    /** @override */
    fresh(cascadeInstance: CascadeInstance): ConditionItem;
    /** @override */
    push(cascadeInstance: CascadeInstance, depth: number): boolean;
    /** @override */
    pop(cascadeInstance: CascadeInstance, depth: number): boolean;
}
/**
 * Not a true condition item, this class manages proper handling of "after"
 * pseudoelement.
 */
export declare class AfterPseudoelementItem implements ConditionItem {
    readonly afterprop: ElementStyle;
    readonly element: Element;
    constructor(afterprop: ElementStyle, element: Element);
    /** @override */
    fresh(cascadeInstance: CascadeInstance): ConditionItem;
    /** @override */
    push(cascadeInstance: CascadeInstance, depth: number): boolean;
    /** @override */
    pop(cascadeInstance: CascadeInstance, depth: number): boolean;
}
/**
 * Not a true condition item, this class restores current language.
 */
export declare class RestoreLangItem implements ConditionItem {
    readonly lang: string;
    constructor(lang: string);
    /** @override */
    fresh(cascadeInstance: CascadeInstance): ConditionItem;
    /** @override */
    push(cascadeInstance: CascadeInstance, depth: number): boolean;
    /** @override */
    pop(cascadeInstance: CascadeInstance, depth: number): boolean;
}
/**
 * Not a true condition item, this class manages inheritance of quotes property
 */
export declare class QuotesScopeItem implements ConditionItem {
    readonly oldQuotes: Css.Str[];
    constructor(oldQuotes: Css.Str[]);
    /** @override */
    fresh(cascadeInstance: CascadeInstance): ConditionItem;
    /** @override */
    push(cascadeInstance: CascadeInstance, depth: number): boolean;
    /** @override */
    pop(cascadeInstance: CascadeInstance, depth: number): boolean;
}
export declare type CounterValues = {
    [key: string]: number[];
};
export interface CounterListener {
    countersOfId(id: string, counters: CounterValues): any;
    getExprContentListener(): Vtree.ExprContentListener;
}
export interface CounterResolver {
    setStyler(styler: CssStyler.AbstractStyler): void;
    /**
     * Returns an Exprs.Val, whose value is calculated at the layout time by
     * retrieving the innermost page-based counter (null if it does not exist) by
     * its name and formatting the value into a string.
     * @param name Name of the page-based counter to be retrieved
     * @param format A function that formats the counter value into a string
     */
    getPageCounterVal(name: string, format: (p1: number | null) => string): Exprs.Val;
    /**
     * Returns an Exprs.Val, whose value is calculated at the layout time by
     * retrieving the page-based counters by its name and formatting the values
     * into a string.
     * @param name Name of the page-based counters to be retrieved
     * @param format A function that formats the counter values (passed as an
     *     array ordered by the nesting depth with the outermost counter first and
     *     the innermost last) into a string
     */
    getPageCountersVal(name: string, format: (p1: number[]) => string): Exprs.Val;
    getTargetCounterVal(url: string, name: string, format: (p1: number | null) => string): Exprs.Val;
    getTargetCountersVal(url: string, name: string, format: (p1: number[]) => string): Exprs.Val;
    /**
     * Get value of the CSS string() function
     * https://drafts.csswg.org/css-gcpm-3/#using-named-strings
     */
    getNamedStringVal(name: string, retrievePosition: string): Exprs.Val;
    /**
     * Set named string for the CSS string-set property
     * https://drafts.csswg.org/css-gcpm-3/#setting-named-strings-the-string-set-pro
     */
    setNamedString(name: string, stringValue: string, cascadeInstance: CascadeInstance): void;
}
export declare class AttrValueFilterVisitor extends Css.FilterVisitor {
    element: Element;
    constructor(element: Element);
    private createValueFromString;
    visitFunc(func: Css.Func): Css.Val;
}
export declare class ContentPropVisitor extends Css.FilterVisitor {
    cascade: CascadeInstance;
    element: Element;
    readonly counterResolver: CounterResolver;
    constructor(cascade: CascadeInstance, element: Element, counterResolver: CounterResolver);
    visitIdent(ident: Css.Ident): Css.Val;
    private format;
    visitFuncCounter(values: Css.Val[]): Css.Val;
    visitFuncCounters(values: Css.Val[]): Css.Val;
    visitFuncTargetCounter(values: Css.Val[]): Css.Val;
    visitFuncTargetCounters(values: Css.Val[]): Css.Val;
    /**
     * CSS `string()` function
     * https://drafts.csswg.org/css-gcpm-3/#using-named-strings
     */
    visitFuncString(values: Css.Val[]): Css.Val;
    /**
     * CSS `content()` function
     * https://drafts.csswg.org/css-gcpm-3/#content-function-header
     */
    visitFuncContent(values: Css.Val[]): Css.Val;
    visitFunc(func: Css.Func): Css.Val;
}
export declare function roman(num: number): string;
export declare const additiveNumbering: {
    roman: (string | number)[];
    armenian: (string | number)[];
    georgian: (string | number)[];
    hebrew: (string | number)[];
};
export declare const alphabeticNumbering: {
    latin: string;
    alpha: string;
    greek: string;
    russian: string;
};
export declare const fixed: {
    square: string;
    disc: string;
    circle: string;
    none: string;
};
export declare function additiveFormat(entries: any[], num: number): string;
export declare function expandAlphabet(str: string): string[] | null;
export declare function alphabeticFormat(alphabetStr: string, num: number): string;
export declare type ChineseNumbering = {
    digits: string;
    markers: string;
    negative: string;
    formal: boolean;
};
/**
 * From http://www.w3.org/TR/css3-lists/
 */
export declare const chineseTradInformal: ChineseNumbering;
export declare function chineseCounter(num: number, numbering: ChineseNumbering): string;
/**
 * Fitting order and specificity in the same number. Order is recorded in the
 * fractional part. Select value so that
 *
 *   0x7FFFFFFF != 0x7FFFFFFF + ORDER_INCREMENT
 *
 */
export declare const ORDER_INCREMENT: number;
export declare function copyTable(src: ActionTable, dst: ActionTable): void;
export declare class Cascade {
    nsCount: number;
    nsPrefix: {
        [key: string]: string;
    };
    tags: ActionTable;
    nstags: ActionTable;
    epubtypes: ActionTable;
    classes: ActionTable;
    ids: ActionTable;
    pagetypes: ActionTable;
    order: number;
    clone(): Cascade;
    insertInTable(table: ActionTable, key: string, action: CascadeAction): void;
    createInstance(context: Exprs.Context, counterListener: CounterListener, counterResolver: CounterResolver, lang: any): CascadeInstance;
    nextOrder(): number;
}
export declare class CascadeInstance {
    readonly context: Exprs.Context;
    readonly counterListener: CounterListener;
    readonly counterResolver: CounterResolver;
    code: Cascade;
    stack: ConditionItem[][];
    conditions: {
        [key: string]: number;
    };
    currentElement: Element | null;
    currentElementOffset: number | null;
    currentStyle: ElementStyle | null;
    currentClassNames: string[] | null;
    currentLocalName: string;
    currentNamespace: string;
    currentId: string;
    currentXmlId: string;
    currentNSTag: string;
    currentEpubTypes: string[] | null;
    currentPageType: string | null;
    previousPageType: string | null;
    firstPageType: string | null;
    isFirst: boolean;
    isRoot: boolean;
    counters: CounterValues;
    counterScoping: {
        [key: string]: boolean;
    }[];
    quotes: Css.Str[];
    quoteDepth: number;
    lang: string;
    siblingOrderStack: number[];
    currentSiblingOrder: number;
    siblingTypeCountsStack: {
        [key: string]: {
            [key: string]: number;
        };
    }[];
    currentSiblingTypeCounts: {
        [key: string]: {
            [key: string]: number;
        };
    };
    currentFollowingSiblingOrder: number | null;
    followingSiblingOrderStack: (number | null)[];
    followingSiblingTypeCountsStack: {
        [key: string]: {
            [key: string]: number;
        };
    }[];
    currentFollowingSiblingTypeCounts: {
        [key: string]: {
            [key: string]: number;
        };
    };
    viewConditions: {
        [key: string]: Matchers.Matcher[];
    };
    dependentConditions: string[];
    elementStack: Element[];
    constructor(cascade: Cascade, context: Exprs.Context, counterListener: CounterListener, counterResolver: CounterResolver, lang: string);
    pushConditionItem(item: ConditionItem): void;
    increment(condition: string, viewCondition: Matchers.Matcher): void;
    decrement(condition: string, viewCondition: Matchers.Matcher): void;
    buildViewConditionMatcher(viewConditionId: string | null): Matchers.Matcher;
    applyAction(table: ActionTable, key: string): void;
    pushRule(classes: string[], pageType: string | null, baseStyle: ElementStyle): void;
    defineCounter(counterName: string, value: number): void;
    pushCounters(props: ElementStyle): void;
    popCounters(): void;
    /**
     * Process CSS string-set property
     * https://drafts.csswg.org/css-gcpm-3/#setting-named-strings-the-string-set-pro
     */
    setNamedStrings(props: ElementStyle): void;
    processPseudoelementProps(pseudoprops: ElementStyle, element: Element): void;
    pushElement(styler: CssStyler.AbstractStyler, element: Element, baseStyle: ElementStyle, elementOffset: number): void;
    private applyAttrFilterInner;
    private applyAttrFilter;
    /**
     * Substitute all variables in property values in elementStyle
     */
    applyVarFilter(elementStyles: ElementStyle[], styler: CssStyler.AbstractStyler, element: Element | null): void;
    /**
     * Calculate all calc() in property values in elementStyle
     */
    applyCalcFilter(elementStyle: ElementStyle, context: Exprs.Context): void;
    private applyActions;
    private pop;
    popRule(): void;
    popElement(element: Element): void;
}
export declare const EMPTY: string[];
/**
 * Pseudoelement names in the order they should be processed, empty string is
 * the place where the element's DOM children are processed.
 */
export declare const pseudoNames: string[];
/**
 * @enum {number}
 */
export declare enum ParseState {
    TOP = 0,
    SELECTOR = 1,
    RULE = 2
}
/**
 * Cascade for base User Agent stylesheet.
 */
export declare let uaBaseCascade: Cascade;
export declare function setUABaseCascade(value: Cascade): void;
export declare class CascadeParserHandler extends CssParser.SlaveParserHandler implements CssValidator.PropertyReceiver {
    readonly condition: Exprs.Val;
    readonly regionId: string | null;
    readonly validatorSet: CssValidator.ValidatorSet;
    chain: ChainedAction[];
    specificity: number;
    elementStyle: ElementStyle;
    conditionCount: number;
    pseudoelement: string | null;
    footnoteContent: boolean;
    cascade: Cascade;
    state: ParseState;
    viewConditionId: string | null;
    insideSelectorRule: ParseState;
    constructor(scope: Exprs.LexicalScope, owner: CssParser.DispatchParserHandler, condition: Exprs.Val, parent: CascadeParserHandler, regionId: string | null, validatorSet: CssValidator.ValidatorSet, topLevel: boolean);
    protected insertNonPrimary(action: CascadeAction): void;
    processChain(action: CascadeAction): void;
    isInsideSelectorRule(mnemonics: string): boolean;
    tagSelector(ns: string | null, name: string | null): void;
    classSelector(name: string): void;
    pseudoclassSelector(name: string, params: (number | string)[]): void;
    pseudoelementSelector(name: string, params: (number | string)[]): void;
    idSelector(id: string): void;
    attributeSelector(ns: string, name: string, op: CssTokenizer.TokenType, value: string | null): void;
    descendantSelector(): void;
    childSelector(): void;
    adjacentSiblingSelector(): void;
    followingSiblingSelector(): void;
    nextSelector(): void;
    startSelectorRule(): void;
    error(mnemonics: string, token: CssTokenizer.Token): void;
    startStylesheet(flavor: CssParser.StylesheetFlavor): void;
    startRuleBody(): void;
    endRule(): void;
    finishChain(): void;
    protected makeApplyRuleAction(specificity: number): ApplyRuleAction;
    special(name: string, value: Css.Val): void;
    property(name: string, value: Css.Val, important: boolean): void;
    /** @override */
    invalidPropertyValue(name: string, value: Css.Val): void;
    /** @override */
    unknownProperty(name: string, value: Css.Val): void;
    /** @override */
    simpleProperty(name: string, value: Css.Val, important: any): void;
    finish(): Cascade;
    startFuncWithSelector(funcName: string): void;
}
export declare const nthSelectorActionClasses: {
    [key: string]: typeof IsNthAction;
};
export declare let conditionCount: number;
export declare class NotParameterParserHandler extends CascadeParserHandler {
    readonly parent: CascadeParserHandler;
    parentChain: ChainedAction[];
    constructor(parent: CascadeParserHandler);
    startFuncWithSelector(funcName: string): void;
    startRuleBody(): void;
    nextSelector(): void;
    endFuncWithSelector(): void;
    error(mnemonics: string, token: CssTokenizer.Token): void;
}
export declare class DefineParserHandler extends CssParser.SlaveParserHandler {
    constructor(scope: Exprs.LexicalScope, owner: CssParser.DispatchParserHandler);
    property(name: string, value: Css.Val, important: boolean): void;
}
export declare class PropSetParserHandler extends CssParser.SlaveParserHandler implements CssValidator.PropertyReceiver {
    readonly condition: Exprs.Val;
    readonly elementStyle: ElementStyle;
    readonly validatorSet: CssValidator.ValidatorSet;
    order: number;
    constructor(scope: Exprs.LexicalScope, owner: CssParser.DispatchParserHandler, condition: Exprs.Val, elementStyle: ElementStyle, validatorSet: CssValidator.ValidatorSet);
    property(name: string, value: Css.Val, important: boolean): void;
    /** @override */
    invalidPropertyValue(name: string, value: Css.Val): void;
    /** @override */
    unknownProperty(name: string, value: Css.Val): void;
    /** @override */
    simpleProperty(name: string, value: Css.Val, important: any): void;
}
export declare class PropertyParserHandler extends CssParser.ErrorHandler implements CssValidator.PropertyReceiver {
    readonly validatorSet: CssValidator.ValidatorSet;
    elementStyle: ElementStyle;
    order: number;
    constructor(scope: Exprs.LexicalScope, validatorSet: CssValidator.ValidatorSet);
    property(name: string, value: Css.Val, important: boolean): void;
    /** @override */
    invalidPropertyValue(name: string, value: Css.Val): void;
    /** @override */
    unknownProperty(name: string, value: Css.Val): void;
    /** @override */
    simpleProperty(name: string, value: Css.Val, important: any): void;
}
export declare function forEachViewConditionalStyles(style: ElementStyle, callback: (p1: ElementStyle) => any): void;
export declare function mergeViewConditionalStyles(cascMap: {
    [key: string]: CascadeValue;
}, context: Exprs.Context, style: ElementStyle): void;
export declare function parseStyleAttribute(scope: Exprs.LexicalScope, validatorSet: CssValidator.ValidatorSet, baseURL: string, styleAttrValue: string): ElementStyle;
export declare function isVertical(cascaded: {
    [key: string]: CascadeValue;
}, context: Exprs.Context, vertical: boolean): boolean;
export declare function isRtl(cascaded: {
    [key: string]: CascadeValue;
}, context: Exprs.Context, rtl: boolean): boolean;
export declare function flattenCascadedStyle(style: ElementStyle, context: Exprs.Context, regionIds: string[], isFootnote: boolean, nodeContext: Vtree.NodeContext): {
    [key: string]: CascadeValue;
};
export declare function forEachStylesInRegion(style: ElementStyle, regionIds: string[], isFootnote: boolean, callback: (p1: string, p2: ElementStyle) => any): void;
export declare function mergeStyle(to: {
    [key: string]: CascadeValue;
}, from: ElementStyle, context: Exprs.Context): void;
/**
 * Convert logical properties to physical ones, taking specificity into account.
 * @param src Source properties map
 * @param dest Destination map
 * @param transform If supplied, property values are transformed by this
 *     function before inserted into the destination map. The first parameter is
 *     the property name and the second one is the property value.
 * @template T
 */
export declare const convertToPhysical: <T>(src: {
    [key: string]: CascadeValue;
}, dest: {
    [key: string]: T;
}, vertical: boolean, rtl: boolean, transform: (p1: string, p2: CascadeValue) => T) => void;
/**
 * Convert var() to its value
 */
export declare class VarFilterVisitor extends Css.FilterVisitor {
    elementStyles: ElementStyle[];
    styler: CssStyler.AbstractStyler;
    element: Element | null;
    constructor(elementStyles: ElementStyle[], styler: CssStyler.AbstractStyler, element: Element | null);
    private getVarValue;
    visitFunc(func: Css.Func): Css.Val;
}
/**
 * Convert calc() to its value
 */
export declare class CalcFilterVisitor extends Css.FilterVisitor {
    context: Exprs.Context;
    resolveViewportUnit?: boolean;
    percentRef?: number;
    constructor(context: Exprs.Context, resolveViewportUnit?: boolean, percentRef?: number);
    visitFunc(func: Css.Func): Css.Val;
    visitNumeric(numeric: Css.Numeric): Css.Val;
}
export declare function evaluateCSSToCSS(context: Exprs.Context, val: Css.Val, propName?: string, percentRef?: number): Css.Val;
