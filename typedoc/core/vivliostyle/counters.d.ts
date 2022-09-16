import * as Base from "./base";
import * as CssCascade from "./css-cascade";
import * as Exprs from "./exprs";
import * as Vgen from "./vgen";
import * as Vtree from "./vtree";
import { Layout } from "./types";
/**
 * Class representing a reference by target-counter(s).
 * @param targetId ID of the referenced element (transformed by
 *     DocumentURLTransformer to handle a reference across multiple source
 *     documents)
 * @param resolved If the reference is already resolved or not
 */
export declare class TargetCounterReference {
    readonly targetId: string;
    resolved: boolean;
    pageCounters: CssCascade.CounterValues;
    spineIndex: number;
    pageIndex: number;
    constructor(targetId: string, resolved: boolean);
    equals(other: TargetCounterReference): boolean;
    /**
     * Returns if the reference is resolved or not.
     */
    isResolved(): boolean;
    /**
     * Marks that this reference is resolved.
     */
    resolve(): void;
    /**
     * Marks that this reference is unresolved.
     */
    unresolve(): void;
}
export declare class CounterStore {
    readonly documentURLTransformer: Base.DocumentURLTransformer;
    countersById: {
        [key: string]: CssCascade.CounterValues;
    };
    pageCountersById: {
        [key: string]: CssCascade.CounterValues;
    };
    currentPageCounters: CssCascade.CounterValues;
    previousPageCounters: CssCascade.CounterValues;
    currentPageCountersStack: CssCascade.CounterValues[];
    pageIndicesById: {
        [key: string]: {
            spineIndex: number;
            pageIndex: number;
        };
    };
    currentPage: Vtree.Page;
    newReferencesOfCurrentPage: TargetCounterReference[];
    referencesToSolve: TargetCounterReference[];
    referencesToSolveStack: TargetCounterReference[][];
    unresolvedReferences: {
        [key: string]: TargetCounterReference[];
    };
    resolvedReferences: {
        [key: string]: TargetCounterReference[];
    };
    private pagesCounterExprs;
    constructor(documentURLTransformer: Base.DocumentURLTransformer);
    createCounterListener(baseURL: string): CssCascade.CounterListener;
    createCounterResolver(baseURL: string, rootScope: Exprs.LexicalScope, pageScope: Exprs.LexicalScope): CssCascade.CounterResolver;
    setCurrentPage(page: Vtree.Page): void;
    private definePageCounter;
    /**
     * Forcefully set the `page` page-based counter to the specified value.
     */
    forceSetPageCounter(pageNumber: number): void;
    /**
     * Update the page-based counters with 'counter-reset' and 'counter-increment'
     * properties within the page context. Call before starting layout of the
     * page.
     */
    updatePageCounters(cascadedPageStyle: CssCascade.ElementStyle, context: Exprs.Context): void;
    /**
     * Save current page-based counters values and set them to the values passed
     * in. The saved counter values can be restored by popPageCounters method.
     */
    pushPageCounters(counters: CssCascade.CounterValues): void;
    /**
     * Restore previously saved page-based counter values.
     */
    popPageCounters(): void;
    /**
     * Resolve a reference with the specified ID.
     */
    resolveReference(id: string): void;
    /**
     * Save a reference appeared in the current page.
     * @param resolved If the reference is already resolved or not.
     */
    saveReferenceOfCurrentPage(id: string, resolved: boolean): void;
    /**
     * Finish the current page; elements with ID are collected and saved with
     * current page-based counter values internally.
     * @param spineIndex Index of the currently laid out spine item
     * @param pageIndex Index of the currently laid out page in its spine item
     */
    finishPage(spineIndex: number, pageIndex: number): void;
    /**
     * Returns unresolved references pointing to the specified page.
     */
    getUnresolvedRefsToPage(page: Vtree.Page): {
        spineIndex: number;
        pageIndex: number;
        pageCounters: CssCascade.CounterValues;
        refs: TargetCounterReference[];
    }[];
    /**
     * Save current references to solve and set them to the values passed in.
     * The saved references can be restored by popReferencesToSolve method.
     */
    pushReferencesToSolve(refs: TargetCounterReference[]): void;
    /**
     * Restore previously saved references to solve.
     */
    popReferencesToSolve(): void;
    registerPageCounterExpr(name: string, format: (p1: number[]) => string, expr: Exprs.Val): void;
    getExprContentListener(): Vtree.ExprContentListener;
    private exprContentListener;
    finishLastPage(viewport: Vgen.Viewport): void;
    createLayoutConstraint(pageIndex: number): Layout.LayoutConstraint;
}
export declare const PAGES_COUNTER_ATTR = "data-vivliostyle-pages-counter";
