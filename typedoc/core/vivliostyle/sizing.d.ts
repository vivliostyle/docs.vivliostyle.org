import * as Vtree from "./vtree";
/**
 * Box sizes defined in css-sizing.
 * @enum {string}
 */
export declare enum Size {
    FILL_AVAILABLE_INLINE_SIZE = "fill-available inline size",
    FILL_AVAILABLE_BLOCK_SIZE = "fill-available block size",
    FILL_AVAILABLE_WIDTH = "fill-available width",
    FILL_AVAILABLE_HEIGHT = "fill-available height",
    MAX_CONTENT_INLINE_SIZE = "max-content inline size",
    MAX_CONTENT_BLOCK_SIZE = "max-content block size",
    MAX_CONTENT_WIDTH = "max-content width",
    MAX_CONTENT_HEIGHT = "max-content height",
    MIN_CONTENT_INLINE_SIZE = "min-content inline size",
    MIN_CONTENT_BLOCK_SIZE = "min-content block size",
    MIN_CONTENT_WIDTH = "min-content width",
    MIN_CONTENT_HEIGHT = "min-content height",
    FIT_CONTENT_INLINE_SIZE = "fit-content inline size",
    FIT_CONTENT_BLOCK_SIZE = "fit-content block size",
    FIT_CONTENT_WIDTH = "fit-content width",
    FIT_CONTENT_HEIGHT = "fit-content height"
}
/**
 * Get specified sizes for the element.
 */
export declare function getSize(clientLayout: Vtree.ClientLayout, element: Element, sizes: Size[]): {
    [key in Size]: number;
};
