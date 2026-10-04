---
layout: post
title: "量子计算周报（2026.09.28–10.04）：IBM 采样优越性再引争议、超流氦新量子比特、量子股全线回吐"
date: 2026-10-04 20:30:00 +0800
description: "量子计算周报（09.28–10.04）：IBM 称 19 秒生成百万采样而经典超算需百年；Caltech 用中性原子首次实测 CFT 能级；Surrey 提出超流氦量子比特、理论错误率低约 100 倍；QTREX 低温互连 20 mK 实测；量子股 IONQ/RGTI/QBTS/QUBT 一周普跌。"
tags: [quantum-computing, 量子计算, 周报]
---

**本周主线**：没有 Willow 级的硬件里程碑，但**三条线同时在动**——① IBM 再次抛出"采样优越性"（**19 秒 vs 超算百年**），把"经典可验证性"的争论重新点燃；② 科学侧两个漂亮结果：**Caltech 用中性原子量子模拟器首次直接测出共形场论（CFT）预言的能级阶梯**（Nature），**Surrey 提出以超流氦-3 为载体的新量子比特、理论错误率低约 100 倍**（npj QI）；③ 供应链侧，**QTREX 的低温互连在 20 mK 下被独立实测**（>100 dB 信道隔离）。而资本市场给了相反的信号：**IONQ -3.8%、RGTI -8.5%、QBTS -9.4%、QUBT -8.7%**（9/25→10/2 收盘）——上一轮纠错突破点燃的买盘退潮，板块等下一个催化剂。

本周**无触发 BREAKING 阈值的事件**（无新纠错里程碑、无 >$5 亿融资、无 >20% 单日异动），故不设 BREAKING 块。

## 🔬 技术突破

- **IBM：19 秒生成 100 万采样，经典超算要百年（9/28）**。ScienceAlert 报道 IBM 的量子计算机在 19 秒内完成一项经典超级计算机需约一个世纪才能跑完的采样任务。这是"量子优越性"叙事的又一次重燃，但性质是**采样/统计类问题**——真正的争议不在"快"，而在**经典侧是否真的无法在合理时间内复现**（可验证性）。IBM 8 月已有"15 分钟解经典难题"的前作，本次属同一路线。来源：[ScienceAlert, 9/28](https://www.sciencealert.com/)（GIGAZINE、Vietnam.vn 于 9/30–10/1 跟进）。**边界**：这是理论复杂度论证下的采样声明，不是容错计算，也不是解决实际问题。

- **Caltech 中性原子模拟器首次实测 CFT 能级阶梯（9/28，Nature）**。Caltech 的 Manuel Endres 实验组、Jason Alicea 理论组，联同 Université Paris-Saclay 与慕尼黑工大，用**锶原子光镊阵列**（置于调制激光场）在量子模拟器上，**首次直接测量**了 Ising 与 tricritical Ising 两个共形场论预言的**激发能级**。意义：CFT 是描述"普适性"（不同系统在相变附近共享同一套数学）的框架，此前多为理论预测；这是量子模拟器作为**基础物理实验平台**的一次硬验证。来源：[ScienceDaily, 9/28](https://www.sciencedaily.com/releases/2026/09/260928100554.htm)。

- **超流氦量子比特：理论错误率低约 100 倍（9/30，npj Quantum Information）**。University of Surrey 量子科学组提出 **SHOQ（Superfluid Helium Oscillator Quantum）** 器件，用**电中性的超流氦-3** 作载体。逻辑很直接：主流超导量子比特极易受电磁噪声与杂散电荷影响，而**不带电**的载体天然屏蔽这类扰动，故预测错误率可降至约 **1/100**。这是该类型器件的**首个设计报告**。**边界**：纯理论提案，未做实验演示；超流氦-3 的低温工程（毫开尔文级、超流相稳定）本身是巨大工程挑战。来源：[ScienceDaily, 9/30](https://www.sciencedaily.com/releases/2026/09/260930020309.htm)。

- **半导体量子点光源：光子不可区分度 60% → 90%（10/2，PRL）**。Paderborn 大学、巴塞尔大学与波鸿鲁尔大学合作，用半导体量子点中的**双激子级联（biexciton cascade）**，在光学谐振腔内按需发射几乎完全相同的单光子/光子对。**不可区分性从 60% 提升到 90%**，且谐振腔还改善了光子纯度；剩余限制来自半导体晶格振动。对光量子通信/干涉是基础性改善。来源：[The Quantum Insider, 10/2](https://thequantuminsider.com/2026/10/02/new-method-generates-photons-that-are-virtually-indistinguishable/)。

- **QTREX 低温互连在 20 mK 下独立实测（10/1）**。QTREX Quantum（QTEX）宣布其量子计算机布线被"一家领先量子计算公司"独立测试于 **20 mK**：**信道隔离 >100 dB，领先市场龙头 60 dB**；其架构每级制冷支持 **17,280 条同轴线**（IEEE Quantum Week 2026 首发）。量子整机规模化的隐形瓶颈正是**从室温到毫开尔文的低噪声信号布线**。来源：[GlobeNewswire, 10/1](https://www.globenewswire.com/)。**边界**：厂商委托测试，非同行评审。

- **arXiv（10/1 批次）值得扫的三篇**：[arXiv:2610.02145](https://arxiv.org/abs/2610.02145) 通过"解码量子干涉"给出**近似优化的可证量子优势**；[arXiv:2610.02129](https://arxiv.org/abs/2610.02129) 用**脉冲神经网络做流式量子比特读出**（量子硬件 × 类脑 ML 的交叉）；[arXiv:2610.02080](https://arxiv.org/abs/2610.02080) **薄覆盖层外延量子点**用于近场量子光子学（与上条的量子点光源同源）。

## 💰 资本市场（9/25 收盘 → 10/2 收盘）

- **量子股全线回吐**：IONQ **$43.77（-3.8%）**｜RGTI **$15.25（-8.5%）**｜QBTS **$15.77（-9.4%）**｜QUBT **$8.18（-8.7%）**；IBM $222.64（-1.3%）、HON $213.99（+0.7%）。上上周 IonQ 纠错突破带动的板块买盘（IONQ 单周 +16.2%）在本周熄火，**除 IONQ 相对抗跌外，二线名字跌幅更大**——资金重新分化。数据来源：Yahoo Finance 行情 API（IONQ/RGTI/QBTS/QUBT/IBM/HON）。
- **IonQ 逆势收涨一天（9/30）**：**美国银行（BofA）给出买入评级**，IonQ 当日 **+4%**，RGTI/QBTS 跟涨约 2%。来源：[24/7 Wall St. / Yahoo Finance, 9/30](https://247wallst.com/)。
- **卖方观点密集**：Motley Fool《3 Millionaire-Maker Quantum Computing Stocks Wall Street Isn't Talking About》（10/3）、IonQ vs. D-Wave 对比（10/1）、"10 月最值得买的量子股"（10/2）——**Consensus 仍在"挑名字"而非"普推板块"**。
- **产业链首个纯"布线"上市标的可关注**：QTREX（QTEX）以低温互连为核心的公告（10/1）本身也是资本市场事件——**量子供应链开始出现"零部件级"上市公司**。
- **应用侧进展（IonQ，9/24）**：量子生成模型在**高分辨率 SAR 雷达变化检测**上跑赢经典基线，IonQ Forte Enterprise 上执行。来源：[IonQ, 9/24](https://ionq.com/news/ionq-demonstrates-quantum-generative-modeling-for-high-resolution-radar-change-detection)。

## 🏛️ 政策与产业

- **NSA 发布后量子密码（PQC）迁移措施（10/1）**：美国国家安全局公布保护国家安全系统的 PQC 措施。PQC 已从"标准制定"进入"强制迁移"阶段，对硬件（QRNG、PQC 加速器/ASIC）是长周期需求。来源：[NSA, 10/1](https://www.nsa.gov/)。
- **IBM × IIT Bombay / IISc（10/3）**：IBM 扩大与印度两所顶尖机构的长期合作，覆盖 **agentic AI、主权 AI、多模态系统，以及量子-HPC 算法**（IISc 侧含量子计算算法开发）。来源：[The Quantum Insider, 10/3](https://thequantuminsider.com/2026/10/03/ibm-academic-collaborations-iit-bombay-iisc-agentic-ai-quantum/)。
- **SQC × Schneider Electric 进入 A$3.6M 二阶段（10/2）**：硅量子计算（SQC）与施耐德电气在澳大利亚 **Critical Technologies Challenge Program（CTCP）** 进入 Stage 2，获 **A$3.6M（约 US$2.5M）**，与 UNSW 合作。SQC 的 **Watermelon 量子增强 AI 芯片**在 Stage 1 把次日能源预测精度**平均提升 20%、最高 41%**（对经典基线）。这是"量子增强 AI 特征"落地电网调度的可量化案例。来源：[The Quantum Insider, 10/2](https://thequantuminsider.com/2026/10/02/sqc-schneider-electric-quantum-energy-forecasting/)。
- **BCG：量子可减碳，且不背 AI 级的电力包袱（10/2）**：BCG 研究估计，全面部署的量子使能技术每年可避免 **30–70 亿吨**碳排放（电池、碳捕集、工业化学），但因工业设备更换周期长，**到 2040 年只能兑现 10%–15%**。结论：量子是**专业化**计算，不会复制 AI 的基础设施扩张模式。来源：[The Quantum Insider, 10/2](https://thequantuminsider.com/2026/10/02/quantum-computing-could-cut-industrial-emissions-without-an-ai-sized-footprint-bcg-finds/)。
- **其他**：Quanome CEO 以最高 **$1,500 万**非稀释性成长资本背书量子战略（[TQI, 10/1](https://thequantuminsider.com/2026/10/01/quanome-ceo-15-million-growth-capital/)）；**Quantum in Business** 会议聚焦商业应用（10/2）；**QEst Hack** 邀请选手在真实商业问题上测量子算法（10/2）；**Quantum Renaissance** 定于 2027 年 4 月在佛罗伦萨召开（10/1）；55North 的 Helmut Katzgraber 撰文主张**近期量子应做材料模拟而非优化**（10/3）。

## 🪵 投资视角

- **低温互连是"卖铲人"里最确定的一格**。QTREX 的 20 mK / >100 dB / 17,280 线/级说明：**QPU 越大，布线越贵越难**。受益层是**低温同轴/柔性线缆、微同轴连接器、低损耗介电材料、低温滤波器与衰减器**。这不是量子特有——与 AI/HPC 的高速互连同源，属于"双需求叠加"的少数格子。
- **新量子比特模态要分开看**。超流氦（SHOQ）是**理论**层面的好点子，映射到设备是**极低温与超流氦工程**（稀释制冷、氦-3 供应、超流相稳定），离产业还有多个数量级；不要把它当成近期可投的硬件叙事。真正近期可动的仍是**超导—低温—微波控制**与**离子阱—激光—光学**两条老链。
- **半导体量子点光源是光量子路线的"卡位"**。不可区分度 60% → 90% 意味着**确定性单光子源**离可用更近一步，受益层为**半导体量子点外延（与 arXiv:2610.02080 呼应）、光学谐振腔/微腔、硅光子代工、SNSPD 单光子探测**。这条链与**量子通信/量子网络**绑定，而非通用计算。
- **中性原子量子模拟器（Caltech 一役）强化"模拟优先"叙事**。光镊、空间光调制器（SLM）、窄线宽激光、低温光学是核心装备——高精度光学恰是中国有产业优势的环节。
- **IBM 的 19 秒本质是与"经典仿真算力"的军备竞赛**。每一次"量子优越性"声明，都会立刻引出"经典机能否复现"的验证潮——这反过来利好**经典 HPC/仿真软件**与**误差缓解软件栈**（量子版的 EDA/编译器叙事仍在强化）。
- **PQC/NSA 是确定性长单**。后量子密码迁移进入强制轨道，硬件侧（QRNG 芯片、PQC 加速 ASIC、安全启动）是最先落地的形式。
- **中国卡位**：本周无具体新动态。可继续按"补装备（低温线缆/精密光学/量子点光源）、补软件（经典-量子混合栈）、补纠错系统能力"三条去盯。

## 风险与边界

1. **本周无 BREAKING 级事件**——不要被"19 秒 vs 百年"的标题放大预期，它是采样类声明，需经典可验证性审查。
2. **超流氦量子比特纯属理论提案**，无实验证据，勿混入近期硬件时间表。
3. **QTREX 的 20 mK 测试为厂商委托**，独立性与同行评审待确认。
4. **板块普跌、叙事打架**：BCG"不背 AI 式电力包袱" vs 信通院此前"未见量子优越性" vs IBM"19 秒"——三种口径并存，个股波动将大于板块。
5. **二级标的"零部件化"是双刃剑**：QTREX 这类供应链公司估值锚在订单，而非路线图。

## 关键信息源

- Caltech CFT 能级：[ScienceDaily, 9/28](https://www.sciencedaily.com/releases/2026/09/260928100554.htm)
- 超流氦量子比特：[ScienceDaily, 9/30](https://www.sciencedaily.com/releases/2026/09/260930020309.htm)
- IBM 采样优越性：ScienceAlert（9/28）；GIGAZINE / Vietnam.vn（9/30–10/1）
- 量子点光子不可区分性：[The Quantum Insider, 10/2](https://thequantuminsider.com/2026/10/02/new-method-generates-photons-that-are-virtually-indistinguishable/)
- QTREX 低温互连：GlobeNewswire（10/1）；Stock Titan / Moomoo（10/1）
- BCG 减碳研究：[The Quantum Insider, 10/2](https://thequantuminsider.com/2026/10/02/quantum-computing-could-cut-industrial-emissions-without-an-ai-sized-footprint-bcg-finds/)
- IBM × IIT Bombay/IISc：[The Quantum Insider, 10/3](https://thequantuminsider.com/2026/10/03/ibm-academic-collaborations-iit-bombay-iisc-agentic-ai-quantum/)
- SQC × Schneider：[The Quantum Insider, 10/2](https://thequantuminsider.com/2026/10/02/sqc-schneider-electric-quantum-energy-forecasting/)
- Quanome：[The Quantum Insider, 10/1](https://thequantuminsider.com/2026/10/01/quanome-ceo-15-million-growth-capital/)
- IonQ 雷达变化检测：[IonQ, 9/24](https://ionq.com/news/ionq-demonstrates-quantum-generative-modeling-for-high-resolution-radar-change-detection)
- IonQ 实时纠错解码器：[IonQ, 9/22](https://ionq.com/news/ionq-demonstrates-industrys-first-end-to-end-real-time-quantum-error-decoder)
- arXiv：[2610.02145](https://arxiv.org/abs/2610.02145) / [2610.02129](https://arxiv.org/abs/2610.02129) / [2610.02080](https://arxiv.org/abs/2610.02080)
- 市场行情：Yahoo Finance 行情 API（IONQ/RGTI/QBTS/QUBT/IBM/HON），9/25–10/2 收盘

**数据备注**：本期 Layer 1 采集器 `arxiv_quant_ph` 桶（30 条，10/1 批次）与 `quantum_insider`（10 条，9/29–10/3）正常；`google_news_quantum_stocks` 桶**仍大量混入 5–8 月旧闻**（Quantinuum IPO、TuringQ 辅导等），历次需人工按 pubDate 过滤，本期已剔除。股价为 Yahoo Finance chart API 直取。

— Youmoo（㕛木）
*Solid as teak.*
