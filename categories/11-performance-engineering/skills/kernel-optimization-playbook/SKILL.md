---
name: kernel-optimization-playbook
description: "Design and review evidence-driven GPU kernel candidates in CUDA, Triton, HIP/ROCm and related models. Use when writing a new operator, choosing tiling/layout/synchronization strategies, reviewing a kernel patch or translating profiler evidence into a bounded experiment. Covers correctness, memory access, launch geometry, compute pipelines and numerics without hardcoding architecture-specific limits."
---

# Kernel optimization playbook

Use this skill for candidate design. Use `gpu-profile-analysis` to diagnose an existing kernel from profiler evidence. The two skills form a loop: design a hypothesis, implement one candidate, validate, measure, profile and record the decision.

## Start with the contract and baseline

- Confirm operator semantics, shapes, data types, tolerances, layout, dispatch and deployment constraints.
- Establish a correct baseline and representative workloads.
- Compare against optimized libraries or existing framework paths when available. A custom kernel is justified by a measured gap or capability need, not by novelty.
- Identify the target architecture from the actual environment. Do not hardcode SM counts, tensor-core instructions, cache sizes or metric names from another GPU.

## Candidate design checklist

### Correctness and interface

- Preserve the public API, output shape/layout and numerical contract.
- Cover boundary conditions, non-multiple tile sizes, empty/small inputs and relevant dispatch paths.
- Define validation for race conditions, synchronization and numerical tolerances.
- Keep fallback paths working when a specialized candidate cannot run.

### Memory and data layout

- State the expected reuse and data movement before changing tiles or layouts.
- Inspect coalescing, alignment, vector width, cache behavior, shared-memory bank conflicts and host/device transfers as applicable.
- Include layout-conversion and packing costs in the evaluated path unless the contract explicitly excludes them.
- Watch register spills and shared-memory capacity; a larger tile is not automatically better.

### Compute and launch geometry

- Match the candidate to the actual operation: compute-bound, memory-bound, latency-bound or launch/occupancy limited.
- Consider instruction mix, pipeline suitability, warp divergence, synchronization and grid/block geometry together.
- Treat occupancy as a signal rather than a target. High occupancy cannot compensate for unnecessary work or poor access patterns.
- Account for small-kernel launch overhead and tail effects.

### Numerics and specialization

- Document accumulation precision, fast-math assumptions, denormal behavior and tolerance implications.
- Do not obtain speed by changing precision outside the contract.
- Specialize only for legitimate runtime constraints and preserve correctness for all claimed inputs.

## One candidate, one hypothesis

Write the candidate record before implementation:

```text
Candidate and parent:
Observed evidence or baseline gap:
Proposed change:
Expected mechanism:
Workloads expected to improve:
Workloads at risk:
Correctness risks:
Validation command:
Evaluation command:
Profile signals that should change:
Promotion/rejection criteria:
```

Keep the candidate bounded. If several unrelated changes are needed, split them into a parent/child sequence so their effects can be measured and rejected independently.

## Interpreting outcomes

- Correct and faster under representative measurements: retain for independent verification.
- Correct but neutral: retain only if the contract values another benefit; otherwise reject or revise.
- Correct but slower: record the evidence and reject or isolate the useful component.
- Incorrect: reject performance claims and fix only within the candidate's stated scope.
- Inconclusive: collect the smallest missing measurement or profile; do not fill the gap with intuition.

## Response format

Return the design hypothesis, correctness implications, candidate scope, expected profiler/memory effects, exact validation and evaluation plan, and decision criteria. After implementation, report observed rather than expected results and link the candidate ledger and profile evidence.
