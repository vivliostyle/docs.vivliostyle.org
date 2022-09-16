export interface PrintConfig {
    title: string;
    printCallback: (iframeWin: Window) => void;
    hideIframe: boolean;
    removeIframe: boolean;
}
export declare function printHTML(htmlDoc: string, config: PrintConfig): void;
