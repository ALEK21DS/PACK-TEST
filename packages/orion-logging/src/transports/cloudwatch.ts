import {
  CloudWatchLogsClient,
  CreateLogGroupCommand,
  CreateLogStreamCommand,
  PutLogEventsCommand
} from "@aws-sdk/client-cloudwatch-logs";

import { LogEntry } from "../types.js";
import { LogTransport } from "./base.js";

/**
 * CloudWatchTransport
 * --------------------
 * This transport sends logs to AWS CloudWatch Logs.
 *
 * At this stage, we are only building the structure.
 * The actual calls will be implemented later.
 */
export class CloudWatchTransport extends LogTransport {
  private client: CloudWatchLogsClient;

  private logGroup: string;
  private logStream: string;

  private sequenceToken: string | undefined = undefined;

  /** Internal queue of logs to send in batches */
  private queue: LogEntry[] = [];

  /** Suggested AWS limit */
  private readonly MAX_BATCH_SIZE = 10;

  /** Flag to prevent multiple simultaneous executions */
  private isFlushing = false;

  constructor(options: {
    region: string;
    logGroup: string;
    logStream: string;
  }) {
    super();

    this.logGroup = options.logGroup;
    this.logStream = options.logStream;

    // AWS client
    this.client = new CloudWatchLogsClient({
      region: options.region
      // We will add the credentials later.
    });
  }

  /**
   * ENTRY POINT — What the logger calls
   */
  async send(entry: LogEntry): Promise<void> {
    this.queue.push(entry);
    this.flushQueue(); // no await -> do not block the app
  }

  /**
   * Clears the log queue in the background.
   * We don't call the actual AWS yet.
   */
  private async flushQueue() {
    if (this.isFlushing) return;
    this.isFlushing = true;

    try {
      while (this.queue.length > 0) {
        const batch = this.queue.splice(0, this.MAX_BATCH_SIZE);

        // Here later we will call: this.sendBatchToAWS(batch)
        await this.simulateSend(batch); // temporary
      }
    } finally {
      this.isFlushing = false;
    }
  }

  /**
   * Simulates sending to AWS while not using real credentials.
   * Only prints the batch to verify the structure.
   */
  private async simulateSend(batch: LogEntry[]) {
    console.log("⚠️ (Simulated) Sending batch to CloudWatch:", batch);
  }

  /**
   * Create Log Group in AWS
   * (structure prepared — implementation to follow)
   */
  private async ensureLogGroup() {
    // TODO: Implement later
  }

  /**
   * Create Log Stream in AWS
   * (structure prepared — implementation to follow)
   */
  private async ensureLogStream() {
    // TODO: Implement later
  }

  /**
   * Send actual batch to AWS.
   * PutLogEventsCommand will be implemented here.
   */
  private async sendBatchToAWS(batch: LogEntry[]) {
    // TODO: Implement later
  }

  /**
   * Handling the sequenceToken.
   * CloudWatch requires that each batch include the last token.
   */
  private handleSequenceToken(response: any) {
    // TODO: Implement later
  }

  /**
   * Retries and exponential backoff.
   */
  private async retryWithBackoff(fn: () => Promise<void>) {
    // TODO: Implement later
  }
}
