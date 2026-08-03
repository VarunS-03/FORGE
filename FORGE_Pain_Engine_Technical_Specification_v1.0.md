# FORGE --- Founder Intelligence Operating System (FIOS)

# Pain Engine Technical Specification (PETS)

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

The Pain Engine quantifies how severe, urgent, frequent and costly a
problem is for the people experiencing it.

It converts qualitative complaints into measurable evidence that
downstream engines can evaluate.

------------------------------------------------------------------------

# 2. Objectives

-   Detect recurring complaints
-   Measure problem severity
-   Estimate urgency
-   Measure workflow friction
-   Identify willingness to adopt alternatives
-   Produce explainable pain evidence

------------------------------------------------------------------------

# 3. Scope

## In Scope

-   Complaint extraction
-   Pain categorization
-   Frequency analysis
-   Severity estimation
-   Urgency estimation

## Out of Scope

-   Opportunity ranking
-   Revenue estimation
-   Competitor comparison
-   Trend forecasting

------------------------------------------------------------------------

# 4. Responsibilities

-   Consume normalized discussions
-   Identify pain signals
-   Aggregate repeated complaints
-   Generate pain evidence
-   Publish standardized events

------------------------------------------------------------------------

# 5. Non-Responsibilities

The engine shall never:

-   Recommend products
-   Score opportunities
-   Estimate market size
-   Build business strategies

------------------------------------------------------------------------

# 6. Inputs

Consumes:

-   NormalizedRecord
-   DiscoveryEvidence
-   Historical Evidence
-   Reviews
-   Issue Trackers
-   Community Discussions

------------------------------------------------------------------------

# 7. Outputs

Produces:

-   PainEvidence
-   PainScore
-   UrgencyAssessment
-   ComplaintClusters

Publishes:

-   PainEstimated
-   PainEvidenceGenerated

------------------------------------------------------------------------

# 8. Processing Pipeline

Normalized Records ↓

Validation ↓

Complaint Extraction ↓

Problem Classification ↓

Severity Analysis ↓

Urgency Analysis ↓

Frequency Aggregation ↓

Confidence Estimation ↓

Evidence Generation ↓

Persistence

------------------------------------------------------------------------

# 9. Analysis Stages

1.  Input Validation
2.  Noise Filtering
3.  Complaint Detection
4.  Severity Classification
5.  Frequency Measurement
6.  Urgency Detection
7.  Friction Estimation
8.  Confidence Calculation
9.  Evidence Persistence
10. Event Publication

------------------------------------------------------------------------

# 10. Canonical Models

## PainEvidence

-   id
-   opportunityId
-   painScore
-   urgency
-   confidence
-   generatedAt

## ComplaintCluster

-   id
-   label
-   complaintCount
-   affectedSources
-   confidence

## PainMetrics

-   severity
-   recurrence
-   urgency
-   workflowImpact
-   replacementIntent

------------------------------------------------------------------------

# 11. Analytical Methods

Initial implementation

-   Rule-based extraction
-   Keyword weighting
-   Complaint frequency
-   Sentiment-assisted severity
-   Heuristic scoring

Future

-   Aspect-based sentiment
-   Multi-language detection
-   Behavioral analysis
-   Continuous learning

Algorithms remain replaceable.

------------------------------------------------------------------------

# 12. Confidence Model

Factors

-   Complaint count
-   Source diversity
-   Classification certainty
-   Historical consistency
-   Signal quality

Range

0.00 → 1.00

All scores must expose contributing factors.

------------------------------------------------------------------------

# 13. Event Contracts

Consumes

-   DiscoveryCompleted
-   DataNormalized

Publishes

-   PainEstimated
-   PainEvidenceGenerated

------------------------------------------------------------------------

# 14. Persistence

Stores

-   pain evidence
-   complaint clusters
-   severity metrics
-   execution metrics

Raw observations remain immutable.

------------------------------------------------------------------------

# 15. Configuration

Parameters

-   minimumComplaintCount
-   severityThreshold
-   urgencyThreshold
-   confidenceThreshold
-   batchSize

------------------------------------------------------------------------

# 16. Failure Handling

Recoverable

-   retry
-   skip malformed records

Non-Recoverable

-   quarantine batch
-   publish failure event
-   continue remaining pipeline

------------------------------------------------------------------------

# 17. Metrics

Operational

-   execution time
-   processed records
-   failure rate

Business

-   complaint clusters
-   average pain score
-   urgency distribution
-   evidence confidence

------------------------------------------------------------------------

# 18. Testing Strategy

-   Unit tests
-   Integration tests
-   Golden datasets
-   Regression tests
-   Performance benchmarks

Deterministic outputs are required.

------------------------------------------------------------------------

# 19. Future Enhancements

-   Cross-language pain detection
-   Industry-specific scoring
-   Cost-of-delay estimation
-   User journey friction analysis
-   Enterprise pain models

------------------------------------------------------------------------

# 20. Acceptance Criteria

Complete when:

-   Pain pipeline is fully documented.
-   Inputs and outputs are defined.
-   Canonical models are specified.
-   Confidence methodology is documented.
-   Events and persistence contracts are complete.
-   The engine can be implemented independently.
