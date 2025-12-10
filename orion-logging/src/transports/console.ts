//transporte básico para desarrollo (console.log)
import { LogEntry } from "../types.js";
import { LogTransport } from "./base.js";

export class ConsoleTransport extends LogTransport {
  async send(entry: LogEntry): Promise<void> {
    console.log(JSON.stringify(entry));
  }
}

