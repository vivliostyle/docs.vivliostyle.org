import { Layout, RepetitiveElement, Vtree } from "./types";
/**
 * Potential breaking position.
 */
export declare type BreakPosition = Layout.BreakPosition;
export declare abstract class AbstractBreakPosition implements Layout.AbstractBreakPosition {
    abstract findAcceptableBreak(column: Layout.Column, penalty: number): Vtree.NodeContext;
    abstract getMinBreakPenalty(): number;
    calculateOffset(column: any): {
        current: number;
        minimum: number;
    };
    /** @override */
    breakPositionChosen(column: Layout.Column): void;
    getNodeContext(): Vtree.NodeContext;
}
export declare function calculateOffset(nodeContext: Vtree.NodeContext, elementsOffsets: RepetitiveElement.ElementsOffset[]): {
    current: number;
    minimum: number;
};
/**
 * Potential edge breaking position.
 */
export declare class EdgeBreakPosition extends AbstractBreakPosition implements Layout.EdgeBreakPosition {
    readonly position: Vtree.NodeContext;
    readonly breakOnEdge: string | null;
    overflows: boolean;
    readonly computedBlockSize: number;
    overflowIfRepetitiveElementsDropped: boolean;
    protected isEdgeUpdated: boolean;
    private edge;
    constructor(position: Vtree.NodeContext, breakOnEdge: string | null, overflows: boolean, computedBlockSize: number);
    findAcceptableBreak(column: Layout.Column, penalty: number): Vtree.NodeContext;
    getMinBreakPenalty(): number;
    private updateEdge;
    private updateOverflows;
    getNodeContext(): Vtree.NodeContext;
    private isFirstContentOfRepetitiveElementsOwner;
}
