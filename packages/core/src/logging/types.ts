import type { AppConfig, LogLevel } from "@forge/config";

export type LogMetadata = Readonly<Record<string, unknown>>;

export interface LoggerContext {
  readonly correlationId?: string;
  readonly outcome?: string;
  readonly durationMs?: number;
  readonly metadata?: LogMetadata;
  readonly error?: unknown;
}

export interface SerializedError {
  readonly name: string;
  readonly message: string;
  readonly stack?: string;
}

export interface LogEntry {
  readonly timestamp: string;
  readonly level: LogLevel;
  readonly component: string;
  readonly message: string;
  readonly correlationId: string | null;
  readonly outcome: string | null;
  readonly durationMs: number | null;
  readonly metadata?: LogMetadata;
  readonly error?: SerializedError;
}

export type LogOutput = (entry: string) => void;

export interface LoggerOptions {
  readonly component: string;
  readonly config: Pick<AppConfig, "logging">;
  readonly context?: Omit<LoggerContext, "error">;
  readonly output?: LogOutput;
  readonly now?: () => Date;
}

export interface Logger {
  readonly level: LogLevel;
  log(level: LogLevel, message: string, context?: LoggerContext): void;
  trace(message: string, context?: LoggerContext): void;
  debug(message: string, context?: LoggerContext): void;
  info(message: string, context?: LoggerContext): void;
  warn(message: string, context?: LoggerContext): void;
  error(message: string, context?: LoggerContext): void;
  fatal(message: string, context?: LoggerContext): void;
}
