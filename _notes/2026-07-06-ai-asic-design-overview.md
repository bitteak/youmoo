---
layout: post
title: "AI ASIC Design — End-to-End Overview, Physical-Design Deep Dive, and the BTC→AI Transition"
date: 2026-07-06 23:00:00 +0800
description: "A practitioner's guide covering the full AI chip design flow from architecture to GDSII, with a deep dive into physical-design challenges (PDN, thermal, clocking, HBM) and a concrete transition map for Bitcoin ASIC engineers moving to AI silicon."
tags: [ai, asic, chip-design, physical-design, bitcoin, tpu, hbm, eda]
---

# AI ASIC Design — End-to-End Overview, Physical-Design Deep Dive, and the BTC→AI Transition

*A practitioner's guide for engineers who know silicon and want to understand what makes AI accelerators (TPU, LPU, Trainium, and the new wave of lab silicon) different — with the deepest treatment reserved for physical design and for the specific gap a Bitcoin-ASIC physical designer must close.*

*Prepared July 2026. Product facts (chip generations, nodes, specs) are current as of mid-2026 and cited at the end.*

---

## How to read this document

The document has three parts. **Part 1** walks the full design flow — architecture → front-end → back-end — and anchors each stage to real chips. **Part 2** goes deep on the physical-design problems that are genuinely hard on AI silicon and that determine whether a chip ships or dies. **Part 3** connects Bitcoin/mining ASIC physical design to AI ASIC physical design: what transfers, what doesn't, and a concrete map of the knowledge gap.

If you are short on time: Part 1's "Architecture" and "Back-end" sections plus all of Part 2 and Part 3 are the core. The showcases are illustrative and can be skimmed.

---

# Part 1 — The AI Chip Design Flow, End to End

An AI ASIC is still a chip: the same fab, the same EDA tools, the same physics. What is different is the *shape of the workload* it is built to serve, and that shape propagates all the way down from architecture to the placement of a via. It helps to hold one idea in your head throughout: **an AI accelerator is a machine for moving tensors into a very dense array of multiply-accumulate (MAC) units and getting the results back out, at the highest FLOPS-per-watt the process and the package allow.** Almost every design decision is downstream of that sentence.

## 1.1 Architecture — what actually makes an "AI chip"

Modern deep-learning models — transformers above all — reduce to enormous sequences of matrix multiplications (GEMMs), plus elementwise and reduction operations (activations, normalization, softmax, attention). The dominant cost is the GEMM. So the architectural question is: how do you build the densest, best-fed matrix-multiply engine you can, and how do you keep it busy?

**The compute fabric.** Two families dominate. The **systolic array** (Google's TPU is the canonical example) is a 2-D grid of MAC cells through which operands flow rhythmically; each cell multiplies, accumulates, and passes data to its neighbor, so a 128×128 array performs 16,384 MACs per cycle with almost no control overhead and very short, local wires. The **SIMD/vector + tensor-core** approach (NVIDIA GPUs, AWS Trainium's NeuronCores) uses many parallel lanes with dedicated matrix units bolted on. Trainium3, for instance, puts both a 128×128 BF16 systolic array and a 512×128 low-precision (MXFP8/MXFP4) array inside each of its eight NeuronCores. Systolic arrays win on efficiency and wire locality; vector machines win on flexibility. Every AI ASIC lands somewhere on this spectrum.

**The memory hierarchy is the real battleground.** Compute density has outrun memory bandwidth for a decade — this is the "memory wall," and it is *the* defining constraint of the field. The arithmetic intensity of a workload (FLOPs per byte moved) decides whether you are compute-bound or memory-bound; LLM *inference*, especially the token-by-token decode phase, is brutally memory-bound. Architects respond in two ways:

- **Feed from HBM.** High-Bandwidth Memory (stacked DRAM sitting next to the die on a silicon interposer) is the standard answer for training and large-model inference. Google's Ironwood TPU carries 192 GB of HBM3E at ~7.4 TB/s per chip; Trainium3 carries 144 GB at 4.9 TB/s. HBM bandwidth, not FLOPS, is frequently the headline number that matters.
- **Keep everything on-chip in SRAM.** The opposite bet: make the die (or wafer) large enough that model weights and activations live in on-chip SRAM, whose bandwidth is one to two orders of magnitude higher than HBM. Groq's LPU stores weights in hundreds of MB of on-chip SRAM (≈230 MB in the first generation, ~500 MB later) fed at tens of PB/s, with no DRAM in the datapath at all. Cerebras takes this to its logical extreme with 44 GB of SRAM on a single wafer at 21 PB/s. The payoff is deterministic, ultra-low latency; the cost is silicon area and a hard ceiling on model size per device.

**Numerics / precision.** AI tolerates low precision, and exploiting that is free performance and power. The industry has marched from FP32 → FP16/BF16 → FP8 → FP4/MXFP4 and various block-scaled formats. Lower precision means smaller multipliers (area and power scale roughly with the square of mantissa width), more MACs per mm², and less data to move. Choosing which formats to support natively, and how to handle scaling/overflow, is a first-order architectural decision that reshapes the entire datapath.

**On-chip interconnect (NoC) and scale-out fabric.** Inside the die, a network-on-chip carries operands between memory, compute tiles, and I/O; its bisection bandwidth and topology (mesh, ring, crossbar) can make or break utilization. Outside the die, AI accelerators are *never* used alone — they are lashed into pods. Google's ICI links 9,216 Ironwood chips into a 42.5-exaflop superpod; AWS's NeuronLink/NeuronSwitch scales UltraServers toward a million-chip UltraCluster; NVIDIA uses NVLink/NVSwitch. The chip's die-edge SerDes and the scale-up fabric are as much a part of "the architecture" as the MAC array, because the training job runs across the whole pod.

**Training vs. inference.** These are diverging into separate silicon. Training needs high precision for gradients, huge memory for optimizer state and activations, and all-to-all collective bandwidth for gradient sync. Inference — especially the autoregressive decode of LLMs — needs low latency, low precision, and cost-per-token efficiency, and is dominated by memory bandwidth and by the KV-cache. Google now designs distinct training and inference TPUs; OpenAI's first custom chip ("Jalapeño") is explicitly an *inference* part. Knowing which side of this line a chip is on explains most of its architecture.

## 1.2 Front-end design — from architecture to a verified netlist

Front-end (a.k.a. RTL or logic design) turns the architecture into synthesizable Verilog/SystemVerilog and proves it correct.

**Microarchitecture and RTL.** Architects hand down performance models (often cycle-accurate simulators and spreadsheets); RTL designers implement the datapath (the MAC array, accumulators, the vector/transcendental units for softmax/GELU/layernorm), the memory subsystem (SRAM banks, HBM controllers, the NoC), and the control (sequencers, DMA engines, the instruction fetch/dispatch for whatever ISA the chip exposes). AI datapaths are unusually regular and replicated — a tile is designed once and instanced thousands of times — which is a gift to both design and verification.

**Compiler/hardware co-design — the piece that surprises newcomers.** For an AI ASIC, the compiler is not an afterthought; it is co-designed with the hardware and often gates the whole program. A Groq-style statically scheduled machine pushes essentially all decisions (what executes each cycle, where every operand lives) into the compiler, so the hardware can drop caches, branch prediction, and out-of-order logic entirely. Even for more dynamic machines (TPU's XLA, Trainium's Neuron, NVIDIA's CUDA/cuDNN), the software stack decides whether the beautiful MAC array ever reaches high utilization. A chip that is 30% faster on paper but has an immature compiler loses to a slower chip with a great one. This is why silicon programs staff enormous compiler teams in parallel with the RTL team.

**Functional verification.** Typically 60–70% of front-end effort. Constrained-random simulation with coverage closure (UVM), formal property checking on control-critical blocks, and increasingly emulation/FPGA prototyping to run real model kernels before tape-out. The regular, replicated datapath makes block-level verification tractable; the hard parts are the memory system, the NoC under congestion, and the corner cases of low-precision arithmetic (rounding, saturation, NaN/inf propagation).

**Design-for-Test (DFT) and design-for-reliability.** Scan chains, MBIST for the vast SRAM arrays, logic BIST, and increasingly in-field monitors. On a chip with billions of transistors and huge SRAM content, test coverage and diagnosis directly drive yield and cost, so DFT is planned from the start, not retrofitted.

**Front-end hand-off.** The output is a synthesized gate-level netlist plus constraints (SDC: clocks, I/O timing, exceptions), a floorplan intent, UPF/CPF power intent (voltage domains, power gating), and the DFT structures — everything the back-end needs.

## 1.3 Back-end design — physical implementation and signoff

Back-end (physical design, "PnR", implementation) turns the netlist into a manufacturable layout (GDSII) that meets timing, power, area, thermal, reliability, and manufacturability targets across all process/voltage/temperature corners. This is where an AI chip's ambitions collide with physics, and it is the focus of Part 2. The canonical flow:

1. **Floorplanning** — decide die size and shape, place hard macros (SRAM banks, HBM PHYs, SerDes, PLLs), define the power grid skeleton, partition the design into physical blocks, and plan the die-to-package/interposer connection. For a tiled AI accelerator this is dominated by arraying a compute tile many times and planning how memory feeds each tile.
2. **Power delivery network (PDN) design** — build the grid of straps and vias that carries current from package bumps to every cell. On a high-current AI die this is a make-or-break early decision (see Part 2).
3. **Placement** — position millions to billions of standard cells; optimize for timing, congestion, and power simultaneously.
4. **Clock tree synthesis (CTS)** — distribute one or more clocks to hundreds of thousands of flops with minimal skew and jitter, without burning excessive power.
5. **Routing** — connect everything across a dozen-plus metal layers while meeting design rules, signal integrity, and electromigration limits.
6. **Timing closure / signoff** — static timing analysis (STA) across all corners, plus power (IR-drop/EM), signal integrity (crosstalk), thermal, and physical verification (DRC/LVS/antenna). Iterate — often for months — until everything is clean.
7. **Package and system co-design** — for AI parts this is first-class: 2.5D interposers (TSMC CoWoS and friends) integrating the die with HBM stacks, thermal solution, and the board.

The showcases below make these stages concrete; Part 2 explains why several of them are brutally hard for AI silicon specifically.

## 1.4 Showcases — how the flow lands in real silicon

These are chosen to span the design space, not to rank them. Each illustrates a different architectural bet and the physical-design consequences that follow.

**Google TPU — the systolic-array standard-bearer.** Seven generations in, the TPU is the reference design for AI accelerators. The current 7th-gen "Ironwood" (TPU7x) carries two TensorCores and four SparseCores per chip, 192 GB of HBM3E at ~7.4 TB/s, and ~4.6 PF of FP8, scaling to a 9,216-chip / 42.5-exaflop superpod over the 9.6 Tb/s ICI fabric. Google has now split future TPUs into distinct training and inference chips and is moving to TSMC's 2 nm node. Physical-design signature: a huge, extremely regular MAC array; HBM PHYs and ICI SerDes dominating the die edge; and a scale-up fabric treated as part of the product.

**AWS Trainium3 — the vector+tensor hyperscaler play.** A 3 nm training/inference part: 2.52 PF FP8, 144 GB HBM3e at 4.9 TB/s, eight NeuronCore-v4 units each combining a 128×128 BF16 systolic array, a 512×128 MXFP8/MXFP4 array, a vector engine, and 32 MiB of dedicated SRAM. NeuronLink-v4 gives 2 TB/s per chip; UltraServers scale to 144 chips and UltraClusters toward a million. Signature: heterogeneous compute engines per core, aggressive low-precision datapaths, and hyperscale scale-out designed in from day one.

**Groq LPU — the deterministic, SRAM-only inference machine.** The LPU abandons DRAM in the datapath: model weights live in hundreds of MB of on-chip SRAM (≈230 MB early, ~500 MB later) fed at tens of PB/s, and the machine is *statically scheduled* — the compiler fixes what happens every cycle, so caches, dynamic scheduling, and out-of-order logic are removed. The result is deterministic, very low token latency. Physical-design signature: SRAM is the chip; on-chip bandwidth and the placement/routing of enormous memory arrays dominate; timing is simplified by the fixed schedule but stressed by the sheer size of the on-chip fabric.

**Cerebras WSE-3 — wafer-scale, the on-chip-memory bet taken to the limit.** An entire 5 nm wafer as one "chip": 46,225 mm², 4 trillion transistors, 900,000 cores, 44 GB of SRAM at 21 PB/s, an on-wafer fabric at 214 Pb/s with single-cycle core-to-core latency, ~23 kW in a CS-3 chassis. It exists to eliminate off-chip communication entirely. Signature: every hard physical-design problem — power delivery, thermal, clock distribution, yield/redundancy, cooling — pushed to an extreme that forces custom solutions (redundant cores to route around defects, custom power and cooling planes).

**OpenAI "Jalapeño" — the model-lab custom inference ASIC.** OpenAI's first custom silicon, co-developed with Broadcom and built on TSMC 3 nm with eight HBM stacks, targeting ~50% lower cost per inference token than GPUs and going from design to tape-out in roughly nine months as part of a 10 GW multi-year buildout. It typifies the 2025–26 wave of frontier labs (also Meta's MTIA, Microsoft's Maia, Amazon, and others) designing their own inference silicon to escape GPU cost and supply. Signature: a "blank-slate" design tightly specialized to the transformer inference the lab actually runs, leaning on a partner (Broadcom/Marvell/Alchip) for the physical-design and IP muscle.

**Etched-style "transformer-only" ASICs and the specialization frontier.** A cohort of startups bets on hard-wiring the transformer itself into silicon, trading all generality for extreme efficiency on one architecture. This is the far end of the specialization axis — and the same bet Bitcoin ASICs made against SHA-256. It only pays off if the target algorithm stays stable long enough to amortize the mask set, which is exactly the risk (transformers may not be forever) and exactly the parallel to mining silicon.

**NVIDIA GPUs — the flexible baseline everyone is measured against.** Not an ASIC in the narrow sense, but the incumbent: massively multi-threaded SIMT with Tensor Cores, HBM, NVLink/NVSwitch, and a dominant software moat (CUDA). The whole custom-ASIC movement is an argument that for a *known, stable* workload you can beat a general-purpose GPU on cost and power — the same argument mining ASICs made against GPUs a decade ago.

The through-line: chips differ mainly in **where they sit on two axes — how specialized (GPU → TPU → LPU → transformer-ASIC) and where the memory lives (HBM-fed → SRAM-resident → wafer-scale)** — and those two choices dictate the physical-design problem you inherit.

---

# Part 2 — The Hardest Physical-Design Problems for AI ASICs

Everything below is a physical-design problem, ordered roughly by how often it is the thing that actually threatens tape-out. If you take one message from this part: **AI accelerators are power-, memory-, and reticle-limited, not logic-limited.** The MAC array is easy to lay out; the difficulty is feeding it, cooling it, clocking it, and connecting it — at a die size that leaves no margin.

## 2.1 Power delivery and IR-drop — the dominant constraint

An AI die running a dense GEMM turns on a staggering fraction of its transistors simultaneously. Package power for a modern training accelerator sits in the 700 W–1.2 kW range, and *current* is in the hundreds of amps at sub-volt supply. The core problem is delivering that current from the package bumps down through the on-chip power grid to every cell without the voltage sagging below what the logic needs to meet timing (**IR-drop**), and without the current spiking so fast when the array switches that inductance causes a droop (**di/dt, Ldi/dt**).

Why it's uniquely hard for AI silicon:

- **Correlated switching.** In a general SoC, activity is scattered in time and space. In a systolic array doing a matmul, tens of thousands of MACs switch in near-lockstep, creating a huge, spatially concentrated, temporally correlated current draw — the worst case for a power grid. Vector-heavy phases and the transition between compute and memory phases create large di/dt events.
- **The grid steals resources you need for signals.** A robust PDN wants wide, dense metal straps on the upper layers and many bump/via connections — but those same routing tracks and area are what your NoC and long-haul signals want. PDN vs. signal routing is a zero-sum fight on the upper metals.
- **Signoff is multi-physics and iterative.** You co-simulate the package, the on-chip grid, and the workload's current profile (dynamic vector-based IR-drop, not just static). Fixing a hotspot late — adding straps, decap, or re-spreading the floorplan — ripples back into placement and timing.

Mitigations: heavy on-die and in-package decoupling capacitance, fine-grained power gating and clock gating (a huge lever because idle tiles must not waste power), adaptive voltage/frequency and droop detectors, careful bump-map and C4/µbump planning, and increasingly **backside power delivery** (moving the PDN to the back of the wafer, e.g. Intel PowerVia and the coming nodes) to free front-side tracks for signals. For a mining-ASIC veteran this is the single most familiar-yet-different problem — familiar because mining chips are also current monsters, different because the switching is correlated and the grid competes with a real interconnect (more in Part 3).

## 2.2 Thermal, power density, and thermal-aware design

High power in a big die means high total heat; high power in the *active tiles* means high power density and hotspots. Leakage rises with temperature, and higher temperature slows transistors and worsens electromigration — a set of positive-feedback loops that must be damped. Thermal is no longer just a package/system problem handed off at the end; it feeds back into floorplanning (spread the hot blocks, don't cluster all MAC tiles against one edge), into placement, and into the DVFS strategy.

Consequences the physical designer owns: thermal-aware floorplanning and tile spacing, on-die thermal sensors and throttling, planning for the cooling solution (advanced air, direct-to-chip liquid cold plates, and at the extreme — Cerebras — a bespoke water-cooling plane integrated with the wafer), and analyzing thermal gradients across a large die because a hot center vs. cool edge creates timing skew and mechanical stress. At the pod level, ~1 kW parts in dense racks make the *data-center* thermal envelope a chip-design input.

## 2.3 Clocking a giant die — CTS, skew, and clock power

Distributing a clock to hundreds of thousands (or millions) of flip-flops across a reticle-sized die with low skew is genuinely hard, and the clock network can burn 20–40% of total dynamic power. On a large AI die:

- **Global skew and OCV.** Long clock paths accumulate on-chip variation and are sensitive to the thermal gradients above; balancing skew across a die that has a 20–30 °C internal gradient is a moving target.
- **Clock power.** With so many endpoints, the clock tree is a first-order power consumer, so designers lean on multi-level gating, and some architectures (Groq's static schedule, mesochronous or GALS schemes across tiles) deliberately relax global synchrony to make the problem tractable.
- **Regular tiling helps.** A big advantage of AI accelerators: the compute fabric is a repeated tile, so the clock structure can be designed once per tile and a manageable top-level tree distributes to tiles. This is one place the regularity of AI datapaths genuinely eases physical design.

## 2.4 Routing congestion and the interconnect

The MAC array is placement-friendly, but the *data movement* around it is not. Feeding a 128×128 array requires wide operand and result buses; the NoC that ties tiles, SRAM banks, and HBM controllers together has high bisection bandwidth and creates routing hotspots; and the low-precision datapaths, while smaller per MAC, are packed so densely that local routing demand is intense. Congestion shows up as unroutable regions, detours that blow timing, and DRC violations on the finest layers.

The upper-metal contention noted under PDN reappears here: HBM interfaces, die-edge SerDes, the clock, and the PDN all want the top layers. Managing this is largely a floorplanning and layer-assignment discipline — decide early which layers belong to power, clock, long-haul NoC, and signal, and design the tile so its local routing closes without spilling upward.

## 2.5 Timing closure at massive scale

STA on a design with billions of instances, across a dozen-plus corners (process, voltage, temperature, RC) and multiple modes, is a computational and organizational problem as much as an engineering one. AI dies add specific pressure: the arithmetic pipelines are deep and run near the frequency ceiling of the node; SRAM-heavy designs have enormous numbers of memory timing paths; and the huge die means real inter-block clock and signal latencies. The practical answer is **hierarchical design** — partition the die into blocks with well-defined timing budgets and abstracts (ETMs/models), close each block, then close the top level — trading some quality-of-result for the ability to close at all and to run teams in parallel. Regular, replicated tiles make the hierarchy natural; the residual pain is the top-level integration, the memory subsystem, and the I/O.

## 2.6 The reticle limit, big dies, and yield

Photolithography can print a die only up to the reticle limit (~800 mm², heading smaller at some advanced nodes). AI architects want more silicon than that, which forces two hard choices with heavy physical-design implications:

- **Push to the reticle limit and fight yield.** A near-reticle die has terrible yield — defect density means very few perfect dies per wafer — so designs build in **redundancy** (spare rows/columns in SRAM, spare compute tiles, repairable interconnect) and harvest partially good dies as lower-SKU parts (binning). Cerebras's wafer-scale approach is the extreme: it *assumes* defects and routes around bad cores with built-in redundancy.
- **Go multi-die / chiplet.** Split the design into smaller, higher-yielding chiplets and reconnect them with a high-bandwidth die-to-die interface (UCIe and proprietary links) on an interposer or with advanced packaging. This trades monolithic simplicity for yield and modularity but adds die-to-die PHY design, cross-die timing and clocking, thermal coupling between stacked/adjacent dies, and much more complex signoff.

## 2.7 HBM integration and 2.5D/3D advanced packaging

HBM is now inseparable from AI physical design. Integrating 4–8+ HBM stacks means: the HBM PHY hard macros eat a large fraction of die edge and beachfront; the die sits on a silicon interposer (TSMC CoWoS and equivalents) whose availability and yield are a real supply constraint for the whole industry; thousands of microbumps must be planned; and the thermal and mechanical interaction between logic die, interposer, and DRAM stacks must be co-designed. Signal integrity on the HBM interface and power integrity for the memory are their own signoff problems. **Package/interposer co-design has been promoted from back-end afterthought to a primary architecture-level constraint** — you plan the package concurrently with the die.

## 2.8 Signal integrity, electromigration, and reliability at high current

At hundreds of amps and multi-GHz edges: crosstalk on the dense, fast NoC must be modeled and mitigated; **electromigration** on power straps and high-current signal wires is a hard constraint (wires must be sized so metal doesn't degrade over the product lifetime under continuous full-load AI workloads — and AI parts run near 100% utilization, unlike bursty consumer chips); and aging/reliability (NBTI/HCI, thermal cycling) matters because these chips run flat-out for years in a data center. Reliability signoff is stricter than for consumer parts precisely because the duty cycle is so high.

## 2.9 Verification/DFT at the physical level, and bring-up

The scale amplifies everything: huge SRAM content demands efficient MBIST and repair; a reticle-sized die needs strong scan compression and diagnosis to make yield economics work; and post-silicon bring-up of a 1 kW part on a 2.5D package with HBM is a serious lab exercise. Getting DFT, power-on sequencing, and thermal/power monitoring right in the physical implementation is what lets the program debug first silicon quickly.

## 2.10 The meta-problem: it is all coupled

The reason AI physical design is hard is not any single item above — it is that **power, thermal, timing, congestion, and packaging are tightly coupled and all near their limits at once**, on the biggest dies anyone builds, with no slack to trade. Fixing IR-drop moves the floorplan, which moves timing and congestion, which moves the clock tree, which moves power. Convergence takes many months and a lot of compute, and the winning teams are the ones with mature methodology (hierarchical flow, good abstracts, early package co-design, and heavy multi-physics signoff automation) rather than heroics.

---

# Part 3 — From Bitcoin ASIC to AI ASIC Physical Design

This part is written for an engineer who has done physical design on Bitcoin/mining ASICs and wants to move to AI silicon. The good news: you already own the *hardest-to-teach* instincts in the field. The gap is narrower than it looks, but it is specific, and knowing exactly what to relearn saves months.

## 3.1 Why the two are cousins

Both are **domain-specific accelerators** built on the same premise: take one known, stable, massively parallel computation and build silicon that does *only that*, at the best performance-per-watt the process allows, discarding everything a general-purpose chip carries. A Bitcoin miner devotes ~100% of its transistor budget to SHA-256 hash engines; an AI accelerator devotes most of its budget to MAC arrays. Both replicate a single core unit — a hash engine, a MAC tile — thousands of times across the die. Both are judged on efficiency (J/TH for mining, FLOPS/W or tokens/$/W for AI), both run at ~100% utilization for years, and both live or die on power and thermal engineering, not on clever control logic. A mining-ASIC physical designer and an AI-ASIC physical designer are, at the block level, doing recognizably the same job: array a tile, feed it power, clock it, cool it, and get the die to yield.

## 3.2 What transfers directly (your existing edge)

These skills carry over with little translation, and they happen to be exactly the skills AI physical design stresses most:

- **High-current power delivery.** Mining chips are current monsters run at aggressive, near-threshold voltages; you have deep, hard-won intuition for PDN design, IR-drop, decap placement, and bump planning. This is arguably *the* top AI physical-design problem, and you arrive fluent in it.
- **Extreme replication and tiling methodology.** You already think in "design the core unit once, array it perfectly, make the array abstract clean." That is precisely how AI compute fabrics are built.
- **Power/thermal-first mindset.** You instinctively treat power and heat as the primary design axis rather than an afterthought. Most SoC designers have to learn this; you live it.
- **Squeezing a node to its limits.** Mining ASICs push closer to the physical limits of a process than almost any other product because there is no general-purpose overhead to protect. That aggressiveness — voltage optimization, custom cells, tight floorplans — is directly useful.
- **Cost/yield discipline.** You already optimize relentlessly for $/unit-of-work and understand how die size, node, and yield drive economics. AI programs need exactly this instinct, now with much more expensive dies.

## 3.3 What is different (the gap to close)

The differences cluster into a handful of themes. The table is the quick map; the prose after it explains the ones that bite hardest.

| Dimension | Bitcoin / mining ASIC | AI ASIC | Why it matters for you |
|---|---|---|---|
| Core computation | Fixed SHA-256, no data reuse | GEMM + activations; heavy data reuse and dataflow | Memory movement, not compute, becomes the design problem |
| Memory | Almost none; no external DRAM in datapath | HBM (100s GB, TB/s) and/or huge on-chip SRAM | Entire new discipline: memory hierarchy, HBM PHY, SRAM arrays |
| Interconnect | Trivial — hash cores barely talk to each other | Rich NoC on-die + multi-Tb/s scale-out fabric across pods | Congestion, bisection bandwidth, SerDes, die-to-die links are new |
| Die size | Small–moderate; many small dies per wafer | Reticle-limited monsters, chiplets, or whole wafers | Hierarchical flow, redundancy, 2.5D packaging are mandatory |
| Packaging | Standard, cheap | 2.5D interposer (CoWoS) + HBM co-design | Package becomes an architecture-level constraint |
| Switching profile | High but relatively steady/uniform | Bursty, spatially correlated, phase-dependent (compute vs. memory) | Dynamic/vector IR-drop and di/dt get much harder |
| Timing/CTS | Simpler; modest flop count, relaxed constraints | Billions of instances, deep pipelines near Fmax, big-die skew | Full hierarchical STA, OCV, multi-corner/mode signoff |
| Software | Firmware only; software is not on the critical path | Compiler co-design gates the whole program | You'll work alongside a huge compiler org; HW/SW co-design is real |
| Correctness bar | Occasional wrong hash is tolerable (just retry) | A wrong result corrupts a training run or an inference | Verification and reliability rigor step up substantially |
| Product cadence | Efficiency-driven refreshes of a stable algorithm | Chasing a fast-moving model landscape; specialization risk | Architecture must hedge against the workload changing |
| Cost per program | Low mask/design cost relative to AI | Enormous NRE, advanced node, EDA, IP, packaging | Schedule slips and respins are far more expensive |

**The memory hierarchy is the single biggest conceptual jump.** Mining has essentially no data reuse and no memory system to speak of — SHA-256 streams through and produces a hash. AI is *all about* data reuse and data movement: the "memory wall," arithmetic intensity, HBM bandwidth, SRAM buffering, KV-caches, and the NoC that shuttles operands are the substance of the design. Nearly everything hard in Part 2 that isn't power/thermal is, at root, a memory-movement problem. Budget most of your learning here.

**Interconnect and scale-out are a new world.** In a miner, hash cores are near-independent islands; routing between them is trivial and there is no chip-to-chip fabric that matters to the computation. AI accelerators are defined by their on-die NoC and by a scale-up fabric that lashes thousands of chips into one training job. Congestion-driven physical design, high-speed SerDes at the die edge, die-to-die interfaces (UCIe), and the notion that "the pod is the computer" are all new muscles.

**Big-die reality changes the methodology.** Mining dies are typically small and you get many per wafer; AI dies are reticle-limited (or chiplet, or wafer-scale), which forces hierarchical implementation, redundancy/binning for yield, and 2.5D packaging with HBM. The flow itself is heavier: block abstracts, top-level integration, multi-die timing, package co-design.

**The correctness and verification bar rises sharply.** A miner that occasionally computes a wrong hash simply retries — errors are cheap. In AI, a silent wrong result can corrupt a multi-week training run or return a bad inference, so functional verification, low-precision arithmetic corner cases, and reliability signoff are far more rigorous. Expect verification to be the majority of front-end effort and to interact with your physical work (e.g., timing margins, IR-drop-induced faults).

**Software co-design is suddenly central.** In mining, firmware is a footnote. In AI, the compiler and the hardware are designed together and the compiler frequently determines whether the silicon is competitive. Even as a back-end engineer you will feel this: architectural choices you implement (tile size, memory banking, NoC topology) are made jointly with compiler constraints, and "utilization" — a software-visible metric — is a first-class design goal.

## 3.4 The similarity that is a trap: specialization risk

Here is the deepest connection and the most useful warning. Bitcoin ASICs won a bet that SHA-256 would never change — and it hasn't, so hard-wiring it was pure upside. AI ASICs are making the *same style* of bet against the transformer (or against whatever operator mix the architects freeze into silicon), but the target is *not* guaranteed stable: model architectures evolve, precision formats shift, attention variants come and go, and a chip taped out today serves models that won't exist for its 18–24-month design cycle. The transformer-only ASICs are the purest version of this bet. So the mining instinct "specialize as hard as possible" is right on the axis you know (power, area, replication) but must be tempered with a hedge you didn't need before: **enough programmability and numeric flexibility to survive the workload moving under you.** Judging how much generality to keep is a core AI-architecture skill with no mining analog.

## 3.5 A concrete transition path

If you are making this move, a practical order of attack:

1. **Leverage what you have on day one** — volunteer for PDN, IR-drop/EM signoff, floorplanning of the compute array, and thermal work. You are already an expert here and it buys you credibility while you learn the rest.
2. **Learn the memory system first** — HBM (bandwidth, PHY, controllers, the memory wall, arithmetic intensity), SRAM array design and banking, and why data movement dominates. This is your biggest gap and your highest-leverage study.
3. **Learn the interconnect** — on-die NoC topologies and congestion, high-speed SerDes basics, die-to-die (UCIe/chiplet) interfaces, and the pod-scale fabric concepts (ICI/NVLink/NeuronLink). Understand "the pod is the computer."
4. **Scale up your methodology** — hierarchical physical design, block abstracts/ETMs, multi-corner-multi-mode STA, redundancy/yield for reticle-class dies, and 2.5D/CoWoS package co-design.
5. **Absorb enough architecture and software** — systolic arrays vs. vector/tensor cores, low-precision numerics (BF16/FP8/FP4/block formats), training vs. inference differences, and how the compiler and hardware are co-designed. You don't need to write the compiler, but you need to know why it constrains your layout.
6. **Recalibrate the stakes** — internalize that respins are far more expensive, dies are far bigger, correctness matters far more, and the workload target is moving. The engineering rigor and hedging are higher than mining habits assume.

Good starting references: the ISSCC and Hot Chips proceedings (TPU, Trainium, Cerebras, and NVIDIA papers appear there and are the best primary source), Google's TPU generational papers, SemiAnalysis and similar deep-dives for system-level context, and any advanced-node PDN / 2.5D-packaging material from the foundries. Your mining background means you can skip most introductory PD material and go straight to the AI-specific memory, interconnect, and big-die topics.

---

## Quick reference — the one-paragraph version

An AI ASIC is a machine for feeding a very dense array of low-precision multiply-accumulate units at the highest FLOPS-per-watt a process and package allow; its architecture is a set of choices about *how specialized* (GPU → TPU → LPU → transformer-ASIC) and *where the memory lives* (HBM-fed → SRAM-resident → wafer-scale), and those choices flow straight through front-end RTL/compiler co-design into a back-end whose hardest problems are power delivery and IR-drop, thermal, clocking a giant die, routing congestion around the memory system, timing closure at reticle scale, and HBM/2.5D package co-design — all tightly coupled and all near their limits at once. A Bitcoin-ASIC physical designer already owns the power, thermal, replication, node-squeezing, and yield instincts that this work stresses most; the gap to close is the memory hierarchy, the on-die and scale-out interconnect, big-die/chiplet/packaging methodology, a much higher correctness bar, real hardware-software co-design, and the judgment to hedge specialization against a workload that — unlike SHA-256 — keeps moving.

---

## Sources

- Google TPU7x "Ironwood": [Google Cloud docs](https://docs.cloud.google.com/tpu/docs/tpu7x), [Google blog](https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/ironwood-tpu-age-of-inference/), [TrendForce](https://www.trendforce.com/news/2025/11/07/news-google-unveils-7th-gen-tpu-ironwood-with-9216-chip-superpod-taking-aim-at-nvidia/), [SemiAnalysis](https://newsletter.semianalysis.com/p/tpuv7-google-takes-a-swing-at-the)
- OpenAI + Broadcom "Jalapeño" inference chip: [OpenAI](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/), [TechCrunch](https://techcrunch.com/2026/06/24/openai-unveils-its-first-custom-chip-built-by-broadcom/), [Tom's Hardware — custom AI ASIC state of play](https://www.tomshardware.com/tech-industry/semiconductors/custom-ai-asics-examined-from-broadcom-to-mtia)
- Groq LPU architecture: [Groq](https://groq.com/lpu-architecture), [Coding Confessions deep dive](https://blog.codingconfessions.com/p/groq-lpu-design)
- AWS Trainium3 / Trn3 UltraServers: [AWS](https://aws.amazon.com/ec2/instance-types/trn3/), [AWS Neuron architecture docs](https://awsdocs-neuron.readthedocs-hosted.com/en/latest/about-neuron/arch/neuron-hardware/trn3-arch.html), [SemiAnalysis](https://newsletter.semianalysis.com/p/aws-trainium3-deep-dive-a-potential)
- Cerebras WSE-3: [Cerebras press release](https://www.cerebras.ai/press-release/cerebras-announces-third-generation-wafer-scale-engine), [Hot Chips 2024 slides](https://hc2024.hotchips.org/assets/program/conference/day2/72_HC2024.Cerebras.Sean.v03.final.pdf)
- Bitcoin ASIC design (SHA-256 cores, node/voltage optimization): [D-Central — ASIC fabrication process](https://d-central.tech/inside-the-asic-fabrication-process-from-concept-to-completion/), [Intel Bonanza Mine paper (ISSCC)](https://ieeexplore.ieee.org/document/9731547/)
