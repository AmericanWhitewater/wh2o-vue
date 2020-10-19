/* eslint no-console: ["off"] */
import {configIsProductionEnvironment} from "../config";


type LogType = (...args: unknown[]) => void;

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop (){}
/**
 * @description Logger class
 * This is responsible for logging of all kind of stuff in the application
 * Default, we are using the console api for logging and this provides the
 * basic level of logging such as
 * you can use the available method of console in developement but in production
 *  these will be replaced with empty methods
 * This can be extended with the help of adding Log level functionality
 */
export class AppLogger {
    log: LogType=noop;
    debug: LogType=noop;
    info: LogType=noop;
    warn: LogType=noop;
    error: LogType=noop;
    logToServer: LogType=noop;
    /**
     * @constructor AppLogger
     */
    constructor() {
        /** Initializing the configuration of logger */
        this.initLogger();
    }
    /**
     * @description Initializing the configuration such as if environment
     * is production then all log method will be replaced with empty methods
     * except logToServer, which will be responsible for logging the important
     *  stuff on server
     */
    initLogger() {
        /** Checking the environment */
        if (!configIsProductionEnvironment()) {
            this.log = console.log.bind(console);
            this.debug = console.debug.bind(console);
            this.info = console.info.bind(console);
            this.warn = console.warn.bind(console);
            this.error = console.error.bind(console);
            this.logToServer = this.error;
        }
        else {
            /** In case of production replace the functions definition */
            // this.log = this.debug = this.info = this.warn = this.error = () => {};
            this.logToServer = err => {
                /** temp added to print in the console during production */
                console.error(err); //
                /**
                 * TODO: API integration for logging to server or any custom logic
                 * in case of Production environment
                 * */
            };
        }
    }
}

export const logger = new AppLogger()
