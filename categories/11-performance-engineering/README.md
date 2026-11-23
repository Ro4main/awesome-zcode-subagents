# Performance Engineering Subagents

Evidence-driven performance engineering for GPU kernel work, with shared measurement, profiling and independent verification roles. This category is intentionally local to `awesome-zcode-subagents`; it is not imported from the Claude reference collection.

## Design

The category uses a domain-by-role matrix:

- **Domain experts** own correctness, implementation choices and optimization trade-offs.
- **Shared execution roles** run benchmarks, interpret profiler evidence and independently verify claims.
- **Shared skills** define the task contract, evidence ledger, measurement discipline and GPU analysis workflow.

The first wave contains one domain expert and three execution roles. CPU, inference and distributed experts should be added only after repeated real tasks justify them.

## Agents

| Agent | Responsibility | Recommended local model tier |
|---|---|---|
| [**gpu-kernel-expert**](agents/gpu-kernel-expert.md) | CUDA/Triton/HIP kernel design, implementation and evidence-based optimization | Strong reasoning model, high/max effort |
| [**bench-runner**](agents/bench-runner.md) | Reproducible correctness and performance command execution without source edits | Fast model, high effort |
| [**profile-analyst**](agents/profile-analyst.md) | Nsight Compute/Systems collection and metric-backed diagnosis | Fast model, high effort; domain expert reviews trade-offs |
| [**perf-verifier**](agents/perf-verifier.md) | Independent correctness, benchmark, lineage and integrity verification | Fast model, high effort |

Agents default to `model: inherit` for portability. Configure model overrides in ZCode rather than committing machine-specific provider IDs.

## Skills

| Skill | Used for |
|---|---|
| `performance-task-contract` | Objective, representative workloads, correctness, commands, constraints and promotion criteria |
| `candidate-ledger` | Candidate lineage, run directories, benchmark tables and rejected-candidate evidence |
| `benchmark-discipline` | Warmups, repeated samples, variability, controlled comparisons and anti-gaming checks |
| `gpu-profile-analysis` | Nsight Compute/Systems collection, six-dimension analysis and evidence-backed reports |
| `kernel-optimization-playbook` | Bounded GPU kernel design hypotheses, correctness risks and candidate decisions |

Skills are assigned explicitly in each agent's frontmatter. They are not globally injected into unrelated agents.

## Closed loop

```text
Main agent
  → gpu-kernel-expert establishes contract and candidate
  → bench-runner validates and measures baseline/candidate
  → profile-analyst diagnoses evidence and proposes next experiments
  → gpu-kernel-expert revises or rejects candidates
  → perf-verifier independently reproduces acceptance evidence
```

A faster candidate is not promoted when correctness fails, workloads are unrepresentative, evidence cannot be reproduced, or the evaluator's integrity is in question.

## Runtime requirements

The agent definitions and skills have no package dependency. Actual kernel tasks may require a user-provided CUDA/ROCm/Triton environment, compiler, profiler, representative data and benchmark harness. Collection commands must run in an appropriate local or remote environment; this plugin does not install GPU tools or change system permissions.

Generated code, datasets, benchmark outputs and profiles belong in the user's task workspace, never in this plugin source.

## Attribution

The workflow is an original ZCode adaptation informed by NVlabs Kernel Design Agents and the Han Lab Nsight Compute report skill. See [NOTICE.md](NOTICE.md) for sources, licenses and the changes made. KernelWiki and third-party artifact bundles are not bundled here.
