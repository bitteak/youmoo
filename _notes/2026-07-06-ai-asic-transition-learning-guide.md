---
layout: post
title: "AI ASIC Physical Design Study Checklist — BTC→AI Transition, Part 2"
date: 2026-07-06 23:30:00 +0800
description: "A checklist-based study plan for closing the gap between fixed-function ASIC physical design and AI accelerator physical design. Six areas: PDN, memory, interconnect, big-die methodology, architecture & software, and economics."
tags: [ai, asic, physical-design, bitcoin, learning, checklist, hbm, noc, cowos]
---

# AI ASIC Physical Design — Study Checklist

*A checklist-based study plan for closing the gap between fixed-function ASIC physical design (e.g. Bitcoin/mining silicon) and AI accelerator physical design. Work through the areas, tick off concepts, resources, and competencies as you go.*

*Assembled July 2026. Resources are named with author/source and linked in the Sources section. Prefer primary sources (papers, specs, university courses) over secondary summaries where both exist.*

---

## The knowledge gap in brief

AI accelerator physical design shares its foundation with any high-performance digital ASIC, including mining silicon: dense replication of a single compute unit, aggressive power and thermal engineering, and relentless optimization for performance-per-watt at the limits of a process node. What separates an AI ASIC from a fixed-function accelerator is concentrated in six areas:

1. **Power delivery under bursty, spatially correlated switching** — whole compute arrays toggling in lockstep, with large di/dt at compute↔memory phase boundaries, competing with a real interconnect for the same metal.
2. **A large memory system that dominates the design** — HBM and/or hundreds of MB of on-chip SRAM, arithmetic intensity, and the memory wall, where fixed-function chips have almost no memory system at all.
3. **Rich on-die and pod-scale interconnect** — a network-on-chip plus a multi-Tb/s scale-out fabric that lashes thousands of chips into one job, where fixed-function cores are near-independent islands.
4. **Reticle-class or multi-die scale** — forcing hierarchical implementation, multi-corner/mode timing signoff, redundancy/yield engineering, and 2.5D packaging with HBM.
5. **Hardware/software co-design and low-precision numerics** — the compiler and datapath (BF16/FP8/FP4/block formats) are designed together, and utilization is a first-class goal.
6. **Higher stakes on cost, correctness, and a moving target** — advanced-node NRE and respin cost, data-center-scale correctness/reliability, and a workload (the model landscape) that keeps changing during an 18–24-month design cycle.

This checklist covers that delta. The areas roughly increase in unfamiliarity from a fixed-function baseline: **Areas 2–4 are the largest gap and deserve the most time; Area 1 is mostly a reframing of familiar power/thermal work; Areas 5–6 are context best absorbed continuously alongside the rest.**

**How to use it:** each area has three checklists — *Concepts to master*, *Study these*, and *You can check this area off when you can…* (the demonstrable competencies). An area is done only when every box in the third list is ticked. A consolidated resource list and all links are at the end.

---

## Area 0 — Foundations (quick check)

Confirm the substrate before the AI-specific material; skip anything already solid.

**Concepts to confirm**

- [ ] Full RTL-to-GDSII flow and where timing, power, and DRC/LVS signoff sit in it
- [ ] Standard-cell design, library characterization, and basic timing (setup/hold, clock)
- [ ] CMOS power (dynamic vs. leakage), interconnect RC, and basic power distribution
- [ ] Microarchitecture basics (pipelining, memory hierarchy, parallelism)

**Study these**

- [ ] *CMOS VLSI Design: A Circuits and Systems Perspective* (4th ed.) — Weste & Harris (Book) — refresh power distribution, interconnect, robustness chapters
- [ ] *Digital Design and Computer Architecture* (ETH, Spring 2023) — Onur Mutlu (free Course) — skim to close any digital-design/microarchitecture gaps

**You can check this area off when you can…**

- [ ] Walk through the standard-cell implementation flow end to end from memory
- [ ] Explain where each signoff step (STA, IR/EM, DRC/LVS, antenna) happens and why

---

## Area 1 — Power delivery, IR-drop, EM & thermal

Mostly a reframing of familiar power/thermal work to the AI-specific version of these problems.

**Concepts to master**

- [ ] Dynamic, vector-based (workload-driven) IR-drop — not just static IR-drop
- [ ] Correlated switching and di/dt / Ldi/dt at compute↔memory phase transitions
- [ ] PDN vs. signal-routing contention on upper metals (power grid competing with NoC/HBM/SerDes)
- [ ] Thermal-aware floorplanning: spreading hot tiles, gradients across a reticle-sized die
- [ ] Electromigration budgeting at ~100% duty cycle (always-on data-center workloads)
- [ ] Cooling co-design: air vs. direct-to-chip liquid / cold plates
- [ ] Backside power delivery (PowerVia-class) and its floorplanning implications

**Study these**

- [ ] *VLSI Physical Design: From Graph Partitioning to Timing Closure* (2nd ed.) — Kahng, Lienig, Markov, Hu (Book) — floorplanning, placement, clock/power distribution
- [ ] *CMOS VLSI Design* — Weste & Harris (Book) — power distribution and robustness chapters
- [ ] EDA-vendor power-integrity material (Cadence/Synopsys app notes & blogs) — dynamic IR-drop, EM, advanced-node effects
- [ ] Onur Mutlu lectures (Course) — the microarchitectural picture of why AI workloads switch the way they do

**You can check this area off when you can…**

- [ ] Contrast the IR-drop signoff of a fixed-function ASIC vs. an AI training ASIC and name three things that get harder and why
- [ ] Sketch a PDN floorplan for a tiled MAC array with HBM on two edges, showing how power and interconnect share metal layers
- [ ] Explain how backside power delivery changes front-side routing resources

---

## Area 2 — Memory system (HBM, SRAM, the memory wall, arithmetic intensity)

The single highest-priority area: AI design is defined by data movement, and almost every hard problem that isn't power/thermal is at root a memory-movement problem.

**Concepts to master**

- [ ] The memory wall: why compute has outrun bandwidth
- [ ] Arithmetic intensity (FLOPs/byte) and the **Roofline model** — compute-bound vs. memory-bound
- [ ] DNN memory hierarchy: registers → PE-local SRAM → global buffer → HBM
- [ ] Dataflow and data reuse (weight/input/output stationary) and its effect on energy
- [ ] HBM: stacked-DRAM architecture, PHY and controller, bandwidth/capacity/power tradeoffs, HBM3/3E/4 trajectory, die-beachfront cost
- [ ] On-chip SRAM at scale: banking, bandwidth, area, MBIST/repair; SRAM-as-primary-store designs
- [ ] KV-cache and why LLM decode is memory-bandwidth-bound

**Study these**

- [ ] *Efficient Processing of Deep Neural Networks* — Sze, Chen, Yang, Emer (Book) — the key text on dataflow, reuse, memory hierarchy (free tutorial/survey version on arXiv)
- [ ] Onur Mutlu — Memory Systems lectures (Course) — authoritative on DRAM, latency/bandwidth, memory-centric computing
- [ ] *Computer Architecture: A Quantitative Approach*, Ch. 2 — Hennessy & Patterson (Book) — memory-hierarchy fundamentals
- [ ] *Roofline: An Insightful Visual Performance Model* — Williams, Waterman, Patterson (Paper, CACM 2009)
- [ ] JEDEC HBM3 standard (JESD238) (Spec, reference) + Siemens EDA HBM3E/HBM4 IC design guide (Industry)

**You can check this area off when you can…**

- [ ] Compute a layer's arithmetic intensity, place it on a roofline, and state whether it's compute- or memory-bound and why
- [ ] Explain why LLM decode is memory-bound while training GEMMs often aren't
- [ ] Compare the HBM-fed vs. SRAM-resident memory strategies and the physical-design consequences of each

---

## Area 3 — Interconnect (on-die NoC, SerDes, die-to-die/UCIe, pod-scale fabric)

A largely new discipline: fixed-function cores barely communicate, whereas AI accelerators are defined by their on-die network and pod-scale fabric.

**Concepts to master**

- [ ] NoC topologies (mesh/torus/ring/crossbar), routing, flow control, deadlock, bisection bandwidth
- [ ] How the NoC creates routing congestion and drives floorplanning
- [ ] High-speed die-edge I/O (SerDes) basics: multi-gigabit signaling, equalization, die-edge and power cost
- [ ] Die-to-die / chiplet interconnect: UCIe and proprietary links, bump pitch, bandwidth density, cross-die timing/clocking
- [ ] Scale-up / pod fabric: ICI, NVLink/NVSwitch, NeuronLink; collectives; optical circuit switching
- [ ] "The pod is the computer" — why the scale-out fabric is part of the architecture

**Study these**

- [ ] *Principles and Practices of Interconnection Networks* — Dally & Towles (Book) — the reference; topology/routing/flow-control core
- [ ] *On-Chip Networks* (2nd ed., Synthesis Lectures) — Jerger, Krishna, Peh (Book) — fastest way to get productive on NoCs
- [ ] UCIe specifications — UCIe Consortium (Spec) + Synopsys "UCIe 2.0" / AnySilicon primer (Industry) as an on-ramp
- [ ] *TPU v4: An Optically Reconfigurable Supercomputer…* — Jouppi et al., ISCA 2023 (Paper) — real pod-scale fabric case study
- [ ] *Digital Systems Engineering* — Dally & Poulton (Book, optional) — deeper signaling/SerDes physics

**You can check this area off when you can…**

- [ ] Sketch a mesh NoC feeding a multi-tile MAC array and identify where bisection-bandwidth congestion appears
- [ ] Explain the tradeoff between one big die vs. chiplets over a UCIe link (bandwidth density, latency, yield, cost)
- [ ] Describe how a pod-scale fabric (e.g. ICI/optical switching) shapes a training job

---

## Area 4 — Big-die methodology (hierarchical PD, MCMM STA, redundancy/yield, 2.5D/CoWoS)

Reticle-class, chiplet, or wafer-scale dies force a heavier flow than small fixed-function dies allow.

**Concepts to master**

- [ ] Hierarchical physical design: partitioning, timing budgets, block abstracts/ETMs, top-level integration
- [ ] Multi-corner multi-mode STA (MCMM); OCV/AOCV/POCV; STA at billions of instances
- [ ] Yield vs. die area (defect density); redundancy (spare rows/columns, spare tiles), repair, binning/harvesting
- [ ] Design-for-defect at the extreme (wafer-scale)
- [ ] 2.5D/3D packaging: silicon interposers (CoWoS-class), microbump planning, die+interposer+HBM co-design, thermal/mechanical coupling
- [ ] Packaging as an architecture-level constraint and supply bottleneck

**Study these**

- [ ] *Static Timing Analysis for Nanometer Designs: A Practical Approach* — Bhasker & Chadha (Book) — the STA reference; corners/modes, crosstalk, modeling
- [ ] *VLSI Physical Design: From Graph Partitioning to Timing Closure* — Kahng, Lienig, Markov, Hu (Book) — hierarchical flow, timing closure at scale
- [ ] Siemens EDA HBM3E/HBM4 IC design guide (Industry) — practical 2.5D/interposer + HBM integration
- [ ] UCIe specifications — UCIe Consortium (Spec) — die-to-die side of multi-die methodology
- [ ] *VLSI Test: Principles and Architectures* — Wang, Wu, Wen (Book) — DFT/MBIST, scan compression, test/yield (advanced-packaging texts by John H. Lau for deeper CoWoS study)

**You can check this area off when you can…**

- [ ] Outline a hierarchical implementation plan for a reticle-class tiled accelerator (partitioning, timing budgets, redundancy, monolithic-vs-chiplet)
- [ ] List the corners and modes you'd sign off across and why
- [ ] Explain how defect density and redundancy drive the die-size and binning decision

---

## Area 5 — Architecture & software (systolic vs. vector, numerics, training vs. inference, compiler co-design)

Context a physical designer needs because the choices implemented (tile size, memory banking, NoC topology, numeric formats) are made jointly with compiler constraints.

**Concepts to master**

- [ ] Compute fabrics: systolic arrays vs. SIMD/vector + tensor cores; why each places/routes as it does
- [ ] Low-precision numerics: FP32→BF16→FP8→FP4 and block-scaled (MX) formats; area/power/bandwidth payoff; rounding/saturation/NaN handling
- [ ] Training vs. inference: diverging precision, memory, and collective-bandwidth needs
- [ ] Compiler/hardware co-design: static scheduling (Groq) vs. dynamic (XLA/CUDA/Neuron); utilization as a design goal

**Study these**

- [ ] MIT 6.5930 *Hardware Architectures for Deep Learning* — Sze & Emer (free Course) — best structured course tying DNN architecture to hardware
- [ ] *In-Datacenter Performance Analysis of a TPU* — Jouppi et al., ISCA 2017 (Paper) — the founding systolic-array case study
- [ ] *Think Fast: A Tensor Streaming Processor (TSP)* — Abts et al., Groq, ISCA 2020 (Paper) — deterministic, compiler-scheduled, SRAM-resident counterpoint
- [ ] OCP Microscaling (MX) Formats Spec v1.0 (Spec) + *Microscaling Data Formats for Deep Learning* (Rouhani et al., Paper) + *FP8 Formats for Deep Learning* (Micikevicius et al., Paper)
- [ ] *Computer Architecture: A Quantitative Approach*, Ch. 7 (Domain-Specific Architectures) — Hennessy & Patterson (Book)
- [ ] XLA / MLIR / TVM / AWS Neuron docs (Industry) — skim to see what the compiler asks of the hardware

**You can check this area off when you can…**

- [ ] Explain why a systolic array places and routes more cleanly than a vector machine
- [ ] Describe what changes in the datapath when adding native FP8/MXFP4
- [ ] Give a concrete example of a compiler decision (tiling/scheduling) that changes a floorplan choice

---

## Area 6 — Economics, correctness & specialization risk

Recalibrating instincts: bigger and costlier dies, a far higher correctness bar, and a workload target that — unlike a fixed hash function — keeps moving.

**Concepts to master**

- [ ] Program economics: advanced-node NRE, mask/respin cost, IP/EDA cost, interposer/packaging supply constraints, cost-per-token / TCO
- [ ] The correctness bar: silent data corruption (SDC) at scale; why verification and reliability rigor rises above "just retry"
- [ ] Benchmarking: how AI hardware is actually measured (MLPerf)
- [ ] Specialization risk: how much programmability/numeric flexibility to keep so the chip survives model-landscape change

**Study these**

- [ ] *The Datacenter as a Computer* (latest ed.) — Barroso, Hölzle et al. (Book, open access) — warehouse-scale economics and TCO
- [ ] MLPerf / MLCommons benchmarks (Industry/Spec) + the MLPerf Power methodology paper
- [ ] *Cores That Don't Count* — Hochschild et al., HotOS 2021 (Paper) — why correctness/reliability rigor rises at scale
- [ ] *A New Golden Age for Computer Architecture* — Hennessy & Patterson (essay) — the specialization argument and its limits
- [ ] SemiAnalysis and Chips and Cheese (Industry) — ongoing system-level and economics calibration

**You can check this area off when you can…**

- [ ] Argue how much programmability an inference ASIC taped out today should keep given a 2-year design cycle, and contrast with why a fixed-function ASIC correctly keeps none
- [ ] Explain why silent data corruption raises the verification/reliability bar for AI silicon
- [ ] State the metrics buyers actually use to judge AI hardware and why

---

## Consolidated resource list (by type)

**Books**

- Sze, Chen, Yang, Emer — *Efficient Processing of Deep Neural Networks* (Areas 2, 5)
- Hennessy & Patterson — *Computer Architecture: A Quantitative Approach* (spine; Ch. 2, Ch. 7)
- Kahng, Lienig, Markov, Hu — *VLSI Physical Design: From Graph Partitioning to Timing Closure* (Areas 1, 4)
- Bhasker & Chadha — *Static Timing Analysis for Nanometer Designs* (Area 4)
- Dally & Towles — *Principles and Practices of Interconnection Networks* (Area 3)
- Jerger, Krishna, Peh — *On-Chip Networks* (Synthesis Lectures) (Area 3)
- Weste & Harris — *CMOS VLSI Design* (Areas 0, 1)
- Wang, Wu, Wen — *VLSI Test: Principles and Architectures* (Area 4)
- Dally & Poulton — *Digital Systems Engineering* (Area 3, optional)
- Barroso, Hölzle et al. — *The Datacenter as a Computer* (Area 6, open access)

**Free courses / lecture material**

- Onur Mutlu — ETH Zürich computer-architecture & memory-systems lectures (Areas 0, 1, 2, 4, 5)
- Sze & Emer — MIT 6.5930 *Hardware Architectures for Deep Learning* (Area 5)

**Papers**

- Jouppi et al. — *In-Datacenter Performance Analysis of a TPU*, ISCA 2017 (Area 5)
- Jouppi et al. — *TPU v4: An Optically Reconfigurable Supercomputer…*, ISCA 2023 (Areas 3, 5)
- Abts et al. (Groq) — *Think Fast: A Tensor Streaming Processor*, ISCA 2020 (Area 5)
- Williams, Waterman, Patterson — *Roofline* model, CACM 2009 (Area 2)
- Rouhani et al. — *Microscaling Data Formats for Deep Learning* (Area 5)
- Micikevicius et al. — *FP8 Formats for Deep Learning* (Area 5)
- Hochschild et al. — *Cores That Don't Count*, HotOS 2021 (Area 6)
- Hennessy & Patterson — *A New Golden Age for Computer Architecture* (Areas 5, 6)

**Specs / standards**

- OCP — *Microscaling (MX) Formats Specification v1.0* (Area 5)
- JEDEC — *HBM3 (JESD238)* and successors (Area 2)
- UCIe Consortium — *UCIe specifications* (Areas 3, 4)
- MLCommons — *MLPerf* benchmark suites (Area 6)

**Industry / blogs (ongoing calibration, not primary sources)**

- Siemens EDA — HBM3E/HBM4 IC design guide (Areas 2, 4)
- Synopsys / Cadence / AnySilicon — UCIe, power-integrity, and PD explainers (Areas 1, 3, 4)
- SemiAnalysis, Chips and Cheese — system-level and economics deep-dives (Area 6)

A note on standards: the JEDEC HBM and UCIe specifications are the authoritative definitions but are large and access-gated — treat them as reference to consult, and learn the concepts first from the courses, books, and vendor explainers.

---

## Sources

**Books & courses**

- *Efficient Processing of Deep Neural Networks* — Sze, Chen, Yang, Emer: [Springer/Amazon](https://www.amazon.com/Efficient-Processing-Deep-Neural-Networks/dp/168173835X); free tutorial/survey version: [arXiv:1703.09039](https://arxiv.org/abs/1703.09039)
- MIT 6.5930 *Hardware Architectures for Deep Learning* (Sze & Emer): [course materials](https://csg.csail.mit.edu/6.5930/)
- Onur Mutlu lectures (ETH Zürich): [lecture videos & slides](https://people.inf.ethz.ch/omutlu/lecture-videos.html) · [YouTube channel](https://www.youtube.com/onurmutlulectures)
- *VLSI Physical Design: From Graph Partitioning to Timing Closure* — Kahng, Lienig, Markov, Hu: [Springer](https://link.springer.com/book/10.1007/978-3-030-96415-3)
- *Static Timing Analysis for Nanometer Designs* — Bhasker & Chadha: [Springer](https://link.springer.com/book/10.1007/978-0-387-93820-2)
- *Principles and Practices of Interconnection Networks* — Dally & Towles: [Elsevier/Morgan Kaufmann](https://www.amazon.com/Principles-Practices-Interconnection-Networks-Architecture/dp/0122007514)
- *CMOS VLSI Design* (4th ed.) — Weste & Harris: [companion site (HMC)](https://pages.hmc.edu/harris/cmosvlsi/4e/index.html)
- *The Datacenter as a Computer* — Barroso, Clidaras, Hölzle: [Springer](https://link.springer.com/book/10.1007/978-3-031-01761-2)

**Papers**

- *In-Datacenter Performance Analysis of a TPU* (ISCA 2017): [arXiv:1704.04760](https://arxiv.org/abs/1704.04760)
- *TPU v4: An Optically Reconfigurable Supercomputer…* (ISCA 2023): [arXiv:2304.01433](https://arxiv.org/abs/2304.01433)
- *Think Fast: A Tensor Streaming Processor (TSP)* — Groq (ISCA 2020): [IEEE CSDL](https://store.computer.org/csdl/proceedings-article/isca/2020/09138986/1lsasZYR61O)
- *Microscaling Data Formats for Deep Learning*: [arXiv:2310.10537](https://arxiv.org/abs/2310.10537)

**Specs & industry**

- OCP *Microscaling (MX) Formats Specification*: [Open Compute Project](https://www.opencompute.org/documents/ocp-microscaling-formats-mx-v1-0-spec-final-pdf)
- JEDEC HBM3 (JESD238): [JEDEC](https://www.jedec.org/standards-documents/docs/jesd238b01)
- UCIe specifications: [UCIe Consortium](https://www.uciexpress.org/specifications) · explainer: [Synopsys UCIe 2.0](https://www.synopsys.com/blogs/chip-design/ucie-2-0-setting-the-tone-for-chiplet-interoperability.html)
- HBM3E/HBM4 IC design guide: [Siemens EDA](https://blogs.sw.siemens.com/semiconductor-packaging/2026/04/24/hbm3e-hbm4-ic-design-guide/)
- MLPerf benchmarks: [MLCommons](https://mlcommons.org/benchmarks/)

— Youmoo（㕛木）

*Solid as teak.*
