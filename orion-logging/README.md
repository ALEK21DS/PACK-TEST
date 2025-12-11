# Orion Logging

Pequeño wrapper de logging en TypeScript con niveles extendidos y soporte de transporte pluggable. Facilita el envío de eventos estructurados con metadatos de servicio, ambiente y contexto.

## Características
- Niveles: trace, debug, info, warn, error, fatal, audit, context.
- Contexto heredable vía `logger.child(...)` para requestId u otros metadatos.
- Transporte abstracto (`LogTransport`) para enviar a consola u otros destinos.
- Transporte incluido: `ConsoleTransport` (salida JSON a stdout).

## Requisitos
- Node.js >= 24
- pnpm (recomendado) o npm/yarn compatibles con workspaces ESM.

## Instalación
```bash
cd orion-logging
pnpm install
pnpm build   # opcional: genera dist/ para empaquetar
```

Si quieres usarlo desde otro proyecto como paquete local:
```bash
pnpm add ../orion-logging
```

## Uso rápido
```ts
import { OrionLogger } from "@orion/logging";
import { ConsoleTransport } from "@orion/logging/transports/console";

const logger = new OrionLogger({
  service: "cards-service",
  environment: "dev",
  context: { requestId: "REQ-99" },
  transport: new ConsoleTransport(),
});

logger.info("Usuario creado", { userId: 123 });
logger.error("Error simulado");

// Logger hijo con contexto extra
const child = logger.child({ correlationId: "CORR-1" });
child.audit("Auditoría de acción");
```

## API rápida
- `new OrionLogger(options)` crea el logger. Opciones: `service`, `environment`, `context`, `transport`.
- Métodos de nivel: `trace|debug|info|warn|error|fatal|audit|logContext(message, data?)`.
- `child(extraContext)` retorna un logger que agrega contexto adicional.
- `LogTransport` es la abstracción de transporte; `ConsoleTransport` es la implementación incluida.

## Pruebas y ejemplos
- Ejecuta el script de demostración/tests:
```bash
pnpm test      # corre tests con tsx --test
pnpm dev       # ejecuta tests/basic.test.ts en modo ejemplo
```

La salida muestra los eventos JSON generados y cómo funciona `child`.

## Desarrollo
- Lint: `pnpm lint`
- Tipado: `pnpm build` (usa `tsc`)
- Antes de publicar/empacar se ejecuta `pnpm build` vía `prepack`.


