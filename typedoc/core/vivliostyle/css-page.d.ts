import * as Constants from "./constants";
import * as Css from "./css";
import * as CssCascade from "./css-cascade";
import * as CssParser from "./css-parser";
import * as CssValidator from "./css-validator";
import * as Exprs from "./exprs";
import * as Font from "./font";
import * as PageMaster from "./page-master";
import * as Vtree from "./vtree";
/**
 * Resolve page progression direction from writing-mode and direction.
 */
export declare function resolvePageProgression(style: CssCascade.ElementStyle): Constants.PageProgression;
export declare type PageSize = {
    width: Css.Numeric;
    height: Css.Numeric;
};
/**
 * Named page sizes.
 */
export declare const pageSizes: {
    [key: string]: PageSize;
};
/**
 * Default value for line width of printer marks
 */
export declare const defaultPrinterMarkLineWidth: Css.Numeric;
/**
 * Default value for distance between an edge of the page and printer marks
 */
export declare const defaultPrinterMarkOffset: Css.Numeric;
/**
 * Default value for line length of the (shorter) line of a crop mark and the
 * shorter line of a cross mark
 */
export declare const defaultPrinterMarkLineLength: Css.Numeric;
/**
 * Default value for bleed offset (= defaultPrinterMarkOffset +
 * defaultPrinterMarkLineLength)
 */
export declare const defaultBleedOffset: Css.Numeric;
export declare type PageSizeAndBleed = {
    width: Css.Numeric;
    height: Css.Numeric;
    bleed: Css.Numeric;
    bleedOffset: Css.Numeric;
    cropOffset: Css.Numeric;
};
export declare function resolvePageSizeAndBleed(style: {
    [key: string]: CssCascade.CascadeValue;
}): PageSizeAndBleed;
export declare type EvaluatedPageSizeAndBleed = {
    pageWidth: number;
    pageHeight: number;
    bleed: number;
    bleedOffset: number;
    cropOffset: number;
};
/**
 * Evaluate actual page width, height and bleed from style specified in page
 * context.
 */
export declare function evaluatePageSizeAndBleed(pageSizeAndBleed: PageSizeAndBleed, context: Exprs.Context): EvaluatedPageSizeAndBleed;
/**
 * Create an 'svg' element for a printer mark.
 */
export declare function createPrinterMarkSvg(doc: Document, width: number, height: number): Element;
/**
 * Create an SVG element for a printer mark line.
 * @param elementType Specifies which type of element to create. Default value
 *     is "polyline".
 */
export declare function createPrinterMarkElement(doc: Document, lineWidth: number, elementType?: string): Element;
/**
 * Position of a corner mark
 * @enum {string}
 */
export declare enum CornerMarkPosition {
    TOP_LEFT = "top left",
    TOP_RIGHT = "top right",
    BOTTOM_LEFT = "bottom left",
    BOTTOM_RIGHT = "bottom right"
}
/**
 * Create a corner mark.
 */
export declare function createCornerMark(doc: Document, position: CornerMarkPosition, lineWidth: number, cropMarkLineLength: number, bleed: number, offset: number): Element;
/**
 * Position of a cross mark
 * @enum {string}
 */
export declare enum CrossMarkPosition {
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right"
}
/**
 * Create a cross mark.
 */
export declare function createCrossMark(doc: Document, position: CrossMarkPosition, lineWidth: number, lineLength: number, offset: number): Element;
/**
 * Add printer marks to the page.
 */
export declare function addPrinterMarks(cascadedPageStyle: CssCascade.ElementStyle, evaluatedPageSizeAndBleed: EvaluatedPageSizeAndBleed, page: Vtree.Page, context: Exprs.Context): void;
/**
 * Properties transfered from the PageRuleMaster to the PageRulePartition
 */
export declare const propertiesAppliedToPartition: {
    width: boolean;
    height: boolean;
    "block-size": boolean;
    "inline-size": boolean;
    margin: boolean;
    padding: boolean;
    border: boolean;
    outline: boolean;
    "outline-width": boolean;
    "outline-style": boolean;
    "outline-color": boolean;
};
/**
 * Represents position of a margin box along the variable dimension of the page.
 * START and END can be interpreted as 'inline-start' and 'inline-end' in
 * horizontal and vertical writing modes. For example, for top margin boxes
 * (@top-left-corner, @top-left, @top-center, @top-right, @top-right-corner),
 * @top-left corresponds to START, @top-center to CENTER, and @top-right to END.
 * The corner boxes (@top-left-corner and @top-right-corner) have a 'null'
 * position.
 * @enum {string}
 */
export declare enum MarginBoxPositionAlongVariableDimension {
    START = "start",
    CENTER = "center",
    END = "end"
}
export declare type PageMarginBoxInformation = {
    order: number;
    isInTopRow: boolean;
    isInBottomRow: boolean;
    isInLeftColumn: boolean;
    isInRightColumn: boolean;
    positionAlongVariableDimension: MarginBoxPositionAlongVariableDimension;
};
/**
 * Page-margin boxes.
 * @dict
 */
export declare const pageMarginBoxes: {
    [key: string]: PageMarginBoxInformation;
};
/**
 * Names for page-margin boxes order in the default painting order.
 */
export declare const pageMarginBoxNames: string[];
/**
 * Indicates that the page master is generated for `@page` rules.
 */
export declare const pageRuleMasterPseudoName = "vivliostyle-page-rule-master";
/**
 * Key for properties in margin contexts.
 * Styles in margin contexts are stored in pageStyle["_marginBoxes"][(margin
 * box's name)].
 */
export declare const marginBoxesKey: string;
/**
 * Represent a page master generated for `@page` rules
 * @param style Cascaded style for `@page` rules
 */
export declare class PageRuleMaster extends PageMaster.PageMaster<PageRuleMasterInstance> {
    private bodyPartitionKey;
    private pageMarginBoxes;
    constructor(scope: Exprs.LexicalScope, parent: PageMaster.RootPageBox, style: CssCascade.ElementStyle);
    /**
     * Create page-margin boxes
     */
    createPageMarginBoxes(style: CssCascade.ElementStyle): void;
    /**
     * Transfer cascaded style for `@page` rules to 'specified' style of this
     * PageBox
     */
    private applySpecified;
    createInstance(parentInstance: any): PageRuleMasterInstance;
}
/**
 * Represent a partition placed in a PageRuleMaster
 * @param style Cascaded style for `@page` rules
 */
export declare class PageRulePartition extends PageMaster.Partition<PageRulePartitionInstance> {
    readonly pageSize: PageSize;
    constructor(scope: Exprs.LexicalScope, parent: PageRuleMaster, style: CssCascade.ElementStyle, pageSize: PageSize);
    /**
     * Transfer cascaded style for `@page` rules to 'specified' style of this
     * PageBox
     */
    private applySpecified;
    createInstance(parentInstance: any): PageMaster.PageBoxInstance;
}
/**
 * Represent a partition for a page-margin box
 */
export declare class PageMarginBoxPartition extends PageMaster.Partition<PageMarginBoxPartitionInstance> {
    readonly marginBoxName: string;
    constructor(scope: Exprs.LexicalScope, parent: PageRuleMaster, marginBoxName: string, style: CssCascade.ElementStyle);
    /**
     * Transfer cascaded style for `@page` rules to 'specified' style of this
     * PageMarginBox
     */
    applySpecified(style: CssCascade.ElementStyle): void;
    createInstance(parentInstance: any): PageMaster.PageBoxInstance;
}
export declare type PageAreaDimension = {
    borderBoxWidth: Exprs.Val;
    borderBoxHeight: Exprs.Val;
    marginTop: Exprs.Val;
    marginBottom: Exprs.Val;
    marginLeft: Exprs.Val;
    marginRight: Exprs.Val;
};
export declare class PageRuleMasterInstance extends PageMaster.PageMasterInstance<PageRuleMaster> {
    pageAreaDimension: PageAreaDimension | null;
    pageMarginBoxInstances: {
        [key: string]: PageMarginBoxPartitionInstance;
    };
    constructor(parentInstance: PageMaster.PageBoxInstance, pageRuleMaster: PageRuleMaster);
    applyCascadeAndInit(cascade: CssCascade.CascadeInstance, docElementStyle: CssCascade.ElementStyle): void;
    initHorizontal(): void;
    initVertical(): void;
    setPageAreaDimension(dim: PageAreaDimension): void;
    adjustPageLayout(context: Exprs.Context, page: Vtree.Page, clientLayout: Vtree.ClientLayout): void;
    /**
     * Determine and set margin boxes' sizes along variable dimension using an
     * algorithm specified in CSS Paged Media spec.
     * @param marginBoxContainers Containers corresponding to the target margin
     *     boxes in one page edge (top, bottom, left, right)
     * @param isHorizontal Indicates if the target margin boxes are on the
     *     horizontal edge (top or bottom) or not (left or right).
     * @param dimensions Page dimensions. start: margin-left or margin-top. end:
     *     margin-right or margin-bottom. extent: border-box width or height of
     *     the page area (= available width or height for the target margin boxes)
     */
    private sizeMarginBoxesAlongVariableDimension;
    private getSizesOfMarginBoxesAlongVariableDimension;
    /**
     * Distribute auto margin sizes among two margin boxes using an algorithm
     * specified in CSS Paged Media spec.
     * @param x Parameter for the first margin box. null if the box is not
     *     generated.
     * @param y Parameter for the second margin box. null if the box is not
     *     generated.
     * @param availableSize Available size for the margin boxes.
     * @returns Determined sizes for the two boxes. Each value is present only
     *     when the size of the corresponding box is 'auto'.
     */
    private distributeAutoMarginBoxSizes;
    prepareContainer(context: Exprs.Context, container: Vtree.Container, page: Vtree.Page, docFaces: Font.DocumentFaces, clientLayout: Vtree.ClientLayout): void;
}
export declare class PageRulePartitionInstance extends PageMaster.PartitionInstance<PageRulePartition> {
    borderBoxWidth: Exprs.Val;
    borderBoxHeight: Exprs.Val;
    marginTop: Exprs.Val;
    marginRight: Exprs.Val;
    marginBottom: Exprs.Val;
    marginLeft: Exprs.Val;
    constructor(parentInstance: PageMaster.PageBoxInstance, pageRulePartition: PageRulePartition);
    applyCascadeAndInit(cascade: CssCascade.CascadeInstance, docElementStyle: CssCascade.ElementStyle): void;
    initHorizontal(): void;
    initVertical(): void;
    /**
     * Calculate page dimensions as specified in CSS Paged Media
     * (http://dev.w3.org/csswg/css-page/#page-model) Page border box extent and
     * margins. Since the containing block can be resized in the over-constrained
     * case, the sum of these values is not necessarily same to the original page
     * dimension specified in the page at-rules.
     */
    private resolvePageBoxDimensions;
    prepareContainer(context: Exprs.Context, container: Vtree.Container, page: Vtree.Page, docFaces: Font.DocumentFaces, clientLayout: Vtree.ClientLayout): void;
}
export declare class PageMarginBoxPartitionInstance extends PageMaster.PartitionInstance<PageMarginBoxPartition> {
    boxInfo: PageMarginBoxInformation;
    suppressEmptyBoxGeneration: boolean;
    constructor(parentInstance: PageMaster.PageBoxInstance, pageMarginBoxPartition: PageMarginBoxPartition);
    prepareContainer(context: Exprs.Context, container: Vtree.Container, page: Vtree.Page, docFaces: Font.DocumentFaces, clientLayout: Vtree.ClientLayout): void;
    private applyVerticalAlign;
    /**
     * Calculate page-margin boxes positions along the variable dimension of the
     * page. For CENTER and END margin boxes, the position is calculated only if
     * the dimension (width or height) is non-auto, so that it can be resolved at
     * this point. If the dimension is auto, the calculation is deffered.
     */
    private positionAlongVariableDimension;
    /**
     * Calculate page-margin boxes positions along the fixed dimension of the
     * page.
     */
    private positionAndSizeAlongFixedDimension;
    initHorizontal(): void;
    initVertical(): void;
    finishContainer(context: Exprs.Context, container: Vtree.Container, page: Vtree.Page, column: Vtree.Container, columnCount: number, clientLayout: Vtree.ClientLayout, docFaces: Font.DocumentFaces): void;
}
/**
 * Dynamically generate and manage page masters corresponding to page at-rules.
 */
export declare class PageManager {
    private readonly cascadeInstance;
    private readonly pageScope;
    private readonly rootPageBoxInstance;
    private readonly context;
    private readonly docElementStyle;
    private pageMasterCache;
    constructor(cascadeInstance: CssCascade.CascadeInstance, pageScope: Exprs.LexicalScope, rootPageBoxInstance: PageMaster.RootPageBoxInstance, context: Exprs.Context, docElementStyle: CssCascade.ElementStyle);
    /**
     * Determine the page progression and define left/right/recto/verso pages.
     */
    private definePageProgression;
    /**
     * Get cascaded page style specified in page context for the current page.
     */
    getCascadedPageStyle(pageType: string): CssCascade.ElementStyle;
    /**
     * Return a PageMasterInstance with page rules applied. Return a cached
     * instance if there already exists one with the same styles.
     * @param pageMasterInstance The original page master instance.
     * @param cascadedPageStyle Cascaded page style specified in page context.
     */
    getPageRulePageMaster(pageMasterInstance: PageMaster.PageMasterInstance, cascadedPageStyle: CssCascade.ElementStyle): PageMaster.PageMasterInstance;
    /**
     * Generate a cache key from the specified styles and the original page master
     * key.
     */
    private makeCacheKey;
    private makeCascadeValueObjectKey;
    private generatePageRuleMaster;
    /**
     * Cascade some properties from `@page` rules to a page master.
     * For now, only 'width' and 'height' resolved from 'size' value are cascaded.
     * @param style Cascaded style in the page context
     * @param pageMaster The original page master
     */
    private generateCascadedPageMaster;
}
export declare class CheckPageTypeAction extends CssCascade.ChainedAction {
    readonly pageType: string;
    constructor(pageType: string);
    apply(cascadeInstance: CssCascade.CascadeInstance): void;
    getPriority(): number;
    makePrimary(cascade: CssCascade.Cascade): boolean;
}
export declare class IsFirstPageAction extends CssCascade.ChainedAction {
    readonly scope: Exprs.LexicalScope;
    constructor(scope: Exprs.LexicalScope);
    apply(cascadeInstance: CssCascade.CascadeInstance): void;
    getPriority(): number;
}
export declare class IsBlankPageAction extends CssCascade.ChainedAction {
    readonly scope: Exprs.LexicalScope;
    constructor(scope: Exprs.LexicalScope);
    apply(cascadeInstance: CssCascade.CascadeInstance): void;
    getPriority(): number;
}
export declare class IsLeftPageAction extends CssCascade.ChainedAction {
    readonly scope: Exprs.LexicalScope;
    constructor(scope: Exprs.LexicalScope);
    apply(cascadeInstance: CssCascade.CascadeInstance): void;
    getPriority(): number;
}
export declare class IsRightPageAction extends CssCascade.ChainedAction {
    readonly scope: Exprs.LexicalScope;
    constructor(scope: Exprs.LexicalScope);
    apply(cascadeInstance: CssCascade.CascadeInstance): void;
    getPriority(): number;
}
export declare class IsRectoPageAction extends CssCascade.ChainedAction {
    readonly scope: Exprs.LexicalScope;
    constructor(scope: Exprs.LexicalScope);
    apply(cascadeInstance: CssCascade.CascadeInstance): void;
    getPriority(): number;
}
export declare class IsVersoPageAction extends CssCascade.ChainedAction {
    readonly scope: Exprs.LexicalScope;
    constructor(scope: Exprs.LexicalScope);
    apply(cascadeInstance: CssCascade.CascadeInstance): void;
    getPriority(): number;
}
export declare class IsNthPageAction extends CssCascade.IsNthAction {
    readonly scope: Exprs.LexicalScope;
    readonly a: number;
    readonly b: number;
    constructor(scope: Exprs.LexicalScope, a: number, b: number);
    apply(cascadeInstance: CssCascade.CascadeInstance): void;
    getPriority(): number;
}
/**
 * Action applying an at-page rule
 */
export declare class ApplyPageRuleAction extends CssCascade.ApplyRuleAction {
    constructor(style: CssCascade.ElementStyle, specificity: number);
    apply(cascadeInstance: CssCascade.CascadeInstance): void;
}
/**
 * Merge page styles, including styles specified on page-margin boxes,
 * considering specificity. Intended to be used in place of
 * CssCascade.mergeIn, which is for element styles.
 */
export declare function mergeInPageRule(context: Exprs.Context, target: CssCascade.ElementStyle, style: CssCascade.ElementStyle, specificity: number, cascadeInstance: CssCascade.CascadeInstance): void;
/**
 * ParserHandler for `@page` rules. It handles properties specified with page
 * contexts. It also does basic cascading (which can be done without information
 * other than the page rules themselves) and stores the result in `pageProps`
 * object as a map from page selectors to sets of properties. This result is
 * later used for adding `@page` rules to the real DOM, which are then used by
 * the PDF renderer (Chromium) to determine page sizes.
 */
export declare class PageParserHandler extends CssCascade.CascadeParserHandler implements CssValidator.PropertyReceiver {
    private readonly pageProps;
    private currentPageSelectors;
    private currentNamedPageSelector;
    private currentPseudoPageClassSelectors;
    constructor(scope: Exprs.LexicalScope, owner: CssParser.DispatchParserHandler, parent: CssCascade.CascadeParserHandler, validatorSet: CssValidator.ValidatorSet, pageProps: {
        [key: string]: CssCascade.ElementStyle;
    });
    startPageRule(): void;
    tagSelector(ns: string | null, name: string | null): void;
    pseudoclassSelector(name: string, params: (number | string)[]): void;
    /**
     * Save currently processed selector and reset variables.
     */
    private finishSelector;
    nextSelector(): void;
    startRuleBody(): void;
    simpleProperty(name: string, value: Css.Val, important: any): void;
    insertNonPrimary(action: CssCascade.CascadeAction): void;
    makeApplyRuleAction(specificity: number): CssCascade.ApplyRuleAction;
    startPageMarginBoxRule(name: string): void;
}
/**
 * Parser handler for a page-margin box rule.
 */
export declare class PageMarginBoxParserHandler extends CssParser.SlaveParserHandler implements CssValidator.PropertyReceiver {
    readonly validatorSet: CssValidator.ValidatorSet;
    readonly boxStyle: CssCascade.ElementStyle;
    constructor(scope: Exprs.LexicalScope, owner: CssParser.DispatchParserHandler, validatorSet: CssValidator.ValidatorSet, boxStyle: CssCascade.ElementStyle);
    property(name: string, value: Css.Val, important: boolean): void;
    /** @override */
    invalidPropertyValue(name: string, value: Css.Val): void;
    /** @override */
    unknownProperty(name: string, value: Css.Val): void;
    /** @override */
    simpleProperty(name: string, value: Css.Val, important: any): void;
}
