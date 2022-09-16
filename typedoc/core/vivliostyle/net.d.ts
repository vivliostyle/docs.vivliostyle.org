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
 * @fileoverview Net - Fetch resource from a URL.
 */
import * as Base from "./base";
import * as Task from "./task";
import * as TaskUtil from "./task-util";
import { Net, XmlDoc } from "./types";
/**
 * @enum {string}
 */
export declare enum XMLHttpRequestResponseType {
    DEFAULT = "",
    ARRAYBUFFER = "arraybuffer",
    BLOB = "blob",
    DOCUMENT = "document",
    JSON = "json",
    TEXT = "text"
}
export declare type Response = Net.Response;
export declare function ajax(url: string, opt_type?: XMLHttpRequestResponseType, opt_method?: string, opt_data?: string, opt_contentType?: string): Task.Result<Response>;
export declare function makeBlob(parts: (string | Blob | ArrayBuffer | ArrayBufferView)[], opt_type?: string): Blob;
export declare function readBlob(blob: Blob): Task.Result<ArrayBuffer>;
export declare function revokeObjectURL(url: string): void;
/**
 * @return url
 */
export declare function createObjectURL(blob: Blob): string;
/**
 * @template Resource
 */
export declare class ResourceStore<Resource> implements Net.ResourceStore<Resource> {
    readonly parser: (p1: Response, p2: ResourceStore<Resource>) => Task.Result<Resource>;
    readonly type: XMLHttpRequestResponseType;
    resources: {
        [key: string]: Resource;
    };
    fetchers: {
        [key: string]: TaskUtil.Fetcher<Resource>;
    };
    constructor(parser: (p1: Response, p2: ResourceStore<Resource>) => Task.Result<Resource>, type: XMLHttpRequestResponseType);
    /**
     * @return resource for the given URL
     */
    load(url: string, opt_required?: boolean, opt_message?: string): Task.Result<Resource>;
    private fetchInner;
    /**
     * @return fetcher for the resource for the given URL
     */
    fetch(url: string, opt_required?: boolean, opt_message?: string): TaskUtil.Fetcher<Resource>;
    get(url: string): XmlDoc.XMLDocHolder;
    delete(url: string): void;
}
export declare type JSONStore = ResourceStore<Base.JSON>;
export declare function parseJSONResource(response: Response, store: JSONStore): Task.Result<Base.JSON>;
export declare function newJSONStore(): JSONStore;
