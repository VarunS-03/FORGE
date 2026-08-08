import { describe, expect, it } from "vitest";

import { loadConfig } from "@forge/config";

import { createLogger } from "../src/index.js";

const fixedTime = new Date("2026-08-08T00:00:00.000Z");
const databaseUrl = "postgresql://forge:password@localhost:5432/forge";

function createOutput(): { readonly entries: string[]; readonly output: (entry: string) => void } {
  const entries: string[] = [];
  return { entries, output: (entry: string): void => entries.push(entry) };
}

describe("createLogger", () => {
  it("writes required structured fields through the public API", () => {
    const capture = createOutput();
    const logger = createLogger({
      component: "api",
      config: loadConfig({ environment: { DATABASE_URL: databaseUrl, LOG_LEVEL: "info" } }),
      output: capture.output,
      now: () => fixedTime,
    });

    logger.info("request completed", {
      correlationId: "request-123",
      outcome: "success",
      durationMs: 42,
      metadata: { route: "/health" },
    });

    expect(JSON.parse(capture.entries[0]!)).toEqual({
      timestamp: "2026-08-08T00:00:00.000Z",
      level: "info",
      component: "api",
      message: "request completed",
      correlationId: "request-123",
      outcome: "success",
      durationMs: 42,
      metadata: { route: "/health" },
    });
  });

  it("uses null for unavailable observability fields", () => {
    const capture = createOutput();
    const logger = createLogger({
      component: "core",
      config: { logging: { level: "info" } },
      output: capture.output,
      now: () => fixedTime,
    });

    logger.info("started");

    expect(JSON.parse(capture.entries[0]!)).toMatchObject({
      correlationId: null,
      outcome: null,
      durationMs: null,
    });
  });

  it.each([
    ["trace", "trace", true],
    ["debug", "debug", true],
    ["info", "info", true],
    ["warn", "warn", true],
    ["error", "error", true],
    ["fatal", "fatal", true],
    ["info", "debug", false],
    ["error", "warn", false],
  ] as const)("filters %s configuration level against %s entries", (configuredLevel, entryLevel, expectedOutput) => {
    const capture = createOutput();
    const logger = createLogger({
      component: "core",
      config: { logging: { level: configuredLevel } },
      output: capture.output,
    });

    logger.log(entryLevel, "message");

    expect(capture.entries).toHaveLength(expectedOutput ? 1 : 0);
  });

  it("merges logger context with entry metadata", () => {
    const capture = createOutput();
    const logger = createLogger({
      component: "worker",
      config: { logging: { level: "trace" } },
      context: { correlationId: "batch-1", metadata: { collector: "reddit", attempt: 1 } },
      output: capture.output,
      now: () => fixedTime,
    });

    logger.debug("collection retry", { metadata: { attempt: 2, source: "api" } });

    expect(JSON.parse(capture.entries[0]!).metadata).toEqual({
      collector: "reddit",
      attempt: 2,
      source: "api",
    });
    expect(JSON.parse(capture.entries[0]!).correlationId).toBe("batch-1");
  });

  it("serializes errors and recursively redacts secrets", () => {
    const capture = createOutput();
    const logger = createLogger({
      component: "database",
      config: { logging: { level: "error" } },
      output: capture.output,
      now: () => fixedTime,
    });

    logger.error("connection failed", {
      error: new Error("Connection postgresql://forge:password@localhost:5432/forge failed"),
      metadata: {
        databaseUrl,
        retry: false,
        request: { authorization: "Bearer secret-token" },
      },
    });

    expect(JSON.parse(capture.entries[0]!)).toMatchObject({
      error: { name: "Error", message: "Connection postgresql://forge:[REDACTED]@localhost:5432/forge failed" },
      metadata: {
        databaseUrl: "[REDACTED]",
        retry: false,
        request: { authorization: "[REDACTED]" },
      },
    });
  });

  it("rejects an empty component", () => {
    expect(() => createLogger({ component: " ", config: { logging: { level: "info" } } })).toThrow(
      "Logger component must not be empty.",
    );
  });
});
