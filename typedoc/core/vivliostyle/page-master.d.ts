import * as Css from "./css";
import * as CssCascade from "./css-cascade";
import * as CssParser from "./css-parser";
import * as CssValidator from "./css-validator";
import * as Exprs from "./exprs";
import * as Font from "./font";
import * as Vtree from "./vtree";
export declare let keyCount: number;
/**
 * Represent an at-rule which creates a page-level CSS box (page-master,
 * partition, and partition-group).
 */
export declare abstract class PageBox<I extends PageBoxInstance = PageBoxInstance<any>> {
    readonly name: string | null;
    readonly pseudoName: string | null;
    readonly classes: string[];
    readonly parent: PageBox;
    specified: CssCascade.ElementStyle;
    children: PageBox[];
    pageMaster: PageMaster;
    index: number;
    key: string;
    protected _scope: Exprs.LexicalScope;
    get scope(): Exprs.LexicalScope;
    constructor(scope: Exprs.LexicalScope, name: string | null, pseudoName: string | null, classes: string[], parent: PageBox);
    createInstance(parentInstance: PageBoxInstance): PageBoxInstance;
    /**
     * Clone the PageBox.
     * @param param parent: The parent of the cloned PageBox.
     *     pseudoName: Assign this value as the pseudoName of the cloned PageBox.
     */
    clone(param: {
        parent?: PageBox;
        pseudoName?: string;
    }): PageBox<I>;
    /**
     * Copy 'specified' properties to another instance.
     * @param dest The PageBox into which 'specified' properties are copied
     */
    protected copySpecified(dest: PageBox): void;
    /**
     * Clone children with the specified PageBox as their parent.
     */
    protected cloneChildren(parent: PageBox): void;
}
/**
 * Parent of all page masters
 */
export declare class RootPageBox extends PageBox<RootPageBoxInstance> {
    constructor(scope: Exprs.LexicalScope);
}
export declare class PageMasterScope extends Exprs.LexicalScope {
    pageMaster: PageMaster;
    constructor(scope: Exprs.LexicalScope, pageMaster: PageMaster);
}
/**
 * Represent a page-master rule
 */
export declare class PageMaster<I extends PageMasterInstance = PageMasterInstance<any>> extends PageBox<I> {
    readonly condition: Exprs.Val;
    readonly specificity: number;
    keyMap: {
        [key: string]: string;
    };
    constructor(scope: Exprs.LexicalScope, name: string | null, pseudoName: string | null, classes: string[], parent: RootPageBox, condition: Exprs.Val, specificity: number);
    createInstance(parentInstance: any): PageBoxInstance;
    clone(param: any): PageMaster;
    /**
     * Point the pageMaster reference in the PageMasterScope to the current page
     * master. This is needed when a page master is cloned and shares a common
     * scope with the original page master. Since every Exprs.Val which the
     * page master holds has a reference to the scope and uses it for variable
     * resolution, this reference must be updated properly before the page master
     * instance is used.
     */
    resetScope(): void;
}
/**
 * Represent a partition-group rule
 */
export declare class PartitionGroup extends PageBox<PartitionGroupInstance> {
    constructor(scope: Exprs.LexicalScope, name: string | null, pseudoName: string | null, classes: string[], parent: PageBox);
    createInstance(parentInstance: PageBoxInstance): PageBoxInstance;
    clone(param: any): PartitionGroup;
}
/**
 * Represent a partition rule
 */
export declare class Partition<I extends PartitionInstance = PartitionInstance> extends PageBox<I> {
    constructor(scope: Exprs.LexicalScope, name: string | null, pseudoName: string | null, classes: string[], parent: PageBox);
    createInstance(parentInstance: any): PageBoxInstance;
    clone(param: any): Partition;
}
/**
 * @param def default value
 */
export declare function toExprIdent(scope: Exprs.LexicalScope, val: Css.Val, def: string): Exprs.Val;
export declare function toExprAuto(scope: Exprs.LexicalScope, val: Css.Val, ref: Exprs.Val): Exprs.Val;
export declare function toExprNormal(scope: Exprs.LexicalScope, val: Css.Val, ref: Exprs.Val): Exprs.Val;
export declare function toExprZero(scope: Exprs.LexicalScope, val: Css.Val, ref: Exprs.Val): Exprs.Val;
/**
 * If the value is not specified (null), returns zero.
 * If the value is 'auto', returns null.
 * Otherwise, return the value itself.
 */
export declare function toExprZeroAuto(scope: Exprs.LexicalScope, val: Css.Val, ref: Exprs.Val): Exprs.Val;
export declare function toExprZeroBorder(scope: Exprs.LexicalScope, val: Css.Val, styleVal: Css.Val, ref: Exprs.Val): Exprs.Val;
export declare function toExprBool(scope: Exprs.LexicalScope, val: Css.Val, def: Exprs.Val): Exprs.Val;
export interface InstanceHolder extends Exprs.Context {
    registerInstance(key: string, instance: PageBoxInstance): void;
    /**
     * @return instance
     */
    lookupInstance(key: string): PageBoxInstance;
}
export declare class PageBoxInstance<P extends PageBox = PageBox<any>> {
    readonly parentInstance: PageBoxInstance;
    readonly pageBox: P;
    /**
     * cascaded styles, geometric ones converted to Css.Expr
     */
    protected cascaded: CssCascade.ElementStyle;
    style: {
        [key: string]: Css.Val;
    };
    private autoWidth;
    private autoHeight;
    children: PageBoxInstance[];
    isAutoWidth: boolean;
    isAutoHeight: boolean;
    isTopDependentOnAutoHeight: boolean;
    isRightDependentOnAutoWidth: boolean;
    private calculatedWidth;
    private calculatedHeight;
    pageMasterInstance: PageMasterInstance;
    namedValues: {
        [key: string]: Exprs.Val;
    };
    namedFuncs: {
        [key: string]: Exprs.Val;
    };
    vertical: boolean;
    rtl: boolean;
    suppressEmptyBoxGeneration: boolean;
    constructor(parentInstance: PageBoxInstance, pageBox: P);
    /**
     * Reset information related to layout.
     */
    reset(): void;
    private addNamedValues;
    resolveName(name: string): Exprs.Val;
    resolveFunc(name: any): Exprs.Val;
    private initEnabled;
    protected boxSpecificEnabled(enabled: Exprs.Val): Exprs.Val;
    protected initHorizontal(): void;
    protected initVertical(): void;
    private initColumns;
    private depends;
    private init;
    getProp(context: Exprs.Context, name: string): Css.Val;
    getPropAsNumber(context: Exprs.Context, name: string): number;
    getSpecial(context: Exprs.Context, name: string): Css.Val[];
    getActiveRegions(context: Exprs.Context): string[];
    propagateProperty(context: Exprs.Context, container: Vtree.Container, name: string, docFaces: Font.DocumentFaces): void;
    propagatePropertyToElement(context: Exprs.Context, element: Element, name: string, docFaces: Font.DocumentFaces): void;
    propagateDelayedProperty(context: Exprs.Context, container: Vtree.Container, name: string, delayedItems: Vtree.DelayedItem[]): void;
    assignLeftPosition(context: Exprs.Context, container: Vtree.Container): void;
    assignRightPosition(context: Exprs.Context, container: Vtree.Container): void;
    assignTopPosition(context: Exprs.Context, container: Vtree.Container): void;
    assignBottomPosition(context: Exprs.Context, container: Vtree.Container): void;
    assignBeforePosition(context: Exprs.Context, container: Vtree.Container): void;
    assignAfterPosition(context: Exprs.Context, container: Vtree.Container): void;
    assignStartEndPosition(context: Exprs.Context, container: Vtree.Container): void;
    sizeWithMaxHeight(context: Exprs.Context, container: Vtree.Container): void;
    sizeWithMaxWidth(context: Exprs.Context, container: Vtree.Container): void;
    prepareContainer(context: Exprs.Context, container: Vtree.Container, page: Vtree.Page, docFaces: Font.DocumentFaces, clientLayout: Vtree.ClientLayout): void;
    transferContentProps(context: Exprs.Context, container: Vtree.Container, page: Vtree.Page, docFaces: Font.DocumentFaces): void;
    transferSinglUriContentProps(context: Exprs.Context, element: Element, docFaces: Font.DocumentFaces): void;
    /**
     * @param column (null when content comes from the content property)
     */
    finishContainer(context: Exprs.Context, container: Vtree.Container, page: Vtree.Page, column: Vtree.Container, columnCount: number, clientLayout: Vtree.ClientLayout, docFaces: Font.DocumentFaces): void;
    applyCascadeAndInit(cascade: CssCascade.CascadeInstance, docElementStyle: CssCascade.ElementStyle): void;
    resolveAutoSizing(context: Exprs.Context): void;
}
/**
 * Properties that are passed through before the layout.
 */
export declare const passPreProperties: string[];
/**
 * Properties that are passed through after the layout.
 */
export declare const passPostProperties: string[];
/**
 * Only passed when there is content assigned by the content property.
 */
export declare const passContentProperties: string[];
export declare const passSingleUriContentProperties: string[];
export declare const delayedProperties: string[];
export declare const userAgentPageMasterPseudo = "background-host";
export declare class RootPageBoxInstance extends PageBoxInstance<RootPageBox> {
    constructor(pageBox: RootPageBox);
    applyCascadeAndInit(cascade: CssCascade.CascadeInstance, docElementStyle: CssCascade.ElementStyle): void;
}
export declare class PageMasterInstance<P extends PageMaster = PageMaster<PageMasterInstance<any>>> extends PageBoxInstance<P> {
    constructor(parentInstance: PageBoxInstance, pageBox: P);
    boxSpecificEnabled(enabled: Exprs.Val): Exprs.Val;
    /**
     * Called after layout of contents of the page has done to adjust the overall
     * page layout. Override in subclasses.
     */
    adjustPageLayout(context: Exprs.Context, page: Vtree.Page, clientLayout: Vtree.ClientLayout): void;
}
export declare class PartitionGroupInstance extends PageBoxInstance<PartitionGroup> {
    constructor(parentInstance: PageBoxInstance, pageBox: PageBox);
}
export declare class PartitionInstance<P extends Partition = Partition<PartitionInstance<any>>> extends PageBoxInstance<P> {
    constructor(parentInstance: PageBoxInstance, pageBox: P);
    processPartitionList(enabled: Exprs.Val, listVal: Css.Val, conflicting: boolean): Exprs.Val;
    boxSpecificEnabled(enabled: Exprs.Val): Exprs.Val;
    prepareContainer(context: Exprs.Context, container: Vtree.Container, page: Vtree.Page, docFaces: Font.DocumentFaces, clientLayout: Vtree.ClientLayout): void;
}
export declare class PageBoxParserHandler extends CssParser.SlaveParserHandler implements CssValidator.PropertyReceiver {
    readonly target: PageBox;
    readonly validatorSet: CssValidator.ValidatorSet;
    constructor(scope: Exprs.LexicalScope, owner: CssParser.DispatchParserHandler, target: PageBox, validatorSet: CssValidator.ValidatorSet);
    property(name: string, value: Css.Val, important: boolean): void;
    /** @override */
    unknownProperty(name: string, value: Css.Val): void;
    /** @override */
    invalidPropertyValue(name: string, value: Css.Val): void;
    /** @override */
    simpleProperty(name: string, value: Css.Val, important: any): void;
}
export declare class PartitionParserHandler extends PageBoxParserHandler {
    constructor(scope: Exprs.LexicalScope, owner: CssParser.DispatchParserHandler, target: Partition, validatorSet: CssValidator.ValidatorSet);
}
export declare class PartitionGroupParserHandler extends PageBoxParserHandler {
    constructor(scope: Exprs.LexicalScope, owner: CssParser.DispatchParserHandler, target: PartitionGroup, validatorSet: CssValidator.ValidatorSet);
    startPartitionRule(name: string | null, pseudoName: string | null, classes: string[]): void;
    startPartitionGroupRule(name: string | null, pseudoName: string | null, classes: string[]): void;
}
export declare class PageMasterParserHandler extends PageBoxParserHandler {
    constructor(scope: Exprs.LexicalScope, owner: CssParser.DispatchParserHandler, target: PageMaster, validatorSet: CssValidator.ValidatorSet);
    startPartitionRule(name: string | null, pseudoName: string | null, classes: string[]): void;
    startPartitionGroupRule(name: string | null, pseudoName: string | null, classes: string[]): void;
}
