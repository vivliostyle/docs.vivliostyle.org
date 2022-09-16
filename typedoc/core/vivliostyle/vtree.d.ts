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
 * @fileoverview Vtree - Basic view tree data structures and support utilities.
 */
import * as Base from "./base";
import * as Constants from "./constants";
import * as Css from "./css";
import * as Diff from "./diff";
import * as Exprs from "./exprs";
import * as GeometryUtil from "./geometry-util";
import * as TaskUtil from "./task-util";
import { CssStyler, PageFloats, Selectors, Vtree, XmlDoc } from "./types";
export declare const delayedProps: {
    transform: boolean;
    "transform-origin": boolean;
};
export declare const delayedPropsIfRelativePositioned: {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
};
export declare class DelayedItem {
    target: Element;
    name: string;
    value: Css.Val;
    constructor(target: Element, name: string, value: Css.Val);
}
export declare type PageHyperlinkEvent = {
    type: string;
    target: any;
    currentTarget: any;
    anchorElement: Element;
    href: string;
};
export declare type Trigger = {
    observer: string;
    event: string;
    action: string;
    ref: string;
};
export declare const actions: {
    show: (obj: any) => void;
    hide: (obj: any) => void;
    play: (obj: any) => void;
    pause: (obj: any) => void;
    resume: (obj: any) => void;
    mute: (obj: any) => void;
    unmute: (obj: any) => void;
};
export declare function makeListener(refs: Element[], action: string): EventListener | null;
export declare class Page extends Base.SimpleEventTarget {
    readonly container: HTMLElement;
    readonly bleedBox: HTMLElement;
    private static AUTO_PAGE_WIDTH_ATTRIBUTE;
    private static AUTO_PAGE_HEIGHT_ATTRIBUTE;
    pageAreaElement: HTMLElement | null;
    delayedItems: DelayedItem[];
    hrefHandler: (e: Event) => void;
    elementsById: {
        [key: string]: Element[];
    };
    dimensions: {
        width: number;
        height: number;
    };
    isFirstPage: boolean;
    isLastPage: boolean;
    isBlankPage: boolean;
    isAutoPageWidth: boolean;
    isAutoPageHeight: boolean;
    spineIndex: number;
    position: LayoutPosition;
    offset: number;
    side: Constants.PageSide | null;
    fetchers: TaskUtil.Fetcher<{}>[];
    marginBoxes: {
        top: {
            [key: string]: Container;
        };
        bottom: {
            [key: string]: Container;
        };
        left: {
            [key: string]: Container;
        };
        right: {
            [key: string]: Container;
        };
    };
    constructor(container: HTMLElement, bleedBox: HTMLElement);
    setAutoPageWidth(isAuto: boolean): void;
    setAutoPageHeight(isAuto: boolean): void;
    registerElementWithId(element: Element, id: string): void;
    finish(triggers: Trigger[], clientLayout: ClientLayout): void;
}
export declare type Spread = {
    left: Page;
    right: Page;
};
/**
 * Marks an element as "special". It should not be used in bbox calculations.
 */
export declare const SPECIAL_ATTR = "data-adapt-spec";
export declare const Whitespace: typeof Vtree.Whitespace;
export declare type Whitespace = Vtree.Whitespace;
/**
 * Resolves Whitespace value from a value of 'white-space' property
 * @param whitespace The value of 'white-space' property
 */
export declare function whitespaceFromPropertyValue(whitespace: string): Whitespace | null;
export declare function canIgnore(node: Node, whitespace: Whitespace): boolean;
export declare class Flow {
    readonly flowName: string;
    readonly parentFlowName: string | null;
    forcedBreakOffsets: number[];
    formattingContext: FormattingContext | null;
    constructor(flowName: string, parentFlowName: string | null);
}
export declare class FlowChunk {
    flowName: string;
    element: Element;
    startOffset: number;
    priority: number;
    linger: number;
    exclusive: boolean;
    repeated: boolean;
    last: boolean;
    breakBefore: string | null;
    startPage: number;
    constructor(flowName: string, element: Element, startOffset: number, priority: number, linger: number, exclusive: boolean, repeated: boolean, last: boolean, breakBefore: string | null);
    isBetter(other: FlowChunk): boolean;
}
export declare type ClientRect = Vtree.ClientRect;
export declare function clientrectIncreasingTop(r1: ClientRect, r2: ClientRect): number;
export declare function clientrectDecreasingRight(r1: ClientRect, r2: ClientRect): number;
/**
 * Interface to read the position assigned to the elements and ranges by the
 * browser.
 */
export declare type ClientLayout = Vtree.ClientLayout;
/**
 * Styling, creating a single node's view, etc.
 */
export declare type LayoutContext = Vtree.LayoutContext;
/**
 * Formatting context.
 */
export declare type FormattingContext = Vtree.FormattingContext;
export declare function eachAncestorFormattingContext(nodeContext: NodeContext, callback: (p1: FormattingContext) => any): void;
export declare type NodePositionStep = Vtree.NodePositionStep;
export declare function isSameNodePositionStep(nps1: NodePositionStep, nps2: NodePositionStep): boolean;
export declare type NodePosition = Vtree.NodePosition;
export declare function isSameNodePosition(np1: NodePosition | null, np2: NodePosition | null): boolean;
export declare function newNodePositionFromNode(node: Node): NodePosition;
export declare function newNodePositionFromNodeContext(nodeContext: Vtree.NodeContext, initialFragmentIndex: number | null): NodePosition;
export declare function makeNodeContextFromNodePositionStep(step: NodePositionStep, parent: Vtree.NodeContext): NodeContext;
export declare const ShadowType: typeof Vtree.ShadowType;
export declare type ShadowType = Vtree.ShadowType;
/**
 * Data about shadow tree instance.
 */
export declare class ShadowContext implements Vtree.ShadowContext {
    readonly owner: Element;
    readonly root: Element;
    readonly xmldoc: XmlDoc.XMLDocHolder;
    readonly parentShadow: ShadowContext;
    readonly type: ShadowType;
    readonly styler: CssStyler.AbstractStyler;
    subShadow: ShadowContext;
    constructor(owner: Element, root: Element, xmldoc: XmlDoc.XMLDocHolder, parentShadow: ShadowContext, superShadow: ShadowContext, type: ShadowType, styler: CssStyler.AbstractStyler);
    equals(other: ShadowContext): boolean;
}
export declare function isSameShadowContext(sc1: Vtree.ShadowContext, sc2: Vtree.ShadowContext): boolean;
/**
 * Information about :first-letter or :first-line pseudoelements
 * @param count 0 - first-letter, 1 or more - first line(s)
 */
export declare class FirstPseudo implements Vtree.FirstPseudo {
    readonly outer: FirstPseudo;
    readonly count: number;
    constructor(outer: FirstPseudo, count: number);
}
/**
 * NodeContext represents a position in the document + layout-related
 * information attached to it. When after=false and offsetInNode=0, the
 * position is inside the element (node), but just before its first child.
 * When offsetInNode>0 it represents offset in the textual content of the
 * node. When after=true it represents position right after the last child
 * of the node. boxOffset is incremented by 1 for any valid node position.
 */
export declare class NodeContext implements Vtree.NodeContext {
    sourceNode: Node;
    parent: NodeContext;
    boxOffset: number;
    offsetInNode: number;
    after: boolean;
    shadowType: ShadowType;
    shadowContext: Vtree.ShadowContext;
    nodeShadow: Vtree.ShadowContext;
    shadowSibling: NodeContext;
    shared: boolean;
    inline: boolean;
    overflow: boolean;
    breakPenalty: number;
    display: string | null;
    floatReference: PageFloats.FloatReference;
    floatSide: string | null;
    clearSide: string | null;
    floatMinWrapBlock: Css.Numeric | null;
    columnSpan: Css.Val | null;
    verticalAlign: string;
    captionSide: string;
    inlineBorderSpacing: number;
    blockBorderSpacing: number;
    flexContainer: boolean;
    whitespace: Whitespace;
    hyphenateCharacter: string | null;
    breakWord: boolean;
    establishesBFC: boolean;
    containingBlockForAbsolute: boolean;
    breakBefore: string | null;
    breakAfter: string | null;
    viewNode: Node;
    clearSpacer: Node;
    inheritedProps: {
        [key: string]: number | string | Css.Val;
    };
    vertical: boolean;
    direction: string;
    firstPseudo: FirstPseudo;
    lang: string | null;
    preprocessedTextContent: Diff.Change[] | null;
    formattingContext: FormattingContext;
    repeatOnBreak: string | null;
    pluginProps: {
        [key: string]: string | number | undefined | null | (number | null)[];
    };
    fragmentIndex: number;
    afterIfContinues: Selectors.AfterIfContinues;
    footnotePolicy: Css.Ident | null;
    pageType: string | null;
    constructor(sourceNode: Node, parent: NodeContext, boxOffset: number);
    resetView(): void;
    private cloneItem;
    modify(): NodeContext;
    copy(): NodeContext;
    clone(): NodeContext;
    toNodePositionStep(): NodePositionStep;
    toNodePosition(): NodePosition;
    isInsideBFC(): boolean;
    getContainingBlockForAbsolute(): NodeContext;
    /**
     * Walk up NodeContext tree (starting from itself) and call the callback for
     * each block.
     */
    walkUpBlocks(callback: (p1: NodeContext) => any): void;
    belongsTo(formattingContext: FormattingContext): boolean;
}
export declare class ChunkPosition implements Vtree.ChunkPosition {
    primary: NodePosition;
    floats: NodePosition[];
    constructor(primary: NodePosition);
    clone(): ChunkPosition;
    isSamePosition(other: ChunkPosition): boolean;
}
export declare class FlowChunkPosition {
    chunkPosition: ChunkPosition;
    readonly flowChunk: FlowChunk;
    constructor(chunkPosition: ChunkPosition, flowChunk: FlowChunk);
    clone(): FlowChunkPosition;
    isSamePosition(other: FlowChunkPosition): boolean;
}
export declare class FlowPosition {
    positions: FlowChunkPosition[];
    startSide: string;
    breakAfter: string | null;
    clone(): FlowPosition;
    isSamePosition(other: FlowPosition): boolean;
    hasContent(offset: number): boolean;
}
export declare class LayoutPosition {
    /**
     * One-based, incremented before layout.
     */
    page: number;
    flows: {
        [key: string]: Flow;
    };
    flowPositions: {
        [key: string]: FlowPosition;
    };
    isBlankPage: boolean;
    /**
     * flowPositions is built up to this offset.
     */
    highestSeenOffset: number;
    highestSeenNode: Node;
    lookupPositionOffset: number;
    clone(): LayoutPosition;
    isSamePosition(other: LayoutPosition): boolean;
    /**
     * @param name flow name.
     */
    hasContent(name: string, offset: number): boolean;
    startSideOfFlow(name: string): string;
    firstFlowChunkOfFlow(name: string): FlowChunk | null;
}
export declare class Container implements Vtree.Container {
    element: Element;
    left: number;
    top: number;
    marginLeft: number;
    marginRight: number;
    marginTop: number;
    marginBottom: number;
    borderLeft: number;
    borderRight: number;
    borderTop: number;
    borderBottom: number;
    paddingLeft: number;
    paddingRight: number;
    paddingTop: number;
    paddingBottom: number;
    width: number;
    height: number;
    originX: number;
    originY: number;
    exclusions: GeometryUtil.Shape[];
    innerShape: GeometryUtil.Shape;
    computedBlockSize: number;
    snapWidth: number;
    snapHeight: number;
    snapOffsetX: number;
    snapOffsetY: number;
    vertical: boolean;
    constructor(element: Element);
    getInsetTop(): number;
    getInsetBottom(): number;
    getInsetLeft(): number;
    getInsetRight(): number;
    getInsetBefore(): number;
    getInsetAfter(): number;
    getInsetStart(): number;
    getInsetEnd(): number;
    getBeforeEdge(box: ClientRect): number;
    getAfterEdge(box: ClientRect): number;
    getStartEdge(box: ClientRect): number;
    getEndEdge(box: ClientRect): number;
    getInlineSize(box: ClientRect): number;
    getBoxSize(box: ClientRect): number;
    getBoxDir(): number;
    getInlineDir(): number;
    copyFrom(other: Container): void;
    setVerticalPosition(top: number, height: number): void;
    setHorizontalPosition(left: number, width: number): void;
    setBlockPosition(start: number, extent: number): void;
    setInlinePosition(start: number, extent: number): void;
    clear(): void;
    getInnerShape(): GeometryUtil.Shape;
    getInnerRect(): GeometryUtil.Rect;
    getPaddingRect(): GeometryUtil.Rect;
    getOuterShape(outerShapeProp: Css.Val, context: Exprs.Context): GeometryUtil.Shape;
    getOuterRect(): GeometryUtil.Rect;
}
export declare type ExprContentListener = Vtree.ExprContentListener;
export declare class ContentPropertyHandler extends Css.Visitor {
    readonly elem: Element;
    readonly context: Exprs.Context;
    readonly rootContentValue: Css.Val;
    readonly exprContentListener: ExprContentListener;
    constructor(elem: Element, context: Exprs.Context, rootContentValue: Css.Val, exprContentListener: ExprContentListener);
    private visitStrInner;
    visitStr(str: Css.Str): Css.Val;
    visitURL(url: Css.URL): Css.Val;
    visitSpaceList(list: Css.SpaceList): Css.Val;
    visitExpr(expr: Css.Expr): Css.Val;
}
export declare function nonTrivialContent(val: Css.Val): boolean;
