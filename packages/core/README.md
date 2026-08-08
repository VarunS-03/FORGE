# @forge/core

Shared FORGE infrastructure. The current public capability is structured
logging through `createLogger`.

Each logger writes one JSON object per line to stdout by default. Its level is
read from `AppConfig.logging.level`; entries below that level are filtered.
Entries include a timestamp, component, level, message, and supplied
correlation ID, outcome, duration, metadata, and serialized error. Known
secret-bearing metadata keys are redacted before output.

The package also provides an in-process Event Bus. Events are immutable facts
with canonical event metadata. Handlers run asynchronously in subscription
order; a failed handler is isolated so remaining subscribers still receive the
event. A logger can be supplied for publish and handler-failure observability.
