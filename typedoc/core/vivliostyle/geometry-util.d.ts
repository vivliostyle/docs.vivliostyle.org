export declare class Rect {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    constructor(x1: number, y1: number, x2: number, y2: number);
}
export declare class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
export declare class Insets {
    left: number;
    top: number;
    right: number;
    bottom: number;
    constructor(left: number, top: number, right: number, bottom: number);
}
export declare class Segment {
    low: Point;
    high: Point;
    winding: number;
    shapeId: number;
    constructor(low: Point, high: Point, winding: number, shapeId: number);
}
/**
 * A single band for exclusion result. Left float is from the left box edge
 * to x1. Right float is from x2 to the right box edge.
 */
export declare class Band {
    y1: number;
    y2: number;
    x1: number;
    x2: number;
    /** Left float. */
    left: Element | null;
    /** Right float. */
    right: Element | null;
    constructor(y1: number, y2: number, x1: number, x2: number);
}
export declare function segmentCompare(s1: Segment, s2: Segment): number;
export declare class Shape {
    points: Point[];
    constructor(points: Point[]);
    /**
     * Converts this shape to a sequence of Segments and adds segments to the
     * given array.
     * @param arr array to add segments.
     * @param id shapeId to write into segments.
     */
    addSegments(arr: Segment[], id: number): void;
    withOffset(offsetX: number, offsetY: number): Shape;
}
export declare function shapeForEllipse(cx: number, cy: number, rx: number, ry: number): Shape;
export declare function shapeForRect(x1: number, y1: number, x2: number, y2: number): Shape;
export declare function shapeForRectObj(r: Rect): Shape;
export declare class BandIntersection {
    x: number;
    winding: number;
    shapeId: number;
    lowOrHigh: number;
    constructor(x: number, winding: number, shapeId: number, lowOrHigh: number);
}
export declare function intersectY(s: Segment, y: number): number;
export declare function addBandIntersections(intersections: BandIntersection[], s: Segment, y1: number, y2: number): void;
export declare function mergeIntersections(intersections: BandIntersection[], includeCount: number, excludeCount: number): number[];
/**
 * Round v up to make it a multiple of unit. If unit is zero, return v.
 */
export declare function ceil(v: number, unit: number): number;
/**
 * Round v down to make it a multiple of unit. If unit is zero, return v.
 */
export declare function floor(v: number, unit: number): number;
export declare function rotatePoint(point: Point): Point;
/**
 * Vertical box to pseudo-horizontal coords.
 */
export declare function rotateBox(box: Rect): Rect;
/**
 * Pseudo-horizontal coords to vertical.
 */
export declare function unrotateBox(box: Rect): Rect;
export declare function rotateShape(shape: Shape): Shape;
export declare function shapesToBands(box: Rect, include: Shape[], exclude: Shape[], granularity: number, snapHeight: number, vertical: boolean): Band[];
export declare function normalize(box: Rect, bands: Band[]): void;
/**
 * Find the index of the bottommost band so that y < band.y2
 */
export declare function findBand(bands: Band[], y: number): number;
/**
 * Find the uppermost rectangle contained in the specified rect which occupies
 * full width of the rect without overlapping with any band in the specified
 * bands.
 * @returns Returns null if such rectangle does not exist.
 */
export declare function findUppermostFullyOpenRect(bands: Band[], rect: Rect): Rect | null;
/**
 * Find the bottommost rectangle contained in the specified rect which occupies
 * full width of the rect without overlapping with any band in the specified
 * bands.
 * @returns Returns null if such rectangle does not exist.
 */
export declare function findBottommostFullyOpenRect(bands: Band[], rect: Rect): Rect | null;
/**
 * @param side either "left" or "right"
 */
export declare function positionFloat(box: Rect, bands: Band[], floatBox: Rect, side: string): boolean;
export declare function addFloatToBands(box: Rect, bands: Band[], floatBox: Rect, floatBands: Band[], side: string): void;
