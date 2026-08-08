import type { AppConfig, Environment, LogLevel } from "../types/config.js";

export const DEFAULT_APPLICATION_NAME = "forge";
export const DEFAULT_APPLICATION_VERSION = "0.1.0";
export const DEFAULT_ENVIRONMENT: Environment = "development";
export const DEFAULT_LOG_LEVEL: LogLevel = "info";

interface ResolvedConfigValues {
  readonly applicationName: string;
  readonly applicationVersion: string;
  readonly environment: Environment;
  readonly databaseUrl: string;
  readonly logLevel: LogLevel;
}

export function createAppConfig(values: ResolvedConfigValues): AppConfig {
  const app = Object.freeze({
    name: values.applicationName,
    version: values.applicationVersion,
    environment: values.environment,
  });
  const database = Object.freeze({ url: values.databaseUrl });
  const logging = Object.freeze({ level: values.logLevel });

  return Object.freeze({ app, database, logging });
}
