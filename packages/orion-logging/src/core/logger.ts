import { LogEntry, LogLevel, LoggerOptions, ILogger } from "../types.js";
import { LogTransport } from "../transports/base.js";

export class OrionLogger implements ILogger {
  private service: string;
  private environment: string;
  private context: Record<string, any>;
  private transport: LogTransport;

  constructor(options: LoggerOptions) {
    this.service = options.service ?? "unknown-service";
    this.environment = options.environment ?? "dev";
    this.context = options.context ?? {};
    this.transport = options.transport;
  }

  /** -------------------------
   * MÉTODO CENTRAL DE ESCRITURA
   * ------------------------- */
  private write(level: LogLevel, message: string, data?: Record<string, any>) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      service: this.service,
      environment: this.environment,
      context: this.context,
      data
    };

    this.transport.send(entry);
  }

  /** -------------------------
   * NIVELES BÁSICOS
   * ------------------------- */
  trace(message: string, data?: Record<string, any>) {
    this.write("trace", message, data);
  }

  debug(message: string, data?: Record<string, any>) {
    this.write("debug", message, data);
  }

  info(message: string, data?: Record<string, any>) {
    this.write("info", message, data);
  }

  warn(message: string, data?: Record<string, any>) {
    this.write("warn", message, data);
  }

  error(message: string, data?: Record<string, any>) {
    this.write("error", message, data);
  }

  /** -------------------------
   * NIVELES EXTENDIDOS
   * ------------------------- */
  fatal(message: string, data?: Record<string, any>) {
    this.write("fatal", message, data);
  }

  audit(message: string, data?: Record<string, any>) {
    this.write("audit", message, data);
  }

  logContext(message: string, data?: Record<string, any>) {
    this.write("context", message, data);
  }

  /** -------------------------
   * LOGGER HIJO (context extra)
   * ------------------------- */
  child(extraContext: Record<string, any>): ILogger {
    return new OrionLogger({
      service: this.service,
      environment: this.environment,
      transport: this.transport,
      context: {
        ...this.context,
        ...extraContext
      }
    });
  }
}
