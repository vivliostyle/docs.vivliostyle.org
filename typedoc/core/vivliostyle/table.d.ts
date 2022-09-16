import * as BreakPosition from "./break-position";
import * as LayoutProcessor from "./layout-processor";
import * as LayoutRetryers from "./layout-retryers";
import * as LayoutUtil from "./layout-util";
import * as RepetitiveElementImpl from "./repetitive-element";
import * as Task from "./task";
import * as Layout from "./layout";
import { FormattingContextType, FragmentLayoutConstraintType, Layout as LayoutType, RepetitiveElement, Table, Vtree } from "./types";
export declare class TableRow {
    readonly rowIndex: number;
    readonly sourceNode: Node;
    cells: TableCell[];
    constructor(rowIndex: number, sourceNode: Node);
    addCell(cell: TableCell): void;
    getMinimumHeight(): number;
}
export declare class TableCell {
    readonly rowIndex: number;
    readonly columnIndex: number;
    viewElement: Element | null;
    colSpan: number;
    rowSpan: number;
    height: number;
    anchorSlot: TableSlot;
    constructor(rowIndex: number, columnIndex: number, viewElement: Element);
    setHeight(height: number): void;
    setAnchorSlot(slot: TableSlot): void;
}
export declare class TableSlot {
    readonly rowIndex: number;
    readonly columnIndex: number;
    readonly cell: TableCell;
    constructor(rowIndex: number, columnIndex: number, cell: TableCell);
}
export declare class TableCellFragment {
    readonly column: Layout.Column;
    readonly cellNodeContext: Vtree.NodeContext;
    pseudoColumn: Layout.PseudoColumn;
    empty: boolean;
    constructor(column: Layout.Column, pseudoColumnContainer: Element, cellNodeContext: Vtree.NodeContext);
    findAcceptableBreakPosition(): Layout.BreakPositionAndNodeContext;
}
export declare class TableCaptionView {
    readonly viewNode: Element;
    readonly side: string;
    constructor(viewNode: Element, side: string);
}
export declare class BetweenTableRowBreakPosition extends BreakPosition.EdgeBreakPosition {
    private formattingContext;
    acceptableCellBreakPositions: Layout.BreakPositionAndNodeContext[];
    private rowIndex;
    constructor(position: Vtree.NodeContext, breakOnEdge: string | null, overflows: boolean, columnBlockSize: number);
    findAcceptableBreak(column: Layout.Column, penalty: number): Vtree.NodeContext;
    getMinBreakPenalty(): number;
    getAcceptableCellBreakPositions(): Layout.BreakPositionAndNodeContext[];
    private getRowIndex;
    private getCellFragments;
}
export declare class InsideTableRowBreakPosition extends BreakPosition.AbstractBreakPosition {
    readonly rowIndex: number;
    readonly beforeNodeContext: Vtree.NodeContext;
    readonly formattingContext: TableFormattingContext;
    acceptableCellBreakPositions: Layout.BreakPositionAndNodeContext[];
    constructor(rowIndex: number, beforeNodeContext: Vtree.NodeContext, formattingContext: TableFormattingContext);
    findAcceptableBreak(column: Layout.Column, penalty: number): Vtree.NodeContext;
    getMinBreakPenalty(): number;
    getAcceptableCellBreakPositions(): Layout.BreakPositionAndNodeContext[];
    private getCellFragments;
}
export declare type BrokenTableCellPosition = {
    cellNodePosition: Vtree.NodePosition;
    breakChunkPosition: Vtree.ChunkPosition;
    cell: TableCell;
};
/**
 * @param tableSourceNode Source node of the table
 */
export declare class TableFormattingContext extends RepetitiveElementImpl.RepetitiveElementsOwnerFormattingContext implements Table.TableFormattingContext {
    readonly tableSourceNode: Element;
    formattingContextType: FormattingContextType;
    vertical: boolean;
    columnCount: number;
    tableWidth: number;
    captions: TableCaptionView[];
    colGroups: DocumentFragment | null;
    colWidths: number[] | null;
    inlineBorderSpacing: number;
    rows: TableRow[];
    slots: TableSlot[][];
    cellFragments: TableCellFragment[][];
    lastRowViewNode: Element | null;
    cellBreakPositions: BrokenTableCellPosition[];
    repetitiveElements: RepetitiveElement.RepetitiveElements | null;
    constructor(parent: Vtree.FormattingContext, tableSourceNode: Element);
    getName(): string;
    isFirstTime(nodeContext: Vtree.NodeContext, firstTime: boolean): boolean;
    getParent(): Vtree.FormattingContext;
    finishFragment(): void;
    addRow(rowIndex: number, row: TableRow): void;
    getRowSlots(rowIndex: number): TableSlot[];
    addCell(rowIndex: number, cell: TableCell): void;
    getRowByIndex(index: number): TableRow;
    findRowIndexBySourceNode(sourceNode: Node): number;
    addCellFragment(rowIndex: number, columnIndex: number, cellFragment: TableCellFragment): void;
    getCellsFallingOnRow(rowIndex: number): TableCell[];
    getRowSpanningCellsOverflowingTheRow(rowIndex: number): TableCell[];
    getCellFragmentOfCell(cell: TableCell): TableCellFragment;
    isFreelyFragmentableRow(row: TableRow): boolean;
    getColumnCount(): number;
    updateCellSizes(clientLayout: Vtree.ClientLayout): void;
    /**
     * @return position
     */
    findCellFromColumn(column: Layout.Column): {
        rowIndex: number;
        columnIndex: number;
    } | null;
    collectElementsOffsetOfUpperCells(position: {
        rowIndex: number;
        columnIndex: number;
    } | null): RepetitiveElement.ElementsOffset[];
    collectElementsOffsetOfHighestColumn(): RepetitiveElement.ElementsOffset[];
    private collectElementsOffsetFromColumn;
    saveState(): any;
    restoreState(state: any): void;
}
export declare class ElementsOffsetOfTableCell implements RepetitiveElement.ElementsOffset {
    readonly repeatitiveElementsInColumns: RepetitiveElement.ElementsOffset[][];
    constructor(repeatitiveElementsInColumns: RepetitiveElement.ElementsOffset[][]);
    /** @override */
    calculateOffset(nodeContext: Vtree.NodeContext): number;
    /** @override */
    calculateMinimumOffset(nodeContext: Vtree.NodeContext): number;
    private calculateMaxOffsetOfColumn;
}
export declare class EntireTableLayoutStrategy extends LayoutUtil.EdgeSkipper {
    readonly formattingContext: TableFormattingContext;
    readonly column: Layout.Column;
    rowIndex: number;
    columnIndex: number;
    inRow: boolean;
    checkPoints: Vtree.NodeContext[];
    inHeaderOrFooter: boolean;
    constructor(formattingContext: TableFormattingContext, column: Layout.Column);
    startNonInlineElementNode(state: LayoutUtil.LayoutIteratorState): void | Task.Result<boolean>;
    afterNonInlineElementNode(state: LayoutUtil.LayoutIteratorState): void | Task.Result<boolean>;
    startNonElementNode(state: LayoutUtil.LayoutIteratorState): void | Task.Result<boolean>;
    afterNonElementNode(state: LayoutUtil.LayoutIteratorState): void | Task.Result<boolean>;
    startInlineElementNode(state: LayoutUtil.LayoutIteratorState): void | Task.Result<boolean>;
    afterInlineElementNode(state: LayoutUtil.LayoutIteratorState): void | Task.Result<boolean>;
    registerCheckPoint(state: LayoutUtil.LayoutIteratorState): void;
    postLayoutBlockContents(state: LayoutUtil.LayoutIteratorState): void;
}
export declare class TableLayoutStrategy extends LayoutUtil.EdgeSkipper {
    readonly formattingContext: TableFormattingContext;
    readonly column: Layout.Column;
    private static ignoreList;
    inRow: boolean;
    currentRowIndex: number;
    currentColumnIndex: number;
    originalStopAtOverflow: boolean;
    inHeader: boolean;
    inFooter: boolean;
    constructor(formattingContext: TableFormattingContext, column: Layout.Column);
    resetColumn(): void;
    getColSpanningCellWidth(cell: TableCell): number;
    layoutCell(cell: TableCell, cellNodeContext: Vtree.NodeContext, startChunkPosition: Vtree.ChunkPosition): Task.Result<boolean>;
    hasBrokenCellAtSlot(slotIndex: any): boolean;
    private extractRowSpanningCellBreakPositions;
    layoutRowSpanningCellsFromPreviousFragment(state: LayoutUtil.LayoutIteratorState): Task.Result<boolean>;
    startTableRow(state: LayoutUtil.LayoutIteratorState): Task.Result<boolean>;
    private registerCellFragmentIndex;
    startTableCell(state: LayoutUtil.LayoutIteratorState): Task.Result<boolean>;
    startNonInlineBox(state: LayoutUtil.LayoutIteratorState): Task.Result<boolean>;
    endNonInlineBox(state: LayoutUtil.LayoutIteratorState): Task.Result<boolean>;
    afterNonInlineElementNode(state: LayoutUtil.LayoutIteratorState): void | Task.Result<boolean>;
}
export declare class TableLayoutProcessor implements LayoutProcessor.LayoutProcessor {
    private layoutEntireTable;
    private getColumnWidths;
    private getColGroupElements;
    private normalizeAndGetColElements;
    private addMissingColElements;
    /**
     * Measure width of columns and normalize colgroup and col elements so that
     * each column has a corresponding col element with the width specified.
     */
    normalizeColGroups(formattingContext: TableFormattingContext, tableElement: Element, column: Layout.Column): void;
    doInitialLayout(nodeContext: Vtree.NodeContext, column: Layout.Column): Task.Result<Vtree.NodeContext>;
    addCaptions(formattingContext: TableFormattingContext, rootViewNode: Element, firstChild: Node | null): void;
    addColGroups(formattingContext: TableFormattingContext, rootViewNode: Element, firstChild: Node | null): void;
    removeColGroups(formattingContext: TableFormattingContext, rootViewNode: Element): void;
    doLayout(nodeContext: Vtree.NodeContext, column: Layout.Column): Task.Result<Vtree.NodeContext>;
    /** @override */
    layout(nodeContext: Vtree.NodeContext, column: Layout.Column, leadingEdge: boolean): Task.Result<Vtree.NodeContext>;
    /** @override */
    createEdgeBreakPosition(position: Vtree.NodeContext, breakOnEdge: string | null, overflows: boolean, columnBlockSize: number): LayoutType.BreakPosition;
    /** @override */
    startNonInlineElementNode(nodeContext: Vtree.NodeContext): boolean;
    /** @override */
    afterNonInlineElementNode(nodeContext: Vtree.NodeContext, stopAtOverflow: boolean): boolean;
    /** @override */
    finishBreak(column: Layout.Column, nodeContext: Vtree.NodeContext, forceRemoveSelf: boolean, endOfColumn: boolean): Task.Result<boolean>;
    /** @override */
    clearOverflownViewNodes(column: Layout.Column, parentNodeContext: Vtree.NodeContext, nodeContext: Vtree.NodeContext, removeSelf: boolean): void;
}
export declare class LayoutRetryer extends LayoutRetryers.AbstractLayoutRetryer {
    private tableFormattingContext;
    private readonly processor;
    constructor(tableFormattingContext: TableFormattingContext, processor: TableLayoutProcessor);
    resolveLayoutMode(nodeContext: Vtree.NodeContext): LayoutType.LayoutMode;
    clearNodes(initialPosition: Vtree.NodeContext): void;
    restoreState(nodeContext: Vtree.NodeContext, column: Layout.Column): void;
}
export declare class LayoutEntireTable extends RepetitiveElementImpl.LayoutEntireBlock {
    readonly processor: TableLayoutProcessor;
    constructor(formattingContext: TableFormattingContext, processor: TableLayoutProcessor);
    doLayout(nodeContext: Vtree.NodeContext, column: Layout.Column): Task.Result<Vtree.NodeContext>;
}
export declare class EntireTableBreakPosition extends BreakPosition.EdgeBreakPosition {
    constructor(tableNodeContext: Vtree.NodeContext);
    getMinBreakPenalty(): number;
    breakPositionChosen(column: Layout.Column): void;
}
export declare class EntireTableLayoutConstraint implements Layout.FragmentLayoutConstraint {
    tableRootNode: Node;
    flagmentLayoutConstraintType: FragmentLayoutConstraintType;
    constructor(tableRootNode: Node);
    /** @override */
    allowLayout(nodeContext: Vtree.NodeContext, overflownNodeContext: Vtree.NodeContext, column: Layout.Column): boolean;
    /** @override */
    nextCandidate(nodeContext: Vtree.NodeContext): boolean;
    /** @override */
    postLayout(allowed: boolean, positionAfter: Vtree.NodeContext, initialPosition: Vtree.NodeContext, column: Layout.Column): void;
    /** @override */
    finishBreak(nodeContext: Vtree.NodeContext, column: Layout.Column): Task.Result<boolean>;
    /** @override */
    equalsTo(constraint: Layout.FragmentLayoutConstraint): boolean;
    /** @override */
    getPriorityOfFinishBreak(): number;
}
export declare class LayoutFragmentedTable extends RepetitiveElementImpl.LayoutFragmentedBlock {
    readonly processor: TableLayoutProcessor;
    constructor(formattingContext: TableFormattingContext, processor: TableLayoutProcessor);
    doLayout(nodeContext: Vtree.NodeContext, column: Layout.Column): Task.Result<Vtree.NodeContext>;
}
export declare class TableRowLayoutConstraint extends RepetitiveElementImpl.RepetitiveElementsOwnerLayoutConstraint implements Table.TableRowLayoutConstraint {
    flagmentLayoutConstraintType: FragmentLayoutConstraintType;
    cellFragmentLayoutConstraints: {
        constraints: Layout.FragmentLayoutConstraint[];
        breakPosition: Vtree.NodeContext;
    }[];
    constructor(nodeContext: Vtree.NodeContext);
    allowLayout(nodeContext: Vtree.NodeContext, overflownNodeContext: Vtree.NodeContext, column: Layout.Column): boolean;
    nextCandidate(nodeContext: Vtree.NodeContext): boolean;
    postLayout(allowed: boolean, positionAfter: Vtree.NodeContext, initialPosition: Vtree.NodeContext, column: Layout.Column): void;
    finishBreak(nodeContext: Vtree.NodeContext, column: Layout.Column): Task.Result<boolean>;
    removeDummyRowNodes(nodeContext: Vtree.NodeContext): void;
    private collectCellFragmentLayoutConstraints;
    private getCellFragemnts;
    getElementsOffsetsForTableCell(column: Layout.Column): RepetitiveElement.ElementsOffset[];
    equalsTo(constraint: Layout.FragmentLayoutConstraint): boolean;
}
