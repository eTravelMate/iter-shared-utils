"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinoLogger_1 = require("./pinoLogger");
const FILE_LOGGER_LEVEL = process.env.FILE_LOGGER_LEVEL;
const CONSOLE_LOGGER_LEVEL = process.env.CONSOLE_LOGGER_LEVEL;
const logger = (0, pinoLogger_1.getlogger)(FILE_LOGGER_LEVEL, CONSOLE_LOGGER_LEVEL);
// Override console.log
console.log = function (...args) {
    // Convert all arguments into a single string
    const message = args.map((arg) => typeof arg === "object" ? JSON.stringify(arg) : String(arg)).join(" ");
    logger.info(message);
};
// Override console.error
console.error = function (...args) {
    // Convert all arguments into a single string
    const message = args.map((arg) => typeof arg === "object" ? JSON.stringify(arg) : String(arg)).join(" ");
    logger.error(message);
};
