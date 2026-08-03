# FORGE --- Founder Intelligence Operating System (FIOS)

# Repository Standards & Engineering Guidelines (RSEG)

**Version:** 1.0\
**Status:** Engineering Governance Standard

------------------------------------------------------------------------

# Table of Contents

1.  Purpose
2.  Engineering Philosophy
3.  Repository Structure
4.  Module Organization
5.  Naming Conventions
6.  Coding Standards
7.  Dependency Rules
8.  Git Workflow
9.  Branch Strategy
10. Commit Standards
11. Documentation Standards
12. Testing Strategy
13. Code Review Checklist
14. Configuration Management
15. Security Standards
16. Performance Standards
17. Logging Standards
18. Release Strategy
19. Technical Debt Policy
20. Acceptance Criteria

------------------------------------------------------------------------

# 1. Purpose

This document defines the engineering standards governing every file,
folder, class, function, interface, test, and commit within FORGE.

Consistency is treated as an architectural requirement rather than a
preference.

------------------------------------------------------------------------

# 2. Engineering Philosophy

Engineering decisions shall prioritize:

-   Readability over cleverness
-   Simplicity over premature optimization
-   Composition over inheritance
-   Explicitness over magic
-   Interfaces over implementations
-   Long-term maintainability over short-term speed

Every change should make the repository easier---not harder---to
understand.

------------------------------------------------------------------------

# 3. Repository Structure

``` text
forge/
├── docs/
├── apps/
├── packages/
├── collectors/
├── engines/
├── storage/
├── automation/
├── infrastructure/
├── scripts/
└── tests/
```

Rules

-   Feature code remains within its owning domain.
-   Shared code lives only inside `packages/shared`.
-   Cross-domain imports require public interfaces.

------------------------------------------------------------------------

# 4. Module Organization

Each module should follow:

``` text
module/
├── application/
├── domain/
├── infrastructure/
├── interfaces/
├── tests/
├── index.ts
└── README.md
```

Responsibilities

Application: Use cases and orchestration.

Domain: Business rules.

Infrastructure: Persistence, APIs, adapters.

Interfaces: DTOs, contracts, public exports.

Tests: Module-local tests.

------------------------------------------------------------------------

# 5. Naming Conventions

Folders: kebab-case

Files: kebab-case

Classes: PascalCase

Interfaces: PascalCase

Functions: camelCase

Constants: UPPER_SNAKE_CASE

Variables: camelCase

Events: Past tense Example: OpportunityScored

Commands: Verb-based Example: AnalyzeOpportunity

------------------------------------------------------------------------

# 6. Coding Standards

General

-   SOLID principles
-   DRY where beneficial
-   Avoid hidden side effects
-   Small functions
-   Single responsibility
-   Explicit return types
-   No unexplained magic numbers

Comments

Write comments to explain *why*, not *what*.

Public APIs require documentation.

------------------------------------------------------------------------

# 7. Dependency Rules

Allowed dependency direction

Presentation ↓

Application ↓

Domain ↓

Infrastructure

Forbidden

-   Circular dependencies
-   Engine-to-engine implementation imports
-   UI directly accessing storage

All shared behavior passes through contracts.

------------------------------------------------------------------------

# 8. Git Workflow

Main branches

main

develop

Feature branches

feature/`<feature-name>`{=html}

Bug fixes

fix/`<issue-name>`{=html}

Documentation

docs/`<topic>`{=html}

Refactoring

refactor/`<scope>`{=html}

Research

research/`<topic>`{=html}

------------------------------------------------------------------------

# 9. Branch Strategy

main

Production-ready only.

develop

Integration branch.

Feature branches

Merged only after review and successful tests.

Direct commits to main are prohibited.

------------------------------------------------------------------------

# 10. Commit Standards

Conventional Commits

Examples

feat:

fix:

docs:

refactor:

perf:

test:

build:

ci:

Example

feat(discovery): implement clustering pipeline

Every commit should represent one logical change.

------------------------------------------------------------------------

# 11. Documentation Standards

Every module includes:

README.md

Purpose

Responsibilities

Dependencies

Public API

Configuration

Examples

Architecture diagrams should accompany complex workflows.

Major architectural changes require an ADR.

------------------------------------------------------------------------

# 12. Testing Strategy

Testing Pyramid

Unit Tests

↓

Integration Tests

↓

End-to-End Tests

Requirements

Domain logic: High coverage.

Infrastructure: Integration validation.

Critical pipelines: Regression tests.

Golden datasets for deterministic engine validation.

------------------------------------------------------------------------

# 13. Code Review Checklist

Before merging, verify:

-   Architecture respected
-   Tests pass
-   No circular dependencies
-   Public interfaces documented
-   Logging appropriate
-   Errors handled
-   Configuration externalized
-   Naming consistent
-   No duplicated business logic
-   Performance acceptable

------------------------------------------------------------------------

# 14. Configuration Management

Rules

-   No secrets in source control
-   Environment-specific configuration separated
-   Default values documented
-   Sensitive values encrypted where applicable

Configuration precedence

Environment

↓

Configuration files

↓

Defaults

------------------------------------------------------------------------

# 15. Security Standards

-   Validate external input
-   Escape untrusted output
-   Principle of least privilege
-   Audit dependency updates
-   Never log secrets
-   Rotate credentials

Security defects receive highest priority.

------------------------------------------------------------------------

# 16. Performance Standards

Avoid optimization until measured.

Measure:

-   execution time
-   memory usage
-   collector throughput
-   engine latency

Optimize bottlenecks only.

------------------------------------------------------------------------

# 17. Logging Standards

Every significant operation logs:

-   timestamp
-   component
-   correlationId
-   outcome
-   duration

Levels

TRACE

DEBUG

INFO

WARN

ERROR

FATAL

Logs must be structured.

------------------------------------------------------------------------

# 18. Release Strategy

Development

↓

Internal Validation

↓

Release Candidate

↓

Production

Every release requires:

-   changelog
-   version tag
-   migration notes
-   rollback plan

Semantic Versioning

MAJOR.MINOR.PATCH

------------------------------------------------------------------------

# 19. Technical Debt Policy

Technical debt must be:

-   identified
-   documented
-   prioritized
-   tracked

No intentional debt without an associated issue.

Refactoring accompanies feature development whenever practical.

------------------------------------------------------------------------

# 20. Acceptance Criteria

This standard is complete when:

-   Repository organization is defined.
-   Naming conventions are standardized.
-   Engineering workflow is documented.
-   Testing expectations are explicit.
-   Review process is standardized.
-   Long-term maintainability is prioritized over implementation speed.
