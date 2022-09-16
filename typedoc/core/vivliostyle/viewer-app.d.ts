import * as Base from "./base";
import * as Constants from "./constants";
export declare let fontSize: number;
export declare let touchActive: boolean;
export declare let touchX: number;
export declare let touchY: number;
export declare let zoomActive: boolean;
export declare let pinchDist: number;
export declare let currentPageProgression: Constants.PageProgression;
export declare function sendCommand(cmd: Base.JSON): void;
export declare function navigateToLeftPage(): void;
export declare function navigateToRightPage(): void;
export declare function keydown(evt: KeyboardEvent): void;
export declare function touch(evt: TouchEvent): void;
export declare function callback(msg: Base.JSON): void;
export declare function main(arg: any): void;
export declare const viewerapp: {
    main: typeof main;
};
