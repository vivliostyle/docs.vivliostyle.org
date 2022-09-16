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
 * @fileoverview Diff utility
 */
export declare type Change = (number | string)[];
export declare function diffChars(originalText: string, newText: string): Change[];
export declare function restoreOriginalText(changes: Change[]): string;
export declare function restoreNewText(changes: Change[]): string;
export declare function resolveNewIndex(changes: Change[], oldIndex: number): number;
export declare function resolveOriginalIndex(changes: Change[], newIndex: number): number;
export declare function resolveIndex(changes: Change[], index: number, coef: number): number;
