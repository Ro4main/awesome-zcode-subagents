---
name: candidate-ledger
description: "Track optimization candidates, parent relationships, experiments and evidence. Use whenever creating, testing, comparing, promoting or rejecting a performance candidate; when writing benchmark.csv or candidates.jsonl; and whenever profiler or benchmark artifacts must remain reproducible. Enforces one-run-one-directory and preserves rejected candidates instead of hiding failed experiments."
---

# Candidate ledger

Keep a compact audit trail that lets another person or agent reconstruct what changed, what was measured and why a decision was made. Consistency matters more than the exact filenames, but do not change schema midway through a task.

## Workspace layout

Unless the task contract specifies another layout, use:

```text
<task-workspace>/
├── docs/
│   ├── draft.md
│   └── plan.md
├── candidates.jsonl
├── benchmark.csv
├── runs/
├── outputs/
└── profile/
```

The task workspace belongs to the user's task. Do not write generated artifacts into the installed plugin or this category's source.

## Candidate identity

Give each candidate a descriptive, stable identifier. Record:

- `id` and `parent`.
- `status`: `draft`, `implemented`, `validated`, `measured`, `promoted`, `rejected` or `verified`.
- `hypothesis`: the mechanism the change is intended to affect.
- `revision` or a reproducible patch/reference.
- `files_changed`.
- Correctness result and evidence.
- Performance result and evidence.
- Decision reason and timestamp.

Example JSONL shape:

```json
{"id":"candidate-tile-32","parent":"baseline","status":"measured","hypothesis":"Increase reuse without exceeding shared-memory capacity","revision":"<immutable-revision>","validation":{"status":"pass","run":"runs/candidate-tile-32-validation"},"decision_reason":"Awaiting independent verification"}
```

Do not copy placeholder identifiers into a real ledger. Use actual values and add fields when the task needs them.

## Run discipline

- Use one new directory per run. Never overwrite or mix artifacts from different revisions.
- Name runs by purpose and candidate, not `final`, `test2` or similar ambiguous labels.
- Store commands, stdout, stderr, exit codes and environment metadata with the run.
- Preserve the harness or its immutable revision with the evidence when the harness is part of the result.
- Keep raw profiler reports and extracted analysis together under the profile run.
- Append new observations; do not rewrite history to make a candidate appear successful.

## Benchmark table

Use a consistent tabular schema with at least:

```text
timestamp,candidate_id,parent_id,revision,workload,dispatch_path,environment_id,metric,unit,samples,median,dispersion,correctness,run_dir
```

Include raw sample paths or a run directory that contains them. A median without samples and environment context is insufficient for promotion.

## Decision record

At every decision, answer:

1. Was correctness established?
2. Was the workload representative and the comparison controlled?
3. Did the result satisfy the contract?
4. What evidence supports keep, revise, reject or verify?
5. What is the next smallest informative experiment?

Never silently discard a rejected candidate. Its negative result prevents repeated work and is part of the performance evidence.
