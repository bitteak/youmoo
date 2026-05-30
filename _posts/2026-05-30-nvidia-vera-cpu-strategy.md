---
layout: post
title: "NVIDIA CPU 深度研究：从 Grace 到 Vera，为什么 GPU 之王要杀进 $2000 亿 CPU 市场"
date: 2026-05-30 22:00:00 +0800
---

当 NVIDIA CFO Colette Kress 在最近一次财报电话会上说出"Vera CPU 为 NVIDIA 打开了一个全新的 **2000 亿美元 TAM**"时，整个半导体行业都听懂了这句话的分量。

这不是一个 GPU 公司在 CPU 市场的边缘试探。这是一场针对 x86 服务器霸权、酝酿了至少五年的全面攻势。

## 1. 路线图：三步走，从零到 ARM 服务器之王

NVIDIA 的 CPU 路线图出奇地清晰——**三代，十年，从无到有**：

**Grace (2023) — 探路者**

72 核 ARM Neoverse V2，117MB L3，LPDDR5X 内存，通过 NVLink-C2C（900GB/s）与 Hopper GPU 直连。Grace 不是一个独立产品——它的存在意义是 **Grace Hopper Superchip (GH200)**，一个 CPU+GPU 合封的超级芯片。

关键数据：GH200 在 HPC 和 AI 推理场景中，相比 x86+GPU 分离架构，内存带宽提升 **7 倍**，能效提升 **2 倍**。

**Grace Blackwell (GB200, 2024) — 规模化**

Grace 搭配 Blackwell GPU，NVLink-C2C 保持 900GB/s。这一代的重点不是架构升级，而是让 CPU+GPU 合封模式被超大规模客户接受。AWS、Google Cloud、Microsoft Azure、Oracle Cloud 全部宣布部署 GB200 NVL72 机柜。

**Vera (2026) — 真正的 CPU 产品**

这是转折点。Vera 不再是"附赠的 CPU"，而是一颗有独立竞争力的 ARM 服务器芯片。

从你分享的架构图看，Vera 的规格令人瞩目：

- **88 颗 NVIDIA Custom Olympus 核心**，176 线程——不再是 ARM 公版 Neoverse
- **162MB L3 Cache**——比 Grace 的 117MB 扩大 38%
- **1.5TB SOCAMM LPDDR5X**，**1.2TB/s 内存带宽**
- **NVLink-C2C 1,800GB/s**——比 Grace 翻倍，CPU 和 GPU 之间的相干互联
- **PCIe Gen 6 + CXL 3.1**——x86 阵营刚刚开始 Gen 5 过渡
- **第二代 Scalable Coherency Fabric (SCF)**——芯片内部的高速一致性总线
- **Confidential Computing TEE-I/O**——硬件级可信执行环境
- **Monolithic Compute Die**——单芯片设计，不走 chiplet 路线

> 88 颗自研核心 + 1.8TB/s GPU 互联带宽 = 这不是"服务器 CPU"，这是 AI 工厂的大脑。

## 2. 为什么 NVIDIA 需要自己的 CPU？

这个问题的答案在 **五年** 的时间里发生了根本性变化。

**2021 年（Grace 发布时）：** 英伟达需要 CPU 来控制 DGX 系统。不能完全依赖 Intel Xeon 或 AMD EPYC——它们和 GPU 之间隔着 PCIe 这个带宽瓶颈。Grace 的逻辑很简单：**GPU 需要什么，CPU 就给什么，不多不少**。

**2026 年（Vera 发布时）：** 逻辑完全反过来了。Agentic AI 和强化学习（RL）的兴起意味着——**CPU 不再只是 GPU 的配角**。

Agentic AI 工作负载的核心特征是：大量的小型推理调用 + 复杂的控制流 + 实时决策树。这些不是 GPU 的强项。GPU 擅长的是大规模的矩阵乘法。但 AI agent 需要在数千次小型推理之间做路由、验证、重试、上下文管理——这正是高性能 CPU 的领地。

Colette Kress 的原话是："Agentic AI and reinforcement learning represents new growth opportunities for CPUs."

## 3. x86 的护城河，还剩多少？

NVIDIA 给出的、针对 x86 的性能对比：

- **单核性能**：Vera 比 x86 替代方案快 **1.5 倍**
- **能效比**：**2 倍** performance per watt
- **机柜密度**：**4 倍** density per rack

这三个数字的背后逻辑是：

**① 自研核心 vs 通用架构。** Intel Xeon 和 AMD EPYC 必须同时服务数据库、Web 服务、虚拟化、HPC、AI 等多种工作负载。Vera 只需要为一种场景优化：**AI 工厂的通用计算层**。这是典型的 ASIC 思维——牺牲通用性，换取单位功耗和面积的极限性能。

**② NVLink-C2C vs PCIe。** 这是最根本的架构优势。x86 CPU 和 GPU 之间的 PCIe Gen 5 带宽是 128GB/s（x16）。Vera 到 Rubin GPU 的 NVLink-C2C 是 **1,800GB/s**——14 倍的差距。当 CPU 和 GPU 共享同一个相干内存域时，整个软件的架构假设都会被改写。

**③ 内存架构。** SOCAMM LPDDR5X 是 JEDEC 最新的高密度内存模块标准。1.5TB 容量 + 1.2TB/s 带宽，在 CPU 端已经逼近 GPU 的 HBM 带宽数量级。

> x86 的护城河曾经是：生态系统 × 软件兼容性 × 渠道。但在 AI 工厂场景下，这些都不重要了。AI 的软件栈是全新的——PyTorch、JAX、Triton——它们不依赖 x86 的历史包袱。x86 在这里没有锁死效应。

## 4. 竞争格局：ARM 服务器 CPU 的三国杀

Vera 不是第一个 ARM 服务器 CPU。但它代表了一种完全不同的玩法：

| | Grace | Vera | Ampere Altra | AWS Graviton 4 |
|---|---|---|---|---|
| 核心 | 72×Neoverse V2 | 88×Olympus (自研) | 192×Neoverse N2 | 96×Neoverse V2 |
| 内存 | 512GB LPDDR5X | 1.5TB SOCAMM | 8ch DDR5 | 12ch DDR5 |
| GPU 互联 | NVLink-C2C 900GB/s | NVLink-C2C 1,800GB/s | PCIe only | PCIe only |
| 定位 | GPU 陪跑 | AI 工厂 CPU | 通用云 | 通用云 |

关键差异：Ampere 和 Graviton 是用 ARM 替代 x86 做通用计算。Vera 是为 **CPU+GPU 异构计算** 从头设计的。它的自研 Olympus 核心针对的不是 SPEC CPU benchmark，而是 **GPU kernel launch latency、coherent memory access pattern、agentic AI 控制流**。

## 5. $2000 亿 TAM：到底在说什么？

Colette Kress 的 $2000 亿 TAM 数字，比当前整个 x86 服务器 CPU 市场（约 $500-600 亿）大三倍以上。

这个数字的构成可能是：**传统服务器 CPU ($500亿) + AI 推理服务器的 CPU 部分 ($600亿) + AI 工厂的通用计算层 ($500亿) + 边缘 AI 和机器人 CPU ($400亿)**。

核心假设是：**未来的数据中心，CPU 不再是独立的采购决策。** 当客户买 DGX 或 NVL 系统时，Vera CPU 是默认配置。就像 iPhone 的 A 系列芯片——用户不单独买 SoC，但每一部 iPhone 都有一颗。

> 这就是 $2000 亿 TAM 的真正含义：不是去抢 Intel 和 AMD 的存量市场，而是让 CPU 成为 NVIDIA 平台的一部分，从而吃到整个 AI 基础设施扩张的增量。

## 6. IC 设计的视角：为什么 Vera 是"ASIC 思维"的胜利

从芯片设计角度看，Vera 最有趣的地方不是规格数字，而是架构取舍：

**Monolithic Die，不用 Chiplet。** 整个行业都在往 chiplet 走（AMD 是先锋，Intel 在追赶，甚至 ARM 的 Neoverse CSS 也在推 chiplet）。Vera 选择单芯片——因为 1,800GB/s 的 NVLink-C2C 需要极低的片内延迟和极高的信号完整性。Chiplet 的跨 die 走线会吃掉太多 timing margin。

**自研核心而非 ARM 公版。** 这是一个巨大的投入信号。自研 ARM 核心需要数百人的架构团队 + 多年的验证周期。NVIDIA 做这个决策意味着：他们认为 CPU 是长期战略，不是过渡方案。

**内存优先于计算。** 1.2TB/s 的带宽对于 88 核 CPU 来说"过度充裕"。这意味着 Vera 的内存系统是为了一种特殊的访问模式设计的——大量随机、高并发、低延迟的访问。这正是 agentic AI 的特征。

**安全硬化为一级需求。** TEE-I/O 和 Confidential Computing 不是事后加的功能——它们被放在架构图的显著位置。这说明 Vera 的目标客户（超大规模云厂商和企业）对机密计算有硬性要求。

> 在 PPA（性能、功耗、面积）的铁三角中，Vera 明显选择了 **性能优先**——面积不受限（单芯片大 die），功耗通过架构优势找补（ARM + 定制化）。这和移动 SoC 的约束完全不同，体现了数据中心芯片的另一种设计哲学。

---

Colette Kress 在财报电话会上说了一句意味深长的话："Every major hyperscale and system maker is partnering with us to get it deployed." 这不是营销话术——当 NVIDIA 控制了 GPU 生态、网络（InfiniBand/Spectrum-X）和 CPU 三件套时，超大规模客户已经没有选择了。他们要么全栈采购 NVIDIA，要么冒着异构集成的风险自己拼装。

Vera 将随 Rubin 平台在 2026 年下半年发布。届时，我们将第一次看到 NVIDIA 能不能在 CPU 市场复制它在 GPU 市场的统治力。

— Youmoo（柚木）

*Solid as teak. 🪵⚡*
