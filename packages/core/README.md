# @forge/core

Shared FORGE infrastructure. The current public capability is structured
logging through `createLogger`.

Each logger writes one JSON object per line to stdout by default. Its level is
read from `AppConfig.logging.level`; entries below that level are filtered.
Entries include a timestamp, component, level, message, and supplied
correlation ID, outcome, duration, metadata, and serialized error. Known
secret-bearing metadata keys are redacted before output.
