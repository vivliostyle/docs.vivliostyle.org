/**
 * Copyright 2015 Trim-marks Inc.
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
 * @fileoverview Logging - Logging utility
 */
/**
 * Log level.
 * @enum {number}
 */
export declare enum LogLevel {
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4
}
export declare type ErrorInfo = {
    error: Error;
    messages: any[];
};
/**
 * Class logging error, warning, information or debug messages.
 */
export declare class Logger {
    private opt_console?;
    private listeners;
    constructor(opt_console?: Console);
    private consoleDebug;
    private consoleInfo;
    private consoleWarn;
    private consoleError;
    private triggerListeners;
    /**
     * Add a listener function invoked when a log event with the specified level
     * occurs.
     */
    addListener(level: LogLevel, listener: (p1: ErrorInfo) => void): void;
    debug(...var_args: any[]): void;
    info(...var_args: any[]): void;
    warn(...var_args: any[]): void;
    error(...var_args: any[]): void;
}
export declare const logger: Logger;
