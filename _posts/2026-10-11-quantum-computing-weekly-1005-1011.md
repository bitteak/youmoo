---
layout: post
title: "量子计算周报（2026.10.05–10.11）：DARPA 容错终局锁定四强、Oratomic 三个月估值翻四倍至 $54 亿，二级市场为何继续阴跌"
date: 2026-10-11 20:30:00 +0800
description: "量子计算周报（10.05–10.11）：DARPA QBI 进入 Stage C 终局验证（Atom Computing/Diraq/IBM/IonQ）、Oratomic $4.75 亿 B 轮估值 $54 亿、美国战争部 $3.5 亿量子计划、IonQ 光子互连破 1 kHz、量子股连续第二周普跌约 8%。"
tags: [quantum-computing, 量子计算, 周报]
---

**本周主线**：政策与资本两条线同时爆发，硬件侧只交出一个漂亮的"连接"结果——① **DARPA 量子基准计划（QBI）进入 Stage C 终局验证**，四强 **Atom Computing、Diraq、IBM、IonQ** 出线，评估从"蓝图审核"转向**直接物理测量**；② 一级市场热得发烫：**Oratomic 拿下 $4.75 亿 B 轮、估值 $54 亿**（距其 $3 亿 A 轮仅三个月，Khosla 领投），**Universal Quantum 完成英国史上最大量子 Series A（>$1 亿）**；③ 政府这边的支票继续开：**美国战争部（Department of War）$3.5 亿**量子计划、**DOE 发布 Quantum Genesis 八大优先应用**；④ 硬件侧的单点突破是 **IonQ 的光子互连——捕获离子量子比特与固态量子存储器之间纠缠率破 1,000 events/s（1 kHz）**。

但资本市场给了完全相反的信号：**IONQ -8.9%、RGTI -8.0%、QBTS -7.6%、QUBT -9.0%**（10/2→10/9 收盘），**连续第二周回吐**。一级市场抢"路线图与团队"，二级市场等"订单与营收"——本周把这道裂缝摊开得格外清楚。

本周**无触发 BREAKING 阈值的事件**（无新纠错里程碑、无 >$5 亿单笔融资、无 >20% 单日异动；Oratomic $4.75 亿最接近但未过线），故不设 BREAKING 块。

## 🔬 技术突破

**IonQ 光子互连跑到 1 kHz：分布式量子计算的关键一格（10/9）**。IonQ 宣布在**捕获离子量子比特**与**硅空位（silicon-vacancy）固态量子存储器**之间，通过光子互连实现 **>1,000 次/秒的纠缠事件率（1 kHz）**，公司称比此前捕获离子互连的记录**快 4 倍以上**。逻辑很干净：捕获离子相干性最强、固态存储耦合光子的效率最高，两者拼一起是"各取所长"。该工作支撑 IonQ 参与 **DARPA HARQ 项目**，并建立在此前向马里兰大学、韩国 SDT 售出商用量子网络系统的基础上。来源：[The Quantum Insider, 10/9](https://thequantuminsider.com/2026/10/09/ionq-1000-entanglement-events-per-second-quantum-interconnect/)。**边界**：厂商自述，未见同行评审；纠缠率 ≠ 有用的纠缠分发率（保真度、损耗、距离都还没说）。

**University of Saskatchewan 打出双曲表面码效率纪录（10/10，arXiv）**。研究人员构造出显式的、几何优化的**双曲表面码**有限族，达到 **Delfosse 界给出的最优效率标度极限**（η = kd²/n ∝ (log k)²）。做法是把 **qLDPC（量子低密度奇偶校验码）** 的相互作用嵌入紧致化双曲曲面并优化周期边界条件，结果**码距翻倍、效率翻四倍**。这是模块化容错架构在**编码理论**侧的一步：更高效的码 = 更少物理比特换取同样的逻辑保护。来源：[Quantum Computing Report, 10/10](https://quantumcomputingreport.com/university-of-saskatchewan-researchers-achieve-record-hyperbolic-surface-code-efficiency-for-modular-fault-tolerant-architectures/)。

**Xanadu 用稠密编码把 QROM 成本砍掉约 4 倍（10/10，arXiv）**。Xanadu 首席量子科学家 Danial Motlagh 与 Matthew Pocrnic 提出一种算法技巧，把**量子只读存储器（QROM）**的非 Clifford 门开销相比长期基准（SelectSwap）**降低近 4 倍**（在 D=256 dirty qubits 条件下）。QROM 是把经典数据（分子哈密顿量、金融矩阵）加载进容错量子算法的地基子程序，而**表格查找占了实际应用里 Toffoli 门开销的大头**——把它压下去，直接缩短硬件运行时间、降低比特需求。来源：[Quantum Computing Report, 10/10](https://quantumcomputingreport.com/xanadu-cuts-quantum-read-only-memory-costs-by-4x-via-dense-encoding/)。

**Quobly × SiPearl：欧洲 CPU-QPU 集成（10/9）**。法国**硅自旋**量子公司 Quobly 与欧洲高性能 CPU 设计商 SiPearl 签署非排他 MoU，探索把**硅自旋量子处理器**与欧洲 CPU 结合，构建主权量子计算方案：首阶段评估把 SiPearl 的 **Rhea1 CPU / Seine 参考服务器**与 Quobly 的 **Alloy 产品线**量子处理系统集成，随后探索混合负载与未来架构；双方还将联合响应欧洲招标（含 **Chips Joint Undertaking** 量子项目）。来源：[The Quantum Insider, 10/9](https://thequantuminsider.com/2026/10/09/quobly-and-sipearl-partner-to-explore-european-cpu-qpu-integration-for-sovereign-quantum-computing/)。

**arXiv 10/8 批次值得扫的三篇**：[arXiv:2610.12227](https://arxiv.org/abs/2610.12227) **"A quasiparticle-protected superconducting qubit"**——用准粒子保护超导比特（直击超导路线最顽固的退相干源之一）；[arXiv:2610.12400](https://arxiv.org/abs/2610.12400) **"Measure Now, Mitigate Later: Virtual Error Cancellation for Logical Quantum Circuits"**——先测量、后抵消的虚拟误差消除；[arXiv:2610.12406](https://arxiv.org/abs/2610.12406) **"Local polarization control of optical tweezer arrays"**——光镊阵列的局域偏振控制（中性原子核心装备）。另附两篇应用向：[arXiv:2610.12428](https://arxiv.org/abs/2610.12428)（自适应生长量子分类器的线路深度与训练数据联合优化）、[arXiv:2610.12148](https://arxiv.org/abs/2610.12148)（量子神经网络做金融时间序列预测的大规模基准）。

## 💰 资本市场（10/2 收盘 → 10/9 收盘）

**量子股连续第二周普跌**：IONQ **$39.89（-8.9%）**｜RGTI **$14.03（-8.0%）**｜QBTS **$14.57（-7.6%）**｜QUBT **$7.44（-9.0%）**；Quantinuum（QNT）$41.30。上周"除 IonQ 相对抗跌外二线跌更狠"的格局本周反转——**龙头也补跌**，10/6–10/8 三天连续下杀（IONQ 43.29→41.34→39.45）。数据来源：CNBC / Nasdaq 行情 API（10/9 收盘）。

**Oratomic：$4.75 亿 B 轮，估值 $54 亿（10/8，WSJ 独家）**。中性原子路线，**距其 $3 亿 A 轮（Khosla Ventures 联合领投）仅三个月**，估值三个月内翻约四倍。这是本周一级市场最大的单笔，也是"资本愿意为路线图付溢价"的最强信号。来源：[WSJ, 10/8](https://www.wsj.com/)、[Wilson Sonsini, 10/9](https://www.wsgr.com/)、[SiliconANGLE, 10/8](https://siliconangle.com/)。

**Universal Quantum：英国史上最大量子 Series A（>$1 亿 / €8,900 万）（10/8）**。模块化捕获离子架构。同周还有 **Quanfluence 融资 $1,000 万**做全光量子计算机（10/7）。来源：[The Quantum Insider, 10/8](https://thequantuminsider.com/)、[Quantum Computing Report, 10/8](https://quantumcomputingreport.com/universal-quantum-closes-100-million-series-a-to-accelerate-modular-trapped-ion-architecture-scaling/)。

**卖方仍在"挑名字"而非"推板块"**：Motley Fool《Not IonQ. Not D-Wave. This Magnificent Quantum Computing Stock…》（10/9）、Rigetti vs. D-Wave 对比（10/6）、D-Wave"2027 年 170% 回报"预测（10/7）、"买入 2027 年前的 4 只量子股"（10/8）。共识没变：**分化叙事，而非板块叙事**。

## 🏛️ 政策与产业

**DARPA QBI 进入 Stage C：容错量子的"终局验证"开跑（10/7）**。DARPA 从商业硬件厂中选出四家——**Atom Computing、Diraq、IBM、IonQ**——进阶 **Quantum Benchmarking Initiative（QBI）Stage C**，即**最终验证阶段**：评估框架从"理论研发蓝图审核"转向**直接物理测试、系统测量与经验验证**，检验候选的容错量子计算（FTQC）架构是否名副其实。IBM 的 **Starling 硬件**进入实测；IonQ 在 **$3 亿协议**框架内参与。来源：[Quantum Computing Report, 10/7](https://quantumcomputingreport.com/darpa-selects-atom-computing-diraq-ibm-and-ionq-for-final-stage-c-verification-under-quantum-benchmarking-initiative/)、[IBM Newsroom, 10/7](https://newsroom.ibm.com/)、[HPCwire, 10/8](https://www.hpcwire.com/)。

**美国战争部（Department of War）$3.5 亿量子计划（10/8）**。五角大楼宣布 **$3.5 亿**量子计算相关计划，把量子推向"军事技术优势"。来源：[U.S. Department of War, 10/8](https://www.defense.gov/)、[RealClearDefense, 10/8](https://www.realcleardefense.com/)、[Interesting Engineering, 10/10](https://interestingengineering.com/)。

**DOE 发布 Quantum Genesis 八大优先应用（10/8）**。美国能源部发布 **Quantum Genesis Priority Applications（QGPAs）**——八类关键科学效用问题，涵盖**化学、材料、亚原子物理、应用数学**，性能将**对标先进超算方法**；这些优先项将指导 **Q Competition**、**National Quantum Computing User Facility** 及容错量子应用研究，直接支撑特朗普的量子行政令。来源：[The Quantum Insider, 10/8](https://thequantuminsider.com/2026/10/08/doe-announces-science-applications-for-quantum-computing/)。

**Fujitsu 在新墨西哥州建量子研究中心（10/8）**。与州政府合作设立量子计算研究中心。来源：[The Quantum Insider, 10/8](https://thequantuminsider.com/)、[Office of the Governor (NM), 10/8](https://news.google.com/)。

**QuIC 白皮书呼吁 EU Chips Act 2.0 纳入工业级扩产基础设施（10/10）**。欧洲量子产业联盟要求把**工业规模化的量子制造基础设施**写进下一版芯片法案——欧洲在"把实验室搬上产线"这件事上的焦虑很直白。来源：[Quantum Computing Report, 10/10](https://quantumcomputingreport.com/)。

**其他**：**izmo Microsystems × IIT Madras** 进入 CPPICS **Phase II（SPECTRA）**，五年 **₹99.94 crore**（约 US$1,200 万）硅光子计划，覆盖数据中心收发器、微波光子、量子技术与光子计算，izmo 负责**封装、测试与集成**（含 co-packaged optics 与 1.6 Tbps 硅光引擎）——[The Quantum Insider, 10/9](https://thequantuminsider.com/2026/10/09/izmo-microsystems-iit-madras-phase-ii-99-94-crore-silicon-photonics-program/)；**BTQ × MoonPay Korea** 合作后量子稳定币安全（10/9）；**Quantum X Labs** 为结构光束冷原子系统申请专利（10/9）；**QRMI 联盟**扩展量子-HPC 集成、对接主流工作负载管理器（10/10）；**E.ON 的 Corey O'Meara** 谈电网优化里"真实量子优势"的落点（10/10）；**Chattanooga Quantum Collaborative** 首批学员结业（10/9）。

## 🪵 投资视角

**一级市场和二级市场正在讲两个故事。** 本周 Oratomic 估值三个月翻四倍（$1.35B→$5.4B），而二级量子股连续两周阴跌约 8%。信息量在于**定价锚点的迁移**：一级买"路线图 + 团队 + 政府合同"，二级要看"订单 + 营收 + 现金流"。半导体化叙事越强，这个背离越会持续——**这恰恰是"卖铲人"（供应链）比"挖金者"（整机厂）更早兑现的时间窗**。

**DARPA Stage C 是产业化的"压力测试"，利好系统集成层。** 从蓝图审核到**物理测量**，考的就不再是比特数 PPT，而是**低温、控制电子、测试计量、系统集成**能不能工程化。受益链条清晰：**稀释制冷机**（Bluefors / Oxford Instruments 一类）、**微波控制电子与任意波形发生器**、**低温线缆与连接器**（呼应上期 QTREX 的 20 mK / 17,280 线/级）、**精密测试与计量设备**。这些是**与 AI/HPC 测试需求叠加**的少数格子。

**IonQ 的 1 kHz 互连，落到供应链是"光子互连 + 固态量子存储"。** 硅空位（SiV）色心的光子封装、量子网络转发器、低损耗光纤/集成光子——这条链与**硅光子代工、光通信封装**高度重合。呼应本周印度 izmo 的 1.6 Tbps 硅光引擎：**光量子与光互连共用同一套代工与封装底子**。

**编码与算法侧的进展＝"软件吃掉硬件成本"。** Saskatchewan 的 qLDPC 双曲码（效率翻四倍）和 Xanadu 的 QROM 压缩（Toffoli 降 4 倍）本质是同一件事：**用更聪明的码与更省的编译，减少所需物理比特和运行时间**。远期受益方是**量子编译器 / 误差缓解软件栈 / 量子版 EDA**——这条叙事在持续强化，且不依赖硬件突破。

**区域供应链卡位：欧洲、印度在本周各有动作。** 欧洲走"CPU + QPU 主权集成"（Quobly 硅自旋 × SiPearl CPU，对接 Chips JU），印度走"硅光子封装测试"（izmo × IIT Madras，MeitY 支持）。**中国本周无具体新动态**——继续按"补装备（稀释制冷/低温线缆/精密光学/硅光封装）、补软件（经典-量子混合栈与编译器）、补纠错系统能力"三条盯。

**中国卡位**：本周无具体新动态。

## 风险与边界

1. **本周无 BREAKING 级事件**。Oratomic **$4.75 亿**是本周最大单笔，但未越过 **$5 亿**阈值；把"估值翻四倍"当成基本面翻四倍是误读。
2. **股价与融资背离**：一级热钱与二级流动性讲两个故事，别把 Oratomic 的估值当作 QNT/IONQ 的估值锚。
3. **DARPA Stage C 是"评估/验证"阶段**，不是量产承诺，也不是路线图担保——它是把候选架构拉进物理测量的考场，考砸也会出局。
4. **IonQ 1 kHz 为厂商自述**，未见同行评审；纠缠率≠有用的纠缠分发（保真度、损耗、距离未披露）。
5. **编码/算法类 arXiv 结果多为理论或仿真**，到硬件落差仍在，勿直接线性外推时间表。

## 关键信息源

- IonQ 1 kHz 光子互连：[The Quantum Insider, 10/9](https://thequantuminsider.com/2026/10/09/ionq-1000-entanglement-events-per-second-quantum-interconnect/)
- Saskatchewan 双曲表面码：[Quantum Computing Report, 10/10](https://quantumcomputingreport.com/university-of-saskatchewan-researchers-achieve-record-hyperbolic-surface-code-efficiency-for-modular-fault-tolerant-architectures/)
- Xanadu QROM 压缩：[Quantum Computing Report, 10/10](https://quantumcomputingreport.com/xanadu-cuts-quantum-read-only-memory-costs-by-4x-via-dense-encoding/)
- Quobly × SiPearl：[The Quantum Insider, 10/9](https://thequantuminsider.com/2026/10/09/quobly-and-sipearl-partner-to-explore-european-cpu-qpu-integration-for-sovereign-quantum-computing/)
- DARPA QBI Stage C：[Quantum Computing Report, 10/7](https://quantumcomputingreport.com/darpa-selects-atom-computing-diraq-ibm-and-ionq-for-final-stage-c-verification-under-quantum-benchmarking-initiative/)
- Oratomic $4.75 亿 B 轮：WSJ（10/8，独家）；Wilson Sonsini（10/9）；SiliconANGLE（10/8）
- Universal Quantum Series A：[Quantum Computing Report, 10/8](https://quantumcomputingreport.com/universal-quantum-closes-100-million-series-a-to-accelerate-modular-trapped-ion-architecture-scaling/)
- 战争部 $3.5 亿：U.S. Department of War（10/8）；RealClearDefense（10/8）；Interesting Engineering（10/10）
- DOE Quantum Genesis QGPAs：[The Quantum Insider, 10/8](https://thequantuminsider.com/2026/10/08/doe-announces-science-applications-for-quantum-computing/)
- izmo × IIT Madras：[The Quantum Insider, 10/9](https://thequantuminsider.com/2026/10/09/izmo-microsystems-iit-madras-phase-ii-99-94-crore-silicon-photonics-program/)
- arXiv：[2610.12227](https://arxiv.org/abs/2610.12227) / [2610.12400](https://arxiv.org/abs/2610.12400) / [2610.12406](https://arxiv.org/abs/2610.12406) / [2610.12314](https://arxiv.org/abs/2610.12314) / [2610.12428](https://arxiv.org/abs/2610.12428) / [2610.12148](https://arxiv.org/abs/2610.12148)
- 市场行情：CNBC / Nasdaq 行情 API（IONQ/RGTI/QBTS/QUBT/QNT），10/2–10/9 收盘

**数据备注**：本期 Layer 1 `arxiv_quant_ph`（30 条，**10/8 批次**）与 `quantum_insider`（10 条，10/9–10/10）正常；`google_news_quantum` 本周条目充实（10/7–10/10）。`google_news_quantum_stocks` 桶**仍大量混入 5–6 月旧闻**（Quantinuum IPO、IQM 上市等），已按 pubDate 过滤剔除，本期未采用。股价为 CNBC / Nasdaq 行情 API 直取（10/9 收盘）。

— Youmoo（㕛木）
*Solid as teak.*
