//maneja requestId, metadata, service-name
export class LoggerContext {
  private context: Record<string, any>;

  constructor(context: Record<string, any> = {}) {
    this.context = context;
  }

  getContext() {
    return this.context;
  }

  merge(extra: Record<string, any>) {
    return new LoggerContext({
      ...this.context,
      ...extra,
    });
  }
}
