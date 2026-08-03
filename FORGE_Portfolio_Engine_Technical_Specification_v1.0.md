# FORGE --- Founder Intelligence Operating System (FIOS)

# Portfolio Engine Technical Specification (PETS)

**Version:** 1.0\
**Status:** Engine Specification

------------------------------------------------------------------------

# Table of Contents

1.  Purpose
2.  Objectives
3.  Scope
4.  Responsibilities
5.  Non-Responsibilities
6.  Inputs
7.  Outputs
8.  Processing Pipeline
9.  Portfolio Lifecycle
10. Canonical Models
11. Decision Methodology
12. Confidence Model
13. Event Contracts
14. Persistence
15. Configuration
16. Failure Handling
17. Metrics
18. Testing Strategy
19. Future Enhancements
20. Acceptance Criteria

------------------------------------------------------------------------

# 1. Purpose

The Portfolio Engine manages the complete lifecycle of every opportunity
discovered by FORGE.

Its responsibility is to maintain a continuously evolving portfolio,
preserving historical context, experiments, outcomes, and strategic
decisions.

The Portfolio Engine is the system of record for opportunity state.

------------------------------------------------------------------------

# 2. Objectives

-   Track opportunity lifecycle
-   Maintain historical state
-   Prevent duplicate work
-   Record experiments
-   Capture outcomes
-   Support portfolio prioritization

------------------------------------------------------------------------

# 3. Scope

## In Scope

-   Opportunity lifecycle management
-   Portfolio state management
-   Experiment tracking
-   Historical timeline
-   Portfolio analytics

## Out of Scope

-   Opportunity discovery
-   Market analysis
-   Code generation
-   Automated execution

------------------------------------------------------------------------

# 4. Responsibilities

-   Maintain portfolio state
-   Record state transitions
-   Track experiments
-   Archive completed opportunities
-   Publish portfolio events

------------------------------------------------------------------------

# 5. Non-Responsibilities

The engine shall never:

-   Generate new opportunities
-   Override scoring
-   Modify upstream evidence
-   Replace founder decisions

------------------------------------------------------------------------

# 6. Inputs

Consumes:

-   OpportunityRanked
-   OpportunityScored
-   Manual founder actions
-   Experiment outcomes
-   Historical portfolio records

------------------------------------------------------------------------

# 7. Outputs

Produces:

-   PortfolioEntry
-   LifecycleHistory
-   ExperimentRecord
-   PortfolioAnalytics

Publishes:

-   PortfolioUpdated
-   OpportunityArchived
-   PortfolioMetricsGenerated

------------------------------------------------------------------------

# 8. Processing Pipeline

Opportunity Events ↓

Validation ↓

State Resolution ↓

Lifecycle Update ↓

Experiment Recording ↓

Portfolio Metrics ↓

Persistence ↓

Event Publication

------------------------------------------------------------------------

# 9. Portfolio Lifecycle

Idea

↓

Research

↓

Validated

↓

Planning

↓

Building

↓

Testing

↓

Production

↓

Growing

↓

Maintaining

↓

Archived

Transitions must be explicit and fully auditable.

------------------------------------------------------------------------

# 10. Canonical Models

## PortfolioEntry

-   id
-   opportunityId
-   currentState
-   priority
-   score
-   createdAt
-   updatedAt

## LifecycleEvent

-   id
-   previousState
-   newState
-   timestamp
-   actor
-   rationale

## ExperimentRecord

-   hypothesis
-   implementation
-   metrics
-   outcome
-   lessonsLearned

## PortfolioMetrics

-   activeProjects
-   archivedProjects
-   averageScore
-   validationRate
-   implementationRate

------------------------------------------------------------------------

# 11. Decision Methodology

The Portfolio Engine does not create decisions.

It records and organizes them.

Rules

-   Preserve complete history
-   Never overwrite previous states
-   Record rationale for every transition
-   Support rollback through historical state

------------------------------------------------------------------------

# 12. Confidence Model

Portfolio confidence is derived from:

-   opportunity confidence
-   experiment completeness
-   historical consistency
-   evidence freshness

Range

0.00 → 1.00

------------------------------------------------------------------------

# 13. Event Contracts

Consumes

-   OpportunityRanked
-   OpportunityScored

Publishes

-   PortfolioUpdated
-   OpportunityArchived
-   PortfolioMetricsGenerated

------------------------------------------------------------------------

# 14. Persistence

Stores

-   portfolio entries
-   lifecycle events
-   experiments
-   archived opportunities
-   execution metrics

History is append-only.

------------------------------------------------------------------------

# 15. Configuration

Parameters

-   archiveThreshold
-   staleOpportunityWindow
-   lifecyclePolicies
-   portfolioLimits
-   reportingInterval

Configuration must be externalized.

------------------------------------------------------------------------

# 16. Failure Handling

Recoverable

-   retry update
-   replay event

Non-Recoverable

-   quarantine record
-   publish failure event
-   preserve existing portfolio state

------------------------------------------------------------------------

# 17. Metrics

Operational

-   execution time
-   updates processed
-   failures

Business

-   active opportunities
-   validation ratio
-   implementation ratio
-   archive rate
-   portfolio health

------------------------------------------------------------------------

# 18. Testing Strategy

-   Unit tests
-   Integration tests
-   Event replay tests
-   Golden datasets
-   Regression tests

Portfolio history must remain deterministic and auditable.

------------------------------------------------------------------------

# 19. Future Enhancements

-   Multi-founder collaboration
-   Team assignment
-   OKR integration
-   Financial tracking
-   Portfolio forecasting
-   Cross-project dependency graphs

------------------------------------------------------------------------

# 20. Acceptance Criteria

Complete when:

-   Portfolio lifecycle is fully documented.
-   State transitions are standardized.
-   Canonical models are defined.
-   Events and persistence are documented.
-   Historical auditing is supported.
-   The engine can be implemented independently.
