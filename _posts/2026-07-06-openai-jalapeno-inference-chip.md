---
layout: post
title: "OpenAI Jalapeño 推理芯片首发：自研 ASIC、9 个月流片、目标砍半推理成本"
date: 2026-07-06 22:00:00 +0800
description: "OpenAI 联合 Broadcom 发布首款自研推理芯片 Jalapeño：reticle 级 ASIC、6 颗 HBM、Tomahawk 互联、9 个月极速流片，目标将 LLM 推理成本降低 50%。"
tags: [ai, chip, openai, broadcom, asic, inference, jalapeno, semiconductor]
---

2026 年 6 月 24 日，OpenAI 正式发布了其首款自研芯片——**Jalapeño Intelligence Processor**，由 Broadcom 联合设计，TSMC 制造，Celestica 提供板级和机架集成。

这不是又一个 GPU 替代品，而是一颗**专门为 LLM 推理从头设计的 ASIC**。在当前 OpenAI 年推理成本逼近 $140 亿的背景下，这颗芯片的战略意义不亚于当年 Google 推出 TPU。

## 1. 芯片架构：Reticle 级 ASIC + 6 颗 HBM

Jalapeño 是一颗 **reticle-sized ASIC**——即芯片面积接近光刻机的最大单次曝光极限（reticle limit，约 858mm²）。这在物理上已经是单芯片的边界，意味着它在晶体管预算上毫不妥协。

从 OpenAI 和 Broadcom 公布的封装照片来看：

- **6 个 HBM 堆叠**分布在芯片两侧，提供超高带宽的本地内存
- **Broadcom Tomahawk 交换芯片**直接集成到平台设计中，用于跨节点大规模互联
- 板级和机架系统由 **Celestica** 负责

这本质上是一颗「算力面积极大化 + 数据移动极小化」的设计。OpenAI 硬件负责人 **Richard Ho** 明确表示，架构的核心目标是**最小化数据移动**，将实际利用率推向理论峰值。这恰恰是 GPU 在推理场景中的最大软肋——通用架构的显存带宽大量浪费在非推理所需的数据搬运上。

## 2. 9 个月流片：AI 辅助芯片设计

最令人惊讶的数字不是性能，而是速度。OpenAI 宣称**从设计到 tape-out 仅用了 9 个月**。

对于一颗 reticle 级别的 ASIC，这个周期几乎是不可想象的——传统 ASIC 从架构定义到流片通常需要 18-24 个月，大型芯片甚至更长。OpenAI 透露，**他们用自己的模型加速了设计过程**——这可能是业界首次大规模应用 AI 辅助芯片设计（AI-driven EDA）并取得突破性成果的公开案例。

这一速度意味着：
- 设计自动化程度极高，人工迭代被压缩到最小
- 可能大量复用了 Broadcom 的 IP 库和已验证模块
- Physical design（布局布线、时序收敛）被 AI 工具加速

无论具体细节如何，9 个月流片一座 reticle 级芯片，本身就是对整个 EDA 行业的一次宣言。

## 3. 目标：砍半推理成本

OpenAI 的财务数据给出了自研芯片的动力：

| 指标 | 数值 |
|---|---|
| 2025 年推理成本 | **$84 亿** |
| 2026 年预测 | **~$140 亿** |
| 周活跃用户 | **9 亿** |
| 年收入 | **$250 亿** |
| 8 年计算总承诺 | **~$1.4 万亿** |
| Nvidia 高端芯片利润率 | **~75%** |
| OpenAI 自身利润率 | **~33%** |

OpenAI 宣称 Jalapeño 的目标是将推理成本**降低约 50%**。考虑到 Nvidia 的 75% 毛利，这个数字并非不切实际——自研芯片绕过 Nvidia 的定价权，即使性能不超越 H200/B200，仅靠消除中间商利润就能大幅压降成本。

## 4. 供应链：Broadcom + TSMC + Celestica

Jalapeño 的供应链清晰且成熟：

- **架构设计 & IP**：OpenAI（核心架构）+ Broadcom（硅工程、高速互联 IP）
- **制造**：TSMC（台湾）
- **网络**：Broadcom Tomahawk 交换芯片
- **板级/机架集成**：Celestica
- **现有能力**：已在实验室运行 GPT-5.3-Codex-Spark 模型，达到目标频率和功耗

这套组合本质上复用了超大规模数据中心（hyperscaler）的成熟模式——Broadcom 此前已为 Google 提供 TPU 设计服务多年。

## 5. 战略含义：从软件层转型垂直整合

Jalapeño 的发布标志着 OpenAI 从纯模型公司向**基础设施垂直整合**的关键一步。

类比 Apple 的封闭生态——自研 M 系列芯片 + iOS 的紧密耦合——OpenAI 现在可以在芯片架构、软件内核、内存系统、网络调度和应用层之间实现全栈优化。这种「芯片→模型→产品」的飞轮一旦运转：

> 更低推理成本 → 更好产品体验 → 更多用户 → 更多收入 → 再投资基础设施

Google 在 2015 年推出 TPU，用了近十年建立自己的 AI 芯片生态。OpenAI 借鉴了这一路径，但起点更高——Broadcom 的成熟技术栈、TSMC 的先进制程、以及 9 亿用户的需求拉动。

## 6. 对芯片行业的冲击

| 赢家 | 输家 |
|---|---|
| **Broadcom (AVGO)** — 设计订单暴增 | **Nvidia (NVDA)** — 最大客户之一开始自研 |
| **TSMC** — 新的大规模晶圆需求 | **AMD (AMD)** — 推理市场又多了一个竞争者 |
| **Celestica** — 系统集成订单 | **通用 GPU 推理方案** — ASIC 的降维打击 |
| **EDA 工具链** — AI-driven design 的示范效应 | |

短期内 Nvidia 的护城河仍深（CUDA 生态、训练市场主导），但 OpenAI 的入局标志着**推理侧芯片格局的长期碎片化**已经开始——Google TPU、Amazon Trainium/Inferentia、Microsoft Maia、Meta MTIA，现在加上 OpenAI Jalapeño。推理芯片的「大一统」时代正在终结。

## 7. IC 视角的思考

作为 IC 工程师，Jalapeño 最值得关注的三点：

1. **Reticle limit ASIC 做推理**——说明 OpenAI 认为单芯片算力密度优先于 yield/cost trade-off。这是典型的第一代「不计成本求突破」的策略，后续迭代才会优化 die size。

2. **数据移动最小化**——Richard Ho 的说法暗示 Jalapeño 在 memory hierarchy 上做了激进优化，可能采用了近存计算（near-memory compute）或超宽数据通路。细节待后续公布。

3. **9 个月流片**——如果这不是 PR 数字游戏，而是真实从 RTL freeze 到 tape-out 的周期，那意味着 AI-driven EDA 已经越过了生产可行性的门槛。这对整个 IC 后端设计流程将是地震级的影响。

OpenAI 承诺在未来几个月公布更详细的架构和性能数据。对于这颗「最有野心的 AI 芯片之一」，我们拭目以待。

— Youmoo（㕛木）

*Solid as teak.*
