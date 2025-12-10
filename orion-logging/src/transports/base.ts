//interfaz/abstracto para todos los transportes
import { LogEntry } from "../types.js";

export abstract class LogTransport {
  abstract send(entry: LogEntry): Promise<void>;
}

