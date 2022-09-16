import * as Base from "./base";
import * as Css from "./css";
import * as CssCascade from "./css-cascade";
import * as CssStyler from "./css-styler";
import * as Exprs from "./exprs";
import * as Font from "./font";
import * as Task from "./task";
import * as TaskUtil from "./task-util";
import * as Vtree from "./vtree";
import { XmlDoc } from "./types";
export declare const frontEdgeBlackListHor: {
    [key: string]: string;
};
export declare const frontEdgeBlackListVert: {
    [key: string]: string;
};
export declare const frontEdgeUnforcedBreakBlackListHor: {
    [key: string]: string;
};
export declare const frontEdgeUnforcedBreakBlackListVert: {
    [key: string]: string;
};
export declare type CustomRenderer = (p1: Element, p2: Element, p3: {
    [key: string]: Css.Val;
}) => Task.Result<Element>;
export interface CustomRendererFactory {
    makeCustomRenderer(xmldoc: XmlDoc.XMLDocHolder): CustomRenderer;
}
/**
 * Creates an epubReadingSystem object in the iframe.contentWindow.navigator
 * when load event fires.
 */
export declare function initIFrame(iframe: HTMLIFrameElement): void;
export interface StylerProducer {
    getStylerForDoc(xmldoc: XmlDoc.XMLDocHolder): CssStyler.AbstractStyler;
}
export declare class ViewFactory extends Base.SimpleEventTarget implements Vtree.LayoutContext {
    readonly flowName: string;
    readonly context: Exprs.Context;
    readonly viewport: Viewport;
    readonly styler: CssStyler.Styler;
    readonly regionIds: string[];
    readonly xmldoc: XmlDoc.XMLDocHolder;
    readonly docFaces: Font.DocumentFaces;
    readonly footnoteStyle: CssCascade.ElementStyle;
    readonly stylerProducer: StylerProducer;
    readonly page: Vtree.Page;
    readonly customRenderer: CustomRenderer;
    readonly fallbackMap: {
        [key: string]: string;
    };
    readonly documentURLTransformer: Base.DocumentURLTransformer;
    private static SVG_URL_ATTRIBUTES;
    document: Document;
    exprContentListener: Vtree.ExprContentListener;
    nodeContext: Vtree.NodeContext | null;
    viewRoot: Element | null;
    isFootnote: boolean;
    sourceNode: Node | null;
    offsetInNode: number;
    viewNode: Node | null;
    constructor(flowName: string, context: Exprs.Context, viewport: Viewport, styler: CssStyler.Styler, regionIds: string[], xmldoc: XmlDoc.XMLDocHolder, docFaces: Font.DocumentFaces, footnoteStyle: CssCascade.ElementStyle, stylerProducer: StylerProducer, page: Vtree.Page, customRenderer: CustomRenderer, fallbackMap: {
        [key: string]: string;
    }, documentURLTransformer: Base.DocumentURLTransformer);
    /** @override */
    clone(): Vtree.LayoutContext;
    createPseudoelementShadow(element: Element, isRoot: boolean, cascStyle: CssCascade.ElementStyle, computedStyle: {
        [key: string]: Css.Val;
    }, styler: CssStyler.AbstractStyler, context: Exprs.Context, parentShadow: Vtree.ShadowContext, subShadow: Vtree.ShadowContext): Vtree.ShadowContext;
    getPseudoMap(cascStyle: CssCascade.ElementStyle, regionIds: string[], isFootnote: boolean, nodeContext: Vtree.NodeContext, context: Exprs.Context): CssCascade.ElementStyleMap;
    createRefShadow(href: string, type: Vtree.ShadowType, element: Element, parentShadow: Vtree.ShadowContext, subShadow: Vtree.ShadowContext): Task.Result<Vtree.ShadowContext>;
    createShadows(element: Element, isRoot: any, cascStyle: CssCascade.ElementStyle, computedStyle: {
        [key: string]: Css.Val;
    }, styler: CssStyler.AbstractStyler, context: Exprs.Context, shadowContext: Vtree.ShadowContext): Task.Result<Vtree.ShadowContext>;
    /** @override */
    setViewRoot(viewRoot: Element, isFootnote: boolean): void;
    /**
     * @return vertical
     */
    computeStyle(vertical: boolean, rtl: boolean, style: CssCascade.ElementStyle, computedStyle: {
        [key: string]: Css.Val;
    }): boolean;
    private inheritFromSourceParent;
    resolveURL(url: string): string;
    inheritLangAttribute(): void;
    transferPolyfilledInheritedProps(computedStyle: {
        [key: string]: Css.Val;
    }): void;
    resolveFormattingContext(nodeContext: Vtree.NodeContext, firstTime: boolean, display: Css.Ident, position: Css.Ident, float: Css.Ident, isRoot: boolean): void;
    /**
     * @return holding true if children should be processed
     */
    private createElementView;
    private isParagraph;
    /**
     * Check if the current position is at a forced break
     * (Fix for Issue #690)
     */
    private isAtForcedBreak;
    private processAfterIfcontinues;
    isSVGUrlAttribute(attributeName: string): boolean;
    modifyElemDimensionWithImageResolution(images: {
        image: HTMLElement;
        element: HTMLElement;
        fetcher: TaskUtil.Fetcher<string>;
    }[], imageResolution: number, computedStyle: {
        [key: string]: Css.Val;
    }, isVertical: boolean): void;
    private preprocessElementStyle;
    private findAndProcessRepeatingElements;
    private processRepeatOnBreak;
    private createTextNodeView;
    private preprocessTextContent;
    /**
     * @return holding true if children should be processed
     */
    createNodeView(firstTime: boolean, atUnforcedBreak: boolean): Task.Result<boolean>;
    /** @override */
    setCurrent(nodeContext: Vtree.NodeContext, firstTime: boolean, atUnforcedBreak?: boolean): Task.Result<boolean>;
    processShadowContent(pos: Vtree.NodeContext): Vtree.NodeContext;
    private nextPositionInTree;
    isTransclusion(element: Element, elementStyle: CssCascade.ElementStyle, transclusionType: string | null): boolean;
    /** @override */
    nextInTree(position: Vtree.NodeContext, atUnforcedBreak?: boolean): Task.Result<Vtree.NodeContext>;
    addImageFetchers(bg: Css.Val): void;
    applyComputedStyles(target: Element, computedStyle: {
        [key: string]: Css.Val;
    }): void;
    /**
     * Fix ruby text font size.
     * Issue #673: Minimum font size setting in Chrome causes ruby font size problem
     * @param target the rt element
     * @param value the font-size value
     * @returns true if the font-size fix is done
     */
    fixRubyTextFontSize(target: Element, value: Css.Val): boolean;
    /** @override */
    applyPseudoelementStyle(nodeContext: Vtree.NodeContext, pseudoName: string, target: Element): void;
    /** @override */
    peelOff(nodeContext: Vtree.NodeContext, nodeOffset: number): Task.Result<Vtree.NodeContext>;
    createElement(ns: string, tag: string): Element;
    /** @override */
    applyFootnoteStyle(vertical: boolean, rtl: boolean, target: Element): boolean;
    /** @override */
    processFragmentedBlockEdge(nodeContext: Vtree.NodeContext): void;
    /** @override */
    convertLengthToPx(numeric: Css.Numeric, viewNode: Node, clientLayout: Vtree.ClientLayout): number | Css.Numeric;
    /**
     * Returns if two NodePositionStep are equivalent.
     */
    isSameNodePositionStep(step1: Vtree.NodePositionStep, step2: Vtree.NodePositionStep): boolean;
    /** @override */
    isSameNodePosition(nodePosition1: Vtree.NodePosition, nodePosition2: Vtree.NodePosition): boolean;
    isPseudoelement(elem: any): boolean;
}
export declare const propertiesNotPassedToDOM: {
    "box-decoration-break": boolean;
    "float-min-wrap-block": boolean;
    "float-reference": boolean;
    "flow-into": boolean;
    "flow-linger": boolean;
    "flow-options": boolean;
    "flow-priority": boolean;
    "footnote-policy": boolean;
    page: boolean;
};
export declare class DefaultClientLayout implements Vtree.ClientLayout {
    layoutBox: Element;
    window: Window;
    constructor(viewport: Viewport);
    private subtractOffsets;
    /** @override */
    getRangeClientRects(range: Range): Vtree.ClientRect[];
    /** @override */
    getElementClientRect(element: Element): Vtree.ClientRect;
    /** @override */
    getElementComputedStyle(element: Element): CSSStyleDeclaration;
}
export declare class Viewport {
    readonly window: Window;
    readonly fontSize: number;
    document: Document;
    root: HTMLElement;
    private outerZoomBox;
    contentContainer: HTMLElement;
    layoutBox: Element;
    width: number;
    height: number;
    constructor(window: Window, fontSize: number, opt_root?: HTMLElement, opt_width?: number, opt_height?: number);
    /**
     * Reset zoom.
     */
    resetZoom(): void;
    /**
     * Zoom viewport.
     * @param width Overall width of contents before scaling (px)
     * @param height Overall height of contents before scaling (px)
     * @param scale Factor to which the viewport will be scaled.
     */
    zoom(width: number, height: number, scale: number): void;
    /**
     * Remove all pages inside the viewport.
     */
    clear(): void;
}
