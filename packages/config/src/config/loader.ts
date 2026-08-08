import {
  createAppConfig,
  DEFAULT_APPLICATION_NAME,
  DEFAULT_APPLICATION_VERSION,
  DEFAULT_ENVIRONMENT,
  DEFAULT_LOG_LEVEL,
} from "./app-config.js";
import { readEnvironmentVariables, type EnvironmentVariables } from "./env.js";
import {
  validateEnvironment,
  validateLogLevel,
  validateRequiredText,
} from "./validator.js";
import type { AppConfig, LocalConfig } from "../types/config.js";

export interface LoadConfigOptions {
  readonly environment?: EnvironmentVariables;
  readonly localConfig?: LocalConfig;
}

function resolveValue<T>(
  environmentValue: T | undefined,
  localValue: T | undefined,
  defaultValue: T | undefined,
): T | undefined {
  return environmentValue ?? localValue ?? defaultValue;
}

/**
 * Loads configuration with environment values taking precedence over local
 * configuration, which takes precedence over documented defaults.
 */
export function loadConfig(options: LoadConfigOptions = {}): AppConfig {
  const environment = options.environment ?? readEnvironmentVariables();
  const localConfig = options.localConfig;

  const nodeEnvironment = resolveValue(
    environment.NODE_ENV,
    localConfig?.app?.environment,
    DEFAULT_ENVIRONMENT,
  );
  const logLevel = resolveValue(
    environment.LOG_LEVEL,
    localConfig?.logging?.level,
    DEFAULT_LOG_LEVEL,
  );
  const applicationName = resolveValue(
    environment.APP_NAME,
    localConfig?.app?.name,
    DEFAULT_APPLICATION_NAME,
  );
  const applicationVersion = resolveValue(
    environment.APP_VERSION,
    localConfig?.app?.version,
    DEFAULT_APPLICATION_VERSION,
  );
  const databaseUrl = resolveValue(
    environment.DATABASE_URL,
    localConfig?.database?.url,
    undefined,
  );

  return createAppConfig({
    applicationName: validateRequiredText("APP_NAME", applicationName),
    applicationVersion: validateRequiredText("APP_VERSION", applicationVersion),
    environment: validateEnvironment(validateRequiredText("NODE_ENV", nodeEnvironment)),
    databaseUrl: validateRequiredText("DATABASE_URL", databaseUrl),
    logLevel: validateLogLevel(validateRequiredText("LOG_LEVEL", logLevel)),
  });
}
