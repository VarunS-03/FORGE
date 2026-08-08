import type { LogLevel } from "@forge/config";

import type {
  LogEntry,
  Logger,
  LoggerContext,
  LoggerOptions,
  LogMetadata,
  SerializedError,
} from "./types.js";

const logLevelPriority: Readonly<Record<LogLevel, number>> = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

const secretKeyPattern = /password|secret|token|api[_-]?key|authorization|cookie|credential|database[_-]?url|connection[_-]?string/i;
const redactedValue = "[REDACTED]";

function redactValue(value: unknown, seen: WeakSet<object>): unknown {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (seen.has(value)) {
    return "[Circular]";
  }

  seen.add(value);

  if (Array.isArray(value)) {
    return value.map((item) => redactValue(item, seen));
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      secretKeyPattern.test(key) ? redactedValue : redactValue(item, seen),
    ]),
  );
}

function redactMetadata(metadata: LogMetadata | undefined): LogMetadata | undefined {
  return metadata === undefined ? undefined : redactValue(metadata, new WeakSet<object>()) as LogMetadata;
}

function redactText(value: string): string {
  return value
    .replace(/(password|secret|token|api[_-]?key)=([^\s&]+)/gi, "$1=" + redactedValue)
    .replace(/(postgres(?:ql)?:\/\/[^:\s]+:)([^@\s]+)(@)/gi, `$1${redactedValue}$3`);
}

function serializeError(error: unknown): SerializedError {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: redactText(error.message),
      ...(error.stack === undefined ? {} : { stack: redactText(error.stack) }),
    };
  }

  return {
    name: "Error",
    message: redactText(typeof error === "string" ? error : String(error)),
  };
}

function mergeContext(
  baseContext: Omit<LoggerContext, "error"> | undefined,
  entryContext: LoggerContext | undefined,
): LoggerContext {
  return {
    ...baseContext,
    ...entryContext,
    ...(baseContext?.metadata === undefined && entryContext?.metadata === undefined
      ? {}
      : { metadata: { ...baseContext?.metadata, ...entryContext?.metadata } }),
  };
}

function writeToStdout(entry: string): void {
  console.log(entry);
}

/** Creates an isolated structured logger configured from FORGE application configuration. */
export function createLogger(options: LoggerOptions): Logger {
  if (options.component.trim().length === 0) {
    throw new TypeError("Logger component must not be empty.");
  }

  const level = options.config.logging.level;
  const output = options.output ?? writeToStdout;
  const now = options.now ?? (() => new Date());

  const log = (entryLevel: LogLevel, message: string, entryContext?: LoggerContext): void => {
    if (logLevelPriority[entryLevel] < logLevelPriority[level]) {
      return;
    }

    const context = mergeContext(options.context, entryContext);
    const entry: LogEntry = {
      timestamp: now().toISOString(),
      level: entryLevel,
      component: options.component,
      message,
      correlationId: context.correlationId ?? null,
      outcome: context.outcome ?? null,
      durationMs: context.durationMs ?? null,
      ...(context.metadata === undefined ? {} : { metadata: redactMetadata(context.metadata) }),
      ...(context.error === undefined ? {} : { error: serializeError(context.error) }),
    };

    output(JSON.stringify(entry));
  };

  return Object.freeze({
    level,
    log,
    trace: (message: string, context?: LoggerContext): void => log("trace", message, context),
    debug: (message: string, context?: LoggerContext): void => log("debug", message, context),
    info: (message: string, context?: LoggerContext): void => log("info", message, context),
    warn: (message: string, context?: LoggerContext): void => log("warn", message, context),
    error: (message: string, context?: LoggerContext): void => log("error", message, context),
    fatal: (message: string, context?: LoggerContext): void => log("fatal", message, context),
  });
}
