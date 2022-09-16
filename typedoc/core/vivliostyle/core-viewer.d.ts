/**
 * Copyright 2015 Trim-marks Inc.
 * Copyright 2018 Vivliostyle Foundation
 *
 * Vivliostyle.js is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Vivliostyle.js is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Vivliostyle.js.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @fileoverview CoreViewer - Vivliostyle CoreViewer class
 */
import * as AdaptiveViewer from "./adaptive-viewer";
import * as Constants from "./constants";
import * as Epub from "./epub";
import * as Toc from "./toc";
export interface Payload {
    type: string;
    internal: boolean;
    href: string;
    content: string;
    cfi: string;
    first: boolean;
    last: boolean;
    epage: number;
    epageCount: number;
    metadata: unknown;
    docTitle: string;
}
/**
 * Viewer settings that must be passed to Viewer's constructor.
 * - userAgentRootURL: URL of a directory from which viewer resource files
 *   (under resources/ directory in the source repository) are served.
 * - viewportElement: An element used as the viewport of the displayed contents.
 * - window: Window object. If omitted, current `window` is used.
 * - debug: Debug flag.
 */
export declare type CoreViewerSettings = {
    userAgentRootURL?: string;
    viewportElement: HTMLElement;
    window?: Window;
    debug?: boolean;
};
/**
 * Viewer options that can be set after the Viewer object is constructed.
 * - autoResize: Run layout again when the window is resized. default: true
 * - fontSize: Default font size (px). default: 16
 * - pageBorderWidth: Width of a border between two pages in a single
 *   spread (px). Effective only in spread view mode. default: 1
 * - renderAllPages: Render all pages at the document load time. default: true
 * - pageViewMode: Page view mode (singlePage / spread / autoSpread).
 *   default: singlePage
 * - zoom: Zoom factor with which pages are displayed. default: 1
 * - fitToScreen: Auto adjust zoom factor to fit the screen. default: false
 * - defaultPaperSize: Default paper size in px. Effective when `@page` size
 *   is set to auto. default: undefined (means the windows size is used as
 *   paper size).
 */
export declare type CoreViewerOptions = {
    autoResize?: boolean;
    fontSize?: number;
    pageBorderWidth?: number;
    renderAllPages?: boolean;
    pageViewMode?: AdaptiveViewer.PageViewMode;
    zoom?: number;
    fitToScreen?: boolean;
    defaultPaperSize?: {
        width: number;
        height: number;
    };
    allowScripts?: boolean;
};
/**
 * Options for the displayed document.
 * - documentObject: Document object for the document. If provided, it is used
 *   directly without parsing the source again.
 * - fragment: Fragmentation identifier (EPUB CFI) of the location in the
 *   document which is to be displayed.
 * - authorStyleSheet: An array of author style sheets to be injected after all
 *   author style sheets referenced from the document. A single stylesheet may
 *   be a URL of the style sheet or a text content of the style sheet.
 * - userStyleSheet: An array of user style sheets to be injected.
 *   A single stylesheet may be a URL of the style sheet or a text content of
 *   the style sheet.
 */
export declare type DocumentOptions = {
    documentObject?: Document;
    fragment?: string;
    authorStyleSheet?: {
        url?: string;
        text?: string;
    }[];
    userStyleSheet?: {
        url?: string;
        text?: string;
    }[];
};
/**
 * Options for a single source document.
 * - url: URL of the document.
 * - startPage: If specified, the `page` page-based counter is set to the
 *   specified value on the first page of the document. It is equivalent to
 *   specifying `counter-reset: page [specified value - 1]` on that page.
 * - skipPagesBefore: If specified, the `page` page-based counter is
 *   incremented by the specified value *before* updating page-based counters
 *   on the first page of the document.
 *   This option is ignored if `startPageNumber` option is also specified.
 */
export declare type SingleDocumentOptions = string | {
    url: string;
    startPage?: number;
    skipPagesBefore?: number;
};
/**
 * Vivliostyle Viewer class.
 */
export declare class CoreViewer {
    private readonly settings;
    private initialized;
    private adaptViewer_;
    private options;
    private eventTarget;
    readyState: Constants.ReadyState;
    constructor(settings: CoreViewerSettings, opt_options?: CoreViewerOptions);
    /**
     * Set ViewerOptions to the viewer.
     */
    setOptions(options: CoreViewerOptions): void;
    private dispatcher;
    /**
     * Add a listener function, which is invoked when the specified type of event
     * is dispatched.
     * @param type Event type.
     * @param listener Listener function.
     */
    addListener(type: string, listener: (payload: Payload) => void): void;
    /**
     * Remove an event listener.
     * @param type Event type.
     * @param listener Listener function.
     */
    removeListener(type: string, listener: (payload: Payload) => void): void;
    /**
     * Load an HTML or XML document(s).
     */
    loadDocument(singleDocumentOptions: SingleDocumentOptions | SingleDocumentOptions[], opt_documentOptions?: DocumentOptions, opt_viewerOptions?: CoreViewerOptions): void;
    /**
     * Load an EPUB/WebPub publication.
     */
    loadPublication(pubUrl: string, opt_documentOptions?: DocumentOptions, opt_viewerOptions?: CoreViewerOptions): void;
    /**
     * Load an HTML or XML document, or an EPUB/WebPub publication.
     */
    private loadDocumentOrPublication;
    /**
     * Returns the current page progression of the viewer. If no document is
     * loaded, returns null.
     */
    getCurrentPageProgression(): Constants.PageProgression | null;
    private resolveNavigation;
    /**
     * Navigate to the specified page.
     */
    navigateToPage(nav: Navigation, opt_epage?: number): void;
    /**
     * Navigate to the specified internal URL.
     */
    navigateToInternalUrl(url: string): void;
    /**
     * @returns True if TOC is visible, false if hidden, null if TOC is unavailable
     */
    isTOCVisible(): boolean | null;
    /**
     * Show or hide TOC box
     * @param opt_autohide If true, automatically hide when click TOC item
     * @param opt_show If true show TOC, false hide TOC. If null or undefined toggle TOC.
     */
    showTOC(opt_show?: boolean | null, opt_autohide?: boolean): void;
    /**
     * Returns zoom factor corresponding to the specified zoom type.
     */
    queryZoomFactor(type: AdaptiveViewer.ZoomType): number;
    getPageSizes(): {
        width: number;
        height: number;
    }[];
    /**
     * Returns the current structure of the TOC once it has
     * been shown, or the empty array if there is no TOC.
     */
    getTOC(): Toc.TOCItem[];
    /**
     * Returns metadata for the publication. Metadata is
     * organized as an object of fully-qualified IRI properties
     * containing arrays of metadata entries. The first element
     * in the array is primary and should be used by default. Other
     * entries may overload or refine that metadata.
     */
    getMetadata(): Epub.Meta;
    /**
     * Returns the cover for an EPUB publication, if specified.
     */
    getCover(): Epub.OPFItem | null;
}
/**
 * @enum {string}
 */
export declare enum Navigation {
    PREVIOUS = "previous",
    NEXT = "next",
    LEFT = "left",
    RIGHT = "right",
    FIRST = "first",
    LAST = "last",
    EPAGE = "epage"
}
export declare type ZoomType = AdaptiveViewer.ZoomType;
export declare const ZoomType: typeof AdaptiveViewer.ZoomType;
export declare type PageViewMode = AdaptiveViewer.PageViewMode;
export declare const PageViewMode: typeof AdaptiveViewer.PageViewMode;
