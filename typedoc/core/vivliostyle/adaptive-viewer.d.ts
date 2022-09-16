import * as Base from "./base";
import * as Constants from "./constants";
import * as Epub from "./epub";
import * as Exprs from "./exprs";
import * as Font from "./font";
import * as Task from "./task";
import * as Vgen from "./vgen";
import * as Vtree from "./vtree";
export declare type Action = (p1: Base.JSON) => Task.Result<boolean>;
export declare type ViewportSize = {
    marginLeft: number;
    marginRight: number;
    marginTop: number;
    marginBottom: number;
    width: number;
    height: number;
};
export declare const VIEWPORT_STATUS_ATTRIBUTE = "data-vivliostyle-viewer-status";
export declare const VIEWPORT_SPREAD_VIEW_ATTRIBUTE = "data-vivliostyle-spread-view";
/**
 * @enum {string}
 */
export declare enum PageViewMode {
    SINGLE_PAGE = "singlePage",
    SPREAD = "spread",
    AUTO_SPREAD = "autoSpread"
}
export declare type SingleDocumentParam = {
    url: string;
    startPage: number | null;
    skipPagesBefore: number | null;
};
export declare class AdaptiveViewer {
    readonly window: Window;
    readonly viewportElement: HTMLElement;
    readonly instanceId: string;
    readonly callbackFn: (p1: Base.JSON) => void;
    fontMapper: Font.Mapper;
    kick: () => void;
    sendCommand: (p1: Base.JSON | string) => void;
    resizeListener: () => void;
    hyperlinkListener: Base.EventListener;
    pageRuleStyleElement: HTMLElement;
    pageSheetSizeAlreadySet: boolean;
    renderTask: Task.Task | null;
    actions: {
        [key: string]: Action;
    };
    readyState: Constants.ReadyState;
    packageURL: string[];
    opf: Epub.OPFDoc;
    haveZipMetadata: boolean;
    touchActive: boolean;
    touchX: number;
    touchY: number;
    needResize: boolean;
    needRefresh: boolean;
    viewportSize: ViewportSize | null;
    currentPage: Vtree.Page;
    currentSpread: Vtree.Spread | null;
    pagePosition: Epub.Position | null;
    fontSize: number;
    zoom: number;
    fitToScreen: boolean;
    pageViewMode: PageViewMode;
    waitForLoading: boolean;
    renderAllPages: boolean;
    pref: Exprs.Preferences;
    pageSizes: {
        width: number;
        height: number;
    }[];
    viewport: Vgen.Viewport | null;
    opfView: Epub.OPFView;
    constructor(window: Window, viewportElement: HTMLElement, instanceId: string, callbackFn: (p1: Base.JSON) => void);
    private init;
    addLogListeners(): void;
    private callback;
    /**
     * Set readyState and notify to listeners
     */
    setReadyState(readyState: Constants.ReadyState): void;
    loadPublication(command: Base.JSON): Task.Result<boolean>;
    loadXML(command: Base.JSON): Task.Result<boolean>;
    private render;
    private resolveLength;
    configure(command: Base.JSON): Task.Result<boolean>;
    configurePlugins(command: Base.JSON): void;
    /**
     * Refresh view when a currently displayed page is replaced (by re-layout
     * caused by cross reference resolutions)
     */
    pageReplacedListener(evt: Base.Event): void;
    /**
     * Iterate through currently displayed pages and do something
     */
    private forCurrentPages;
    private removePageListeners;
    /**
     * Hide current pages (this.currentPage, this.currentSpread)
     */
    private hidePages;
    private showSinglePage;
    private showPage;
    private showSpread;
    private reportPosition;
    private createViewport;
    private resolveSpreadView;
    private updateSpreadView;
    private sizeIsGood;
    private setPageSize;
    private setPageSizePageRules;
    removePageSizePageRules(): void;
    private reset;
    /**
     * Show current page or spread depending on the setting
     * (this.pref.spreadView).
     * @param sync If true, get the necessary page synchronously (not waiting
     *     another rendering task)
     */
    private showCurrent;
    setPageZoom(page: Vtree.Page): void;
    setSpreadZoom(spread: Vtree.Spread): void;
    /**
     * @returns adjusted zoom factor
     */
    getAdjustedZoomFactor(pageDimension: {
        width: number;
        height: number;
    }): number;
    /**
     * Returns width and height of the spread, including the margin between pages.
     */
    getSpreadDimensions(spread: Vtree.Spread): {
        width: number;
        height: number;
    };
    /**
     * Returns zoom factor corresponding to the specified zoom type.
     */
    queryZoomFactor(type: ZoomType): number;
    /**
     * @returns zoom factor to fit inside viewport
     */
    calculateZoomFactorToFitInsideViewPort(pageDimension: {
        width: number;
        height: number;
    }): number;
    private cancelRenderingTask;
    resize(): Task.Result<boolean>;
    private sendLocationNotification;
    getCurrentPageProgression(): Constants.PageProgression | null;
    moveTo(command: Base.JSON): Task.Result<boolean>;
    showTOC(command: Base.JSON): Task.Result<boolean>;
    runCommand(command: Base.JSON): Task.Result<boolean>;
    initEmbed(cmd: Base.JSON | string): void;
}
/**
 * @enum {string}
 */
export declare enum ZoomType {
    FIT_INSIDE_VIEWPORT = "fit inside viewport"
}
export declare function maybeParse(cmd: any): Base.JSON;
