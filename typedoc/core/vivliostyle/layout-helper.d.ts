import { Layout, Vtree } from "./types";
/**
 * Though method used to be used as a workaround for Chrome bug, it seems that
 * the bug has been already fixed:
 *   https://bugs.chromium.org/p/chromium/issues/detail?id=297808
 * We now use this method as a workaround for Firefox bug:
 *   https://bugzilla.mozilla.org/show_bug.cgi?id=1159309
 */
export declare function fixBoxesForNode(clientLayout: Vtree.ClientLayout, boxes: Vtree.ClientRect[], node: Node): Vtree.ClientRect[];
/**
 * Calculate the position of the "after" edge in the block-progression
 * dimension. Return 0 if position was determined successfully and return
 * non-zero if position could not be determined and the node should be
 * considered zero-height.
 */
export declare function calculateEdge(nodeContext: Vtree.NodeContext, clientLayout: Vtree.ClientLayout, extraOffset: number, vertical: boolean): number;
export declare function getElementHeight(element: Element, column: Layout.Column, vertical: boolean): number;
export declare function isOrphan(node: Node): boolean;
export declare function removeFollowingSiblings(parentNode: Node, viewNode: Node): void;
export declare function isSpecial(e: Element): boolean;
export declare function isSpecialNodeContext(nodeContext: Vtree.NodeContext): boolean;
export declare function isSpecialInlineDisplay(display: string): boolean;
export declare function findAncestorSpecialInlineNodeContext(nodeContext: Vtree.NodeContext): Vtree.NodeContext | null;
