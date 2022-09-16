import * as Task from "./task";
import { Layout, Vtree } from "./types";
/**
 * @abstract
 */
export declare abstract class AbstractLayoutRetryer {
    initialBreakPositions: Layout.BreakPosition[];
    initialStateOfFormattingContext: Vtree.NodeContext;
    initialPosition: Vtree.NodeContext;
    initialFragmentLayoutConstraints: Layout.FragmentLayoutConstraint[];
    layout(nodeContext: Vtree.NodeContext, column: Layout.Column): Task.Result<Vtree.NodeContext>;
    private tryLayout;
    /**
     * @abstract
     */
    abstract resolveLayoutMode(nodeContext: Vtree.NodeContext): Layout.LayoutMode;
    prepareLayout(nodeContext: Vtree.NodeContext, column: Layout.Column): void;
    clearNodes(initialPosition: Vtree.NodeContext): void;
    saveState(nodeContext: Vtree.NodeContext, column: Layout.Column): void;
    restoreState(nodeContext: Vtree.NodeContext, column: Layout.Column): void;
}
