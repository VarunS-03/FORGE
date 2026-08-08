import { describe, expect, it, vi } from "vitest";

import { createEvent, createEventBus, createLogger, EventBusDisposedError } from "../src/index.js";

const event = () => createEvent({
  eventName: "EvidenceGenerated",
  eventVersion: "1.0.0",
  aggregateId: "evidence-1",
  aggregateType: "Evidence",
  producer: "discovery-engine",
  payload: { score: 42 },
  metadata: { correlationId: "analysis-1", causationId: "raw-record-1", schemaVersion: "1.0.0" },
});

describe("Event Bus", () => {
  it("creates an immutable canonical event", () => {
    const created = event();

    expect(created.eventId).toMatch(/^[0-9a-f-]{36}$/i);
    expect(created.timestamp).not.toBe("");
    expect(created.metadata).toEqual({
      correlationId: "analysis-1",
      causationId: "raw-record-1",
      schemaVersion: "1.0.0",
    });
    expect(Object.isFrozen(created)).toBe(true);
    expect(Object.isFrozen(created.payload)).toBe(true);
    expect(() => {
      (created.payload as { score: number }).score = 1;
    }).toThrow(TypeError);
  });

  it("delivers events to subscribers and preserves payload and metadata", async () => {
    const bus = createEventBus();
    let received: typeof event extends () => infer T ? T : never;
    bus.subscribe("EvidenceGenerated", (receivedEvent) => {
      received = receivedEvent;
    }, { consumer: "trend-engine" });

    const created = event();
    const result = await bus.publish(created);

    expect(received!).toBe(created);
    expect(result).toMatchObject({ subscriberCount: 1, deliveredCount: 1, failures: [] });
  });

  it("delivers to multiple subscribers in subscription order", async () => {
    const bus = createEventBus();
    const calls: string[] = [];
    bus.subscribe("EvidenceGenerated", async () => { calls.push("first"); }, { consumer: "first" });
    bus.subscribe("EvidenceGenerated", () => { calls.push("second"); }, { consumer: "second" });

    await bus.publish(event());

    expect(calls).toEqual(["first", "second"]);
  });

  it("unsubscribes a handler", async () => {
    const bus = createEventBus();
    const handler = vi.fn();
    const unsubscribe = bus.subscribe("EvidenceGenerated", handler, { consumer: "trend-engine" });

    unsubscribe();
    await bus.publish(event());

    expect(handler).not.toHaveBeenCalled();
  });

  it("isolates handler failures and continues delivery", async () => {
    const output: string[] = [];
    const logger = createLogger({ component: "event-bus", config: { logging: { level: "debug" } }, output: (entry) => output.push(entry) });
    const bus = createEventBus({ logger });
    const successfulHandler = vi.fn();
    bus.subscribe("EvidenceGenerated", () => { throw new Error("handler failed"); }, { consumer: "failing-engine" });
    bus.subscribe("EvidenceGenerated", successfulHandler, { consumer: "healthy-engine" });

    const result = await bus.publish(event());

    expect(successfulHandler).toHaveBeenCalledOnce();
    expect(result).toMatchObject({ deliveredCount: 1, failures: [{ consumer: "failing-engine" }] });
    expect(JSON.parse(output[0]!).metadata.consumer).toBe("failing-engine");
    expect(JSON.parse(output[1]!).outcome).toBe("partial_failure");
  });

  it("rejects publish and subscription after disposal", async () => {
    const bus = createEventBus();
    bus.dispose();

    expect(() => bus.subscribe("EvidenceGenerated", () => undefined, { consumer: "engine" })).toThrow(EventBusDisposedError);
    await expect(bus.publish(event())).rejects.toThrow(EventBusDisposedError);
  });
});
