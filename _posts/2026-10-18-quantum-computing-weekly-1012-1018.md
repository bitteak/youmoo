---
layout: post
title: "量子计算周报（2026.10.12–10.18）：Google 把 magic state 误差压到 1/40、Claude 把 Toffoli 砍到 1/12，量子股却一周跌掉两成"
date: 2026-10-18 20:30:00 +0800
description: "量子计算周报（10.12–10.18）：Google Willow 上 magic state cultivation 误差降 40×、T-state 逻辑保真度 99.99%；Anthropic Claude 把解码线路 Toffoli 从 510 万降到 44 万；IonQ $20 亿定增 + $13 亿收购 Elisity；量子股周跌 14–22%。"
tags: [quantum-computing, 量子计算, 周报]
---

**本周主线**：三条互不相干的进展，打在同一个成本项上。① **Google 在 Willow 上把 magic state 制备误差压低约 40 倍，T-state 逻辑保真度 99.99%**，论文上 Science——这是把"magic state 要吃掉机器 95% 产能"这个理论包袱第一次搬上硬件；② **Anthropic 的 Claude 与哈佛/QuEra 团队用 AI 设计量子线路**，把一个解码线路的 Toffoli 门从 **510 万降到 44 万（约 1/12）**；③ **IonQ 用"调度式 qLDPC"把逻辑 Clifford 操作提速最多 74 倍**。

三条都在讲同一件事：**瓶颈正从"物理比特保真度"转向"每个逻辑操作的资源与延迟"**。

而资本市场给了相反的读数：**IONQ -21.6%、RGTI -15.9%、QBTS -19.2%、QUBT -14.5%、QNT -11.5%**（10/9 → 10/16 收盘），量子股连续第三周回吐，本周跌幅是三周里最狠的。

## ⚠️ BREAKING

**① Google：magic state cultivation 首次在硬件上跑通（10/15，Science）。** Google Quantum AI 在 **105 比特 Willow** 上实现了 **magic state cultivation**——把带噪态注入芯片上一小块区域，用一串高度协同的测量做"质检"，丢弃不合格的尝试、保留通过的，从而"栽培"出高纯度 T-state。结果：**误差相对未栽培态降低约 40 倍，T-state 逻辑保真度 99.99%**；并首次演示了**跨码移植**——把态从 **distance-3 color code** 嫁接到 **distance-5 surface code**。理论由 Gidney、Shutty、Jones 在 2024 年提出，这次是第一次落到硅上。

**为什么重要**：容错量子机里，非 Clifford 操作（T 门）靠消耗 magic state 实现；有估算认为**制备 magic state 可能吃掉一台机器 95% 的产能**。把误差压 40 倍，等价于把"算得动"的门槛往下拽了一截。**边界**：这是"资源效率"里程碑，不是"逻辑错误率再降一个量级"的表面码演示；postselection 的**保留比例未披露**，而保留率直接决定真实成本；Google 自己也承认更大规模验证与存储测试仍不达标（存储误差比仿真预测高约 7 倍）。

**② IonQ：$20 亿股权融资定价，$40/股（较 10/13 收盘溢价约 15%）（10/14）。** 结构不是普通增发：**2,050 万股**普通股 + **2,950 万股 pre-funded warrants**，均按 **$40** 定价；另附 **1 亿份七年期权证、行权价 $69.46**（较 10/13 收盘溢价 100%）。买方为 **Heights Capital Management** 管理的实体，**J.P. Morgan** 独家承销。这是纯量子板块迄今最大的一笔股权融资，也越过"单笔 >$5 亿"的 BREAKING 阈值。

## 🔬 技术突破

**Google magic state cultivation（10/15）**：见上。补充两个工程细节：团队用**强化学习改进了处理器校准**，并新造了一套测量方法，避免把制备态的质量"测高了"——起因是研究员 Emma Rosenfeld 看到"违反物理定律"的数据，追了几个月，发现是电气漂移与温度波动污染了 benchmark 本身。这种"先怀疑测量、再相信结果"的流程，比数字本身更值得记。来源：[Google Quantum AI 官方博客](https://blog.google/innovation-and-ai/models-and-research/quantum-computing/magic-state-cultivation-quantum-computing/)、[The Quantum Insider, 10/16](https://thequantuminsider.com/2026/10/16/google-demonstrates-method-to-cut-errors-in-quantum-computings-magic-states/)。

**Anthropic Claude 设计的线路把解码 Toffoli 砍到 1/12（10/16–17）**。Andi Gu（Anthropic STEM Fellows / 哈佛）、Alek Kemeny（Anthropic）、Susanne Yelin、Mikhail Lukin（哈佛，同时是 **QuEra 联合创始人兼首席科学家**）用 **Claude Mythos 5** 在 8 类任务上重设计量子线路。方法不是"让模型出点子"，而是**给模型编程工具 + 一个独立评估器**（按 Toffoli 门数 × 峰值比特数打分），让它自己迭代。硬数字：一个解码线路 **510 万 → 44 万 Toffoli**，峰值比特 **1,938 → 1,837**；定点 Gaussian 函数把"门数×比特数"乘积降 **39 倍**；线性方程组相关子程序降 **32 倍**；椭圆曲线算术部分 **53 小时**基本自主完成（人只给初始指令与几次"扩大搜索"的提示），核心是把扩展欧几里得换成 **Berlekamp–Massey** 并选择性重建中间量而非全存。**边界**：全部是**线路设计与资源估算**，没在任何量子硬件上跑；有一个任务的对比基线是"朴素可逆构造"而非已发表线路，比较口径需要打折。来源：[The Quantum Insider, 10/17](https://thequantuminsider.com/2026/10/17/anthropics-claude-designs-leaner-quantum-circuits-reducing-resources-needed-for-key-calculations/)。

**IonQ "调度式 qLDPC"：逻辑 Clifford 提速最多 74 倍（10/12，arXiv）**。Mark Webster 与 Nicolas Delfosse 的做法，是不去造复杂的图态合并码，而是用 **Shor 式 cat state** 一次性执行 L 个逻辑测量，再用一个**经典调度码矩阵 G** 决定测量顺序、对所有结果做联合解码；配合改造过的 **CliNR（Clifford Noise Reduction）**。结果：**Q102 码（22 个逻辑比特）上随机逻辑 Clifford 线路提速 74.4 倍**，逻辑 Toffoli 提速 **5.0 倍**（Q70 码为 18.5× / 4.2×）。这套快速 Clifford 协议已并入 IonQ 的 **"Walking Cat"** 架构蓝图——即其"攻破 256 位椭圆曲线"的容错设计。**边界**：资源估算与协议层结果，不是硬件实测；但方向很对——**qLDPC 的真问题从来不是码率，是"每次纠错要等多少轮"**。来源：[Quantum Computing Report, 10/12](https://quantumcomputingreport.com/ionq-demonstrates-scheduled-qldpc-error-correction-to-accelerate-fault-tolerant-gate-execution-by-up-to-74x/)。

**D-Wave 用 728 比特做三维高阶拓扑绝缘体（10/17，arXiv）**。Pratik Sathe、Andrew King 等人在 **Advantage2** 退火机上实现 1D/2D/3D **高阶拓扑绝缘体（HOTI）**：1D SSH（64 比特）、2D BBH（364 个 dimer）、3D BBH 八极绝缘体（**432 比特，3×3×3**），整机用到 **728 比特**。工程上两招值得记：把物理比特两两耦合成 **dimer（J_d = 2.5 GHz、Δ = 3.0 GHz）** 以在稀疏图上嵌入高维格点；用 σx 测量时间平移 **1/(4Δ) = 125 ps** 重构复值传播子，时间分辨率 **62.5 ps**。结论：测到量子化的**三维电八极矩（1/2 不变量）**，且在不强制理想空间对称时仍保持量子化——拓扑保护对硬件无序不敏感。这是"退火机 = 可编程凝聚态模拟器"这条线的实证。来源：[Quantum Computing Report, 10/17](https://quantumcomputingreport.com/d-wave-demonstrates-3d-analog-digital-quantum-simulation-of-higher-order-topological-insulators-using-728-qubits/)。

**纠错系统层两条小进展**：**Riverlane × NVIDIA** 用 GPU 加速 QEC 解码器的校准流程（10/14–15）；**MIT（Zhou 组）× 哈佛**给出更紧凑的量子纠错码构造（10/15）。前者是"实时解码"的工程化，后者是码本体的效率——都属于把容错从论文推向系统的那类活儿。

## 💰 资本市场（10/9 → 10/16 收盘）

**量子股三连跌且加速**：IONQ **$31.28（-21.6%）**｜RGTI **$11.80（-15.9%）**｜QBTS **$11.78（-19.2%）**｜QUBT **$6.36（-14.5%）**｜Quantinuum（QNT）**$36.55（-11.5%）**。节奏很清楚：10/12 IonQ 宣布收购 Elisity 当天 IONQ -9%；10/13–14 QNT 创 52 周新低（10/14 收 $33.03）；**10/14 全板块单日 -10% 上下**（IONQ -9.5%、RGTI -8.6%、QBTS -10.1%），诱因是 IonQ $20 亿定增定价带来的稀释恐慌，叠加当天 AI 内存链的整体抛售；10/15 集体反弹（IONQ +9.3%、QNT +11.0%）后 10/16 又回落。数据来源：Yahoo Finance 行情 API，10/16 收盘。

**Morgan Stanley：2040 年量子市场"每年 $1,000 亿+"，首选 Quantinuum（10/15）**。研报把 QNT 上调至 **Overweight**，但同时把目标价从 **$78 下调到 $62**——"看多赛道、下调目标"这种组合，翻译过来就是：**长期 TAM 更大了，短期兑现更慢了**。QNT 当天涨 11%，是本周板块里唯一像样的反弹。来源：[Investor's Business Daily, 10/15](https://www.investors.com/)、[Seeking Alpha, 10/15](https://seekingalpha.com/)。

**IonQ 收购 Elisity：全股票、最高 $13 亿（10/12）**。含最高 **$1.5 亿**业绩对价。Elisity 做的是 OT/IoT 的零信任网络分段——IonQ 的算盘是把"量子安全"从算法层（PQC）卖到网络层（身份+分段），配合 Q-Day 叙事做企业安全生意。市场当天用 -10% 投票：**买安全公司不解决量子机的收入问题**。来源：[The Quantum Insider, 10/12](https://thequantuminsider.com/2026/10/12/ionq-agrees-to-buy-elisity-in-cybersecurity-deal-worth-up-to-1-3-billion/)。

**一级市场本周偏小**：西班牙 **Qilimanjaro** 完成 **€1,960 万（约 $2,190 万）Series A 首关**，**Indra Group 领投**，走 **fluxonium** 多模态路线（10/14）；韩国中性原子公司 **OQT** 拿到 **₩140 亿（约 $1,040 万）pre-Series A**（10/15）。上周的 Oratomic（累计 $7.75 亿、估值 $54 亿）与 Universal Quantum（>$1 亿）已是上期主角，本期不再重复计入。

## 🏛️ 政策与产业

**纽约市 + NYU：$2.84 亿量子制造设施，市政府持股（10/14–15）**。这是本周最被低估的一条。不是实验室扩建，是**"城市以股权换产业"**：纽约市与 NYU 共建量子制造/封装设施，市政府在这门生意里占股份。市长 Mamdani 的表述是"给城市一个新兴产业的股份"。对供应链的含义：**量子硬件的"制造"环节开始被地方政府当成招商资产来抢**，和当年晶圆厂落地逻辑一模一样。来源：[NYC.gov, 10/15](https://www.nyc.gov/)、[Quantum Computing Report, 10/14](https://quantumcomputingreport.com/)。

**Anderon 发布首个超导量子 PDK（10/16）**。Anderon 是 **IBM 的量子晶圆代工部门**，其 **300mm** 平台的第一版 **Process Design Kit** 覆盖：量子比特、I/O 与信号布线、放大器与滤波器，另附**相干性基线验证的参考设计**与用于仿真的**电磁参数**，早期访问需签许可。这条新闻的分量在"PDK"三个字：**有 PDK 才有无晶圆厂设计公司，才有可复用的 IP 与设计流程**。量子硬件正在复制 1990 年代 ASIC 的路径。来源：[The Quantum Insider, 10/16](https://thequantuminsider.com/2026/10/16/anderon-superconducting-quantum-pdk/)。

**SkyWater × D-Wave：多年制造协议（10/13）**。注意这里的地缘细节——**SkyWater 已是 IonQ 旗下资产**，而 D-Wave 把多年产能押在竞争对手控股的代工厂上。这是"量子整机厂垂直整合代工"的直接后果：**二线厂没有自己的产能，只能向对手的产线下单**。来源：[The Quantum Insider, 10/13](https://thequantuminsider.com/2026/10/13/skywater-d-wave-manufacturing-agreement/)。

**IonQ 在剑桥开出首个量子创新中心（10/15）**。落地 **Cavendish 实验室 Ray Dolby Centre**，部署 **256 比特**系统，是其美国以外首个 Innovation Centre——欧洲市场的"驻场销售 + 科研合作"二合一。同周 **D-Wave 向意大利交付该国首台退火量子计算机（Advantage2，10/15）**。来源：[IonQ, 10/15](https://ionq.com/news)、[The Quantum Insider, 10/15](https://thequantuminsider.com/)。

**后量子迁移的合规时钟在加速**：**德国**联邦内政部（BMI）、数字化部（BMDS）与 BSI 联合发布**国家 PQC 迁移指南**（10/16）；**GAO** 报告称 **24 个联邦机构**对量子网络威胁准备不足（10/13）；**WTO** 向贸易官员吹风，称加密体系的"窗口"可能只剩**约五年**，且"quantum safe"尚无统一定义（10/16）。美国的基线是 **EO 14412**：联邦承包商须在 **2030-12-31** 前完成 NIST PQC 合规。来源：[The Quantum Insider, 10/16](https://thequantuminsider.com/2026/10/16/transition-post-quantum-cryptography-national-eu-roadmap-guideline/)。

**QuEra 的两条线**：**Terra Quantum 加入 QuEra 主导的 Quantum Alliance**（10/16）；同时 QuEra 科学家入选 **ARPA-E QC3（Quantum Computing for Computational Chemistry）** 九个团队中的**三个**（10/16）。另据 CoinDesk，联盟成立的时间点被市场与"约 **640 万 BTC** 面临量子威胁"的测算绑在一起（该数字另一口径为 600 万，**待核实**）。来源：[CoinDesk, 10/16](https://www.coindesk.com/)、[The Quantum Insider, 10/16](https://thequantuminsider.com/2026/10/16/terra-quantum-quera-quantum-alliance/)。

**其他**：特朗普 **10/16 签署两项量子相关行政令**，据 Stocktwits 报道市场将其解读为对 IBM/INFQ/QBTS/RGTI/QUBT 的政策利好；**白宫原文条款未在可访问渠道取得，细节待核实**。英国本周另有一笔 **£5,000 万**量子产业支持（10/12）。

## 🪵 投资视角

**一、三个"降本"进展，其实在给同一张账单打折。** magic state（非 Clifford 资源态的开销）、线路级 Toffoli 数（算法的门账单）、qLDPC 调度（纠错的等待时间）——这三项相乘，才是"一次有用计算要多少钱"。本周三条各自砍掉 1–2 个数量级的不同因子，说明**研发重心已从"把比特做稳"迁移到"把每个逻辑操作做便宜"**。对估值的含义：单纯的物理比特数、QV 数字的边际叙事价值在下降；**编译、资源估算、纠错调度、解码器**这些"软件吃掉硬件成本"的位置在升值。

**二、PDK 是本周最该被记住的产业信号。** Anderon 把超导量子工艺做成了带 **EM 参数与参考设计**的设计套件。一旦 PDK 成立，生态就会长出：第三方设计公司、IP 复用、DFM 规则、MPW 流片。这与 **EDA、封装、测试** 是同一条价值链——也是半导体业最赚钱的那一段。**量子版的"代工 + EDA"卡位战，本周正式开局**。

**三、供应链映射（本周有新证据的加粗）**：
- **超导路线** → 稀释制冷机、微波控制/AWG、低温线缆。**Anderon 300mm PDK** 与 **NYC/NYU $2.84 亿制造设施**都指向"制造与封装"这一层，比整机更早看到钱。
- **离子阱** → 激光器、光学器件、光子互连。**IonQ 剑桥 256 比特中心**是需求侧的实证；其 qLDPC 调度把"逻辑执行率（LER）"做成了新 KPI——解码器与实时控制硬件的价值随之上升。
- **中性原子** → 激光/光镊/真空。**QuEra 拿下 ARPA-E QC3 三个团队**，把中性原子往"化学应用"上钉，这是最可能先出现付费客户的场景。
- **光量子** → 硅光子代工与先进封装；与 AI 光互连共用同一套底子（延续前几期 izmo/CPO 的线索）。
- **共性** → EDA、封装、测试计量。**Riverlane × NVIDIA** 是"GPU 进纠错解码"的第一个明确信号，这条线与 AI 基础设施的资本开支同源。

**四、SkyWater 悖论值得单独记一笔。** D-Wave 与 **IonQ 控股的 SkyWater** 签多年制造协议。量子整机厂开始垂直整合代工，二线厂被迫向竞争对手的产能下单。**代工产能正在成为量子板块的下一个卡位点**——纽约市用股权换设施，是同一个逻辑的公共资本版本。

**五、中国卡位：本周无具体新动态。** 但有一条值得警惕的报道：某中国量子计算机的"量子优势"声明，被指出**单台 GPU 服务器即可匹敌其跑分**（10/16）。国内"量子优越性"叙事的估值弹性很大，跟这类消息时要保留折扣。

**六、估值层面：$20 亿定增以 15% 溢价定价，说明机构需求是真的；但 1 亿份 $69.46 的权证是悬在 2027 年前的供给。** 本周 -20% 不是对技术的否定，是"股权供给 + AI 内存链抛售"的双杀。三周连跌之后，板块的定价权已经从"叙事"交回给"现金流与订单"——这也是为什么 Morgan Stanley 一边上调评级、一边下调目标价。

## 风险与边界

1. **magic state 的 40× 是"相对未栽培态"的误差降低，且只对 postselection 通过的尝试成立**；保留比例未披露，真实成本无法从新闻稿推出。Google 自述存储测试误差比仿真高约 7 倍，大规模验证仍未做。
2. **Claude 的线路成果全部是设计与资源估算**，未在硬件执行；其中一项任务的基线是朴素构造而非已发表线路，倍数需打折。
3. **IonQ 的 74× 是协议层/估算结果**（arXiv），不是硬件实测；qLDPC 的实用性仍取决于解码器实时性与 cat state 制备开销。
4. **本周无 >20% 单日异动、无 Quantinuum IPO 类事件**（QNT 已于 6 月上市）；板块周跌幅 14–22% 属估值收缩，不是单一利空。
5. **特朗普两项行政令的具体条款未取得原文**，本文只记录市场反应，不做条款推断。
6. **640 万 vs 600 万 BTC 量子暴露面两源口径不一致**，标为待核实。

## 关键信息源

- Google magic state cultivation：[Google Quantum AI, 10/15](https://blog.google/innovation-and-ai/models-and-research/quantum-computing/magic-state-cultivation-quantum-computing/)｜[The Quantum Insider, 10/16](https://thequantuminsider.com/2026/10/16/google-demonstrates-method-to-cut-errors-in-quantum-computings-magic-states/)
- Claude × 哈佛/QuEra 线路设计：[The Quantum Insider, 10/17](https://thequantuminsider.com/2026/10/17/anthropics-claude-designs-leaner-quantum-circuits-reducing-resources-needed-for-key-calculations/)
- IonQ 调度式 qLDPC：[Quantum Computing Report, 10/12](https://quantumcomputingreport.com/ionq-demonstrates-scheduled-qldpc-error-correction-to-accelerate-fault-tolerant-gate-execution-by-up-to-74x/)
- D-Wave 728 比特 3D HOTI：[Quantum Computing Report, 10/17](https://quantumcomputingreport.com/d-wave-demonstrates-3d-analog-digital-quantum-simulation-of-higher-order-topological-insulators-using-728-qubits/)
- IonQ $20 亿定增定价：[The Quantum Insider, 10/14](https://thequantuminsider.com/2026/10/14/ionq-announces-pricing-2-billion-equity-offering/)
- IonQ 收购 Elisity：[The Quantum Insider, 10/12](https://thequantuminsider.com/2026/10/12/ionq-agrees-to-buy-elisity-in-cybersecurity-deal-worth-up-to-1-3-billion/)
- Morgan Stanley 上调 QNT：Investor's Business Daily（10/15）；Seeking Alpha（10/15）；Barchart（10/15）
- Anderon 超导量子 PDK：[The Quantum Insider, 10/16](https://thequantuminsider.com/2026/10/16/anderon-superconducting-quantum-pdk/)
- SkyWater × D-Wave：[The Quantum Insider, 10/13](https://thequantuminsider.com/2026/10/13/skywater-d-wave-manufacturing-agreement/)
- 德国 PQC 迁移指南：[The Quantum Insider, 10/16](https://thequantuminsider.com/2026/10/16/transition-post-quantum-cryptography-national-eu-roadmap-guideline/)
- NYC/NYU 量子制造设施：NYC.gov（10/15）；Quantum Computing Report（10/14）
- Qilimanjaro €1,960 万：[The Quantum Insider, 10/14](https://thequantuminsider.com/)
- QuEra × ARPA-E QC3：[The Quantum Insider, 10/16](https://thequantuminsider.com/2026/10/16/quera-three-teams-doe-quantum-chemistry-program/)
- 行情：Yahoo Finance 行情 API（IONQ/RGTI/QBTS/QUBT/QNT），10/9–10/16 收盘
- arXiv 关注：[2610.22357](https://arxiv.org/abs/2610.22357)（qLDPC 态在局域 Pauli 噪声下的稳定性）、[2610.22315](https://arxiv.org/abs/2610.22315)（Magna：把 magic state factory 仿真得和 Clifford 线路一样便宜）、[2610.22112](https://arxiv.org/abs/2610.22112)（Patchwork：面向实时解码的自动化格点手术）、[2610.22367](https://arxiv.org/abs/2610.22367)（用 LLM 发现 SOTA 量子线路）

**数据备注**：Layer 1 `arxiv_quant_ph`（30 条，10/15 批次）、`google_news_quantum`（30 条，10/12–10/17）、`quantum_insider`（10 条，10/15–10/17）正常；`google_news_quantum_stocks` 桶仍混入 5–8 月旧闻（Quantinuum IPO 定价、IQM 上市等），已按 pubDate 剔除。股价为 Yahoo Finance 行情 API 直取（10/16 收盘）。

— Youmoo（㕛木）
*Solid as teak.*
