import * as Css from "./css";
import * as CssCascade from "./css-cascade";
import * as Exprs from "./exprs";
import * as Task from "./task";
import * as TaskUtil from "./task-util";
export declare const traitProps: {
    [key: string]: Css.Val;
};
export declare const bogusFontData: string;
export declare let bogusFontCounter: number;
export declare function makeFontTraitKey(properties: {
    [key: string]: Css.Val;
}): string;
export declare function fillDefaults(properties: {
    [key: string]: Css.Val;
}): void;
export declare function prepareProperties(properties: CssCascade.ElementStyle, context: Exprs.Context): {
    [key: string]: Css.Val;
};
/**
 * A font declared in a font-face rule.
 */
export declare class Face {
    readonly properties: {
        [key: string]: Css.Val;
    };
    fontTraitKey: string;
    src: string | null;
    blobURLs: string[];
    blobs: Blob[];
    family: string | null;
    constructor(properties: {
        [key: string]: Css.Val;
    });
    /**
     * Check if font traits are the same for two font faces
     */
    traitsEqual(other: Face): boolean;
    /**
     * Create "at" font-face rule.
     */
    makeAtRule(src: string, fontBytes: Blob): string;
}
/**
 * Set of the fonts declared in all stylesheets of a document.
 * @param deobfuscator function
 *     that takes url and returns data deobfuscator
 */
export declare class DocumentFaces {
    readonly deobfuscator: ((p1: string) => ((p1: Blob) => Task.Result<Blob>) | null) | null;
    /**
     * Maps source font family names to the family names used in the HTML view.
     */
    familyMap: {
        [key: string]: string;
    };
    constructor(deobfuscator: ((p1: string) => ((p1: Blob) => Task.Result<Blob>) | null) | null);
    registerFamily(srcFace: Face, viewFace: Face): void;
    filterFontFamily(val: Css.Val): Css.Val;
}
/**
 * Object that loads fonts in a document and allocates font families for them
 * in the view document
 * @param head where to add styles in the view document (normally head element)
 * @param body where to probe text in the view document (normally body element)
 */
export declare class Mapper {
    readonly head: Element;
    readonly body: Element;
    /**
     * Maps Face.src to an entry for an already-loaded font.
     */
    srcURLMap: {
        [key: string]: TaskUtil.Fetcher<Face>;
    };
    familyPrefix: string;
    familyCounter: number;
    constructor(head: Element, body: Element, opt_familyPrefix?: string);
    getViewFontFamily(srcFace: Face, documentFaces: DocumentFaces): string;
    /**
     * @param fontBytes deobfuscated font bytes (if deobfuscation is needed)
     */
    private initFont;
    loadFont(srcFace: Face, documentFaces: DocumentFaces): TaskUtil.Fetcher<Face>;
    findOrLoadFonts(srcFaces: Face[], documentFaces: DocumentFaces): Task.Result<boolean>;
    waitFontLoading(): Task.Result<boolean>;
}
