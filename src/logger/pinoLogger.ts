import pino from "pino";
import { createStream } from "rotating-file-stream";

let logger: any;

export const getlogger = (fileLogger_level: any = "info" , consoleLogger_level: any = "info") => {

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
  });

  // Unified logger interface
  logger = {
    info: (...msg: Parameters<typeof fileLogger.info>) => {
      fileLogger.info(...msg);
      consoleLogger.info(...msg);
    },
    error: (...msg: Parameters<typeof fileLogger.error>) => {
      fileLogger.error(...msg);
      consoleLogger.error(...msg);
    },
    warn: (...msg: Parameters<typeof fileLogger.warn>) => {
      fileLogger.warn(...msg);
      consoleLogger.warn(...msg);
    },
    debug: (...msg: Parameters<typeof fileLogger.debug>) => {
      fileLogger.debug(...msg);
      consoleLogger.debug(...msg);
    },
  };

  return logger;
};
