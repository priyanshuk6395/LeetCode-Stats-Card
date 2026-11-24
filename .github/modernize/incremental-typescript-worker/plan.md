# Modernization Plan: Incremental TypeScript and Cloudflare Worker Improvements

**Project**: JacobLinCool/LeetCode-Stats-Card

## Technical Framework

- **Language**: TypeScript
- **Runtime**: Cloudflare Workers for the public HTTP service
- **Build and package management**: pnpm workspace (pnpm 9.15.0), esbuild for the Worker, tsup for the published `leetcode-card` package
- **Worker framework**: Hono
- **Tests and linting**: Vitest, Cloudflare Workers Vitest pool, ESLint
- **Key packages**: `packages/core` (published `leetcode-card` SVG generator), `packages/cloudflare-worker` (HTTP service)
- **Deployment configuration**: Wrangler; the repository contains root and package-local Wrangler configurations

## Overview

This plan improves verification, CI confidence, Worker configuration consistency, and dependency maintenance without changing the product architecture. The work is incremental and grounded in the existing TypeScript packages and pnpm workspace. It does not introduce React, a new UI/playground, an Azure migration, or unnecessary runtime dependencies.

The existing published package entrypoints, SVG generation, documented query options, Worker routes and response behavior, Cloudflare CPU limit, deployment path, and self-hosting path are compatibility requirements. Changes to a dependency or Worker compatibility setting must be supported by evidence and validated before adoption.

## Modernization Impact Summary

| Area | Current state | Planned outcome | Compatibility guardrail |
|---|---|---|---|
| Test reliability | Core tests call live LeetCode services | Deterministic tests for normal CI; optional live checks stay separate | Preserve real service support; do not mask application failures |
| CI verification | Pull requests build only | PRs build, lint, and run deterministic unit/Worker tests | Keep pnpm workspace and Cloudflare Worker build |
| Worker configuration | Root deploy and package-local test/dev Wrangler configs differ | Document and reconcile intentional runtime settings | Preserve routes, response behavior, and 50 ms CPU limit |
| Dependencies | Many updates available, including major versions | Apply justified updates in small compatibility-tested batches | Preserve exports, lockfile integrity, and Worker runtime constraints |
| Dependency security | Assessment did not perform a CVE scan | Scan and remediate confirmed dependency vulnerabilities | Minimum necessary patched versions; no blanket upgrades |

## Incremental Approach and Validation

1. Make the test suite deterministic and add focused checks for existing core and Worker behavior. Keep the report's live LeetCode.cn 403 as an external validation risk, not a reason to alter product behavior.
2. Require the deterministic build, lint, and test checks in pull-request CI before changing dependencies or runtime settings.
3. Align or explicitly document the root deployment and package-local Wrangler configurations. Verify actual deployment and test entrypoints; do not blindly copy compatibility dates or flags.
4. Evaluate dependency candidates in small, reversible groups, updating `pnpm-lock.yaml` through pnpm. Handle Cloudflare-specific toolchain changes separately from major compiler, test, lint, or package-manager changes.
5. Run a dependency vulnerability scan and remediate confirmed findings with the smallest compatible updates.

For code and dependency changes, validate with the relevant package tests, `pnpm lint`, and `pnpm build`. Verify the `leetcode-card` package exports and Worker routes/responses. Where a live LeetCode check is retained, report its result separately from deterministic CI; upstream blocking or availability must not be interpreted as a local regression by itself.

## Assessment Baseline and Risks

The assessment at `.github/modernize/assessment/reports/report-20261124124159/js-assessment-report.md` reports that `pnpm build` and `pnpm lint` passed, while `pnpm test` passed 11 tests and failed the LeetCode.cn type-shape test after receiving HTTP 403 with a Cloudflare challenge response. It also notes that tests make live LeetCode requests and that CI currently runs only the build.

The checked-in root `wrangler.toml` uses a 2022 compatibility date and `node_compat = true`, while `packages/cloudflare-worker/wrangler.toml` uses a 2024 date and `nodejs_compat`. The plan treats this as a configuration-consistency question to verify against the deployed and test commands, not as evidence that either setting should automatically replace the other.

Additional risks are breaking changes in the reported major dependency updates, upstream LeetCode schema/access changes, and Cloudflare runtime or CPU-limit incompatibility. Defer any change that cannot pass the relevant compatibility checks.

## Non-Goals

- No React dashboard, invented playground, or replacement of the existing public service.
- No migration away from Cloudflare Workers, pnpm workspaces, or existing package boundaries.
- No bulk upgrade solely because a newer version is available.
- No change to public URLs, HTTP/API semantics, documented options, card output, or package exports unless a separately approved compatibility decision is made.
- No claim that the assessment found CVEs; its report explicitly says a vulnerability scan was not performed.
