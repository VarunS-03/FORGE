/**
 * FORGE Configuration Types
 */

export type Environment =
  | "development"
  | "test"
  | "production";

export type LogLevel =
  | "trace"
  | "debug"
  | "info"
  | "warn"
  | "error"
  | "fatal";

export interface AppSettings {
  readonly name: string;
  readonly version: string;
  readonly environment: Environment;
}

export interface DatabaseSettings {
  readonly url: string;
}

export interface LoggingSettings {
  readonly level: LogLevel;
}

export interface AppConfig {
  readonly app: AppSettings;
  readonly database: DatabaseSettings;
  readonly logging: LoggingSettings;
}

export interface LocalConfig {
  readonly app?: Partial<AppSettings>;
  readonly database?: Partial<DatabaseSettings>;
  readonly logging?: Partial<LoggingSettings>;
}
