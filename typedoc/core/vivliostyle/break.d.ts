/**
 * Copyright 2016 Trim-marks Inc.
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
 * @fileoverview Break - Control fragmentation.
 */
import * as Css from "./css";
/**
 * Convert old page-break-* properties to break-* properties with appropriate
 * values as specified by CSS Fragmentation module:
 * https://drafts.csswg.org/css-break/#page-break-properties
 */
export declare function convertPageBreakAliases(original: {
    name: string;
    value: Css.Val;
    important: boolean;
}): {
    name: string;
    value: Css.Val;
    important: boolean;
};
export declare const forcedBreakValues: {
    [key: string]: boolean | null;
};
/**
 * Returns if the value is one of the forced break values.
 * @param value The break value to be judged. Treats null as 'auto'.
 */
export declare function isForcedBreakValue(value: string | null): boolean;
export declare const spreadBreakValues: {
    [key: string]: boolean | null;
};
/**
 * Returns if the value is one of left/right/recto/verso values.
 * @param value The break value to be judged. Treats null as 'auto'.
 */
export declare function isSpreadBreakValue(value: string | null): boolean;
export declare const avoidBreakValues: {
    [key: string]: boolean | null;
};
/**
 * Returns if the value is one of the avoid break values.
 * @param value The break value to be judged. Treats null as 'auto'.
 */
export declare function isAvoidBreakValue(value: string | null): boolean;
/**
 * Resolves the effective break value given two break values at a single break
 * point. The order of the arguments are relevant, since a value specified on
 * the latter element takes precedence over one on the former. A forced break
 * value is chosen if present. Otherwise, an avoid break value is chosen if
 * present. See CSS Fragmentation Module for the rule:
 *  https://drafts.csswg.org/css-break/#forced-breaks
 *  https://drafts.csswg.org/css-break/#unforced-breaks
 * Note that though the spec requires to honor multiple break values at a single
 * break point, the current implementation choose one of them and discard the
 * others.
 * @param first The break value specified on the former element. null means
 *     'auto' (not specified)
 * @param second The break value specified on the latter element. null means
 *     'auto' (not specified)
 */
export declare function resolveEffectiveBreakValue(first: string | null, second: string | null): string | null;
export declare function breakValueToStartSideValue(breakValue: string | null): string;
export declare function startSideValueToBreakValue(startSideValue: string): string | null;
