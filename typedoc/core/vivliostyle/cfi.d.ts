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
 * @fileoverview Cfi - Support for EPUB Canonical Fragment Identifiers.
 */
import * as Base from "./base";
export declare type Position = {
    node: Node;
    offset: number;
    after: boolean;
    sideBias: string | null;
    ref: Fragment;
};
export declare function getId(node: Node): string | null;
export declare function escapeChar(ch: string): string;
export declare function escape(str: string): string;
export declare function unescapeChar(str: string): string;
export declare function unescape(str: string): string;
export declare function parseExtVal(extstr: string): string | string[];
export declare function parseExt(extstr: string): {
    [key: string]: string | string[];
};
export interface Step {
    appendTo(sb: Base.StringBuffer): void;
    applyTo(pos: Position): boolean;
}
export declare class RefStep implements Step {
    appendTo(sb: Base.StringBuffer): void;
    /** @override */
    applyTo(pos: Position): boolean;
}
export declare class ChildStep implements Step {
    readonly index: number;
    readonly id: string | null;
    readonly sideBias: string | null;
    constructor(index: number, id: string | null, sideBias: string | null);
    /** @override */
    appendTo(sb: Base.StringBuffer): void;
    /** @override */
    applyTo(pos: Position): boolean;
}
export declare class OffsetStep implements Step {
    readonly offset: number;
    readonly textBefore: string | null;
    readonly textAfter: string | null;
    readonly sideBias: string | null;
    constructor(offset: number, textBefore: string | null, textAfter: string | null, sideBias: string | null);
    applyTo(pos: Position): boolean;
    /** @override */
    appendTo(sb: Base.StringBuffer): void;
}
export declare class Fragment {
    steps: Step[];
    fromString(fragstr: string): void;
    navigate(doc: Document): Position;
    trim(text: string, after: boolean): string;
    /**
     * Initialize from a node and an offset.
     */
    prependPathFromNode(node: Node, offset: number, after: boolean, sideBias: string | null): void;
    toString(): string;
}
