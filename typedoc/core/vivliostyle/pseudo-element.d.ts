import * as Css from "./css";
import * as CssCascade from "./css-cascade";
import * as CssStyler from "./css-styler";
import * as Exprs from "./exprs";
import * as Vtree from "./vtree";
import { PseudoElement } from "./types";
export declare const document: Document;
/**
 * Pseudoelement names in the order they should be inserted in the shadow DOM,
 * empty string is the place where the element's DOM children are processed.
 */
export declare const pseudoNames: string[];
export declare const PSEUDO_ATTR = "data-adapt-pseudo";
export declare function getPseudoName(element: Element): string;
export declare function setPseudoName(element: Element, name: string): void;
export declare class PseudoelementStyler implements PseudoElement.PseudoelementStyler {
    readonly element: Element;
    style: CssCascade.ElementStyle;
    styler: CssStyler.AbstractStyler;
    readonly context: Exprs.Context;
    readonly exprContentListener: Vtree.ExprContentListener;
    contentProcessed: {
        [key: string]: boolean;
    };
    constructor(element: Element, style: CssCascade.ElementStyle, styler: CssStyler.AbstractStyler, context: Exprs.Context, exprContentListener: Vtree.ExprContentListener);
    /** @override */
    getStyle(element: Element, deep: boolean): CssCascade.ElementStyle;
    /** @override */
    processContent(element: Element, styles: {
        [key: string]: Css.Val;
    }, viewNode: Node): void;
}
