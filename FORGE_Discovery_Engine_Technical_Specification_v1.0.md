# FORGE --- Founder Intelligence Operating System (FIOS)

# Discovery Engine Technical Specification (DETS)

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
8.  Internal Pipeline
9.  Processing Stages
10. Canonical Models
11. Algorithms
12. Confidence Model
13. Events
14. Storage
15. Configuration
16. Failure Handling
17. Metrics
18. Testing Strategy
19. Future Enhancements
20. Acceptance Criteria

------------------------------------------------------------------------

# 1. Purpose

The Discovery Engine is responsible for transforming normalized
observations from multiple collectors into candidate business
opportunities.

It is the first intelligence engine in the FORGE pipeline.

------------------------------------------------------------------------

# 2. Objectives

-   Detect recurring user problems
-   Detect repetitive workflows
-   Detect unmet software requests
-   Discover underserved niches
-   Produce explainable opportunity candidates

------------------------------------------------------------------------

# 3. Scope

In Scope

-   Pattern discovery
-   Topic clustering
-   Opportunity extraction
-   Duplicate detection
-   Evidence generation

Out of Scope

-   Market sizing
-   Trend analysis
-   Competitor analysis
-   Opportunity scoring

------------------------------------------------------------------------

# 4. Responsibilities

-   Consume normalized records
-   Group semantically similar records
-   Identify recurring pain points
-   Produce opportunity candidates
-   Emit evidence events

------------------------------------------------------------------------

# 5. Non-Responsibilities

The engine shall never:

-   Rank opportunities
-   Estimate revenue
-   Estimate feasibility
-   Make implementation decisions

------------------------------------------------------------------------

# 6. Inputs

Consumes:

-   NormalizedRecord
-   Source metadata
-   Historical opportunities
-   Historical evidence

------------------------------------------------------------------------

# 7. Outputs

Produces:

-   OpportunityCandidate
-   DiscoveryEvidence
-   TopicCluster
-   DuplicateMappings

Publishes:

-   DiscoveryCompleted
-   OpportunityCandidateCreated
-   DiscoveryEvidenceGenerated

------------------------------------------------------------------------

# 8. Internal Pipeline

Normalized Records ↓ Cleaning ↓ Feature Extraction ↓ Embedding /
Representation ↓ Similarity Search ↓ Topic Clustering ↓ Problem
Extraction ↓ Duplicate Removal ↓ Evidence Generation ↓ Opportunity
Candidates

------------------------------------------------------------------------

# 9. Processing Stages

Stage 1 Validation

Stage 2 Normalization verification

Stage 3 Text preprocessing

Stage 4 Keyword extraction

Stage 5 Semantic grouping

Stage 6 Cluster refinement

Stage 7 Problem statement generation

Stage 8 Evidence calculation

Stage 9 Persistence

Stage 10 Event publication

------------------------------------------------------------------------

# 10. Canonical Models

OpportunityCandidate

-   id
-   title
-   summary
-   sourceCount
-   clusterId
-   confidence
-   createdAt

DiscoveryEvidence

-   id
-   candidateId
-   mentionFrequency
-   sourceDiversity
-   repeatedRequests
-   confidence

TopicCluster

-   id
-   label
-   memberCount
-   centroid
-   confidence

------------------------------------------------------------------------

# 11. Algorithms

Initial implementation

-   Rule-based extraction
-   TF-IDF / keyword weighting
-   Sentence similarity
-   Density-based clustering
-   Duplicate elimination

Future

-   Embedding models
-   LLM-assisted classification
-   Online clustering
-   Incremental learning

Algorithms must remain replaceable.

------------------------------------------------------------------------

# 12. Confidence Model

Confidence factors

-   Number of sources
-   Source diversity
-   Cluster density
-   Duplicate consistency
-   Extraction quality

Confidence range

0.00 → 1.00

Every confidence score must expose contributing factors.

------------------------------------------------------------------------

# 13. Events

Consumes

-   DataNormalized
-   SnapshotStored

Publishes

-   DiscoveryCompleted
-   OpportunityCandidateCreated
-   DiscoveryEvidenceGenerated

------------------------------------------------------------------------

# 14. Storage

Persists

-   clusters
-   candidates
-   discovery evidence
-   execution metrics

Raw records are never modified.

------------------------------------------------------------------------

# 15. Configuration

Parameters

-   minimumClusterSize
-   similarityThreshold
-   confidenceThreshold
-   batchSize
-   maxRetries

Configuration must be externalized.

------------------------------------------------------------------------

# 16. Failure Handling

Recoverable

-   retry
-   skip malformed record

Non-Recoverable

-   quarantine batch
-   publish failure event
-   continue remaining work

------------------------------------------------------------------------

# 17. Metrics

Operational

-   execution time
-   throughput
-   failure rate

Business

-   candidates generated
-   duplicate reduction
-   evidence quality
-   precision estimate

------------------------------------------------------------------------

# 18. Testing Strategy

-   Unit tests
-   Integration tests
-   Golden datasets
-   Regression tests
-   Performance benchmarks

Expected behavior must remain deterministic for identical datasets.

------------------------------------------------------------------------

# 19. Future Enhancements

-   Cross-language clustering
-   Image/video signal extraction
-   Knowledge graph integration
-   Continuous discovery
-   Streaming ingestion

------------------------------------------------------------------------

# 20. Acceptance Criteria

Complete when:

-   Inputs and outputs are defined.
-   Processing pipeline is documented.
-   Confidence model is specified.
-   Events are standardized.
-   Storage contracts are documented.
-   The engine can be implemented independently without ambiguity.
