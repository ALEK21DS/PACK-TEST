# @orion/logging

Un sistema de logging estructurado, extensible y desacoplado del proveedor, diseñado para microservicios Orion y compatible con CloudWatch Logs.

Produce logs en formato JSON, soporta niveles extendidos, contextos heredados, creación de loggers hijos y múltiples transportes (console, CloudWatch, archivos, etc.).

---

## 🚀 Características principales

- **Logs estructurados en JSON**
- **Soporte para múltiples niveles:**
  - `trace`, `debug`, `info`, `warn`, `error`, `fatal`, `audit`, `context`
- **Logger hijo con contexto heredado**
- **Transporte desacoplado**
  - `Console` (default)
  - `CloudWatch` (próximamente)
- **API simple y consistente**
- Preparado para `requestId`, `correlationId`, y enmascarado de datos sensibles
- Implementación profesional similar a **Pino / Winston**

---

## 📦 Instalación

```bash
pnpm install @orion/logging
O en modo local (desarrollo):

bash
Copiar código
pnpm link --global
🧩 Uso Básico
ts
Copiar código
import { OrionLogger, ConsoleTransport } from "@orion/logging";

const logger = new OrionLogger({
  service: "cards-service",
  environment: "dev",
  transport: new ConsoleTransport()
});

logger.info("Usuario creado", { userId: 123 });
logger.error("Fallo en la operación");
Salida JSON:

json
Copiar código
{
  "timestamp": "2025-12-10T17:03:32.952Z",
  "level": "info",
  "message": "Usuario creado",
  "service": "cards-service",
  "environment": "dev",
  "context": {},
  "data": { "userId": 123 }
}
🧩 Uso de logger hijo (contexto)
Ideal para requestId, correlationId, sessionId, etc.

ts
Copiar código
const childLogger = logger.child({ requestId: "REQ-123" });

childLogger.info("Inicio de transacción");
childLogger.error("Error grave en el proceso");
🧩 Niveles soportados
Nivel	Uso recomendado
trace	Detalle muy profundo del flujo
debug	Información de depuración
info	Eventos exitosos y normales
warn	Alertas sin impacto crítico
error	Errores recuperables
fatal	Fallas críticas del sistema
audit	Acciones sensibles (crear/eliminar tarjetas)
context	Logs relacionados a contexto

📁 Estructura del proyecto
pgsql
Copiar código
src/
  index.ts
  types.ts
  core/
    context.ts
    logger.ts
  transports/
    base.ts
    console.ts
  utils/
    format.ts
📌 Explicación de cada archivo
index.ts
Punto de entrada del paquete. Define la API pública.

types.ts
Contiene los tipos esenciales: LogLevel, LogEntry, LoggerOptions, ILogger.

core/logger.ts
Implementación principal del logger Orion:

Niveles de log

Creación de log hijo

Ensamblado del JSON

Envío al transporte

core/context.ts
Manejo centralizado de requestId, correlationId y contexto transaccional.

transports/base.ts
Interfaz abstracta send(entry: LogEntry): Promise<void>; todos los transportes deben implementarla.

transports/console.ts
Transporte por defecto, imprime JSON a consola.

utils/format.ts
Funciones auxiliares de formateo y sanitización (placeholder de futura implementación).

🛠 Crear un transporte personalizado
ts
Copiar código
import { LogTransport } from "@orion/logging";
import { LogEntry } from "@orion/logging";
import fs from "fs";

export class FileTransport extends LogTransport {
  async send(entry: LogEntry): Promise<void> {
    await fs.promises.appendFile("logs.txt", JSON.stringify(entry) + "\n");
  }
}

const logger = new OrionLogger({ transport: new FileTransport() });
☁️ Integración con CloudWatch (próxima fase)
El logger está preparado para soportar:

Creación automática de log groups / streams

Envío en batch (putLogEvents)

Manejo de sequenceTokens

Retries y backoff

Se implementará en:

transports/cloudwatch.ts

🧪 Tests
Ejecuta:

bash
Copiar código
pnpm dev
Esto correrá los tests dentro de tests/basic.test.ts.

📌 Roadmap del proyecto
✔ Fase 1 — Logger local (CONCLUIDA)

JSON estructurado

Transports

Contexto

Logger hijo

⏳ Fase 2 — CloudWatch Transport

AWS SDK v3

Batches

sequenceTokens

rate-limits

⏳ Fase 3 — Data Sanitization

Masking automático

Reglas configurables

⏳ Fase 4 — Config centralizada (OrionConfig)