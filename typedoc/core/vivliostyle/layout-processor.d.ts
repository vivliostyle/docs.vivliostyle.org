import * as Task from "./task";
import { FormattingContextType, Layout, LayoutProcessor, Vtree } from "./types";
/**
 * Processor doing some special layout (e.g. table layout)
 */
export interface LayoutProcessor {
    /**
     * Do actual layout in the column starting from given NodeContext.
     */
    layout(nodeContext: Vtree.NodeContext, column: Layout.Column, leadingEdge: boolean): Task.Result<Vtree.NodeContext>;
    /**
     * Potential edge breaking position.
     */
    createEdgeBreakPosition(position: Vtree.NodeContext, breakOnEdge: string | null, overflows: boolean, columnBlockSize: number): Layout.BreakPosition;
    /**
     * process nodecontext at the start of a non inline element.
     * @return return true if you skip the subsequent nodes
     */
    startNonInlineElementNode(nodeContext: Vtree.NodeContext): boolean;
    /**
     * process nodecontext after a non inline element.
     * @return return true if you skip the subsequent nodes
     */
    afterNonInlineElementNode(nodeContext: Vtree.NodeContext, stopAtOverflow: boolean): boolean;
    /**
     * @return holing true
     */
    finishBreak(column: Layout.Column, nodeContext: Vtree.NodeContext, forceRemoveSelf: boolean, endOfColumn: boolean): Task.Result<boolean>;
    clearOverflownViewNodes(column: Layout.Column, parentNodeContext: Vtree.NodeContext, nodeContext: Vtree.NodeContext, removeSelf: boolean): any;
}
/**
 * Resolver finding an appropriate LayoutProcessor given a formatting context
 */
export declare class LayoutProcessorResolver {
    /**
     * Find LayoutProcessor corresponding to given formatting context.
     */
    find(formattingContext: Vtree.FormattingContext): LayoutProcessor;
}
export declare class BlockLayoutProcessor implements LayoutProcessor {
    /** @override */
    layout(nodeContext: Vtree.NodeContext, column: Layout.Column, leadingEdge: boolean): Task.Result<Vtree.NodeContext>;
    /** @override */
    createEdgeBreakPosition(position: Vtree.NodeContext, breakOnEdge: string | null, overflows: boolean, columnBlockSize: number): Layout.BreakPosition;
    /** @override */
    startNonInlineElementNode(nodeContext: Vtree.NodeContext): boolean;
    /** @override */
    afterNonInlineElementNode(nodeContext: Vtree.NodeContext, stopAtOverflow: boolean): boolean;
    /** @override */
    clearOverflownViewNodes(column: Layout.Column, parentNodeContext: Vtree.NodeContext, nodeContext: Vtree.NodeContext, removeSelf: boolean): void;
    /**
     * @return holing true
     * @override
     */
    finishBreak(column: Layout.Column, nodeContext: Vtree.NodeContext, forceRemoveSelf: boolean, endOfColumn: boolean): Task.Result<boolean>;
}
export declare class BlockFormattingContext implements LayoutProcessor.BlockFormattingContext {
    private readonly parent;
    formattingContextType: FormattingContextType;
    constructor(parent: Vtree.FormattingContext);
    /** @override */
    getName(): string;
    /** @override */
    isFirstTime(nodeContext: Vtree.NodeContext, firstTime: boolean): boolean;
    /** @override */
    getParent(): Vtree.FormattingContext;
    /** @override */
    saveState(): any;
    /** @override */
    restoreState(state: any): void;
}
export declare const blockLayoutProcessor: BlockLayoutProcessor;
export declare const isInstanceOfBlockFormattingContext: typeof LayoutProcessor.isInstanceOfBlockFormattingContext;
