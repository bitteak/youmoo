---
layout: post
title: "量子计算周报 2026.09.21–09.27：一颗 CPU 顶掉一个机房"
date: 2026-09-27 20:30:00 +0800
description: "本周量子计算：IonQ 用单颗 12 核 CPU 完成 408 逻辑比特规模的实时纠错解码并拿下 NVIDIA 首个 on-prem QPU；Infleqtion 在商用中性原子机上做出 30 个纠缠逻辑比特；德国政府押 1.22 亿欧元建千比特离子阱机。IONQ 周涨 16%，QNT 与 PSQL 掉队。"
image: "/assets/youmoo-og.png"
tags: [quantum-computing, 量子计算, 周报]
---

**本周主线**：**纠错正在从"硬件问题"变成"软件与经典算力问题"**。9/22–23 **IonQ 展示单颗 12 核通用 CPU 完成 MegaQuOp 级电路的实时纠错解码**——408 个逻辑比特规模的负载，处理拉伸（stretch）低至 **0.02%**；同一天它拿下 **NVIDIA 加速量子研究中心（NVAQC）首个 on-prem QPU** 席位。9/24 **Infleqtion 在商用中性原子机 Sqale 上用 80 个物理原子做出 30 个纠缠逻辑比特**，把物理-逻辑开销压到 **8:3**。9/23 **德国政府选中 QUDORA 牵头的 7 方联盟，5 年 1.22 亿欧元**建 ≥1,000 物理比特 / 50 逻辑比特的容错离子阱机，并配一条 QPU 半导体中试线。结果是：**IONQ 一周 +16.2%，QNT -4.0%、PSQL -8.5%**——板块普涨结束，资金开始挑人。

---

## ⚠️ BREAKING（1）— IonQ：一颗通用 CPU 撑住 408 逻辑比特的解码负载

9/22，IonQ 公布端到端实时量子纠错（QEC）解码流水线的验证结果，论文为 arXiv:2608.25027《Real-time decoder for a MegaQuOp quantum computer using a single CPU》（[QCR](https://quantumcomputingreport.com/ionq-demonstrates-real-time-qec-decoding-at-megaquop-scale-on-single-commodity-cpu/)、[IonQ](https://ionq.com/news)）。

为什么这件事重要：容错架构里，解码器必须比 QPU 产出 syndrome 的速度更快地清空队列。清不完，量子机就得停下来等经典侧——业界一直默认这需要定制 FPGA 或 GPU 集群。IonQ 的结论是：**不一定**。

- **算力**：单颗 **12 核通用 CPU**（off-the-shelf），单芯片经典算力分配
- **负载**：**408 个逻辑比特**（68 个 LDPC 码块 + 20 个魔态工厂，共 88 个存储/工厂块）、**3,150 万次逻辑操作**、131 万次逻辑测量、55.5 万个 T 门
- **性能**：总拉伸时间低至 **0.02%**；负载包括无序 Heisenberg 模型与测量诱导相变（MIPT）
- **架构**：双滑动窗口解码器（Error Decoder 处理长期 Pauli frame + 低延迟 Outcome Decoder 处理 EDM 测量）；复用固定 Tanner 图、只动态更新 LLR 概率向量以省内存总线与缓存
- **意义**：它验证的是 **Walking Cat 架构的经典控制环节**——不靠 FPGA/GPU 农场也能做规模的实时 syndrome 处理

**必须标注的边界**：这项工作验证的是**解码流水线**，408 逻辑比特是**电路级仿真**规模，不是硬件上跑出来的逻辑比特演示。它拆掉的是"经典解码会先撞墙"这个论点，不是交付了一台容错机。

同一周 IonQ 还连着落了三件事：**Superion 256 成为 NVIDIA NVAQC 首个 on-prem QPU**（2027 年装机，经 NVQLink 与 GB200 NVL72 机架直连，CUDA-Q 编排，亚微秒 QPU-GPU 延迟，[QCR](https://quantumcomputingreport.com/ionq-selected-as-first-on-premise-qpu-deployment-at-nvidias-accelerated-quantum-research-center/)）；**FIU 采购 on-prem Superion 256**（2027 年底装入校园数据中心，服务 1,200 名教师与 5.6 万学生，[QCR](https://quantumcomputingreport.com/florida-international-university-contracts-ionq-for-on-premises-superion-256-trapped-ion-quantum-computer/)）；**与韩国 SDT 在龟尾建 SiV 量子存储装配枢纽**（[QCR](https://quantumcomputingreport.com/ionq-partners-with-sdt-to-deploy-superion-256-quantum-system-and-establish-siv-quantum-memory-assembly-hub-in-south-korea/)）。补一条背景，别搞错时间线：**IonQ 收购 SkyWater（$18 亿）7 月 31 日就已完成**，Superion 256 的片上电子量子控制（EQC）正是这条 CMOS 线的产物——本周是"用"它，不是"买"它。

## ⚠️ BREAKING（2）— Infleqtion：商用机上 30 个纠缠逻辑比特，开销 8:3

9/24，在 Quantum World Congress 2026 上，Infleqtion（NYSE: INFQ）宣布在其商用 **Sqale** 平台上实现 **30 个纠缠逻辑比特**，用 **80 个物理中性原子**编码，物理-逻辑开销比 **8:3**——这是目前商用中性原子系统上规模最大的逻辑比特纠缠（[QCR](https://quantumcomputingreport.com/infleqtion-achieves-30-entangled-logical-qubits-on-sqale-neutral-atom-quantum-processor/)、[TQI](https://thequantuminsider.com/2026/09/24/infleqtion-achieves-30-entangled-logical-qubits-on-its-sqale-quantum-computer/)）。

- **编码**：[[8,3,3]] / [[8,3,2]] 纠错码，10 个 8 原子块
- **电路**：IQP 基准电路 **1,000 次物理操作（1 KiloQuOp）**，含 **4 个横向逻辑 CCZ 门**（非 Clifford）
- **信号**：目标态采样命中率约为均匀随机背景的 **1,000×**；1B+ 希尔伯特结果上均匀命中约 25%
- **两个工程亮点**：① 用 **AI 发现的逻辑双 CZ 门**（论文署名 GPT 5.6 Sol）把每个逻辑纠缠的物理两比特门从 **8 个压到 4 个**，整条 30 比特电路只需 **136 个物理两比特门**；② Superstaq 里的**软件损耗校正**通过宇称重建，把原子丢失造成的测量缺失补回来，有效执行产出 **4×**
- **路线图**：**2028 年 100 逻辑比特、2030 年 1,000 逻辑比特**；已在 Wellcome Leap 的 Q4Bio 生物标记物发现项目中投入使用

INFQ 本周 **+9.7%**。它的意义不在"30"这个数字，而在**开销比**：把物理-逻辑开销真正压到 8:3，是产业最焦虑的那个指标第一次有了商用系统上的实证。

---

## 🔬 技术突破

- **Q-CTRL：在 156 比特 IBM Heron 上跑通 100 比特 QFT（9/23）**。论文 arXiv:2608.05435 提出 **Convolutional QFT** 编译架构，在 **ibm_boston**（Heron R3 超导）上执行最高 **100 个物理比特**的量子傅里叶变换，解析 **2^100 维**希尔伯特空间中的周期信号——公开报道中最大的功能性 QFT 硬件执行。关键是**线性近邻（LNN）拓扑上零路由开销**：用恒等抵消把 CX 数量做到与全连接架构理论下界相同（n²-n），再引入 1 个 ancilla + 2 个 CX 把 LNN 布局重构成平移不变的卷积核。实测 **50 比特过程保真度 11.4%（信号峰 10.8×）、80 比特 1.8%（7.5×）、100 比特信噪比仍 >1**（[QCR](https://quantumcomputingreport.com/q-ctrl-executes-100-qubit-quantum-fourier-transform-using-convolutional-compilation-strategy/)）。
- **QC Design：AI 把逻辑错误率再压 14.6×（9/24）**。Ulm 的 QC Design（CEO Ish Dhand、Prof. Martin Plenio）发布 **Meridian**，把"算法编译—纠错码选择—syndrome 提取电路—物理布局布线—脉冲控制"放进同一套跨栈协同优化。在 **100+ 个容错设计任务**（10 个纠错码族、6 类连通性、5 种硬件模态）上，**逻辑错误率中位数相对已发表最优方法降低 14.6×**（区间 1.5×–22,000×），相对前沿 AI 智能体（GPT-6 Astra）中位数再降 **43%**，最大降幅 **98.4%（约 63×）**，并消除无效/投机设计；校验依托其自有模拟"世界模型" Plaquette（[QCR](https://quantumcomputingreport.com/qc-design-unveils-meridian-purpose-built-ai-architecture-system-demonstrates-over-10x-reduction-in-logical-error-rates/)）。**纠错码的架构设计开始由 AI 做，而且比专家做得更好。**
- **独立跨栈基准：软件纠错在 IBM 自己的硬件上打赢 IBM 原生（9/23）**。arXiv:2608.05202，由美国天主教大学、Deusto 大学、安第斯大学联合完成，在 **156 比特 ibm_pittsburgh（Heron r3）**上同校准窗口对比 IBM Qiskit 原生原语、Q-CTRL Performance Management 与 Qedma QESEM。Sampler 赛道：30 比特 QPE 上 IBM 原始与 twirling 均为 **32,768 次采样零命中（0.00%）**，Q-CTRL 保持 **12.69%** 精确命中；100 比特随机镜像电路 Q-CTRL **76.45%** 对比 IBM 原始 **9.14%**。Estimator 赛道：整体 MAE 从 **0.0883 降到 0.0285（3.10× 改善）**，Qedma 磁化强度 MAE 低至 **0.0278**（[QCR](https://quantumcomputingreport.com/independent-cross-stack-benchmark-evaluates-commercial-quantum-error-management-on-156-qubit-ibm-heron-hardware/)）。
- **Microsoft 把 Majorana 2 交给 DARPA 测（9/22）**。Microsoft Quantum 在马里兰 College Park 的 Discovery District 启用 **15,000 平方英尺**量子研究中心（含保密研究区、硬件 makerspace 与测试设施），并把最新 **Majorana 2 拓扑芯片**（铝基材料栈更换为**铅基**以提升拓扑保护）交付 DARPA 的 **US2QC / QBI** 项目做独立验证，评估方包括 AFRL、JHU-APL 与 Los Alamos/Oak Ridge/LBNL/LLNL；makerspace 合作方是 AMD、Bluefors、Intel、IQM、Quantum Motion、Riverlane、Fermilab，控制栈直接用 Fermilab 开源的 **QICK**（[QCR](https://quantumcomputingreport.com/microsoft-opens-15000-square-foot-quantum-research-center-and-hardware-makerspace-in-maryland-discovery-district/)）。
- **其他**：Harvard 做出 **84 兆帧/秒** 的冷原子阵列光控系统（色散空间光调制器，强度分辨率 10⁻³，[QZ](https://quantumzeitgeist.com/atom-array-control-84-mfps-implementation/)）；**memQ 开源业界首个模态无关的分布式量子编译器 memQ DQC**（[QCR](https://quantumcomputingreport.com/memq-open-sources-industry-first-modality-agnostic-distributed-quantum-compiler-memq-dqc/)）；日本 NIMS/MANA 发现原子级台阶可**导引超导涡旋**，为超导器件一致性提供新抓手（[TQI](https://thequantuminsider.com/2026/09/26/mana-reveals-atomic-scale-rails-for-guiding-superconducting-vortices/)）；**钽薄膜**在超导量子电路上的性能持续上台阶——T1 从 2021 年 >300 µs、2022 年 >500 µs 到 2025 年**突破 1 ms**，共面谐振器内部品质因子首次**超过 1,000 万**，且低温行为与铝/铌明显不同（[QZ](https://quantumzeitgeist.com/tantalum-thin-quantum-circuits-films/)）。

## 💰 资本市场（9/18 → 9/25 收盘）

| 标的 | 9/18 | 9/25 | 周变动 |
|---|---|---|---|
| IONQ | $39.13 | $45.48 | **+16.2%** |
| RGTI | $15.76 | $16.66 | +5.7% |
| QBTS | $17.11 | $17.41 | +1.8% |
| QUBT | $8.70 | $8.96 | +3.0% |
| QNT（Quantinuum） | $51.58 | $49.53 | **-4.0%** |
| INFQ（Infleqtion） | $13.23 | $14.51 | **+9.7%** |
| IQMX（IQM） | $9.54 | $10.61 | **+11.2%** |
| PSQL（Pasqal） | $7.64 | $6.99 | **-8.5%** |
| ARQQ（Arqit） | $20.13 | $24.60 | **+22.2%** |
| IBM | $229.55 | $225.51 | -1.8% |
| NVDA | $222.27 | $225.07 | +1.3% |

- **IONQ 一个人抬走了整个板块**：9/23 单日 +4.4% 并放出 **7,256 万股**（常态 1,500–2,000 万级，约 4–5 倍），9/24 再 **+5.7%** 收 $44.98，9/25 收 $45.48 创周内高点。周涨幅 **+16.2%**，几乎全部来自解码里程碑 + NVIDIA NVAQC 两条消息。
- **分化才是本周真正的信号**：**QNT 连跌五天**（51.15→51.39→50.11→49.39→49.53），本周没有一条产品级消息；**QBTS 在 9/23 逆势跌 4.3%**，同一天 IONQ 涨 4.4%——这是典型的**资金在板块内部换仓**，不是板块级买入；**PSQL 9/25 单日 -4.8%**，直接由半年报触发。
- **Pasqal 的解构式半年报**：收入 **€487 万（+13.7%）**，其中 QPU 相关服务收入 **€390 万（+34.0%）**；但**营业亏损扩大到 €5,916 万（同比 +199%）**，含 **€2,730 万股份支付**与 **€1,020 万**一次性上市费用；净亏损 **€5,324 万**。截至 8 月 27 日上市后现金 **约 €3.129 亿**，6 月 30 日订单+授标 **€7,040 万**。技术面：已扩展到 **1,024 个原子**并演示**逻辑比特执行**（[QCR](https://quantumcomputingreport.com/pasqal-reports-h1-2026-financial-results-e312-9m-post-spac-cash-balance-14-revenue-growth-and-1000-atom-scale/)）。**收入在涨，但烧钱速度快 15 倍——上市后的估值锚会回到现金消耗曲线。**
- **ARQQ 周涨 22.2%**（9/21 单日 +16.9%），是本周第二大涨幅。同期线索：**Babcock 与 Arqit 在 DVD 2026 演示量子安全战术通信**（9/22，[QCR](https://quantumcomputingreport.com/babcock-and-arqit-demonstrate-quantum-safe-tactical-communications-at-dvd-2026/)）；另有 Heritage Assets 在权证到期前以 $2.50/股行权（9/23）。**量子安全（PQC）是目前唯一有现金流的量子叙事。**
- **IQMX 周涨 11.2%**，触发点是 **BTIG 首次覆盖给予买入评级**（9/21）。
- **一级市场**：**Mesa Quantum 超额认购 $1,180 万**，由 Playground Global 领投（DCVC、J2 Ventures 参与），累计融资近 **$1,600 万**，另有 **$500 万**来自 SpaceWERX 等政府国防拨款；产品是芯片级原子钟（CSAC）与量子惯性传感器，用于抗干扰的替代 PNT，在**新墨西哥**扩产并与 Sandia/CINT 共建 VCSEL 与光子集成回路（PIC）产线（[QCR](https://quantumcomputingreport.com/mesa-quantum-raises-11-8m-to-scale-chip-scale-quantum-sensors-and-alternative-pnt-infrastructure/)）。**Qambria（苏黎世）完成 CHF 200 万（$240 万）pre-seed**，Syntropy 领投，做亚微秒级、厂商与模态无关的经典控制层，走**IP 授权**模式（[QCR](https://quantumcomputingreport.com/qambria-secures-2-4m-pre-seed-funding-to-commercialize-sub-microsecond-classical-control-infrastructure-for-fault-tolerant-quantum-systems/)）。**Azulene Labs 拿到 $340 万** pre-seed（Ground State Ventures 领投），用量子力学训练数据造分子发现的 AI 模型（[QZ](https://quantumzeitgeist.com/azulene-labs-34m-demonstration-gets/)）。**中国"清星异构计算"完成 A+ 轮**，三个月两轮累计近 **1 亿元人民币（约 $1,490 万）**，做"量子启发式 AI"，其 RiverONE 模型跑在经典硬件上（[TQI](https://thequantuminsider.com/2026/09/25/chinas-qingxing-raises-near-100-million-yuan-to-develop-quantum-inspired-ai/)）。英国量子初创今年融资额创纪录（Tech Funding News，9/21）。
- **政府级大额**：**德国 €1.22 亿（约 $1.388 亿）NFQC-1k**（详见下节）；**SEALSQ/WISeKey 与瑞士汝拉州签 MoU，CHF 4,000 万–6,000 万（$4,870 万–7,300 万）、6 年**，建主权后量子半导体与网络安全中心，围绕 QS7001 安全微控制器做 ML-KEM/ML-DSA 的个性化、密钥注入、测试与定制 ASIC（[QCR](https://quantumcomputingreport.com/sealsq-wisekey-and-canton-of-jura-execute-mou-for-chf-40-60m-48-7m-73m-usd-post-quantum-semiconductor-personalization-hub/)）；印度 DRDO 在扩容后的 **₹500 亿卢比（约 $5,220 万）** TDF 框架下签出首个高价值项目。

## 🏛️ 政策与产业

- **美国 DOE 的国家量子路线图落地（9/25–26）**。SCAC 量子委员会报告《**Path to an Integrated Quantum Future**》正式发布，由 **Fermilab CTO Anna Grassellino 任主席、芝加哥大学 PME 的 Supratik Guha 任副主席**，采纳数百位来自国家实验室、高校、产业界与联邦机构的意见（[Fermilab](https://news.fnal.gov/2026/09/doe-releases-national-quantum-computing-roadmap-following-field-wide-effort-led-by-scac-subcommittee/)、[QZ](https://quantumzeitgeist.com/energy-department-advisers-error-corrected-quantum-computers-roadmap/)）。三句话抓住它：**① 目标写死"2028 年前展示科学相关的、纠错量子计算机"**；**② 评价标准从硬件指标转向"科学效用"**——报告原话是"我们的目标不是造最大的量子计算机，而是解决否则完全无法解决的问题"；**③ 长期愿景是建一座专用的 Quantum Computing User Facility**。这和 9/18 的 Quantum Genesis Q（$2.15 亿、门槛 ≥100 逻辑比特）是同一套政策的两只手：**先定验收标准，再发钱。**
- **德国用一条半导体中试线押离子阱（9/23）**。联邦教研与技术部（BMFTR）量子竞赛选中 **QUDORA Technologies 牵头的 7 方联盟**，执行 5 年 **€1.22 亿（约 $1.388 亿）**的 **NFQC-1k** 项目：目标 **≥1,000 物理比特 + 50 逻辑比特，逻辑门错误率 <0.01%**，并用 QFT 做全流程算法基准；**同时建一条 QPU 半导体中试线**。QUDORA 的技术路线是 **NFQC（近场量子控制）——用芯片级微波场取代笨重的激光阵列**，从而能直接接标准半导体工艺。联盟里有 **NXP Semiconductors Germany**（微制造与中试线）、**AQT**（低温封装与商用集成），学术侧是 TU Braunschweig、莱布尼茨汉诺威大学、PTB、Jülich。这是德国 HTAD 目标（**2030 年前部署至少两台欧洲容错量子计算机**）的关键一步（[QCR](https://quantumcomputingreport.com/german-government-selects-qudora-led-consortium-for-e122-million-138-8-usd-nfqc-1k-trapped-ion-quantum-computer-project/)）。同一周德国另拨 **约 €600 万**给 Paderborn 牵头的 **DETEQT** 项目做纳米线单光子探测器（SNSPD），Bartley 教授统筹 8 个项目（[QZ](https://quantumzeitgeist.com/bundesministerium-forschung-germany-investment-quantum/)）。
- **"地域集群"成为美欧量子产业的实际抓手**。马里兰一周内连收三家：**Microsoft** 15,000 平方英尺研究中心 + makerspace（9/22）；**QuEra 加入 Capital of Quantum 并在 Discovery District 设点**（9/22），同时与 **HPE** 达成战略合作，把容错中性原子 QPU 接进本地部署的 **HPE Cray** 超算，主打主权数据与低延迟，并规划**扩展至 Gigaquop 级**；云上则用 2028 年的 **Libra（>256 逻辑比特、megaquop 级）**做算法过渡（[QCR/HPE](https://quantumcomputingreport.com/quera-computing-and-hpe-partner-to-integrate-fault-tolerant-neutral-atom-qpus-with-on-premises-hpe-cray-supercomputers/)）；**Phasecraft 把美国总部设在弗吉尼亚 Arlington**，面向政府与国防量子软件（9/21）。
- **供应链自相矛盾的官方数据（9/23）**。QED-C、欧洲 QuIC、加拿大 QIC、UKQuantum、日本 Q-STAR、韩国 KQIA 等联合发布《Global Quantum Supply Chain Flows》：覆盖 **15 国 160 家量子企业**，**90% 依赖至少一个海外供应商**（中位数 3 个供应国），**74% 服务海外客户**（中位数 3 个客户国），采购横跨 **36 个供应国**、出口至 **49 个客户国**、在 **25 个国家**有制造业务；顶级枢纽是**美国、德国、英国、加拿大、日本**，欧盟整体算第二大枢纽（[QCR](https://quantumcomputingreport.com/global-survey-finds-90-of-quantum-companies-rely-on-cross-border-supply-chains/)）。**这份报告是给所有想搞出口管制的人看的：量子供应链的"卡脖子"是双向的。** QuEra 自己的调研则显示，**45% 的企业把容错路线图列为选择供应商的关键标准之一**，**成本效益以 50% 排第一**，**中性原子被 23% 的受访者选为领先架构**（[QZ](https://quantumzeitgeist.com/quantum-fault-tolerance-plans-quera-computing/)）。
- **后量子迁移变成一条完整的产品线**：**ETSI 发布 TR 104 171**，指出量子随机数发生器（QRNG）在真实硬件限制下的技术缺陷与实现漏洞，提出覆盖全生命周期的 **Entropy Zero Trust（EZT）**框架防侧信道（[QCR](https://quantumcomputingreport.com/etsi-identifies-technical-limitations-and-implementation-vulnerabilities-in-quantum-random-number-generators-etsi-tr-104-171/)）；**DigiCert Quantum Central 正式 GA**，在 DigiCert ONE 内做加密资产清点、合规追踪与自动化迁移（[TQI](https://thequantuminsider.com/2026/09/25/digicert-quantum-central-pqc-plans-action/)）；**Tezos 上线抗量子测试网 Quantumnet**（9/24）；**美国参议院商业委员会推进 Cruz-Warner《电信网络安全与韧性法案》**，走"自愿性、电信专用最佳实践 + 自愿认证 + 工作组"路线，背景是 Salt Typhoon 级别的电信入侵（9/27，[QZ](https://quantumzeitgeist.com/senate-commerce-committee-backs-cruz-warner/)）。
- **应用侧出现"官方验收式"基准**：DOE 与 Connected DMV 的 2026 Global Industry Challenge 围绕**电网韧性**（数据中心与先进制造带来的用电压力下的储能与微电网优化）展开，**Qtyche 团队夺冠**，其性能基准将作为后续量子计算进展的参照（[QZ](https://quantumzeitgeist.com/doe-connected-dmv-test-quantum/)）；IonQ 把量子生成模型（QCBM）搬到真实卫星 SAR/InSAR 数据上，在 MCAS Miramar 机场场景取得 **F1 0.37（理想模拟 0.41）**，显著高于经典 Copula（0.24）与 NLCD（0.16）基线（[QCR](https://quantumcomputingreport.com/ionq-demonstrates-quantum-generative-modeling-advantage-for-high-resolution-satellite-radar-change-detection/)）；CGI 与 D-Wave 建立全球 go-to-market 合作，把 Advantage2 退火 QPU 与混合求解器嵌进其 9.4 万顾问的 IT 服务版图（铁路调度、多级库存、末端配送）（[QCR](https://quantumcomputingreport.com/cgi-and-d-wave-partner-to-commercialize-enterprise-quantum-optimization-across-transportation-logistics-and-retail/)）。
- **量子计算进课堂，而且是真机**：Fairfax County 公立学校将在 **2026 年 12 月**于 Skyview 高中安装 **XeedQ XQ1e**——**4 比特、室温运行**，成为全美首个在校园内装物理量子计算机的 K-12 公立学区；Chattanooga 同步启动 K-12 量子课程（[QCR](https://quantumcomputingreport.com/fairfax-county-public-schools-to-install-xeedq-4-qubit-quantum-computer-at-skyview-high-school/)）。
- **中国：官方口径比产业口径冷静**。**中国信通院 9/22 在 PT 展发布《量子计算发展态势研究报告（2026 年）》**，核心判断值得逐条抄：技术路线"**多元并蓄，竞争格局短期难以收敛**"；现有原型机"在比特规模与运行精度上距容错通用计算目标仍有明显差距"；量子纠错"仍处于**理论完善与实验验证的初级阶段**，距极低逻辑错误率的实用化要求仍有较大差距"；**"现有应用案例未展现指数级加速或量子优越性的核心价值，商用化落地仍面临挑战"**；把**量子-经典混合**定位为"当前阶段推动量子计算走向实用化的重要路径"（[安全内参](https://www.secrss.com/articles/94238)）。产业侧：**太一量生（上海）**创始人方正浩接受新华量子访谈，选**镱原子中性原子**路线做国产容错整机，强调"镱原子难度更高但纠错与误差可擦除上限更高，且所依赖的激光与精密光学恰是中国的产业优势"，团队成立不足一年汇聚近百名青年科研人才（[新华网](https://www.xinhuanet.com/liangzi/20260923/c1bfc8227dae4314ab000809193a45f2/c.html)）；**上海徐汇全球首发量子计算异构计算底座 UnitarySpark 与"桌面工作台"**（上观新闻，9/21）；**北京团队"巧算"方案登上国际期刊封面**，讨论量子计算能否先行"跑通"（京报网，9/24）；第五届全球数字贸易博览会（9/23–27，杭州）设量子计算首发首秀。
- **人事**：D-Wave 董事会新增 **Bernard Gavgani**（金融科技与网络安全）；**Simon Phillips 出任 OQC 首席产品官**；**Doug Campbell（前 Solid Power CEO）出任 Bifrost Electronics CEO**（[QCR](https://quantumcomputingreport.com/whos-news-strategic-appointments-at-d-wave-quantum-oxford-quantum-circuits-and-bifrost-electronics/)）。

## 🪵 投资视角：价值池正在从 QPU 往"控制层"迁移

- **本周最重要的一条产业结论**：**纠错是软件与经典算力问题**。IonQ 用一颗 12 核 CPU 处理 408 逻辑比特规模的工作负载；QC Design 用 AI 把逻辑错误率中位数再压 14.6×；一份独立基准显示 Q-CTRL 的软件在 IBM 自家 156 比特 Heron 上把 30 比特 QPE 的精确命中率从 **0.00%** 拉到 **12.69%**，100 比特随机镜像从 **9.14%** 拉到 **76.45%**——**同一块硅片，软件把可用性翻了一个量级。** 映射到半导体：**面向实时 syndrome 解码的低延迟加速器（FPGA/PPU/ASIC）、高精度时钟与同步、低延迟互连（NVQLink 那一层）、以及射频控制前端（RFSoC/AWG）**。这一层的商业模型已经出现——**Qambria 走纯 IP 授权**，卖的就是"亚微秒级经典控制层"。对照经典计算，这层就是**量子版的 EDA + 编译器 + IP**。
- **中性原子的"逻辑比特经济性"暂时领先**。Infleqtion 用 80 个原子拿 30 个逻辑比特（8:3），配 AI 发现的低开销逻辑门与软件损耗校正；QuEra 的调研里 45% 企业把"容错路线图"当关键选型标准、中性原子被 23% 选为领先架构；QuEra 自己的 Libra 目标 **2028 年 >256 逻辑比特**。对应供应链：**光镊与空间光调制器（Harvard 那套 84 MFPS 色散 SLM 就是这一类）、高功率窄线宽激光器、低损耗光学窗口与低温光学**。对照传统半导体，**高精度光学系统是中国明确有产业优势的环节**——太一量生选镱原子路线，逻辑上说得很清楚。
- **超导路线的材料叙事正在从铝/铌转向钽**。钽薄膜的 T1 三年内从 300 µs 走到 **>1 ms**，共面谐振器内部 Qi 首破 **1,000 万**，且低温行为与铝/铌在机理上明显不同（β 相杂质是待解问题）。**靶材、薄膜沉积与退火设备、以及围绕约瑟夫森结均匀性的工艺控制（Anderon/IBM 那条"激光退火调临界电流"的路线）** 会因此获得新的差异化空间。
- **"量子硬件半导体化"出现两条清晰的技术分叉**。一条是 IonQ：**SkyWater CMOS 上的片上电子量子控制（EQC）**彻底去掉自由空间光路，整机塞进标准机架，从 256 比特往 10,000+ 比特走；另一条是德国 **QUDORA 的 NFQC**：芯片级微波场取代激光阵列，并**直接配一条 QPU 半导体中试线**（NXP 参与）。两条路的共同点是——**谁能把 QPU 变成标准晶圆厂能做的产品，谁就拿到了规模化的入场券**。NXP 这种车规/工业级成熟制程厂商出现在量子中试线里，是个非常值得记下的信号。
- **封装与光互连正在从"配角"变成"瓶颈"**。**SENKO × PHIX** 为光子多芯片模块做**可拆卸的标准光纤接口**（Micro Prism Array + 6DoF 对准），PHIX 的恩斯赫德工厂定位欧洲卓越中心，明确对标 AI 基础设施与 HPC 的规模化（[QZ](https://quantumzeitgeist.com/senko-phix-create-common-interface/)）。对应半导体产业链的**先进封装、光电共封（CPO）、光纤阵列（FAU）、封装级测试**——这些也是量子与 AI 双需求叠加的少数几个格子。
- **卖铲人仍然是确定性最高的一格，而且本周的钱几乎全落在这里**：德国 €1.22 亿里含 **QPU 半导体中试线**，另拨 €600 万做 **SNSPD**；印度 DRDO 立项 **20 mK 稀释制冷机**（本土供应链、去进口依赖）；Creotech 拿 **ESA €233 万（$266 万）**做 24 个月的**航天级 SNSPD**，其 eCAUSIS 项目（总预算近 €700 万）的 DV-QKD 平台通过欧盟委员会验收、转入商用。**稀释制冷机、SNSPD/单光子探测、低温 LNA、激光与精密光学、QPU 中试线设备——一条路线都不依赖哪家量子路线胜出。**
- **中国卡位**：本周官方与产业同时释放"补装备、补软件、补容错系统能力"的信号——信通院把量子-经典混合与基准测评写进建议、太一量生主打镱原子容错整机并明确倚赖国产激光与光学产业链、徐汇在做异构计算底座（把 QPU 当加速器接进经典栈，与 Qambria 的思路同构）。**跟上周一样：钱和政策都在往"下游可交付"走，而不是再刷一遍比特数。** 但要记住信通院自己那句话——**现有应用案例还没展现出量子优越性。**
- **风险**：① **板块普涨结束**。本周 IONQ +16.2% 的同时 QNT -4.0%、PSQL -8.5%、QBTS 在 9/23 逆势下跌，"量子板块"作为整体的贝塔正在消失，往后赚的是个股的钱；② **IonQ 的解码里程碑是仿真规模 + 软件栈验证**，不是硬件逻辑比特演示，把两者混为一谈会严重高估进度；③ **Pasqal 的半年报提醒了现金消耗的斜率**（营业亏损同比 +199%，收入只有 €487 万），上市后的量子公司估值锚会回到现金流折现；④ **叙事正在打架**：QuEra 说"两年内有用"，信通院说"还没看到量子优越性"，DOE 说"2028 年展示科学效用"——对同一个时间轴的三套说法，**做投资时至少要同时听到两边**；⑤ 供应链调查与出口管制的张力是双向风险，管制的反噬可能落在本国企业的采购成本上。

---

## 来源列表

- IonQ 实时 QEC 解码：[QCR](https://quantumcomputingreport.com/ionq-demonstrates-real-time-qec-decoding-at-megaquop-scale-on-single-commodity-cpu/) / arXiv:2608.25027 / [IonQ](https://ionq.com/news)
- IonQ × NVIDIA NVAQC：[QCR](https://quantumcomputingreport.com/ionq-selected-as-first-on-premise-qpu-deployment-at-nvidias-accelerated-quantum-research-center/)
- IonQ × FIU / SDT：[QCR](https://quantumcomputingreport.com/florida-international-university-contracts-ionq-for-on-premises-superion-256-trapped-ion-quantum-computer/) / [QCR](https://quantumcomputingreport.com/ionq-partners-with-sdt-to-deploy-superion-256-quantum-system-and-establish-siv-quantum-memory-assembly-hub-in-south-korea/)
- Infleqtion 30 逻辑比特：[QCR](https://quantumcomputingreport.com/infleqtion-achieves-30-entangled-logical-qubits-on-sqale-neutral-atom-quantum-processor/) / [TQI](https://thequantuminsider.com/2026/09/24/infleqtion-achieves-30-entangled-logical-qubits-on-its-sqale-quantum-computer/) / Quantum World Congress 2026
- Q-CTRL 100 比特 QFT：[QCR](https://quantumcomputingreport.com/q-ctrl-executes-100-qubit-quantum-fourier-transform-using-convolutional-compilation-strategy/) / arXiv:2608.05435
- QC Design Meridian：[QCR](https://quantumcomputingreport.com/qc-design-unveils-meridian-purpose-built-ai-architecture-system-demonstrates-over-10x-reduction-in-logical-error-rates/) / [TQI](https://thequantuminsider.com/2026/09/24/qc-design-meridian-lower-error-rates-quantum-computing/)
- 独立跨栈基准（IBM Heron r3）：[QCR](https://quantumcomputingreport.com/independent-cross-stack-benchmark-evaluates-commercial-quantum-error-management-on-156-qubit-ibm-heron-hardware/) / arXiv:2608.05202
- Microsoft 马里兰中心 + Majorana 2：[QCR](https://quantumcomputingreport.com/microsoft-opens-15000-square-foot-quantum-research-center-and-hardware-makerspace-in-maryland-discovery-district/)
- QuEra × HPE / QuEra 调研：[QCR](https://quantumcomputingreport.com/quera-computing-and-hpe-partner-to-integrate-fault-tolerant-neutral-atom-qpus-with-on-premises-hpe-cray-supercomputers/) / [QZ](https://quantumzeitgeist.com/quantum-fault-tolerance-plans-quera-computing/)
- 德国 NFQC-1k：[QCR](https://quantumcomputingreport.com/german-government-selects-qudora-led-consortium-for-e122-million-138-8-usd-nfqc-1k-trapped-ion-quantum-computer-project/) / [TQI](https://thequantuminsider.com/2026/09/23/german-government-selects-qudora-led-consortium-for-e122-million-project/)
- DOE SCAC 路线图：[Fermilab](https://news.fnal.gov/2026/09/doe-releases-national-quantum-computing-roadmap-following-field-wide-effort-led-by-scac-subcommittee/) / [QZ](https://quantumzeitgeist.com/energy-department-advisers-error-corrected-quantum-computers-roadmap/) / DOE Office of Science
- 全球量子供应链调查：[QCR](https://quantumcomputingreport.com/global-survey-finds-90-of-quantum-companies-rely-on-cross-border-supply-chains/) / [TQI](https://thequantuminsider.com/2026/09/23/global-study-finds-quantum-industry-dependent-on-cross-border-supply-chains/)
- 一级市场：[QCR/Mesa Quantum](https://quantumcomputingreport.com/mesa-quantum-raises-11-8m-to-scale-chip-scale-quantum-sensors-and-alternative-pnt-infrastructure/) / [QCR/Qambria](https://quantumcomputingreport.com/qambria-secures-2-4m-pre-seed-funding-to-commercialize-sub-microsecond-classical-control-infrastructure-for-fault-tolerant-quantum-systems/) / [QZ/Azulene](https://quantumzeitgeist.com/azulene-labs-34m-demonstration-gets/) / [TQI/清星](https://thequantuminsider.com/2026/09/25/chinas-qingxing-raises-near-100-million-yuan-to-develop-quantum-inspired-ai/)
- Pasqal H1 2026：[QCR](https://quantumcomputingreport.com/pasqal-reports-h1-2026-financial-results-e312-9m-post-spac-cash-balance-14-revenue-growth-and-1000-atom-scale/) / [TQI](https://thequantuminsider.com/2026/09/24/pasqal-first-half-2026-financial-results/)
- PQC 与安全：[ETSI/QRNG](https://quantumcomputingreport.com/etsi-identifies-technical-limitations-and-implementation-vulnerabilities-in-quantum-random-number-generators-etsi-tr-104-171/) / [DigiCert](https://thequantuminsider.com/2026/09/25/digicert-quantum-central-pqc-plans-action/) / [SEALSQ·汝拉州](https://quantumcomputingreport.com/sealsq-wisekey-and-canton-of-jura-execute-mou-for-chf-40-60m-48-7m-73m-usd-post-quantum-semiconductor-personalization-hub/) / [Cruz-Warner](https://quantumzeitgeist.com/senate-commerce-committee-backs-cruz-warner/)
- 供应链与封装：[QZ/钽薄膜](https://quantumzeitgeist.com/tantalum-thin-quantum-circuits-films/) / [QZ/SENKO·PHIX](https://quantumzeitgeist.com/senko-phix-create-common-interface/) / [QZ/哈佛 84 MFPS](https://quantumzeitgeist.com/atom-array-control-84-mfps-implementation/)
- 中国：[信通院报告](https://www.secrss.com/articles/94238) / [新华网·太一量生](https://www.xinhuanet.com/liangzi/20260923/c1bfc8227dae4314ab000809193a45f2/c.html) / 上观新闻（9/21 徐汇 UnitarySpark 全球首发） / 京报网（9/24 北京团队"巧算"登国际期刊封面） / 全球数字贸易博览会（9/23–27）
- 市场数据：Nasdaq 历史行情 API（IONQ/RGTI/QBTS/QUBT/QNT/INFQ/IQMX/PSQL/ARQQ/IBM/NVDA），9/18–9/25 收盘

**数据备注**：Layer 1 采集器本周输出 `arxiv_quant_ph` **桶仍为空**（arXiv 官方 RSS 长期 429），本期 arXiv 侧改走 **Atom API 直连补采（60 篇）**，已正常拿到；采集器另有一处 bug —— `item.find("pubDate") or item.find("published")` 因空元素的布尔值为 False 而恒成立失败，导致 Google News 条目的日期字段**永远为空**，这也是为什么历次周报都得人工按 pubDate 过滤旧闻（Quantinuum IPO、TuringQ IPO 辅导、ScienceDaily 的"dark horse"其实是 7 月 anyon 工作的二次转载）。Google News 桶仍混入大量旧闻，本期已剔除。中文源除官方媒体外仍夹带博彩 SEO 垃圾页，已剔除。

— Youmoo（㕛木）
*Solid as teak.*
