import { OrionLogger } from "@orion/logging";
import { ConsoleTransport } from "@orion/logging/transports/console";

const logger = new OrionLogger({
  service: "demo-service",
  environment: "dev",
  transport: new ConsoleTransport()
});

logger.info("Servidor arrancado");

function registrarUsuario(nombre: string) {
  logger.debug("Registrando usuario...", { nombre });

  const user = { id: Math.floor(Math.random() * 1000), nombre };

  logger.info("Usuario registrado", { user });

  return user;
}

const u = registrarUsuario("Brandon");
