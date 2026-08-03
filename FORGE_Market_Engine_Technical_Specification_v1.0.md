# FORGE --- Founder Intelligence Operating System (FIOS)

# Market Engine Technical Specification (METS)

**Version:** 1.0 **Status:** Engine Specification

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
9.  Analysis Stages
10. Canonical Models
11. Analytical Methods
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

The Market Engine estimates the commercial attractiveness of an
opportunity by evaluating market demand, recurring usage potential,
audience characteristics, and commercial intent from accumulated
evidence.

------------------------------------------------------------------------

# 2. Objectives

-   Estimate demand
-   Estimate market maturity
-   Identify target segments
-   Measure commercial intent
-   Estimate recurring usage
-   Produce explainable market evidence

------------------------------------------------------------------------

# 3. Scope

## In Scope

-   Demand estimation
-   Audience segmentation
-   Commercial intent analysis
-   Market maturity classification
-   Recurring usage estimation

## Out of Scope

-   Pricing strategy
-   Competitor comparison
-   Technical feasibility
-   Final opportunity ranking

------------------------------------------------------------------------

# 4. Responsibilities

-   Consume discovery, trend and pain evidence
-   Aggregate market indicators
-   Generate market evidence
-   Estimate opportunity attractiveness
-   Publish standardized events

------------------------------------------------------------------------

# 5. Non-Responsibilities

The engine shall never:

-   Recommend pricing
-   Calculate ROI
-   Score opportunities
-   Predict guaranteed revenue

------------------------------------------------------------------------

# 6. Inputs

Consumes:

-   DiscoveryEvidence
-   TrendEvidence
-   PainEvidence
-   Search Metrics
-   Historical Snapshots
-   Source Metadata

------------------------------------------------------------------------

# 7. Outputs

Produces:

-   MarketEvidence
-   DemandEstimate
-   CommercialIntentScore
-   AudienceProfile
-   RecurringUsageEstimate

Publishes:

-   MarketAnalyzed
-   MarketEvidenceGenerated

------------------------------------------------------------------------

# 8. Processing Pipeline

Evidence ↓

Validation ↓

Demand Aggregation ↓

Audience Analysis ↓

Commercial Intent Analysis ↓

Market Classification ↓

Recurring Usage Estimation ↓

Confidence Calculation ↓

Evidence Generation ↓

Persistence

------------------------------------------------------------------------

# 9. Analysis Stages

1.  Input Validation
2.  Evidence Aggregation
3.  Demand Estimation
4.  Audience Segmentation
5.  Commercial Intent Detection
6.  Recurring Usage Assessment
7.  Market Classification
8.  Confidence Calculation
9.  Persistence
10. Event Publication

------------------------------------------------------------------------

# 10. Canonical Models

## MarketEvidence

-   id
-   opportunityId
-   confidence
-   generatedAt

## DemandEstimate

-   estimatedDemand
-   confidence
-   supportingSignals

## AudienceProfile

-   primaryAudience
-   secondaryAudience
-   audienceBreadth

## MarketMetrics

-   demandScore
-   commercialIntent
-   recurringUsage
-   maturity
-   accessibility

------------------------------------------------------------------------

# 11. Analytical Methods

Initial implementation

-   Weighted evidence aggregation
-   Search demand normalization
-   Audience clustering
-   Heuristic market classification
-   Rule-based commercial intent scoring

Future

-   External market datasets
-   Forecasting models
-   Industry-specific estimators
-   Geographic segmentation

Algorithms remain replaceable.

------------------------------------------------------------------------

# 12. Confidence Model

Factors

-   Evidence volume
-   Source diversity
-   Historical consistency
-   Signal agreement
-   Data freshness

Range

0.00 → 1.00

Confidence must expose contributing factors.

------------------------------------------------------------------------

# 13. Event Contracts

Consumes

-   TrendCalculated
-   PainEstimated

Publishes

-   MarketAnalyzed
-   MarketEvidenceGenerated

------------------------------------------------------------------------

# 14. Persistence

Stores

-   market evidence
-   audience profiles
-   demand estimates
-   execution metrics

Derived data is versioned.

------------------------------------------------------------------------

# 15. Configuration

Parameters

-   minimumEvidence
-   demandThreshold
-   confidenceThreshold
-   weightingProfile
-   analysisWindow

Configuration is externalized.

------------------------------------------------------------------------

# 16. Failure Handling

Recoverable

-   retry
-   partial analysis

Non-Recoverable

-   quarantine analysis
-   publish failure event
-   continue remaining pipeline

------------------------------------------------------------------------

# 17. Metrics

Operational

-   execution time
-   records analyzed
-   failures

Business

-   average demand score
-   commercial intent distribution
-   recurring usage estimates
-   confidence distribution

------------------------------------------------------------------------

# 18. Testing Strategy

-   Unit tests
-   Integration tests
-   Golden datasets
-   Regression tests
-   Performance benchmarks

Outputs must be deterministic for identical evidence.

------------------------------------------------------------------------

# 19. Future Enhancements

-   TAM/SAM/SOM estimation
-   Geographic demand mapping
-   Enterprise vs consumer segmentation
-   Industry benchmarking
-   Macroeconomic overlays

------------------------------------------------------------------------

# 20. Acceptance Criteria

Complete when:

-   Market analysis pipeline is documented.
-   Inputs and outputs are standardized.
-   Canonical models are defined.
-   Confidence methodology is specified.
-   Event and persistence contracts are documented.
-   The engine can be implemented independently.
