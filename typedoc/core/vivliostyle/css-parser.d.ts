import * as Css from "./css";
import * as CssTokenizer from "./css-tokenizer";
import * as Exprs from "./exprs";
import * as Task from "./task";
/**
 * User agent stylesheet base specificity.
 */
export declare const SPECIFICITY_USER_AGENT: number;
/**
 * User stylesheet base specificity.
 */
export declare const SPECIFICITY_USER: number;
/**
 * Author stylesheet ("normal" stylesheet) base specificity.
 */
export declare const SPECIFICITY_AUTHOR: number;
/**
 * Style attribute base specificity.
 */
export declare const SPECIFICITY_STYLE: number;
/**
 * Style attribute base specificity when !important is used.
 */
export declare const SPECIFICITY_STYLE_IMPORTANT: number;
/**
 * Author stylesheet base specificity when !important is used.
 */
export declare const SPECIFICITY_AUTHOR_IMPORTANT: number;
/**
 * User stylesheet base specificity when !important is used.
 */
export declare const SPECIFICITY_USER_IMPORTANT: number;
/**
 * @enum {string}
 */
export declare enum StylesheetFlavor {
    USER_AGENT = "UA",
    USER = "User",
    AUTHOR = "Author"
}
export declare class ParserHandler implements CssTokenizer.TokenizerHandler {
    scope: Exprs.LexicalScope;
    flavor: StylesheetFlavor;
    constructor(scope: Exprs.LexicalScope);
    getCurrentToken(): CssTokenizer.Token;
    getScope(): Exprs.LexicalScope;
    error(mnemonics: string, token: CssTokenizer.Token): void;
    startStylesheet(flavor: StylesheetFlavor): void;
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
    startFontFaceRule(): void;
    startFootnoteRule(pseudoelem: string | null): void;
    startViewportRule(): void;
    startDefineRule(): void;
    startRegionRule(): void;
    startPageRule(): void;
    startPageMarginBoxRule(name: string): void;
    startWhenRule(expr: Css.Expr): void;
    startMediaRule(expr: Css.Expr): void;
    startFlowRule(flowName: string): void;
    startPageTemplateRule(): void;
    startPageMasterRule(name: string | null, pseudoName: string | null, classes: string[]): void;
    startPartitionRule(name: string | null, pseudoName: string | null, classes: string[]): void;
    startPartitionGroupRule(name: string | null, pseudoName: string | null, classes: string[]): void;
    startRuleBody(): void;
    property(name: string, value: Css.Val, important: boolean): void;
    endRule(): void;
    /**
     * @param funcName The name of the function taking a selector list as an
     *     argument
     */
    startFuncWithSelector(funcName: string): void;
    endFuncWithSelector(): void;
    getImportantSpecificity(): number;
    getBaseSpecificity(): number;
}
export declare class DispatchParserHandler extends ParserHandler {
    stack: ParserHandler[];
    tokenizer: CssTokenizer.Tokenizer;
    slave: ParserHandler;
    constructor();
    pushHandler(slave: ParserHandler): void;
    popHandler(): void;
    getCurrentToken(): CssTokenizer.Token;
    getScope(): Exprs.LexicalScope;
    /**
     * Forwards call to slave.
     * @override
     */
    error(mnemonics: string, token: CssTokenizer.Token): void;
    /**
     * Called by a slave.
     */
    errorMsg(mnemonics: string, token: CssTokenizer.Token): void;
    startStylesheet(flavor: StylesheetFlavor): void;
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
    startFontFaceRule(): void;
    startFootnoteRule(pseudoelem: string | null): void;
    startViewportRule(): void;
    startDefineRule(): void;
    startRegionRule(): void;
    startPageRule(): void;
    startPageMarginBoxRule(name: string): void;
    startWhenRule(expr: Css.Expr): void;
    startFlowRule(flowName: string): void;
    startPageTemplateRule(): void;
    startPageMasterRule(name: string | null, pseudoName: string | null, classes: string[]): void;
    startPartitionRule(name: string | null, pseudoName: string | null, classes: string[]): void;
    startPartitionGroupRule(name: string | null, pseudoName: string | null, classes: string[]): void;
    startRuleBody(): void;
    property(name: string, value: Css.Val, important: boolean): void;
    endRule(): void;
    startFuncWithSelector(funcName: string): void;
    endFuncWithSelector(): void;
}
export declare class SkippingParserHandler extends ParserHandler {
    owner: DispatchParserHandler;
    readonly topLevel: any;
    depth: number;
    constructor(scope: Exprs.LexicalScope, owner: DispatchParserHandler, topLevel: any);
    getCurrentToken(): CssTokenizer.Token;
    error(mnemonics: string, token: CssTokenizer.Token): void;
    startRuleBody(): void;
    endRule(): void;
}
export declare class SlaveParserHandler extends SkippingParserHandler {
    constructor(scope: Exprs.LexicalScope, owner: DispatchParserHandler, topLevel: boolean);
    report(message: string): void;
    reportAndSkip(message: string): void;
    startSelectorRule(): void;
    startFontFaceRule(): void;
    startFootnoteRule(pseudoelem: string | null): void;
    startViewportRule(): void;
    startDefineRule(): void;
    startRegionRule(): void;
    startPageRule(): void;
    startWhenRule(expr: Css.Expr): void;
    startFlowRule(flowName: string): void;
    startPageTemplateRule(): void;
    startPageMasterRule(name: string | null, pseudoName: string | null, classes: string[]): void;
    startPartitionRule(name: string | null, pseudoName: string | null, classes: string[]): void;
    startPartitionGroupRule(name: string | null, pseudoName: string | null, classes: string[]): void;
    startFuncWithSelector(funcName: string): void;
    endFuncWithSelector(): void;
    property(name: string, value: Css.Val, important: boolean): void;
}
export declare const actionsBase: Action[];
export declare const actionsStyleAttribute: Action[];
export declare const actionsSelector: Action[];
export declare const actionsSelectorInFunc: Action[];
export declare const actionsSelectorCont: Action[];
export declare const actionsSelectorStart: Action[];
export declare const actionsPropVal: Action[];
export declare const actionsExprVal: Action[];
export declare const actionsExprOp: Action[];
export declare const actionsError: Action[];
export declare const actionsErrorDecl: Action[];
export declare const actionsErrorSelector: Action[];
export declare const priority: number[];
/**
 * @enum {number}
 */
export declare enum Action {
    SELECTOR_NAME_1 = 1,
    SELECTOR_NAME = 2,
    SELECTOR_ANY_1 = 3,
    SELECTOR_ANY = 4,
    SELECTOR_ID_1 = 5,
    SELECTOR_ID = 6,
    SELECTOR_CLASS_1 = 7,
    SELECTOR_CLASS = 8,
    SELECTOR_ATTR_1 = 9,
    SELECTOR_ATTR = 10,
    SELECTOR_CHILD = 11,
    SELECTOR_SIBLING = 12,
    SELECTOR_BODY = 13,
    SELECTOR_PSEUDOCLASS = 14,
    VAL_IDENT = 15,
    VAL_HASH = 16,
    VAL_NUM = 17,
    VAL_INT = 18,
    VAL_NUMERIC = 19,
    VAL_STR = 20,
    VAL_URL = 21,
    VAL_COMMA = 22,
    VAL_SLASH = 23,
    VAL_FUNC = 24,
    VAL_C_PAR = 25,
    VAL_END = 26,
    RULE_END = 27,
    IDENT = 28,
    SELECTOR_START = 29,
    AT = 30,
    EXPR_IDENT = 31,
    EXPR_NUM = 32,
    EXPR_NUMERIC = 33,
    EXPR_STR = 34,
    EXPR_PARAM = 35,
    EXPR_PREFIX = 36,
    EXPR_INFIX = 37,
    EXPR_FUNC = 38,
    EXPR_C_PAR = 39,
    EXPR_O_PAR = 40,
    SELECTOR_NEXT = 41,
    SELECTOR_PSEUDOELEM = 42,
    EXPR_O_BRC = 43,
    VAL_FINISH = 44,
    EXPR_INFIX_NAME = 45,
    PROP = 46,
    VAL_BANG = 47,
    VAL_BRC = 48,
    EXPR_SEMICOL = 49,
    ERROR_PUSH = 50,
    ERROR_POP = 51,
    ERROR_POP_DECL = 52,
    ERROR_SEMICOL = 53,
    VAL_PLUS = 54,
    SELECTOR_PSEUDOCLASS_1 = 55,
    SELECTOR_FOLLOWING_SIBLING = 56,
    VAL_URANGE = 57,
    DONE = 200
}
export declare const OP_MEDIA_AND: number;
export declare const OP_MEDIA_OR: number;
export declare const OP_MEDIA_NOT: number;
/**
 * @enum {number}
 */
export declare enum ExprContext {
    PROP = 0,
    WHEN = 1,
    MEDIA = 2,
    IMPORT = 3,
    SUPPORTS = 4
}
export declare class Parser {
    actions: Action[];
    tokenizer: CssTokenizer.Tokenizer;
    readonly handler: ParserHandler;
    baseURL: string;
    valStack: any[];
    namespacePrefixToURI: {
        [key: string]: string;
    };
    defaultNamespaceURI: string | null;
    propName: string | null;
    propImportant: boolean;
    exprContext: ExprContext;
    result: Css.Val;
    importReady: boolean;
    importURL: string | null;
    importCondition: Css.Expr;
    errorBrackets: number[];
    ruleStack: string[];
    regionRule: boolean;
    pageRule: boolean;
    constructor(actions: Action[], tokenizer: CssTokenizer.Tokenizer, handler: ParserHandler, baseURL: string);
    extractVals(sep: string, index: number): Css.Val[];
    valStackReduce(sep: string, token: CssTokenizer.Token): Css.Val;
    exprError(mnemonics: string, token: CssTokenizer.Token): void;
    exprStackReduce(op: number, token: CssTokenizer.Token): boolean;
    readSupportsTest(token: CssTokenizer.Token): Exprs.SupportsTest;
    readPseudoParams(): (number | string)[];
    /**
     * Read `an+b` argument of pseudoclasses. Roughly based on the algorithm at
     * https://drafts.csswg.org/css-syntax/#the-anb-type
     */
    private readNthPseudoParams;
    makeCondition(classes: string | null, condition: Exprs.Val): Css.Expr;
    isInsidePropertyOnlyRule(): boolean;
    runParser(count: number, parsingValue: boolean, parsingStyleAttr: boolean, parsingMediaQuery: boolean, parsingFunctionParam: boolean): boolean;
}
export declare class ErrorHandler extends ParserHandler {
    readonly scope: Exprs.LexicalScope;
    constructor(scope: Exprs.LexicalScope);
    error(mnemonics: string, token: CssTokenizer.Token): void;
    getScope(): Exprs.LexicalScope;
}
export declare function parseStylesheet(tokenizer: CssTokenizer.Tokenizer, handler: ParserHandler, baseURL: string, classes: string | null, media: string | null): Task.Result<boolean>;
export declare function parseStylesheetFromText(text: string, handler: ParserHandler, baseURL: string, classes: string | null, media: string | null): Task.Result<boolean>;
export declare function parseStylesheetFromURL(url: string, handler: ParserHandler, classes: string | null, media: string | null): Task.Result<boolean>;
export declare function parseValue(scope: Exprs.LexicalScope, tokenizer: CssTokenizer.Tokenizer, baseURL: string): Css.Val;
export declare function parseStyleAttribute(tokenizer: CssTokenizer.Tokenizer, handler: ParserHandler, baseURL: string): void;
export declare function parseMediaQuery(tokenizer: CssTokenizer.Tokenizer, handler: ParserHandler, baseURL: string): Css.Expr;
export declare const numProp: {
    [key: string]: boolean;
};
export declare function takesOnlyNum(propName: string): boolean;
/**
 * @return val
 */
export declare function evaluateExprToCSS(context: Exprs.Context, val: Exprs.Val, propName: string): Css.Val;
