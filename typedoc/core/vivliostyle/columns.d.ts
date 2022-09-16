import * as Css from "./css";
import * as PageFloats from "./page-floats";
import * as Task from "./task";
import * as Vtree from "./vtree";
import { Layout } from "./types";
export declare type ColumnLayoutResult = {
    columns: Layout.Column[];
    position: Vtree.LayoutPosition;
    columnPageFloatLayoutContexts?: PageFloats.PageFloatLayoutContext[];
};
export declare type ColumnGenerator = () => Task.Result<ColumnLayoutResult | null>;
export declare class ColumnBalancingTrialResult {
    readonly layoutResult: ColumnLayoutResult;
    readonly penalty: number;
    constructor(layoutResult: ColumnLayoutResult, penalty: number);
}
export declare abstract class ColumnBalancer {
    readonly layoutContainer: Vtree.Container;
    readonly columnGenerator: ColumnGenerator;
    readonly regionPageFloatLayoutContext: PageFloats.PageFloatLayoutContext;
    originalContainerBlockSize: number;
    constructor(layoutContainer: Vtree.Container, columnGenerator: ColumnGenerator, regionPageFloatLayoutContext: PageFloats.PageFloatLayoutContext);
    balanceColumns(layoutResult: ColumnLayoutResult): Task.Result<ColumnLayoutResult>;
    private createTrialResult;
    protected preBalance(layoutResult: ColumnLayoutResult): void;
    protected abstract calculatePenalty(layoutResult: ColumnLayoutResult): number;
    protected abstract hasNextCandidate(candidates: ColumnBalancingTrialResult[]): boolean;
    protected abstract updateCondition(candidates: ColumnBalancingTrialResult[]): void;
    protected postBalance(): void;
    savePageFloatLayoutContexts(layoutResult: ColumnLayoutResult | null): void;
    private restoreContents;
}
export declare function canReduceContainerSize(candidates: ColumnBalancingTrialResult[]): boolean;
export declare function reduceContainerSize(candidates: ColumnBalancingTrialResult[], container: Vtree.Container): void;
export declare class BalanceLastColumnBalancer extends ColumnBalancer {
    readonly columnCount: number;
    originalPosition: Vtree.LayoutPosition | null;
    foundUpperBound: boolean;
    constructor(columnGenerator: ColumnGenerator, regionPageFloatLayoutContext: any, layoutContainer: Vtree.Container, columnCount: number);
    preBalance(layoutResult: ColumnLayoutResult): void;
    private checkPosition;
    calculatePenalty(layoutResult: ColumnLayoutResult): number;
    hasNextCandidate(candidates: ColumnBalancingTrialResult[]): boolean;
    updateCondition(candidates: ColumnBalancingTrialResult[]): void;
}
export declare class BalanceNonLastColumnBalancer extends ColumnBalancer {
    constructor(columnGenerator: ColumnGenerator, regionPageFloatLayoutContext: any, layoutContainer: Vtree.Container);
    calculatePenalty(layoutResult: ColumnLayoutResult): number;
    hasNextCandidate(candidates: ColumnBalancingTrialResult[]): boolean;
    updateCondition(candidates: ColumnBalancingTrialResult[]): void;
}
export declare function createColumnBalancer(columnCount: number, columnFill: Css.Ident, columnGenerator: ColumnGenerator, regionPageFloatLayoutContext: PageFloats.PageFloatLayoutContext, layoutContainer: Vtree.Container, columns: Layout.Column[], flowPosition: Vtree.FlowPosition): ColumnBalancer | null;
