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
 * @fileoverview CssProp - Support utilities to extract information
 * from various (parsed) CSS values.
 */
import * as Base from "./base";
import * as Css from "./css";
import * as Exprs from "./exprs";
import * as GeometryUtil from "./geometry-util";
export declare class SetVisitor extends Css.Visitor {
    propSet: {
        [key: string]: boolean;
    };
    constructor();
    visitIdent(ident: Css.Ident): Css.Val;
    visitSpaceList(list: Css.SpaceList): Css.Val;
}
export declare function toSet(val: Css.Val): {
    [key: string]: boolean;
};
export declare class IntVisitor extends Css.Visitor {
    value: number;
    constructor(value: number);
    visitInt(num: Css.Int): Css.Val;
}
export declare function toInt(val: Css.Val, def: number): number;
export declare class ShapeVisitor extends Css.Visitor {
    collect: boolean;
    coords: Css.Numeric[];
    name: string | null;
    constructor();
    visitNumeric(numeric: Css.Numeric): Css.Val;
    visitNum(num: Css.Num): Css.Val;
    visitSpaceList(list: Css.SpaceList): Css.Val;
    visitFunc(func: Css.Func): Css.Val;
    getShape(x: number, y: number, width: number, height: number, context: Exprs.Context): GeometryUtil.Shape;
}
export declare function toShape(val: Css.Val, x: number, y: number, width: number, height: number, context: Exprs.Context): GeometryUtil.Shape;
export declare class CountersVisitor extends Css.Visitor {
    readonly reset: boolean;
    counters: {
        [key: string]: number;
    };
    name: string | null;
    constructor(reset: boolean);
    visitIdent(ident: Css.Ident): Css.Val;
    visitInt(num: Css.Int): Css.Val;
    visitSpaceList(list: Css.SpaceList): Css.Val;
}
export declare function toCounters(val: Css.Val, reset: boolean): {
    [key: string]: number;
};
export declare class UrlTransformVisitor extends Css.FilterVisitor {
    baseUrl: string;
    transformer: Base.DocumentURLTransformer;
    constructor(baseUrl: string, transformer: Base.DocumentURLTransformer);
    visitURL(url: Css.URL): Css.Val;
}
