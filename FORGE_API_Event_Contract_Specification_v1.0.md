# FORGE --- Founder Intelligence Operating System (FIOS)

# API & Event Contract Specification (AECS)

**Version:** 1.0\
**Status:** Canonical Interface Specification

------------------------------------------------------------------------

# Table of Contents

1.  Purpose
2.  Design Principles
3.  Communication Model
4.  API Standards
5.  API Versioning
6.  Canonical Request & Response Contracts
7.  Event Architecture
8.  Canonical Event Schema
9.  Event Catalog
10. Engine Contracts
11. Collector Contracts
12. Repository Contracts
13. Error Contracts
14. Idempotency Rules
15. Authentication & Authorization
16. Observability
17. Contract Evolution
18. Future Integration Strategy
19. Acceptance Criteria

------------------------------------------------------------------------

# 1. Purpose

This document defines every communication contract within FORGE.

No module may communicate through undocumented interfaces.

All APIs, events, repositories, workers, collectors, engines and
dashboards must conform to these contracts.

------------------------------------------------------------------------

# 2. Design Principles

-   Contract First Development
-   Backward Compatibility
-   Explicit Interfaces
-   Strong Typing
-   Deterministic Responses
-   Event-Driven Communication
-   Loose Coupling

------------------------------------------------------------------------

# 3. Communication Model

``` text
Dashboard
    │
 REST API
    │
Application Layer
    │
Event Bus
 ┌──┼────────────┐
 │  │            │
Collectors   Engines   Workers
 │              │
Repositories / Storage
```

Direct engine-to-engine calls are prohibited.

------------------------------------------------------------------------

# 4. API Standards

All APIs shall:

-   Use REST initially
-   Return JSON
-   Be versioned
-   Be stateless
-   Validate inputs
-   Return structured errors

Future:

-   GraphQL
-   Internal gRPC
-   Streaming APIs

------------------------------------------------------------------------

# 5. API Versioning

Pattern

/api/v1/

Rules

-   Never break existing clients
-   Introduce incompatible changes through new versions
-   Deprecate before removal

------------------------------------------------------------------------

# 6. Canonical Request & Response Contracts

## Request Metadata

Every request contains:

-   requestId
-   timestamp
-   apiVersion
-   caller
-   correlationId

## Success Response

Contains:

-   success
-   data
-   metadata
-   pagination (when applicable)

## Failure Response

Contains:

-   success = false
-   errorCode
-   message
-   details
-   correlationId

No endpoint returns unstructured errors.

------------------------------------------------------------------------

# 7. Event Architecture

Events are immutable.

Events describe facts.

Never commands.

Example

Correct:

OpportunityScored

Incorrect:

ScoreOpportunity

------------------------------------------------------------------------

# 8. Canonical Event Schema

Every event includes:

-   eventId
-   eventName
-   eventVersion
-   aggregateId
-   aggregateType
-   timestamp
-   producer
-   payload
-   metadata

Metadata includes:

-   correlationId
-   causationId
-   schemaVersion

------------------------------------------------------------------------

# 9. Event Catalog

Core platform events

CollectorStarted

CollectorCompleted

CollectorFailed

RawDataCollected

DataValidated

DataNormalized

SnapshotStored

EvidenceGenerated

TrendCalculated

PainEstimated

MarketAnalyzed

CompetitionAnalyzed

FeasibilityEstimated

MonetizationEvaluated

OpportunityScored

OpportunityRanked

PortfolioUpdated

ReportGenerated

AnalysisCompleted

SystemHealthUpdated

ConfigurationChanged

Every event is documented independently before implementation.

------------------------------------------------------------------------

# 10. Engine Contracts

Each engine exposes:

Initialize()

Analyze()

PublishEvidence()

Health()

Metrics()

Consumes:

Canonical Events

Produces:

Evidence Events

Engines never expose storage implementations.

------------------------------------------------------------------------

# 11. Collector Contracts

Every collector implements:

Initialize()

Fetch()

Validate()

Normalize()

Persist()

Publish()

Health()

Collectors return canonical normalized entities only.

------------------------------------------------------------------------

# 12. Repository Contracts

Repositories expose only domain operations.

Required methods:

Create

FindById

FindMany

Update

Archive

Exists

Search

Repositories never contain business intelligence.

------------------------------------------------------------------------

# 13. Error Contracts

Recoverable

-   Retry
-   Backoff
-   Continue

Non-Recoverable

-   Dead-letter queue (future)
-   Audit log
-   Alert
-   Continue remaining pipeline

Error object contains:

-   code
-   category
-   severity
-   message
-   context
-   timestamp

------------------------------------------------------------------------

# 14. Idempotency Rules

Operations must be safely repeatable.

Required for:

-   collectors
-   workers
-   scheduled jobs
-   event consumers

Duplicate events must not duplicate business state.

------------------------------------------------------------------------

# 15. Authentication & Authorization

Phase 1

Local trusted environment.

Phase 2

API Keys

Phase 3

OAuth

Future

Role-Based Access Control

Principles

-   Least privilege
-   Secret rotation
-   Encrypted configuration

------------------------------------------------------------------------

# 16. Observability

Every request and event must be traceable.

Required telemetry:

-   requestId
-   correlationId
-   execution time
-   producer
-   consumer
-   retry count

Future support:

-   distributed tracing
-   metrics dashboards
-   alerting

------------------------------------------------------------------------

# 17. Contract Evolution

Every contract change requires:

-   semantic version update
-   migration notes
-   compatibility assessment
-   documentation update

No undocumented interface changes are permitted.

------------------------------------------------------------------------

# 18. Future Integration Strategy

Reserved interfaces for:

-   Public SDK
-   CLI
-   Browser Extension
-   Mobile Client
-   Third-party Plugins
-   Marketplace Integrations
-   AI Agent Integrations

All future integrations consume the same canonical contracts.

------------------------------------------------------------------------

# 19. Acceptance Criteria

This specification is complete when:

-   API standards are defined.
-   Event schema is standardized.
-   Canonical events are cataloged.
-   Engine and collector interfaces are documented.
-   Error handling contracts are explicit.
-   Future integrations can be implemented without redesigning existing
    interfaces.
