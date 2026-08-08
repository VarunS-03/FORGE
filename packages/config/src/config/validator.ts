import type { Environment, LogLevel } from "../types/config.js";

const environments = ["development", "test", "production"] as const;
const logLevels = ["trace", "debug", "info", "warn", "error", "fatal"] as const;

export class ConfigValidationError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "ConfigValidationError";
  }
}

export function validateEnvironment(value: string): Environment {
  if (environments.includes(value as Environment)) {
    return value as Environment;
  }

  throw new ConfigValidationError(
    `Invalid NODE_ENV: ${JSON.stringify(value)}. Expected development, test, or production.`,
  );
}

export function validateLogLevel(value: string): LogLevel {
  if (logLevels.includes(value as LogLevel)) {
    return value as LogLevel;
  }

  throw new ConfigValidationError(
    `Invalid LOG_LEVEL: ${JSON.stringify(value)}. Expected trace, debug, info, warn, error, or fatal.`,
  );
}

export function validateRequiredText(field: string, value: string | undefined): string {
  if (value === undefined || value.trim().length === 0) {
    throw new ConfigValidationError(`${field} is required.`);
  }

  return value;
}
