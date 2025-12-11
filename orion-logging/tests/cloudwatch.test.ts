import { OrionLogger } from "../src/core/logger.js";
import { CloudWatchTransport } from "../src/transports/cloudwatch.js";

const logger = new OrionLogger({
  service: "cards-service",
  environment: "dev",
  transport: new CloudWatchTransport({
    region: "us-east-1",
    logGroup: "test-group",
    logStream: "test-stream"
  })
});

console.log("\n---- TEST CloudWatchTransport (Simulation) ----");

logger.info("Testing CloudWatchTransport", { a: 1 });
logger.error("Test error", { code: 500 });
logger.debug("Debug example");
logger.audit("Audit log");
logger.fatal("Fatal failure");
