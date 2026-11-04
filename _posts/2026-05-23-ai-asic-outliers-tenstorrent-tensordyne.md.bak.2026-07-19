---
layout: post
title: "AI ASIC 市场的「异类」：Tenstorrent 与 Tensordyne 的非对称战争"
date: 2026-05-23 18:00:00 +0800
---

Hashrate Index 的 AI ASIC 系列出到了第四篇。前三篇分别梳理了 Broadcom/Marvell 这类「设计赋能者」和 Groq/Cerebras/Etched 这类「NVIDIA 正面挑战者」。第四篇的标题很有意思——用了 *Architectural Outliers*（架构异类）这个词。Tenstorrent 和 Tensordyne 的确不是 NVIDIA 的正面竞争者，但各自在完全不同的维度上下了重注。

## 一张图看懂五家独立 AI 芯片公司

Hashrate Index 的 2×2 矩阵把五家公司按**架构激进程度**和**商业成熟度**两个轴排开：

- **激进 × 已验证**：Groq（被 NVIDIA 收购）、Cerebras（Wafer-Scale，2026 年 5 月 IPO 目标）、Etched（Transformer 硬编码，$5B 估值）
- **激进 × 未验证**：Tensordyne（对数数系，尚在仿真阶段）
- **保守 × 已验证**：Tenstorrent（RISC-V，$150M 签约合同）

有意思的是，最容易获得市场关注的公司在左上角——高估值、大额收购、IPO 目标。但五家公司中有两家不在那里，而它们的战略逻辑恰恰值得单独理解。

## Tenstorrent：用开源 IP 绕过 HBM 战争

如果只看芯片，Tenstorrent 是五家公司里最「不激进」的——RISC-V 核加 Tensix AI 加速器，GDDR6 显存而不是 HBM，三星代工而不是 TSMC 一家独供。但它的激进在别处：**商业模式上它是唯一一家以开源 IP 授权为核心的公司**，而不是靠卖成品芯片。

### Jim Keller 的牌

Jim Keller 的履历不需要多介绍——DEC Alpha、AMD K7/K8/Zen、Apple A4/A5、Tesla FSD、Intel SVP。他带到 Tenstorrent 的，不只是芯片设计能力，更是一种对半导体供应链的结构性判断。

Keller 公开说过一个观点：「和 NVIDIA 在 HBM 上竞争是结构性的劣势——NVIDIA 采购最多 HBM，有最大的成本优势和最深的供应关系。」所以 Tenstorrent 选择了 GDDR6 + 片上 SRAM（Blitz Mode），故意绕开 HBM 瓶颈。这个策略在训练市场上行不通，但 Tenstorrent 的目标本来就不是前沿训练。

### 产品矩阵

**Blackhole 芯片**（已出货）：
- 120 Tensix 核，32GB GDDR6，300W TDP
- 16 颗大 RISC-V 核（非 ARM）
- Blitz Mode：片上 SRAM 直通，消除 HBM 往返延迟
- QSFP-DD 800G 互联

**Galaxy 系统**（2026 年 5 月 TT-Deploy 活动后批量出货）：
- 32 芯片/Galaxy，4 Galaxy/Quad，多 Quad 级联成超算集群
- 纯以太网 Mesh 拓扑——不需要交换机，芯片直连芯片
- 宣称 DeepSeek-R1-0528 671B 推理吞吐 350+ t/s/u
- 视频生成（Wan 2.2 A14B）比 GPU 快 10 倍

**TT-Ascalon RISC-V CPU**：
- 64 位乱序超标量，RVA23 兼容
- 开源 BOOM/Ocelot 组件
- **IP 授权模式**：Tenstorrent 授权 RTL 源码——不是黑盒 IP，而是可以修改的电路描述。这比 ARM 的授权模式灵活一个数量级。

### 客户和商业化

- **LG 电子**（$150M 合同）：AI SoC 用于智能家居和视频处理
- **现代/起亚**：车载 AI 协处理器
- **三星**：既是投资方也是代工厂
- **Razer**：CES 2026 展示紧凑型 AI 加速器
- **Infinia Technologies**：主权 AI 基础设施
- 估值：**$32 亿**（2024 年 12 月 D 轮，比 D 轮前翻倍）
- Jeff Bezos + 三星联合投资超 $7 亿

Tenstorrent 的商业逻辑很清晰：**切那些超大规模云厂商不做的市场**——边缘 AI、汽车、中型企业，以及开放 IP 授权本身。这些市场不直接和 hyperscaler 内部 ASIC 竞争，但作为一个独立芯片公司的生存空间足够大。

## Tensordyne：对数域的豪赌

Tensordyne 是五家公司里最极端的存在。它的架构赌注在芯片行业属于「要么颠覆一切，要么零」的级别。

### Pareto 数系（对数计算）

核心观察：矩阵乘法——神经网络最主要运算——在对数域上退化为加法。log(a × b) = log(a) + log(b)。加法器电路比乘法器小得多、功耗低得多。释放的芯片面积用来堆更多 SRAM 缓存（Tensordyne 宣称是 GPU 的 6 倍）。

但代价是：加法本身在对数域会变复杂。Tensordyne 用的是专有的近似算法，精度宣称 99.9% 以上。

### 宣称的性能数字

全部基于仿真，硅片尚未验证：

- **每 token 功耗 = NVIDIA GB200 NVL72 的 1/8**
- **每 token Capex = 竞品的 1/3**
- 单机架 3M tokens/s，$0.02–0.05/1M tokens
- 风冷运行——不需要液冷基础设施
- HBM3e 内存，any-to-any 互联

如果这些数字在硅片上成立，这将是 AI 推理经济学的阶跃函数变化。问题在那个「如果」上。

### 风险剖面

这家公司原名 Recogni，2017 年成立，最初做汽车边缘推理。2025 年 9 月改名 Tensordyne，全面转向数据中心推理，同时拿到了 IDCA G2 认证（企业 AI 平台运营就绪）。至今**仍处于 pre-silicon 阶段**。

- CEO Marc Bolitho 在 2025 年底表示 tape-out「即将进行」，硬件目标 2026 年年中
- 声称超大规模云和 neo-cloud 公司「排队等待」beta 测试
- **没有任何公开确认的署名客户**

对数数系架构在学术界研究了数十年，从未被数据中心芯片采用。Tensordyne 面临的不仅是技术风险，还有商业信任问题——beta 测试兴趣不等于采购订单。

但话说回来：8 倍能效优势如果成立，对受电力限制的数据中心来说是决定性的。特别对那些比特币矿场想转型 AI/HPC 的运营商——Tensordyne 的风冷 + 低功耗特征恰好匹配存量矿场基础设施。

## 两家的共同点：避开 HBM 军备竞赛

Tenstorrent 用 GDDR6，Tensordyne 虽用 HBM3e 但宣称需要更少模块。Groq 纯 SRAM，Cerebras 晶圆级 SRAM。五家独立 AI 芯片公司中，**没有一家押注 HBM 竞争**——这本身就说明问题。

HBM 由 SK 海力士、三星、美光三家垄断，NVIDIA 吃掉大部分产能。任何独立芯片公司想在 HBM 上正面竞争，都是在用别人的供应链打别人的战争。这不是技术问题，是经济学问题。

## 行业启示

Tenstorrent 和 Tensordyne 代表了独立 AI 芯片公司的两种生存策略：

1. **差异化市场**（Tenstorrent）——不争数据中心顶峰，争边缘、汽车、企业中间层。用开源 IP 建立生态位。
2. **差异化架构**（Tensordyne）——不争现有架构优化，争全新数系的跃迁。一步到位的技术赌注。

Hashrate Index 系列的 Part 5 将给出综合判断：NVIDIA 对这些独立挑战者群体的战略回应，以及整个投资格局的结构性结论。拭目以待。

---

㕛木 Youmoo
