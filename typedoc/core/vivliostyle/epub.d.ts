import * as Base from "./base";
import * as Constants from "./constants";
import * as Counters from "./counters";
import * as Css from "./css";
import * as Exprs from "./exprs";
import * as Font from "./font";
import * as Net from "./net";
import * as OPS from "./ops";
import * as Task from "./task";
import * as Toc from "./toc";
import * as Vgen from "./vgen";
import * as Vtree from "./vtree";
import * as XmlDoc from "./xml-doc";
export declare type Position = {
    spineIndex: number;
    pageIndex: number;
    offsetInItem: number;
};
export declare class EPUBDocStore extends OPS.OPSDocStore {
    plainXMLStore: XmlDoc.XMLDocStore;
    jsonStore: Net.JSONStore;
    opfByURL: {
        [key: string]: OPFDoc;
    };
    primaryOPFByEPubURL: {
        [key: string]: OPFDoc;
    };
    deobfuscators: {
        [key: string]: (p1: Blob) => Task.Result<Blob>;
    };
    documents: {
        [key: string]: Task.Result<XmlDoc.XMLDocHolder>;
    };
    constructor();
    makeDeobfuscatorFactory(): ((p1: string) => ((p1: Blob) => Task.Result<Blob>) | null) | null;
    loadAsPlainXML(url: string, opt_required?: boolean, opt_message?: string): Task.Result<XmlDoc.XMLDocHolder>;
    startLoadingAsPlainXML(url: string): void;
    loadAsJSON(url: string, opt_required?: boolean, opt_message?: string): Task.Result<Base.JSON>;
    startLoadingAsJSON(url: string): void;
    loadPubDoc(url: string, haveZipMetadata: boolean): Task.Result<OPFDoc>;
    loadEPUBDoc(url: string, haveZipMetadata: boolean): Task.Result<OPFDoc>;
    loadOPF(pubURL: string, root: string, haveZipMetadata: boolean): Task.Result<OPFDoc>;
    loadWebPub(url: string): Task.Result<OPFDoc>;
    addDocument(url: string, doc: Document): Task.Result<XmlDoc.XMLDocHolder>;
    reportLoadError(docURL: string): void;
    load(url: string): Task.Result<XmlDoc.XMLDocHolder>;
}
export declare type OPFItemParam = {
    url: string;
    index: number;
    startPage: number | null;
    skipPagesBefore: number | null;
};
export declare class OPFItem {
    id: string | null;
    src: string;
    mediaType: string | null;
    title: string | null;
    itemRefElement: Element | null;
    spineIndex: number;
    compressedSize: number;
    compressed: boolean | null;
    epage: number;
    epageCount: number;
    startPage: number | null;
    skipPagesBefore: number | null;
    itemProperties: {
        [key: string]: boolean;
    };
    constructor();
    initWithElement(itemElem: Element, opfURL: string): void;
    initWithParam(param: OPFItemParam): void;
}
export declare function getOPFItemId(item: OPFItem): string | null;
export declare function makeDeobfuscator(uid: string): (p1: Blob) => Task.Result<Blob>;
export declare function makeObfuscationKey(uid: string): string;
export interface Meta {
    [key: string]: MetaItem[];
}
export interface MetaItem {
    v: string;
    o?: number;
    s?: string;
    r?: Meta;
}
export declare const predefinedPrefixes: {
    dcterms: string;
    marc: string;
    media: string;
    rendition: string;
    onix: string;
    xsd: string;
    opf: string;
};
export declare const defaultIRI = "http://idpf.org/epub/vocab/package/meta/#";
export declare const metaTerms: {
    language: string;
    title: string;
    creator: string;
    layout: string;
    titleType: string;
    displaySeq: string;
    alternateScript: string;
    role: string;
};
export declare function getMetadataComparator(term: string, lang: string): (p1: MetaItem, p2: MetaItem) => number;
export declare function readMetadata(mroot: XmlDoc.NodeList, prefixes: string | null): Meta;
export declare function getMathJaxHub(): object;
export declare function checkMathJax(): void;
export declare const supportedMediaTypes: {
    "application/xhtml+xml": boolean;
    "image/jpeg": boolean;
    "image/png": boolean;
    "image/svg+xml": boolean;
    "image/gif": boolean;
    "audio/mp3": boolean;
};
export declare const transformedIdPrefix = "viv-id-";
export declare class OPFDoc {
    readonly store: EPUBDocStore;
    readonly pubURL: string;
    opfXML: XmlDoc.XMLDocHolder;
    encXML: XmlDoc.XMLDocHolder;
    items: OPFItem[];
    spine: OPFItem[];
    itemMap: {
        [key: string]: OPFItem;
    };
    itemMapByPath: {
        [key: string]: OPFItem;
    };
    uid: string | null;
    bindings: {
        [key: string]: string;
    };
    lang: string | null;
    epageCount: number;
    prePaginated: boolean;
    epageIsRenderedPage: boolean;
    epageCountCallback: (p1: number) => void | null;
    metadata: Meta;
    ncxToc: OPFItem;
    xhtmlToc: OPFItem;
    cover: OPFItem;
    fallbackMap: {
        [key: string]: string;
    };
    pageProgression: Constants.PageProgression | null;
    documentURLTransformer: Base.DocumentURLTransformer;
    constructor(store: EPUBDocStore, pubURL: string);
    createDocumentURLTransformer(): Base.DocumentURLTransformer;
    /**
     * Metadata is organized in the following way: fully-expanded property names
     * (with IRI prefixes prepended) point to an array of values. Array contains
     * at least one element. First element is primary and should be used by
     * default. Element values are objects have the following keys:
     * - "v" - item value as string,
     * - "s" - scheme,
     * - "o" - index in the order of appearing in the source,
     * - "r" - refinement submetadata (organized just like the top-level
     * metadata).
     */
    getMetadata(): Meta;
    getPathFromURL(url: string): string | null;
    initWithXMLDoc(opfXML: XmlDoc.XMLDocHolder, encXML: XmlDoc.XMLDocHolder, zipMetadata: Base.JSON, manifestURL: string): Task.Result<any>;
    assignAutoPages(): void;
    setEPageCountMode(epageIsRenderedPage: boolean): void;
    countEPages(epageCountCallback: ((p1: number) => void) | null): Task.Result<boolean>;
    /**
     * Creates a fake OPF "document" that contains OPS chapters.
     */
    initWithChapters(params: OPFItemParam[], doc?: Document | null): Task.Result<any>;
    initWithWebPubManifest(manifestObj: Base.JSON, doc?: Document, manifestUrl?: string): Task.Result<boolean>;
    /**
     * @return cfi
     */
    getCFI(spineIndex: number, offsetInItem: number): Task.Result<string | null>;
    resolveFragment(fragstr: string | null): Task.Result<Position | null>;
    resolveEPage(epage: number): Task.Result<Position | null>;
    getEPageFromPosition(position: Position): Task.Result<number>;
}
export declare type PageAndPosition = {
    page: Vtree.Page;
    position: Position;
};
export declare const makePageAndPosition: (page: Vtree.Page, pageIndex: number) => PageAndPosition;
export declare type OPFViewItem = {
    item: OPFItem;
    xmldoc: XmlDoc.XMLDocHolder;
    instance: OPS.StyleInstance;
    layoutPositions: Vtree.LayoutPosition[];
    pages: Vtree.Page[];
    complete: boolean;
};
export declare class OPFView implements Vgen.CustomRendererFactory {
    readonly opf: OPFDoc;
    readonly viewport: Vgen.Viewport;
    readonly fontMapper: Font.Mapper;
    readonly pageSheetSizeReporter: (p1: {
        width: number;
        height: number;
    }, p2: {
        [key: string]: {
            width: number;
            height: number;
        };
    }, p3: number, p4: number) => any;
    spineItems: OPFViewItem[];
    spineItemLoadingContinuations: Task.Continuation<any>[][];
    pref: Exprs.Preferences;
    clientLayout: Vgen.DefaultClientLayout;
    counterStore: Counters.CounterStore;
    tocAutohide: boolean;
    tocView?: Toc.TOCView;
    constructor(opf: OPFDoc, viewport: Vgen.Viewport, fontMapper: Font.Mapper, pref: Exprs.Preferences, pageSheetSizeReporter: (p1: {
        width: number;
        height: number;
    }, p2: {
        [key: string]: {
            width: number;
            height: number;
        };
    }, p3: number, p4: number) => any);
    private getPage;
    getCurrentPageProgression(position: Position): Constants.PageProgression | null;
    private finishPageContainer;
    /**
     * Render a single page. If the new page contains elements with ids that are
     * referenced from other pages by 'target-counter()', those pages are rendered
     * too (calling `renderSinglePage` recursively).
     */
    private renderSinglePage;
    private normalizeSeekPosition;
    /**
     * Find a page corresponding to a specified position among already laid out
     * pages.
     * @param sync If true, find the page synchronously (not waiting another
     *     rendering task)
     */
    private findPage;
    /**
     * Renders a page at the specified position.
     */
    renderPage(position: Position): Task.Result<PageAndPosition | null>;
    renderAllPages(): Task.Result<PageAndPosition | null>;
    /**
     * Render pages from (spineIndex=0, pageIndex=0) to the specified (spineIndex,
     * pageIndex).
     * @param notAllPages If true, render from biginning of specified spine item.
     */
    renderPagesUpto(position: Position, notAllPages: boolean): Task.Result<PageAndPosition | null>;
    /**
     * Move to the first page and render it.
     */
    firstPage(position: Position, sync: boolean): Task.Result<PageAndPosition | null>;
    /**
     * Move to the last page and render it.
     */
    lastPage(position: Position, sync: boolean): Task.Result<PageAndPosition | null>;
    /**
     * Move to the next page position and render page.
     * @param sync If true, get the page synchronously (not waiting another
     *     rendering task)
     */
    nextPage(position: Position, sync: boolean): Task.Result<PageAndPosition | null>;
    /**
     * Move to the previous page and render it.
     */
    previousPage(position: Position, sync: boolean): Task.Result<PageAndPosition | null>;
    /**
     * @param page This page should be a currently displayed page.
     */
    private isRectoPage;
    /**
     * Get a spread containing the currently displayed page.
     * @param sync If true, get the spread synchronously (not waiting another
     *     rendering task)
     */
    getSpread(position: Position, sync: boolean): Task.Result<Vtree.Spread>;
    /**
     * Move to the next spread and render pages.
     * @param sync If true, get the spread synchronously (not waiting another
     *     rendering task)
     * @returns The 'verso' page of the next spread.
     */
    nextSpread(position: Position, sync: boolean): Task.Result<PageAndPosition | null>;
    /**
     * Move to the previous spread and render pages.
     * @returns The 'recto' page of the previous spread.
     */
    previousSpread(position: Position, sync: boolean): Task.Result<PageAndPosition | null>;
    /**
     * Move to the epage specified by the given number (zero-based) and render it.
     */
    navigateToEPage(epage: number, position: Position, sync: boolean): Task.Result<PageAndPosition | null>;
    /**
     * Move to the page specified by the given CFI and render it.
     */
    navigateToFragment(fragment: string, position: Position, sync: boolean): Task.Result<PageAndPosition | null>;
    /**
     * Move to the page specified by the given URL and render it.
     */
    navigateTo(href: string, position: Position, sync: boolean): Task.Result<PageAndPosition | null>;
    makePage(viewItem: OPFViewItem, pos: Vtree.LayoutPosition): Vtree.Page;
    makeObjectView(xmldoc: XmlDoc.XMLDocHolder, srcElem: Element, viewParent: Element, computedStyle: {
        [key: string]: Css.Val;
    }): Task.Result<Element>;
    makeMathJaxView(xmldoc: XmlDoc.XMLDocHolder, srcElem: Element, viewParent: Element, computedStyle: {
        [key: string]: Css.Val;
    }): Task.Result<Element>;
    private resolveURLsInMathML;
    /** @override */
    makeCustomRenderer(xmldoc: XmlDoc.XMLDocHolder): Vgen.CustomRenderer;
    getPageViewItem(spineIndex: number): Task.Result<OPFViewItem>;
    removeRenderedPages(): void;
    /**
     * Returns if at least one page has 'auto' size
     */
    hasAutoSizedPages(): boolean;
    hasPages(): boolean;
    showTOC(autohide: boolean): Task.Result<Vtree.Page>;
    hideTOC(): void;
    isTOCVisible(): boolean;
}
export interface RenderSinglePageResult {
    pageAndPosition: PageAndPosition;
    nextLayoutPosition: Vtree.LayoutPosition;
}
