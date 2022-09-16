/**
 * Copyright 2013 Google, Inc.
 * Copyright 2017 Trim-marks Inc.
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
 * @fileoverview CssTokenizer - CSS Tokenizer.
 */
export interface TokenizerHandler {
    error(mnemonics: string, token: Token): void;
}
export declare function escapeParseSingle(str: string): string;
export declare function escapeParse(str: string): string;
/**
 * @enum {number}
 */
export declare enum TokenType {
    EOF = 0,
    IDENT = 1,
    STR = 2,
    NUMERIC = 3,
    NUM = 4,
    INT = 5,
    FUNC = 6,
    HASH = 7,
    URL = 8,
    CLASS = 9,
    O_PAR = 10,
    C_PAR = 11,
    O_BRC = 12,
    C_BRC = 13,
    O_BRK = 14,
    C_BRK = 15,
    COMMA = 16,
    SEMICOL = 17,
    COLON = 18,
    SLASH = 19,
    AT = 20,
    PERCENT = 21,
    QMARK = 22,
    PLUS = 23,
    MINUS = 24,
    BAR_BAR = 25,
    AMP_AMP = 26,
    URANGE = 27,
    BANG = 31,
    DOLLAR = 32,
    HAT = 33,
    BAR = 34,
    TILDE = 35,
    STAR = 36,
    GT = 37,
    LT = 38,
    EQ = 39,
    BANG_EQ = 41,
    DOLLAR_EQ = 42,
    HAT_EQ = 43,
    BAR_EQ = 44,
    TILDE_EQ = 45,
    STAR_EQ = 46,
    GT_EQ = 47,
    LT_EQ = 48,
    EQ_EQ = 49,
    COL_COL = 50,
    CDO = 51,
    CDC = 52,
    UNKNOWN = 53,
    INVALID = 54,
    LAST = 54
}
export declare class Token {
    type: TokenType;
    precededBySpace: boolean;
    num: number;
    text: string;
    position: number;
    constructor();
    toString(): string;
}
/**
 * @enum {number}
 */
export declare enum Action {
    SPACE = 1,
    INT = 2,
    IDENT = 3,
    BANG = 4,
    HASH = 6,
    DOLLAR = 7,
    PERCENT = 8,
    AMP = 9,
    O_PAR = 10,
    C_PAR = 11,
    STAR = 12,
    PLUS = 13,
    COMMA = 14,
    MINUS = 15,
    DOT = 16,
    SLASH = 17,
    COLON = 18,
    SEMICOL = 19,
    LT = 20,
    EQ = 21,
    GT = 22,
    QMARK = 23,
    AT = 24,
    O_BRK = 25,
    C_BRK = 26,
    O_BRC = 27,
    C_BRC = 28,
    BSLASH = 29,
    HAT = 30,
    BAR = 31,
    TILDE = 32,
    STR1 = 33,
    STR2 = 34,
    END = 35,
    EQTAIL = 36,
    ENDINT = 37,
    ENDNUM = 38,
    CONT = 39,
    UNIT = 40,
    PCUNIT = 41,
    NUMBER = 42,
    ENDIDNT = 43,
    IDNTESC = 44,
    ENDIDES = 45,
    ENDSTR = 46,
    ENDESTR = 47,
    STR1ESC = 48,
    STR2ESC = 49,
    BAR_BAR = 50,
    AMP_AMP = 51,
    FUNC = 52,
    FUNCES = 53,
    COMMENT = 54,
    COMMST = 55,
    ENDNOTK = 56,
    MINMIN = 57,
    TOINT = 58,
    TONUM = 59,
    TOIDENT = 60,
    TOIDES = 61,
    KILL1 = 62,
    KILL2 = 63,
    URL = 64,
    URL1 = 65,
    URL2 = 66,
    ENDURL = 67,
    TERMURL = 68,
    FINURL = 69,
    LT_BG = 70,
    LT_BG_M = 71,
    INVALID = 72,
    CHKPOSS = 73,
    CHKPOSN = 74,
    URLESC = 75,
    IDESCH = 76,
    COL_COL = 77,
    TOCLASS = 78,
    CHKSP = 79,
    EOF = 80,
    CDO = 81,
    CDC = 82
}
export declare function makeActions(def: Action, spec: Action[]): Action[];
/**
 * Start of the token.
 */
export declare const actionsNormal: Action[];
/**
 * Inside identifier.
 */
export declare const actionsIdent: Action[];
/**
 * After dot (either .class or .123)
 */
export declare const actionsNumOrClass: Action[];
/**
 * after '-'
 */
export declare const actionsMinus: Action[];
/**
 * Inside identifier with escape sequence
 */
export declare const actionsIdentEsc: Action[];
/**
 * Inside integer
 */
export declare const actionsInt: Action[];
/**
 * inside real, after dot
 */
export declare const actionsNumber: Action[];
export declare const actionsCheckEq: Action[];
export declare const actionsColon: Action[];
export declare const actionsBar: Action[];
export declare const actionsAmp: Action[];
export declare const actionsSlash: Action[];
export declare const actionsComment: Action[];
export declare const actionsCommentStar: Action[];
export declare const actionsMinusMinus: Action[];
export declare const actionsLt: Action[];
export declare const actionsLtBang: Action[];
export declare const actionsLtBangMinus: Action[];
export declare const actionsIdentEscChr: Action[];
export declare const actionsStr1: Action[];
export declare const actionsStr2: Action[];
export declare const actionsStr1Esc: Action[];
export declare const actionsStr2Esc: Action[];
export declare const actionsURL: Action[];
export declare const actionsURLInside: Action[];
export declare const actionsURLInside1: Action[];
export declare const actionsURLInside2: Action[];
export declare const actionsURLTail: Action[];
export declare const INITIAL_INDEX_MASK = 15;
export declare class Tokenizer {
    input: string;
    readonly handler: TokenizerHandler;
    indexMask: number;
    buffer: Token[];
    head: number;
    tail: number;
    curr: number;
    position: number;
    constructor(input: string, handler: TokenizerHandler);
    token(): Token;
    nthToken(n: number): Token;
    consume(): void;
    mark(): void;
    reset(): void;
    unmark(): void;
    hasMark(): boolean;
    private reallocate;
    private error;
    private fillBuffer;
}
