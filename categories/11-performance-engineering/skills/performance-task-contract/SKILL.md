---
name: performance-task-contract
description: "Define an evidence-based performance task before implementation. Use whenever starting GPU/CPU optimization, kernel design, inference tuning, benchmark-driven work, or when a request such as 'make it faster' lacks measurable acceptance criteria. Creates the objective, correctness oracle, constraints, validation/evaluation commands and promotion criteria shared by domain experts, runners, analysts and verifiers."
---

# Performance task contract

Start every performance task by making acceptance testable. The contract prevents an agent from optimizing an ambiguous workload, changing correctness requirements silently, or promoting a candidate without reproducible evidence.

## When to use

Use before implementation, benchmarking or profiling. For a read-only analysis request, write the contract in the response rather than creating files. For an implementation request, place task artifacts in the user-designated task workspace, not in this plugin's source directory.

## Required fields

1. **Objective** — user-facing result and target metric.
2. **Inputs and outputs** — representative shapes, data types, data distributions, dispatch paths and API behavior.
3. **Correctness requirements** — tests, tolerances, invariants and required edge cases.
4. **Constraints** — allowed files, languages, libraries, hardware, dependencies, deployment and forbidden changes.
5. **Validation command** — exact command that establishes correctness.
6. **Evaluation command** — exact command that measures performance, if different from validation.
7. **Promotion criteria** — measurable conditions for acceptance, including required independent verification.

Also record the baseline revision, target environment and task workspace. If any field is unknown, mark it as a blocker or an explicit assumption rather than inventing it.

## Contract template

```markdown
# Performance task contract

- Objective:
- Baseline revision:
- Task workspace:
- Inputs and representative workloads:
- Outputs and public API:
- Correctness requirements and tolerances:
- Allowed files and implementation approaches:
- Forbidden changes:
- Target hardware and software environment:
- Validation command:
- Evaluation command:
- Measurement protocol:
- Promotion criteria:
- Independent verification required: yes/no
- Open questions and assumptions:
```

## Draft before implementation

For non-trivial implementation, create `docs/draft.md` before editing code. Include:

- Current behavior and baseline evidence.
- Risks, unknowns and missing tools.
- Candidate directions ranked by expected value and risk.
- The first candidate's concrete steps.
- Exact validation and evaluation commands.
- Evidence required to promote, revise or reject a candidate.

Convert the approved or clearly inferred draft into an executable plan. Do not require user approval again when the user already authorized implementation and the plan stays within that scope; do stop for destructive, outward-facing or clearly out-of-scope actions.

## Shared handoff

Every handoff between agents must carry:

```text
task contract path or inline contract
baseline and candidate identifiers
representative workloads
exact commands
artifact/run paths
known environment limitations
requested decision or output
```

A runner without commands, an analyst without a profiling question, or a verifier without promotion criteria should report the missing contract element instead of guessing.

## Promotion rule

A candidate may be promoted only when it satisfies correctness and all constraints, and when comparable evidence shows the required improvement or preservation of the target metric. Rejected candidates remain in the ledger with a reason. A candidate is not independently verified until `perf-verifier` has reproduced the evidence.
