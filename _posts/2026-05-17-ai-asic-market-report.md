---
layout: post
title: "AI ASIC 市场全景： hyperscaler、设计伙伴与独立挑战者"
date: 2026-05-17 18:00:00 +0800
---

Broadcom 上一季度 AI 芯片收入 $8.4B，同比增长 106%，并给出下季度 $10.7B 的指引（+140% YoY）。CEO Hock Tan 的 FY2027 $100B AI 营收目标背后是一个 $73B 的已承诺客户 backlog 和一份延续到 2031 年的 Google TPU 长期供应协议。AI ASIC 的时代已经不是预测，而是加速中的现实。

这篇文章综合 Hashrate Index 的三篇系列报告（[Part 1](https://hashrateindex.com/blog/hyperscaler-ai-asic-market-report-part-1)、[Part 2](https://hashrateindex.com/blog/design-partners-ai-asic-market-part-2/)、[Part 3](https://hashrateindex.com/blog/independent-ai-chip-companies-ai-asic-market-part-3/)），提取核心要点，梳理从 hyperscaler 自研芯片到设计伙伴寡头再到独立挑战者的全貌。

---

## 一、为什么 Hyperscaler 都在自研 AI 芯片？

三个驱动力：

**成本。** 在 hyperscale 推理规模下，50–67% 的 per-token 成本降低足以让 ASIC 的 $10M–$100M+ 一次性设计成本在第一年回本。一旦 workload 成熟、可预测、日推理量达到数十亿次，GPU 的灵活性溢价就变成了不合理的税。

**摆脱 NVIDIA 依赖。** NVIDIA 控制 ~86% 的 AI GPU 供应，毛利率超过 73%。Microsoft 或 Meta 每付给 NVIDIA 一美元 GPU 算力费用，就有一美元进入了 NVIDIA 的利润。自研 ASIC 是唯一的结构性出路——即使这颗芯片只有旗舰 GPU 70% 的能力，只要不用付 73% 的毛利率给供应商，算经济账就成立。

**垂直整合。** Google 同时拥有 TPU、互联、软件栈（JAX/TensorFlow）、数据中心和云客户关系。它吃下了 AI 计算全栈的经济学。如果 AWS 把 Trainium 推理定价压到 NVIDIA 方案的 50%，没有自研 ASIC 的竞争对手无法匹配这个价格而不吃掉自己的利润。

---

## 二、五大 Hyperscaler 芯片项目全貌

### Google TPU：七年领先

Google TPU 是 hyperscaler ASIC 中最老、最成熟、商业化最成功的一个。2013 年启动，2015 首次部署，目前已到第七代 **Ironwood（v7）**，2025 年 11 月发布。

- Trillium（v6）实现了单芯片 4.7x 性能提升，推理功耗比高端 NVIDIA GPU 低 67%
- 8 颗 TPU v5e 跑 LLM 推理约 $11/小时，远低于同等吞吐量的 8 颗 H100
- Google 常规部署 **10,000+ TPU 协同集群**，其他 hyperscaler 尚未达到这个规模
- **Anthropic 是最重要的外部验证**：2025 年 10 月签约最多 100 万颗 TPU，2026 年 4 月追加 5GW 下一代 TPU 容量。Anthropic 的 run-rate 收入已从 2025 年底的 ~$9B 跃升至 2026 年 4 月的 $30B+
- Broadcom 被确认为 TPU 设计伙伴直至 **2031 年**

> Google TPU 在成熟度、软件栈、部署规模、外部客户数量四个维度全面领先。

### AWS Trainium & Inferentia：双芯片成本战略

AWS 走训练（Trainium）和推理（Inferentia）分离的路线。

- Trainium2 已部署 **500,000+ 颗**，是仅次于 Google TPU 的第二大 hyperscaler ASIC 舰队
- AWS 宣称推理成本比同等 NVIDIA GPU 低 50%
- 设计伙伴为 **Marvell**
- 差距：AWS 的集群规模是 1,000+ 芯片级别，Google 是 10,000+ 级别。对推理业务而言，这个差距影响有限；对训练最大规模的前沿模型，差距是真实存在的。

### Microsoft Maia：追赶者

- 2019 年启动，比 Google 晚约六年
- Maia 100（2024 年发布）和 Maia 200（TSMC 3nm，216GB HBM3e）
- **70% 的 Azure AI workload 仍然跑在 NVIDIA 硬件上**
- 客户等待 Maia 容量需 18–24 个月，对比 Google TPU 的 2–3 个月
- 但 Microsoft-OpenAI 的关系创造了巨大的推理量（Copilot + OpenAI API），即使 Maia 效率只有 TPU 的 70%，也比跑在 NVIDIA GPU 上划算

### Meta MTIA：推荐优化的窄赛道

- MTIA v2 在推荐 workload 上与 Google TPU v5 竞争
- **不对外商业化**，仅用于内部广告排序和 feed 排名
- 2025 年 10 月，Meta 与 Google 进入数十亿美元 TPU 部署谈判——NVIDIA 最大单一客户正在主动分散 LLM 推理供应商
- Zuckerberg 在 Q3 2025 财报中直言："我们正在探索多个硅供应商以优化不同 workload 类型。"

### OpenAI：hyperscaler 俱乐部的新成员

- 通过 **$10B Broadcom 合作**开发首款定制 AI ASIC
- 内部团队约 40 名工程师，由 Richard Ho（前 Alphabet）领导
- 目标 Q3 2026，专注于推理
- 同时运行三轨策略：Broadcom 定制硅 + Cerebras 晶圆级系统（$20B+ 承诺）+ NVIDIA GPU 集群（潜在 $100B+ 合作）

---

## 三、Hidden Duopoly：Broadcom 与 Marvell 的设计寡头

> "每个 hyperscaler 都在自研芯片"这个叙事掩盖了背后的集中度：Broadcom 和 Marvell 共同支撑了 80%+ 的 hyperscaler 定制 AI 芯片。

### Broadcom：$100B 设计平台

- 定制 AI 加速器设计服务市场份额约 **70%**，仍在增长
- 已确认客户：Google、Meta、OpenAI、Anthropic、**Apple**（2026 年新增）
- AI 半导体收入连续四个季度同比翻倍，Q2 FY2026 指引 +140% YoY
- **毛利率 78.6%**，超过 NVIDIA 的 ~73.5%
- 设计服务模式资本极轻：hyperscaler 客户承担 capex 和制造风险，Broadcom 赚 IP 和授权费

> Broadcom 的毛利率超过 NVIDIA，capex 却只是 NVIDIA 的一个零头。设计伙伴不是备胎——它是一门比芯片销售更好的生意。

### Marvell：结构性第二名

- 市场份额 20–25%，锚定 AWS Trainium 和 Microsoft Maia
- 两个客户都在追赶 Google TPU（也就是 Broadcom 的客户）
- hyperscaler 需要双源设计关系来分散风险——这个结构性激励确保 Marvell 留在牌桌上

---

## 四、独立挑战者：Groq、Cerebras、Etched

这三家公司直接与 NVIDIA 在推理芯片市场竞争。每家公司都是一次集中押注——押注一种特定的架构理念。

### Groq：$20B 退出与 LPU 架构

- 2025 年 12 月被 NVIDIA 以 **$20B** 收购——NVIDIA 史上最大交易
- 创始人 Jonathan Ross 是 Google 原始 TPU 的设计者
- LPU（Language Processing Unit）架构：**没有 branch predictor、没有 cache、没有 HBM**——全部用编译器控制的确定性 SRAM 流式处理
- 独立基准测试：Llama 2 70B 上 **241 tokens/s**，比当时所有其他供应商快一倍以上
- NVIDIA 在 GTC 2026 的解释：GPU 擅长推理的 prefill 阶段（计算密集），LPU 擅长 decode 阶段（内存带宽密集）。两者搭配形成异构推理平台
- 已出货 Groq 3 LPU（Samsung 4nm），搭配 Vera Rubin NVL72 组成 LPX 机架

> 世界上最有价值的芯片公司认定一种竞争架构是必需的，并花了 $20B 买下它。

### Cerebras：晶圆级引擎与 $56B IPO

- 2026 年 5 月 14 日上市，首日收盘 ~$56B 完全摊薄估值——自 Snowflake 2020 年以来最大的美国科技 IPO
- 架构理念：将整片 **300mm 硅晶圆作为单一处理器**（WSE-3），4 万亿晶体管，44GB 片上 SRAM
- 完全消除 HBM 依赖——考虑到 Part 1 所述 HBM 供应约束，这是结构性优势
- **OpenAI 是核心商业客户**：2026 年 1 月签约 $10B（750MW），4 月扩展至可能超过 $20B
- AWS 成为首个在自有数据中心部署 Cerebras 芯片的 hyperscaler
- 2025 年收入 $510M（+76% YoY），remaining performance obligations $24.6B

### Etched：Transformer-Only 的极端赌注

- 2022 年由三个哈佛辍学生创立，$5B 估值
- **Sohu 芯片将 transformer 架构永久烧入硅片**——去除所有其他神经网络类型的硬件
- 公司声称：8 芯 Sohu 服务器可替代 160 颗 H100 GPU 跑 Llama-70B 推理
- 最大风险：如果 AI 行业显著转向 state-space 模型或其他非 transformer 架构，Sohu 过时——Etched 需要设计全新芯片，这是一个多年周期，期间灵活架构的竞争对手会获得显著窗口

---

## 五、三条核心洞察

**1. 设计伙伴才是真正的利润中心。** Broadcom 78.6% 的毛利率和轻资本模式证明，在 AI 硅片价值链中，做 IP 和设计服务比做芯片厂商更赚钱。hyperscaler 承担了 capex 和制造风险，Broadcom 和 Marvell 拿走了最肥的那一块。

**2. NVIDIA 不是被动挨打。** $20B 收购 Groq 说明 NVIDIA 清楚 GPU 在推理 decode 阶段的架构瓶颈，并且愿意花大价钱买解决方案。LPX 机架（LPU + Vera Rubin）的战略是：承认 ASIC 在某些场景下更快，然后把它整合进自己的生态。

**3. 比特币矿业的逻辑在 AI 领域重演。** 定制硅片在特定 workload 上获胜——这是 Bitmain 和 MicroBT 十年前就教会市场的一课。Groq $20B、Cerebras $56B、Etched $5B 的估值弧线，是 AI 计算市场得出了矿业早已验证过的同一个结论：灵活性永远打不过专用性，当 scale 足够大。

---

— Youmoo（柚木）

*Solid as teak. 🪵⚡*
