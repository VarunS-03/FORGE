# FORGE --- Repository Bootstrap Generator Specification (RBGS)

**Version:** 1.0\
**Status:** Implementation Specification

## Purpose

The Repository Bootstrap Generator (RBG) is the first executable
component of FORGE. It generates the complete repository from a
declarative specification rather than hardcoded filesystem operations.

## Objectives

-   Deterministic generation
-   Idempotent execution
-   Template-driven scaffolding
-   Cross-platform support
-   Validation before generation

## Architecture

``` text
Repository Schema
      ↓
Schema Validator
      ↓
Generation Planner
      ↓
Template Renderer
      ↓
Filesystem Generator
      ↓
Output Validator
      ↓
Repository
```

## Project Layout

``` text
bootstrap/
├── src/
│   ├── cli/
│   ├── schema/
│   ├── planner/
│   ├── generators/
│   ├── renderer/
│   ├── filesystem/
│   ├── validator/
│   ├── templates/
│   ├── utils/
│   └── index.ts
├── tests/
├── package.json
└── README.md
```

## Repository Schema

Each node defines:

-   id
-   type
-   path
-   template
-   overwrite policy
-   children

Node types:

-   directory
-   file
-   template
-   package

## Generation Flow

1.  Validate schema
2.  Build execution plan
3.  Create directories
4.  Render templates
5.  Generate package manifests
6.  Generate placeholders
7.  Validate output
8.  Produce generation report

## Templates

Supported:

-   README.md
-   package.json
-   tsconfig.json
-   index.ts
-   .gitkeep
-   .gitignore
-   LICENSE

## CLI

``` text
forge-bootstrap init
forge-bootstrap validate
forge-bootstrap generate
forge-bootstrap doctor
forge-bootstrap clean
```

Future:

``` text
forge generate engine <name>
forge generate collector <name>
forge generate package <name>
```

## Validation

Checks:

-   duplicate paths
-   invalid names
-   missing templates
-   circular references
-   required files
-   schema integrity

## Output Report

Includes:

-   directories created
-   files created
-   templates rendered
-   skipped files
-   warnings
-   errors
-   elapsed time

## Testing

-   Unit tests
-   Snapshot tests
-   Schema validation
-   Filesystem integration
-   Golden repository tests

## Acceptance Criteria

-   Generates the complete FORGE repository from the schema.
-   Safe to rerun.
-   Output matches the specification exactly.
-   Repository is reproducible from the schema alone.
