import { getlogger } from "./pinoLogger";

const FILE_LOGGER_LEVEL = process.env.FILE_LOGGER_LEVEL;
const CONSOLE_LOGGER_LEVEL = process.env.CONSOLE_LOGGER_LEVEL;

const logger = getlogger(FILE_LOGGER_LEVEL, CONSOLE_LOGGER_LEVEL);

// Override console.log
console.log = function (...args: any) {
   // Convert all arguments into a single string
   const message = args.map((arg: any) =>
    typeof arg === "object" ? JSON.stringify(arg) : String(arg)
  ).join(" ");

  logger.info(message);
};

// Override console.error
console.error = function (...args: any) {
  // Convert all arguments into a single string
  const message = args.map((arg: any) =>
   typeof arg === "object" ? JSON.stringify(arg) : String(arg)
 ).join(" ");

 logger.error(message);
};

// Override console.warn
console.warn = function (...args: any) {
  // Convert all arguments into a single string
  const message = args.map((arg: any) =>
   typeof arg === "object" ? JSON.stringify(arg) : String(arg)
 ).join(" ");

 logger.warn(message);
};

export {}