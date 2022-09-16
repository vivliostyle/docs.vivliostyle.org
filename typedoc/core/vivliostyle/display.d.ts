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
 * @fileoverview Display - CSS Display Module
 */
import * as Css from "./css";
export declare const FLOW_ROOT_ATTR = "data-vivliostyle-flow-root";
export declare function isFlowRoot(element: Element): boolean;
/**
 * 'Blockify' a display value.
 * cf. https://drafts.csswg.org/css-display/#transformations
 *     https://drafts.csswg.org/css2/visuren.html#dis-pos-flo
 */
export declare function blockify(display: Css.Ident): Css.Ident;
/**
 * Judge if the generated box is absolutely positioned.
 */
export declare function isAbsolutelyPositioned(position: Css.Ident): boolean;
/**
 * Get computed values of display, position and float.
 * cf. https://drafts.csswg.org/css-display/#transformations
 *     https://drafts.csswg.org/css2/visuren.html#dis-pos-flo
 */
export declare function getComputedDislayValue(display: Css.Ident, position: Css.Ident, float: Css.Ident, isRoot: boolean): {
    display: Css.Ident;
    position: Css.Ident;
    float: Css.Ident;
};
/**
 * Judges if the generated box is block.
 */
export declare function isBlock(display: Css.Ident, position: Css.Ident, float: Css.Ident, isRoot: boolean): boolean;
export declare function isInlineLevel(display: Css.Ident | string): boolean;
export declare function isRubyInternalDisplay(display: Css.Ident | string): boolean;
/**
 * Judges if the generated box establishes a new block formatting context.
 */
export declare function establishesBFC(display: Css.Ident, position: Css.Ident, float: Css.Ident, overflow: Css.Ident, writingMode?: Css.Ident, parentWritingMode?: Css.Ident, isFlowRoot?: boolean): boolean;
/**
 * Judges if the generated box establishes a containing block for descendant
 * boxes with 'position: absolute'.
 */
export declare function establishesCBForAbsolute(position: Css.Ident): boolean;
