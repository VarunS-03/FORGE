import { describe, expect, it } from "vitest";

import { ConfigValidationError, loadConfig } from "../src/index.js";

const databaseUrl = "postgresql://forge:password@localhost:5432/forge";

describe("loadConfig", () => {
  it("loads valid configuration through the public API", () => {
    const config = loadConfig({
      environment: {
        NODE_ENV: "production",
        DATABASE_URL: databaseUrl,
        LOG_LEVEL: "warn",
        APP_NAME: "FORGE API",
        APP_VERSION: "1.2.3",
      },
    });

    expect(config).toEqual({
      app: { name: "FORGE API", version: "1.2.3", environment: "production" },
      database: { url: databaseUrl },
      logging: { level: "warn" },
    });
  });

  it("applies development defaults", () => {
    const config = loadConfig({ environment: { DATABASE_URL: databaseUrl } });

    expect(config.app).toEqual({
      name: "forge",
      version: "0.1.0",
      environment: "development",
    });
    expect(config.logging.level).toBe("info");
  });

  it("supports the test environment", () => {
    expect(
      loadConfig({ environment: { NODE_ENV: "test", DATABASE_URL: databaseUrl } }).app.environment,
    ).toBe("test");
  });

  it("supports the production environment", () => {
    expect(
      loadConfig({ environment: { NODE_ENV: "production", DATABASE_URL: databaseUrl } }).app.environment,
    ).toBe("production");
  });

  it.each(["trace", "debug", "info", "warn", "error", "fatal"])(
    "accepts the %s log level",
    (level) => {
      expect(
        loadConfig({ environment: { DATABASE_URL: databaseUrl, LOG_LEVEL: level } }).logging.level,
      ).toBe(level);
    },
  );

  it("rejects an invalid log level", () => {
    expect(() => loadConfig({ environment: { DATABASE_URL: databaseUrl, LOG_LEVEL: "verbose" } })).toThrow(
      ConfigValidationError,
    );
    expect(() => loadConfig({ environment: { DATABASE_URL: databaseUrl, LOG_LEVEL: "verbose" } })).toThrow(
      "Invalid LOG_LEVEL",
    );
  });

  it("rejects an invalid environment", () => {
    expect(() => loadConfig({ environment: { DATABASE_URL: databaseUrl, NODE_ENV: "staging" } })).toThrow(
      "Invalid NODE_ENV",
    );
  });

  it("rejects missing database configuration", () => {
    expect(() => loadConfig({ environment: {} })).toThrow("DATABASE_URL is required.");
  });

  it("applies environment, local configuration, then defaults precedence", () => {
    const config = loadConfig({
      environment: {
        DATABASE_URL: "postgresql://environment:password@localhost:5432/environment",
        APP_NAME: "environment-name",
      },
      localConfig: {
        app: { name: "local-name", version: "2.0.0", environment: "test" },
        database: { url: "postgresql://local:password@localhost:5432/local" },
        logging: { level: "debug" },
      },
    });

    expect(config).toEqual({
      app: { name: "environment-name", version: "2.0.0", environment: "test" },
      database: { url: "postgresql://environment:password@localhost:5432/environment" },
      logging: { level: "debug" },
    });
  });

  it("returns an immutable configuration", () => {
    const config = loadConfig({ environment: { DATABASE_URL: databaseUrl } });

    expect(Object.isFrozen(config)).toBe(true);
    expect(Object.isFrozen(config.app)).toBe(true);
    expect(Object.isFrozen(config.database)).toBe(true);
    expect(Object.isFrozen(config.logging)).toBe(true);
    expect(() => {
      (config as unknown as { app: { name: string } }).app.name = "changed";
    }).toThrow(TypeError);
  });
});
