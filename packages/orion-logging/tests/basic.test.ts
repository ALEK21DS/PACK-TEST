import { OrionLogger } from "../src/core/logger.ts";
import { ConsoleTransport } from "../src/transports/console.ts";

const logger = new OrionLogger({
  service: "cards-service",
  environment: "dev",
  context: {},
  transport: new ConsoleTransport()
});

console.log("\n---- TEST: Basic levels ----");
logger.info("User created", { userId: 123 });
logger.debug("Starting flow", { requestId: "REQ-99" });
logger.warn("Test warning");
logger.error("Simulated error");

console.log("\n---- TEST: Extended levels ----");
logger.trace("Detailed flow tracking");
logger.fatal("Critical system failure");
logger.audit("Audit: user deleted a card");
logger.logContext("Additional context logged");

console.log("\n---- TEST: Child logger ----");
const child = logger.child({ requestId: "REQ-123" });
child.info("Message from child logger");
child.error("Error from child logger");
child.audit("Audit from child logger");
