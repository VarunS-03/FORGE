# FORGE --- Founder Intelligence Operating System (FIOS)

# Competition Engine Technical Specification (CETS)

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

The Competition Engine evaluates the competitive landscape surrounding
an opportunity by identifying existing solutions, estimating market
saturation, mapping feature overlap, and discovering differentiation
opportunities.

Its purpose is to generate evidence describing competitive
pressure---not to recommend strategic decisions.

------------------------------------------------------------------------

# 2. Objectives

-   Identify direct competitors
-   Identify indirect competitors
-   Estimate market saturation
-   Detect feature overlap
-   Discover competitive gaps
-   Produce explainable competitive evidence

------------------------------------------------------------------------

# 3. Scope

## In Scope

-   Competitor discovery
-   Feature comparison
-   Market saturation analysis
-   Positioning analysis
-   Gap identification

## Out of Scope

-   Revenue prediction
-   Pricing recommendations
-   Opportunity prioritization
-   Product roadmap generation

------------------------------------------------------------------------

# 4. Responsibilities

-   Aggregate competitor evidence
-   Build competitor profiles
-   Compare capabilities
-   Detect underserved areas
-   Publish competition evidence

------------------------------------------------------------------------

# 5. Non-Responsibilities

The engine shall never:

-   Rank opportunities
-   Recommend implementation plans
-   Determine pricing
-   Replace founder judgment

------------------------------------------------------------------------

# 6. Inputs

Consumes:

-   DiscoveryEvidence
-   MarketEvidence
-   TrendEvidence
-   Public product metadata
-   Product directories
-   Repository metadata
-   Historical competitor records

------------------------------------------------------------------------

# 7. Outputs

Produces:

-   CompetitionEvidence
-   CompetitorProfile
-   GapAnalysis
-   SaturationAssessment
-   DifferentiationSignals

Publishes:

-   CompetitionAnalyzed
-   CompetitionEvidenceGenerated

------------------------------------------------------------------------

# 8. Processing Pipeline

Evidence ↓

Validation ↓

Competitor Discovery ↓

Feature Extraction ↓

Capability Comparison ↓

Gap Detection ↓

Saturation Assessment ↓

Confidence Calculation ↓

Evidence Generation ↓

Persistence

------------------------------------------------------------------------

# 9. Analysis Stages

1.  Validate Inputs
2.  Discover Competitors
3.  Normalize Competitor Data
4.  Compare Features
5.  Measure Saturation
6.  Detect Differentiation
7.  Estimate Competitive Pressure
8.  Calculate Confidence
9.  Persist Evidence
10. Publish Events

------------------------------------------------------------------------

# 10. Canonical Models

## CompetitionEvidence

-   id
-   opportunityId
-   confidence
-   generatedAt

## CompetitorProfile

-   id
-   name
-   category
-   featureCoverage
-   positioning
-   confidence

## GapAnalysis

-   uncoveredNeeds
-   underservedSegments
-   differentiationAreas

## CompetitionMetrics

-   saturationScore
-   featureOverlap
-   barrierToEntry
-   differentiationPotential

------------------------------------------------------------------------

# 11. Analytical Methods

Initial implementation

-   Rule-based competitor discovery
-   Feature matrix comparison
-   Similarity scoring
-   Heuristic saturation estimation
-   Gap analysis

Future

-   Semantic feature comparison
-   Competitive graph analysis
-   Pricing intelligence integration
-   Automated positioning maps

Algorithms remain replaceable.

------------------------------------------------------------------------

# 12. Confidence Model

Factors

-   Competitor coverage
-   Data freshness
-   Source diversity
-   Feature completeness
-   Evidence agreement

Range

0.00 → 1.00

Confidence must expose contributing factors.

------------------------------------------------------------------------

# 13. Event Contracts

Consumes

-   MarketAnalyzed
-   TrendCalculated

Publishes

-   CompetitionAnalyzed
-   CompetitionEvidenceGenerated

------------------------------------------------------------------------

# 14. Persistence

Stores

-   competitor profiles
-   comparison matrices
-   gap analyses
-   saturation metrics
-   execution metrics

Derived data is versioned.

------------------------------------------------------------------------

# 15. Configuration

Parameters

-   similarityThreshold
-   minimumCompetitors
-   confidenceThreshold
-   comparisonDepth
-   refreshInterval

Configuration is externalized.

------------------------------------------------------------------------

# 16. Failure Handling

Recoverable

-   retry
-   partial comparison

Non-Recoverable

-   quarantine dataset
-   publish failure event
-   continue pipeline

------------------------------------------------------------------------

# 17. Metrics

Operational

-   execution time
-   competitors analyzed
-   failure count

Business

-   average saturation score
-   differentiation opportunities
-   competitor coverage
-   confidence distribution

------------------------------------------------------------------------

# 18. Testing Strategy

-   Unit tests
-   Integration tests
-   Golden datasets
-   Regression tests
-   Performance benchmarks

Outputs must remain deterministic.

------------------------------------------------------------------------

# 19. Future Enhancements

-   Live pricing monitoring
-   Release tracking
-   Review sentiment integration
-   SWOT generation
-   Competitive landscape visualization

------------------------------------------------------------------------

# 20. Acceptance Criteria

Complete when:

-   Competition pipeline is documented.
-   Inputs and outputs are standardized.
-   Canonical models are defined.
-   Confidence methodology is specified.
-   Event and persistence contracts are documented.
-   The engine can be implemented independently.
