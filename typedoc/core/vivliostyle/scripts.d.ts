import * as CssStyler from "./css-styler";
import * as Task from "./task";
/**
 * Enable or disable JavaScript in html support
 */
export declare let allowScripts: boolean;
export declare function setAllowScripts(value: boolean): void;
export declare function loadScript(srcScriptElem: HTMLScriptElement, window: Window, flags?: {
    inHead?: boolean;
    atEnd?: boolean;
    forceDefer?: boolean;
}): Task.Result<boolean>;
export declare function loadScriptsInHead(srcDocument: Document, window: Window, styler: CssStyler.Styler): Task.Result<boolean>;
export declare function loadScriptsAtEnd(window: Window): Task.Result<boolean>;
export declare function hasScripts(window: Window): boolean;
