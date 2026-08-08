import { randomUUID } from "node:crypto";

import type { EventBus, EventBusOptions, EventHandler, EventMetadata, ForgeEvent, CreateEventInput, EventSubscriptionOptions, EventHandlerFailure, PublishResult, Unsubscribe } from "./types.js";

interface Subscription {
  readonly consumer: string;
  readonly handler: EventHandler;
}

function assertNonEmpty(value: string, field: string): void {
  if (value.trim().length === 0) {
    throw new TypeError(`${field} must not be empty.`);
  }
}

function assertEventInput(input: CreateEventInput<unknown>): void {
  assertNonEmpty(input.eventName, "eventName");
  assertNonEmpty(input.eventVersion, "eventVersion");
  assertNonEmpty(input.aggregateId, "aggregateId");
  assertNonEmpty(input.aggregateType, "aggregateType");
  assertNonEmpty(input.producer, "producer");
  assertNonEmpty(input.metadata.correlationId, "metadata.correlationId");
  assertNonEmpty(input.metadata.schemaVersion, "metadata.schemaVersion");
}

function cloneAndFreeze<T>(value: T): T {
  const clone = structuredClone(value);
  const freeze = (item: unknown, seen: WeakSet<object>): void => {
    if (item === null || typeof item !== "object" || seen.has(item)) {
      return;
    }

    seen.add(item);
    for (const nestedValue of Object.values(item)) {
      freeze(nestedValue, seen);
    }
    Object.freeze(item);
  };

  freeze(clone, new WeakSet<object>());
  return clone;
}

/** Creates an immutable event that conforms to the FORGE canonical event schema. */
export function createEvent<TPayload>(input: CreateEventInput<TPayload>): ForgeEvent<TPayload> {
  assertEventInput(input);

  const payload = cloneAndFreeze(input.payload);
  const metadata = cloneAndFreeze(input.metadata) as EventMetadata;

  return Object.freeze({
    eventId: randomUUID(),
    eventName: input.eventName,
    eventVersion: input.eventVersion,
    aggregateId: input.aggregateId,
    aggregateType: input.aggregateType,
    timestamp: new Date().toISOString(),
    producer: input.producer,
    payload,
    metadata,
  });
}

export class EventBusDisposedError extends Error {
  public constructor() {
    super("Event Bus has been disposed.");
    this.name = "EventBusDisposedError";
  }
}

/** Creates an isolated in-process Event Bus with sequential asynchronous delivery. */
export function createEventBus(options: EventBusOptions = {}): EventBus {
  const subscriptions = new Map<string, Subscription[]>();
  let disposed = false;

  const assertActive = (): void => {
    if (disposed) {
      throw new EventBusDisposedError();
    }
  };

  const subscribe = <TPayload>(
    eventName: string,
    handler: EventHandler<TPayload>,
    subscriptionOptions: EventSubscriptionOptions,
  ): Unsubscribe => {
    assertActive();
    assertNonEmpty(eventName, "eventName");
    assertNonEmpty(subscriptionOptions.consumer, "consumer");

    const subscription: Subscription = {
      consumer: subscriptionOptions.consumer,
      handler: handler as EventHandler,
    };
    const handlers = subscriptions.get(eventName) ?? [];
    handlers.push(subscription);
    subscriptions.set(eventName, handlers);

    return (): void => {
      const currentHandlers = subscriptions.get(eventName);
      if (currentHandlers === undefined) {
        return;
      }

      const index = currentHandlers.indexOf(subscription);
      if (index >= 0) {
        currentHandlers.splice(index, 1);
      }
      if (currentHandlers.length === 0) {
        subscriptions.delete(eventName);
      }
    };
  };

  const publish = async <TPayload>(event: ForgeEvent<TPayload>): Promise<PublishResult> => {
    assertActive();
    const handlers = [...(subscriptions.get(event.eventName) ?? [])];
    const startedAt = Date.now();
    const failures: EventHandlerFailure[] = [];
    let deliveredCount = 0;

    for (const subscription of handlers) {
      try {
        await subscription.handler(event);
        deliveredCount += 1;
      } catch (error) {
        failures.push({ consumer: subscription.consumer, error });
        options.logger?.error("Event handler failed", {
          correlationId: event.metadata.correlationId,
          outcome: "failure",
          durationMs: Date.now() - startedAt,
          error,
          metadata: {
            eventId: event.eventId,
            eventName: event.eventName,
            producer: event.producer,
            consumer: subscription.consumer,
            retryCount: 0,
          },
        });
      }
    }

    const result: PublishResult = {
      eventId: event.eventId,
      subscriberCount: handlers.length,
      deliveredCount,
      failures: Object.freeze(failures),
    };

    options.logger?.debug("Event published", {
      correlationId: event.metadata.correlationId,
      outcome: failures.length === 0 ? "success" : "partial_failure",
      durationMs: Date.now() - startedAt,
      metadata: {
        eventId: event.eventId,
        eventName: event.eventName,
        producer: event.producer,
        subscriberCount: handlers.length,
        deliveredCount,
        failureCount: failures.length,
        retryCount: 0,
      },
    });

    return Object.freeze(result);
  };

  return Object.freeze({
    subscribe,
    publish,
    dispose: (): void => {
      if (!disposed) {
        subscriptions.clear();
        disposed = true;
      }
    },
  });
}
