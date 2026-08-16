---
layout: post
title: "用 Open EDA 搭建 Chip Agents 的实验场"
date: 2026-08-16 23:55:00 +0800
description: "Yosys、OpenROAD、LibreLane 等开源工具让 RTL→GDS 流程首次成为可观察、可执行的 Agent 环境。本文拆解 Chip Agent 的流程编排、诊断与研究角色，并附所有 Open EDA 工具官方链接。"
tags: [eda, chip-agents, llm, open-source, openroad, yosys, librelane]
---

过去几年，[Yosys](https://yosyshq.net/yosys/)、[OpenROAD](https://github.com/The-OpenROAD-Project/OpenROAD)、[LibreLane](https://github.com/librelane/librelane)、[KLayout](https://www.klayout.de/) 等开源工具逐渐打通了从 RTL 到 GDSII 的数字芯片实现流程。这带来的意义不只是"可以免费做芯片"，更重要的是：芯片设计第一次成为一个可观察、可执行、可反复试验的 Agent 环境。

在这个环境中，大语言模型不必直接替代综合、布局布线或签核算法，而可以充当流程编排者、设计分析助手和自动研究员。

## 从 EDA 自动化到 Chip Agent

传统 RTL→GDS 流程可以抽象为：

```
RTL
→ 综合
→ Floorplan
→ Placement
→ CTS
→ Routing
→ 寄生提取
→ STA / DRC / LVS
→ GDSII
```

真正困难的往往不是运行某个工具，而是：

- 根据设计目标选择工具和参数；
- 理解数百条 warning、error 与 QoR 报告；
- 判断问题来自 RTL、SDC、PDN、floorplan 还是 routing；
- 在面积、频率、功耗、拥塞和运行时间之间权衡；
- 设计下一组实验，并总结哪些策略有效。

这些工作具有明显的规划、诊断和研究属性，正是 LLM Agent 可以发挥价值的地方。

## 为什么选择 Open EDA

训练 Chip Agents 需要大量真实工具交互。商业 EDA 通常受到许可证、PDK NDA、并发数量和数据使用范围限制，很难构建大规模、可公开复现的训练环境。

Open EDA 则提供了较完整的实验栈：

- **Yosys + ABC**：逻辑综合与技术映射；
- **OpenROAD**：Floorplan、PDN、Placement、CTS 和 Routing；
- **OpenSTA / OpenRCX / PDNSim**：时序、寄生与静态 IR 分析；
- **KLayout / Magic / Netgen**：GDS、DRC 和 LVS；
- **SKY130、GF180MCU、IHP SG13G2**：面向真实工艺的开放 PDK；
- **Nangate45、ASAP7**：适合快速实验和先进节点研究的学术平台。

这些工具能够产生网表、DEF、ODB、GDS、SPEF、时序报告、拥塞图和 DRC marker，为 Agent 提供来自真实设计流程的反馈。

## LibreLane：适合 Agent 的流程基础设施

[LibreLane](https://github.com/librelane/librelane) 是 [OpenLane 2](https://github.com/efabless/openlane2) 的社区后继项目。它并不重新实现综合或布局布线算法，而是把 Yosys、OpenROAD、Magic、KLayout 和 Netgen 组织成可复现的 Python 工作流。

它的核心模型非常适合 Chip Agents：

```
Stateₙ₊₁ = Step(Configuration, Stateₙ)
```

每个 Step 接收配置和设计状态，产生新的状态。State 中记录当前有效的网表、SDC、ODB、DEF、GDS、SPEF 以及累计指标。

这意味着 Agent 可以获得清晰的交互闭环：

```
Observe
读取 State、日志、metrics 和版图报告

Plan
判断瓶颈并设计下一次实验

Act
修改配置、SDC、RTL 或流程步骤

Run
从已有 checkpoint 继续运行

Reward
根据功能、时序、DRC/LVS 和 PPA 评分
```

与直接开放一个无限制终端相比，这种 Step/State 模型更容易控制动作范围、追踪因果关系，并生成可复现的训练轨迹。

## LLM 可以承担哪些角色

### 1. 流程编排

LLM 可以根据设计目标选择执行路径，例如：

- 先运行综合和早期 STA；
- 时序失败时调整综合策略或约束；
- 拥塞严重时回到 floorplan 或 placement；
- routing 后只重新执行 RC extraction 与 STA；
- 根据失败阶段决定是否需要完整重跑。

它的价值是选择"下一步做什么"，而不是取代底层 EDA 算法。

### 2. 自动诊断与设计洞察

Chip Agent 可以同时分析：

- Yosys 综合统计；
- WNS、TNS、关键路径；
- cell utilization 与面积；
- placement density 与 routing overflow；
- 高扇出、slew、capacitance 违规；
- DRC、antenna 和 LVS 报告；
- 功耗与 IR-drop 热点。

LLM 可以把分散的工具输出转化为设计洞察，例如：

> 当前问题主要不是标准单元速度不足，而是宏单元之间的狭窄通道造成 routing detour，使关键网络寄生显著上升。建议先扩大通道或调整宏布局，而不是继续插入 buffer。

这类跨阶段归因是 Chip Agent 很有价值的能力。

### 3. 自动研究

更进一步，Agent 可以承担"小型 EDA 研究员"的角色：

1. 提出假设；
2. 选择实验变量；
3. 批量运行候选配置；
4. 汇总 PPA、拥塞和运行时间；
5. 分析结果；
6. 形成新的实验计划。

例如研究 placement density 对 SKY130 中 Ibex 的影响：

```
假设：
较低 density 会减少拥塞，但可能增加线长和时序延迟。

实验：
density = 45%、50%、55%、60%、65%

观测：
WNS、TNS、HPWL、overflow、DRC、面积、runtime

结论：
在当前 floorplan 下，55% 附近形成最优折中。
```

这已经超越简单参数搜索，开始接近自动化设计空间探索与经验积累。

## 推荐的实验架构

```
用户目标
   ↓
LLM Planner
   ↓
受控工具接口
   ↓
LibreLane / ORFS
   ↓
Yosys · OpenROAD · KLayout · Magic · Netgen
   ↓
State · Metrics · Logs · Layout Images
   ↓
Insight Generator + Experiment Memory
   └──────────────────────────────→ LLM Planner
```

其中：

- LibreLane 适合 Step/State 管理、故障恢复和流程定制；
- [ORFS](https://github.com/The-OpenROAD-Project/OpenROAD-flow-scripts) 适合作为 OpenROAD QoR 基准和自动调参基线；
- [OpenROAD Python/OpenDB](https://github.com/The-OpenROAD-Project/OpenDB) 适合细粒度物理设计 Agent；
- LLM 负责规划、诊断、解释和实验设计；
- Bayesian optimization、遗传算法或 RL 可以负责连续参数搜索。

LLM 与数值优化算法不应互相替代。更合理的组合是：LLM 决定研究方向和动作类别，优化器搜索具体参数。

## 如何设计奖励

Chip Agent 不能只优化单一 PPA 分数，否则很容易通过放松时钟、扩大 die 或跳过检查来获得虚假提升。

更安全的评价方式是分层门禁：

```
功能仿真通过
→ 综合前后等价
→ Placement/Routing 成功
→ DRC = 0
→ LVS Clean
→ Setup/Hold 满足要求
→ 在有效设计之间比较 PPA 与运行时间
```

只有通过正确性和可制造性检查的结果，才能进入 QoR 比较。

## 从哪里开始

第一阶段不必挑战复杂 SoC。可以采用：

- LibreLane 或 ORFS 固定版本容器；
- Nangate45 + SKY130HD；
- GCD、AES、UART、Ibex 等中小型设计；
- 受控配置动作，而不是无限制 shell；
- ORFS 默认结果和 AutoTuner 作为基线。

首批任务可以集中在：

- EDA 日志分类；
- 人工注入故障的自动修复；
- SDC 检查与时序诊断；
- Placement、CTS 和 Routing 参数优化；
- 根据多阶段报告生成设计洞察；
- 自动设计并执行下一组实验。

随后再扩展到 GF180、ASAP7、宏单元、SRAM、Padframe 和跨 PDK 泛化。

## 边界与机会

Open EDA 已足以支持 Chip Agents 的流程编排、故障诊断、设计空间探索和 PPA 优化研究，但开放流程生成的 GDS 仍不能自动等同于晶圆厂生产签核。

MMMC、SI、动态 IR、EM、DFM、ESD、工业 DFT 和复杂 IP 等领域仍存在明显缺口。因此，Chip Agent 的合理定位不是"全自动替代芯片工程师"，而是：

> 在真实 EDA 闭环中执行实验、提供洞察、积累经验，并帮助工程师更快找到值得尝试的方向。

Open EDA 提供了可执行的实验世界，LLM 提供了规划、语言理解和知识归纳能力。二者结合，使我们第一次有机会构建能够读懂设计、操作工具、验证假设并持续学习的 Chip Agents。

## 附录：文中 Open EDA 工具官方链接

**综合与实现**

- **Yosys**（RTL 综合）：<https://yosyshq.net/yosys/> · 仓库 <https://github.com/YosysHQ/yosys>
- **ABC**（逻辑综合/技术映射）：<https://github.com/berkeley-abc/abc>
- **OpenROAD**（Floorplan/PDN/Placement/CTS/Routing）：<https://github.com/The-OpenROAD-Project/OpenROAD>
- **LibreLane**（OpenLane 2 社区后继，Python 流程基础设施）：<https://github.com/librelane/librelane>
- **OpenLane 2**（原版流程，efabless）：<https://github.com/efabless/openlane2>

**签核与物理验证**

- **OpenSTA**（静态时序分析）：<https://github.com/The-OpenROAD-Project/OpenSTA>
- **OpenRCX**（寄生提取）：<https://github.com/The-OpenROAD-Project/OpenRCX>
- **PDNSim**（静态 IR 分析，OpenROAD 内模块）：<https://github.com/The-OpenROAD-Project/OpenROAD/tree/master/src/psm>
- **KLayout**（GDS 查看/编辑）：<https://www.klayout.de/> · 仓库 <https://github.com/KLayout/klayout>
- **Magic**（版图编辑器/提取）：<https://github.com/RTimothyEdwards/magic>
- **Netgen**（LVS）：<https://github.com/RTimothyEdwards/netgen>

**PDK 与平台**

- **SKY130**（Google/SkyWater 开放 PDK）：<https://github.com/google/skywater-pdk>
- **GF180MCU**（GlobalFoundries 180nm PDK）：<https://gf180mcu-pdk.readthedocs.io/en/latest/>
- **IHP SG13G2**（IHP 130nm 开放 PDK）：<https://github.com/IHP-GmbH/IHP-Open-PDK>
- **Nangate45**（学术 45nm 平台，ORFS 集成）：<https://github.com/The-OpenROAD-Project/OpenROAD-flow-scripts/tree/master/flow/platforms/nangate45>
- **ASAP7**（ASU 7nm 预测性 PDK，ORFS 集成）：<https://github.com/The-OpenROAD-Project/OpenROAD-flow-scripts/tree/master/flow/platforms/asap7>

**流程与数据基础设施**

- **ORFS**（OpenROAD Flow Scripts，QoR 基准与 AutoTuner）：<https://github.com/The-OpenROAD-Project/OpenROAD-flow-scripts>
- **OpenDB**（版图数据库，Python API）：<https://github.com/The-OpenROAD-Project/OpenDB>

— Youmoo（㕛木）
*Solid as teak.*
