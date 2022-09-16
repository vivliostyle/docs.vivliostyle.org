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
 * @fileoverview Toc - Table of Contents view.
 */
import * as Base from "./base";
import * as Counters from "./counters";
import * as Exprs from "./exprs";
import * as Font from "./font";
import * as OPS from "./ops";
import * as Task from "./task";
import * as Vgen from "./vgen";
import * as Vtree from "./vtree";
import * as XmlDoc from "./xml-doc";
export declare const bulletClosed = "\u25B8";
export declare const bulletOpen = "\u25BE";
export declare const bulletEmpty = "\u25B9";
export declare type TOCItem = {
    id: string;
    title: string;
    children: TOCItem[];
};
export declare class TOCView implements Vgen.CustomRendererFactory {
    readonly store: OPS.OPSDocStore;
    readonly url: string;
    readonly lang: string | null;
    readonly clientLayout: Vtree.ClientLayout;
    readonly fontMapper: Font.Mapper;
    readonly rendererFactory: Vgen.CustomRendererFactory;
    readonly fallbackMap: {
        [key: string]: string;
    };
    readonly documentURLTransformer: Base.DocumentURLTransformer;
    readonly counterStore: Counters.CounterStore;
    pref: Exprs.Preferences;
    page: Vtree.Page;
    instance: OPS.StyleInstance;
    constructor(store: OPS.OPSDocStore, url: string, lang: string | null, clientLayout: Vtree.ClientLayout, fontMapper: Font.Mapper, pref: Exprs.Preferences, rendererFactory: Vgen.CustomRendererFactory, fallbackMap: {
        [key: string]: string;
    }, documentURLTransformer: Base.DocumentURLTransformer, counterStore: Counters.CounterStore);
    setAutoHeight(elem: Element, depth: number): void;
    /** @override */
    makeCustomRenderer(xmldoc: XmlDoc.XMLDocHolder): Vgen.CustomRenderer;
    showTOC(elem: HTMLElement, viewport: Vgen.Viewport, width: number, height: number, fontSize: number): Task.Result<Vtree.Page>;
    hideTOC(): void;
    isTOCVisible(): boolean;
    getTOC(): TOCItem[];
}
export declare function toggleNodeExpansion(evt: Event): void;
