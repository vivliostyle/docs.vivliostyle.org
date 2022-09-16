import * as Net from "./net";
import * as Task from "./task";
import { XmlDoc } from "./types";
export declare type XMLDocStore = XmlDoc.XMLDocStore;
export declare class XMLDocHolder implements XmlDoc.XMLDocHolder {
    readonly store: XMLDocStore;
    readonly url: string;
    readonly document: Document;
    lang: string | null;
    totalOffset: number;
    root: Element;
    body: Element;
    head: Element;
    last: Element;
    lastOffset: number;
    idMap: {
        [key: string]: Element;
    };
    constructor(store: XMLDocStore, url: string, document: Document);
    doc(): XmlDoc.NodeList;
    getElementOffset(element: Element): number;
    getNodeOffset(srcNode: Node, offsetInNode: number, after: boolean): number;
    getTotalOffset(): number;
    /**
     * @return last node such that its offset is less or equal to the given
     */
    getNodeByOffset(offset: number): Node;
    private buildIdMap;
    /**
     * Get element by URL in the source document(s). URL must be in either '#id'
     * or 'url#id' form.
     */
    getElement(url: string): Element | null;
}
/**
 * cf. https://w3c.github.io/DOM-Parsing/#the-domparser-interface
 * @enum {string}
 */
export declare enum DOMParserSupportedType {
    TEXT_HTML = "text/html",
    TEXT_XML = "text/xml",
    APPLICATION_XML = "application/xml",
    APPLICATION_XHTML_XML = "application/xhtml+xml",
    IMAGE_SVG_XML = "image/svg+xml"
}
/**
 * Parses a string with a DOMParser and returns the document.
 * If a parse error occurs, return null.
 */
export declare function parseAndReturnNullIfError(str: string, type: string, opt_parser?: DOMParser): Document | null;
/**
 * @returns null if contentType cannot be inferred from HTTP header and file
 *     extension
 */
export declare function resolveContentType(response: Net.Response): string | null;
export declare function parseXMLResource(response: Net.Response, store: XMLDocStore): Task.Result<XmlDoc.XMLDocHolder>;
export declare function newXMLDocStore(): XMLDocStore;
export declare class Predicate implements XmlDoc.Predicate {
    readonly fn: (p1: Node) => boolean;
    constructor(fn: (p1: Node) => boolean);
    check(node: Node): boolean;
    withAttribute(name: string, value: string): Predicate;
    withChild(name: string, opt_childPredicate?: Predicate): Predicate;
}
export declare const predicate: Predicate;
export declare class NodeList implements XmlDoc.NodeList {
    readonly nodes: Node[];
    constructor(nodes: Node[]);
    asArray(): Node[];
    size(): number;
    /**
     * Filter with predicate
     */
    predicate(pr: Predicate): NodeList;
    forEachNode(fn: (p1: Node, p2: (p1: Node) => void) => void): NodeList;
    /**
     * @template T
     */
    forEach<T>(fn: (p1: Node) => T): T[];
    /**
     * @template T
     */
    forEachNonNull<T>(fn: (p1: Node) => T): T[];
    child(tag: string): NodeList;
    childElements(): NodeList;
    attribute(name: string): (string | null)[];
    textContent(): (string | null)[];
}
