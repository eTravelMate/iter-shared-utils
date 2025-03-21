"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getlogger = void 0;
const pino_1 = __importDefault(require("pino"));
const rotating_file_stream_1 = require("rotating-file-stream");
const requestContext_1 = require("./requestContext");
let logger;
const getlogger = (fileLogger_level = "info", consoleLogger_level = "info") => {
    let PinoLogLevel;
    (function (PinoLogLevel) {
        PinoLogLevel["Fatal"] = "fatal";
        PinoLogLevel["Error"] = "error";
        PinoLogLevel["Warn"] = "warn";
        PinoLogLevel["Info"] = "info";
        PinoLogLevel["Debug"] = "debug";
        PinoLogLevel["Trace"] = "trace";
        PinoLogLevel["Silent"] = "silent";
    })(PinoLogLevel || (PinoLogLevel = {}));
    ;
    const isValidLogLevel = (level) => Object.values(PinoLogLevel).includes(level);
    if (!isValidLogLevel(fileLogger_level) || !isValidLogLevel(consoleLogger_level)) {
        throw new Error("Invalid log level provided");
    }
    // Create a rotating file stream
    const stream = (0, rotating_file_stream_1.createStream)("app.log", {
        interval: "1d",
        path: "./logs",
    });
    const customTime = () => {
        const now = new Date();
        const formatted = now.toLocaleString("en-GB").replace(",", "");
        return `,"time":"${formatted}"`;
    };
    const fileLogger = (0, pino_1.default)({
        level: fileLogger_level,
        timestamp: customTime,
        formatters: {
            level: (label) => ({ level: label.toUpperCase() }),
        },
        base: null,
    }, stream);
    const consoleLogger = (0, pino_1.default)({
        level: consoleLogger_level,
        transport: {
            target: "pino-pretty",
            options: {
                colorize: true,
                translateTime: "SYS:standard",
                ignore: "pid,hostname",
            },
        },
        formatters: {
            level: (label) => ({ level: label.toUpperCase() }),
        },
    });
    const buildPrefix = (logLevel) => {
        let requestId = requestContext_1.requestContext.getRequestId();
        let serviceEndpoint = requestContext_1.requestContext.getServiceEndpoint();
        requestId = requestId ? requestId.replace(/-/g, "") : "NOREQID";
        serviceEndpoint = serviceEndpoint ? serviceEndpoint.replace(/\s+/g, "") : "NOENDPOINT";
        return `${requestId}_${serviceEndpoint}`;
    };
    logger = {
        info: (...msg) => {
            const prefix = buildPrefix("INFO");
            const message = msg.join(" ");
            fileLogger.info(`${prefix}: ${message}`);
            consoleLogger.info(`${prefix}: ${message}`);
        },
        error: (...msg) => {
            const prefix = buildPrefix("ERROR");
            const message = msg.join(" ");
            fileLogger.error(`${prefix}: ${message}`);
            consoleLogger.error(`${prefix}: ${message}`);
        },
        warn: (...msg) => {
            const prefix = buildPrefix("WARN");
            const message = msg.join(" ");
            fileLogger.warn(`${prefix}: ${message}`);
            consoleLogger.warn(`${prefix}: ${message}`);
        },
        debug: (...msg) => {
            const prefix = buildPrefix("DEBUG");
            const message = msg.join(" ");
            fileLogger.debug(`${prefix}: ${message}`);
            consoleLogger.debug(`${prefix}: ${message}`);
        },
    };
    return logger;
};
exports.getlogger = getlogger;
