---
layout: post
title: "量子计算周报 2026.10.19–10.25：纠错跨过阈值，股价跌掉三成"
date: 2026-10-25 20:30:00 +0800
description: "Quantinuum Helios 逻辑保真度 99.9995%、Google 魔法态培养 40 倍降错，量子纠错两周内两破纪录；同期量子纯玩股一个月跌 26–33%。技术曲线与股价曲线的背离，是本周最值得读的一张图。"
tags: [quantum-computing, 量子计算, 周报, 量子纠错, Quantinuum]
---

这周量子计算行业出现了一个很典型的错位：实验室里两个纠错纪录接连被打破，资本市场上同类公司的股价却在过去一个月里跌掉了四分之一到三分之一。两条曲线朝相反方向走，而它们本来应该讲同一个故事。

先把事实摆清楚。

## 🔬 技术突破

### Quantinuum Helios：逻辑保真度 99.9995%，每百万次操作错 5 次

10 月 19 日，Quantinuum（NASDAQ: QNT）宣布在商用机 Helios 上实现 **逻辑保真度 99.9995%**——等价于每百万次操作只出 5 个逻辑错误。配套论文当天上 arXiv（[2610.24077](https://arxiv.org/abs/2610.24077)），作者包括 Ali Lavasani、Adam P. Reed、Matteo Puviani 等。

具体配置值得逐个看清楚，因为媒体标题只报了最好看的那一个数：

- **编码**：三角 color code，distance **d = 3、5、7** 三档
- **逻辑错误率**：低至 **5 (+4/−2) × 10⁻⁶**（内存/闲置场景）
- **距离缩放因子**：**Λ = 12 (+3/−2)**——每加一档编码距离，逻辑错误率掉一个数量级以上。这是"真正跨过阈值"的判据，不是单点最优值
- **门级更诚实的那组数**：在 Clifford 双比特随机基准电路下，d=5 时每个逻辑双比特 Clifford 的错误率是 **7 (+3/−3) × 10⁻⁵**，缩放因子 **Λ = 9 (+3/−8)**
- **解码**：CNN 与 transformer 解码器，实时解码速度比 syndrome extraction 速率**快一个数量级**
- **对比基准**：比 Quantinuum 自己 9 月创下的纪录再降 10 倍；比 Google 在超导体系上已发表的最好结果低 100 倍

这里有个工程师应该盯住的细节：**5×10⁻⁶ 和 7×10⁻⁵ 之间差了一个数量级以上**。前者是内存（让逻辑比特待着不动），后者才是有门操作时算法真正吃到的错误率。宣传口径取前者，工程量取后者。两者都是世界纪录，但别把 99.9995% 直接当成"能跑算法了"。

Quantinuum 自己的说法是把这组结果作为 Apollo（通用容错机，2029 年）的验证，CEO Rajeeb Hazra 对 WSJ 的原话是"We have the world's lowest error rate and the most efficient way to do it"（[WSJ 报道](https://markets.businessinsider.com/news/stocks/quantinuum-sees-fault-tolerant-quantum-computing-by-2029-wsj-reports-1036640044)）。外部评价来自 Sandia 量子性能实验室联合主任 Robin Blume-Kohout：一个逻辑比特比它的物理比特好近 100 倍，"把这些发现往前推，可以retire掉这个领域最核心的技术风险之一"。

### Google：魔法态培养首次上硬件，错误降 40 倍

严格说这是 10 月 15 日的事，落在上周窗口边缘，但它是本周所有报道的背景板。Google Quantum AI 在 Willow 上首次硬件演示 **magic state cultivation**，成果发在 Science（[论文](https://www.science.org/doi/10.1126/science.aee7961)，[官方博客](https://blog.google/innovation-and-ai/models-and-research/quantum-computing/magic-state-cultivation-quantum-computing)）：

- **错误降低约 40 倍**，T-state 逻辑保真度 **99.99%**
- 用了 **54 个物理比特**（Willow 共 105 个）
- 从 distance-3 color code **graft** 到 distance-5 surface code，证明纯化后的态能转移进更大编码
- 代价：**只有 8% 的尝试通过了全部校验**，92% 被丢弃

为什么这事重要：魔法态是 non-Clifford 门（T 门）的燃料，而传统蒸馏法可能吃掉整台机器 **95%** 的容量。培养法把这个开销打了个数量级下来。但 Duke 量子中心 Kenneth Brown 提醒的那句更值得记：判据是"不合格就扔掉"，所以 92% 的算力在做无用功——这是良率问题，不是物理问题。

对照着读，10 月 22 日 arXiv 上还有一篇 [The limits of magic-state distillation](https://arxiv.org/abs/2610.31115)，以及 10 月 14 日 Hirasaki 与 Lee 的 [Logical CCZ state cultivation](https://arxiv.org/abs/2610.20591)（中性原子 BT/BB 码，**输出 infidelity 4.10×10⁻⁷，接受率 8.89%**）。同一个赛道上，工厂化生产魔法态正在从理论变成工艺流程设计题。

距离实用还有多远？Google 自己的口径：模拟分子需要 10⁻⁶ 到 10⁻⁸，破解 RSA-2048 需要 10⁻¹⁰。现在 10⁻⁴。差两到六个数量级。

### IBM 的对照组：云上 surface code，Λ 只有 1.68

同一周，一篇不那么好听但更有信息量的论文：IBM Nighthawk r2 处理器上的旋转 surface code 内存实验（[arXiv:2610.23840](https://arxiv.org/abs/2610.23840)，作者 Shuwen Kan 等，非 IBM 官方团队）。

- 优化读出（短读出、测量-复位融合、ancilla 读出期间对数据比特加 XX echo）后，每轮逻辑错误率中位数改善 **X 基 3.8 倍、Z 基 1.4 倍**
- 距离从 3 提到 6（另一维固定）：每轮逻辑错误率 **0.53% → 0.24%（Z 内存）、0.52% → 0.22%（X 内存）**
- 对应的抑制因子只有 **1.68 和 1.85**
- 跑到 150 轮时距离优势开始衰减，出现长寿命关联误差

这就是大多数硬件现在的真实水平：**Λ ≈ 1.7**，而跨过阈值、能指数压制错误需要 Λ 明显大于 1 且稳定。Quantinuum 的 12 和 IBM 的 1.7，就是这周最重要的一组对照数字。任何声称"2026 年底实现 quantum advantage"的时间表，都得先解释自己怎么把 Λ 从 1.7 推到两位数。

### 超导退相干的锅，可能得由材料背

还有一篇对做 backend 的人特别有味道：[Superconducting circuits host two-level systems with lifetimes exceeding one second](https://arxiv.org/abs/2610.21853)（10 月 15 日）。用宽带量子跳跃关联谱在可调谐 transmon 上找到了寿命**超过 1 秒**的寄生两能级系统（TLS）——比比特本身长几个数量级，耦合强度在 kHz 量级，与标准隧穿模型描述的位形缺陷一致。

翻译一下：超导比特的退相干，有相当一部分不是"控制没做好"，而是芯片上某些微观缺陷在那里慢慢晃。这类长寿命 TLS 正是造成时间关联误差、让纠错在长轮次里失效的元凶之一——和上面 IBM 那篇"150 轮后距离优势衰减"能对上。

## 💰 资本市场

先把价格摆出来（收盘价，Yahoo Finance）：

- **IONQ**：周 30.78 → 31.27（**+1.6%**）；但一个月前 44.98，**一个月 −30%**
- **QNT**（Quantinuum）：周 34.93 → 36.50（**+4.5%**）；一个月前 49.39，**一个月 −26%**
- **RGTI**：周 11.67 → 11.52（**−1.3%**）；一个月 −30%
- **QBTS**：周 11.83 → 11.66（**−1.4%**）；一个月 −33%
- **QUBT**：周 6.42 → 6.56（**+2.2%**）；一个月 −28%
- 同期标普 500：−0.9%

本周板块其实是横盘微涨、跑赢大盘的；真正的事故发生在 10 月前两周。

**最值得记的一天是 10 月 19 日。** Quantinuum 早上 8 点发全球纪录，当天股价收跌 **4.4%**，两天后的 10 月 21 日才涨回 **8.3%**。市场对"世界最低逻辑错误率"的反应是：先卖，再想。

下跌的传导链条比较清楚：

- **10 月 14 日** IonQ 宣布以最高 **13 亿美元**股票收购网络安全公司 Elisity，紧接着定价 **20 亿美元**股权融资（普通股 + 预资权证，单一机构买家，行权价 40 美元）。当天 IONQ −9.5%，QBTS −10.1%，QNT −10.2%，RGTI −8.6%
- **10 月 16 日** 通胀数据超预期叠加稀释恐慌，IONQ −8.9%、QBTS −8.1%、QUBT −7.0%
- **10 月 20 日** Barron's 报道 IBM 与 Rigetti 双双警告行业将迎来洗牌（[Barron's](https://www.barrons.com/)）
- 顺带被翻出来的老账：Motley Fool 统计过去五年（2021-10 至 2026-10）四家纯玩公司的内部人**净卖出 10.2 亿美元**——IonQ 5.77 亿、D-Wave 3.31 亿、Rigetti 0.83 亿、QUBT 0.34 亿（[TipRanks/BI](https://markets.businessinsider.com/news/stocks/ionq-rigetti-d-wave-insiders-sold-1-billion-more-than-they-bought-1036645371)）

基本面并非没有东西：IonQ 二季度收入 8000 万美元、同比 **+287%**，2026 全年指引上调到 **2.8–2.9 亿美元**。但 Rigetti 季度收入不到 1000 万美元对上千亿市值这种搭配，撑不住估值。稀释 + 内部人减持 + 收入基数太小，三件事叠在一起，任何技术利好都会被当成出货窗口。

**下一个催化剂：IonQ 三季度财报，11 月初。** 这份财报比任何纠错论文都更能决定板块方向。

## 🏛️ 政策与产业

### 美国 DOE：Quantum Genesis Q 竞赛本周截止

**10 月 19 日**是 DOE Quantum Genesis「Q Competition」的申请截止日（[RFA DE-FOA-0003657](https://science.osti.gov/-/media/grants/pdf/foas/2026/DE-FOA-0003657.pdf)）。规模和门槛都值得记住：

- 总额 **2.15 亿美元**，覆盖前 30 个月
- 目标：**≥100 个逻辑比特**、能跑数亿次容错操作的科学相关量子计算机（SRQC）
- 结构：Phase I 技术方案通过给 25 万、原型里程碑给 125 万；Phase II **1 亿美元**激励池在 2028 年 9 月评估后平分；另有 **5000 万**（≥150 逻辑比特）和 **5000 万**（≥200 逻辑比特）两个 bonus 池
- 预期选出 3–10 家，DOE 口径的初步名单公布时间**不早于 11 月 13 日**

这条对投资判断的意义：美国政府第一次用"逻辑比特数"直接给钱定价，而不是按物理比特或论文数量。100 个逻辑比特在 Λ=12 的体系上是什么概念，可以自己算。

配套的还有 10 月 15 日 DOE ARPA-E 的 **QC3 计划**：**3700 万美元**分给 10 个团队、为期三年，目标是在约 **100 个逻辑比特**上实现相较经典计算 **100 倍**加速，且强制要求申请方与硬件厂商绑定。QuEra 成为 LBNL、LLNL、Phasecraft 三家非硬件主承包商的独家 QPU 合作方（[QCR](https://quantumcomputingreport.com/doe-arpa-e-launches-37-million-qc3-program-across-ten-quantum-chemistry-performers/)）。

### 纽约州：3.6 亿美元州级投入 + IBM 10 亿美元 Albany 产能

10 月 23–24 日，纽约州经济发展厅（ESD）发布量子技术格局研究，确认州级量子专项拨款 **3.671 亿美元中 3.6 亿（98.1%）落在 FY2027 预算**：

- **3 亿美元**投给石溪大学（Stony Brook）量子研究与创新中心，SUNY 建设基金计划在 SFY 2028/29 动工
- **6000 万美元**建最多 4 个区域量子技术商业化中心（每个最高 1500 万，NYSTAR 主管，10 月 14 日申请截止）
- 研究测算：到 2036 年合计带来 **23 亿–50 亿美元**总产出、**7200–10100 个就业年**
- 联邦与私人侧同期承诺约 **13.7 亿美元**，其中 IBM 在 Albany 的 **10 亿美元**投资是大头（[ESD 报告 PDF](https://esd.ny.gov/sites/default/files/media/document/Appendix-J-NY-Quantum-Funding-Quantum-Technology-Landscape-Study-NYS.pdf)、[地方政府报道](https://www.fingerlakes1.com/2026/10/24/quantum-study-highlights-cornell-rochester-strengths-as-new-york-plans-360m-investment)）

州级政府用"产业园区 + 商业化中心"的方式下注，而不是直接采购机器。这条路径对设备与材料供应商的意义大于对量子计算公司本身。

### 韩国：全国量子通信试验床，三年 74 亿韩元，接到新加坡

10 月 21 日，韩国科学技术信息通信部（MSIT）与 NIA 启动「开放量子试验床升级扩建项目」，2026 年首年投入 **74 亿韩元（约 560 万美元）**，其中政府 37.5 亿、民间 36.5 亿，三年铺到 2028 年：

- **A 段（商业枢纽，KT 承建）**：以大田为中心，2026 年通大邱，2027 年通光州、釜山，2028 年通首尔—春川
- **B 段（海外枢纽，SK Broadband 承建）**：跨境对接**新加坡、波兰、保加利亚**的试验床，国内段用 QKD、国际长距段用 PQC 混合架构
- **C 段（未来枢纽，KT 承建）**：无线 QKD 距离从 **4.8 km 拉到 15 km**，并验证多点纠缠分发（[QCR](https://quantumcomputingreport.com/south-korea-launches-nationwide-open-quantum-testbed-expansion-led-by-kt-and-sk-broadband)、[Sedaily](https://en.sedaily.com/technology/2026/10/21/korea-expands-quantum-communications-testbeds-to-three-hubs)）

钱不多，但结构值得看：**多厂商互操作验证**被写成了项目目标——这是采购标准化的前奏。对国内 QKD 设备商（QuantumCTek、国盾系）来说，新加坡节点是潜在出海接口。

### 其他本周动向

- **IBM** 公布日本 NEDO Challenge 支持项目（10 月 23 日，[IBM 博客](https://www.ibm.com/quantum/blog)）
- **德国 QSolid** 展示本土量子计算技术成果（10 月 23 日，HPCwire）
- **IQM + Telefónica** 计划在马德里大学部署量子计算机（10 月 23 日）
- **ZuriQ + Rhonexum** 签署低温电子学合作协议（10 月 22 日）——这条是供应链信号，下面展开
- **FPT + 尼尔斯·玻尔研究所**合作推进越南与丹麦量子研究与人才培养（10 月 24 日）
- **Google** 发起 **15 万美元** AI 竞赛（Kaggle），用 AI 降低量子计算资源需求（10 月 23 日）
- **中国**：10 月 9 日中共中央、国务院《关于发展新质生产力的意见》把量子技术与 AI、集成电路并列写进 15 五规划框架；上海 Taiyi Quantum（镱中性原子）累计融资超 **1.4 亿美元**；Origin Wukong 72 比特机上演示相干量子路由器（[PRX](https://doi.org/10.1103/h5m3-qrn9)）；九章 4.0 高斯玻色采样探测 **3050 个光子**

## 🪵 投资视角

把本周的技术细节翻译成产业链语言，我认为有三条线值得盯。

### 一、实时解码：量子计算的第一块"网卡"

Quantinuum 那篇论文里被忽略的一句话是：他们的 CNN/transformer 解码器实时解码速度**比 syndrome extraction 速率快一个数量级**。这不是软件优化，这是硬约束——解码器跟不上测量速率，纠错就退化成延迟，逻辑比特的错误率会直接吃掉 Λ 带来的所有收益。

这意味着量子计算的价值正在往**控制与读出电子学**迁移，跟 AI 集群里价值往网络和交换迁移是同一个模式。本周两条旁证：

- **Qblox** 宣布把 NVIDIA DGX Spark 集成进量子系统控制器（10 月）
- **ZuriQ 与 Rhonexum** 签低温电子学合作（10 月 22 日）——把控制电路往 mK 级冷区里塞，减少从室温到冷区的线缆数量

工程上的必然结果：比特数上去以后，同轴线缆的**热负载**会成为硬墙。要么把控制电子学降温（cryo-CMOS，需要先进工艺节点但功耗预算极紧），要么上**光互连/微波光子**读出。这两条都需要代工厂配合，也需要封装工艺（硅光中介层、超导凸块、TSV）。这是 PD 工程师能直接切进去的位置。

### 二、超导路线的瓶颈正在从"控制"转向"材料与良率"

前面那篇 TLS 寿命超过 1 秒的论文，加上 IBM 那篇"150 轮后距离优势衰减、出现长寿命关联误差"，指向同一件事：**当前超导体系的天花板更多是芯片制造洁净度与界面缺陷，而不是微波控制精度**。

这对产业链的含义很直接——钱会流向两处：

- **材料与工艺**：低损耗衬底（蓝宝石、高阻硅）、氮化钽/铌的界面工程、超导结的氧化层控制。这类东西的价值不在"量子概念"，在薄膜沉积的均匀性和界面态密度
- **封装**：倒装焊、硅通孔、超导凸块、多芯片模块。1000 比特以上必然走向 chiplet 化 + 三维集成，这和先进封装的路线图是重合的

同一逻辑也适用于 Google 的魔法态数据：92% 的尝试被丢弃，等于良率只有 8%。工厂化生产魔法态本质上是**吞吐率与良率的权衡**，跟晶圆厂的思路一模一样。谁把这块做成一门可预测的制造工艺，谁就拿到了容错机的产能钥匙。

### 三、离子阱赢在保真度，但代价在光学

Quantinuum 的路线优势很清楚：全连接（all-to-all）+ 高保真物理门 + 灵活换码，同一台商用机上两个月内用两种不同 code 连破纪录。这套东西的符号是"少比特、高保真"——Sandia 的评价是"不到一百万物理比特就能达到有用的可靠性"。

但代价落在光学系统上：离子阱的每一次门操作、每一次读出都要激光。全连接省了布线，省不了**激光通道数、稳频、光路对准、调制器**。所以离子阱路线的产业链受益方是激光器、声光/电光调制器、光纤开关和光学封装，而不是稀释制冷机。QNT 的产能爬坡会直接体现为这些器件的采购量。

### 关于估值的冷思考

这周最该写下的一句话：**纠错纪录和股价之间的关系，目前是负相关甚至无关的。** Quantinuum 在全球纪录发布日跌 4.4%，整个板块一个月蒸发四分之一到三分之一，而技术指标是实打实往前走的。

这不是说市场错了。市场在定价的是：这些公司什么时候产生与市值匹配的收入。一家季度收入不到 1000 万美元、市值几十亿美元的公司，即使拿到世界纪录，也改变不了分子分母的差距。技术里程碑改变的是"能不能成"，估值定价的是"什么时候赚钱"，两者时间尺度差 5–10 年。

所以本周的合理动作不是"因为纪录买入"，而是把注意力放在三个可验证的变量上：

1. **IonQ 三季度财报（11 月初）**——收入指引 2.8–2.9 亿美元能不能兑现，以及 20 亿美元融资后的现金消耗节奏
2. **DOE Q Competition 名单（不早于 11 月 13 日）**——谁被选中，等于谁拿到了 100 逻辑比特的政府认证。这是一次免费的第三方技术尽调
3. **Λ 的公开数字**——以后看到任何量子公司发纠错成果，先找两个数：distance 缩放因子 Λ，和门级（不是内存级）逻辑错误率。Λ < 2 的别当突破看，门级比内存级差一个数量级的要打折听

至于中国这边，产业逻辑与美股完全脱钩：政策已经写进 15 五规划，钱从地方政府和国资走（Taiyi 十个月融 10 亿人民币），退出路径是科创板和北交所而不是纳斯达克。想参与的话，标的应该是**低温设备、激光器、微波器件、精密测量**这些卖铲子的，而不是"量子概念"四个字本身。

---

**本周关键信源**

- Quantinuum 官方稿：[PR Newswire](https://prnewswire.com/news-releases/quantinuum-breaks-error-correction-world-record-by-10x-validating-its-leading-path-to-fault-tolerant-quantum-computing-by-2029-302912631.html) / [The Quantum Insider](https://thequantuminsider.com/2026/10/19/quantinuum-reports-a-10x-reduction-in-logical-error-rate-on-helios)
- 论文：[arXiv:2610.24077](https://arxiv.org/abs/2610.24077)（Helios color code）、[arXiv:2610.23840](https://arxiv.org/abs/2610.23840)（IBM Nighthawk surface code）、[arXiv:2610.21853](https://arxiv.org/abs/2610.21853)（TLS 寿命 >1s）、[arXiv:2610.20591](https://arxiv.org/abs/2610.20591)（CCZ cultivation）
- Google：[官方博客](https://blog.google/innovation-and-ai/models-and-research/quantum-computing/magic-state-cultivation-quantum-computing) / [Science](https://www.science.org/doi/10.1126/science.aee7961)
- 媒体解读：[Ars Technica](https://arstechnica.com/science/2026/10/quantum-error-correction-goes-well-beyond-breakeven) / [Science News](https://www.sciencenews.org/article/quantum-computer-megaquops-error-correction) / [New Scientist](https://www.newscientist.com/article/2594366-error-correction-record-pushes-quantum-computers-closer-to-usefulness)
- 政策：[DOE Q Competition RFA](https://science.osti.gov/-/media/grants/pdf/foas/2026/DE-FOA-0003657.pdf) / [ARPA-E QC3](https://quantumcomputingreport.com/doe-arpa-e-launches-37-million-qc3-program-across-ten-quantum-chemistry-performers/) / [纽约州报告](https://esd.ny.gov/sites/default/files/media/document/Appendix-J-NY-Quantum-Funding-Quantum-Technology-Landscape-Study-NYS.pdf) / [韩国试验床](https://thequantuminsider.com/2026/10/21/korea-expands-quantum-communications-testbeds-three-hubs)
- 资本市场：[TIKR 板块异动](https://www.tikr.com/blog/ionq-sinks-3-rigetti-down-5-d-wave-down-4-as-quantum-stocks-slide-again-in-tech-selloff) / [内部人减持统计](https://markets.businessinsider.com/news/stocks/ionq-rigetti-d-wave-insiders-sold-1-billion-more-than-they-bought-1036645371)

一句话收尾：这周量子计算证明了纠错能跨过阈值，也证明了跨过阈值不等于赚钱。两件事同时为真，才是这个行业的真实状态。

— Youmoo（㕛木）
*Solid as teak.*
