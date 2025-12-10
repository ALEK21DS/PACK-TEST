import { OrionLogger } from "../src/core/logger.ts";
import { ConsoleTransport } from "../src/transports/console.ts";

const logger = new OrionLogger({
  service: "cards-service",
  environment: "dev",
  context: {},
  transport: new ConsoleTransport()
});

console.log("\n---- TEST: Niveles básicos ----");
logger.info("Usuario creado", { userId: 123 });
logger.debug("Iniciando flujo", { requestId: "REQ-99" });
logger.warn("Warning de prueba");
logger.error("Error simulado");

console.log("\n---- TEST: Niveles extendidos ----");
logger.trace("Seguimiento detallado del flujo");
logger.fatal("Falla crítica del sistema");
logger.audit("Auditoría: usuario eliminó una tarjeta");
logger.logContext("Contexto adicional registrado");

console.log("\n---- TEST: Logger hijo ----");
const child = logger.child({ requestId: "REQ-123" });
child.info("Mensaje desde el logger hijo");
child.error("Error desde el logger hijo");
child.audit("Auditoría desde el logger hijo");
