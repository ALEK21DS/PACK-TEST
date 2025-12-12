import { LogTransport } from "./transports/base.js";

export type LogLevel =
  | "trace"
  | "debug"
  | "info"
  | "warn"
  | "error"
  | "fatal"
  | "audit"
  | "context";


export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  service?: string;
  environment?: string;
  requestId?: string;
  correlationId?: string;
  context?: Record<string, any>;
  data?: Record<string, any>;
}

export interface LoggerOptions {
  service?: string;
  environment?: string;
  context?: Record<string, any>;
  transport: LogTransport;
}


export interface ILogger {
  trace(message: string, data?: Record<string, any>): void;
  debug(message: string, data?: Record<string, any>): void;
  info(message: string, data?: Record<string, any>): void;
  warn(message: string, data?: Record<string, any>): void;
  error(message: string, data?: Record<string, any>): void;
  fatal(message: string, data?: Record<string, any>): void;
  audit(message: string, data?: Record<string, any>): void;
  logContext(message: string, data?: Record<string, any>): void;

  child(context: Record<string, any>): ILogger;
}
