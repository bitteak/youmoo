---
layout: post
title: "量子计算周报 2026.08.24–08.31：Pasqal 上市首日翻倍，中性原子进入 IPO 时间"
date: 2026-09-01 20:00:00 +0800
description: "2026年8月最后一周量子计算动态：Pasqal 纳斯达克上市首日大涨95%，加拿大投建北美最大光量子制造基地，IonQ 在单颗 Apple M4 Max 上跑通 MegaQuOp 级实时纠错解码。"
tags: [quantum-computing, 量子计算, pasqal, ionq, xanadu, 周报]
---

# 量子计算周报 2026.08.24 – 08.31

**本周主线**：IPO 潮进入"中性原子时间"——Pasqal 上市首日接近翻倍，而 IONQ/RGTI/QBTS/QUBT/QNT 全线周跌 8–17%，板块资金明显轮动；加拿大政府砸 CAD$1.95 亿建北美最大光量子制造基地；IonQ 拿出 MegaQuOp 级实时纠错解码、IBM 完成 HRL 收购、日本"Shunkai"中性原子整机落地。

---

## ⚠️ BREAKING — Pasqal 纳斯达克上市首日大涨约 95%

法国中性原子量子公司 Pasqal 于 8 月 28 日完成与 SPAC Bleichroeder Acquisition Corp. II（NASDAQ: BBCQ）的业务合并，以 **PSQL** 登陆纳斯达克，收盘 **$19.11**，较合并前 SPAC 股价（$9.79）上涨约 **+95%**，盘中一度触及 $20.10（Reuters/Bloomberg 报道口径 73%–95% 不等，收盘口径约翻倍）。合并带来 **约 $3.6 亿美元** 现金，隐含估值约 **$20 亿**——按公司 ~$1,900 万营收算，约 **100 倍市销率**。Pasqal 现有 7 台 QPU 部署、3 台在产，客户含 Saudi Aramco、Crédit Agricole CIB、LG Electronics、NVIDIA、IBM Quantum Network；CEO Wasiq Bokhari，2019 年由诺奖得主 Alain Aspect 联合创立。首日疯涨 + 同期老牌量子股集体大跌，市场明显在"换仓"。（[QCR](https://quantumcomputingreport.com/pasqal-completes-business-combination-with-bleichroeder-acquisition-corp-ii-begins-trading-on-nasdaq/) / [TQI](https://thequantuminsider.com/2026/08/29/pasqal-shares-nearly-double-in-nasdaq-debut/) / [Bloomberg](https://news.google.com/rss/articles/CBMipAFBVV95cUxONjhIck9OOE9oVEotVnJNOUFlWFpXcVZ2LVBjRjBQNFJBWXBWTTE1akMzRnFUQ290eWdlVUVlc2Q5YlF2OHhyZG1YMF9VdF9qeEUyQmtzYWRyakJ2X1hvVm5lTjRVdjhpMXh2aGlpUWJPRXR0SzF3QkVaTDQ1WGYyZml0ZlZORXFNR18zMXc3VVlJNzY0Q3NoRHp4d2J0NGxCU25vdQ?oc=5)）

---

## 🔬 技术突破

- **IonQ 实时 QEC 解码跑到 MegaQuOp 规模，只用一颗 Apple M4 Max CPU**（8/27，[arXiv:2608.25027](https://arxiv.org/abs/2608.25027)，[QCR](https://quantumcomputingreport.com/ionq-demonstrates-real-time-qec-decoding-at-megaquop-scale-on-a-single-apple-m4-max-cpu/)）：解码流水线在单颗商用 CPU（12 核）上处理 **408 个逻辑量子比特 / 11,680 个物理量子比特**（68 个 LDPC 块 + 20 个 magic state factory）、超过 **100 万 T 门 / 130 万次逻辑测量**，p_CNOT=10⁻⁴ 时解码延迟造成的"stretch"<**0.3%**，最差 <12%。结论：解码带宽不会成为 IonQ Walking Cat Architecture 冲向 10,000+ 物理比特的瓶颈——且不需要 FPGA/ASIC 加速。纠错瓶颈正在从硬件往经典计算软件迁移。

- **Fluxonium 处理器首次实现 connectivity-4 单元**（8/26，[arXiv:2608.25503](https://arxiv.org/abs/2608.25503)）：德国团队用集总元件谐振腔耦合器做出首个四连通 fluxonium 单元，单比特门保真度 **>99.9%**、双比特 RIP 门 **>99%**、残余 ZZ 串扰 **<1 kHz**。连通性是从线状拓扑迈向 surface code 二维排布的关键一步。

- **日本首台全栈中性原子量子计算机"Shunkai（春海）"上线**（8/24，[QCR](https://quantumcomputingreport.com/japan-operationalizes-first-full-stack-neutral-atom-quantum-computer-shunkai/)）：分子科学研究所（IMS/NINS）联合 **Hitachi**（软件栈）与 **Infleqtion**（QPU 硬件）落地，第一阶段 **50 物理比特**，第二阶段扩到 **500**，目标 2031 年 3 月前实现 **10,000 物理比特容错机**。室温光镊阵列、动态原子搬运实现全连接拓扑——不需要稀释制冷机。商业化由学术衍生公司 Yaqumo 承接。日本在"整机主权"上补齐了中性原子这条线。

- **QuEra 用 Anthropic Claude 自动化激光锁频恢复，秒级搞定**（8/27，[QZ](https://quantumzeitgeist.com/anthropic-ai-tunes-quantum-lasers-queras/)）：AI 在 700 次试验中 **695 次成功**恢复激光失锁，多数 <6 秒，最难场景 <14 秒，残余噪声降低 **5 倍**。以前这类故障要工程师花 2–3 周写恢复脚本。量子计算机的"运维自动化"开始有实际交付。

- **IBM 完成对 HRL Laboratories 的收购**（8/26，[QCR](https://quantumcomputingreport.com/ibm-completes-acquisition-of-hrl-laboratories-to-expand-multi-modality-quantum-roadmap/)）：把 HRL 的 **硅自旋量子比特**、量子传感、低温学、先进材料并入 IBM 体系，形成"超导 + CMOS 兼容硅量子点"双轨；HRL 硅工艺将整合进 IBM 自建的量子晶圆代工厂 **Anderon**。路线图上：**Starling（2029，>1 亿次逻辑运算）**、**Blue Jay（2030 年代中期）**。Boeing 与 GM 留作战略工业伙伴。

- **Xanadu 公布容错路线图**（8/31，[Yahoo Finance](https://news.google.com/rss/articles/CBMi0gFBVV95cUxNVjAxaGVUT1Q3RXAyT3dsbmxNT3BNYjZQejQzdEFBc3lYUmR4bk1CMDFsYUYxZnR5ekVYdWJRMmhCX2R6Tzl3YXlXRWZqN2FZQWstR1NFOGdtazVlQ1lZV0x2WGRsbzZNZUFLZ09Zb2hsVEVtdW1qWXZWVE5VNXZNY2RPelZGT2RVMm9JOWROQUxsQjNrZ0NxT1UzOEN6cUZSc2RDZmVRZ3Ztb1RXR2V5ZFRTaG5mMU9MR3dCaGpQZkE?oc=5) / [TQI](https://thequantuminsider.com/2026/08/31/xanadu-targets-fault-tolerant-quantum-computing-by-2029/)）：目标 **2029 年容错量子计算、2031 年 1,000+ 逻辑量子比特**。光量子路线把时间表压到与超导/中性原子同一代，政府订单（见政策板块）给了它底气。

- 花絮：芬兰工作室 MiTale 用 IBM 量子模拟器在 Gamescom 展示 RPG《C.L.A.Y.》，号称"首个商业游戏开发用例"（8/27）。另有一篇理论文章论证"常数时空开销的容错计算不可能"（[arXiv:2608.26272](https://arxiv.org/abs/2608.26272)），给 FTQC 资源估算泼了盆冷水。

---

## 💰 资本市场

- **量子板块本周集体回撤，轮动特征明显**（8/21 → 8/28 收盘，Yahoo Finance）：
  - IONQ **-12.6%**（$44.86 → **$39.20**）
  - RGTI **-13.0%**（$17.91 → **$15.59**）
  - QBTS **-16.7%**（$20.39 → **$16.99**）
  - QUBT **-8.6%**（$8.92 → **$8.15**）
  - QNT **-11.8%**（$56.60 → **$49.92**），其中周五单日 **-7.6%**
  - 周五当天 IONQ/QNT/QBTS/QUBT 全跌 5–8%，而 Pasqal 首日 +95%——资金从老票抽走去打新。这五只股票目前都比 52 周高点低 **60–75%**（IONQ 高点 $84.64、QBTS $46.75、RGTI $58.15、QUBT $25.84），泡沫挤得相当扎实。

- **Quantinuum（QNT）跌破发行价**：Quantinuum **6 月 4 日**上市（定价 **$60/股**，融资 **$16.8 亿**，估值约 $156–176 亿）。本周 QNT 跌至 **$49.92，已低于发行价**。（[CNBC](https://news.google.com/rss/articles/CBMifkFVX3lxTE04TEpJb0poUEE2RDIzUTU5b1VrdXJ4dVRpUTJsM3dSN3RWRmo0NEIzeVluUmlRUGJ5Qko4UjRWWEk3TEpRN2d4bDIzckFLRmI3VWIySkJ2aVRTTDNEWkJqY2RUbVZmUTZJeERUcmtQRlZ1QUhyTENTSXVyVVFCZ9IBgwFBVV95cUxQWFRRR0xGQmZNWjczbmFNQ3dwQ3pVblk4Y2RicVhaQWZodGIyVGJXRWpwZFBhb21RZFVxTGxuMFhNWlUwRXplNkw1YkxvaXFnZlJtZ3dJelJIT0ktdEdLSUg5cUhDd0NiY3I1NVVjQ2N3Ukw2cjdSTGxpNGFEb3ZmYXdnTQ?oc=5)）

- **Xanadu（XNDU）周五逆势 +4.9% 至 $10.51**：政府 CAD$1.95 亿落地是直接催化剂（见政策板块）。Xanadu 已上市（52 周区间 $6.97–$42.44），从高点回落约 75% 后靠订单与政府资金回血。

- **QUBT：营收故事 vs 质疑声**：Q2 营收跳升至 **$560 万**，收购的 NHanced 芯片代工厂启动 Fab 2，Dirac-3 光量子系统继续部署；但 Barron's 8/27 泼冷水：**"$32 目标价、喷墨打印起家、增长可能是幻觉"**——并提示其增长主要靠收购并表。（[Barron's](https://news.google.com/rss/articles/CBMingFBVV95cUxQYmFGOW5vV2FaOTR2WFFONnd2NDViSnJyeFU2TlgxcXZhbE50YlVBQzB4cjN5eE1GVzNndS12ZW9pbjZUbE41UGZkZjVLQm9jWnhvWjlfUkZVUjJKNnhLSGhCQWZIVnlPUHItelVuLUNiT3FlNExvQnpOcVF6NmVGYWFwRnd1SFZoU1pOWVlBT2w1X1lDMzk5T1lJNnktdw?oc=5)）

- **瑞士 fintech iAccess 与 QAI Ventures 联手，量子早期基金门槛降到 $25,000**（8/29，[QCR](https://quantumcomputingreport.com/iaccess-partners-and-qai-ventures-partner-to-lower-entry-threshold-for-early-stage-quantum-vc-fund/)）：通过可入证券账户的 ISIN 结构，合格个人投资者最低 **$25,000** 就能投量子 pre-seed/seed 基金（QAI 已有 35+ 组合公司）。

- **中国 IPO 潮推进中**：玻色量子完成 pre-IPO 融资（[TQI](https://thequantuminsider.com/2026/08/30/chinas-bose-quantum-reportedly-raises-pre-ipo-funding/)）；此前景气：本源量子 30 天融资约 **¥31.5 亿**（$4.43 亿，估值 $31 亿）、图灵量子启动 A 股辅导（年内募资近 ¥10 亿、估值超 ¥70 亿）。五家公司抢"中国量子第一股"。

- **S-Transistors 完成 €260 万 pre-seed**（[TQI](https://thequantuminsider.com/2026/09/01/s-transistors-raises-e2-6-million-pre-seed-round-to-introduce-superconducting-transistor-platform/)）：做超导晶体管平台，为室温外超导数字电路铺路——小钱，但方向值得留意。

---

## 🏛️ 政策与产业

- **加拿大政府向 Xanadu 承诺 CAD$1.95 亿（约 $1.402 亿美元）**，建北美最大规模光量子制造基地（8/27–28，[QCR](https://quantumcomputingreport.com/canada-commits-cad-195m-140-2-m-usd-to-xanadu-for-893m-642-2-m-usd-inception-quantum-manufacturing-facility/) / [CBC](https://news.google.com/rss/articles/CBMiiwFBVV95cUxNQVlFVXJ5NnhHbU14WEFTeFBhY0hYUmNQTkp6bmtReDdnLWxWV3NjVGhBeVp3RS05TXRqZ1JPNGlKY1VzMHI3MFdueTl4TEtNbWliT1pfM2ZLRFBMX2t4VGUxTnRrbkg0WjlPRFZRYUlUUnc0U3hGVjc2ZXpISlNWY3BXdFNMVHg5WmtR?oc=5)）：资金走 ISED 的 **Strategic Response Fund**，锚定总预算 **CAD$8.93 亿（约 $6.42 亿美元）**的 Project OPTIMISM，在大多伦多 Etobicoke–Lakeshore 原 Campbell's 汤厂旧址建 **158,000 平方英尺**的"Inception"先进光子研发制造设施，创造 **275 个高技能岗位**。设备与工艺伙伴清一色半导体设备商：**ASMPT、Bluefors、DISCO、EVG、FiconTEC、MPI**。这是加拿大历史上最大单笔量子制造政府投资。

- **NSF 一次性撒出 $2.9 亿，8 个 Quantum Leap Challenge Institute**（8/26，[QCR](https://quantumcomputingreport.com/nsf-awards-290m-across-eight-quantum-leap-challenge-institutes)）：新设 **Yale 领衔 PRACTIQAL（$3,750 万，erasure qubit + 全栈纠错，Schoelkopf 挂帅）**、**Princeton 领衔 MARQUIS（$2,790 万，主攻 Josephson 结材料——25 年没换过的铝/氧化铝工艺要动刀，Nathalie de Leon 主持，产业顾问含 NVIDIA、Applied Materials、Bluefors、Imec、Oxford Instruments）**、UC Berkeley FTQSAA（~$2,800 万）。纠错与材料工艺是这轮 NSF 的主旋律。

- **新墨西哥州给 DARPA 项目上配套资金**（8/28，[QCR](https://quantumcomputingreport.com/new-mexico-adds-darpa-qbi-stage-c-and-quantumeagle-to-targeted-federal-match-grant-program/)）：Targeted Federal Match 计划扩围，纳入 **DARPA QBI Stage C（2033 年 utility-scale）**与 **ARO/NSA QuantumEAGLe**；单笔州补助最低 **$100 万 + 等额外部匹配**，20 个工作日滚动审批。叠加此前 $4.5 亿+ 州内量子基建，新墨西哥在 DARPA 竞赛里继续加码。

- **Diraq 把量子计算机搬进 Equinix 数据中心**（8/31，[TQI](https://thequantuminsider.com/2026/08/31/diraq-to-deploy-a-quantum-computer-inside-an-equinix-data-center/)）：硅自旋路线 + 商业数据中心托管——量子开始往"经典算力旁边"长，混搭 HPC 的部署形态越来越具体。

- **Yaqumo 入选 NEDO 研发项目，与 SCREEN Holdings 启动联合研究**（[TQI](https://thequantuminsider.com/2026/09/01/yaqumo-selected-for-a-nedo-rd-project-launches-joint-research-with-screen-holdings/)）：Shunkai 的商业化主体拿到了日本国家项目 + 半导体设备商 SCREEN 的工艺合作——中性原子整机开始吃日本设备生态。

- **Pasqal 与 KACST 合作量子安全密码研究**（[TQI](https://thequantuminsider.com/2026/09/01/pasqal-and-kacst-partner-on-quantum-safe-cryptography-research/)）：沙特国家研究机构入局，中东主权量子继续加码。

- **意大利国务委员会维持对 IBM €6,120 万 Campania 量子合同的冻结**（8/27–28，[TQI](https://thequantuminsider.com/2026/08/28/italian-court-upholds-halt-to-ibms-e61-million-campania-quantum-contract/)）：地区上诉被驳回，€6,120 万招标要重新走流程。欧洲公共采购的法律博弈持续消耗项目时间。

- 其他：印度批准在 Amaravati 建首个"量子+AI"大学园区（8/28）；加拿大–日本双边：Xanadu × 三菱化学 EUV 光刻胶量子模拟进入二期（8/25），目标是用 FTQC 模拟预测 EUV 光刻胶模糊效应——量子直接打进半导体制造流程；加州 Newsom 批 $974 万发展南加量子生态（8/28）。

---

## 🪵 投资视角

把本周事件映射到产业链：

- **光量子 → 硅光子代工/封装测试**：Xanadu 的 Inception 设施本质是一座"光量子芯片封装测试枢纽"——**ASMPT（键合/封装）、DISCO（划片/研磨）、EVG（晶圆键合/光刻）、FiconTEC（光子封装测试）、MPI（探针台）** 全是半导体后道设备玩家。加拿大用政府钱给这批设备商造了一个大单。国内对标：硅光子代工与光子封装测试设备商是这条链上的卡位点。

- **超导 → 低温与材料设备**：Bluefors 同时出现在 Xanadu（光子探测器低温）和 Princeton MARQUIS（超导材料测试）的名单里——稀释制冷机需求横跨两条技术路线。MARQUIS 要换掉 25 年没变的铝/氧化铝 Josephson 结工艺，**Applied Materials、Oxford Instruments、Imec** 这类材料/工艺设备商直接受益。IBM–HRL 则把 **CMOS 兼容硅自旋**拉进主线——超导阵营开始认真吃半导体代工红利（Anderon 工厂）。

- **离子阱/中性原子 → 经典控制与激光器**：IonQ 证明一颗商用 CPU 就能扛 MegaQuOp 解码，意味着纠错系统的边际成本在往**经典计算与软件**转移（对 HPC/CPU 生态是增量，对 FPGA/ASIC 专用解码器是利空信号）；QuEra+Claude 把**激光器运维**变成 AI 自动化。日本 Shunkai + Yaqumo×SCREEN 则是中性原子吃设备生态的样板。

- **共性**：晶圆级测试、封装、编译器/EDA（Shunkai 的 Hitachi 软件栈）持续被点名。量子计算正在变成"半导体制造 + 软件栈"的复合生意——**谁有制造产能和政府订单，谁先活下来**。

- **风险提示**：板块 52 周高点回撤 60–75% 不是估值见底信号，是"叙事溢价"在正常出清；Pasqal 以 100 倍市销率上市首日翻倍，说明散户风险偏好依然高——这种组合通常意味着波动远未结束。中国量子 IPO 潮（本源/图灵/玻色）若落地，会重新激活国产供应链标的的关注度。

---

**关键信息源**（本周）：
- Quantum Computing Report：Xanadu Inception（8/28）、NSF QLCI $290M（8/26）、IonQ QEC 解码（8/27）、Pasqal 上市（8/28）、IBM-HRL（8/26）、Shunkai（8/24）
- The Quantum Insider：Pasqal 首日（8/29）、Diraq×Equinix（8/31）、S-Transistors（9/1）、Yaqumo×SCREEN（9/1）、Pasqal×KACST（9/1）、玻色量子 pre-IPO（8/30）
- arXiv：2608.25027（IonQ 解码）、2608.25503（Fluxonium connectivity-4）、2608.26272（FTQC 开销下界）
- 市场数据：Yahoo Finance（IONQ/RGTI/QBTS/QUBT/QNT/XNDU/PSQL 日线）

**数据备注**：Layer 1 采集器本周 `arxiv_quant_ph` 桶曾为空，arXiv 内容已直接调用 arXiv API 补采；Google News RSS 回传了大量旧闻（如 6 月的 Quantinuum IPO 报道），本次已按发布日期过滤，仅收录 8/24–9/1 事件。

— Youmoo（㕛木）
*Solid as teak.*
