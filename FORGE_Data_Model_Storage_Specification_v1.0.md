# FORGE --- Founder Intelligence Operating System (FIOS)

# Data Model & Storage Specification (DMSS)

**Version:** 1.0\
**Status:** Canonical Data Blueprint

------------------------------------------------------------------------

# Table of Contents

1.  Purpose
2.  Data Architecture Principles
3.  Data Lifecycle
4.  Storage Architecture
5.  Canonical Entity Model
6.  Entity Specifications
7.  Relationships
8.  Versioning Strategy
9.  Historical Snapshots
10. Indexing Strategy
11. Search Strategy
12. Data Integrity Rules
13. Data Validation
14. Metadata Standards
15. Backup & Recovery
16. Retention Policy
17. Migration Strategy
18. Future Extensions
19. Acceptance Criteria

------------------------------------------------------------------------

# 1. Purpose

This document defines every persistent data object used throughout
FORGE.

The objective is to establish a canonical data model so that every
collector, engine, API, and dashboard communicates using identical
structures.

------------------------------------------------------------------------

# 2. Data Architecture Principles

-   Single Source of Truth
-   Immutable Raw Data
-   Versioned Derived Data
-   Append-Only Historical Records
-   Canonical Domain Models
-   Event-Driven Synchronization
-   Storage Engine Independence

------------------------------------------------------------------------

# 3. Data Lifecycle

Internet Source

↓

Raw Record

↓

Validation

↓

Normalization

↓

Canonical Entity

↓

Evidence

↓

Opportunity

↓

Historical Snapshot

↓

Knowledge Repository

------------------------------------------------------------------------

# 4. Storage Architecture

Logical Storage Layers

1.  Raw Storage
2.  Normalized Storage
3.  Intelligence Storage
4.  Decision Storage
5.  Knowledge Storage
6.  Configuration Storage

Physical storage implementation may change without altering domain
models.

------------------------------------------------------------------------

# 5. Canonical Entity Model

Core entities:

-   Source
-   Collector
-   RawRecord
-   NormalizedRecord
-   Evidence
-   Signal
-   Trend
-   Opportunity
-   Competitor
-   Market
-   Experiment
-   Project
-   Report
-   UserPreference
-   AuditLog
-   Configuration

Each entity owns its own repository.

------------------------------------------------------------------------

# 6. Entity Specifications

## Source

Represents an external information provider.

Fields

-   id
-   name
-   type
-   url
-   collector
-   enabled
-   createdAt
-   updatedAt

------------------------------------------------------------------------

## Collector

Represents a data acquisition module.

Fields

-   id
-   name
-   version
-   schedule
-   health
-   lastRun
-   nextRun

------------------------------------------------------------------------

## RawRecord

Immutable external observation.

Fields

-   id
-   sourceId
-   collectedAt
-   payload
-   checksum
-   schemaVersion

Never modified after persistence.

------------------------------------------------------------------------

## NormalizedRecord

Canonical representation of external data.

Fields

-   id
-   rawRecordId
-   category
-   title
-   body
-   author
-   timestamp
-   metadata

------------------------------------------------------------------------

## Evidence

Machine-generated analytical observation.

Fields

-   id
-   engine
-   entityId
-   confidence
-   metrics
-   explanation
-   generatedAt

------------------------------------------------------------------------

## Signal

Atomic measurable indicator.

Examples

-   demand spike
-   repeated complaint
-   pricing increase
-   repository growth

Fields

-   id
-   type
-   value
-   confidence
-   timestamp

------------------------------------------------------------------------

## Trend

Time-series analysis.

Fields

-   id
-   subject
-   direction
-   growthRate
-   acceleration
-   volatility
-   confidence

------------------------------------------------------------------------

## Opportunity

Primary business object.

Fields

-   id
-   title
-   summary
-   stage
-   score
-   confidence
-   createdAt
-   updatedAt

References evidence instead of duplicating it.

------------------------------------------------------------------------

## Competitor

Fields

-   id
-   name
-   website
-   pricing
-   category
-   strengths
-   weaknesses

------------------------------------------------------------------------

## Market

Fields

-   id
-   category
-   estimatedDemand
-   recurringUsage
-   commercialIntent
-   confidence

------------------------------------------------------------------------

## Experiment

Tracks validation attempts.

Fields

-   hypothesis
-   outcome
-   metrics
-   decision
-   lessonsLearned

------------------------------------------------------------------------

## Project

Represents an implemented opportunity.

Lifecycle

Idea

↓

Research

↓

Planning

↓

Building

↓

Testing

↓

Production

↓

Archived

------------------------------------------------------------------------

## Report

Generated analytical artifact.

Fields

-   title
-   authorEngine
-   generatedAt
-   referencedEvidence
-   summary

------------------------------------------------------------------------

## AuditLog

Append-only system history.

Captures

-   configuration changes
-   engine executions
-   scoring updates
-   user decisions

------------------------------------------------------------------------

# 7. Relationships

Source

1:N

RawRecord

↓

1:1

NormalizedRecord

↓

1:N

Evidence

↓

N:1

Opportunity

↓

1:N

Reports

↓

1:N

Projects

Evidence remains reusable across multiple opportunities.

------------------------------------------------------------------------

# 8. Versioning Strategy

Every mutable entity includes:

-   schemaVersion
-   createdAt
-   updatedAt

Derived intelligence additionally records:

-   generatedByVersion
-   modelVersion
-   evidenceVersion

No destructive overwrites.

------------------------------------------------------------------------

# 9. Historical Snapshots

Snapshots preserve platform state over time.

Intervals

-   daily
-   weekly
-   monthly

Snapshots allow longitudinal analysis.

------------------------------------------------------------------------

# 10. Indexing Strategy

Primary indexes

-   Entity ID
-   Timestamp
-   Source
-   Category
-   Opportunity Score

Secondary indexes

-   Trend Direction
-   Confidence
-   Stage

Future

-   Vector embeddings
-   Semantic indexing

------------------------------------------------------------------------

# 11. Search Strategy

Phase 1

PostgreSQL Full Text Search

Phase 2

Hybrid search

Phase 3

Vector semantic search

Search must remain provider-independent.

------------------------------------------------------------------------

# 12. Data Integrity Rules

-   UUID primary keys
-   Foreign-key enforcement
-   Immutable raw records
-   Cascading prohibited for evidence
-   Soft delete for user-managed entities
-   Hard delete only for temporary caches

------------------------------------------------------------------------

# 13. Data Validation

Validation pipeline

Schema Validation

↓

Type Validation

↓

Business Rules

↓

Persistence

↓

Event Publication

Invalid records never reach intelligence engines.

------------------------------------------------------------------------

# 14. Metadata Standards

Every persisted object stores:

-   id
-   schemaVersion
-   createdAt
-   updatedAt
-   source
-   tags
-   confidence (when applicable)

Metadata remains consistent across the platform.

------------------------------------------------------------------------

# 15. Backup & Recovery

Backups

-   Daily incremental
-   Weekly full
-   Monthly archive

Recovery goals

-   Preserve raw data
-   Preserve evidence history
-   Preserve audit logs

------------------------------------------------------------------------

# 16. Retention Policy

Raw Data

Retained indefinitely.

Derived Data

Versioned indefinitely.

Temporary Cache

TTL controlled.

Logs

Rotated according to configuration.

------------------------------------------------------------------------

# 17. Migration Strategy

All schema changes require:

-   migration script
-   rollback script
-   compatibility validation
-   version documentation

Backward compatibility is preferred whenever practical.

------------------------------------------------------------------------

# 18. Future Extensions

Reserved entity groups

-   User Profiles
-   Team Collaboration
-   API Integrations
-   AI Memory
-   Knowledge Graph
-   Recommendation Graph
-   Marketplace Metadata
-   Financial Models

Current design must support future expansion without redesigning
existing entities.

------------------------------------------------------------------------

# 19. Acceptance Criteria

This specification is complete when:

-   Every domain entity is defined.
-   Entity ownership is explicit.
-   Relationships are documented.
-   Versioning rules are standardized.
-   Storage remains implementation-independent.
-   Future database technologies can replace current implementations
    without changing the domain model.
