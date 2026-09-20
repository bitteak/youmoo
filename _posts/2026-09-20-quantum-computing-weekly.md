---
layout: post
title: "量子计算周报 2026.09.14–09.20：美国政府买下量子晶圆厂"
date: 2026-09-20 20:30:00 +0800
description: "本周量子计算：IBM 旗下 Anderon 定稿 10 亿美元 CHIPS 拨款加 10 亿自投，建美国首家纯量子 300mm 晶圆厂；DOE 以 2.15 亿美元押注 100 逻辑比特；NVIDIA CUDA-Q Logical 集结 15 家厂商；Fed 加息周量子股仍普涨。"
image: "/assets/youmoo-og.png"
tags: [quantum-computing, 量子计算, 周报]
---

**本周主线**：钱不再是"补贴"，而是"建厂"。9/16 **IBM 旗下 Anderon 定稿 10 亿美元 CHIPS 拨款 + 10 亿美元 IBM 自投**，在 Albany NanoTech 扩产 **300mm 纯量子晶圆代工线**——美国第一次把量子计算当成晶圆制造问题来下注（同日 GF 的 3.75 亿也定稿、Rigetti 的 1 亿落定）。9/14 **NVIDIA 发布 CUDA-Q Logical**，一周内集结 Infleqtion、IQM、QC Design、Qedma、Quantum Motion、Diraq、Quandela、Quantum Machines 等 15 家以上厂商，量子软件的"中间表示"之争正式开盘。9/18 **DOE 抛出 Quantum Genesis Q**：2.15 亿美元、门槛写死 **≥100 个逻辑比特**。宏观上 9/16 **Fed 加息 25bp（2023 年以来首次）**，量子板块照样周线普涨，IBM 反成道指最大拖累。

---

## ⚠️ BREAKING（1）— Anderon 拿到 10 亿美元，美国第一家纯量子晶圆厂定稿

9/16，**Anderon LLC（IBM 子公司）**与商务部定稿 **10 亿美元** CHIPS and Science Act 直接拨款协议，**IBM 另跟投 10 亿美元**，合计 **20 亿美元**扩产 Albany NanoTech 的 **300mm 纯量子晶圆线**（[QCR](https://quantumcomputingreport.com/anderon-finalizes-1-billion-chips-act-award-to-scale-300mm-pure-play-quantum-wafer-foundry/)、[TQI](https://thequantuminsider.com/2026/09/16/anderon-1-billion-chips-award-quantum-wafer-manufacturing/)）。

关键不在金额，在于它**造什么**：

- **超导量子比特阵列晶圆**（300mm），以及**高密度量子 I/O 信号布线**
- **激光退火调节约瑟夫森结临界电流**——把"结的均匀性"当成工艺控制项，这是超导路线真正的良率命门
- **低温读出信号链**器件
- 路线图明确要从超导扩到**硅光子与自旋量子比特**多模态

首批量子晶圆批次已在 300mm 线上流片。这是 5 月 LOI 的正式落地，官方定位是"向全球量子硬件生态开放的**纯代工**（pure-play）平台"——即 QPU 公司不再需要自建产线。同一周，**GlobalFoundries 3.75 亿美元**（Malta, NY，22FDX 低温 CMOS + 先进封装）与 **Rigetti 1 亿美元**（紧凑读出电子、大容量恒温器、Fab-1 多芯粒）也全部定稿（[QCR/GF](https://quantumcomputingreport.com/globalfoundries-finalizes-375-million-chips-act-award-for-onshore-quantum-semiconductor-fabrication/)、[QCR/Rigetti](https://quantumcomputingreport.com/rigetti-computing-finalizes-definitive-100-million-chips-act-award-with-u-s-department-of-commerce/)）。

## ⚠️ BREAKING（2）— DOE 2.15 亿美元，把门槛写成"100 个逻辑比特"

9/18，DOE ASCR 发布 **Quantum Genesis Q Competition**：最高 **2.15 亿美元**，招的是 **Scientifically Relevant Quantum Computers（SRQC）**，硬指标是**至少 100 个逻辑比特、执行数亿次容错操作**（[QCR](https://quantumcomputingreport.com/doe-launches-215m-quantum-genesis-q-competition-and-45m-vv-lab-call/)、[TQI](https://thequantuminsider.com/2026/09/18/doe-215-million-quantum-genesis-q-competition/)）。

资金结构值得逐条看，因为它把"逻辑比特"直接标了价：

- Phase I：每个受资助方最高 **150 万美元**里程碑拨款
- **1 亿美元**通用激励池，在达标 100 逻辑比特的系统间分配
- 另设两个 **5,000 万美元**奖金池，分别对应 **150 与 200 逻辑比特**
- 并行 **4,500 万美元**国家实验室招标，建 Quantum HPC **Validation & Verification Testbed**——独立复现厂商声明
- 路线图：9/25 说明会，**10/19 截止**

技术路线不限（modality-agnostic），私营公司可报。同日 TQI 报道 DOE 顾问委员会的态度：未来的**国家量子用户设施**，要先证明"科学价值、技术成熟度与真实需求"（[TQI](https://thequantuminsider.com/2026/09/19/doe-panel-ties-future-national-quantum-facility-to-proof-of-scientific-use/)）。要钱可以，先拿证据。

---

## 🔬 技术突破

- **NVIDIA CUDA-Q Logical：量子软件层的圈地运动（9/14）**。新增的逻辑编排层，把"算法—纠错码—QPU 微架构"放进同一套可编程、可验证的栈，能直接推导全栈资源估算（[NVIDIA](https://nvidianews.nvidia.com/news/nvidia-expands-open-source-cuda-q-platform-for-fault-tolerant-quantum-computing)）。一周内站队的：**Fermilab 用它将容错架构开发从 5 个月压到 3 周（7×）**；**Infleqtion** 用它验证高码率 **HGPS qLDPC** 码块，**约 6 个物理数据比特 / 逻辑比特**，码率约为对照表面码的 **5×**；**Diraq** 的比特估算砍掉 **10×**（StorageReview）；IQM 将其纳入 **Halocene** 纠错产线；Quantum Machines 完成 **Pulse Processing Unit + GPU + QPU 的端到端在线执行**（NVQLink）；Sandia 的 **QUOPS** 基准（同时测物理与逻辑性能）也被并入 CUDA-Q。**这是量子版的"编译器 + PDK + 基准测试"三件套。**
- **IBM Spacetime PEC：纠错与纠偏不是替代关系，而是互补（9/16–9/19）**。把概率错误消除（PEC）与后选择量子错误检测（ED）组合，**采样开销相比标准 PEC 降低 63×**，在 **27 比特 heavy-hex** 超导处理器上实验验证（[QCR](https://quantumcomputingreport.com/ibm-research-demonstrates-hybrid-spacetime-pec-to-reduce-error-mitigation-sampling-overhead-by-63x/)、[TQI](https://thequantuminsider.com/2026/09/16/better-together-ibm-researchers-cut-sampling-demands-63-fold-by-combining-quantum-error-detection-and-mitigation/)）。对"过渡期"系统是好消息：不必等完美纠错。
- **IonQ：把量子算法塞进工业软件，而不是反向（9/16–9/17）**。与 Synopsys 把量子矩阵重排算法嵌进 **Ansys LS-DYNA**，网格规模达 **3,500 万数据点**、仿真最多 **150 比特**，总运行时间降低最多 **14.6%**，并在 **36 比特 Forte** 上物理验证，拿下 IEEE Quantum Week 2026 **最佳论文第一名**（[TQI](https://thequantuminsider.com/2026/09/17/ionq-synopsys-14-6-percent-faster-engineering-simulations/)）。另与 ORNL/NVIDIA/UT 发布 **DQAOA-GPT**：生成式模型直接写量子优化电路，**合成时间降到恒定 28 秒**，HUBO 问题解质量翻倍（[TQI](https://thequantuminsider.com/2026/09/16/ionq-ornl-nvidia-tennessee-ai-quantum-optimization-tradeoff/)）。
- **Quobly：单芯片读出 + 单/双比特门，跑在 STMicroelectronics 的 300mm 工业线上（9/16）**。QSOI 架构在工业硅工艺上完成同片验证，意味着**量子与经典电路可以共集成**，其路线图是 2026 年底云访问 Alloy Pioneer、**2032 年百万比特**（[QCR](https://quantumcomputingreport.com/quobly-demonstrates-single-chip-readout-and-gates-on-300mm-industrial-silicon-process/)）。
- **UPenn：室温金刚石寄存器，单门并行纠缠（9/19，*Nature Nanotechnology*）**。把金刚石的**串扰**反过来当资源用，单门并行生成 **4 比特 GHZ 态，耗时 14.8 微秒**，比传统串行方法快 **10×** 且保真度更高（[QCR](https://quantumcomputingreport.com/university-of-pennsylvania-demonstrates-single-gate-parallel-entanglement-on-room-temperature-diamond-quantum-register/)）。
- **其他**：USC + Quantum Elements 在 **IBM Heavy-Hex** 上用 "fold-unfold" SWAP 嵌入实现**亚阈值表面码距离标度**（*Nature Communications*，证明非原生拓扑也能做距离扩展，[QCR](https://quantumcomputingreport.com/usc-and-quantum-elements-demonstrate-surface-code-scaling-on-ibm-heavy-hex-processors/)）；Stanford 首次实时观测到机械谐振腔中的**声子量子跳变**（[TQI](https://thequantuminsider.com/2026/09/18/researchers-observe-first-real-time-quantum-jump-in-sound/)）；OQC 开源 **Erado**（擦除噪声 + 后选择模拟器，研究显示 3% 错误率以下后选择可完全消除擦除噪声，[QCR](https://quantumcomputingreport.com/oxford-quantum-circuits-releases-erado-an-open-source-qiskit-simulator-for-erasure-noise-and-post-selection/)）。

## 💰 资本市场（9/11 → 9/18 收盘）

| 标的 | 9/11 | 9/18 | 周变动 |
|---|---|---|---|
| IONQ | $36.75 | $39.13 | **+6.5%** |
| RGTI | $15.27 | $15.76 | +3.2% |
| QBTS | $16.80 | $17.11 | +1.8% |
| QUBT | $7.99 | $8.70 | **+8.9%** |
| QNT（Quantinuum） | $49.03 | $51.58 | +5.2% |
| INFQ（Infleqtion） | $13.12 | $13.23 | +0.8% |
| IQMX（IQM） | $10.32 | $9.54 | **-7.6%** |
| PSQL（Pasqal） | $7.98 | $7.64 | -4.3% |
| ARQQ（Arqit） | $20.05 | $20.13 | +0.4% |
| IBM | $243.29 | $229.55 | **-5.6%** |

- **节奏：9/17 是全场高潮**。Anderon + DOE 双料落地后，单日 **IONQ +9.5%、QBTS +8.7%、RGTI +8.1%、INFQ +7.9%、QUBT +5.5%**，媒体口径**板块单日增加近 50 亿美元市值**（Stocktwits, 9/19）。但 **9/18 集体回吐**（IONQ -3.0%、QBTS -3.3%、INFQ -4.6%、QNT -5.4%），只有 QUBT 逆势 +3.1%。这与上周结论一致：**政府级利好仍然只撑一天。**
- **Fed 加息 25bp（9/16，2023 年以来首次）**并暗示年内还有一次（Reuters/CNBC）。在加息周里纯玩家仍收涨、IBM 收跌，说明这轮定价锚是**订单与政策而非贴现率**。
- **IBM 是本周唯一像样输家**：9/16 单日 **-4.4%**，当日道指最大拖累来源；市场把 10 亿自投理解为资本开支与回报周期，而不是纯利好——即便分析师在说"Big Blue 可能成为美国第一家量子代工厂"。整个"量子利好"与"股价利好"之间出现了裂缝。
- **QNT 值得单独说**：9/17 冲高 $54.50 后 9/18 单日 **-5.4%**，成交放大到 **658 万股**（常态 100–200 万股）。注意——Quantinuum 的 IPO 并不在本周（Google News 本周密集推送的 IPO 旧闻多为其上市时的存档），QNT 已在交易多月，52 周区间 **$46.54–86.79**，当前接近箱体下沿。
- **QBTS 添法律风险**：Q2 业绩不及预期 + CFO 离任之后，Kessler Topaz 等启动证券调查并公开征集受损投资者（9/17–9/18）。基本面前有订单缺口、后有治理摩擦。
- **一级市场（本周不小）**：**Quantum Motion** 完成 Series C 第二轮交割（DCVC、Kembara 联合领投，imec.ventures、Sony Innovation Fund 等参与）；**OptQC** JPY **70 亿**（约 **4,700 万美元**）A2 轮由 **NTT** 领投，含三菱电机、KDDI、佳能、京瓷、ANA、SBI 共 21 家，累计融资与公共补助超 **JPY 200 亿**；**Fortaegis** 完成 **5,000 万美元** A 轮（Serendipity Capital 领投，硬件根信任的量子安全架构）；**EigenQ** 取得 **4,500 万美元**可转债，配合 **30 亿美元** SPAC 合并，预计 Q4 以 **EIGQ** 登陆 Nasdaq；**Matter Venture Partners** 关闭 **4.5 亿美元**二期基金（半导体、机器人、量子里程碑全覆盖）；**加拿大 BDC** 在 **60 亿美元**国防平台下拨出 **10 亿美元**投向量子与深科技；**Photonic Inc.** 提出 **CA$5 亿**（约 US$3.59 亿）多租户半导体设施 Project VANGUARD。

## 🏛️ 政策与产业

- **美国：从"持股"到"建厂"**。上周商务部以少数股权换拨款；本周直接给代工产能（Anderon/GF/Rigetti 三家合计 **5.75 亿美元**已定稿），并由 DOE 用逐级奖金池把"逻辑比特数"变成可投标的工程目标。
- **欧洲**：**CSIC** 在巴塞罗那 IMB-CNM 启用西班牙**量子纳米加工区**（**600 万欧元**，PERTE Chip + NextGenerationEU 出资）；**Planckian** 入选 **EuroHPC Quantum Grand Challenge** 第一阶段（27 份合格提案中选 13 家）；**Alice & Bob × CEA** 把猫比特软件栈接入 Eviden **Bull Qaptiva**，目标 **2030** 年容错工作流；**Riverlane** 在 **马里兰 Discovery District** 设美国总部（紧邻马里兰大学），主营实时纠错部署（[TQI](https://thequantuminsider.com/2026/09/17/riverlane-establishes-u-s-headquarters-in-maryland-to-accelerate-quantum-computing-innovation/)）。
- **日本：NEDO 出钱，NEC 退出**。三菱电机两个项目入选 NEDO：**多比特激光控制系统**（面向中性原子与离子阱的低延迟多通道光学）与**超紧凑多通道低温低噪声放大器**（[QCR](https://quantumcomputingreport.com/mitsubishi-electric-selected-for-two-nedo-rd-projects-to-scale-quantum-hardware-platforms/)）——注意这两项都是**卖铲子**，不是整机。同时 NEC 确认退出量子计算机研发（预期十多年投入难盈利，C114 9/18）；TOYO 追加买入 IQM Spark（5 比特）并此前订购 20 比特 Radiance，2027 年初建成双 QPU 测试台；日本两所高校体系将在 2027 年初开放量子机。
- **韩国/亚太**：**Pasqal（PSQL）× LG CNS** 三年 MoU，把中性原子 QPU 集成进韩国与亚太的 **AI 数据中心**；**IQM** 向巴西 Eldorado 研究所售出 IQM Spark，**南美第一台量子计算机**（2027Q1）。
- **商用落地**：**EPB 在查塔努加上线 IonQ Forte Enterprise**，投资约 **2,200 万美元**，10 月起向商业客户开放，是首个把离子阱 QPU 与光子量子网络放进同一设施的美国商用中心（[QCR](https://quantumcomputingreport.com/epb-commissions-ionq-forte-enterprise-quantum-computer-in-chattanooga-hub/)）；**QUBT × 哈马德·本·哈利法大学（卡塔尔）**三年框架协议，将落地 **Dirac-3** 熵量子计算机；**USA Rare Earth（USAR）× Pasqal × Riven**，用 QML 做稀土元素分离；**OQC × Trust Base** 的金融风险建模基准却给了冷水：在衍生品定价与 VaR 上，**经典 PINN 的综合表现仍优于量子压缩 PINN**（[QCR](https://quantumcomputingreport.com/oxford-quantum-circuits-and-trust-base-benchmark-hybrid-quantum-workloads-for-financial-risk-modeling/)）。
- **后量子迁移继续变成现金流**：Sectigo 发布 **Quantum Ready**（加密资产发现 + CBOM + QSPM）；Qtonic 发布纯软件的 **QShield**（ML-KEM-1024 / ML-DSA-87）；ICTK × Jiran 推 **Q-BRIDGE** 端到端迁移（硬件根信任用 VIA PUF）；**Oracle Java 27** 在 TLS 1.3 中内置混合后量子密码；Quantum B 的 QCKA 协议拿到欧洲专利。
- **中国：政策在"接场景"，钱在"进软件"**。北京推出 **"场景握手计划"**，把量子企业与交通、能源、金融、材料、水下探测、量子安全通信六类需求方对接（[TQI](https://thequantuminsider.com/2026/09/16/beijing-launches-program-to-connect-quantum-companies-with-industrial-customers/)，TQI 亦明确提示：**目前六类场景均未证明量子优势**）；**上海量子科技企业已超 80 家**、覆盖上中下游（财联社 9/15）；**图灵量子**在浦江创新论坛发布**三代光量子计算机**、探索"世界模型"（21世纪经济报道 9/14）；**弧光量子**完成**超亿元**战略融资做量子+AI（投资界 9/18）；**一家量子软件公司获中国移动超亿元投资**，用于国产全栈量子软件（36Kr 首发 9/18）；**太一量生**称 6 个月完成整机集成，走"反向设计"路径（上观 9/13）；**中科量仪（北京）** 的 **"凌开一号"稀释制冷机**（最低 **10 mK**，架构可像搭积木一样拼接扩容）入选北京市第三批**首台（套）重大技术装备**，三款稀释制冷机同时入选（[北京日报](https://m.takefoto.cn/news/2026/09/20/11966130.shtml)）；中国信通院称量子信息"进入攻坚培育期"（C114 9/18）。

## 🪵 投资视角：这周的钱到底买的是哪一层？

- **量子第一次被当成晶圆生意**。Anderon 的清单里没有"算法"和"云"，全是**300mm 晶圆、EUV、先进封装、约瑟夫森结激光退火、高密度 I/O、低温读出链**。GF 的 3.75 亿买的是 **22FDX 低温 CMOS + 封装**；Rigetti 的 1 亿买**紧凑读出电子与大容量恒温器**；Quobly 与 Quantum Motion 都在 **300mm CMOS 代工**上做自旋比特。**受益方是成熟制程产能、低温 CMOS、先进封装与测试设备，而不是"量子概念"。**
- **"控制层"是本周最被低估的战场**。CUDA-Q Logical 一周内被 15 家以上厂商采用，Quantum Machines 已演示 **QPU + GPU + PPU 的微秒级闭环**，Anyon 开源基于 NVQLink 的实时控制平面，Diraq 直接把 Dell 的 HPC 集群搬进悉尼实验室。瓶颈正从"比特"转向**控制带宽、低延迟互连、实时解码**——对应微波/射频前端、AWG、高精度时钟、FPGA/PPU 与 RDMA 互连。对照半导体，这一层就是**量子版的 EDA + IP**：谁定义中间表示与基准（QUOPS），谁长期收租。
- **低温与激光：确定性最高的"卖铲人"**。本周日本 NEDO 拨给三菱的两个项目恰好是**多比特激光控制**与**低温低噪声放大器**；北京把 **10 mK 稀释制冷机**认定为"首台套"装备。**稀释制冷机、低温布线、低温放大器、激光器——这些不依赖任何一条量子路线胜出。**
- **光子路线的胜负手在光学损耗与工艺**。OptQC（东大古泽实验室 spin-off）以 NTT 领投的 **JPY 70 亿**冲向 **10,000 比特**室温连续变量光处理器，比一代机 **MoQuren** 目标性能 **100×**，且不需要稀释制冷机；NLM Photonics × LIGENTEC 做出首个**氮化硅有机混合调制器**。对应供应链：硅光子/氮化硅代工、电光材料、激光器与光模块。
- **硅自旋是与 CMOS 重叠度最高的路线**。Quobly（STMicro 300mm QSOI）、Quantum Motion（300mm CMOS 定制硅）、Diraq（硅自旋 + Dell HPC）三家本周都有硬进展——如果这条路线跑通，量子产能问题基本等价于**一条成熟制程产线的排产问题**。
- **中国卡位的新变化：从整机转向装备与软件**。本周中文一级市场信号集中在**软件（中国移动投量子软件）与装备（中科量仪稀释制冷机首台套）**，而不是再刷一遍比特数。叠加北京"场景握手计划"，政策意图很清楚：**先把应用场景和国产装备补齐，再谈整机领先。**但要记住 TQI 与陆朝阳式提醒——六个场景、零个已被证明的量子优势。
- **风险**：① 美国政府对量子公司的股权"利好"只值一天，财联社口径称**入股公司股价已回吐过半涨幅**，本周 IBM 的 -5.6% 更进一步说明**受益者未必是股东**；② Fed 加息周期重启，长久期叙事资产对流动性最敏感；③ QBTS 的证券调查是治理风险的样板；④ 金融、稀土等"落地"场景里，**经典算法常常还是赢家**——OQC/Trust Base 的结论就是一记预防针。

---

## 来源列表

- Anderon $1B CHIPS 定稿：[QCR](https://quantumcomputingreport.com/anderon-finalizes-1-billion-chips-act-award-to-scale-300mm-pure-play-quantum-wafer-foundry/) / [TQI](https://thequantuminsider.com/2026/09/16/anderon-1-billion-chips-award-quantum-wafer-manufacturing/) / PR Newswire（9/16）
- DOE Quantum Genesis Q：[QCR](https://quantumcomputingreport.com/doe-launches-215m-quantum-genesis-q-competition-and-45m-vv-lab-call/) / [TQI](https://thequantuminsider.com/2026/09/18/doe-215-million-quantum-genesis-q-competition/)
- NVIDIA CUDA-Q Logical：[NVIDIA Newsroom](https://nvidianews.nvidia.com/news/nvidia-expands-open-source-cuda-q-platform-for-fault-tolerant-quantum-computing) / [QCR](https://quantumcomputingreport.com/nvidia-unveils-cuda-q-logical-to-accelerate-fault-tolerant-system-orchestration-across-hardware-modalities/) / StorageReview（9/15）
- Infleqtion qLDPC：[TQI](https://thequantuminsider.com/2026/09/14/infleqtion-advances-fault-tolerant-quantum-computing-software-nvidia-cuda-q-logical/) / [QCR](https://quantumcomputingreport.com/infleqtion-integrates-open-source-qldpc-library-with-nvidia-cuda-q-logical-architecture/)
- IBM Spacetime PEC：[QCR](https://quantumcomputingreport.com/ibm-research-demonstrates-hybrid-spacetime-pec-to-reduce-error-mitigation-sampling-overhead-by-63x/)
- IonQ × Synopsys / ORNL：[TQI](https://thequantuminsider.com/2026/09/17/ionq-synopsys-14-6-percent-faster-engineering-simulations/) / [TQI](https://thequantuminsider.com/2026/09/16/ionq-ornl-nvidia-tennessee-ai-quantum-optimization-tradeoff/)
- OptQC / 三菱电机：[QCR](https://quantumcomputingreport.com/mitsubishi-electric-and-optqc-expand-strategic-partnership-amid-jpy-7b-147m-usd-series-a2-and-tokyo-rd-expansion/) / [TQI](https://thequantuminsider.com/2026/09/17/mitsubishi-electric-rd-scale-up-quantum-computers/)
- 市场数据：Nasdaq 历史行情 API（IONQ/RGTI/QBTS/QUBT/QNT/INFQ/IQMX/PSQL/ARQQ/IBM），9/11–9/18 收盘
- 中文源：北京日报客户端（9/19–20，中科量仪凌开一号）、财联社（9/15 上海 80 余家、9/14 白宫投资组合回吐）、21 世纪经济报道（9/14 图灵量子三代机）、投资界（9/18 弧光量子）、36Kr（9/18 量子软件获中国移动投资）、C114（9/18 NEC 退出、信通院）

**数据备注**：Layer 1 采集器 `arxiv_quant_ph` 桶**连续第四周为空**（官方 API 持续 429），本期 arXiv 侧改以直连抓取补采；Google News 桶继续混入大量旧闻（Quantinuum IPO 系早期存档、TuringQ IPO 辅导为 2025/08），已按 pubDate 过滤；中文源再次混入大量博彩 SEO 垃圾页，已剔除。

— Youmoo（㕛木）
*Solid as teak.*
