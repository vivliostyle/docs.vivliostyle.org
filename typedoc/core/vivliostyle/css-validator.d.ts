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
 * @fileoverview CssValidator - Parse validation rules (validation.txt), validate
 * properties and shorthands.
 */
import * as Css from "./css";
export interface PropertyReceiver {
    unknownProperty(name: string, value: Css.Val): void;
    invalidPropertyValue(name: string, value: Css.Val): void;
    simpleProperty(name: string, value: Css.Val, important: any): void;
}
export declare class Node {
    validator: PropertyValidator;
    success: Node;
    failure: Node;
    code: number;
    constructor(validator: PropertyValidator);
    isSpecial(): boolean;
    markAsStartGroup(): void;
    isStartGroup(): boolean;
    markAsEndGroup(): void;
    isEndGroup(): boolean;
    markAsStartAlternate(index: number): void;
    isStartAlternate(): boolean;
    markAsEndAlternate(index: number): void;
    isEndAlternate(): boolean;
    getAlternate(): number;
}
export declare class Connection {
    where: number;
    success: boolean;
    what: number;
    constructor(where: number, success: boolean);
}
/**
 * @enum {number}
 */
export declare enum Add {
    FOLLOW = 1,
    OPTIONAL = 2,
    REPEATED = 3,
    ALTERNATE = 4
}
/**
 * A class to build a list validator from other validators.
 */
export declare class ValidatingGroup {
    nodes: Node[];
    connections: Connection[];
    match: number[];
    nomatch: number[];
    error: number[];
    emptyHead: boolean;
    connect(arr: number[], nodeIndex: number): void;
    clone(): ValidatingGroup;
    /**
     * Add "special" validation node to a given array (match, nomatch, or error).
     * @param start if this a start or the end of a clause/group
     * @param clause 0 indicates group start/end, otherwise clause index
     */
    private addSpecialToArr;
    endSpecialGroup(): void;
    startSpecialGroup(): void;
    endClause(clause: number): void;
    startClause(clause: number): void;
    addPrimitive(validator: PropertyValidator): void;
    isSimple(): boolean;
    isPrimitive(): boolean;
    addGroup(group: ValidatingGroup, how: Add): void;
    /**
     * @return how
     */
    finish(successTerminal: Node, failTerminal: Node): Node;
}
export declare const ALLOW_EMPTY = 1;
export declare const ALLOW_STR = 2;
export declare const ALLOW_IDENT = 4;
export declare const ALLOW_POS_NUMERIC = 8;
export declare const ALLOW_POS_NUM = 16;
export declare const ALLOW_POS_INT = 32;
export declare const ALLOW_COLOR = 64;
export declare const ALLOW_URL = 128;
export declare const ALLOW_NEGATIVE = 256;
export declare const ALLOW_ZERO = 512;
export declare const ALLOW_ZERO_PERCENT = 1024;
export declare const ALLOW_SLASH = 2048;
export declare const ALLOW_URANGE = 4096;
export declare const ALLOW_IMAGE = 8192;
export declare type ValueMap = {
    [key: string]: Css.Val;
};
/**
 * Abstract class to validate simple CSS property value (not a shorthand)
 */
export declare class PropertyValidator extends Css.Visitor {
    constructor();
    /**
     * Validate a subsequence of the given values from the given index. Return the
     * list of matched values or null if there is no match.
     */
    validateForShorthand(values: Css.Val[], index: number): Css.Val[];
}
/**
 * Validate a primitive CSS value (not a list or function).
 * @param allowed mask of ALLOW_*** constants.
 */
export declare class PrimitiveValidator extends PropertyValidator {
    readonly allowed: number;
    readonly idents: ValueMap;
    readonly units: ValueMap;
    constructor(allowed: number, idents: ValueMap, units: ValueMap);
    visitEmpty(empty: Css.Val): Css.Val;
    visitSlash(slash: Css.Val): Css.Val;
    visitStr(str: Css.Str): Css.Val;
    visitIdent(ident: Css.Ident): Css.Val;
    visitNumeric(numeric: Css.Numeric): Css.Val;
    visitNum(num: Css.Num): Css.Val;
    visitInt(num: Css.Int): Css.Val;
    visitHexColor(color: Css.HexColor): Css.Val;
    visitURL(url: Css.URL): Css.Val;
    visitURange(urange: Css.URange): Css.Val;
    visitSpaceList(list: Css.SpaceList): Css.Val;
    visitCommaList(list: Css.CommaList): Css.Val;
    visitFunc(func: Css.Func): Css.Val;
    visitExpr(expr: Css.Expr): Css.Val;
    combine(other: PrimitiveValidator): PrimitiveValidator;
}
export declare const ALWAYS_FAIL: PrimitiveValidator;
/**
 * Base class for list validation.
 */
export declare class ListValidator extends PropertyValidator {
    successTerminal: Node;
    failureTerminal: Node;
    first: Node;
    constructor(group: ValidatingGroup);
    validateList(arr: Css.Val[], slice: boolean, startIndex: number): Css.Val[];
    validateSingle(inval: Css.Val): Css.Val;
    visitEmpty(empty: Css.Val): Css.Val;
    visitSlash(slash: Css.Val): Css.Val;
    visitStr(str: Css.Str): Css.Val;
    visitIdent(ident: Css.Ident): Css.Val;
    visitNumeric(numeric: Css.Numeric): Css.Val;
    visitNum(num: Css.Num): Css.Val;
    visitInt(num: Css.Int): Css.Val;
    visitHexColor(color: Css.HexColor): Css.Val;
    visitURL(url: Css.URL): Css.Val;
    visitURange(urange: Css.URange): Css.Val;
    visitSpaceList(list: Css.SpaceList): Css.Val;
    visitCommaList(list: Css.CommaList): Css.Val;
    visitFunc(func: Css.Func): Css.Val;
    visitExpr(expr: Css.Expr): Css.Val;
}
export declare class SpaceListValidator extends ListValidator {
    constructor(group: ValidatingGroup);
    visitSpaceList(list: Css.SpaceList): Css.Val;
    visitCommaList(list: Css.CommaList): Css.Val;
    validateForShorthand(values: Css.Val[], index: number): Css.Val[];
}
export declare class CommaListValidator extends ListValidator {
    constructor(group: ValidatingGroup);
    visitSpaceList(list: Css.SpaceList): Css.Val;
    visitCommaList(list: Css.CommaList): Css.Val;
    validateForShorthand(values: Css.Val[], index: number): Css.Val[];
}
export declare class FuncValidator extends ListValidator {
    readonly name: string;
    constructor(name: string, group: ValidatingGroup);
    validateSingle(inval: Css.Val): Css.Val;
    visitFunc(func: Css.Func): Css.Val;
}
export declare class ShorthandSyntaxNode {
    /**
     * @return new index.
     */
    tryParse(values: Css.Val[], index: number, shorthandValidator: ShorthandValidator): number;
    success(rval: Css.Val, shorthandValidator: ShorthandValidator): void;
}
export declare class ShorthandSyntaxProperty extends ShorthandSyntaxNode {
    readonly name: string;
    validator: PropertyValidator;
    constructor(validatorSet: ValidatorSet, name: string);
    tryParse(values: Css.Val[], index: number, shorthandValidator: ShorthandValidator): number;
    success(rval: Css.Val, shorthandValidator: ShorthandValidator): void;
}
export declare class ShorthandSyntaxPropertyN extends ShorthandSyntaxProperty {
    readonly names: string[];
    constructor(validatorSet: ValidatorSet, names: string[]);
    success(rval: Css.Val, shorthandValidator: ShorthandValidator): void;
}
export declare class ShorthandSyntaxCompound extends ShorthandSyntaxNode {
    readonly nodes: ShorthandSyntaxNode[];
    readonly slash: boolean;
    constructor(nodes: ShorthandSyntaxNode[], slash: boolean);
    tryParse(values: Css.Val[], index: number, shorthandValidator: ShorthandValidator): number;
}
export declare class ShorthandValidator extends Css.Visitor {
    syntax: ShorthandSyntaxNode[];
    propList: string[];
    error: boolean;
    values: ValueMap;
    validatorSet: ValidatorSet;
    setOwner(validatorSet: ValidatorSet): void;
    syntaxNodeForProperty(name: string): ShorthandSyntaxNode;
    clone(): this;
    init(syntax: ShorthandSyntaxNode[], propList: string[]): void;
    finish(important: boolean, receiver: PropertyReceiver): boolean;
    propagateDefaultingValue(value: Css.Val, important: boolean, receiver: PropertyReceiver): void;
    validateList(list: Css.Val[]): number;
    validateSingle(val: Css.Val): Css.Val;
    visitEmpty(empty: Css.Val): Css.Val;
    visitStr(str: Css.Str): Css.Val;
    visitIdent(ident: Css.Ident): Css.Val;
    visitNumeric(numeric: Css.Numeric): Css.Val;
    visitNum(num: Css.Num): Css.Val;
    visitInt(num: Css.Int): Css.Val;
    visitHexColor(color: Css.HexColor): Css.Val;
    visitURL(url: Css.URL): Css.Val;
    visitSpaceList(list: Css.SpaceList): Css.Val;
    visitCommaList(list: Css.CommaList): Css.Val;
    visitFunc(func: Css.Func): Css.Val;
    visitExpr(expr: Css.Expr): Css.Val;
}
export declare class SimpleShorthandValidator extends ShorthandValidator {
    constructor();
    validateList(list: Css.Val[]): number;
}
export declare class InsetsShorthandValidator extends ShorthandValidator {
    constructor();
    validateList(list: Css.Val[]): number;
    createSyntaxNode(): ShorthandSyntaxPropertyN;
}
export declare class InsetsSlashShorthandValidator extends ShorthandValidator {
    constructor();
    validateList(list: Css.Val[]): number;
}
export declare class CommaShorthandValidator extends SimpleShorthandValidator {
    constructor();
    mergeIn(acc: {
        [key: string]: Css.Val[];
    }, values: ValueMap): void;
    visitCommaList(list: Css.CommaList): Css.Val;
}
export declare class FontShorthandValidator extends SimpleShorthandValidator {
    constructor();
    init(syntax: ShorthandSyntaxNode[], propList: string[]): void;
    validateList(list: Css.Val[]): number;
    visitCommaList(list: Css.CommaList): Css.Val;
    visitIdent(ident: Css.Ident): Css.Val;
}
export declare class AllShorthandValidator extends SimpleShorthandValidator {
    constructor();
    init(syntax: ShorthandSyntaxNode[], propList: string[]): void;
    validateList(list: Css.Val[]): number;
}
export declare const shorthandValidators: {
    [key: string]: typeof ShorthandValidator;
};
/**
 * Object that validates simple and shorthand properties, breaking up shorthand
 * properties into corresponding simple ones, also stripping property prefixes.
 */
export declare class ValidatorSet {
    validators: {
        [key: string]: PropertyValidator;
    };
    prefixes: {
        [key: string]: {
            [key: string]: boolean;
        };
    };
    defaultValues: ValueMap;
    namedValidators: {
        [key: string]: ValidatingGroup;
    };
    systemFonts: {
        [key: string]: ValueMap;
    };
    shorthands: {
        [key: string]: ShorthandValidator;
    };
    layoutProps: ValueMap;
    backgroundProps: ValueMap;
    private addReplacement;
    private newGroup;
    private addCounts;
    private primitive;
    private newFunc;
    initBuiltInValidators(): void;
    private isBuiltIn;
    private readNameAndPrefixes;
    private parseValidators;
    private parseDefaults;
    private parseShorthands;
    parse(text: string): void;
    makePropSet(propList: string[]): ValueMap;
    validatePropertyAndHandleShorthand(name: string, value: Css.Val, important: boolean, receiver: PropertyReceiver): void;
}
export declare function baseValidatorSet(): ValidatorSet;
export declare function containsVar(val: Css.Val): boolean;
