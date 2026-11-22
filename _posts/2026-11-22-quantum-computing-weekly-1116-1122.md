---
layout: post
title: "量子计算周报 2026.11.16–11.22：纠错开始省比特，估值开始还债"
date: 2026-11-22 20:30:00 +0800
description: "Google 以 105 比特在 Science 封面验证上下文性；两篇 Nature Physics 把自动纠错推过盈亏平衡点；qLDPC 魔法态工厂省 10–40× 时空成本；量子板块单周跌 21–32%，QNT 锁定期 12 月 1 日到期。"
tags: [quantum-computing, 量子计算, 周报, error-correction, google, qldpc, neutral-atoms, market, supply-chain]
---

# 量子计算周报（2026-11-16 ~ 2026-11-22）

> 窗口：2026-11-16 → 2026-11-22。数据源：Layer 1 采集器 `~/.hermes/data/quantum_feed.json`（arXiv quant-ph / Google News 综合 / Quantum Insider）+ 期刊页、公司新闻稿、SC26 公告、Yahoo Finance 收盘价。**本期无硬触发 BREAKING**（无 Willow 级纠错里程碑、无 >$5 亿单笔融资、无单日 >20% 个股波动）。但两条线索都走到了阶段性拐点：**技术侧第一次把"纠错省下来的比特"算成账，资本侧第一次把"叙事溢价"退回去**。全部来源见 `raw/weekly/quantum-computing-2026-11-22-sources.md`。

**本周主线：纠错的经济学开始成立，估值的经济学开始清算。**

技术侧三件事指向同一个方向——纠错不再只是"证明能纠"，而是开始回答"要花多少比特、多少时间、多少解码带宽"：Google 在 Science 封面把上下文性推到 105 比特；两篇 Nature Physics 用耗散工程把逻辑比特寿命推过盈亏平衡点，全程不测量、不反馈；Harvard/QuEra/Caltech 的 qLDPC 魔法态工厂把非 Clifford 资源的时空成本砍掉 10–40 倍。

资本侧只有一件事：**这是 2025 年 4 月关税崩盘以来美股最差的一周**。SPY −8.6%、纳指 −10%、SMH −17.8%、NVDA −22.9%，量子板块跌得更多（−21% 到 −32%），但这次不是量子被单独针对——是整个 AI 资本开支叙事在重新定价。区别在于，量子公司没有盈利可以接住下跌。

---

## ⚠️ 板块警报（非 BREAKING 级）：一周 −21% 到 −32%，且没有基本面触发器

收盘价（11/20，Yahoo Finance）：

- **IONQ $20.72（周 −28.3%）**
- **RGTI $7.16（周 −25.6%）**
- **QBTS $6.52（周 −31.8%，11/19 创 52 周新低）**
- **QUBT $4.40（周 −20.9%）**
- **QNT $27.74（周 −21.6%，较 6 月 IPO 定价 $60 低 53.8%）**

参照物：**SPY −8.6%、QQQ −10.5%、SMH −17.8%、NVDA −22.9%、AMD −20.5%、IBM −9.2%**（[Investopedia 盘面复盘](https://investopedia.com/stock-market-today-dow-jones-s-and-p-500-nasdaq-11202026-12266027)）。

崩的方式很具体：11/18 公布的 10 月 FOMC 纪要显示委员会内部支持**12 月加息 25bp**，Waller 甚至提到 50bp；10 年期美债收益率维持在 5.0% 附近；11/19 Anthropic 完成史上最大 IPO，次日跌约 13%；11/20 路透爆出 NVDA 会计问题被 SEC 调查，NVDA 单日 −14%（[CNBC](https://cnbc.com/2026/11/20/sp-500-correction-market-sell-off.html)）。**利率与 AI 融资成本同时上行，最先被打的是"利润在 2030 年"的资产**——量子和 AI 基础设施坐在同一条船上，只是量子没有现金流做缓冲。

对量子板块，这一周的关键事实不是跌幅，而是**跌幅与公司进展完全脱钩**：IONQ 11/5 刚把全年指引上调到 $505–515M，QNT 11/5 刚交出收入 +233% 的季报，两家照跌 20% 以上。市场卖的是久期，不是业绩。

---

## 🔬 技术突破

### 一、Google：上下文性（contextuality）在 105 比特上活下来了（11/19，Science 封面）

Google Quantum AI 与合作者在 **Science 封面**发表的结果，把"上下文性"这个量子力学里比纠缠更抽象的性质，第一次做到了芯片规模（[Google 官方博文](https://blog.google/innovation-and-ai/models-and-research/quantum-computing/putting-one-of-quantum-mechanics-deepest-features-to-test-at-scale)，[The Quantum Insider](https://thequantuminsider.com/2026/11/19/googles-quantum-chip-beats-classical-limits-in-tests-of-teamwork/)）。

三个实验，三种规模：

- **4 比特 magic square 博弈**：Willow 上的胜率 **98.3%**，经典策略上限 **88.9%**。九种分配各跑 10 万次。这个游戏的妙处是经典上限是数学定理，不是工程估计。
- **上下文性见证**：双比特测量序列 + 第三比特记录，经典非上下文模型上限 4，理想量子值 6，实测 **5.59**。缺口被归因于实验误差——这个数字其实比胜率更有信息量，它量化了"距离理想量子行为还差多少"。
- **71 比特 GHZ 博弈**：胜率一直高于经典上限到 71 个"玩家"，边际随比特数收窄；另用 45 比特验证了**真正的多体纠缠**。
- **105 比特二维 hidden linear function**：超过一半的采样返回有效解。但注意，这一项的经典基准依赖一个**未经证明的猜想**，所以"优势有多大"是开放问题——论文自己也没给数。

为什么它重要：上下文性是某些量子算法优越性的理论来源。把它做成可测的硬件指标，等于给"这台机器到底有多量子"提供了一个**不依赖具体应用的 benchmark**。而且它顺带能暴露传统随机基准测不出的关联错误——对做纠错的人是实用工具，不是哲学讨论。

### 二、两篇 Nature Physics：不用测量、不用反馈，自动纠错过盈亏平衡点（11/16）

同一天上线的两篇论文，用不同硬件做了同一件事：**用耗散工程（engineered dissipation）代替"测量 + 实时反馈"，让逻辑比特活得比同系统最好的物理比特更久**（[论文一](https://www.nature.com/articles/s41567-026-03493-z)，[论文二](https://www.nature.com/articles/s41567-026-03528-5)，[技术综述](https://xenospectrum.com/en/autonomous-quantum-error-correction-break-even-superconducting-cavities)）。

- **Ni / Hu / Yu 组**：3D 超导微波腔 + transmon 辅助比特 + 有损带状线，最低阶 binomial code，专门对抗单光子丢失。逻辑寿命 **~2.0 ms**，是同芯片最佳物理比特（Fock 态）的 **1.18 倍**，是未纠错 binomial code 的 3.3 倍、transmon 的 15 倍。顺带做了计量学验证：频率移动测量拿到 **6.3 dB** 的增益。
- **Sun / Luyan Sun 组**：同样 binomial code 编码在长寿命玻色模里，但熵转移路径不同——先相干映射到辅助比特 Y1，swap 到远端 Y2，再用拉曼重置把熵耗散掉。每轮含 220 µs 自由演化，20 轮后逻辑寿命 **1,627 µs** vs 最佳物理比特 1,565 µs，**1.04 倍**。

冷水：+18% 和 +4% 都只是"刚过线"。对比 Quantinuum Helios 上个月那个逻辑保真度 99.9995%（Λ≈12）——那是有测量反馈的主动纠错。**自动纠错的真正卖点不是性能，是控制开销**：没有中途测量、没有实时解码、没有 µs 级反馈回路，也就意味着不需要那套最贵的低温控制电子学。这是"用物理换工程"的路线，和 Google/IBM 用解码器堆算力的路线是两种不同的成本结构。

对做后端的人，这句话是关键：**主动纠错的瓶颈正在从量子芯片转移到控制与解码硬件；自动纠错则试图把这个瓶颈搬回材料和微波工程。** 两条路谁先到规模，决定未来五年量子系统的 BOM 长什么样。

### 三、JPMorgan + Quantinuum：第一次用全容错组件跑完整个算法（11/19，PRX）

JPMorganChase 全球技术应用研究与 Quantinuum 的团队在 **Physical Review X** 发表：在离子阱机器上，用**最高 97 个物理比特**、**全部由容错组件构成**的流程，完整执行了两个量子算法（[PRX 16, 041048](https://journals.aps.org/prx/abstract/10.1103/gnq3-c2df)）。

三个此前没有人同时做到的细节：

1. **端到端**：不是单独验证某个逻辑门或逻辑内存，而是完整算法——包含 T 门、魔法态、格点手术（lattice surgery）、中途读取。
2. **中途纠错**：计算过程中主动纠正错误，而不是算完再后处理。
3. **自动重试**：失败步骤可自动重跑，且这确实提升了算法成功率。

性能上"接近但未超过"未纠错版本——即**接近 break-even**。这个措辞很重要：它的意思是纠错的开销已经快被收益抵掉了，但还没到。上一期 Rigetti CEO 说"没人能证明量子相对经典的 ROI"，这一篇说的是"容错相对非容错的 ROI 快打平了"。两个 ROI 不是一回事，别混。

### 四、qLDPC 的魔法态工厂：把非 Clifford 成本砍 10–40 倍（11/21 报道，arXiv 预印本）

Harvard、QuEra、Caltech、UMD、MIT 的团队给出一个针对**高码率 qLDPC 码**的容错魔法态工厂设计：3D balanced-product tricycle 码负责并行生成非 Clifford 态，4D balanced-product quadcycle 码（由 AI 辅助代数搜索找到）负责单次（single-shot）制备与纠错（[Quantum Computing Report](https://quantumcomputingreport.com/harvard-quera-and-caltech-design-single-shot-magic-state-factories-for-quantum-ldpc-codes-with-10-40x-lower-overhead/)）。

在电路级噪声 p=10⁻³ 下对比（每输出一个 |CCZ⟩ 的时空体积）：

- **d=3**：2 个 |CCZ⟩，错误率 1.2×10⁻⁵，**4.3×10³** vs surface code 培养 8.04×10⁴ / color code 1.628×10⁵
- **d=4**：8.6×10³ vs 8.38×10⁴（约 10×）
- **d=5**：6.7×10⁴ vs color code 2.286×10⁶（约 34×）

实现上靠两件事：tricycle 码的距离不对称用**一个 Rydberg 脉冲完成横向 CCZ**（distance-2 重复扇出），再用深度 1 的同态 CNOT 把九比特超图态传送到 quadcycle 块；quadcycle 码在两个 Pauli 基上都有冗余元校验，因此支持常数深度单次纠错。映射到可重构中性原子阵列只需 **33 个阵列遍历步**。

这是纠错领域最"IC"的一类工作：它不谈物理，只谈**资源预算**——比特数、时间步数、原子搬运次数。10–40 倍的时空成本差距，直接决定一台机器是"一柜子"还是"一个机房"。

### 五、QuEra/NERSC：180 比特上的非平衡相变，以及它为什么值得看（11/18）

QuEra 与 Berkeley Lab/NERSC、Harvard、BU 用 Aquila（⁸⁷Rb 中性原子，经 Amazon Braket）在 **1D 52 原子、2D 180 原子**阵列上做量子淬火，观测到 prethermal 稳态、共振熔化，以及在二维出现**没有平衡态对应物的第一类动力学相变**（[Nature](https://www.nature.com/articles/s41586-026-11225-9)，[TQI](https://thequantuminsider.com/2026/11/18/quera-berkeley-lab-study-quantum-dynamics-aquila)，[QCR](https://quantumcomputingreport.com/quera-computing-and-lawrence-berkeley-national-lab-observe-prethermal-dynamical-phase-transitions-on-180-qubits-in-nature-study)）。

论文 11/4 见刊，本轮是联合发布。它的价值不在"180 比特"——比特数在这个方向不是稀缺品——而在于**量化方法**：用广义 Clausius–Clapeyron 关系去检验一个非平衡相变，跳变比与边界斜率两个独立量给出一致结果，并且随系统尺寸收敛。这是把模拟量子模拟器从"看现象"推到"测指数"的样子。

### 六、应用侧：123 比特 QUBO 在 IBM Heron r3 上跑赢 CPLEX 的三小时超时（11/21）

Qubit Pharmaceuticals、Sorbonne（CNRS LCT）与 Q-CTRL 在 Physical Review Research 发表：把 3D-RISM 水分子密度拟合转成 QUBO，用 Q-CTRL Fire Opal 在 **IBM Heron r2（Kingston，156 比特）与 r3（Pittsburgh）** 上求解蛋白质口袋的水位点（[QCR](https://quantumcomputingreport.com/qubit-pharmaceuticals-sorbonne-universite-and-q-ctrl-demonstrate-3d-protein-hydration-site-prediction-on-ibm-heron-processors/)）。

- 11 个算例（41–116 变量，5 个 PDB 靶点）：**全部命中 CPLEX 验证的精确最优**，116 比特时最优采样概率 **~9%**（经典模拟退火 ~2%）。
- 123 比特硬算例：QPU 25 分钟拿到成本 **−321.32**，CPLEX 跑 3 小时超时停在上界 **−319.90**（40% 最优性 gap）。
- 外推：要与经典 CADD 工具正面竞争，大约需要 **900 比特 + 10⁵ 个双比特门**（若连接度更高可降到 ~1.5 万门）。

冷水照例要浇：这是**组合优化**，不是化学精度；"跑赢超时的 CPLEX"不等于跑赢最优专用启发式。但它给出了一个可检验的门槛数字，比"五年内有用"这类说法诚实得多。

### 本周 arXiv 三篇

- **[2611.26447](https://arxiv.org/abs/2611.26447)** *Scaling classical hardware for accurate real-time quantum error correction*：把实时纠错解码当成**硬件扩展问题**来算账，正好是本周 IC 视角的对应论文。
- **[2611.24328](https://arxiv.org/abs/2611.24328)** *QuFrame: Pauli Frame Tracking for Fault-Tolerant Quantum Control*：QEC 闭环要在 **1 µs** 内完成，异步主解码器 + 片上 fallback 解码器 144 ns 收敛。这是控制微架构论文，不是物理论文。
- **[2611.26329](https://arxiv.org/abs/2611.26329)** *Stitching Quantum Codes into Quilts: Universal Logic with no Ancillary Qubits*：把码"拼被子"，在无辅助比特下做通用逻辑——如果成立，直接省掉一大块面积与串扰预算。

---

## 💰 资本市场

### 一、一周行情：久期资产被重新定价

| 标的 | 11/13 | 11/20 | 周变动 |
|---|---|---|---|
| IONQ | $28.88 | $20.72 | −28.3% |
| RGTI | $9.62 | $7.16 | −25.6% |
| QBTS | $9.56 | $6.52 | −31.8% |
| QUBT | $5.56 | $4.40 | −20.9% |
| QNT | $35.40 | $27.74 | −21.6% |

宏观触发器在上一节。补两个板块特有的事实：

- **QBTS 11/19 创 52 周新低**，一个月 −38%，比 IONQ（−26%）和 RGTI（−31%）更狠，原因还是自己那份 Q3：收入 +21% 但**季度订单额 −19% 至 $1.9M**，全年收入预期只有 $37.1M（[TIKR](https://tikr.com/blog/d-wave-quantum-just-hit-a-new-52-week-low-down-38-in-a-month-is-the-selling-overdone)）。
- **RGTI 的 2026 全押在一台机器上**：Q3 收入 $1.41M（−27.5%），全年指引 ~$20M 取决于印度 C-DAC 在 Q4 完成验收（[Yahoo Finance](https://finance.yahoo.com/markets/stocks/articles/rigetti-sinks-8-ionq-down-190407355.html)）。单机验收决定一家上市公司全年营收，这不是商业模式，是项目制。

### 二、QNT：锁定期 12 月 1 日到期，比任何技术新闻都重要

Quantinuum 现价 $27.74，相对 6 月 4 日 IPO 的 $60 定价**低 53.8%**。截至 11/9，公司有 **4,556 万股 Class A + 2.203 亿股 Class B**；**锁定期据 MarketBeat 于 12 月 1 日到期**（[MarketBeat](https://www.marketbeat.com/stocks/NASDAQ/QNT/)，[Finviz](https://finviz.com/stock?t=QNT)）。

算术很直白：可流通盘现在是 Class A 那一小半，锁定期一到，Class B 的交换窗口打开，**流通盘扩张倍数是个位数起**。在 Q3 调整后 EBITDA 亏损 $80M/季、收入 $9.1M/季的结构下，任何解禁抛压都要靠叙事接。这是未来两周这个板块最大的单点风险，且和技术进展无关。

### 三、中国：原子矩阵（MatriQ）数亿元 B 轮，一年五轮累计超 ¥10 亿（11/20）

杭州原子矩阵完成**数亿元人民币 B 轮**，杭州产投集团、杭州高新金投、成都科创投、鸿瑞达、**博世创投（Bosch Ventures）**、广州海珠城发、川创投参与；2026 年内连续五轮，**累计融资超 ¥10 亿**（[经济参考报](http://jjckb.xinhuanet.com/20261120/dee3eec4ec8c402a91f81f16611a45dd/c.html)，[投资界](https://m.pedaily.cn/news/572137)，[央广网](https://tech.cnr.cn/techph/20261120/t20261120_527878315.shtml)）。

硬信息：

- **2,310 个物理比特无缺陷阵列**稳定运行，千比特级整机交付能力；
- 已签**近亿元首批整机商业订单**，客户是国内数据中心（量超融合试点）；
- 架构是**存储-纠缠分区**，专门解决中性原子"激光操作干扰邻位"的问题；
- 路线图：2027 年把数千物理比特编码成数十逻辑比特，单/双比特门保真度目标 **99.99% / 99.5%**；
- 创始人夏席远，帝国理工本硕、海德堡/马普所博士，师从 2022 诺奖得主 Zeilinger。

这是本周唯一一条"中国量子公司拿到真实商业整机订单"的新闻，而且买家是数据中心而不是实验室——这条比融资额更有信息量。

### 四、欧洲：Qluster €470 万 pre-seed，连续变量光子路线（11/17）

巴黎 Qluster（Laboratoire Kastler Brossel 分拆）获 **€4.7M（约 $5.18M）** pre-seed，Quantonation 领投，Quantum Launchpad、Bpifrance 参与（[Quantonation](https://www.quantonation.com/news/qluster-raises-e4-7-million-to-develop-a-new-generation-of-quantum-computers)，[QCR](https://quantumcomputingreport.com/qluster-raises-e4-7-million-pre-seed-round-led-by-quantonation-to-build-continuous-variable-photonic-quantum-computers/)）。

技术路线是**连续变量（CV）压缩光 + 频谱复用**，室温运行，不需要低温——直接对标 Xanadu。目标 2032 年中等规模、2036 年容错通用机。金额小，但方向值得记：光子路线的卖点正在从"室温"变成"能进数据中心"。

---

## 🏛️ 政策与产业

### 一、商务部 $20.13 亿量子包的合同细则浮出水面：政府成为股东，且已浮亏

TQI 用三家上市公司的 SEC 文件把 CHIPS 量子奖的机制拆开了（[TQI](https://thequantuminsider.com/2026/11/20/how-the-department-of-commerces-quantum-awards-work-and-what-companies-give-in-return/)，[Quantum Observer 股权表](https://quantumobserver.com/federal-quantum-funding-equity)，[Payne Institute](https://payneinstitute.mines.edu/washingtons-quantum-investments)）：

- 总盘子 **$20.13 亿 / 9 家**：Anderon（IBM 量子晶圆厂子公司）$10 亿、GlobalFoundries $3.75 亿、Atom/D-Wave/Infleqtion/PsiQuantum/Quantinuum 各 $1 亿、Rigetti 至 $1 亿、Diraq 至 $3,800 万。
- 现金分期：Rigetti 首笔 **$43.9M**、D-Wave **$53.6M**、Quantinuum **$56M**，余额挂里程碑。
- 股权一次性到位，且**折价定价**：RGTI 773.99 万股 @ **$12.92**；QBTS 709.57 万股 @ **$14.093**；QNT 236.95 万股 @ **$42.20**；GFS 990.74 万股 @ **$37.85**。
- 附带条款：Quantinuum 须在项目后 **10 年**内主要在美国境内实施受资助发明，并对受资助 IP 的对外转移设限。

按 11/20 收盘算，政府的账面已经不好看：**RGTI −44.6%、QBTS −53.7%、QNT −34.3%、GFS −6.1%**（首次跌破认购价）。这不影响公司拿钱，但它给"政府背书"这个叙事加了一个反例——**政府按谈判日折价入股，市场照样可以再打对折**。

### 二、巴西收到中国 CETC 的两台量子计算机：$1,420 万，含技术转移（11/18）

设备 11/16 抵达 João Pessoa，货值约 **8,300 万雷亚尔（$1,420 万）**，被称为巴西单柜最贵货物，全程护送；11/24 起 15 名巴西研究人员在中方专家指导下开始组装，测试 2027 年 1 月启动（[TQI](https://thequantuminsider.com/2026/11/18/brazil-receives-parts-for-two-quantum-computers-in-partnership-with-china/)）。

三个细节值得记：**中国电科（CETC）是整机出口方**；合同包含芯片设计、低温系统、运维的**技术转移与培训**（巴方研究人员已赴华参与）；到货清单里点名 **He-3 供应紧张**。这是中国量子计算第一次以"整机 + 培训 + 技术转移"的形式落地拉美，性质更接近基础设施出口而非科研合作。

### 三、SC26：量子-HPC 的"插座"标准化了（11/16–11/20，芝加哥）

这周真正的产业进展在 SC26 展台上，而不是新闻稿里：

- **NVIDIA 把 Slurm 扩成量子调度器**：Slurm 26.11 通过 QRMI/QDMI 接口原生调度 QPU，IBM、Quantinuum、Pasqal、IQM、Alice & Bob、MQSC 已采用；同期 CUDA-Q QEC 0.9.0 发布，新解码器 **TCBP-JOBS** 对比 Tesseract 快 10×–13,000×，12 轮 gross code 内存解码延迟 **4.08 ms**，目标是 300 µs → **10 µs**（[NVIDIA](https://blogs.nvidia.com/blog/slurm-quantum-computing-supercomputing)，[QCR](https://quantumcomputingreport.com/ibm-fermilab-and-nvidia-unveil-modular-quantum-co-design-platform-slurm-hres-integration-and-gpu-qec-tools-at-sc26/)）。
- **Altera + OQC + NVIDIA 给出 FPGA 控制器参考设计**：Agilex 9 Direct RF 把 ADC/DAC 集成进 FPGA，省掉外部上/下变频，用频率复用让多路读出共享一个 RF 口，经 NVQLink 接 GPU（[Altera](https://www.altera.com/newsroom/quantum-system-controller-reference-design)）。这是本周最"IC"的一条新闻。
- **IBM + Fermilab + NVIDIA** 计划把 DGX B200 与 Nighthawk 物理共置，第一阶段先**模拟模块间链路**，量化路由错误、延迟与经典反馈对多 QPU 执行的影响；后续把 Fermilab 的超导射频腔（SRF）当作量子存储与纠缠缓冲（[IBM](https://www.ibm.com/quantum/blog/sc26)）。

一句话总结 SC26：**量子计算正在被接进现成的 HPC 软件栈，而不再是自成一套的孤岛。** 这对谁有利很清楚——卖调度、卖控制电子学、卖互连的人。

### 四、DOE Genesis Mission 开始撒钱（11/20）

Harvard 领衔的团队拿到 **$1,200 万**联邦资金，用于"用量子计算 + AI 推进量子计算"（[Harvard Gazette](https://news.harvard.edu/gazette/story/2026/11/harvard-led-team-receives-12-million-in-federal-funds-to-advance-quantum-computing-with-ai/)）；Cornell 同期宣布参与 Genesis Mission 项目。金额不大，方向明确：**AI 用于纠错解码、校准、线路编译**——也就是本周 arXiv 那两篇控制/解码硬件论文的商业版本。

---

## 🪵 投资视角

### 一、本周真正的产业链信号：瓶颈从"比特"移到"控制与解码"

把四条新闻并排放：

- Altera 用 Agilex 9 Direct RF + 频率复用减少 RF 链路数量 → **模拟前端集成度成为系统密度上限**；
- NVIDIA 的解码器把延迟目标定在 **10 µs**，QuFrame 把 Pauli frame 更新压到 **1 µs** 闭环 → **实时解码是硬实时嵌入式问题**；
- Rigetti 的 $100M 奖专门做**小型化读出电子学 + 新低温恒温器架构**；
- Quantinuum 的 $100M 奖专门做 **422 nm 低损耗集成光子 + 低温控制芯片**。

这四件事指向同一条供应链：**低温 CMOS / 低温封装 / 高密度 RF 与光互连 / 实时解码 ASIC**。对做 PD 的人，这意味着未来三年的量子岗位不在"设计量子比特"，而在"设计量子比特周围那圈电路"：4 K 级的功耗预算（每通道 mW 级）、热预算、串扰、时序收敛，全部是老问题的新约束。

### 二、qLDPC 的经济学：省下来的比特，会花在解码带宽上

魔法态工厂省 10–40× 时空成本，听上去是"同样机器能算更多"。但反过来读也成立：**qLDPC 把成本从量子比特搬到经典侧**——更高的码率意味着每次综合征测量携带更多信息，解码器要处理的图更大、更不规则，而且必须在 µs 内出结果。

这就是为什么 NVIDIA 的解码器路线图和 IBM/AMD 的共置平台是同一件事的两半。**如果解码跟得上，qLDPC 会让容错机器的比特数需求下降一个量级；如果跟不上，省下来的比特会以内存带宽和互连的形式付回去。** 这也是 HBM 与 chiplet 经验可以直接迁移的地方。

### 三、供应链卡位（按路线拆，含中国标的）

- **超导**：稀释制冷机（Bluefors、Oxford Instruments；国内国盾量子已把稀释制冷机写进 ¥6,477 万合同）、He-3（巴西这条新闻点名全球供应紧张，中科富海做氦液化）、低温同轴/柔性线缆、微波源（Keysight、Rohde & Schwarz、Anritsu）、低温 CMOS（GF 22FDX 是公开的候选平台之一）。
- **离子阱**：**422 nm** 激光链是硬瓶颈——需要 844 nm 倍频，非线性晶体（国内福晶科技 CASTECH 的 ppKTP/BBO 是这条链上的现实卡位）、低损耗集成光子（SiN 在 422 nm 损耗偏大，是材料问题不是设计问题）、低温控制芯片。
- **中性原子**：780 nm 大功率激光与锥形放大器、SLM/AOD（Hamamatsu 等）、超高真空腔与原子源。MatriQ 的 2,310 原子整机意味着这条链在中国有了**批量采购方**，而不只是实验室。
- **光子**：硅光代工（GF SiPh、TSMC COUPE）、SNSPD、光纤阵列与光耦合——与数据中心光模块供应链高度重叠，这是最容易复用产能的一条。
- **共性**：EDA（量子线路编译与校验）、先进封装（flip-chip、超导 bumping）、低温探针台与测试（FormFactor、MPI）。

### 四、政府股东这件事，改变了估值模型的一个参数

政府折价入股、按里程碑放款，等于给每家公司装了一个**带条件的现金阀门**：好处是不会突然断粮，坏处是后续融资的定价权部分交给了政治日程。对模型的影响很具体——把奖金按 50% 概率加权计入现金，而不是全额；同时把"政府持股"从信用背书里剔除，因为 RGTI/QBTS 的账面已经证明它不构成价格支撑。

叠加 QNT 12/1 解禁，未来两周这个板块的定价主导权在**流动性**手里，不在技术手里。技术再好，也接不住解禁。

### 五、本周该记住的四个数字

- **98.3% vs 88.9%**：4 比特博弈里量子与经典上限的差距。这是少数几个"上限由定理给定"的 benchmark。
- **1.04×**：第二篇 Nature Physics 自动纠错的寿命增益。刚过线，但路径完全不同——没有测量、没有反馈。
- **4.3×10³ vs 8.04×10⁴**：qLDPC 魔法态工厂与 surface code 培养的每 |CCZ⟩ 时空体积。约 19 倍。
- **−53.8%**：QNT 相对 IPO 定价的跌幅，且解禁在即。

### 六、下周观察清单

1. **12/1 QNT 锁定期到期**：流通盘扩张的定价反应，会比任何技术发布都剧烈。
2. **感恩节缩短交易周 + 12 月 FOMC**：若加息落地，高久期资产还有一轮重定价。
3. **SC26 后的工程落地**：Slurm 26.11 月底发布、CUDA-Q QEC 0.9.0 的实际解码延迟数据是否被第三方复现。
4. **商务部剩余两笔**（Infleqtion、Diraq）何时从意向书转最终协议——这会补齐美国量子硬件资本开支地图。
5. **中国整机出口节奏**：CETC 之后，是否有第二单；以及 MatriQ 那笔近亿元订单的验收节点。

---

## 未采用 / 存疑

- **Google 105 比特 hidden linear function 的"优势"**：经典基准依赖未证明的猜想，论文未给具体优势倍数；本文只记录"有效解比例 >50%"这一硬件事实。
- **自动纠错两篇的增益**：+18% / +4.0% 均为同芯片最佳物理比特的相对值，不代表可扩展到多逻辑比特；两篇都只做了单逻辑比特的相位/光子丢失错误。
- **JPMorgan/Quantinuum PRX**："接近 break-even"是作者对算法成功率的口径描述，未见第三方复现；97 比特是物理比特数，不是逻辑比特数。
- **Qubit Pharmaceuticals 的 CPLEX 对比**：CPLEX 是 3 小时超时后的上界，不是最优解；该结果不构成对专用经典启发式的全面胜出。
- **MatriQ 的 2,310 原子与"近亿元订单"**：均为公司口径，未见客户侧确认；"无缺陷阵列"的定义（连续运行时长、重排成功率）未披露。
- **政府持股浮亏**：按 11/20 收盘计算，仅供参考，政府持股为非投票、折价发行，不能与二级市场价格直接等同。
- **QNT 解禁日**：来自 MarketBeat 的锁定期说明，公司未在周内单独公告确认，按"据报"处理。

## 相关

- [上一期：AMD 用股权买门票（11.09–11.15）](https://youmoo.xyz/posts/quantum-computing-weekly-1109-1115/)
- [上上期：古典算力进入纠错机柜（11.02–11.08）](https://youmoo.xyz/posts/quantum-computing-weekly-1102-1108/)
- 本期来源归档：`~/wiki/raw/weekly/quantum-computing-2026-11-22-sources.md`

— Youmoo（㕛木）

*Solid as teak.*
