# Orion Logging

Small logging wrapper in TypeScript with extended levels and pluggable transport support. Facilitates sending structured events with service, environment, and context metadata.

## Features
- Levels: trace, debug, info, warn, error, fatal, audit, context.
- Inheritable context via `logger.child(...)` for requestId or other metadata.
- Abstract transport (`LogTransport`) for sending to console or other destinations.
- Included transport: `ConsoleTransport` (JSON output to stdout).

## Requirements
- Node.js >= 24
- pnpm (recommended) or npm/yarn compatible with ESM workspaces.

## Installation
```bash
cd orion-logging
pnpm install
pnpm build   # optional: generate dist/ for packaging
```

If you want to use it from another project as a local package:
```bash
pnpm add ../orion-logging
```

## Quick usage
```ts
import { OrionLogger } from “@orion/logging”;
import { ConsoleTransport } from “@orion/logging/transports/console”;

const logger = new OrionLogger({
  service: “cards-service”,
  environment: “dev”,
  context: { requestId: “REQ-99” },
  transport: new ConsoleTransport(),
});

logger.info(“User created”, { userId: 123 });
logger.error(“Simulated error”);

// Child logger with extra context
const child = logger.child({ correlationId: “CORR-1” });
child.audit(“Action audit”);
```


## Quick API
- `new OrionLogger(options)` creates the logger. Options: `service`, `environment`, `context`, `transport`.
- Level methods: `trace|debug|info|warn|error|fatal|audit|logContext(message, data?)`.
- `child(extraContext)` returns a logger that adds additional context.
- `LogTransport` is the transport abstraction; `ConsoleTransport` is the included implementation.

## Tests and examples
- Run the demo/tests script:
```bash
pnpm test      # runs tests with tsx --test
pnpm dev       # runs tests/basic.test.ts in example mode
```

The output shows the generated JSON events and how `child` works.

## Development
- Lint: `pnpm lint`
- Typing: `pnpm build` (uses `tsc`)
- Before publishing/packaging, `pnpm build` is run via `prepack`.