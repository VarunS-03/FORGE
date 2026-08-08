export interface EnvironmentVariables {
  readonly NODE_ENV?: string;
  readonly DATABASE_URL?: string;
  readonly LOG_LEVEL?: string;
  readonly APP_NAME?: string;
  readonly APP_VERSION?: string;
}

export function readEnvironmentVariables(): EnvironmentVariables {
  return {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    LOG_LEVEL: process.env.LOG_LEVEL,
    APP_NAME: process.env.APP_NAME,
    APP_VERSION: process.env.APP_VERSION,
  };
}
