/**
 * Copyright 2013 Google, Inc.
 * Copyright 2015 Trim-marks Inc.
 * Copyright 2019 Vivliostyle Foundation
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
 * @fileoverview Ops - Render EPUB content files by applying page masters,
 * styling and layout.
 */
import "./footnotes";
import "./table";
import * as Base from "./base";
import * as Constants from "./constants";
import * as Counters from "./counters";
import * as Css from "./css";
import * as CssCascade from "./css-cascade";
import * as CssParser from "./css-parser";
import * as CssStyler from "./css-styler";
import * as CssValidator from "./css-validator";
import * as Exprs from "./exprs";
import * as Font from "./font";
import * as GeometryUtil from "./geometry-util";
import * as Net from "./net";
import * as PageFloats from "./page-floats";
import * as CssPage from "./css-page";
import * as PageMaster from "./page-master";
import * as Task from "./task";
import * as TaskUtil from "./task-util";
import * as Vgen from "./vgen";
import * as Vtree from "./vtree";
import * as XmlDoc from "./xml-doc";
import { Layout as LayoutType } from "./types";
export declare const uaStylesheetBaseFetcher: TaskUtil.Fetcher<boolean>;
export declare function loadUABase(): Task.Result<boolean>;
export declare type FontFace = {
    properties: CssCascade.ElementStyle;
    condition: Exprs.Val;
};
export declare class Style {
    readonly store: OPSDocStore;
    readonly rootScope: Exprs.LexicalScope;
    readonly pageScope: Exprs.LexicalScope;
    readonly cascade: CssCascade.Cascade;
    readonly rootBox: PageMaster.RootPageBox;
    readonly fontFaces: FontFace[];
    readonly footnoteProps: CssCascade.ElementStyle;
    readonly flowProps: {
        [key: string]: CssCascade.ElementStyle;
    };
    readonly viewportProps: CssCascade.ElementStyle[];
    readonly pageProps: {
        [key: string]: CssCascade.ElementStyle;
    };
    fontDeobfuscator: ((p1: string) => ((p1: Blob) => Task.Result<Blob>) | null) | null;
    validatorSet: CssValidator.ValidatorSet;
    constructor(store: OPSDocStore, rootScope: Exprs.LexicalScope, pageScope: Exprs.LexicalScope, cascade: CssCascade.Cascade, rootBox: PageMaster.RootPageBox, fontFaces: FontFace[], footnoteProps: CssCascade.ElementStyle, flowProps: {
        [key: string]: CssCascade.ElementStyle;
    }, viewportProps: CssCascade.ElementStyle[], pageProps: {
        [key: string]: CssCascade.ElementStyle;
    });
    sizeViewport(viewportWidth: number, viewportHeight: number, fontSize: number, pref?: Exprs.Preferences): {
        width: number;
        height: number;
        fontSize: number;
    };
}
export declare class StyleInstance extends Exprs.Context implements CssStyler.FlowListener, PageMaster.InstanceHolder, Vgen.StylerProducer {
    readonly style: Style;
    readonly xmldoc: XmlDoc.XMLDocHolder;
    readonly viewport: Vgen.Viewport;
    readonly clientLayout: Vtree.ClientLayout;
    readonly fontMapper: Font.Mapper;
    readonly customRenderer: Vgen.CustomRenderer;
    readonly fallbackMap: {
        [key: string]: string;
    };
    readonly pageNumberOffset: number;
    readonly documentURLTransformer: Base.DocumentURLTransformer;
    readonly counterStore: Counters.CounterStore;
    lang: string | null;
    primaryFlows: {
        [key: string]: boolean;
    };
    rootPageBoxInstance: PageMaster.RootPageBoxInstance;
    styler: CssStyler.Styler;
    stylerMap: {
        [key: string]: CssStyler.Styler;
    };
    currentLayoutPosition: Vtree.LayoutPosition;
    layoutPositionAtPageStart: Vtree.LayoutPosition;
    lookupOffset: number;
    faces: Font.DocumentFaces;
    pageBoxInstances: {
        [key: string]: PageMaster.PageBoxInstance;
    };
    pageManager: CssPage.PageManager;
    private rootPageFloatLayoutContext;
    pageBreaks: {
        [key: string]: boolean;
    };
    pageProgression: Constants.PageProgression | null;
    isVersoFirstPage: boolean;
    blankPageAtStart: boolean;
    pageSheetSize: {
        [key: string]: {
            width: number;
            height: number;
        };
    };
    pageSheetHeight: number;
    pageSheetWidth: number;
    constructor(style: Style, xmldoc: XmlDoc.XMLDocHolder, defaultLang: string | null, viewport: Vgen.Viewport, clientLayout: Vtree.ClientLayout, fontMapper: Font.Mapper, customRenderer: Vgen.CustomRenderer, fallbackMap: {
        [key: string]: string;
    }, pageNumberOffset: number, documentURLTransformer: Base.DocumentURLTransformer, counterStore: Counters.CounterStore, pageProgression?: Constants.PageProgression, isVersoFirstPage?: boolean);
    init(): Task.Result<boolean>;
    private matchStartPageSide;
    /** @override */
    getStylerForDoc(xmldoc: XmlDoc.XMLDocHolder): CssStyler.AbstractStyler;
    /** @override */
    registerInstance(key: string, instance: PageMaster.PageBoxInstance): void;
    /** @override */
    lookupInstance(key: string): PageMaster.PageBoxInstance;
    /** @override */
    encounteredFlowChunk(flowChunk: Vtree.FlowChunk, flow: Vtree.Flow): void;
    evalSupportsTest(name: string, value: string, isFunc: boolean): boolean;
    getConsumedOffset(flowPosition: Vtree.FlowPosition): number;
    /**
     * @param noLookAhead Do not look ahead elements that are not styled yet
     * @return document offset of the given layoutPosition
     */
    getPosition(layoutPosition?: Vtree.LayoutPosition, noLookAhead?: boolean): number;
    dumpLocation(position: any): void;
    matchPageSide(side: string): boolean;
    updateStartSide(layoutPosition: Vtree.LayoutPosition): void;
    /**
     * @param cascadedPageStyle Cascaded page style specified in page context
     */
    selectPageMaster(cascadedPageStyle: CssCascade.ElementStyle): PageMaster.PageMasterInstance;
    flowChunkIsAfterParentFlowForcedBreak(flowChunk: Vtree.FlowChunk): boolean;
    setFormattingContextToColumn(column: LayoutType.Column, flowName: string): void;
    layoutDeferredPageFloats(column: LayoutType.Column): Task.Result<boolean>;
    getLastAfterPositionIfDeferredFloatsExists(column: LayoutType.Column, newPosition: Vtree.ChunkPosition | null): Vtree.ChunkPosition | null;
    /**
     * @return holding true
     */
    layoutColumn(column: LayoutType.Column, flowName: string): Task.Result<boolean>;
    createLayoutConstraint(pageFloatLayoutContext: PageFloats.PageFloatLayoutContext): LayoutType.LayoutConstraint;
    private createAndLayoutColumn;
    setPagePageFloatLayoutContextContainer(pagePageFloatLayoutContext: PageFloats.PageFloatLayoutContext, boxInstance: PageMaster.PageBoxInstance, layoutContainer: Vtree.Container): void;
    getRegionPageFloatLayoutContext(pagePageFloatLayoutContext: PageFloats.PageFloatLayoutContext, boxInstance: PageMaster.PageBoxInstance, layoutContainer: Vtree.Container, flowName: string): PageFloats.PageFloatLayoutContext;
    layoutFlowColumnsWithBalancing(page: Vtree.Page, boxInstance: PageMaster.PageBoxInstance, offsetX: number, offsetY: number, exclusions: GeometryUtil.Shape[], pagePageFloatLayoutContext: PageFloats.PageFloatLayoutContext, layoutContainer: Vtree.Container, flowNameStr: string, columnCount: number): Task.Result<LayoutType.Column[]>;
    layoutFlowColumns(page: Vtree.Page, boxInstance: PageMaster.PageBoxInstance, offsetX: number, offsetY: number, exclusions: GeometryUtil.Shape[], pagePageFloatLayoutContext: PageFloats.PageFloatLayoutContext, regionPageFloatLayoutContext: PageFloats.PageFloatLayoutContext, layoutContainer: Vtree.Container, flowNameStr: string, columnCount: number, forceNonFitting: boolean): Task.Result<LayoutType.Column[] | null>;
    /**
     * @return holding true
     */
    layoutContainer(page: Vtree.Page, boxInstance: PageMaster.PageBoxInstance, parentContainer: HTMLElement, offsetX: number, offsetY: number, exclusions: GeometryUtil.Shape[], pagePageFloatLayoutContext: PageFloats.PageFloatLayoutContext): Task.Result<boolean>;
    processLinger(): void;
    initLingering(): void;
    noMorePrimaryFlows(cp: Vtree.LayoutPosition): boolean;
    layoutNextPage(page: Vtree.Page, cp?: Vtree.LayoutPosition): Task.Result<Vtree.LayoutPosition>;
    /**
     * Set actual page width, height and bleed from style specified in page
     * context.
     */
    private setPageSizeAndBleed;
}
export declare class BaseParserHandler extends CssCascade.CascadeParserHandler {
    masterHandler: StyleParserHandler;
    insideRegion: boolean;
    constructor(masterHandler: StyleParserHandler, condition: Exprs.Val, parent: BaseParserHandler, regionId: string | null);
    startPageTemplateRule(): void;
    startPageMasterRule(name: string | null, pseudoName: string | null, classes: string[]): void;
    startWhenRule(expr: Css.Expr): void;
    startDefineRule(): void;
    startFontFaceRule(): void;
    startFlowRule(flowName: string): void;
    startViewportRule(): void;
    startFootnoteRule(pseudoelem: string | null): void;
    startRegionRule(): void;
    startPageRule(): void;
    startRuleBody(): void;
}
export declare function processViewportMeta(meta: Element): string;
export declare class StyleParserHandler extends CssParser.DispatchParserHandler {
    readonly validatorSet: CssValidator.ValidatorSet;
    rootScope: Exprs.LexicalScope;
    pageScope: Exprs.LexicalScope;
    rootBox: PageMaster.RootPageBox;
    cascadeParserHandler: BaseParserHandler;
    regionCount: number;
    fontFaces: FontFace[];
    footnoteProps: CssCascade.ElementStyle;
    flowProps: {
        [key: string]: CssCascade.ElementStyle;
    };
    viewportProps: CssCascade.ElementStyle[];
    pageProps: {
        [key: string]: CssCascade.ElementStyle;
    };
    constructor(validatorSet: CssValidator.ValidatorSet);
}
export declare type StyleSource = {
    url: string;
    text: string | null;
    flavor: CssParser.StylesheetFlavor;
    classes: string | null;
    media: string | null;
};
export declare function parseOPSResource(response: Net.Response, store: XmlDoc.XMLDocStore): Task.Result<XmlDoc.XMLDocHolder>;
export declare class OPSDocStore extends Net.ResourceStore<XmlDoc.XMLDocHolder> {
    fontDeobfuscator: ((p1: string) => ((p1: Blob) => Task.Result<Blob>) | null) | null;
    styleByKey: {
        [key: string]: Style;
    };
    styleFetcherByKey: {
        [key: string]: TaskUtil.Fetcher<Style>;
    };
    styleByDocURL: {
        [key: string]: Style;
    };
    triggersByDocURL: {
        [key: string]: Vtree.Trigger[];
    };
    validatorSet: CssValidator.ValidatorSet;
    private styleSheets;
    private triggerSingleDocumentPreprocessing;
    constructor(fontDeobfuscator: ((p1: string) => ((p1: Blob) => Task.Result<Blob>) | null) | null);
    init(authorStyleSheets: {
        url: string | null;
        text: string | null;
    }[] | null, userStyleSheets: {
        url: string | null;
        text: string | null;
    }[] | null): Task.Result<boolean>;
    getStyleForDoc(xmldoc: XmlDoc.XMLDocHolder): Style;
    getTriggersForDoc(xmldoc: XmlDoc.XMLDocHolder): Vtree.Trigger[];
    /**
     * Set author stylesheets and user stylesheets. Existing style sheets are
     * removed.
     */
    private setStyleSheets;
    private clearStyleSheets;
    private addAuthorStyleSheet;
    private addUserStyleSheet;
    parseOPSResource(response: Net.Response): Task.Result<XmlDoc.XMLDocHolder>;
}
