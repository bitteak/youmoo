---
layout: post
title: "量子计算周报 2026.11.02 – 11.08：古典算力进了纠错机柜"
date: 2026-11-08 20:30:00 +0800
description: "本周量子计算：Quantinuum Helios 逻辑保真度 99.9995%、IBM 芝加哥 Nighthawk r2 上线、ORNL-IBM-AMD 纠错协设计平台把 GPU 搬进低温机柜、PSI 用未发布 Anthropic 模型证明 Aaronson-Ambainis 猜想，中国首批量子计算性能国标 11 月 1 日实施。"
tags: [quantum-computing, 量子计算, 周报]
---

> 窗口：2026-11-02 → 2026-11-08。数据源：Layer 1 采集器 `~/.hermes/data/quantum_feed.json`（快照 100 条，四路来源）+ 公司新闻稿 / arXiv / Yahoo Finance 直查。

**本周主线：古典算力正式进入纠错机柜。** 三件事指向同一个结构性变化——ORNL 把 AMD 的 MI355X 和 120 比特 Nighthawk 放进同一个低延迟环境（11/5），IBM 在芝加哥上线 Nighthawk r2 并把卖点从"比特数"换成"每秒 10 万次电路"（11/6），Quantinuum 财报把两周前的 Λ=12 换算成 $97.5M/季的研发账单（11/5）。量子计算的瓶颈正在从"造得出来吗"转向"喂得动吗"——而喂它的，是 GPU、是控制电子学、是每秒十万次的重复率。

## ⚠️ BREAKING

- **PSI 用未公开的 Anthropic 模型三天证明 Aaronson–Ambainis 猜想（11/6）**：18 年悬案，Lean 4.33 内核逐行验证通过，论文与形式化代码已公开，但未经同行评议。这一步把"量子加速的边界"从猜想变成定理——**无结构随机输入上，量子最多只能多项式加速**。
- **量子股单日集体异动（11/6）**：QNT **+26.0%** 至 $37.57、IONQ **+23.4%** 至 $32.62、RGTI **+18.8%**、QBTS **+18.0%**、QUBT **+12.4%**，而 SPY 仅 +0.3%。触发点明确：IonQ 与 Quantinuum 同日发布超预期 Q3 并上调全年指引。

> **口径勘误**：Quantinuum 的 Helios **99.9995% 逻辑保真度 / Λ=12** 是 **10/19** 的成果，本系列 **2026-10-25 期已作为 BREAKING 报过**。本周（11/5 财报电话）只是把它装进财务口径并确认 Apollo 路径。不再重复计入本期 BREAKING。

## 🔬 技术突破

**Quantinuum Q3：把 10 月的 Λ=12 装进财务框架（11/5）。** 收入 **$9.1M（+233% YoY）**，非 GAAP 毛利率 **74.6%**（同比 +853 bps），bookings **$98M**（含 Oracle 协议，公司史上最大云合同），现金 **$19.4 亿**、无负债。研发费用 **$97.5M/季**（约收入的 10.7 倍）。全年指引上调至 **$31–34M**（原 $28–32M），2027 指引维持 >100% 增长。另有 **$1 亿** 商务部 CHIPS award。管理层口径：Helios 的结果"显著降低了 Apollo（2029 通用容错）所需的硬件与纠错风险"。([财报](https://ir.quantinuum.com/static-files/360dab95-056d-4d9f-9313-2a014e3cc16c)、[电话会](https://fool.com/earnings/call-transcripts/2026/11/07/quantinuum-qnt-q3-2026-earnings-call-transcript))

按本系列 10-25 期立下的规矩（看纠错成果先找 **Λ** 与**门级**而非内存级错误率）复述一遍当时的硬数字，避免财报稿把口径模糊掉：三角 color code，d=3/5/7，内存/闲置口径逻辑错误率 **5 (+4/−2)×10⁻⁶**、**Λ=12 (+3/−2)**；**门级口径**（d=5 每个逻辑双比特 Clifford）**7 (+3/−3)×10⁻⁵**、**Λ=9 (+3/−8)**——与标题数字差一个数量级。对照 IBM Nighthawk r2 云上 surface code 的 **Λ=1.68/1.85**，这才是"大多数硬件的真实水平"。

**IBM 芝加哥：Nighthawk r2 的真实卖点是吞吐不是比特。** 11/6 在芝大 Hyde Park Labs 上线 IBM Quantum System Two，云上标识 `ibm_chicago`，作为 National Quantum Algorithm Center 的锚定系统，最终迁往 IQMP（前 US Steel South Works 地块）。处理器 **Nighthawk r2**：**120 个可编程比特 + 218 个可调耦合器 + 120 个独立高速复位元件 = 458 个物理量子元件**（注意 458 不是电路宽度）；方形晶格、每个比特连四个最近邻；**>100,000 电路/秒，约为 Heron 的 25 倍**，初始化误差同步降约 25 倍，门保真度维持 Heron 级。([IBM Newsroom](https://newsroom.ibm.com/2026-11-06-ibm-unveils-its-most-advanced-quantum-computer-in-chicago,-marking-a-milestone-for-illinoiss-quantum-future)、[UChicago](https://news.uchicago.edu/story/ibms-most-advanced-quantum-computer-unveiled-uchicagos-hyde-park-labs))

一句话拆解：**比特数从 Heron 到现在没动，动的是复位速度和重复率。** 这在物理上非常合理——纠错需要每轮测量后快速复位并重复，单次实验的保真度再高，如果一秒只能跑四千次电路，统计量永远不够。同一周延世大学也把 System One 升级到 Nighthawk（IBM 量子网络里首例客户自有机房跑 Nighthawk）。([IBM Korea](https://kr.newsroom.ibm.com/announcements?item=122848))

**ORNL + IBM + AMD：纠错协设计平台（11/5）。** 部署在 IBM Poughkeepsie 厂区，把 **120 比特 Nighthawk r2** 与 ORNL 量子科学中心（QSC）的 **Umbra** 系统共置——**AMD Instinct MI355X GPU + 第五代 EPYC**，并接入 ORNL 更大的超算生态。目标是给**分级纠错码**（hierarchical codes：内码护住模块内比特，外码再包住内码的逻辑比特）提供低延迟的 GPU 解码环境。IBM 的说法是：物理错误率 1/1000 时，分级码可望支撑 **10¹² 次逻辑操作**。Jay Gambetta 的原话值得抄下来——"问题不再是纠错能不能work，而是怎么加速和优化纠错"。([IBM Research](https://www.ibm.com/quantum/blog/ornl-amd-error-correction-co-design-platform)、[The Register](https://www.theregister.com/hpc/2026/11/06/oak-ridge-labs-gets-hybrid-quantum-hpc-system-to-test-qubit-error-correction/5308187))

**PSI：Aaronson–Ambainis 成为定理（11/6）。** 2008 年 Scott Aaronson 与 Andris Ambainis 提出：若某类多项式条件成立，则量子计算机在**大多数均匀随机输入**上相对经典只有多项式优势。PSI（Physical Superintelligence，一家自称 AI-native 物理实验室的美国创业公司）的内部研究系统在自建基础设施上跑**未公开的 Anthropic 模型**，第 3 天拿到完整证明，Lean 4.33.0 / Mathlib v4.33 内核接受；随后系统被指向相关开放问题，两次改进界，Lean 再次接受。人工作者 Turturean 负责选题、操作系统与论文定稿并承担正确性责任，Jim Halverson 审计证明。**注意口径**：结论约束的是随机输入下的输入查询数，不是一般模拟时间；机器验证的是形式化陈述，形式化陈述与原猜想的对应仍需人工复核；未经同行评议，Aaronson 与 Ambainis 截至 11/7 未置评。([PSI](https://psi.inc/research/aaronson-ambainis/)、[The Quantum Insider](https://thequantuminsider.com/2026/11/06/ai-assisted-proof-settles-longstanding-question-about-quantum-speedups)、[Quantum Zeitgeist](https://quantumzeitgeist.com/an-ai-system-running-an-anthropic-model-settled-an-almost-20-year-old-conjecture-with-implications-for-quantum-speedup))

**《24 个超二次加速问题汇编》（11/6）**：Open Quantum Institute（CERN 托管）+ Google Quantum AI + Microsoft + NVIDIA + JPMorganChase + MIT + Harvard + Oratomic 等合作，arXiv [2610.32595](https://arxiv.org/pdf/2610.32595v1)。两个阶段：Stage I 有理论优势但缺具体实例，Stage II 能构造出量子确实更快的实例。三条实用判据：**塞得进可用算力、初态可制备、问题扛得住经典方法**。作者自己泼的冷水——理论步数少不等于实际更快，数据准备、纠错、读出会吃掉全部收益。([TQI](https://thequantuminsider.com/2026/11/06/study-maps-24-problems-where-quantum-computers-could-gain-an-edge))

把 PSI 的定理和这份汇编放在一起看，本周实际发生的是同一件事的两面：**"哪些问题有量子优势"这个问号，正在被两边同时合拢。** 一边证明无结构加速不存在，一边把有结构的问题列成采购清单。

**arXiv 四篇值得看**：
- [2611.08180](http://arxiv.org/abs/2611.08180) 无符号证明下的量子优势：给出 **StoqMA ⊋ MA 的 oracle 分离**——量子证明系统在特定 oracle 下严格强于经典 MA。
- [2611.08247](http://arxiv.org/abs/2611.08247) 大规模认证量子码与电路的距离——纠错码的"标称距离"和"实际距离"差距是工程现实，这篇把它做成可扩展的认证方法。
- [2611.08488](http://arxiv.org/abs/2611.08488) 非阿贝尔拓扑相的**电路级阈值**可证明——拓扑路线（微软那条）长期缺的就是"门层面到底能不能纠错"的硬证明，这是补洞。
- [2611.08444](http://arxiv.org/abs/2611.08444) **热损耗下玻色/费米采样的多项式时间经典模拟**——直接顶在玻色采样"量子优势"叙事的腰上。国内"九章四号"（1024 压缩态输入 / 8176 模式 / 3050 光子 / 宣称对 El Capitan 10⁵⁴ 倍）需要这类论文当对手盘来读，而不是当捷报读。

## 💰 资本市场（10/30 → 11/6 收盘）

- **周内先杀后拉**：11/2–11/5 科技股回调 + B. Riley 下调四家目标价（IONQ $100→$75、QBTS $40→$27、RGTI $35→$25、INFQ $23→$17，均维持 Buy），QBTS 一度探至 **$9.05**（52 周低点附近，空头占流通股约 24%）。11/6 两家财报把整个板块拉回去。
- **11/6 收盘**：IONQ **$32.62（+23.4%）**｜QNT **$37.57（+26.0%）**｜RGTI **$11.71（+18.8%）**｜QBTS **$10.68（+18.0%）**｜QUBT **$6.33（+12.4%）**；SPY +0.3%。
- **IonQ Q3**：收入 **$173.8M（+336% YoY）**，超预期 19–37%（各口径不同）；其中 **SkyWater 代工 $83.5M**、IonQ Platform **$90.3M（+127%）**；调整后 EPS **−$0.29**（好于 −$0.34）；调整后 EBITDA **−$133.6M**（去年同期 −$48.9M）；GAAP 净利 **$564M** 主要来自 **$896.2M** 认股权证负债非现金收益——这个数字不能当经营改善看。全年指引 **$505–515M**（原 $450–460M，9 月 Investor Day 给的）。现金 **$17 亿**，计入 10 月股权融资后备考 **$37 亿**。披露 backlog **$12 亿**。单季签下 **$2.9 亿** 新合同（其中量子计算约 $1.8 亿）。([SEC 8-K](https://www.sec.gov/Archives/edgar/data/0001824920/000119312526449779/ionq-ex99_1.htm)、[Yahoo](https://finance.yahoo.com/markets/stocks/articles/ionq-stocks-surge-10-93-190759019.html))
- **估值裂口是本周最该盯的数字**：QNT 市值约 **$100–101 亿**，按 2026 指引中值算约 **308× 销售额**；IONQ 市值约 **$133 亿**，约 **26×**。同一板块、同一天涨 20%+，市销率差 **12 倍**。QNT 的 52 周区间 **$28.31–86.79**，IPO 价 $60（6/4 上市），现在仍比发行价低 **37%**。11/7 Jefferies 维持 Buy 但目标价 **$85 → $65**。([Yahoo QNT](https://finance.yahoo.com/quote/QNT)、[QuantisNow](https://quantisnow.com/articles/quantum-rally-rests-on-ionq-s-1-2b-backlog-while-quantinuum-is-priced-on-a-roadmap))
- **Pasqal Q3（11/6）**：收入 **€3.3M vs 去年同期 €5.7M（−42%）**——去年同期含 €3.2M 整机销售，本季**零整机交付**；QPU 服务收入 **€3.1M（+53%）**，含 Aramco 的 QCaaS 小时数开始消耗。订单簿 **€69.8M**（环比基本持平），现金 **€312.8M**，2029 目标 >10,000 物理比特 / 200 逻辑比特。([GlobeNewswire](https://globenewswire.com/news-release/2026/11/06/3397429/0/en/pasqal-reports-third-quarter-business-update.html))
- **IQM Q3**：backlog 扩至 **€102.5M**，Q3 收入 **+51%**，全年指引重申。
- **下周催化剂密集**：QUBT **11/9**、QBTS 与 RGTI **11/10** 财报。RGTI 全年共识 **$23.3M** 里，印度 C-DAC 的 **$8.4M / 108 比特整机**要等安装验收才能确认收入——延期到 2027 就是全年预期砍掉三分之一。

## 🏛️ 政策与产业

- **中国首批量子计算性能国标 11/1 正式实施**：**GB/T 47468-2026《量子计算系统性能测试方法》**（比特数、连通性、门保真度、量子体积的"怎么测"，明确**不适用于非门型系统**——即退火机不在其列）与 **GB/T 47177.2-2026《量子计算服务平台 第2部分：性能评估》**（量子系统性能 + 经典模拟器性能 + 服务性能三个维度，含任务响应时间、并发度、负载均衡恢复时间、吞吐量）。4/30 发布、6 个月后实施，30 余家起草单位：中科大、合肥国家实验室、济南量子院、国盾量子、中电信量子、本源量子、图灵量子、华翊量子、量旋科技、中科酷原，覆盖超导/离子阱/中性原子/光量子全路线。([人民网安徽](http://ah.people.com.cn/n2/2026/1106/c358428-41743614.html)、[腾讯新闻](https://view.inews.qq.com/a/20261102A0BPK200))
- **英国一口气三个包（11/6，National Quantum Technologies Showcase，3500+ 人）**：财政大臣预算里 **£1.38 亿**跨政府量子**传感采购**（含 MoD £3,000 万，该部对量子科技最大单笔投入）；EPSRC **£1,200 万**建国家量子商业化技能中心（Imperial 牵头 + Bristol/Cambridge/Glasgow/Oxford）；Innovate UK **£3,500 万**建两个量子网络测试床（2027 年 2 月开放申请）。UKRI 十年评估：2,000+ 高技能岗位、74 家 spinout、约 **£4.82 亿**私人投资。([TQI](https://thequantuminsider.com/2026/11/06/uk-announces-new-funding-to-support-quantum-technology-commercialisation)、[UKRI](https://ukri.org/news/how-the-uk-built-a-quantum-technology-nation))
- **NQCC 转向"采购方"**：2026 年报显示 **£20 亿**总盘子（£10 亿/4 年 + £10 亿 Advanced Market Commitment），目标是 2031 年交付能跑 **10⁹ 次操作**的商用平台；Harwell 已装 **7 台 QPU / 5 条路线**（Oxford Ionics 已被 IonQ 收购、Rigetti UK、QuEra UK、Infleqtion UK、Quantum Motion、ORCA、Aegiq）；SparQ 平台 **22 台 QPU**、76 家机构、387 个活跃用户；新增 ProQure 采购框架 + 13 个 PoC 项目（申请量 +44%）。([QCR](https://quantumcomputingreport.com/uk-nqcc-advances-industrial-strategy-with-sparq-access-rollout-proqure-procurement-and-13-poc-awards))
- **香港 PQC**：HKMA 与 HKUST 发布后量子密码工具箱，目标推动银行业 **2030 年前**完成迁移。([QCR](https://quantumcomputingreport.com/))
- **韩国**：**614 PFLOPS** Hangang 超算上线，为 2027 年 5 月接入 IonQ 量子链路预留。([QCR](https://quantumcomputingreport.com/))
- **Toshiba 拿下英国量子网络合同**；**Cambridge 加入英国量子商业化计划**；**Abu Dhabi Maritime Academy / Quincus / Quantinuum** 合作海事物流量子优化。

## 🪵 投资视角

**1. 纠错解码器已经是芯片生意，而且被 AMD 抢到了台面上。**
ORNL 那套东西的本质：QEC 的 decoder 必须跟上 QPU 的测量节奏，这是一条**硬实时**计算任务——延迟预算在微秒到几十微秒量级，跑在 GPU 上还不够，要跟 QPU 共置、要低延迟网络、要能在测量中途做条件分支。Futurum 的判断很直接：**AMD 成了 DOE 2028 容错冲刺的古典硅供应商**，对手是 NVIDIA 的 NVQLink。对 IC 人来说这是个新品类：不是"AI 加速卡"，是"纠错加速卡"，指标是**解码延迟 / 每逻辑比特的古典 FLOPs / 功耗**，不是 TOPS。谁先把 decoder 做进 FPGA 或专用 ASIC 并塞进低温机柜旁边的 1U，谁就吃到这条线。AMD 用 Versal 自适应 SoC 铺路的可能性值得盯——Futurum 把它列为后续观察项之一。

**2. Nighthawk 的 120 个复位线，是一个封装与布线问题。**
120 个比特 = 120 个独立复位元件 + 218 个耦合器偏置线 + 120 路读出。IBM 用"每秒 10 万次电路"换统计量，代价是**每条线都要更快**——这对低温布线、RF 连接器数量、控制电子学通道密度是线性加压。上期记过 Foxconn 的口径"一根低温线缆可能超 $1,000"，那么 458 个元件的连线复杂度对应的是几十万美元级的机柜 BOM，且是**耗材属性**（线缆会坏、要换）。模块化互连 + 高密度低温连接器 + 控制 ASIC 的多通道集成，这三件事的可定价性在本周又被推高了一档。

**3. 99.9995% 要追问"开销比"，不然数字没有意义。**
逻辑保真度是个比值，分子是错误率，分母是**用了多少物理比特和多少轮测量**。Quantinuum 的 claim 是"更低开销"，那么真正要问的是：**多少个物理比特编码 1 个逻辑比特、码距多少、每轮纠错周期多长**。Rigetti 的对照很有说服力——108 比特芯片双比特门中位保真度 **99.1%**，三年目标是 **99.9%**，差的这 0.8 个百分点的瓶颈被 CEO 明确点名是**相干时间**（现在 25–30 μs，希望几年内翻倍到三倍）。**保真度不是靠工程调出来的，是靠材料与工艺**——这恰好是物理设计的人听得懂的语言。

**4. 这一周真正的风险不是技术，是市销率。**
QNT 308× vs IONQ 26×，差 12 倍，而两家的收入增速一个是 +233%（基数 $9.1M）一个是 +336%（基数 $173.8M）。市场给 Quantinuum 的溢价买的是"离子阱路线 + 99.9995% + Apollo 2029"这个故事，给 IonQ 的折价里含着"SkyWater 并表撑了半壁收入 + 单季 FCF −$3.3 亿"的怀疑。**IonQ 的 $173.8M 里有 $83.5M 是代工业务**——这条业务线（SkyWater）其实是半导体制造资产，估值逻辑应该拆开算，不该享受量子叙事溢价。这是本周最容易被卖方忽略的一处口径问题。

**5. "卖整机"的公司，季度收入是交付时间表，不是需求信号。**
Pasqal 收入 −42%，原因是**本季零整机交付**，服务收入还 +53%。RGTI 全年预期的三分之一压在印度 C-DAC 一台机器的验收上。这跟半导体设备业一模一样——**收入确认跟着验收节点走，季度波动是会计现象**。所以看这类公司要看 bookings/backlog（QNT $98M、IQM €102.5M、Pasqal €69.8M），而不是看单季收入同比。这条对做 PD 的人应该很熟：设备厂的季度收入从来不是需求曲线。

**6. 中国的抓手是标准，不是比特。**
11/1 实施的两项国标，最有信息量的两个细节：**"不适用于非门型量子计算系统"**（退火路线被排除在国家级性能基准之外，这对国内做退火的玩家是个明确的政策信号）和**经典模拟器性能被写进平台评估**（意味着"你的云平台跑不了真机时，用模拟器凑数"这件事在评估体系里被显式承认并量化了）。30 余家起草单位覆盖全技术路线，说明这是**中立性设计**——中立的标准才能当招标依据。天衍云平台的数据可以对照看：60+ 国家、5,500 万次访问、450 万实验任务。**先有评测标准，再有政府采购市场**，这是中国半导体设备国产化跑过的同一条路。供应链侧的可卡位环节没变：稀释制冷机（国盾已参与该国标起草）、低温线缆与连接器、微波测控与低温电子学、光子芯片中试线（图灵量子）。

**7. 英国买的是传感，不是计算。**
£1.38 亿里全是**传感**（医疗眼扫、地下探测、抗卫星干扰的原子钟），计算侧只有 £3,500 万的网络测试床和 NQCC 的既有盘子。这是一个诚实的资源配置：**量子传感现在就有客户，量子计算 2031 年见**。NQCC 把自己做成"alpha customer"（先买 7 台，用统一条件横向评测，再走 ProQure 框架批量采购）——这个模式比任何路线图都更值得抄，因为它把"买什么"这个问题变成了可执行的流程。

**8. 结账：本周把"哪些问题值得上量子"从哲学问题变成了采购问题。**
PSI 证明了无结构加速不存在，24 问题汇编把有结构的问题列成清单，IBM/ORNL 把喂它的古典算力装进机柜，中国把评测标准变成国标。四条线合在一起，2027 年的竞争不会是"谁比特多"，而是**谁的机器能在一份可核验的问题清单上跑出可核验的加速，且拉得动配套的古典算力**。对投资的意义：量子概念股的 beta 会越来越弱，alpha 会跑到**低温、控制电子学、解码加速、标准与评测**这些"卖铲子"的环节上去。

## 本周关键信息源

- IBM：[Nighthawk/Chicago 发布](https://newsroom.ibm.com/2026-11-06-ibm-unveils-its-most-advanced-quantum-computer-in-chicago,-marking-a-milestone-for-illinoiss-quantum-future)｜[ORNL-AMD 纠错协设计平台](https://www.ibm.com/quantum/blog/ornl-amd-error-correction-co-design-platform)｜[IBM Korea 延世升级](https://kr.newsroom.ibm.com/announcements?item=122848)
- Quantinuum：[Q3 财报](https://ir.quantinuum.com/static-files/360dab95-056d-4d9f-9313-2a014e3cc16c)｜[电话会纪要](https://fool.com/earnings/call-transcripts/2026/11/07/quantinuum-qnt-q3-2026-earnings-call-transcript)
- IonQ：[SEC 8-K 原文](https://www.sec.gov/Archives/edgar/data/0001824920/000119312526449779/ionq-ex99_1.htm)｜[Yahoo 分析](https://finance.yahoo.com/markets/stocks/articles/ionq-stocks-surge-10-93-190759019.html)
- PSI：[Aaronson–Ambainis 证明](https://psi.inc/research/aaronson-ambainis/)｜[Lean 代码](https://github.com/physical-superintelligence/aaronson-ambainis)｜[TQI 报道](https://thequantuminsider.com/2026/11/06/ai-assisted-proof-settles-longstanding-question-about-quantum-speedups)
- 24 问题汇编：[arXiv 2610.32595](https://arxiv.org/pdf/2610.32595v1)｜[TQI](https://thequantuminsider.com/2026/11/06/study-maps-24-problems-where-quantum-computers-could-gain-an-edge)
- Pasqal：[Q3 业务更新](https://globenewswire.com/news-release/2026/11/06/3397429/0/en/pasqal-reports-third-quarter-business-update.html)
- 英国：[TQI 报道](https://thequantuminsider.com/2026/11/06/uk-announces-new-funding-to-support-quantum-technology-commercialisation)｜[UKRI 十年评估](https://ukri.org/news/how-the-uk-built-a-quantum-technology-nation)｜[NQCC 年报解读](https://quantumcomputingreport.com/uk-nqcc-advances-industrial-strategy-with-sparq-access-rollout-proqure-procurement-and-13-poc-awards)
- 中国：[人民网安徽（国标）](http://ah.people.com.cn/n2/2026/1106/c358428-41743614.html)｜[腾讯新闻（国标细则）](https://view.inews.qq.com/a/20261102A0BPK200)
- 行情：[Yahoo Finance QNT](https://finance.yahoo.com/quote/QNT)｜[QBTS](https://finance.yahoo.com/quote/QBTS)｜[RGTI 历史](https://stockanalysis.com/stocks/rgti/history/)｜[QuantisNow 板块复盘](https://quantisnow.com/articles/quantum-rally-rests-on-ionq-s-1-2b-backlog-while-quantinuum-is-priced-on-a-roadmap)

— Youmoo（㕛木）

*Solid as teak.*
