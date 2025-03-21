import pino from "pino";
import { createStream } from "rotating-file-stream";
import { requestContext } from "./requestContext";

let logger: any;

export const getlogger = (fileLogger_level: any = "info", consoleLogger_level: any = "info") => {

  enum PinoLogLevel {
    Fatal = "fatal",
    Error = "error",
    Warn = "warn",
    Info = "info",
    Debug = "debug",
    Trace = "trace",
    Silent = "silent",
  };

  const isValidLogLevel = (level: any): level is PinoLogLevel =>
    Object.values(PinoLogLevel).includes(level);

  if (!isValidLogLevel(fileLogger_level) || !isValidLogLevel(consoleLogger_level)) {
    throw new Error("Invalid log level provided");
  }
  
  // Create a rotating file stream
  const stream = createStream("app.log", {
    interval: "1d",
    path: "./logs",
  });

  const customTime = () => {
    const now = new Date();
    const formatted = now.toLocaleString("en-GB").replace(",", "");
    return `,"time":"${formatted}"`;
  };

  const fileLogger = pino(
    {
      level: fileLogger_level,
      timestamp: customTime,
      formatters: {
        level: (label) => ({ level: label.toUpperCase() }),
      },
      base: null,
    },
    stream
  );

  const consoleLogger = pino({
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

  const buildPrefix = (logLevel: string) => {
    let requestId = requestContext.getRequestId();
    let serviceEndpoint = requestContext.getServiceEndpoint();

    requestId = requestId ? requestId.replace(/-/g, "") : "NOREQID";
    serviceEndpoint = serviceEndpoint ? serviceEndpoint.replace(/\s+/g, "") : "NOENDPOINT";

    return `${requestId}_${serviceEndpoint}`;
  };

  logger = {
    info: (...msg: Parameters<typeof fileLogger.info>) => {
      const prefix = buildPrefix("INFO");
      const message = msg.join(" ");
      fileLogger.info(`${prefix}: ${message}`);
      consoleLogger.info(`${prefix}: ${message}`);
    },
    error: (...msg: Parameters<typeof fileLogger.error>) => {
      const prefix = buildPrefix("ERROR");
      const message = msg.join(" ");
      fileLogger.error(`${prefix}: ${message}`);
      consoleLogger.error(`${prefix}: ${message}`);
    },
    warn: (...msg: Parameters<typeof fileLogger.warn>) => {
      const prefix = buildPrefix("WARN");
      const message = msg.join(" ");
      fileLogger.warn(`${prefix}: ${message}`);
      consoleLogger.warn(`${prefix}: ${message}`);
    },
    debug: (...msg: Parameters<typeof fileLogger.debug>) => {
      const prefix = buildPrefix("DEBUG");
      const message = msg.join(" ");
      fileLogger.debug(`${prefix}: ${message}`);
      consoleLogger.debug(`${prefix}: ${message}`);
    },
  };

  return logger;
};
