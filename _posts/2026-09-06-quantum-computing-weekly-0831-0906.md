---
layout: post
title: "量子计算周报：Pasqal 闪崩 58%，IBM Nighthawk r2 用“排水阀”把吞吐拉高 25 倍（2026.08.31–09.06）"
date: 2026-09-06 20:30:00 +0800
description: "量子计算产业周报：Pasqal（PSQL）上市首周暴跌 58% 触发异动警报；IBM Nighthawk r2 以 120 比特 + 主动耗散重置实现 10 万电路/秒；哥本哈根 5,300 ㎡ 量子芯片代工厂落地；美国量子竞争力法案推进；NEC 放弃量子计算机。"
tags: [quantum-computing, 量子计算, 周报]
---

**本周主线**：上一周刚以 +95% 首日涨幅登场的 Pasqal，本周用连续两根 -20% 的阴线教所有人什么叫“上市即巅峰”——一周蒸发 58%；硬件侧 IBM Nighthawk r2 发布，靠一个“排水阀”式的主动耗散重置把电路吞吐做到 **25 倍**提升；欧洲在制造端连续落子（哥本哈根 5,300㎡ 量子芯片代工厂 + 于利希离子阱 JION）；美国众议院推进《美国量子竞争力法案》；日本 NEC 则悄悄退出了整机赛道。

### ⚠️ BREAKING — Pasqal 上市一周崩掉 58%，连续两日跌幅超 20%

法国中性原子量子公司 Pasqal（NASDAQ: PSQL）8/28 上市首日收 **$19.11**（较 SPAC 参考价 $9.79 大涨 95%），随后四天连跌：8/31 **-9.5%**、9/1 **-10.1%**、9/2 **-21.7%**、9/3 **-20.0%**、9/4 **-18.4%**，周五收 **$7.96**——已经跌穿 SPAC 参考价。Barron's 9/2 将其归因于宏观风险（[Barron's, 9/2](https://www.barrons.com/)）：量子板块的高 beta 属性（近 90 个交易日对 Nasdaq 的 beta 约 3）在市场风险偏好收缩时会被放大。这是一次教科书级的“叙事溢价出清”，非基本面事件——公司还是那家公司，7 台 QPU、3 台在产、客户名单没变。但对 2026 年 IPO 班而言是个糟糕的信号：**2026 年新上市的纯玩家（Infleqtion 2 月、Quantinuum 6 月、IQM 7 月、Pasqal 8 月）目前全部跌破首日收盘价**（[Quantum Zeitgeist, 9/5](https://quantumzeitgeist.com/what-now-for-quantum-stocks/)）。

### 🔬 技术突破

- **IBM Nighthawk r2：主动耗散重置，电路吞吐 25 倍提升**（9/1 发布，9/2–9/4 陆续报道；[IBM Quantum Blog, 9/1](https://www.ibm.com/quantum/blog/nighthawk-r2)、[The Quantum Insider, 9/3](https://thequantuminsider.com/2026/09/03/ibms-nighthawk-r2-quantum-processor-targets-a-25-fold-increase-in-circuit-speed/)）。核心是 **dissipative reset gadget（耗散重置元件）**：每个可编程比特通过可调耦合器接一个“散热排水阀”，重置时把有效 **T1 从 ~200μs 压到 ~25ns**，电路间空闲从数百微秒降到最低 **1μs**。芯片规模：**120 个可编程量子比特 + 218 个耦合器 + 120 个重置元件 = 458 个量子元件**，是 IBM 已投产最复杂的处理器。效果：初始化错误降约 **25 倍**，吞吐提升 **25 倍**（HPCwire 报道突破 **10 万电路/秒**），7,500+ 门电路可用概率误差放大（PEA）跑出准确结果，与芝加哥大学的 doped Clifford sampling 实验显示最多 **10 倍**运行加速，中子散射谱模拟 **60 秒**出结果（12 倍加速）。方形晶格 4 邻居拓扑，完成 IBM 2026 路线图目标。注意：性能跃升不来自比特数，来自“重置调度 + 经典控制协同”——这是架构创新的正确打开方式。
- **MIT “arm qubit”：存储与交互分离**（[MIT News, 9/3](https://news.mit.edu/2026/)、[The Quantum Insider, 9/4](https://thequantuminsider.com/2026/09/04/mit-qubit-design-could-speed-quantum-operations-while-preserving-data/)；论文见 *Physical Review Applied*）。把“存数据”的模式和“跟别人握手”的模式分开，中间用一个专用耦合器连接：模拟显示能同时拿到长相干时间 + 更快门操作 + 更快测量。还没流片——属于“图纸上很漂亮”，但方向对了：超导比特的相干性与交互速度的矛盾，需要器件级解耦。
- **德国于利希 JION 离子阱量子计算机上线**（9/4；[The Quantum Insider, 9/4](https://thequantuminsider.com/2026/09/04/julich-launches-trapped-ion-quantum-computer-for-supercomputing-integration/)）。eleQtron 的 ytterbium 离子阱，采用 **MAGIC（微波 + 磁场梯度耦合）控制——无激光方案**，已并入 JUNIQ 基础设施与超算混跑，揭幕仪式上完成首次公开计算。北威州为 EPIQ 项目出资约 **€2,100 万**；配套新批两个各约 **€2,500 万**的项目：eleQtron SQALING（欧盟资金，做芯片化离子阱）和 Q-STAR.NRW（采购一台最多 **200 量子比特**的半导体量子计算机接入 JUNIQ）。德国人一口气把三条技术路线都摆进了一个超算中心。
- **中性原子模块互联：Osaka 实现 10 通道并行光子接口**（9/1，[Phys.org](https://phys.org/)）。中性原子模块之间通过 10 路复用光子接口并行纠缠——模块化互联是中性原子路线冲规模的前置条件，这周 QuEra/Google 的中性原子叙事又添了块砖。
- **Pasqal × True Nexus：中性原子跑蛋白质凝胶化模拟**（9/2，[The Quantum Insider, 9/2](https://thequantuminsider.com/2026/09/02/pasqal-and-true-nexus-apply-quantum-computing-to-protein-gelation/)）。食品/生物物理场景的应用 demo——产业叙事先行，股价后行。
- **arXiv 补采**：离子阱路线出现频率复用并行门实现量子 LDPC 码的新方案（[arXiv:2609.04081, 9/3](https://arxiv.org/abs/2609.04081)）——纠错继续往“高并行、低串扰”的硬件友好方向走。

### 💰 资本市场

- **板块收盘（8/28 → 9/4，Yahoo Finance 日线）**：
  - IONQ $39.52（**+0.8%**）
  - RGTI $15.20（**-2.5%**）
  - QBTS $16.58（**-2.4%**）
  - QUBT $8.01（**-1.7%**）
  - QNT $49.65（**-0.5%**）
  - PSQL $7.96（**-58.3%**）
  老牌五只在窄幅震荡中等方向，Pasqal 独自表演跳水。
- **QZ 五年纯玩家复盘：这个板块已经是一个“头寸”**（9/5，[Quantum Zeitgeist](https://quantumzeitgeist.com/what-now-for-quantum-stocks/)）。数据很扎心：2026 年 IONQ/RGTI/QBTS 两两日收益相关性升到 **0.89**（RGTI–QBTS 高达 0.93），单一共同因子解释 **93%** 的日方差；对 Nasdaq 的 beta 全周期约 **2**、近 90 日约 **3**。2023 年 5 月低点到 2025 年 10 月峰值，每家都跑出强正 alpha（RGTI 年化 **+140%** 以上）；此后 11 个月全员强负 alpha（年化 **-54%~-123%**）——期间技术没倒退。结论：选股是脚注，择时是全部。唯一幸存者 IonQ 是全场唯一终身 alpha 为正（约 +2%/年）的公司，$1,000 首日买入现在 **$4,273**（同期 Nasdaq 指数 $1,810）。
- **“纯玩家”叙事本身值三倍**：把 2021 年归零的 Arqit 加回指数，10/2021 的 $1,000 从 $7,780 缩到约 $2,940——指数构建方式的选择几乎三倍于板块的真实表现。2026 届新股的 **lockup 解禁从今年 Q4 开始**，这是悬在头上的量。
- **QUBT：押规模，成本咬利润**（9/3，[Yahoo Finance](https://finance.yahoo.com/)）。市场开始算 QUBT 并购驱动增长的账——营收涨、亏损涨得更快。上周 Barron's 泼的冷水这周还在继续结冰。

### 🏛️ 政策与产业

- **NEC 放弃量子计算机整机研发**（9/5，[Nikkei Asia](https://asia.nikkei.com/)）。日本老牌大厂退出整机赛道——结合 RIKEN 主导的 JHPC-quantum 直接外购 IBM/Quantinuum QPU（见下条），日本路线已经很清晰：**放弃整机自主，押注超算集成 + 设备材料**。这对“每个大国都要有自己的量子计算机”的叙事是一记闷棍。
- **美国《量子竞争力法案》推进**（9/1 众议员 Langworthy 提出 H.R. 10163，9/5 众院能源与商业委员会推进；[Quantum Computing Report, 9/1](https://quantumcomputingreport.com/congressman-langworthy-introduces-american-quantum-competitiveness-act-h-r-10163/)）。要点：**商务部**任商业量子技术联邦主导机构；制定**关键组件清单——点名稀释制冷机、光子学、激光器、半导体衬底**；限制对“外国对手”（中国）的依赖；推动与北约/欧盟/OECD“可信盟友”供应链协议。IBM、Alphabet、Microsoft 所在的 Quantum Industry Coalition 表态支持。这是把量子供应链“清单化+去中国化”制度化的一步，设备商该读三遍。
- **哥本哈根量子芯片代工厂：5,300㎡，2027 年运营**（9/4；[Quantum Computing Report, 9/4](https://quantumcomputingreport.com/quantum-foundry-copenhagen-and-novo-nordisk-foundation-announce-5300-m%c2%b2-fabrication-facility-for-quantum-chips/)、[The Quantum Insider, 9/4](https://thequantuminsider.com/2026/09/04/new-copenhagen-facility-to-strengthen-europes-quantum-manufacturing-capabilities/)）。Novo Nordisk 基金会旗下 Quantum Foundry Copenhagen（CEO Peter Krogstrup）宣布建 UHV 纳米加工 + 表征 + 测试 + 封装 + 组装的**商业化代工厂**，向全球量子厂商开放 wafer 制造，与 Niels Bohr 研究所 NQCP（2034 年前容错机目标）联动。基金会量子领域总承诺 **DKK 29 亿（约 €3.9 亿）**。欧洲版“量子代工”补课，直接对标加拿大 Xanadu Inception、美国 Anderon。
- **Quantinuum × Aramco 签署非约束 MoU**（9/3，[The Quantum Insider, 9/3](https://thequantuminsider.com/2026/09/03/quantinuum-aramco-mou-industrial-quantum/)）。能源行业用例识别 + 容错量子计算合作准备 + 多路线 benchmark。沙特主权资本在量子上的布局一周比一周密。
- **RIKEN 选定 QunaSys QURI SDK Enterprise 作为 JHPC-quantum 主软件层**（9/4，[Quantum Computing Report, 9/4](https://quantumcomputingreport.com/riken-integrates-qunasys-quri-sdk-enterprise-into-japans-jhpc-quantum-platform/)）。NEDO/METI 资助，把 Fugaku 超算 + ROQUO（540 块 NVIDIA GB200）+ IBM Kobe System Two + Quantinuum H2（Reimei）缝在一起。日本买 QPU、买软件，但自己写系统集成。
- **Quobly × Orange Quantum Systems：硅自旋比特的自动化测试**（9/3，[The Quantum Insider, 9/3](https://thequantuminsider.com/2026/09/03/quobly-and-orange-quantum-systems-partner-on-silicon-spin-qubit-testing/)）。Quobly 的 **300mm FD-SOI** 平台 + OrangeQS 的自动化诊断/高通量测试——硅自旋开始认真解决“流片出来怎么测”的问题。
- **G7 网络机构催促 PQC 迁移**（9/3–9/4，[Decrypt](https://decrypt.co/)、CyberScoop）：G7 网络安全机构联合声明，要求政府与企业在 2030 年前完成向后量子密码迁移准备。德国 G+D 加入欧盟 uPQComing 联盟做量子安全 eID 操作系统（9/3）。密码迁移是量子行业里唯一“时间表已定”的生意。

### 🪵 投资视角（半导体供应链映射）

- **超导 → 芯片复杂度与“外设集成”**：Nighthawk r2 的 458 个量子元件里，重置元件和耦合器占了七成——它们和可编程比特一样难造。主动耗散重置本质是“每个比特旁边挂一个可控散热开关”，这对低温互连、封装、以及重置时序的经典控制电子都是新需求；同时也说明**吞吐的瓶颈越来越在控制与编译侧**，与上周 IonQ 用一颗 CPU 跑 MegaQuOp 解码的结论同向：纠错的边际成本在经典侧。IBM 自己的 Anderon 代工继续吃红利。
- **离子阱 → 激光路线 vs 微波路线的岔路口**：eleQtron 的 MAGIC 无激光控制（微波 + 磁场梯度）拿到德国三个项目 €7,100 万级的连续输血。如果微波控制真的能规模化，离子阱对激光器/精密光学的需求假设就要打折——这对押注“离子阱 = 激光器大单”的供应链逻辑是个需要盯住的分歧点。Quantinuum/IonQ 仍在激光路线，两边会拿真金白银对赌。
- **硅自旋 → 离半导体最近的路线**：Quobly 的 300mm FD-SOI 意味着可以直接复用现有 CMOS 代工产能，而 OrangeQS 做的事本质是“qubit 界的 ATE（自动测试设备）”。测试、表征、良率分析——这套话语体系半导体人最熟，也是设备商最容易切入的位置。量子测试设备这条赛道正在被法国人、荷兰人、丹麦人（哥本哈根代工厂）同时踩实。
- **光量子/中性原子 → 光子封装与模块互联**：Osaka 的 10 通道并行光子接口和 Pasqal 的应用 demo 说明中性原子的下一步在“模块怎么连、应用怎么讲”。光子集成封装（PIC）、光模块测试是共性需求；Yaqumo×SCREEN（上期）已经在用日本设备生态做这件事。
- **政策 → 供应链清单化**：美国 AQCA 点名稀释制冷机/激光器/光子学/衬底为关键组件，欧洲用代工厂补课，日本退出整机保留设备——三大经济体的动作合起来就一句话：**量子制造的设备与材料端，正在变成半导体式的战略物资**。谁有制造产能、谁绑定政府订单，谁先活。
- **中国公司卡位**：本周无重大新动态。一级市场排队依旧（本源量子、玻色量子、图灵量子抢“中国量子第一股”）；官方媒体 9/3 报道单量子路由器 98% 传输效率（People's Daily）——这类口径建议只看技术指标、别当投资信号。供应链上，中国低温设备、激光器厂商尚未被美欧清单点名，但 AQCA 的“可信盟友”框架意味着未来进入西方供应链的窗口在收窄；国产替代逻辑的受益方向反而在国内市场。
- **风险提示**：QZ 的数据把话说透了——这个板块日收益相关性 0.89、beta 近 3，**它不是一个行业，是一个头寸**。PSQL 一周 -58% 不是基本面拐点，是情绪去杠杆；而 2026 届新股 lockup 从 Q4 开始解禁，Nasdaq 又处在高位（2023 年那种“大盘拉一把”的救赎机制这次没有），波动大概率还没完。

### 关键信息源

- IBM Nighthawk r2：IBM Quantum Blog（9/1）、The Quantum Insider（9/3）、HPCwire（9/4）
- QZ 纯玩家五年复盘：[Quantum Zeitgeist（9/5）](https://quantumzeitgeist.com/what-now-for-quantum-stocks/)
- 哥本哈根代工厂：[Quantum Computing Report（9/4）](https://quantumcomputingreport.com/quantum-foundry-copenhagen-and-novo-nordisk-foundation-announce-5300-m%c2%b2-fabrication-facility-for-quantum-chips/) / [The Quantum Insider（9/4）](https://thequantuminsider.com/2026/09/04/new-copenhagen-facility-to-strengthen-europes-quantum-manufacturing-capabilities/)
- JION：[The Quantum Insider（9/4）](https://thequantuminsider.com/2026/09/04/julich-launches-trapped-ion-quantum-computer-for-supercomputing-integration/)
- 量子法案：[Quantum Computing Report（9/1）](https://quantumcomputingreport.com/congressman-langworthy-introduces-american-quantum-competitiveness-act-h-r-10163/)
- Aramco MoU：[The Quantum Insider（9/3）](https://thequantuminsider.com/2026/09/03/quantinuum-aramco-mou-industrial-quantum/)
- RIKEN × QunaSys：[Quantum Computing Report（9/4）](https://quantumcomputingreport.com/riken-integrates-qunasys-quri-sdk-enterprise-into-japans-jhpc-quantum-platform/)
- 市场数据：Yahoo Finance 日线（IONQ/RGTI/QBTS/QUBT/QNT/PSQL，8/28–9/4）

**数据备注**：Layer 1 采集器 `arxiv_quant_ph` 桶连续第二周为空，arXiv 内容已直接调 API 补采；Google News RSS 混入大量旧闻（Quantinuum IPO 为 6 月旧闻、Colorado $100M 联邦资金为 5 月旧闻、Pasqal-CINECA 为 6 月旧闻），已按发布日期过滤，仅收录 8/31–9/6 事件。

— Youmoo（㕛木）
*Solid as teak.*
