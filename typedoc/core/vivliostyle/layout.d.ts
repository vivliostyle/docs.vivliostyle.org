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
 * @fileoverview Layout - Fills a column with styled content.
 * This file does not communicate with the styling system directly.
 * Instead it goes through the layout interface that gives it one view tree
 * node at a time.
 */
import * as LayoutRetryers from "./layout-retryers";
import * as BreakPosition from "./break-position";
import * as Css from "./css";
import * as GeometryUtil from "./geometry-util";
import * as PageFloats from "./page-floats";
import * as Matchers from "./matchers";
import * as PseudoElement from "./pseudo-element";
import * as Task from "./task";
import * as VtreeImpl from "./vtree";
import { FragmentLayoutConstraintType, Layout, RepetitiveElement, Selectors, Vtree } from "./types";
export declare const isInstanceOfAfterIfContinuesLayoutConstraint: typeof Selectors.isInstanceOfAfterIfContinuesLayoutConstraint;
export declare const registerFragmentIndex: typeof Matchers.NthFragmentMatcher.registerFragmentIndex;
export declare const clearFragmentIndices: typeof Matchers.NthFragmentMatcher.clearFragmentIndices;
export declare class AfterIfContinues implements Selectors.AfterIfContinues {
    readonly sourceNode: Element;
    readonly styler: PseudoElement.PseudoelementStyler;
    constructor(sourceNode: Element, styler: PseudoElement.PseudoelementStyler);
    createElement(column: Layout.Column, parentNodeContext: Vtree.NodeContext): Task.Result<Element>;
    private createNodePositionForPseudoElement;
    private createShadowContext;
}
export declare class AfterIfContinuesLayoutConstraint implements Selectors.AfterIfContinuesLayoutConstraint {
    nodeContext: Vtree.NodeContext;
    afterIfContinues: Selectors.AfterIfContinues;
    pseudoElementHeight: number;
    flagmentLayoutConstraintType: FragmentLayoutConstraintType;
    constructor(nodeContext: Vtree.NodeContext, afterIfContinues: Selectors.AfterIfContinues, pseudoElementHeight: number);
    /** @override */
    allowLayout(nodeContext: Vtree.NodeContext, overflownNodeContext: Vtree.NodeContext, column: Layout.Column): boolean;
    /** @override */
    nextCandidate(nodeContext: Vtree.NodeContext): boolean;
    /** @override */
    postLayout(allowed: boolean, positionAfter: Vtree.NodeContext, initialPosition: Vtree.NodeContext, column: Layout.Column): void;
    /** @override */
    finishBreak(nodeContext: Vtree.NodeContext, column: Layout.Column): Task.Result<boolean>;
    getRepetitiveElements(): AfterIfContinuesElementsOffset;
    /** @override */
    equalsTo(constraint: Layout.FragmentLayoutConstraint): boolean;
    /** @override */
    getPriorityOfFinishBreak(): number;
}
export declare class AfterIfContinuesElementsOffset implements Selectors.AfterIfContinuesElementsOffset {
    nodeContext: any;
    pseudoElementHeight: any;
    constructor(nodeContext: any, pseudoElementHeight: any);
    /** @override */
    calculateOffset(nodeContext: Vtree.NodeContext): number;
    /** @override */
    calculateMinimumOffset(nodeContext: Vtree.NodeContext): number;
    affectTo(nodeContext: Vtree.NodeContext): boolean;
}
export declare function processAfterIfContinues(result: Task.Result<Vtree.NodeContext>, column: Layout.Column): Task.Result<Vtree.NodeContext>;
export declare function processAfterIfContinuesOfAncestors(nodeContext: Vtree.NodeContext, column: Layout.Column): Task.Result<boolean>;
export declare function calculatePseudoElementHeight(nodeContext: Vtree.NodeContext, column: Layout.Column, pseudoElement: Element): number;
export declare const mediaTags: {
    img: boolean;
    svg: boolean;
    audio: boolean;
    video: boolean;
};
/**
 * Represents a constraint on layout
 */
export declare type LayoutConstraint = Layout.LayoutConstraint;
/**
 * Represents a constraint that allows layout if all the constraints it contains
 * allow layout.
 */
export declare class AllLayoutConstraint implements LayoutConstraint {
    readonly constraints: LayoutConstraint[];
    constructor(constraints: LayoutConstraint[]);
    /** @override */
    allowLayout(nodeContext: Vtree.NodeContext): boolean;
}
/**
 * Represents constraints on laying out fragments
 */
export declare type FragmentLayoutConstraint = Layout.FragmentLayoutConstraint;
export declare type BreakPositionAndNodeContext = Layout.BreakPositionAndNodeContext;
/**
 * Potential breaking position inside CSS box (between lines).
 * @param checkPoints array of breaking points for breakable block
 */
export declare class BoxBreakPosition extends BreakPosition.AbstractBreakPosition implements Layout.BoxBreakPosition {
    readonly checkPoints: Vtree.NodeContext[];
    readonly penalty: number;
    private alreadyEvaluated;
    breakNodeContext: Vtree.NodeContext;
    constructor(checkPoints: Vtree.NodeContext[], penalty: number);
    findAcceptableBreak(column: Column, penalty: number): Vtree.NodeContext;
    getMinBreakPenalty(): number;
    getNodeContext(): Vtree.NodeContext;
}
export declare function validateCheckPoints(checkPoints: Vtree.NodeContext[]): void;
export declare class Column extends VtreeImpl.Container implements Layout.Column {
    layoutContext: Vtree.LayoutContext;
    clientLayout: Vtree.ClientLayout;
    readonly layoutConstraint: LayoutConstraint;
    readonly pageFloatLayoutContext: PageFloats.PageFloatLayoutContext;
    last: Node;
    viewDocument: Document;
    flowRootFormattingContext: Vtree.FormattingContext;
    isFloat: boolean;
    isFootnote: boolean;
    startEdge: number;
    endEdge: number;
    beforeEdge: number;
    afterEdge: number;
    footnoteEdge: number;
    box: GeometryUtil.Rect;
    chunkPositions: Vtree.ChunkPosition[];
    bands: GeometryUtil.Band[];
    overflown: boolean;
    breakPositions: BreakPosition.BreakPosition[];
    pageBreakType: string | null;
    forceNonfitting: boolean;
    leftFloatEdge: number;
    rightFloatEdge: number;
    bottommostFloatTop: number;
    stopAtOverflow: boolean;
    lastAfterPosition: Vtree.NodePosition | null;
    fragmentLayoutConstraints: FragmentLayoutConstraint[];
    pseudoParent: Column;
    nodeContextOverflowingDueToRepetitiveElements: Vtree.NodeContext | null;
    blockDistanceToBlockEndFloats: number;
    breakAtTheEdgeBeforeFloat: string | null;
    constructor(element: Element, layoutContext: Vtree.LayoutContext, clientLayout: Vtree.ClientLayout, layoutConstraint: LayoutConstraint, pageFloatLayoutContext: PageFloats.PageFloatLayoutContext);
    getTopEdge(): number;
    getBottomEdge(): number;
    getLeftEdge(): number;
    getRightEdge(): number;
    isFloatNodeContext(nodeContext: Vtree.NodeContext): boolean;
    stopByOverflow(nodeContext: Vtree.NodeContext): boolean;
    isOverflown(edge: number): boolean;
    getExclusions(): GeometryUtil.Shape[];
    openAllViews(position: Vtree.NodePosition): Task.Result<Vtree.NodeContext>;
    calculateOffsetInNodeForNodeContext(position: Vtree.NodePosition): number;
    /**
     * @param count first-XXX nesting identifier
     */
    maybePeelOff(position: Vtree.NodeContext, count: number): Task.Result<Vtree.NodeContext>;
    /**
     * Builds the view until a CSS box edge is reached.
     * @param position start source position.
     * @param checkPoints array to append possible breaking points.
     * @return holding box edge position reached or null if the source is exhausted.
     */
    buildViewToNextBlockEdge(position: Vtree.NodeContext, checkPoints: Vtree.NodeContext[]): Task.Result<Vtree.NodeContext>;
    nextInTree(position: Vtree.NodeContext, atUnforcedBreak?: boolean): Task.Result<Vtree.NodeContext>;
    /**
     * Builds the view for a single unbreakable element.
     * @param position start source position.
     * @return holding box edge position reached or null if the source is exhausted.
     */
    buildDeepElementView(position: Vtree.NodeContext): Task.Result<Vtree.NodeContext>;
    /**
     * Create a single floating element (for exclusion areas).
     * @param ref container's child to insert float before (can be null).
     * @param side float side ("left" or "right").
     * @param width float inline dimension.
     * @param height float box progression dimension.
     * @return newly created float element.
     */
    createFloat(ref: Node, side: string, width: number, height: number): Element;
    /**
     * Remove all the exclusion floats.
     */
    killFloats(): void;
    /**
     * Create exclusion floats for a column.
     */
    createFloats(): void;
    /**
     * @param nodeContext position after the block
     * @param checkPoints array of possible breaking points.
     * @param index index of the breaking point
     * @param boxOffset box offset
     * @return edge position
     */
    calculateEdge(nodeContext: Vtree.NodeContext, checkPoints: Vtree.NodeContext[], index: number, boxOffset: number): number;
    /**
     * Parse CSS computed length (in pixels)
     * @param val CSS length in "px" units or a number.
     * @return value in pixels or 0 if not parsable
     */
    parseComputedLength(val: string | number): number;
    /**
     * Reads element's computed CSS margin.
     */
    getComputedMargin(element: Element): GeometryUtil.Insets;
    /**
     * Reads element's computed padding + borders.
     */
    getComputedPaddingBorder(element: Element): GeometryUtil.Insets;
    /**
     * Reads element's computed CSS insets(margins + border + padding or margins :
     * depends on box-sizing)
     */
    getComputedInsets(element: Element): GeometryUtil.Insets;
    /**
     * Set element's computed CSS insets to Column Container
     */
    setComputedInsets(element: Element, container: Column): void;
    /**
     * Set element's computed width and height to Column Container
     */
    setComputedWidthAndHeight(element: Element, container: Column): void;
    /**
     * Layout a single unbreakable element.
     */
    layoutUnbreakable(nodeContextIn: Vtree.NodeContext): Task.Result<Vtree.NodeContext>;
    /**
     * Layout a single float element.
     */
    layoutFloat(nodeContext: Vtree.NodeContext): Task.Result<Vtree.NodeContext>;
    setupFloatArea(area: PageFloatArea, floatReference: PageFloats.FloatReference, floatSide: string, anchorEdge: number | null, strategy: PageFloats.PageFloatLayoutStrategy, condition: PageFloats.PageFloatPlacementCondition): boolean;
    createPageFloatArea(float: PageFloats.PageFloat | null, floatSide: string, anchorEdge: number | null, strategy: PageFloats.PageFloatLayoutStrategy, condition: PageFloats.PageFloatPlacementCondition): PageFloatArea | null;
    layoutSinglePageFloatFragment(continuations: PageFloats.PageFloatContinuation[], floatSide: string, clearSide: string | null, allowFragmented: boolean, strategy: PageFloats.PageFloatLayoutStrategy, anchorEdge: number | null, pageFloatFragment?: PageFloats.PageFloatFragment | null): Task.Result<SinglePageFloatLayoutResult>;
    layoutPageFloatInner(continuation: PageFloats.PageFloatContinuation, strategy: PageFloats.PageFloatLayoutStrategy, anchorEdge: number | null, pageFloatFragment?: PageFloats.PageFloatFragment): Task.Result<boolean>;
    /**
     * @returns Represents if the layout was succeeded or not
     */
    private layoutStashedPageFloats;
    setFloatAnchorViewNode(nodeContext: Vtree.NodeContext): Vtree.NodeContext;
    resolveFloatReferenceFromColumnSpan(floatReference: PageFloats.FloatReference, columnSpan: Css.Val, nodeContext: Vtree.NodeContext): Task.Result<PageFloats.FloatReference>;
    layoutPageFloat(nodeContext: Vtree.NodeContext): Task.Result<Vtree.NodeContext>;
    createJustificationAdjustmentElement(insertionPoint: Node, doc: Document, parentNode: Node, vertical: boolean): HTMLElement;
    addAndAdjustJustificationElement(nodeContext: Vtree.NodeContext, insertAfter: boolean, node: Node, insertionPoint: Node, doc: Document, parentNode: Node): HTMLElement;
    compensateJustificationLineHeight(span: Element, br: Element, nodeContext: Vtree.NodeContext): void;
    /**
     * Fix justification of the last line of text broken across pages (if
     * needed).
     */
    fixJustificationIfNeeded(nodeContext: Vtree.NodeContext, endOfColumn: boolean): void;
    processLineStyling(nodeContext: Vtree.NodeContext, resNodeContext: Vtree.NodeContext, checkPoints: Vtree.NodeContext[]): Task.Result<Vtree.NodeContext>;
    isLoneImage(checkPoints: Vtree.NodeContext[]): boolean;
    getTrailingMarginEdgeAdjustment(trailingEdgeContexts: Vtree.NodeContext[]): number;
    /**
     * Layout a single CSS box.
     */
    layoutBreakableBlock(nodeContext: Vtree.NodeContext): Task.Result<Vtree.NodeContext>;
    postLayoutBlock(nodeContext: Vtree.NodeContext, checkPoints: Vtree.NodeContext[]): void;
    findEndOfLine(linePosition: number, checkPoints: Vtree.NodeContext[], isUpdateMaxReachedAfterEdge: boolean): {
        nodeContext: Vtree.NodeContext;
        index: number;
        checkPointIndex: number;
    };
    findAcceptableBreakInside(checkPoints: Vtree.NodeContext[], edgePosition: number, force: boolean): Vtree.NodeContext;
    resolveTextNodeBreaker(nodeContext: Vtree.NodeContext): TextNodeBreaker;
    /**
     * Read ranges skipping special elements
     */
    getRangeBoxes(start: Node, end: Node): Vtree.ClientRect[];
    /**
     * Give block's initial and final nodes, find positions of the line bottoms.
     * This is, of course, somewhat hacky implementation.
     * @return position of line breaks
     */
    findLinePositions(checkPoints: Vtree.NodeContext[]): number[];
    calculateClonedPaddingBorder(nodeContext: Vtree.NodeContext): number;
    private getOffsetByRepetitiveElements;
    findBoxBreakPosition(bp: BoxBreakPosition, force: boolean): Vtree.NodeContext;
    getAfterEdgeOfBlockContainer(nodeContext: Vtree.NodeContext): number;
    findFirstOverflowingEdgeAndCheckPoint(checkPoints: Vtree.NodeContext[]): {
        edge: number;
        checkPoint: Vtree.NodeContext | null;
    };
    findEdgeBreakPosition(bp: BreakPosition.EdgeBreakPosition): Vtree.NodeContext;
    /**
     * Finalize a line break.
     * @return holing true
     */
    finishBreak(nodeContext: Vtree.NodeContext, forceRemoveSelf: boolean, endOfColumn: boolean): Task.Result<boolean>;
    findAcceptableBreakPosition(): BreakPositionAndNodeContext;
    doFinishBreak(nodeContext: Vtree.NodeContext, overflownNodeContext: Vtree.NodeContext, initialNodeContext: Vtree.NodeContext, initialComputedBlockSize: number): Task.Result<Vtree.NodeContext>;
    /**
     * Determines if a page break is acceptable at this position
     */
    isBreakable(flowPosition: Vtree.NodeContext): boolean;
    /**
     * Determines if an indent value is zero
     */
    zeroIndent(val: string | number): boolean;
    /**
     * @return true if overflows
     */
    checkOverflowAndSaveEdge(nodeContext: Vtree.NodeContext, trailingEdgeContexts: Vtree.NodeContext[]): boolean;
    /**
     * Save a possible page break position on a CSS block edge. Check if it
     * overflows.
     * @return true if overflows
     */
    checkOverflowAndSaveEdgeAndBreakPosition(nodeContext: Vtree.NodeContext, trailingEdgeContexts: Vtree.NodeContext[], saveEvenOverflown: boolean, breakAtTheEdge: string | null): boolean;
    applyClearance(nodeContext: Vtree.NodeContext): boolean;
    isBFC(formattingContext: Vtree.FormattingContext): boolean;
    /**
     * Skips positions until either the start of unbreakable block or inline
     * content. Also sets breakBefore on the result combining break-before and
     * break-after properties from all elements that meet at the edge.
     */
    skipEdges(nodeContext: Vtree.NodeContext, leadingEdge: boolean, forcedBreakValue: string | null): Task.Result<Vtree.NodeContext>;
    /**
     * Skips non-renderable positions until it hits the end of the flow or some
     * renderable content. Returns the nodeContext that was passed in if some
     * content remains and null if all content could be skipped.
     */
    skipTailEdges(nodeContext: Vtree.NodeContext): Task.Result<Vtree.NodeContext>;
    layoutFloatOrFootnote(nodeContext: Vtree.NodeContext): Task.Result<Vtree.NodeContext>;
    /**
     * Layout next portion of the source.
     */
    layoutNext(nodeContext: Vtree.NodeContext, leadingEdge: boolean, forcedBreakValue?: string | null): Task.Result<Vtree.NodeContext>;
    clearOverflownViewNodes(nodeContext: Vtree.NodeContext, removeSelf: boolean): void;
    initGeom(): void;
    init(): void;
    /**
     * Save the potential breaking position at the edge. Should, in general, save
     * "after" position but only after skipping all of the "before" ones and
     * getting to the non-empty content (to get breakAtEdge right).
     */
    saveEdgeBreakPosition(position: Vtree.NodeContext, breakAtEdge: string | null, overflows: boolean): void;
    /**
     * @param checkPoints array of breaking points for breakable block
     */
    saveBoxBreakPosition(checkPoints: Vtree.NodeContext[]): void;
    updateMaxReachedAfterEdge(afterEdge: number): void;
    /**
     * @param chunkPosition starting position.
     * @return holding end position.
     */
    layout(chunkPosition: Vtree.ChunkPosition, leadingEdge: boolean, breakAfter?: string | null): Task.Result<Vtree.ChunkPosition>;
    isFullWithPageFloats(): boolean;
    getMaxBlockSizeOfPageFloats(): number;
    doFinishBreakOfFragmentLayoutConstraints(nodeContext: Vtree.NodeContext): Task.Result<boolean>;
    /**
     * @param nodeContext starting position.
     * @return holding end position.
     */
    doLayout(nodeContext: Vtree.NodeContext, leadingEdge: boolean, breakAfter?: string | null): Task.Result<{
        nodeContext: Vtree.NodeContext;
        overflownNodeContext: Vtree.NodeContext;
    }>;
    /**
     * Re-layout already laid-out chunks. Return the position of the last flow if
     * there is an overflow.
     * TODO: deal with chunks that did not fit at all.
     * @return holding end position.
     */
    redoLayout(): Task.Result<Vtree.ChunkPosition>;
    saveDistanceToBlockEndFloats(): void;
    collectElementsOffset(): RepetitiveElement.ElementsOffset[];
}
/**
 * Represents a "pseudo"-column nested inside a real column.
 * This class is created to handle parallel fragmented flows (e.g. table columns
 * in a single table row). A pseudo-column behaves in the same way as the
 * original column, sharing its properties. Property changes on the
 * pseudo-column are not propagated to the original column. The LayoutContext of
 * the original column is also cloned and used by the pseudo-column, not to
 * propagate state changes of the LayoutContext caused by the pseudo-column.
 * @param column The original (parent) column
 * @param viewRoot Root element for the pseudo-column, i.e., the root of the
 *     fragmented flow.
 * @param parentNodeContext A NodeContext generating this PseudoColumn
 */
export declare class PseudoColumn {
    startNodeContexts: Vtree.NodeContext[];
    private column;
    constructor(column: Layout.Column, viewRoot: Element, parentNodeContext: Vtree.NodeContext);
    /**
     * @param chunkPosition starting position.
     * @return holding end position.
     */
    layout(chunkPosition: Vtree.ChunkPosition, leadingEdge: boolean): Task.Result<Vtree.ChunkPosition>;
    findAcceptableBreakPosition(allowBreakAtStartPosition: boolean): Layout.BreakPositionAndNodeContext;
    /**
     * @return holing true
     */
    finishBreak(nodeContext: Vtree.NodeContext, forceRemoveSelf: boolean, endOfColumn: boolean): Task.Result<boolean>;
    doFinishBreakOfFragmentLayoutConstraints(positionAfter: Vtree.NodeContext): void;
    isStartNodeContext(nodeContext: Vtree.NodeContext): boolean;
    isLastAfterNodeContext(nodeContext: Vtree.NodeContext): boolean;
    getColumnElement(): Element;
    getColumn(): Layout.Column;
}
export declare type SinglePageFloatLayoutResult = Layout.SinglePageFloatLayoutResult;
export declare function fixJustificationOnHyphen(nodeContext: Vtree.NodeContext, insertAfter: boolean, node: Node, insertionPoint: Node): void;
/**
 * breaking point resolver for Text Node.
 */
export declare class TextNodeBreaker implements Layout.TextNodeBreaker {
    breakTextNode(textNode: Text, nodeContext: Vtree.NodeContext, low: number, checkPoints: Vtree.NodeContext[], checkpointIndex: number, force: boolean): Vtree.NodeContext;
    breakAfterSoftHyphen(textNode: Text, text: string, viewIndex: number, nodeContext: Vtree.NodeContext): number;
    breakAfterOtherCharacter(textNode: Text, text: string, viewIndex: number, nodeContext: Vtree.NodeContext): number;
    updateNodeContext(nodeContext: Vtree.NodeContext, viewIndex: number, textNode: Text): Vtree.NodeContext;
    static instance: TextNodeBreaker;
}
export declare function resolveHyphenateCharacter(nodeContext: Vtree.NodeContext): string;
export declare class ColumnLayoutRetryer extends LayoutRetryers.AbstractLayoutRetryer {
    readonly leadingEdge: boolean;
    breakAfter: string | null;
    private initialPageBreakType;
    initialComputedBlockSize: number;
    private initialOverflown;
    context: {
        overflownNodeContext: Vtree.NodeContext;
    };
    constructor(leadingEdge: boolean, breakAfter?: string | null);
    resolveLayoutMode(nodeContext: Vtree.NodeContext): Layout.LayoutMode;
    prepareLayout(nodeContext: Vtree.NodeContext, column: Layout.Column): void;
    clearNodes(initialPosition: Vtree.NodeContext): void;
    saveState(nodeContext: Vtree.NodeContext, column: Layout.Column): void;
    restoreState(nodeContext: Vtree.NodeContext, column: Layout.Column): void;
}
export declare class DefaultLayoutMode implements Layout.LayoutMode {
    readonly leadingEdge: boolean;
    readonly breakAfter: string | null;
    readonly context: {
        overflownNodeContext: Vtree.NodeContext;
    };
    constructor(leadingEdge: boolean, breakAfter: string | null, context: {
        overflownNodeContext: Vtree.NodeContext;
    });
    /** @override */
    doLayout(nodeContext: Vtree.NodeContext, column: Layout.Column): Task.Result<Vtree.NodeContext>;
    /** @override */
    accept(nodeContext: Vtree.NodeContext, column: Layout.Column): boolean;
    /** @override */
    postLayout(positionAfter: Vtree.NodeContext, initialPosition: Vtree.NodeContext, column: Layout.Column, accepted: boolean): boolean;
}
export declare class PageFloatArea extends Column implements Layout.PageFloatArea {
    readonly floatSide: string;
    readonly parentContainer: Vtree.Container;
    private rootViewNodes;
    private floatMargins;
    adjustContentRelativeSize: boolean;
    constructor(floatSide: string, element: Element, layoutContext: Vtree.LayoutContext, clientLayout: Vtree.ClientLayout, layoutConstraint: LayoutConstraint, pageFloatLayoutContext: PageFloats.PageFloatLayoutContext, parentContainer: Vtree.Container);
    openAllViews(position: Vtree.NodePosition): Task.Result<Vtree.NodeContext>;
    convertPercentageSizesToPx(target: Element): void;
    fixFloatSizeAndPosition(nodeContext: Vtree.NodeContext): void;
    getContentInlineSize(): number;
}
