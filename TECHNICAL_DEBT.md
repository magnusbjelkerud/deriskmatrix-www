# Technical Debt

## TD-001 — Analyzer schema: Phase A field names diverge from v2 spec

**Created:** 2026-05-10  
**Owner:** Analyzer pipeline  
**Severity:** Medium — works today, breaks on Phase B/C deploy if not resolved first

### What it is

The Phase A analyzer (`lib/claudeAnalyzer.js`) produces goal objects with field names
that differ from the Agent 9 schema defined in `website-analyzer-brief-v2.md`.

| Concept | Phase A field | v2 spec field |
|---|---|---|
| Risk state | `state` | `predicted_state` |
| UI visibility (top 3) | `visible` | `visible_in_teaser` |
| Context sentence | `context` | `context_line` |
| Recommended action | `action_detail` | `suggested_action` |

The onboarding wizard (`src/components/onboarding/`) reads both names defensively
(e.g. `goal.predicted_state \|\| goal.state`) to stay compatible with both formats
during the transition period. This is intentional but temporary.

### When to fix

When Phases B and C of the analyzer are built (Synthesist + Goal Generator agents).
At that point, the Agent 9 prompt will produce v2 field names natively. Simultaneously:
1. Update `lib/claudeAnalyzer.js` to output v2 field names
2. Remove the defensive dual-field reads from the onboarding wizard
3. Run a one-time migration script to update any cached `website_analyses.goals_json`
   rows still using Phase A field names (or simply let them expire via `cached_until`)

### Do NOT merge Phase B/C without resolving this first.

---

## TD-002 — Onboarding wizard: Step 1 creates company with minimal data

**Created:** 2026-05-10  
**Owner:** Onboarding modal (`src/components/onboarding/OnboardingModal.jsx`)  
**Severity:** Low — functional, but Step 1 is a skeleton

### What it is

Phase 1 of the onboarding wizard (modal shell) creates the company/profile via
`completeOAuthOnboarding(fullName, companyName)` with only the company name.
The Phase A result data (industry, country, org number from Brønnøysund) is not
yet passed through to the company record.

### When to fix

Phase 2 of the onboarding wizard (Steps 1–2 with analyzer reuse). When Step 1
is replaced with the real "Confirm company" screen, pass:
- `p_country` from `analysis.country_code`
- `p_org_number` from resolver evidence (if available)
- Update `companies.nace_code` and `companies.industry_label` post-creation

---

## TD-003 — Analyzer API: prompt-only JSON output (no structured output enforcement)

**Created:** 2026-05-10  
**Owner:** `lib/claudeAnalyzer.js`  
**Severity:** Low in Phase A, higher as schema complexity grows

### What it is

`claudeAnalyzer.js` uses prompt instructions (`"Return only valid JSON"`) and
a `JSON.parse` with markdown stripping. No schema is enforced at the API level.
As goal object complexity grows (Phase B/C adds `evidence_ids`, nested structures,
optional fields), prompt-only output becomes unreliable.

### Resolution

**Closed — Phase 2 commit 1 (2026-05-10).** `generateGoalsWithClaude` now uses
Anthropic tool use with a full JSON Schema definition and
`tool_choice: { type: "tool", name: "generate_goal_portfolio" }`.
`JSON.parse` and markdown stripping removed.

---

## TD-004 — Dual-copy riskStateEnrichment.js across repos

**Created:** 2026-05-10  
**Owner:** `deriskmatrix-www/lib/riskStateEnrichment.js` + `deriskmatrix-app/src/lib/riskStateEnrichment.js`  
**Severity:** Low — changes to state colors/labels are rare; sync burden is minimal

### What it is

`enrichGoals()` (state → stateColor, stateLabel, stateBg, stateAction) is duplicated
across both repos. Each file carries this header to make the twin relationship explicit:

```
// ============================================================
// SYNC: This file has an identical twin
// Twin location: deriskmatrix-{other_repo}/lib/riskStateEnrichment.js
// Last synced: 2026-05-10
// Tracked: TECHNICAL_DEBT.md TD-004
// ----
// Changes to state colors, labels, or enrichment logic MUST be
// applied to both files in the same commit cycle.
// Migration target: @deriskmatrix/shared when build pipelines stabilize.
// ============================================================
```

The `Last synced` date enables a future script to verify both files were updated
since the same date (see TD-005).

### When to fix

When both repos have stable build pipelines and a shared package makes sense.
Migration path: extract to `@deriskmatrix/shared` npm package, replace both files
with `import { enrichGoals } from '@deriskmatrix/shared'`.

Until then: any change to state colors, labels, or enrichment logic requires a
commit to both repos in the same commit cycle. Update `Last synced` date in both headers.

---

## TD-005 — No automated sync verification for riskStateEnrichment.js

**Created:** 2026-05-10  
**Owner:** Developer tooling  
**Severity:** None until first drift incident occurs

### What it is

There is no automated check that both copies of `riskStateEnrichment.js` (see TD-004)
are identical. Drift is currently caught only by code review and the `Last synced`
header comment.

### Resolution

Implement when first sync drift incident occurs. Suggested approach: a pre-commit
hook (or CI step) that hashes both files and exits non-zero if they differ. ~10 lines
of shell script. Not worth building until there is evidence of actual drift risk.

**Do not build this now.**
