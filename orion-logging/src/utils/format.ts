import { LogEntry } from "../types.js";

export function formatLog(entry: LogEntry): LogEntry {
  return {
    ...entry,
    timestamp: entry.timestamp || new Date().toISOString(),
  };
}
