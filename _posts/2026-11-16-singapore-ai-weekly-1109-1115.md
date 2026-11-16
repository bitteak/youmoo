---
layout: post
title: "新加坡 AI 周报：2026.11.09–11.15"
date: 2026-11-16 08:30:00 +0800
description: "Nvidia CEO 辞职与 Megaspeed 案重塑新加坡算力转口地位；IMDA 联手 Scale AI 发布法律推理基准，CSA 拨 560 万新元做 AI 安全，Staera 把光链路做进芯片。"
tags: [singapore, ai, 新加坡, 周报, semiconductor, export-control]
---

**窗口：** 2026-11-09 ~ 2026-11-15

## 本周主线

这周新加坡同时被两件事定义：一件是它无法控制的，一件是它正在建造的。

无法控制的那件——**Nvidia CEO 于 11 月 12 日辞职**。触发点是一桩私人关系，落点却是国家安全：当事人 Alice Huang 被美国情报界认定为中方情报资产，而她长期主掌的新加坡公司 Megaspeed 是 Nvidia 在东南亚最大的客户。一周之内，这条线从"企业合规疑云"升级为"新加坡转口模式的信用问题"：MHA 11 月 12 日发声明（禁止 Alice Huang 入境）、11 月 13 日第五名被告被加控 41 项罪名、马来西亚同步调查 Speedmatrix 是否违规转口。

正在建造的那件——**评估能力**。11 月 12 日 IMDA 与 Scale AI 发布 SG-LegalClarify 法律推理基准；11 月 10 日 CSA 把 560 万新元发给 13 家做 AI 安全、后量子与 OT 安全的公司，并开出 CyberCall 2026。加上 10 月已通过的《数字基础设施法》，新加坡的思路很清楚：**既然拦不住芯片流动，就把"可核查"做成产业。**

技术上本周只有一条硬新闻值得 IC 人停下来看：Staera Semiconductor 从 SMART 分拆出来，把 GaN LED 与氮化硅波导做进硅片，试图用光替代芯片间的铜。

## 政府政策与监管

**1. 数码部长 Josephine Teo 访问华盛顿（11/12–13），谈"可信扩散"**
Teo 会见了白宫科技政策办公室（OSTP）主任 Michael Kratsios，议题包括 AI、量子与网络安全，双方讨论"增强先进 AI 系统可信扩散（trusted diffusion）的务实方式"。她在美东商会（USABC/USCC）圆桌上透露：OpenAI 正在新加坡组建规模可观的 forward-deployed engineers 团队，Anthropic 则把新加坡定位为 AI 研究与 assurance 的基地。
- https://mddi.gov.sg/newsroom/minister-josephine-teo-s-meetings-with-senior-u-s--government-officials-in-washington-d-c--from-12-to-13-november-2026
- https://mddi.gov.sg/newsroom/opening-remarks-by-minister-josephine-teo-at-us-asean-business-council--usabc--and-us-chamber-of-commerce--uscc--roundtable-in-washington-dc

**2. MHA 公布 Megaspeed 调查结论（11/12），同日第五人被控**
内政部声明：2025 年 2 月起调查 Megaspeed 与 Alice Huang，结论是**没有足够证据**证明其涉及间谍相关罪行；但因"提供不准确信息以淡化自身角色"，Alice Huang 被禁止再入境。声明点名 Super Micro 配合有限，并称新加坡多次向美方索取信息"至今只得到有限协助"。11 月 13 日，第五名被告被加控 41 项罪名，系列指控涉及约 3.9 亿新元的服务器交易。
- https://www.mha.gov.sg/media-room/newsroom/singapore-investigations-into-alice-huang-huang-le-and-megaspeed-international-pte-ltd/
- https://www.cnbc.com/2026/11/13/nvidia-jensen-huang-alice-spy-megaspeed-.html

**3. CyberCall：5.6M 新元发 13 家，2026 轮开跑（11/10）**
在 CyberSG Innovation Day 上，CSA 发放约 560 万新元给 13 家机构，覆盖 AI 安全、OT 安全与后量子密码。项目里最贴"代理时代"的是 Flexxon 的 X-PHY AI Armour：把 MCP 代理与安全存储硬件绑在一起，检测提示注入与工具劫持；身份管理类项目则直接做 AI agent 的凭证体系。CyberCall 2026 分 Open Call（六大优先领域）与 User-Driven（CSA、CAAS 出题）两条道，2027 年 1 月 9 日截止。CSA 局长 Gwenda Fong 明确要求把《Securing Agentic AI Addendum》的指引做成可测试、可监控的工具。
- https://www.techedt.com/singapore-awards-s5-6-million-to-13-cybersecurity-firms-as-cybercall-2026-opens
- https://www.straitstimes.com/tech/csa-awards-5-6m-to-13-projects-developing-cybersecurity-tools

**4. IMDA × Scale AI 发布 SG-LegalClarify（11/12）**
新加坡法律推理基准：1,100 道由执业律师撰写的题目、10 个法律领域，其中 760 题故意缺关键事实，配成 1,860 个场景，考的是**模型会不会主动追问**。19 个模型参测，结果不好看：无联网时最高分只满足 69.8% 的必答评分项、平均 53.8%；开联网后平均 63.0%、最高 77.8%。**缺事实场景中约 39% 完全没有提出澄清问题**，规则召回（rule recall）在有联网时也只有 56.5%。
- https://scale.com/blog/scale-imda-legal-reasoning-benchmark
- https://www.unite.ai/scale-ai-launches-singapore-legal-reasoning-benchmark-with-imda/

**5. 数据中心绿色融资标准改口径：允许"以电换水"（11/11）**
SSFA 在 MAS 支持下于 COP31（安塔利亚）发布《新加坡-亚洲可持续金融分类法》第二版。境外数据中心的 Green 门槛改为 **PUE ≤ 1.40 − 0.0545 × WUE**（WUE 上限 2.2），Amber 为 1.45 − 0.04545 × WUE（上限 2.3）。含义很直白：水用得少，电可以差一点。PUB 另给出新建与既有数据中心 WUE ≤ 2 m³/MWh 的目标（非强制）。背景是 10 月通过的《数字基础设施法》：IT 负载 ≥ 3MW 的设施需持牌并满足 PUE 要求，2027 年实施。
- https://capacityglobal.com/news/63-of-asias-data-centres-face-water-stress-singapore-revises-financing-criteria
- https://datacenters.economictimes.indiatimes.com/news/energy-cooling-sustainability/singapore-revises-data-centre-financing-criteria-for-water-stressed-asia/135820725

## 行业动向

**6. Nvidia 换帅：Jensen Huang 辞职，CFO Colette Kress 任临时 CEO（11/12）**
董事会宣布 Huang 辞去总裁、CEO 与董事职务，即刻生效；Kress 兼任临时 CEO 直到确定继任者，Harvey Jones（前 Synopsys CEO/执行董事长）出任董事会首任主席。公司强调运营、客户承诺与产品路线不变，Q3 FY2027 财报仍按原计划 11 月 17 日发布。推动辞职的是两段婚外关系，其中一段的对象正是被指为情报资产的 Alice Huang。
- https://nvidianews.nvidia.com/news/nvidia-announces-ceo-transition
- https://www.bbc.co.uk/news/articles/ckgel338xql3o

**7. Megaspeed 的资金链被逐层剥开**
《The Information》称 Alice Huang 与 Huang 的私人关系促成了至少 75 亿美元的 Nvidia 芯片流向中国客户；NYT 数据是 Megaspeed 自 2024 年 6 月起采购超 48 亿美元芯片。ST 拿到的公司登记文件显示：Megaspeed 马来西亚子公司 Speedmatrix 于 2024 年 6 月 18 日将设备、IP 及相关权利抵押给新加坡公司 Apex Enterprise Solutions，该安排至 2026 年 11 月 11 日仍有效——做空机构 Culper 曾指 Apex 是阿里资金的通道。另有两个细节值得记住：Nvidia 于 2025 年 6 月把 Megaspeed 列入内部禁售名单；Nvidia 在 2025 年悄悄改了新加坡收入的披露方式。
- https://www.straitstimes.com/business/alibaba-megaspeed-financing-link-traced-via-spore-malaysia-units-allegedly-to-buy-nvidia-servers
- https://fortune.com/2026/11/12/nvidia-changed-earnings-report-format-singapore-revenue-megaspeed-probe-colette-kress
- https://www.cnbc.com/2026/11/12/nvidia-megaspeed-alice-huang-jensen-.html

**8. Singtel：上调指引，称 Nvidia 事件影响"相当有限"（11/13）**
半年度业绩会上，Singtel 把 FY2027 的 OpCo EBIT 增长指引从中个位数上调到中高个位数，同时给 Nvidia 事件定了调：**没有影响**。RE:AI 主权云已到货 4MW 算力的芯片并在跑，另有 2MW 在途且预计准时；即使延迟，也可切换其他供应商。关键是比例——数据中心与数字基础设施只占集团 EBITDA 的 5%。分析师则给出另一面：东南亚出货的 KYC 与审计会显著加码，小型与新设托管商受冲击最大。
- https://www.straitstimes.com/tech/no-impact-on-chip-supply-partnerships-amid-resignation-of-nvidia-ceo-singtel

**9. Airwallex 把新加坡做成全球共同总部：S$20 亿、1,000 人（11/11）**
澳大利亚起家的支付平台宣布未来五年在新加坡投资逾 20 亿新元，本地员工从约 750 人增至 1,000 人以上，与旧金山并列为全球共同总部。Guoco Tower 扩至四层、逾 8 万平方英尺。2026 上半年新加坡收入与交易额同比均增 90%，新增岗位聚焦 AI、产品与工程。MAS 的 Future of Finance Institute 被官方反复提及作为配套。
- https://www.channelnewsasia.com/singapore/airwallex-new-office-fintech-investment-jobs-6541721
- https://www.businesstimes.com.sg/startups-tech/airwallex-invest-more-s2-billion-singapore-grow-headcount-here-over-1000

**10. Mastercard 开设亚太最大创新中心，2029 年前加 250+ 专才（11/12）**
7,200 平方英尺的 ICoE 分四块：AI 卓越中心（代理式商务、欺诈与诈骗防治）、Fusion Centre（网络安全+欺诈+实体安全联合响应）、体验中心、Makerspace。现有 55 名专才入驻，本地员工将于 2029 年超过 1,000 人。Mastercard 自己的预测是：到 2030 年，超过十分之一的网购者会常态使用 AI agent 代下单。
- https://www.humanresourcesonline.net/mastercard-to-add-over-250-specialist-jobs-in-singapore-as-it-opens-its-largest-apac-innovation-centre
- https://www.straitstimes.com/tech/mastercard-to-hire-250-more-staff-in-singapore-by-end-2029

**11. 数据泄露潮：SPH Media 五个系统被攻，CSA 称事件量翻三倍（11/10、11/13）**
SPH Media 披露 11 月 4 日至 8 日间五个系统遭攻击，占其数据库 9%，泄露以电邮、姓名、地址、电话为主；初步调查怀疑是 AI 赋能攻击。11 月 13 日 CSA 发公告：自 9 月起，月均报告的网络安全事件是 1–8 月平均值的三倍；10 月 24 日至 11 月 13 日至少 12 起涉及新加坡机构或其服务商。同期 MOH 确认六家医疗相关机构的泄露事件。
- https://www.channelnewsasia.com/singapore/sph-media-cyberattack-data-breach-6538681
- https://www.straitstimes.com/tech/beef-up-cyberdefences-now-csa-urges-all-organisations-as-reported-incidents-triple

## 创业与融资

**12. Staera Semiconductor 出隐身：460 万美元 pre-seed，把光链路做进芯片（11/10）**
前身 New Silicon Corporation，源自新加坡-MIT 联盟（SMART）低功耗电子系统研究组。Openspace Capital 领投，SGInnovate、Black Kite、28 Holdings、In Group、Decimus 跟投。产品 Lightwire 把三样东西做进同一片硅：CMOS 电路、GaN LED 光源、氮化硅波导——不是把激光器贴到芯片旁边，而是在商用晶圆上用芯片自己的工艺长出来。指标：每链路 4–8 Gbps、每毫米芯片边缘 600+ 链路、设计目标 < 0.2 pJ/bit（对比共封装光学约 5 pJ/bit）、24 TB/s 的 HBM 带宽（现役 HBM4 单栈 2.8 TB/s）、传输距离 > 50 mm（UCIe-A 片上约 2 mm）。它装在既有的 bridge/interposer 里，因此兼容现有封装。商用目标 2030 年。
- https://technode.global/2026/11/11/singapores-staera-semiconductor-raises-4-6m-to-put-optical-links-inside-ai-chips
- https://www.staera.ai/blog/staera-emerges-from-stealth
- https://siliconangle.com/2026/11/10/staera-launches-with-4-6m-to-develop-an-optical-interconnect-for-chiplets/

**13. 本地融资这周确实很薄**
除 Staera 外，本周没有值得单列的新加坡本地科技融资轮。区域性动静包括 Vertex 领投的泰国消费健康公司 Horizon Group（1,250 万美元 A 轮）。不硬凑。
- https://vertexventures.sg/news/horizon-group-raises-us-12-5-million-series-a-from-vertex-ventures-southeast-asia-india-to-accelerate-asia-pacific-expansion

## 技术活动（11/16–11/22）

- **11/16（周一）** Moomoo x Qoder AI Trading Agent Challenge｜[lu.ma/oezyv35j](https://lu.ma/oezyv35j)
- **11/17（周二）** Clink x Visa 代理式商务圆桌 "My Agent Will Take It From Here"｜[lu.ma/iu5mun8u](https://lu.ma/iu5mun8u)；FOSS SG "Building Trusted AI Engineering"｜[meetup](https://www.meetup.com/free-and-open-source-singapore/events/317282753/)
- **11/18（周三）** **新加坡金融科技节 SFF 2026 开幕（11/18–20）**；同期 The Agentic Shift in Finance｜[lu.ma/the-olho](https://lu.ma/the-olho)；SG ROS Meetup（机器人操作系统）｜[meetup](https://www.meetup.com/singapore-ros-meetup/events/317191423/)
- **11/19（周四）** 视觉/机器人向：Visualizing and Debugging Hugging Face LeRobot Data｜[meetup](https://www.meetup.com/singapore-computer-vision-meetup/events/316617426/)；ODSC "Build Your Own AI-Powered CRM"｜[meetup](https://www.meetup.com/odsc-data-science-singapore/events/317062262/)
- **11/20（周五）** Codex Community Meetup - Singapore｜[lu.ma/codexsg-nov20](https://lu.ma/codexsg-nov20)；Designing Trust in the Digital Economy｜[lu.ma/xk2rbumg](https://lu.ma/xk2rbumg)
- **预告** 11/26 KSUG.AI #50 Cloud Native & AI @ IMDA；Nerd Out №02 Physical AI Unpacked｜[lu.ma/aav8azb7](https://lu.ma/aav8azb7)；11/28 DevFest Singapore 2026（"Architecting for the Agentic Era"）｜[meetup](https://www.meetup.com/gdg-singapore/events/316848180/)

## 🪵 观察与判断

**一、Megaspeed 案把"转口+算力租赁"的合规成本重新定价了。** 过去这条生意的可审计单位是"报关单 + 最终用户声明"；现在美国国会、Nvidia 董事会和新加坡警察同时在追的是"GPU 序列号级的资产普查"——Megaspeed 自己在 11 月 12 日请美国律所做的就是这个。对本地数据中心和云转售商的直接后果：客户尽调、机柜级资产登记、跨境流转记录，会从融资的加分项变成牌照的前置条件（《数字基础设施法》2027 年落地正好接上）。对工程师而言，这是新增岗位：**出口合规工程、GPU 资产核查、算力供应链审计**——这些岗位需要懂一点网络、一点硬件、一点法律，而市场供给几乎为零。

**二、Staera 是本周唯一与物理设计直接相关的技术新闻。** 值得跟踪的不是它的融资额，而是三件事：GaN LED 与 CMOS 共工艺的热预算（LED 的结温会污染周边器件的时序）、SiN 波导在 BEOL 之后如何与金属层对齐、以及"98–99% 良率"是在多大 die 上、什么 D0 下取得的。指标上它很聪明地避开了 UCIe 的战场：4–8 Gbps/lane 打不过短距电互连，但 >50 mm 的传输距离是电链路做不到的，正好卡在"封装内但跨中介层"这个缝隙。0.2 pJ/bit 对上 CPO 的 5 pJ/bit 是 25 倍差距，但 2030 年才商用，中间这四年 CPO 会把成本曲线压下来——所以这是个架构赌注，不是近期解药。

**三、SG-LegalClarify 的数字比新闻标题重要。** 39% 的缺事实场景模型不问澄清、规则召回只有 56.5%——这说明当前 agent 化最大的短板不是推理能力，而是**"知道自己不知道"**。这与上周 IMDA/CSA 的代理治理线是同一条：先给代理装身份证（DNS/注册库），再给代理立行为红线，现在补上"能力测量"。配套的产业含义是 AI assurance（测试、红队、基准）正在新加坡变成一个可收费的行业——AI Tester Accreditation、ISO/IEC 42119-8 提案都是铺路。

**四、就业信号这周是三条线叠加的。** 加号：Airwallex +250、Mastercard +250（且都是 AI/工程岗），CSA 560 万新元养出的 13 家安全公司要人。减号：半导体转口相关的合规与贸易岗位风险上升，Singtel 虽然说"影响有限"，但那是在给自己客户吃定心丸。对想从 IC 转 AI 的人，本周最实用的结论是：**应用层的 assurance / benchmark 工程比"再学一个框架"稀缺得多**，而这恰好是 PD 背景的人有优势的地方——你习惯了对一个系统做可复现的测量，而不是相信厂商的 PPT。

— Youmoo（㕛木）

*Solid as teak.*
