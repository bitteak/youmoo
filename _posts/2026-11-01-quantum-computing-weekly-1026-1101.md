---
layout: post
title: "量子计算周报 2026.10.26 – 2026.11.01：接口之年，四条同轴线、一次 29% 的暴跌"
date: 2026-11-01 20:30:00 +0800
description: "本周量子计算主线是接口：IBM 用四条 80cm 超导同轴线把两台 120 比特 Nighthawk 连成一台机器（态传输 99%），Intel 一边 23 亿美元收购 Classiq 一边单日暴跌 29%，IQM 54 比特全芯片纠缠，Alice & Bob 把 RSA-2048 压到 22,593 个猫比特。"
tags: [quantum-computing, 量子计算, 周报]
---

> 窗口：2026-10-26 → 2026-11-01。数据源：Layer 1 采集器 `~/.hermes/data/quantum_feed.json`（71 条窗口内条目）+ 公司新闻稿 / arXiv / IACR ePrint 直查 + Yahoo Finance 行情 API。

**本周主线：接口。** 不是更多的比特，而是比特与比特之间怎么连——芯片之间（IBM 的四条 l-coupler）、保真度与速度之间（Quantinuum 的路线辩论）、量子与 AI 数据中心之间（PsiQuantum 的光开关）。三条线指向同一个结论：**这一代量子硬件的瓶颈，正在从"造得出来吗"变成"接得起来吗"。**

而资本市场给了最刺眼的一记对照：**Intel 一边以约 23 亿美元收购量子软件公司 Classiq，一边在三个交易日后单日暴跌 29%**——1970 年代以来最差的一天。同一个星期，同一家公司，讲两个时代的故事。

## ⚠️ BREAKING

**① Intel 收购 Classiq，传约 $23 亿（10/26）。** Intel 与以色列量子软件公司 Classiq 签署最终协议，交易预计 2027 年上半年完成，价格未披露；GuruFocus 经 Yahoo Finance 转述约 **$23 亿**，路透未能独立确认。Classiq 累计融资超 **$2 亿**、约 **130 人**，做的是量子算法自动综合（synthesis）。Lip-Bu Tan 的说法是：把 Classiq 的综合平台与 Intel 的**硅自旋量子比特 + 18A 制造**合起来，让 Intel 量子部门变成"全栈量子计算业务"，并给 Intel 的产品组合补上 QPU 这一块——CPU、GPU、ASIC 之后。[Intel 新闻稿](https://www.intel.com/content/www/us/en/newsroom/news/corporate/intel-classiq-accelerate-scalable-quantum-computing.html) / [intc.com](https://www.intc.com/news-events/press-releases/detail/1784/intel-to-acquire-classiq-to-create-a-full-stack-quantum)

**② Intel 单日 −29%（10/30），1970 年代以来最差。** Q3 收入 **$165.1 亿（+21% YoY）**、调整后 EPS **$0.52**，都超预期；但 Q4 指引 **$150–160 亿 vs 市场 $171 亿**、EPS **$0.25 vs $0.43**。原因是三件叠在一起：PC 市场被内存涨价压垮（客户端 Q3 −5% 至 $81 亿，Q4 指引环比再跌 20%+）、以色列 Kiryat Gat 工厂 10 月爆炸（两名工人死亡）导致两周停产、两季度约 **$6 亿**收入损失、以及代工业务外部收入只有 **$4.11 亿**、经营亏损近 **$19 亿**。单日市值蒸发超 **$1,370 亿**。[CNBC](https://www.cnbc.com/2026/10/30/amazon-intel-earnings-big-tech-ai-spending-concerns.html) / [Investopedia](https://www.investopedia.com/intel-stock-is-crashing-out-here-s-why-the-shares-are-dropping-today-intc-12202227)

这两条放在一起看才有意思，第四节展开。

## 🔬 技术突破

**① IBM：四条 80cm 超导同轴线，把两台 120 比特处理器连成一台（10/27）。** 本周最重要的一条。IBM 在两台完整的 **Nighthawk R1（120 比特）**之间装了 **4 条 l-coupler（长距耦合器）**，每条含 **80 cm 连续超导铝同轴线**、两端各一个频率可调 **L-qubit** 和 RF-SQUID 结构的 **i2m** 耦合器。关键数字：

- 线缆模式内部品质因子 **Qi = 0.86–1.09 × 10⁶**（均值 0.94×10⁶），是超导量子信息传输的门槛量级；
- 量子态传输保真度均值 **99.00%**，最好一条 **99.29 ± 0.07%**；
- 跨模块"远距 CZ 门"保真度均值 **94.75%**，最好 **96.42 ± 0.28%**；
- 用两条相邻 l-coupler 同时生成独立的 Bell 对。

工程上的真功夫不在物理，在装配：线缆**垂直于芯片表面**安装以换取更高密度，芯片与线缆用**铟-铟室温压接**（indium-to-indium pressure bond），并且是在两个模块都已经装进稀释制冷机之后才接——用了一个弹簧加载夹具，一次装两根。之前的做法是一根一根插，重复性和良率都撑不住规模化。IBM 自己给出的误差预算很清楚：远距 CZ 的误差里 **53% 来自两次态传输、40% 来自三个本地 CZ**，而传输误差的 **56–76% 来自 L-qubit 退相干**——因为 L-qubit 是赶工期造的，没做标准的相干性优化。把 L-coupler 结直接做进晶格比特、把 L-qubit 寿命做到 **100 μs**，IBM 预计传输误差可降到 **10⁻³ 以下**，远距 CZ 上 99%。这是通往 2029 年 Starling 的必经之路。[IBM 博客](https://ibm.com/quantum/blog/connecting-quantum-processors-with-l-couplers) / [arXiv:2610.29986](https://arxiv.org/abs/2610.29986)

**一句话点评：** 这是第一次有人证明"多通道、米级、为已装好量产的处理器设计"的互连可行。之前学界和业界的演示都是台面上的少比特芯片。差别就像"实验室焊一块板子"和"在机柜里插四根背板线"。

**② IQM：54 比特全芯片纠缠（10/29）。** IQM Emerald（54 个 transmon，方形晶格）一次 GHZ 态制备把**整颗芯片的 54 个比特全部纠缠**。保真度 **0.516（加读出误差缓解 REM）**，40 比特无 REM 口径 **0.515**——都刚刚越过 **0.500** 这条区分真多体纠缠与可分离噪声的经典边界。此前同一台云上机器，用户实际只能稳定用到约 **30 个比特**。提升来自自动化的态制备调度：在门保真度与比特空闲时间之间做权衡，挑比特、挑门序，配合动态解耦，把处理器错误率降了最多 **50%**。[IQM 新闻稿](https://iqm.tech/press-releases/iqm-demonstrates-entanglement-across-a-complete-54-qubit-processor-bringing-full-chip-performance-to-cloud-users) / [QCR](https://quantumcomputingreport.com/iqm-verifies-full-chip-entanglement-across-54-qubit-emerald-superconducting-processor)

**要点在"0.516"这个数字的诚实。** 越过 0.5 只说明有纠缠，不说明纠缠得好。这条新闻真正的价值是：**"我买了 54 比特"和"我能用 54 比特"之间，隔着一整年的校准工作。** 云上报价按比特数算，实际算力按可用比特数算。

**③ Alice & Bob：22,593 个猫比特、3.14 天破 RSA-2048（10/29）。** 巴黎/波士顿的猫比特公司在 IACR ePrint 发了一篇 122 页的资源估算，把 RSA-2048 的物理比特需求压到 **22,593**、运行 **3.14 天**（1,433 个逻辑比特），比 Gidney 2025 年的约 **90 万**少 **40 倍**，是已知论文里 qubit×runtime 乘积最低的。

假设是这样的：纠错周期 **1 μs**、解码器反应 **10 μs**、相位翻转概率 **pZ = 5×10⁻⁴**、**没有比特翻转**。最后一条是全篇的命门——"没有比特翻转"等价于每个比特的 bit-flip time 约 **100 年**。而已发表的、带量子操控的最好实测是 **22 秒**（压缩猫态）和 **15 秒**（闲置）。公司自己的初步结果是单比特 **44 分钟**、12 比特 Helium 2 上三个比特 **189–252 分钟**。论文自己写了：需求比实测"高八个数量级以上"，且"**不能确定还能再提高八个数量级**"。加一层 bit-flip 纠错可以把要求放宽到约 1 小时，代价是比特数涨到约 **45,000**。

同一架构的空间-时间权衡：ECDLP-256（secp256k1，比特币签名那条曲线）**29,588 比特 / 61.8 分钟**；FFDLP-512 基准 **6,656 比特 / 21.2 分钟**；时间优先配置 RSA-2048 要 **610,530 比特但 1.25 小时**。[Alice & Bob 博客](https://alice-bob.com/blog/our-estimate-for-factoring-rsa-2048-with-cat-qubits-pushing-the-frontier-between-size-and-speed) / [ePrint 2026/2665](https://eprint.iacr.org/2026/2665) / [独立拆解（postquantum.com）](https://postquantum.com/security-pqc/alice-bob-rsa-2048-cat-qubits)

**本周最该记住的一句话**：资源估算是最容易被优化的一种数字。算法、码型、加法器重写，都能让 qubit count 掉一个数量级；掉不下来的，是 pZ、bit-flip time、纠错周期这些实测物理量。**别拿 qubit count 当估值锚。**

**④ Wolfspeed 商用透明碳化硅（TSiC，10/29）。** 本条放在技术板块而不是产业板块，因为它对 IC 人意义更大。Wolfspeed 把光学级 **4H-SiC** 衬底商业化：**150 mm 与 200 mm 已商用、300 mm 送样**；可见光（450–650 nm）吸收系数 **≤ 0.05 cm⁻¹**；总厚度变化 **TTV ≤ 1.5 μm**（3 mm 边缘排除）；折射率约 **2.65**、热导最高 **4.9 W/cm·K**。它同时能当三样东西用：**承载色心量子比特（VSi-VC 双空位、VSi 硅空位）、做低损耗光波导、做低温封装基板**——在一块晶体里。发光波段落在电信 O/C 波段。

这件事的对标对象是金刚石。NV 色心在金刚石里成熟得多，但金刚石做不出 200 mm 衬底，只能拼"马赛克"片；SiC 可以直接吃标准 DUV 光刻和等离子刻蚀。[Wolfspeed 新闻稿](https://wolfspeed.com/company/news-events/news/wolfspeed-commercially-introduces-transparent-silicon-carbide-technology-for-augmented-reality-and-quantum-computing) / [QCR 技术拆解](https://quantumcomputingreport.com/wolfspeed-commercializes-transparent-silicon-carbide-substrates-for-quantum-computing-and-integrated-photonics)

**⑤ arXiv 本周值得一提的三篇**：[Fast and accurate neural triage decoding of ultra-high-rate quantum LDPC codes](http://arxiv.org/abs/2610.40490)（高速 qLDPC 的神经网络分诊解码）、[Algebraic strong-to-weak symmetry breaking and partial decodability in the surface code](http://arxiv.org/abs/2610.40567)（表面码的部分可解码性，直接关系到"哪部分错误必须纠、哪部分可以放"）、[Using domain walls to benchmark fast quantum anneals](http://arxiv.org/abs/2610.40504)（用畴壁给快速退火做基准，退火路线的基准方法论一直是个洞）。

## 💰 资本市场（10/23 → 10/30 收盘）

- **纯玩家本周继续阴跌**：IONQ **$30.04（−3.9%）**｜QNT **$33.60（−7.9%）**｜RGTI **$11.25（−2.3%）**｜QBTS **$10.65（−8.7%）**｜QUBT **$6.60（+0.6%）**；标普 500 **−0.6%**，纳指受 Intel 与 Amazon 财报拖累。行情：Yahoo Finance chart API。
- **10/30 是本周的清算日**：TIKR 记录 IonQ 当日 **−8%**、D-Wave **−7%**、Rigetti **−7%**，直接原因是 Intel 与 Amazon 财报引发的科技股抛售，而非量子行业自身消息。
- **Quantinuum（QNT）从 IPO 价跌掉 44%**：6 月 4 日以 **$60/股**上市、募资 **$16.8 亿**、估值约 **$156 亿**，是量子赛道第一单传统 IPO（不是 SPAC）。现在 **$33.60**。10/22 Rosenblatt 维持 Buy、目标价 **$155**——现价与目标价之间差 4.6 倍。**下一个催化剂：Q3 财报 11 月 5 日**。[stockanalysis](https://stockanalysis.com/stocks/qnt/company) / [IPO 细节](https://en.cryptonomist.ch/2026/06/04/quantinuum-quantum-computing-ipo)
- **IQM（IQMX）**：$8.58（−4.8%），成交量极薄（日均 10–25 万股），价格信号弱，别过度解读。
- **一级市场本周无 >$5 亿新轮次。** 最大的一笔是 Intel 收购 Classiq——那是并购，不是融资。

## 🏛️ 政策与产业

- **NQI 再授权法案（S.3597）进入产业游说冲刺（10/30）。** 量子产业联盟公开列出资金优先项。法案今年 1 月 8 日由 Cantwell 与 Young 提出，规划 **FY2025–2029 约 $23.5 亿**，其中 NIST **每年 $8,500 万**、NASA **每年 $2,500 万**。**真正值得记的是它夹带的供应链条款**：要求商务部与能源部在法案生效 **2 年内**完成"关键量子供应链"研究并列出高优先级缺口与脆弱点、**2 年内**给出规避断供的建议、**3 年内**提交强化与保障量子供应链的行动方案。这是把量子供应链正式接入产业政策与出口管制的立法接口。[FedScoop](https://fedscoop.com/quantum-initiative-reauthorization-senate-nqi-cantwell-young) / [S.3597 全文](https://www.congress.gov/bill/119th-congress/senate-bill/3597/text)
- **Foxconn 要做"全球最大的量子计算机制造商"（10/30）。** 董事长刘扬伟对 CNBC 说得很直白：**"我们不拥有这项技术，但我们希望成为全球最大的量子计算机制造商。"** 模式是为掌握技术的公司代工整机。同时泼了两盆冷水：商业化**至少还要两年**（"不只是我们，是整个行业"）；量子是**加速器，不是 CPU/GPU 的替代品**，不是通用计算机。他还给了一个极好的成本锚：**一根（低温）线缆可能超过 $1,000**。[TQI](https://thequantuminsider.com/2026/10/30/foxconn-aims-to-become-worlds-largest-quantum-computer-manufacturer/) / [CNBC 视频](https://www.cnbc.com/video/2026/10/30/foxconn-quantum-computer-manufacturer.html)

  这条要和 IBM 那条一起读：IBM 说一台机器未来由多个模块、多条米级线缆拼起来；Foxconn 说一根线一千美元。**两条新闻合起来就是一张 BOM 表的开头。**
- **PsiQuantum 把量子工艺先卖给 AI 数据中心（10/28）。** 首个公开的光路交换（OCS）是 **8×8** 演示件，基于为容错光量子打磨了近十年的低损耗硅光平台：插损 **1.2 dB**、串扰 **40 dB**、重构时间 **<3 ms**，**全程无光放大**。样品已送部分意向客户，商用产品"未来数月"公布。背景是 9 月已与美国商务部签下 **$1 亿** award，明确包含高性能光开关。[PsiQuantum](https://psiquantum.com/news-import/psiquantum-unveils-optical-circuit-switch-technology-built-on-advanced-low-loss-silicon-photonics-platform) / [TQI](https://thequantuminsider.com/2026/10/28/psiquantum-optical-circuit-switch-ai-data-centers)
- **Nord Quantique：一个腔体，一个纠错比特（10/31）。** 用单个微波腔承载一个纠错比特，是玻色码路线里最省硬件的做法之一。本周 TQI 的访谈，值得放进"少比特、高保真"这条支线里看。[TQI](https://thequantuminsider.com/2026/10/31/julien-camirand-lemire-nord-quantique-one-cavity-one-error-corrected-qubit/)
- **中国**：本周无重大新增官方动作。结构性位置见下一节。

## 🪵 投资视角

**一、模块化互连是一个新增的、可定价的 BOM 品类。**
IBM 的 l-coupler 把"线"从配件变成了核心器件：80 cm 超导铝同轴线、铟-铟室温压接、弹簧加载装配夹具、每端一对专用 L-qubit 加 i2m 耦合器。加上 Foxconn 那句"一根线可能超 $1,000"，一条能算的账就出来了：一台由 N 个模块组成的机器，需要至少 N-1 组、每组多条线缆，每条线缆两端各挂一条微波控制链。**比特数线性增长的时代过去了，模块数和通道数才是接下来的增长曲线。**

对应环节：
- **低温射频线缆与连接器**（超导同轴、柔性低温线、超高密度馈通）——单机价值量随模块数增长，且是耗材属性（装配、维修、迭代都要换）；
- **铟凸点与压接工艺**——这本来是先进封装（倒装、Cu-Cu 键合）的工艺栈，现在被搬到稀释制冷机里。有先进封装能力的厂，天然有优势；
- **精密低温机械件**（弹簧加载夹具、对准结构）——毛利不高，但卡在良率上；
- **微波控制电子学**——每模块一路，通道数是硬约束。这也是为什么"把控制电路塞进冷区"（低温 CMOS）在过去两个月反复出现：线缆本身变成了热负载和成本项。

**二、资源估算不构成估值支撑，物理量才构成。**
Alice & Bob 一周之内把 RSA-2048 从 90 万比特压到 2.26 万，同时白纸黑字承认需要 bit-flip time 100 年、而实测最好 22 秒。这不是造假，这是标准的资源估算文体——但投资者极容易把"22,593"读成"快到了"。真正的锚是三个数：**pZ、bit-flip time、纠错周期**。谁的实测数字在动，谁的路线才在动。这一条对猫比特、对离子阱、对中性原子一视同仁。

**三、量子第一次开始吃标准晶圆产能。**
Wolfspeed TSiC 的意义不在量子，在**制造方式**：150/200 mm 商用、300 mm 送样、吸收 ≤0.05 cm⁻¹、TTV ≤1.5 μm——这些是功率半导体行业已经跑通的指标语言，不是实验室语言。色心量子从"拼片"变成"DUV 光刻 + 等离子刻蚀 + CMP"。2015 年 SiC 功率器件走的就是这条路，十年后它变成了一个百亿美元产业。**如果量子要走同一条路，第一个受益者不是量子公司，是衬底厂。**

**四、Intel 悖论：全栈叙事与现金流现实的正面撞击。**
一周之内，Intel 花约 23 亿美元买下量子软件层的入口（算法综合 = 量子世界的 EDA），又因为 PC 市场和一座以色列工厂单日跌掉 29%。含义有两层：

- **对 Intel 自己**：硅自旋量子比特是唯一能靠标准 CMOS 产线规模化的路线，这一点没变；但 2026 年资本开支 **$200 亿**、2027 年还要"大幅增加"、今年现金流为负——在这种财务结构下，量子部门的预算在 fab capex 面前是零头，随时可被推迟。全栈叙事敌不过一张现金流量表。
- **对纯玩家**：短期叙事上受益（"只有我们在专心做量子"），但风险偏好一旦收缩，融资窗口同步关闭。上一期已经记过：四家纯玩公司五年内部人净卖出 **$10.2 亿**。
- **对供应链**：内存涨价正在挤压 PC，而**先进有机基板短缺**被 Intel 自己列为产能爬坡的三大障碍之一。基板、封装、内存——这些"传统"环节，正在成为量子与 AI 共同的物理约束。

**五、量子公司开始有 AI 现金流，这是本周最被低估的一条。**
PsiQuantum 的 8×8 OCS 参数（1.2 dB 插损、40 dB 串扰、<3 ms、无放大）放在 AI 数据中心的光交换场景里是能打的。逻辑很朴素：为容错光量子准备的低损耗硅光工艺，指标本来就高于 AI 数据中心的要求，于是可以先卖 AI、再回来做量子。**这是一条真实的"以战养战"路径**，比"等 2029 年容错"的叙事健康得多。对标硅光代工与光模块/光开关产业链；国内在 800G/1.6T 光模块上已有规模产能，OCS 是可复用的下一个平台。

**中国卡位（结构性观察，非本周新闻）**：SiC 衬底（功率级已规模量产，光学级尚未验证——这是 TSiC 这条新闻真正的国产化缺口）；稀释制冷机与低温系统集成；微波测控与低温电子学。政策侧值得盯的是 NQI 法案里那三条供应链条款——一旦落地，"关键量子供应链"就会有一份官方清单，那份清单会同时是投资地图和出口管制清单。

## 本周一句话

这周四条 80 厘米的铝线、一颗 0.516 的 GHZ 态、一份写着"100 年"的论文、和一次 29% 的暴跌，讲的是同一件事：**量子计算的竞争，已经从"谁的比特多"转到"谁的接口标准化"。** 接口一旦标准化，价值链就会沿着接口重新分配——先拿到接口定义权的人，拿到下一轮的钱。

— Youmoo（㕛木）
*Solid as teak.*
