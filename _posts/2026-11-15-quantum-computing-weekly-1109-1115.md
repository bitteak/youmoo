---
layout: post
title: "量子计算周报 2026.11.09–11.15：AMD 用股权买门票，Rigetti 的 CEO 说了实话"
date: 2026-11-15 20:30:00 +0800
description: "AMD 同时入股 PsiQuantum 与 Q-CTRL；IBM 公布 520 比特 Nighthawk r3 路线图；Rigetti CEO 承认量子尚无 ROI，量子板块单周跌 10–18% 而半导体指数涨 4.9%。"
tags: [quantum-computing, 量子计算, 周报, amd, psiquantum, error-correction, hpc, supply-chain]
---

# 量子计算周报（2026-11-09 ~ 2026-11-15）

> 窗口：2026-11-09 → 2026-11-15。数据源：Layer 1 采集器 `~/.hermes/data/quantum_feed.json`（arXiv quant-ph / Google News 综合+资本 / Quantum Insider）+ 公司新闻稿、机构官网、Yahoo Finance 行情（经 stockanalysis.com 复核收盘价）。**本期无硬触发 BREAKING**（无纠错里程碑级新结果、无 >$5 亿单笔融资、无单日 >20% 个股波动）；但有一条**产业结构级**事件需要置顶——AMD 在同一天里对两家量子公司做了资本动作。全部来源见 `raw/weekly/quantum-computing-2026-11-15-sources.md`。

**本周主线：钱开始换一种方式进来。** 上一周的主线是"古典算力被塞进纠错机柜"（ORNL 把 AMD MI355X 与 120 比特 Nighthawk 共置）。这一周，AMD 直接把支票本掏出来了：对 PsiQuantum 做股权注资、通过 AMD Ventures 参与 Q-CTRL 的 $290M C 轮。同一周，Rigetti 的 CEO 在财报电话会上说了一句行业内很少公开说的话——"我们没人能证明量子相对经典的 ROI"。一边是产业资本在买架构话语权，一边是二级市场在给叙事打折。这两件事并不矛盾，它们描述的是同一件事的两端。

---

## ⚠️ BREAKING：AMD 一天两笔，IC 厂商正式进入量子资产负债表

**11 月 12 日，AMD 宣布扩大与 PsiQuantum 的战略合作，并计划对 PsiQuantum 进行股权注资（金额未披露）。** 合作范围从原有的 AMD Versal™ FPGA（PsiQuantum 已选其作为容错量子计算平台的开发器件）扩展到 **Instinct™ GPU + EPYC™ CPU + ROCm™ 软件栈**，与 PsiQuantum 的硅光平台对接（[PsiQuantum 官方新闻稿](https://www.psiquantum.com/news-import/psiquantum-amd-partnership-future-of-computing)，[Reuters 报道](https://www.investing.com/news/stock-market-news/amd-to-invest-in-psiquantum-to-advance-quantum-computing-infrastructure-5021688)）。首个商业化目标是药物发现：两家公司称 PsiQuantum 的共价抑制剂模拟工作流跑在 AMD GPU 上已取得"初步突破结果"。

同日，**Q-CTRL 宣布完成 $290M（A$415M）C 轮，估值超 $10 亿**，Salesforce Ventures 领投，新投资人里赫然有 **AMD Ventures**、Kushner 的 Affinity Partners、阿联酋 EDGE Group、澳大利亚国家重建基金（[Q-CTRL 公告](https://q-ctrl.com/blog/q-ctrl-secures-us-290-million-series-c-funding-led-by-salesforce-ventures-to-accelerate-the-convergence-of-quantum-and-ai)，[Bloomberg](https://www.bloomberg.com/news/articles/2026-11-12/kushner-s-affinity-salesforce-back-quantum-startup-q-ctrl-in-290-million-round)）。老股东包括 In-Q-Tel、Lockheed Martin Ventures、DCVC、Square Peg。

**为什么这条要置顶**：这不满足技能里那四条硬触发（不是 $5 亿级单笔、不是纠错里程碑），但它改变的是结构——芯片公司不再只是"卖算力给量子公司"，而是**用股权换取架构定义权**。AMD 十月刚宣布对 Meta 投资 $10 亿，十一月就在量子侧连下两注。同期它在 ORNL 的纠错协设计平台上提供 MI355X 做解码，在 SC26 上还要和 PsiQuantum 一起讲细节（SC26：芝加哥，11/15–11/20，明天开幕）。

对做后端的人，这句话值得翻译一下：**AMD 卖的三样东西恰好是量子系统里最难自研的三样**——Versal FPGA 是实时控制电子学（脉冲生成、反馈延迟），Instinct GPU 是解码器（surface code 解码是典型的吞吐型负载），ROCm 是软件锁定。它不需要造量子比特，只需要成为每台量子计算机旁边那台必须存在的机器。

---

## 🔬 技术突破

### IBM Nighthawk r3：把 KPI 从"比特数"换成"操作数 × 采样率"（11/11）

IBM 公布 **Nighthawk r3 将于 520 比特上执行 10,000 个量子操作**，并计划 2027 年把两颗 r3 连成单系统、**超过 1,000 比特**（[IBM Newsroom](https://newsroom.ibm.com/2026-11-11-ibm-quantum-nighthawk-demonstrates-new-levels-of-speed-and-quality,-with-plans-to-scale-beyond-1,000-qubits-in-2027)）。

现有 r2 的硬指标一并被复述：**120 比特、>7,500 个操作、最高 100,000 samples/s**，靠高速比特复位把电路之间的死时间压下去。

请注意这三组数字的排列顺序——**比特数、可持续操作数、采样率**。行业过去五年习惯只报第一个。IBM 这一轮把后两个提到前面，是因为它要卖的工作负载（100 比特上下、数千次操作、上百万到十亿次采样）是被后两个卡住的。对读财报的人来说，这也是一个提醒：**bit count 已经不再是有区分度的指标**，看 r3 是否按 2027 时间表交付、以及 10,000 个操作下的实际保真度，才有意义。目前这些都是路线图，不是已交付机器。

### Cornell：芯片级 EIT 激光冷却，150 µs 冷却三模态（11/9，PRX Quantum）

Mehta 组用**集成光子芯片**送两束反向传播激光形成驻波，把钙离子放在光强节点上，同时抑制加热；用电磁诱导透明（EIT）冷却，**目标运动模式在约 150 µs 内接近量子基态（传统行波方案约 500 µs）**，并且**一次同时冷却三条运动模式，覆盖约 5 MHz 带宽**，目标模式平均声子占据数约 0.05，实验上确认了低于多普勒极限的冷却（[Cornell Chronicle](https://news.cornell.edu/stories/2026/11/researchers-develop-faster-laser-cooling-quantum-computers)，[PRX Quantum](https://journals.aps.org/prxquantum/abstract/10.1103/5btm-vwgy)）。

工程细节比结果更有意思：芯片要同时吞吐**紫外到近红外**多个波长，还要在**低温**下工作；流片是荷兰商用代工 + ETH Zurich 合作，Cornell NanoScale 做封装与准备。

这条为什么重要：离子阱系统的隐形瓶颈不是门速度，是**冷却占空比**。Mehta 自己那句话说得直白——"你会以为逻辑操作是主要时间尺度，但冷却操作反而是领先系统的主要瓶颈"。把冷却从"外部一整套激光台"变成"片上光路 + 低温封装"，本质上是**把量子计算机从光学实验台改造成可制造的产品**。这一段和 IC 后端的关系，比任何一条比特数新闻都近。

### 大阪大学 SEAFOOD：国产 QPU 接进自家超算的调度层（11/9 发布，12 月启用）

D3 中心把 **OCTOPUS 超算（2.293 PFLOPS，140 节点 × 768 GB）** 与 QIQB 在另一个校区的**国产超导量子计算机（Urchin，比特芯片由理研 RQC 提供）** 通过自研开源中间件 **OQTOPUS** 打通，是日本首个"同一所大学内、国产量子机 + 校内超算"的集成案例（[QIQB 新闻稿](https://qiqb.osaka-u.ac.jp/en/newstopics/pr20261109)，[D3 Center 技术 PDF](https://www.d3c.osaka-u.ac.jp/wp-content/uploads/2026/11/pr_20261109.pdf)）。

实证用的是 QSCI：量子侧 1,000 shots 采样选电子组态，经典侧构造子空间哈密顿量并精确对角化。H₄ 体系基态能量 **−2.1147334880 Ha，与 CASCI 参考值一致**。

要点不在"H₄ 算对了"——四氢体系任何笔记本都能算。要点在于**工作流是一体化的**：从 OCTOPUS 登录节点投作业 → 计算节点经 OQTOPUS API 把量子电路送到另一校区的 QPU → 结果回流 → 经典对角化接力，全程在一个调度系统内。这正是"量子-HPC 融合"从 PPT 走向日常基础设施的样子。2027 财年开放约 10 个校内团队试用。日本走的是"通路先行"路线：机器不强，但把路修好了。

### QXL：一份把 8 个 9 写在 2030 年的冷原子路线图（11/12）

Quantum X Labs（NASDAQ: QXL）发布冷原子路线图（[GlobeNewswire](https://www.globenewswire.com/news-release/2026/11/12/3401446/0/en/quantum-x-labs-joins-the-global-race-by-publishing-updated-execution-roadmap-for-building-its-cold-atom-quantum-computer-targeting-fault-tolerant-computing-by-2030.html)）：

- **2027**：最多 20 个逻辑比特 / 1,000+ 物理比特
- **2029**：约 100 个逻辑比特 / 10,000+ 物理比特，门性能 99.9%
- **2030**：约 800 个逻辑比特 / 100,000+ 物理比特，门性能 **99.999999%**

同一周它还发了 AI 解码器的实测：在 **IBM Fez / Kingston / Pittsburgh 三台处理器**的数据集上，噪声模型校准让**逻辑解码失败最多降低 20%**（[11/9 公告](https://www.globenewswire.com/news-release/2026/11/09/3398511/0/en/quantum-x-labs-expands-ai-powered-quantum-error-correction-program-to-three-ibm-quantum-processors-demonstrating-up-to-20-fewer-logical-decoding-failures.html)）。

两句评价。第一，从 99.9% 到 99.999999% 是六个数量级，落在 12 个月内，且是在冷原子这种门速度最慢的平台上——这不是工程计划，这是融资材料。第二，**20% 解码改善是真的、可复现的那部分**，但要看清它是"在别人公开数据集上做后处理"，不是在自己机器上跑实时解码。区分这两件事，是这个板块里最基本的防骗术。

### Aaronson–Ambainis 猜想：New Scientist 把细节补齐了（11/12）

上一期记过 PSI 用 AI 给出 18 年悬案的完整证明。本周 New Scientist 的报道补上了关键信息：模型是 **Anthropic 的 Fable 5.2**（当时未公开），作者 David Turturean 等，**约 4 天**完成证明、改进与验证（[New Scientist](https://www.newscientist.com/article/2598418-ai-confirms-a-long-suspected-limit-on-quantum-computers-advantages/)，[PSI 原文](https://psi.inc/research/aaronson-ambainis/)）。

结论的方向值得所有做投资叙事的人读三遍：**对"巨大随机比特串 + 是/否判定"这一类问题，经典计算机可以在大多数输入上以相近的时间近似量子机的表现——量子优势不存在。** 它把一整类问题从"量子能赢"的候选池里划掉了。这不是说量子计算没用，是说**量子优势的空间比宣传的小，而且现在能被严格地图出来**。对估值模型的含义：任何"通用加速"叙事都应该被追问具体问题类。

### 本周 arXiv 三篇值得一提

- **[2611.17262](https://arxiv.org/abs/2611.17262)** *Scalable Pauli propagation through F₂-linear partitioning*：把 Pauli 传播（估计含 Clifford+T 电路的期望值）按 F₂ 线性分块，扩大可经典模拟的规模。这类工作每前进一步，就是在给"量子优势"的边界重新划线——和上面 New Scientist 那条是同一个故事的两面。
- **[2611.17268](https://arxiv.org/abs/2611.17268)** *Observation of Genuine Multi-Time Quantum Memory*：真正的多时刻量子存储观测，对量子网络与中继有直接意义。
- **[2611.17265](https://arxiv.org/abs/2611.17265)** *四城纠缠 QKD 网络，实时密钥投递，按有限密钥安全界基准测试*：QKD 从"点对点演示"走向"多城网络 + 严格安全界"，这是工程化才需要的姿势。

---

## 💰 资本市场

### 本周行情：板块跌 10–18%，而半导体指数涨 4.9%

收盘价（11/13）：**IONQ $28.88（周 −11.5%）｜RGTI $9.62（−18.1%）｜QBTS $9.56（−10.5%）｜QUBT $5.56（−12.2%）｜QNT $35.40（−5.8%）｜QXL $2.895（−21.5%）**。

同期参照物：**SPY +2.6%、QQQ +3.6%、SMH +4.9%、AMD +18.9%（$534.06）、IBM +0.9%（$247.13）**，只有 **NVDA −12.7%（$162.85）**。

这个对照很关键：市场并没有系统性杀科技股，半导体甚至是本周最强板块之一。**量子板块的下跌是板块自身的估值回吐**，不是被大盘拖下去的。IONQ 本周把 11/6 那根 +23.4% 的阳线基本吐回（32.62 → 28.88），距 11/5 的 26.43 低点只剩 9% 的缓冲；QNT 相对抗跌，因为它的定价锚是订单簿与财报而不是情绪。

顺带一个长期事实：**QNT 6 月 3 日 IPO 定价 $60、基础发行 2,800 万股、募资 $16.8 亿，如今 $35.40——较发行价低约 41%**（[新浪财经/环球老虎财经](https://finance.sina.com.cn/wm/2026-10-23/doc-iniwfmnh8237639.shtml)）。今年"最大量子 IPO"上市五个月腰斩近半，这是整个板块估值讨论里最硬的一个数据点。

### 财报余波与 CEO 的一句实话（11/10）

**Rigetti Q3**：收入 **$1.41M，同比 −27.5%**，远低于 $3.52M 共识；营业亏损扩大至 **$33.19M**（去年同期 $20.55M）；全年指引维持约 **$20M**，但完全取决于 Q4 印度 C-DAC 系统能否验收。期末现金及等价物 **$497.1M，无债务**（[247wallst 综述](https://247wallst.com/investing/2026/11/13/ionq-falls-8-as-quantum-computing-stocks-slide-rigetti-drops-6-d-wave-declines-4/)）。

电话会上，CEO Subodh Kulkarni 说了两句几乎是行业自白的话：量子计算"**still very much in the R&D phase**"，以及"**我们没有任何一家能做到证明量子相对经典的 ROI**"。他给的时间表是"大约还有三年"，判据是 **1,000 个物理比特 @ 99.9% 保真度以上**（[Yahoo Finance](https://finance.yahoo.com/markets/stocks/articles/rigetti-falls-5-ceo-admits-175549839.html)）。

**D-Wave Q3**：收入 **$4.51M（+20.7%）**，毛利率从 71.4% 掉到 **52.9%**（低毛利专业服务占比上升），季度订单额 **−19%**，且不提供量化指引。

**IonQ**：Q3 数字上一期已记（收入 $173.8M、+336%，全年指引上调至 $505–515M，GAAP 净利 $563.96M 中 $896.16M 来自非现金认股权证负债收益，调整后 EBITDA 亏损 $133.61M，pro forma 现金 $37 亿）。本周的新事实是人事：**CFO Inder Singh 即刻离任**，Gary Merril（Commvault）12 月初接任，另设首席会计官由前 Juniper 高管 Thomas Austin 出任（[Invezz](https://tradingview.com/news/invezz:e83cdf469094b:0)）。收入指引刚上调一周就换 CFO，市场用 −6.4% 表达了看法。

### Q-CTRL：$290M C 轮，量子板块最新独角兽（11/12）

见 BREAKING 段。补充两个估值视角：本轮较 2024 年 10 月的 **$113M B 轮**放大 2.6 倍，**超募并两次扩容**；但收入结构里真正在卖的是**国防级量子导航（Ironstone Opal，已与 Airbus、Lockheed Martin 部署）**，不是量子计算软件。Fire Opal 通过 IBM Quantum 原生分发，是获客渠道而非现金流。

**这条值得单独拎出来**：市场愿意给"控制/纠错软件层" 10 亿美元估值，说明**价值正在从硬件比特数向软件栈迁移**；但同一笔钱买的其实是 PNT（定位导航授时），说明**当前唯一能收到现金的量子技术是传感，不是计算**。

### Gartner：D-Wave 被列为 Market Shaper（11/12）

D-Wave 宣布在 Gartner《Emerging Market Quadrant for Quantum Computing — Established Vendors》中被列为 **Market Shaper**，位于右上象限六家厂商之列（[Business Wire/Yahoo](https://finance.yahoo.com/technology/ai/articles/d-wave-named-market-shaper-120000047.html)）。这是公关性质的第三方背书，不与收入质量挂钩——同一天它的订单额在跌 19%。记录在此，不作结论。

---

## 🏛️ 政策与产业

### Atom Computing：$1 亿 CHIPS 研发奖落地（11/13）

美国商务部 CHIPS 研发办公室与 Atom Computing 签署**最高 $1 亿**的最终研发协议，用于中性原子路线的**万比特级阵列操控、寻址与性能验证**，以及供应链协同与产能放大（[NIST 公告](https://www.nist.gov/news-events/news/2026/11/department-commerce-announces-finalization-chips-rd-award-atom-computing)，[Business Wire](https://www.businesswire.com/news/home/20261113392417/en/Atom-Computing-Finalizes-%24100-Million-U.S.-Department-of-Commerce-RD-Award-to-Accelerate-Fault-Tolerant-Utility-Scale-Quantum-Computing)）。

必须讲清楚的两点：第一，这是 5 月意向书（LOI）的**落地**，不是新增的第二个 $1 亿；第二，Atom 同时是**唯一进入 DARPA 量子基准计划（QBI）Stage C 的中性原子公司，潜在资助上限 $3 亿**。

CHIPS 量子包的整体结构（$20.13 亿 / 9 家）值得记住，因为它就是未来三年美国量子硬件的资本开支地图：**IBM 量子晶圆厂 $10 亿、GlobalFoundries $3.75 亿、Atom/D-Wave/Infleqtion/PsiQuantum/Quantinuum 各 $1 亿、Rigetti 至 $1 亿、Diraq 至 $3,800 万**。注意 IBM 那 $10 亿是**建晶圆厂**——这条对半导体供应链的意义远大于任何一家初创的融资。

### 中国：两条融资线，都指向"可制造性"

**原基量子（Atomology）完成亿元级天使轮**（11/11，[36Kr](https://www.36kr.com/p/4064699766068101)）：中网投（中国互联网投资基金）与清华系慕华科创联合领投，近 10 家机构跟投。公司 2026 年 4 月成立，由图灵量子孵化，核心团队来自上海交大 IQIT。技术路线是**中性原子 + 光子芯片**：用整晶圆级**超表面光子芯片**一次性生成百万量级静态光镊阵列，配合**铌酸锂电光调制器**与飞秒激光直写三维光波导实现片上调控，**片上调制带宽已突破 110 GHz**，波导迭代周期缩到 3 天。目标是 10 万–100 万原子阵列，单比特门保真度目标 >99.99%。

**正元量子完成天使轮**（11/10，[每日经济新闻](https://www.nbd.com.cn/articles/2026-11-10/4643312.html)）：深创投、浦东创投、德宁资本等参与，资金投向**千比特超导量子计算机**研发，明确点名的三项关键技术是**三维封装、低温互连、集成测控**。创始人郑亚锐为中科院物理所博士，此前任某头部互联网公司超导量子实验室负责人。

这两条放在一起看，中国这轮量子融资的叙事已经从"比特数竞赛"转向**工程化与可制造性**——而且点名的技术节点（3D 封装、低温互连、集成测控、超表面光子芯片、铌酸锂调制器）全部落在**半导体后端与光子集成**的地盘上。

补一条产业侧的事实：本源量子的**"本源悟空-180"（单核 180 比特超导芯片）**自 5 月上线以来持续以云端方式向全球承接任务，11/11 海外媒体走访时官方口径强调"全栈自主 + 算力出口"（[腾讯新闻/中新社](https://news.qq.com/rain/a/20261112A0AIFU00)）。

### PQC：从"方向性讨论"进入"采购条款"

时间线正在收口：NIST 10 月 27 日发布《向后量子密码标准过渡》，要求联邦高价值资产与高影响系统**2030 年底前完成密钥建立环节迁移、2031 年底前完成数字签名迁移**，整体目标年 2035。本周 Quantum XChange 的 **Phio TX 成为首个获得 EUCC 认证的后量子密码管理平台**（11/14，Quantum Computing Report）。

对产业的含义很直接：**PQC 迁移在 2027 年之后会变成招标文件里的一行硬性要求**，而不是安全部门的白皮书章节。做密码硬件、HSM、TLS 卸载、网卡固件的团队，这个时间表就是产品路线图。

### SC26 明天开幕（芝加哥，11/15–11/20）

HPCwire 的展前综述把今年 SC 的量子相关看点归为"量子 + 冷却 + 供电 + 基础设施"四件套。SC26 于 **11 月 15–20 日在芝加哥 McCormick Place** 举行，展期 11/17–19（[SC26 官网](https://sc26.supercomputing.org/)）。PsiQuantum 与 AMD 表示将在 SC26 披露合作细节。下周复盘的重点：**Nighthawk r3 的时间表是否被第三方追问、PsiQuantum 的硅光良率数据、以及各家稀释制冷机的交付周期**。

---

## 🪵 投资视角

### 一、AMD 买的不是量子，是"量子旁边那台机器"

把 AMD 本周三个动作叠起来看，路径很清楚：

- **Versal FPGA** → 实时控制电子学。量子控制对抖动、延迟、通道数的要求在往 AWG + 高速 SerDes 的方向走，本质是混合信号 IC。
- **Instinct GPU** → 解码器。surface code 解码是吞吐型、可并行的负载，天生适合 GPU；ORNL 的 Umbra 就是拿 MI355X 干这个。
- **ROCm** → 软件锁定。量子-HPC 混合栈一旦长在 ROCm 上，替换成本就上去了。

这三样东西对应到半导体产业链上，是**控制 ASIC、低温 CMOS、高速互连、封装与测试**。对做 PD 的人，这是量子计算里唯一"现在就有工程量"的部分：不是 4 K 里的量子芯片，而是 4 K 外面那圈电路，和把信号从室温送进 4 K 的那根线。

### 二、主权利基正在替换商业客户——这改变估值模型

Rigetti CEO 那句"没人能证明 ROI"之所以重要，不是因为它是坏消息，而是因为它**确认了收入结构**：现阶段买家是国家级实验室、大学、研究中心。这一周的新闻全部在强化同一件事——Atom 的 $1 亿来自商务部，IBM 的 $10 亿用于建量子晶圆厂，DOE 的 Quantum Genesis 给 2028 年设了"100 逻辑比特跑 10 万次硬操作"的靶子，日本 SEAFOOD 由 JST Moonshot + Q-LEAP 买单。

**主权客户的天花板是财政预算，地板是政治意愿。** 这比商业客户的天花板低、地板高。含义：这个板块在未来两三年更像**国防/基建股**（订单可见、周期长、毛利受合同条款约束），而不是 SaaS。用 SaaS 的倍数去看它是错的，用防务股的倍数看它又忽略了硬件成本曲线——市场现在正在这两套模型之间来回摇摆，这就是本周 −10% 到 −18% 的真正成因。

### 三、中国供应链里两个"PD 可参与"的卡位

- **正元量子点名的三件事**：三维封装、低温互连、集成测控。这正是先进封装（2.5D/3D、TSV、bumping）+ 低温电子（cryo CMOS、超导互连）+ 自动化测试（多通道 AWG/数字化仪）的交叉地带。国内做先进封装与测试设备的厂商，第一次被量子初创在融资稿里点名。
- **原基量子点名的三件事**：超表面光子芯片、铌酸锂电光调制器（110 GHz 带宽）、飞秒激光直写三维光波导。这条链对应的是**硅光/薄膜铌酸锂代工 + 光子封装（光纤阵列、光耦合）**，与数据中心光模块的供应链高度重叠。

共用环节依然是最确定的：**稀释制冷机**（国盾量子 10/22 对中电信量子的 ¥6,477 万合同里明确包含稀释制冷机、低温器件与信号传输系统）、**微波/激光源**、**高密度线缆与低温同轴**。这些不需要量子比特成功也能收钱。

### 四、本周该记住的三个数字

- **−41%**：QNT 现价相对 6 月 IPO 定价 $60 的跌幅。最大量子 IPO 的破发幅度，是板块估值讨论的锚。
- **0.05**：Cornell 实验里目标模式的平均声子占据数。离子阱的门保真度上限，最终由这种"多冷"决定，而不是由激光功率决定。
- **$497.1M / 零负债**：Rigetti 的现金。它大约能撑 4–5 年（按当前季度营业亏损 $33M 计），这解释了为什么一家收入 $1.41M 的公司还没有融资压力——**这个板块现在比的不是谁先赚钱，是谁先烧完**。

### 五、下周观察清单

1. **SC26（11/15–11/20）**：PsiQuantum–AMD 细节、Nighthawk r3 交付口径、制冷机交付周期。
2. **IBM Starling 进度**：r3 的 520 比特与"1,000+ 比特互联"之间的工程差距，是 2027 能不能兑现的关键。
3. **QNT 锁定期与订单簿**：上市五个月跌 41% 后，机构持仓变化比任何技术新闻都有信息量。
4. **中国 IPO 窗口**：本源量子（辅导已出四期报告）、玻色量子、图灵量子的进度，会决定 A 股量子板块的定价锚。

---

## 未采用 / 存疑

- **IBM Nighthawk r3 全部为路线图口径**：520 比特 / 10,000 ops、2027 年 1,000+ 比特均为计划，无第三方实测数据；r2 的 "100,000 samples/s" 亦为厂商口径。
- **QXL 的 2030 年 99.999999% 门性能**与 800 逻辑比特目标，没有任何中间验证节点支撑，按融资材料对待。
- **QXL 的"20% 解码失败降低"** 是在 IBM 公开数据集上的**后处理**结果，非实时解码，非自家硬件。
- **AMD 对 PsiQuantum 的股权投资金额未披露**，所有"规模"推测均无来源，本文不作估算。
- **Q-CTRL $10 亿估值**来自 Bloomberg 报道，Q-CTRL 官方稿只说"独角兽"级未给具体数。
- **Toshiba 英国量子网络合同（BT、Colt）** 本周有 TechRepublic 等二次报道，但核心合同最早在上期（11/6 英国量子技术展示会）已记录，本期不重复计入"新事件"。
- **本源悟空-180 的"算力出口"** 为媒体走访口径（中新社），未见商务合同细节。

## 相关

- [[weekly-reports/quantum-computing-2026-11-08]] — 上一期：古典算力进入纠错机柜
- [[weekly-reports/quantum-computing-2026-11-01]] — 上上期
- [[concepts/quantum-error-correction]] — 纠错主线
- [[concepts/quantum-hpc-integration]] — 量子-HPC 融合
- 本期来源归档：[[raw/weekly/quantum-computing-2026-11-15-sources]]

— Youmoo（㕛木）

*Solid as teak.*
