import * as LayoutProcessor from "./layout-processor";
import * as LayoutRetryers from "./layout-retryers";
import * as LayoutUtil from "./layout-util";
import * as Task from "./task";
import { FormattingContextType, FragmentLayoutConstraintType, Layout as LayoutType, RepetitiveElement, Vtree } from "./types";
export declare class RepetitiveElementsOwnerFormattingContext implements RepetitiveElement.RepetitiveElementsOwnerFormattingContext {
    readonly parent: Vtree.FormattingContext;
    readonly rootSourceNode: Element;
    formattingContextType: FormattingContextType;
    isRoot: boolean;
    repetitiveElements: RepetitiveElement.RepetitiveElements;
    constructor(parent: Vtree.FormattingContext, rootSourceNode: Element);
    /** @override */
    getName(): string;
    /** @override */
    isFirstTime(nodeContext: Vtree.NodeContext, firstTime: boolean): boolean;
    /** @override */
    getParent(): Vtree.FormattingContext;
    getRepetitiveElements(): RepetitiveElement.RepetitiveElements;
    getRootViewNode(position: Vtree.NodeContext): Element | null;
    getRootNodeContext(nodeContext: Vtree.NodeContext): Vtree.NodeContext | null;
    initializeRepetitiveElements(vertical: boolean): void;
    /** @override */
    saveState(): any;
    /** @override */
    restoreState(state: any): void;
}
export declare type ElementsOffset = RepetitiveElement.ElementsOffset;
export declare class RepetitiveElements implements RepetitiveElement.RepetitiveElements {
    private readonly vertical;
    ownerSourceNode: Element;
    private headerSourceNode;
    private footerSourceNode;
    private headerViewNode;
    private footerViewNode;
    private headerNodePosition;
    private footerNodePosition;
    private headerHeight;
    private footerHeight;
    isSkipHeader: boolean;
    isSkipFooter: boolean;
    enableSkippingFooter: boolean;
    enableSkippingHeader: boolean;
    doneInitialLayout: boolean;
    firstContentSourceNode: Element | null;
    lastContentSourceNode: Element | null;
    private affectedNodeCache;
    private afterLastContentNodeCache;
    allowInsert: boolean;
    allowInsertRepeatitiveElements: boolean;
    constructor(vertical: boolean, ownerSourceNode: Element);
    setHeaderNodeContext(nodeContext: Vtree.NodeContext): void;
    setFooterNodeContext(nodeContext: Vtree.NodeContext): void;
    updateHeight(column: LayoutType.Column): void;
    prepareLayoutFragment(): void;
    appendHeaderToFragment(rootNodeContext: Vtree.NodeContext, firstChild: Node | null, column: LayoutType.Column): Task.Result<boolean>;
    appendFooterToFragment(rootNodeContext: Vtree.NodeContext, firstChild: Node | null, column: LayoutType.Column): Task.Result<boolean>;
    appendElementToFragment(nodePosition: Vtree.NodePosition, rootNodeContext: Vtree.NodeContext, firstChild: Node | null, column: LayoutType.Column): Task.Result<boolean>;
    moveChildren(from: Element, to: Element, firstChild: Node | null): void;
    /** @override */
    calculateOffset(nodeContext: Vtree.NodeContext): number;
    /** @override */
    calculateMinimumOffset(nodeContext: Vtree.NodeContext): number;
    isAfterLastContent(nodeContext: Vtree.NodeContext): boolean;
    private affectTo;
    private findResultFromCache;
    private isAfterNodeContextOf;
    isFirstContentNode(nodeContext: Vtree.NodeContext): boolean;
    isEnableToUpdateState(): boolean;
    updateState(): void;
    preventSkippingHeader(): void;
    preventSkippingFooter(): void;
    isHeaderRegistered(): boolean;
    isFooterRegistered(): boolean;
    isHeaderSourceNode(node: Node): boolean;
    isFooterSourceNode(node: Node): boolean;
}
/**
 * @abstract
 */
export declare abstract class LayoutEntireBlock implements LayoutType.LayoutMode {
    formattingContext: RepetitiveElement.RepetitiveElementsOwnerFormattingContext;
    constructor(formattingContext: RepetitiveElement.RepetitiveElementsOwnerFormattingContext);
    /** @override */
    abstract doLayout(nodeContext: Vtree.NodeContext, column: LayoutType.Column): Task.Result<Vtree.NodeContext>;
    /** @override */
    accept(nodeContext: Vtree.NodeContext, column: LayoutType.Column): boolean;
    /** @override */
    postLayout(positionAfter: Vtree.NodeContext, initialPosition: Vtree.NodeContext, column: LayoutType.Column, accepted: boolean): boolean;
}
/**
 * @abstract
 */
export declare abstract class LayoutFragmentedBlock implements LayoutType.LayoutMode {
    formattingContext: RepetitiveElement.RepetitiveElementsOwnerFormattingContext;
    constructor(formattingContext: RepetitiveElement.RepetitiveElementsOwnerFormattingContext);
    /** @override */
    abstract doLayout(nodeContext: Vtree.NodeContext, column: LayoutType.Column): Task.Result<Vtree.NodeContext>;
    /** @override */
    accept(nodeContext: Vtree.NodeContext, column: LayoutType.Column): boolean;
    /** @override */
    postLayout(positionAfter: Vtree.NodeContext, initialPosition: Vtree.NodeContext, column: LayoutType.Column, accepted: boolean): boolean;
}
export declare class LayoutEntireOwnerBlock extends LayoutEntireBlock {
    readonly processor: RepetitiveElementsOwnerLayoutProcessor;
    constructor(formattingContext: RepetitiveElement.RepetitiveElementsOwnerFormattingContext, processor: RepetitiveElementsOwnerLayoutProcessor);
    doLayout(nodeContext: Vtree.NodeContext, column: LayoutType.Column): Task.Result<Vtree.NodeContext>;
    accept(nodeContext: Vtree.NodeContext, column: LayoutType.Column): boolean;
}
export declare class LayoutFragmentedOwnerBlock extends LayoutFragmentedBlock {
    readonly processor: RepetitiveElementsOwnerLayoutProcessor;
    constructor(formattingContext: RepetitiveElement.RepetitiveElementsOwnerFormattingContext, processor: RepetitiveElementsOwnerLayoutProcessor);
    doLayout(nodeContext: Vtree.NodeContext, column: LayoutType.Column): Task.Result<Vtree.NodeContext>;
}
export declare class RepetitiveElementsOwnerLayoutConstraint implements RepetitiveElement.RepetitiveElementsOwnerLayoutConstraint {
    flagmentLayoutConstraintType: FragmentLayoutConstraintType;
    nodeContext: Vtree.NodeContext;
    constructor(nodeContext: Vtree.NodeContext);
    /** @override */
    allowLayout(nodeContext: Vtree.NodeContext, overflownNodeContext: Vtree.NodeContext, column: LayoutType.Column): boolean;
    /** @override */
    nextCandidate(nodeContext: Vtree.NodeContext): boolean;
    /** @override */
    postLayout(allowed: boolean, positionAfter: Vtree.NodeContext, initialPosition: Vtree.NodeContext, column: LayoutType.Column): void;
    /** @override */
    finishBreak(nodeContext: Vtree.NodeContext, column: LayoutType.Column): Task.Result<boolean>;
    getRepetitiveElements(): RepetitiveElement.RepetitiveElements;
    /** @override */
    equalsTo(constraint: LayoutType.FragmentLayoutConstraint): boolean;
    /** @override */
    getPriorityOfFinishBreak(): number;
}
export declare class RepetitiveElementsOwnerLayoutRetryer extends LayoutRetryers.AbstractLayoutRetryer {
    readonly formattingContext: RepetitiveElement.RepetitiveElementsOwnerFormattingContext;
    private readonly processor;
    constructor(formattingContext: RepetitiveElement.RepetitiveElementsOwnerFormattingContext, processor: RepetitiveElementsOwnerLayoutProcessor);
    resolveLayoutMode(nodeContext: Vtree.NodeContext): LayoutType.LayoutMode;
}
export declare class EntireBlockLayoutStrategy extends LayoutUtil.EdgeSkipper {
    readonly formattingContext: RepetitiveElement.RepetitiveElementsOwnerFormattingContext;
    readonly column: LayoutType.Column;
    constructor(formattingContext: RepetitiveElement.RepetitiveElementsOwnerFormattingContext, column: LayoutType.Column);
    startNonInlineElementNode(state: LayoutUtil.LayoutIteratorState): void | Task.Result<boolean>;
    afterNonInlineElementNode(state: LayoutUtil.LayoutIteratorState): void | Task.Result<boolean>;
}
export declare class FragmentedBlockLayoutStrategy extends LayoutUtil.EdgeSkipper {
    readonly formattingContext: RepetitiveElementsOwnerFormattingContext;
    readonly column: LayoutType.Column;
    constructor(formattingContext: RepetitiveElementsOwnerFormattingContext, column: LayoutType.Column);
}
export declare class RepetitiveElementsOwnerLayoutProcessor extends LayoutProcessor.BlockLayoutProcessor implements LayoutProcessor.LayoutProcessor {
    layout(nodeContext: Vtree.NodeContext, column: LayoutType.Column, leadingEdge: boolean): Task.Result<Vtree.NodeContext>;
    startNonInlineElementNode(nodeContext: Vtree.NodeContext): boolean;
    doInitialLayout(nodeContext: Vtree.NodeContext, column: LayoutType.Column): Task.Result<Vtree.NodeContext>;
    private layoutEntireBlock;
    doLayout(nodeContext: Vtree.NodeContext, column: LayoutType.Column): Task.Result<Vtree.NodeContext>;
    finishBreak(column: LayoutType.Column, nodeContext: Vtree.NodeContext, forceRemoveSelf: boolean, endOfColumn: boolean): Task.Result<boolean> | null;
    clearOverflownViewNodes(column: LayoutType.Column, parentNodeContext: Vtree.NodeContext, nodeContext: Vtree.NodeContext, removeSelf: boolean): void;
}
export declare function appendHeaderToAncestors(nodeContext: Vtree.NodeContext, column: LayoutType.Column): void;
export declare function appendHeader(formattingContext: RepetitiveElement.RepetitiveElementsOwnerFormattingContext, nodeContext: Vtree.NodeContext, column: LayoutType.Column): Task.Result<boolean>;
export declare function appendFooter(formattingContext: RepetitiveElement.RepetitiveElementsOwnerFormattingContext, nodeContext: Vtree.NodeContext, column: LayoutType.Column): Task.Result<boolean>;
