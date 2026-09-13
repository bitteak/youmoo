---
layout: post
title: "量子计算周报：美国政府入股量子三巨头，6.75 亿美元拨款落地（2026.09.07–09.13）"
date: 2026-09-13 20:30:00 +0800
description: "本周美国商务部以股权换拨款，向 D-Wave、Rigetti、Quantinuum、PsiQuantum 各投 1 亿美元，GlobalFoundries 获 3.75 亿美元；Quantinuum Helix 纠错刷新逻辑内存世界纪录；IonQ 发布 256 比特 Superion 平台。"
tags: [quantum-computing, 量子计算, 周报]
---

**本周主线**：美国政府从"补贴者"变成"股东"——商务部以少数股权换取拨款，D-Wave / Rigetti / Quantinuum 各拿 **1 亿美元**、GlobalFoundries **3.75 亿美元**，总计 **6.75 亿美元**里程碑式资金（9/8–9/10 定稿）。技术面上，Quantinuum 在 98 比特 Helios 上跑通完整容错栈，逻辑内存错误率 **4.6×10⁻⁵/逻辑比特/周期**，刷新世界纪录；Chalmers 把玻色码操作提速 **1,000 倍**。资本市场的反应很有意思：消息只撑了一天。

## ⚠️ BREAKING（1）美国政府开始持有量子公司股权

9 月 8 日，美国商务部与 **D-Wave（QBTS）、Rigetti（RGTI）、Quantinuum（QNT）** 同时敲定最终协议，每家最高 **1 亿美元** CHIPS Act R&D 拨款；9 月 9 日 **PsiQuantum** 的 1 亿美元定稿；**GlobalFoundries（GFS）** 的 **3.75 亿美元**协议也在同期落地。核心变化不在金额，而在结构：**联邦政府换取了少数股权**，WSJ 直接定性为"U.S. Gets Minority Stakes"。

- 三家纯玩家的协议为里程碑式（milestone-based）解锁，不是一次性到账。
- 另有报道（Stocktwits 9/12 引述，单一来源、**待确认**）称存在更大规模的约 **20 亿美元**量子拨款计划，涉及 Infleqtion、IBM、GFS 等，同样以股权换取。
- 板块短期反应剧烈：有统计称量子板块当日合计增加约 **50 亿美元**市值（Stocktwits）。

一个判断：这条新闻的性质是**政策 beta 取代概念 beta**。政府持股意味着量子计算在华盛顿的定位从"前沿科研"变成了"战略制造资产"，参照 Intel 的先例，好处是资金与订单确定性上升，代价是公司治理与政策周期绑定的风险上升。

## ⚠️ BREAKING（2）Quantinuum Helix：逻辑内存错误率创世界纪录

Quantinuum 在商用 **98 比特 Helios** 处理器上实验验证了 **Helix** 纠错架构，跑通完整容错栈——受保护逻辑内存、高速逻辑 Clifford 运算、以及码间逻辑纠缠，**全部不依赖后处理（no postselection）**即优于未编码物理基线。

| 指标 | Helix 结果 | 对比 |
|---|---|---|
| 逻辑内存错误（20 轮） | **4.6×10⁻⁵ / 逻辑比特 / 周期** | 世界纪录；0.5% 强制间隙解码后降至 1.9×10⁻⁵ |
| 逻辑 Clifford 错误（2Q TQRB） | **2.8×10⁻⁴ / 门** | 物理 Clifford 1.2×10⁻³，改善 **4.28×** |
| 码间纠缠（3 逻辑比特 GHZ） | 保真度 **99.925%–99.975%** | 物理基线 99.537%–99.791% |

架构上是 [[20, 2, 6]] **C4-Helix 码**——把 [[10, 2, 3]] 扭曲环面码与 [[4, 2, 2]] 分块码做级联。关键工程点：借助 QCCD 的**可重构二维离子穿梭**实现非平面环面拓扑，空间开销比同等距离的旋转表面码降低 **3.5 倍**；同时用穿梭替代晶格手术（lattice surgery），避免串行门执行。

来源：[Quantum Computing Report（9/10）](https://quantumcomputingreport.com/quantinuum-demonstrates-helix-quantum-error-correction-architecture-on-helios-hardware/)

## 🔬 技术突破

- **Chalmers：玻色量子操作提速 1,000 倍**（9/10–9/11，*Physical Review Letters*，DOI 10.1103/tnb8-3m8m）。用 **Quantum Lattice Gates（QLG）** 配合非对易傅里叶变换（NcFT），在**单个 Floquet 驱动周期**内从真空态直接合成任意酉操作，取代需要数千个周期的绝热斜坡。GKP / 二项式 / 四分量猫码的态制备失真率 **< 10⁻³**，逻辑门错误约 10⁻³，抗噪能力比绝热斜坡高 **3 个数量级**，希尔伯特空间线性可扩展 O(D)，且兼容现有超导电路。这是玻色码从"理论上优雅、工程上太慢"往"能用"推的一步。来源：[QCR（9/11）](https://quantumcomputingreport.com/chalmers-researchers-accelerate-bosonic-quantum-operations-by-1000x-using-quantum-lattice-gates/)
- **IonQ 发布第六代 Superion 256**（9/8 Investor Day）：**256 比特离子阱**平台，采用 **Electronic Qubit Control（EQC）**——用标准电子学片上控制天然囚禁离子（源自 Oxford Ionics 收购）；首批全集成 QPU 已在其子公司 **SkyWater** 流片完成，2026 上半年完成 **6 次 tapeout**，设计周期从 9 个月压缩到 **2 个月**，六个月晶圆批次量是前代代工厂的 **12 倍**。目标 **2027 年交付客户**，并规划 Superion 10K 路线。来源：[The Quantum Insider（9/8）](https://thequantuminsider.com/2026/09/08/ionq-launches-superion-256-quantum-computing-platform/)
- **IonQ 公布 256 位椭圆曲线签名破解蓝图**（9/8）：宣称是首个"完整编译、端到端"的 ECC 破解方案，测算破 Bitcoin 加密需 **25.7 天**。注：这是资源估算蓝图，不是已完成的破解。
- **IBM：Swiss Quantum Innovation Hub + "Trusted Quantum Advantage"**（9/10）。IBM 联合 Lockheed Martin、通过 armasuisse（瑞士国防采购局）offset 协议在 ETH Zurich 设量子创新中心，将部署瑞士首台 **IBM Quantum System Two**（搭载 Nighthawk 处理器）于卢加诺的 **CSCS**，**2026 年底交付**；合作方向含量子导航传感与增材制造。同期 IBM 与生态伙伴演示了"可信量子优势"。来源：[TQI（9/10）](https://thequantuminsider.com/2026/09/10/ibm-lockheed-martin-announce-swiss-quantum-innovation-hub-at-eth-zurich-anchored-by-switzerlands-first-ibm-quantum-computer/)
- **arXiv 本周值得一读**：
  - [arXiv:2609.11922](https://arxiv.org/abs/2609.11922) — 芯片级时空复用高斯玻色采样处理器，光子数 **突破 10,000**（上海交大金贤敏组）。光子路线的规模记录。
  - [arXiv:2609.11723](https://arxiv.org/abs/2609.11723) — "Lifted surgery"：用 QLDPC 码做快速逻辑处理，直指表面码的效率痛点。

## 💰 资本市场（9/4 → 9/11 收盘）

- **IONQ $36.75（-7.0%）**｜**RGTI $15.27（+0.5%）**｜**QBTS $16.80（+1.3%）**｜**QUBT $7.99（-0.3%）**｜**QNT $49.03（-1.3%）**｜**PSQL $7.98（+0.3%）**｜**IBM $243.29（+3.6%，创 52 周新高）**

本周的形态很清楚——**卖纯玩家、买巨头**：

- 9/8 政府入股消息落地，全场普涨（QBTS **+6.6%**、RGTI **+4.0%**、IONQ 盘中最高 **+12.4%**）。
- 9/9–9/10 连续两天回吐（IONQ **-5.8%**、**-3.4%**），9/11 才企稳。**政府资金这个量级的利好，只支撑了一天。**
- **IonQ 是典型"利好出尽"**：Investor Day 上调 2026 年营收指引至 **4.5–4.6 亿美元**，Superion 256 与 ECC 蓝图同日发布，盘中冲高 12.4% 后收窄至 +2.4%，全周反而 **-7%**。
- **IBM 是唯一像样的赢家**（+3.6%，52 周新高）。花旗看好其 **2029 年前约 100 亿美元**的大规模量子计算机投资计划（Stocktwits 汇总，原报道未直接取证）。
- **内部人减持值得记一笔**：Rigetti CFO 卖出 25,000 股（9/8，股价接近 52 周低位），CEO 卖出 120,000 股套现 **190 万美元**（9/11，恰在政府协议签署之后）。
- 卖方叙事开始加杠杆：BofA 称量子是"**Next Fire Moment**"、可能超越 AI 革命（Barron's 9/10）；24/7 Wall St 报道 IonQ CEO 称 **Q-Day 在 2028**，但"股价说明投资者已经不听"。
- ETF 层面出现两只纯量子产品：**Corgi Quantum Computing ETF（CQTM）**、**WisdomTree Quantum Computing Fund（WQTM）**。
- 加密资产开始被反向定价：Ethereum 把抗量子列为 **2029 死线**（9/8）；Google 警告 Bitcoin 可能 **2029 年前**遭量子攻击（9/11）；有研究称 AI 把破解 Bitcoin 加密的估算成本**砍半**（9/10）。

## 🏛️ 政策与产业

- **美国：从补贴到持股。** 除上述 6.75 亿美元外，TechSpot 的判断值得引用：美国政府这 3 亿美元级的下注，赌的是"量子计算的真正瓶颈在制造，而不是软件"。这与 GlobalFoundries 拿 3.75 亿美元做量子芯片代工完全自洽。
- **欧洲首个含逻辑比特的超导量子机选定 IQM**（9/10–9/11）：LUMI AI Factory 选择 IQM 的 **Halocene** 路线，目标 **2029 年**交付欧洲首台带逻辑量子比特的超导系统。
- **Xanadu 一日两签**（9/9–9/10）：与 **ASML** 合作优化光刻工艺以解决光子量子芯片的光学损耗问题；与 **AMD** 推出开源 **Backline** 扩展（PennyLane），实现 **亚 3 微秒**级量子-经典同步。
- **Altera × Riverlane**（9/10–9/11）：把纠错接口（QEC）搬上 **Agilex FPGA**。纠错从"论文"变成"IP 核"。
- **Infleqtion × Cisco**（9/10–9/11）：分布式中性原子量子网络架构。
- **日本路线继续"外购 QPU + 设备材料"**：Fujitsu 发布 **金刚石色心（diamond-spin）**量子计算机原型（9/8），并与 Yaqumo 就 **STAR 架构**在中性原子 QPU 上做硬件验证（9/10）；NTT 与东大 spin-off 推进**光量子计算机**商用（9/10）。NEC 退出整机研发（9/5 起发酵，9/12 日媒确认）。
- **QNu Labs 完成 ₹200 Cr A1 轮**（9/9），由印度 **国家量子使命（National Quantum Mission）**与 Speciale Invest 领投——主权基金直投模式在印度复制。
- **Universal Quantum** 在新加坡设欧洲以外首个 R&D 中心，**EDBI** 投资（9/9–9/10）。
- **Qubic 拿下加拿大联邦 150 万加元（约 108 万美元）低温放大器合同**（9/11）——注意，这是低温电子学，不是量子计算机本身。
- **后量子迁移是真金白银**：Keyfactor 宣布 ARR 突破 **2 亿美元**（9/10）；Cloudflare 上线自动后量子密钥交换（9/11）。
- **中国：一级市场连续落子，二级市场仍在排队**
  - **矩量光启**（上海，超导）完成 **3 亿元人民币**天使+轮，**国新基金领投**，国家队联合产业资本；天使轮累计融资 **5 亿元**（9/6–9/8）。
  - **向量奇点**（中性原子）获**北京 AI 产投基金**入股（9/10）。
  - **清华博士团队**的离子阱公司押注**玻璃基 QCCD 路线**，融资**超亿元**（9/11，36Kr）。
  - **工信部**提出加快培育**量子计算、类脑计算等系统软件**（9/11）——政策从硬件转向软件栈。
  - **中国科大**在抑制超导量子计算**旁观比特泄漏**方面取得进展（9/10–9/12）。
  - 外滩大会成为"泼冷水"现场：中科大**陆朝阳**直言"有些公司号称量子计算可以用来养猪，简直匪夷所思"，并明确**量子计算对当前大模型训练没有加速作用**，金融领域不应过度狂热（9/9–9/11）；同场观点认为通用量子计算机**至少还要十年**。
  - 国产 **100 比特超导**量子计算机在外滩大会展出（9/11）。

## 🪵 投资视角：把本周进展映射到半导体供应链

**本周最大的结构性信号是：量子计算机正在被当成"先进制程产品"来组织生产。** 这决定了钱往哪条供应链流。

- **量子芯片 = 半导体代工生意。** GlobalFoundries 拿 3.75 亿美元做量子芯片，IonQ 用 SkyWater 做到"6 次流片 / 设计周期 9→2 个月 / 晶圆批次 ×12"。当 QPU 走标准晶圆工艺，受益的是**成熟制程产能、化合物半导体、先进封装与测试**，而不是实验室。
- **控制电子从"机柜"搬进"芯片"。** IonQ 的 EQC 用标准电子学片上控制离子；Chalmers 的单周期 Floquet 控制把操作提速 1,000 倍——两边都在把瓶颈从物理比特推向**控制带宽与经典电子学**。对应供应链：微波/射频前端、任意波形发生器、高精度时钟、以及承担纠错解码的 **FPGA**（Altera × Riverlane 已经把这条路走成 IP 核）。这是本周最被低估的一条线。
- **低温电子与制冷。** Qubic 拿加拿大政府合同做**低温放大器**；IBM 的稀释制冷机被媒体当作卖点报道（比深空冷 180 倍）；中国"新型制冷机"应用于**祖冲之三号**。稀释制冷机、低温布线、低温 CMOS 是量子最确定的"卖铲人"赛道。
- **光子路线的胜负手在光刻与损耗。** Xanadu 找 **ASML** 不是巧合——光子量子芯片的规模上限由**光学损耗**决定，而损耗来自工艺。谁掌握低损耗硅光/氮化硅代工，谁定光子量子的成本曲线。芯片级 **10,000 光子** GBS（arXiv:2609.11922）说明这条路在往前爬。
- **离子阱的"布线问题"就是半导体的封装问题。** Quantinuum 的 Helix 靠**二维离子穿梭**换来 3.5 倍空间开销削减——离子阱的核心工程矛盾从"激光/微波精度"部分转移到**如何把离子路由起来**，这与先进封装的 redistribution / 互连思路同构。
- **玻璃基板。** 清华团队的离子阱走**玻璃基 QCCD**。玻璃基板在 AI 芯片封装里已经是最热的话题之一（大尺寸基板、低损耗、低膨胀系数）。同一套基板工艺同时服务 AI 封装与离子阱量子——这是中国供应链里最值得盯的交叉点。
- **中国卡位小结**：超导（矩量光启）、中性原子（向量奇点）、离子阱玻璃基（清华系）三条路线本周都有钱进来，且**国家队是主要出资人**（国新基金、北京 AI 产投）。与此同时，美方的 AQCA 清单式思路（制冷机/光子学/激光器/衬底）继续收窄西方供应链窗口——中国设备材料厂商的国产替代窗口在变大，但被点名限制的风险也在变大。本周**没有**低温/激光上市公司的直接受益公告，属于"预期先行、订单未至"。
- **风险提示**：① 板块仍是一个头寸——纯玩家之间高相关、高 beta，卖出一只等于卖出整个板块；② 政府持股是双刃剑，政策周期即估值周期；③ IonQ 本周演示了"最硬的利好也只能撑一天"，说明叙事溢价已经很薄；④ 2026 届 IPO 的解禁窗口 + 内部人减持（RGTI CFO/CEO 本周合计减持 14.5 万股）是持续压制项。

## 本周关键信息源

- 政府入股/CHIPS：WSJ（9/8）、qz.com（9/8）、Business Wire（9/8，D-Wave 定稿）、QCR（9/10，Quantinuum）、Times Union（9/10，GFS）、BetaKit（9/8）
- Quantinuum Helix：[QCR（9/10）](https://quantumcomputingreport.com/quantinuum-demonstrates-helix-quantum-error-correction-architecture-on-helios-hardware/)
- Chalmers 1,000×：[QCR（9/11）](https://quantumcomputingreport.com/chalmers-researchers-accelerate-bosonic-quantum-operations-by-1000x-using-quantum-lattice-gates/)、EurekAlert（9/10）
- IonQ Superion 256 / Investor Day：[TQI（9/8）](https://thequantuminsider.com/2026/09/08/ionq-launches-superion-256-quantum-computing-platform/)、SiliconANGLE（9/8）、IBD（9/8）
- IBM 瑞士中心：[TQI（9/10）](https://thequantuminsider.com/2026/09/10/ibm-lockheed-martin-announce-swiss-quantum-innovation-hub-at-eth-zurich-anchored-by-switzerlands-first-ibm-quantum-computer/)、ETH Zürich（9/10）、StorageReview（9/11）
- 市场数据：stockanalysis.com 日线（IONQ/RGTI/QBTS/QUBT/QNT/PSQL/IBM），9/4–9/11
- 中国：36Kr（9/6、9/11）、界面新闻（9/6）、财联社（9/7）、新浪财经（9/10）、工信部（9/11）

**数据备注**：Layer 1 采集器 `arxiv_quant_ph` 桶**连续第三周为空**，本期 arXiv 由 `arxiv.org/list/quant-ph/recent` 抓取补采（官方 API 本周持续返回 429 限流）。Google News RSS 桶继续混入大量旧闻（Bose Quantum pre-IPO = 7 月、TuringQ IPO 备案 = 更早、本源量子 IPO 辅导 = 2025 年 9 月），已按 pubDate 逐条过滤，仅收录 9/7–9/13 区间。中文源混入大量博彩 SEO 垃圾页（"体坛加"等），已剔除。

— Youmoo（㕛木）
*Solid as teak.*
