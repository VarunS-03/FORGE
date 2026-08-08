import type { Logger } from "../logging/types.js";

export interface EventMetadata {
  readonly correlationId: string;
  readonly causationId: string | null;
  readonly schemaVersion: string;
}

export interface ForgeEvent<TPayload = unknown> {
  readonly eventId: string;
  readonly eventName: string;
  readonly eventVersion: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly timestamp: string;
  readonly producer: string;
  readonly payload: TPayload;
  readonly metadata: EventMetadata;
}

export interface CreateEventInput<TPayload> {
  readonly eventName: string;
  readonly eventVersion: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly producer: string;
  readonly payload: TPayload;
  readonly metadata: EventMetadata;
}

export type EventHandler<TPayload = unknown> = (
  event: ForgeEvent<TPayload>,
) => void | Promise<void>;

export interface EventSubscriptionOptions {
  readonly consumer: string;
}

export type Unsubscribe = () => void;

export interface EventHandlerFailure {
  readonly consumer: string;
  readonly error: unknown;
}

export interface PublishResult {
  readonly eventId: string;
  readonly subscriberCount: number;
  readonly deliveredCount: number;
  readonly failures: readonly EventHandlerFailure[];
}

export interface EventBusOptions {
  readonly logger?: Logger;
}

export interface EventBus {
  subscribe<TPayload>(
    eventName: string,
    handler: EventHandler<TPayload>,
    options: EventSubscriptionOptions,
  ): Unsubscribe;
  publish<TPayload>(event: ForgeEvent<TPayload>): Promise<PublishResult>;
  dispose(): void;
}
