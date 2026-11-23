# Performance Engineering Attribution and Notices

This category contains original ZCode agent definitions and generalized skills. It does not bundle KDA source code, KernelWiki, profiler helper code, datasets, benchmark artifacts or third-party kernel snapshots.

## Kernel Design Agents

The task contract, candidate lineage, promotion rule and separation of validation from evaluation are adapted from NVIDIA's Kernel Design Agents documentation:

- Project: https://github.com/NVlabs/kda
- Sources: `docs/agent-flow.md` and `prompts/basic-flow.md`
- Copyright: 2026 NVIDIA CORPORATION & AFFILIATES
- License for documentation/prompts/skills/assets: Creative Commons Attribution 4.0 International
- License: https://creativecommons.org/licenses/by/4.0/

Changes include rewriting for ZCode agents, adding shared runner/verifier roles, defining explicit handoffs and output contracts, generalizing schemas, and separating the reusable workflow from hardware-specific tooling.

## Nsight Compute report skill

Profiler workflow concepts are adapted from the Han Lab `ncu-report-skill` distributed with KDA:

- Upstream skill: `mit-han-lab/ncu-report-skill`
- KDA reference: https://github.com/NVlabs/kda
- Copyright: 2026 hanlab
- License: MIT

Changes include architecture-neutral metric discovery, generalized workload and environment requirements, optional Nsight Systems timeline analysis, explicit confidence handling and ZCode-specific agent handoffs. No helper source files are copied.

MIT License notice:

Copyright (c) 2026 hanlab

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Third-party material

No NVIDIA-proprietary CuTe DSL snapshots or KernelWiki artifact bundles are included. Any future vendored reference must retain its original license, provenance and copyright notices and must not inherit this repository's license by implication.
