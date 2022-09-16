import * as Task from "./task";
import { Layout, Vtree } from "./types";
export declare type LayoutIteratorState = {
    nodeContext: Vtree.NodeContext;
    atUnforcedBreak: boolean;
    break: boolean;
    leadingEdge?: boolean;
    breakAtTheEdge?: string | null;
    onStartEdges?: boolean;
    leadingEdgeContexts?: Vtree.NodeContext[];
    lastAfterNodeContext?: Vtree.NodeContext | null;
};
export declare class LayoutIteratorStrategy {
    initialState(initialNodeContext: Vtree.NodeContext): LayoutIteratorState;
    startNonDisplayableNode(state: LayoutIteratorState): void | Task.Result<boolean>;
    afterNonDisplayableNode(state: LayoutIteratorState): void | Task.Result<boolean>;
    startIgnoredTextNode(state: LayoutIteratorState): void | Task.Result<boolean>;
    afterIgnoredTextNode(state: LayoutIteratorState): void | Task.Result<boolean>;
    startNonElementNode(state: LayoutIteratorState): void | Task.Result<boolean>;
    afterNonElementNode(state: LayoutIteratorState): void | Task.Result<boolean>;
    startInlineElementNode(state: LayoutIteratorState): void | Task.Result<boolean>;
    afterInlineElementNode(state: LayoutIteratorState): void | Task.Result<boolean>;
    startNonInlineElementNode(state: LayoutIteratorState): void | Task.Result<boolean>;
    afterNonInlineElementNode(state: LayoutIteratorState): void | Task.Result<boolean>;
    finish(state: LayoutIteratorState): void | Task.Result<boolean>;
}
export declare class LayoutIterator {
    private readonly strategy;
    private readonly layoutContext;
    constructor(strategy: LayoutIteratorStrategy, layoutContext: Vtree.LayoutContext);
    iterate(initialNodeContext: Vtree.NodeContext): Task.Result<Vtree.NodeContext>;
}
export declare class EdgeSkipper extends LayoutIteratorStrategy {
    protected readonly leadingEdge?: boolean;
    constructor(leadingEdge?: boolean);
    startNonInlineBox(state: LayoutIteratorState): void | Task.Result<boolean>;
    endEmptyNonInlineBox(state: LayoutIteratorState): void | Task.Result<boolean>;
    endNonInlineBox(state: LayoutIteratorState): void | Task.Result<boolean>;
    initialState(initialNodeContext: Vtree.NodeContext): LayoutIteratorState;
    /**
     * @return Returns true if a forced break occurs.
     */
    processForcedBreak(state: LayoutIteratorState, column: Layout.Column): boolean;
    /**
     * @return Returns true if the node overflows the column.
     */
    saveEdgeAndProcessOverflow(state: LayoutIteratorState, column: Layout.Column): boolean;
    /**
     * @returns Returns true if the layout constraint is violated.
     */
    processLayoutConstraint(state: LayoutIteratorState, layoutConstraint: Layout.LayoutConstraint, column: Layout.Column): boolean;
    startNonElementNode(state: LayoutIteratorState): void | Task.Result<boolean>;
    startNonInlineElementNode(state: LayoutIteratorState): void | Task.Result<boolean>;
    afterNonInlineElementNode(state: LayoutIteratorState): void | Task.Result<boolean>;
}
