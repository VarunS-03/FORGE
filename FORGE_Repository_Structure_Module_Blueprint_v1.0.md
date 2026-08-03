# FORGE --- Founder Intelligence Operating System (FIOS)

# Repository Structure & Module Blueprint (RSMB)

**Version:** 1.0\
**Status:** Repository Blueprint

------------------------------------------------------------------------

# Table of Contents

1.  Purpose
2.  Repository Philosophy
3.  Top-Level Repository Layout
4.  Directory Responsibilities
5.  Package Standards
6.  Application Modules
7.  Core Infrastructure
8.  Collector Modules
9.  Intelligence Engine Modules
10. Storage Modules
11. Shared Libraries
12. Configuration Layout
13. Testing Layout
14. Documentation Layout
15. Infrastructure Layout
16. Import Rules
17. Dependency Matrix
18. Module Templates
19. Naming Standards
20. Acceptance Criteria

------------------------------------------------------------------------

# 1. Purpose

This document defines the physical repository organization for FORGE.

The folder hierarchy is treated as an architectural contract.

No implementation should introduce new top-level directories without an
Architecture Decision Record (ADR).

------------------------------------------------------------------------

# 2. Repository Philosophy

The repository shall be:

-   Feature-oriented
-   Domain-driven
-   Modular
-   Discoverable
-   Scalable
-   Monorepo-first

Every directory exists to represent a business capability rather than a
technical convenience.

------------------------------------------------------------------------

# 3. Top-Level Repository Layout

``` text
forge/
│
├── apps/
├── packages/
├── collectors/
├── engines/
├── storage/
├── docs/
├── automation/
├── infrastructure/
├── scripts/
├── tests/
├── .github/
├── .vscode/
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

------------------------------------------------------------------------

# 4. Directory Responsibilities

## apps/

Executable applications.

Contains:

-   dashboard
-   api
-   worker

No reusable business logic.

------------------------------------------------------------------------

## packages/

Reusable libraries shared across the repository.

Contains:

-   core
-   config
-   shared
-   ui
-   database

------------------------------------------------------------------------

## collectors/

Independent data acquisition modules.

One directory per source.

Examples:

-   reddit
-   github
-   hackernews
-   rss
-   youtube
-   producthunt
-   jobs

------------------------------------------------------------------------

## engines/

Independent intelligence modules.

One directory per engine.

Examples:

-   discovery
-   trend
-   pain
-   market
-   competition
-   feasibility
-   monetization
-   scoring
-   portfolio

------------------------------------------------------------------------

## storage/

Storage adapters.

Contains:

-   repositories
-   migrations
-   snapshots
-   backups

------------------------------------------------------------------------

## docs/

All project documentation.

Subdirectories:

-   architecture
-   specifications
-   adr
-   diagrams
-   api
-   roadmap
-   research

------------------------------------------------------------------------

## automation/

Scheduled workflows.

Contains:

-   cron
-   notifications
-   reports
-   maintenance

------------------------------------------------------------------------

## infrastructure/

Deployment and operational assets.

Contains:

-   docker
-   ci
-   monitoring
-   deployment

------------------------------------------------------------------------

## scripts/

Developer tooling.

Examples:

-   bootstrap
-   lint
-   seed
-   migrate
-   backup

------------------------------------------------------------------------

## tests/

Cross-module integration and end-to-end tests.

------------------------------------------------------------------------

# 5. Package Standards

Every package follows:

``` text
package/
├── src/
├── tests/
├── README.md
├── package.json
└── tsconfig.json
```

Public exports only through:

src/index.ts

------------------------------------------------------------------------

# 6. Application Modules

dashboard/

Responsible only for UI.

api/

Responsible only for HTTP interface.

worker/

Responsible only for scheduled processing.

Applications consume packages.

Applications never contain domain logic.

------------------------------------------------------------------------

# 7. Core Infrastructure

packages/core

Contains:

-   logger
-   event bus
-   scheduler
-   dependency container
-   error handling
-   lifecycle management

No business intelligence.

------------------------------------------------------------------------

# 8. Collector Modules

Collector template

``` text
collector-name/
├── application/
├── domain/
├── infrastructure/
├── interfaces/
├── tests/
├── README.md
└── index.ts
```

Responsibilities

Fetch

Validate

Normalize

Publish

Health

------------------------------------------------------------------------

# 9. Intelligence Engine Modules

Engine template

``` text
engine-name/
├── application/
├── domain/
├── infrastructure/
├── interfaces/
├── tests/
├── README.md
└── index.ts
```

Responsibilities

Receive Evidence

Analyze

Generate Evidence

Publish Events

Persist Results

------------------------------------------------------------------------

# 10. Storage Modules

database/

-   schema
-   repositories
-   migrations

snapshots/

Historical snapshots.

backups/

Backup strategies.

vectors/

Future semantic search.

------------------------------------------------------------------------

# 11. Shared Libraries

packages/shared

Reusable utilities.

Examples:

-   DTOs
-   constants
-   validation
-   helpers
-   common types

No business logic.

------------------------------------------------------------------------

# 12. Configuration Layout

packages/config

Contains:

-   environment
-   defaults
-   schema
-   validation

Configuration is immutable after startup.

------------------------------------------------------------------------

# 13. Testing Layout

Module tests remain local.

Global tests reside under:

tests/

Structure

``` text
tests/
├── integration/
├── e2e/
├── regression/
├── performance/
└── fixtures/
```

------------------------------------------------------------------------

# 14. Documentation Layout

``` text
docs/
├── architecture/
├── specifications/
├── adr/
├── diagrams/
├── api/
├── roadmap/
└── research/
```

Documentation evolves alongside implementation.

------------------------------------------------------------------------

# 15. Infrastructure Layout

``` text
infrastructure/
├── docker/
├── ci/
├── deployment/
├── monitoring/
└── security/
```

------------------------------------------------------------------------

# 16. Import Rules

Allowed

Applications → Packages

Collectors → Packages

Engines → Packages

Forbidden

Collector → Collector

Engine → Engine implementation

Dashboard → Database

Only public interfaces may be imported across domains.

------------------------------------------------------------------------

# 17. Dependency Matrix

Presentation

↓

Application

↓

Domain

↓

Infrastructure

↓

External Services

Dependencies always point inward toward stable abstractions.

------------------------------------------------------------------------

# 18. Module Templates

Every module must include:

-   README.md
-   index.ts
-   package.json (if standalone)
-   tests/
-   public interfaces
-   architecture notes (if complex)

------------------------------------------------------------------------

# 19. Naming Standards

Directories: kebab-case

Files: kebab-case

Classes: PascalCase

Interfaces: PascalCase

Functions: camelCase

Events: Past tense

Repositories: `<Entity>`{=html}Repository

Services: `<Entity>`{=html}Service

------------------------------------------------------------------------

# 20. Acceptance Criteria

This blueprint is complete when:

-   Repository hierarchy is fully defined.
-   Every directory has a documented responsibility.
-   Module templates are standardized.
-   Dependency rules are explicit.
-   Import boundaries are enforced.
-   Future expansion requires no restructuring of the repository root.
