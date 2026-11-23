---
name: gpu-profile-analysis
description: "Collect and interpret GPU profiler evidence with Nsight Compute, Nsight Systems, ncu, nsys or equivalent tools. Use for 'why is this kernel slow', 'profile 一下', '分析 ncu 报告', roofline diagnosis, stalls, occupancy, memory throughput, tensor-core use, tail effects and host-versus-GPU timelines. Requires metric-backed conclusions and ranked experiments; not for generic optimization advice without evidence."
---

# GPU profile analysis

Follow **Profile → Diagnose → Plan**. Do not guess the bottleneck before inspecting relevant evidence, and do not turn a profiler report into a generic list of CUDA tips.

## Establish the question

Identify:

- Exact kernel, operator, function or dispatch path.
- Representative inputs, shapes, data types and distribution.
- Target GPU and software stack.
- Whether the question concerns a single kernel, multiple kernels, host/framework overhead or an end-to-end path.
- Baseline and candidate reports if this is a comparison.

Use real or shape- and distribution-faithful workloads. For data-dependent behavior, matching only the shape is not sufficient. Profile separate dispatch paths separately.

## Collection discipline

Prefer the application's existing harness when it can answer the question. Build a standalone harness only when needed for controlled inputs, build flags or source attribution, and record that choice.

Create one new profile run directory:

```text
profile/<question>-<candidate>/
├── harness/       # or a reference to the immutable application revision
├── reports/
├── analysis/
└── REPORT.md
```

Capture exact commands, environment and versions. Use `-lineinfo` or the equivalent when source-level attribution is required. Typical Nsight Compute collection modes are:

```bash
ncu --set full -k "regex:<kernel-pattern>" -o profile/<run>/reports/full <command>
ncu --set source --section SourceCounters -k "regex:<kernel-pattern>" -o profile/<run>/reports/source <command>
```

Adapt sections to the actual question and architecture. PM sampling or timeline collection may require additional support. Do not run privileged setup or alter system configuration without approval. If collection is blocked, analyze existing artifacts or report the blocker.

For host/framework, synchronization or cross-kernel questions, use an Nsight Systems-style timeline in addition to per-kernel metrics. A kernel-only report cannot explain every end-to-end bottleneck.

## Analysis dimensions

Inspect the dimensions relevant to the question:

1. **Launch geometry and occupancy** — grid/block size, waves, register/shared-memory limits and achieved occupancy.
2. **Balance and tail effects** — work distribution, variable-length inputs, per-SM activity and utilization over time.
3. **Stalls and source hotspots** — stall reasons, instruction/source locations and sampling support.
4. **Compute utilization** — relevant ALU/FMA/tensor pipelines and instruction mix.
5. **Timeline behavior** — flat, tail, sawtooth, idle gaps, framework and synchronization effects.
6. **Memory behavior** — access efficiency, cache hits, DRAM throughput, sectors/requests, spills and data movement.

Read profiler rule-engine findings and estimated speedups early, but validate them against the raw signals. Metric names differ across architectures and profiler versions; enumerate available metrics or use the matching platform reference instead of assuming a familiar name exists.

## Evidence rules

- Every material claim must cite a metric name and actual value, a source location, or a timeline artifact.
- Never invent a number or replace an unavailable metric with a guess.
- Compare only compatible workloads, builds and collection settings.
- Treat estimated speedup as a hypothesis, not an end-to-end promise.
- High utilization does not automatically imply optimal code; low occupancy is not automatically a defect.
- Mark conflicting or insufficient evidence and propose the smallest additional collection that would resolve it.

## Report format

```markdown
# <target> profiling report

## Setup and reproduction
## Headline metrics and one-line diagnosis
## Relevant per-dimension findings
## Summary diagnosis and confidence
## Ranked next experiments (maximum five)
## Caveats and missing evidence
## Artifact paths and exact commands
```

Each recommended experiment must name the evidence, proposed mechanism, expected effect, correctness risk and confirming measurement. Do not paste raw profiler tables as the final response; interpret them and link to the evidence.
