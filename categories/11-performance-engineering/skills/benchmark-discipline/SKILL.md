---
name: benchmark-discipline
description: "Run and review trustworthy performance measurements. Use for CPU/GPU benchmarks, kernel timing, inference latency or throughput, baseline-versus-candidate comparisons, warmup and repeated timing, benchmark review and performance claims. Prevents cherry-picking, unstable comparisons, incorrect asynchronous timing, workload substitution and evaluator exploitation."
---

# Benchmark discipline

A performance number is evidence only when another engineer can understand and reproduce how it was obtained. Correctness and timing are separate gates.

## Before measuring

- Read the task contract and use its representative workloads and dispatch paths.
- Identify baseline and candidate revisions unambiguously.
- Run correctness validation separately and reject incorrect candidates.
- Inspect what the timed region includes. For asynchronous CPU/GPU work, ensure synchronization makes the intended work visible to the timer.
- Record hardware, power/clock state when available, driver, runtime, compiler, dependencies and relevant environment variables.
- Do not modify tests, scoring, input data or implementation to make a measurement pass.

## Measurement protocol

1. Use a new run directory and exact commands.
2. Warm up the required code paths, caches and runtimes before measured iterations.
3. Collect repeated samples. Choose repetitions based on runtime and observed variability; explain any protocol imposed by the task.
4. Keep all raw samples and failed runs. Do not report only the minimum or fastest iteration.
5. Report a median and an appropriate measure of spread, such as IQR, MAD, standard deviation or percentiles. Include mean/p95 when the user cares about tail latency.
6. Compare baseline and candidate under compatible conditions. Interleave their measurements when practical to reveal thermal or background drift.
7. Separate setup, compilation, data transfer, synchronization and steady-state execution according to the contract; do not silently exclude work required by fresh calls.
8. Cover all representative shapes and dispatch paths. Do not aggregate away a regressed workload without reporting it.
9. Repeat on a fresh process or clean state when cross-call caching or one-time initialization could distort the claim.

## Integrity checks

Reject or investigate results that rely on:

- Cached or precomputed outputs returned on later calls instead of fresh computation.
- Branches keyed to benchmark order, workload IDs or evaluator-specific behavior.
- Work skipped because the harness does not consume or validate outputs.
- Precision or tolerance changes outside the contract.
- Asynchronous work still running after the measured region.
- Different inputs, build flags or environment settings for baseline and candidate.

Do not change system clocks, persistence settings, permissions or background services without explicit user approval. If stable clocks are unavailable, record that limitation and increase scrutiny of variability.

## Reporting

Include:

```text
baseline/candidate identity
correctness status
workload and dispatch path
hardware/software environment
exact command and timed region
warmup and sample count
raw sample location
median, spread and relevant percentiles
absolute delta and relative change
failed runs and environment caveats
```

Use `speedup = baseline / candidate` for elapsed time and label throughput changes separately. Avoid claims beyond the measured environment. A benchmark run is not independent verification until the verifier reproduces it.
