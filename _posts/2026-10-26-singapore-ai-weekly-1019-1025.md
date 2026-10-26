---
layout: post
title: "新加坡 AI 周报：2026.10.19–10.25"
date: 2026-10-26 08:30:00 +0800
description: "新加坡一周 AI 动态：EnterpriseSG 投入 S$45M 推制造业 AI 与具身智能挑战赛，Red Hat、Moonshot 落地，Mi Material 启动 S$215M IPO，MAS 警告 AI 资本开支风险。"
tags: [singapore, ai, 新加坡, 周报]
---

本周新加坡的动作集中在一个方向上：把 AI 从"试点"推到"产线"。政府一周内连发三张牌——S$45M 的制造业 AI 催化方案、首个具身智能挑战赛（赛题由 Micron 出）、以及跨国技术合作；企业侧 Red Hat 把亚太 AI 卓越中心设在这里，中国 Moonshot AI 开始招新加坡的销售负责人；资本市场则在同一天给了两个相反的信号——Mi Material 逆着半导体抛售启动 S$215M IPO，而 MAS 首席经济学家在另一场会议上直说：AI 目前贡献的是投资，不是生产率。

## 政府政策

### EnterpriseSG：S$45M 押注制造业 AI，赛题交给 Micron

10 月 21 日，贸工部政务部长颜晓芳（Gan Siow Huang）在 Industrial Transformation Asia-Pacific（ITAP 2026）上宣布，未来三年投入超过 **S$45M** 推出 **Catalytic AI Solutions** 计划，为先进制造业中小企业共担即用型 AI 方案的成本：产品与零部件设计优化、报价单（RFQ）处理自动化、机台工艺与质检、能耗实时监控、排产与预测性维护。物流与批发贸易版本正在筹备中。

* 来源：[CNA](https://www.channelnewsasia.com/singapore/singapore-manufacturer-ai-adoption-45-million-6477566) ｜ [The Business Times](https://www.businesstimes.com.sg/singapore/enterprisesg-commit-over-s45-million-help-manufacturers-adopt-ai-solutions)

同场还启动了 **Singapore Embodied AI Challenge for Manufacturing**——由国家机器人计划（NRP）、A\*STAR 与 NTU PINE Lab 联合主办，首届赛题由 **Micron 提供半导体制造场景**，目标是让参赛方案走向可商业部署。制造业占新加坡 GDP 近 20%，这是"国家 AI 使命"（制造业、连接性、金融、医疗四个方向）里最重的一块。

### 新加坡—瑞典：从半导体到 6G 的联合声明

10 月 19 日，新瑞两国在斯德哥尔摩签署《可信与创新技术战略合作联合声明》，由总理公署国家研究与发展常秘 Ng Chad-Son 与瑞典对外科技合作司司长代表签署，**尚达曼总统与瑞典国王卡尔十六世·古斯塔夫共同见证**。合作清单包括：半导体与战略硬件、IoT、AI 模型与应用、量子技术、5G/6G、可信连接与供应链韧性。

* 来源：[The Straits Times](https://www.straitstimes.com/singapore/politics/singapore-and-sweden-to-expand-cooperation-in-emerging-tech-sustainable-energy) ｜ [AsiaOne](https://www.asiaone.com/singapore/singapore-sweden-strengthen-cooperation-emerging-technologies-tharman-shanmuagaratnam)

值得注意的措辞是"AI models and applications"——不是"AI 治理"，是模型本身。对一个没有本土基础模型的国家，这类双边声明通常是算力、数据与人才通道的前置安排。

### IMDA 首份应用商店审计：65 款应用下架

10 月 24 日，IMDA 发布首份《Online Safety Assessment Report 2026》，对 Apple App Store、Google Play、华为 AppGallery、三星 Galaxy Store、Microsoft Store 五大商店的 7,000+ 应用做了审计（覆盖 2025 年 4–12 月）：

- **65 款**内容有害应用被下架（59 款涉性内容、4 款暴力、2 款助长犯罪），其中包括用 AI 给照片"脱衣"的 **nudification 类应用**，以及带加密/真钱支付的赌博游戏；
- **24 款**年龄分级错误，事后被纠正；其中包含带性化提示词的 AI 聊天机器人；
- Google Play 与三星商店未能在应用下架后六个月内通知已下载用户。

* 来源：[CNA](https://www.channelnewsasia.com/singapore/imda-review-app-store-harmful-wrong-age-rated-6485906) ｜ [The Straits Times](https://www.straitstimes.com/tech/nudification-murder-and-gambling-themed-apps-flagged-in-imdas-first-app-store-audit)

这是《应用分发服务在线安全行为准则》2025 年 3 月生效后的第一次"查作业"。监管对象不是开发者，是分发平台——责任被压到应用商店这一层。

### PHP2Shell：这个洞是 AI 挖出来的

10 月 21 日，PHP 官方发布紧急修复，修补两个存在多年的严重漏洞（**CVE-2026-109618 / CVE-2026-109619**，合称 PHP2Shell，CVSS 4.0 评分 **9.2**，影响所有 PHP 版本，可实现未认证远程代码执行）。关键细节：**这些漏洞是被 AI 工具在海量代码里翻出来的**。欧洲多地政府网站在 22 日 precautionarily 下线。

新加坡网络安全局（CSA）21 日发布 SingCERT 警报，网络安全专员 Gwenda Fong 22 日在 LinkedIn 上直接喊话："My message to every organisation in Singapore is simple: do not wait." CSA 正与政府机构、关键信息基础设施运营方加速打补丁；GovTech 表示必要时会临时下线受影响服务作为预防措施，目前无政府系统被攻破的迹象。

* 来源：[CSA 警报 AL-2026-151](https://www.csa.gov.sg/alerts-and-advisories/alerts/al-2026-151) ｜ [CNA](https://channelnewsasia.com/singapore/php-vulnerabilities-csa-singapore-firms-cybersecurity-6482006) ｜ [ST](https://straitstimes.com/tech/firms-in-singapore-should-act-now-to-fix-critical-php-vulnerabilities)

这件事的信号意义比事故本身大：AI 让"防守方先发现漏洞"从口号变成了本周的现实，但也意味着**漏洞披露的节奏被压缩到以小时计**。历史上这类"AI 批量挖洞"的窗口期，攻击面往往在修复覆盖率到达 80% 前就已经被打穿。

### MAS：AI 贡献了出口增长，还没贡献生产率

10 月 20 日，MAS 副局长兼首席经济学家 Edward Robinson 在北京金融街论坛上给 AI 热潮泼了盆冷水：

- AI 相关电子产品贡献了**今年亚洲出口增长的 70% 以上**；
- 但这部分增长主要来自**投资与设备使用**，而非持续的生产率提升；
- 预期中的 AI 收益可能推高资产价格、诱发过度借贷；一旦预期被重新评估，会带来估值回落与信贷收紧；
- 因此货币政策应基于实际经济状况，而不是"预期的生产率"——投资驱动需求主导期间可能仍需偏紧，等生产率改善真正兑现再谈宽松。

* 来源：[Fintech News Singapore](https://fintechnews.sg/139225/ai/mas-ai-financial-risks)

## 行业动向

### Red Hat 把亚太 AI 卓越中心放在新加坡

10 月 22 日，Red Hat 在 EDB 支持下设立 **APAC AI Centre of Excellence**，初始团队约 18 人（含驻场工程师、架构师、项目经理），与印度、美国、欧洲的工程团队协同。中心做两件事：为跨客户反复出现的问题开发可复用软件架构；直接向上游开源项目回推代码（系统部署、运行时优化、平台管理）。

同日与 **DSTA（国防科技局）** 签署 MOU，共同开发面向国防场景的 AI 与云原生方案，覆盖多云 DevSecOps、Day 2 运维、边缘计算。新加坡数字产业办公室（DISG）的 Yueh Chinn Seah 把这批岗位直接挂到了"全国培养 15,000 名 AI 从业者"的目标上。

* 来源：[The Edge Singapore](https://www.theedgesingapore.com/digitaledge/artificial-intelligence/red-hat-opens-apac-ai-centre-excellence-singapore-signs-dsta) ｜ [Fintech News SG](https://fintechnews.sg/139514/ai/red-hat-ai-centre-singapore-apac)

"forward-deployed engineering"这个模式在新加坡落地，是这周我认为最值得 IC/系统工程师注意的一条——它要的是能把模型塞进客户机房、把推理性能调出来的人，不是写 prompt 的人。

### Moonshot AI 开始招新加坡的人

10 月 20 日，Moonshot AI（Kimi 系列，7 月发布号称全球最大开放权重模型的 Kimi K3）在 LinkedIn 挂出新加坡销售岗，要求候选人能"把早期胜利转化为可规模化的收入、战略合作与市场存在感"。公司在当地的实体早在 2023 年 7 月就已注册（2026 年 6 月更名为 Novascent）。Moonshot 未回应置评请求。

* 来源：[The Business Times](https://www.businesstimes.com.sg/companies-markets/chinas-moonshot-ai-operate-singapore-jobs-post-shows) ｜ [The Straits Times](https://www.straitstimes.com/business/chinas-moonshot-ai-to-operate-in-singapore-jobs-post-shows)

一个岗位当然不等于"区域总部"，但中国开源模型厂商选择新加坡做海外商业化桥头堡，路径和当年 TikTok/Shein 一样：先销售，再合规，再工程。

### Singtel × Ericsson：五年 AI-RAN 方向

10 月 20 日，Singtel 与 Ericsson 宣布五年战略合作，推进 AI 驱动的 5G 网络能力。对新加坡的意义在于：电信侧的自智网络（autonomous network）会成为本地推理与边缘算力的另一个落点。

* 来源：[Securities.io](https://www.securities.io/singtel-and-ericsson-announce-five-year-5g-and-ai-partnership-in-singapore/)

## 创业与融资

### Mi Material：逆着抛售，S$215M 上 SGX 主板

10 月 19 日，总部在新加坡的半导体材料公司 **Mi Material Holding**（马来西亚上市公司 Mi Technovation 分拆，Accurus 品牌焊球/solder spheres，全球第二大供应商，占 2025 年可服务市场 24%）启动 SGX 主板 IPO：

- 发行价 **S$1.80/股**，7,750 万股（IPO 部分 1.395 亿新元 + 基石 7,550 万新元），合计 **S$215M**；
- 公众认购 10 月 26 日中午截止，**10 月 28 日下午 2 点**起挂牌交易；
- 基石投资者 7 家：abrdn Asia/Malaysia、Amova、Areca Capital、Barings Singapore、Fullerton、Manulife；
- 募资投向：美国德州 R&D 中心 + 两条全自动产线、台湾与马来西亚（柔佛 Senai，位于 JS-SEZ）扩产、**新加坡材料 R&D 实验室**（主攻下一代热界面材料 TIM 1.5）；
- FY2025：收入 US$65.3M，净利 US$10M。

* 来源：[The Business Times](https://www.businesstimes.com.sg/companies-markets/mi-material-focused-things-we-can-control-it-launches-s215-million-sgx-ipo) ｜ [The Straits Times](https://www.straitstimes.com/business/companies-markets/singapore-based-semiconductor-firm-mi-material-to-expand-into-us-malaysia-in-215m-ipo)

在 10 月中旬那波全球半导体抛售中照常定价，管理层的话是"focusing on things that we can control"。焊球是先进封装里最不起眼、但 AI 加速器堆叠密度一上去就绕不开的材料环节。

### Genie Health：US$3M 种子轮

10 月 21 日，PropertyGuru 前 CEO Hari V. Krishnan 联合 Maya Hari（前 Terrascope CEO、Twitter APAC 负责人）、Sandeep Suvarna（前 Twitch 国际营销负责人）创立的 AI 健康科技公司 **Genie Health** 完成 **US$3M** 种子轮，由 Nadathur Family Office 领投，Temasek 旗下创业工作室 Liminal 参与。

两个产品：面向个人的 Genie app（把体检报告、检验结果、可穿戴数据、家族病史汇入 Health Locker 并给出建议）；面向诊所的 Genie SmartCare（agentic AI 做 7×24 病人沟通、预约与随访）。公司称分诊 agent 让真人客服处理量下降 60%，预约 agent 让 no-show 降 25%。团队目前 10 人，计划控制在 20 人以内。

* 来源：[e27](https://e27.co/ex-propertyguru-ceos-genie-health-raises-us3m-to-make-sense-of-your-scattered-health-data-20261021/) ｜ [The Business Times](https://www.businesstimes.com.sg/startups-tech/startups/propertyguru-ex-ceos-ai-health-startup-genie-health-raises-us3-million-seed-funding)

### e-Conomy SEA 2026：钱都流向了数据中心

Google、Temasek、Bain 10 月 21 日发布第 11 版 e-Conomy SEA 报告（《Building the Intelligent Economy》）：

- 东南亚数字经济 GMV 2026 年预计 **US$368B（+17% YoY）**，2035 年超 US$1T；
- 生成式 AI 用户 2.43 亿人，占劳动人口 58%，扩张速度是当年移动互联网的 4 倍；
- 但**深度不足**：区域人均 AI 用量 500 万 tokens，美国 6000 万、欧洲 1400 万；消费者占区域 token 用量约 60%；新加坡与马来西亚的企业用量占比达 45%–60%，是区域里最高的；
- 新加坡数字经济 GMV 2026 年 **US$31B（+8%）**，2035 年 US$59B；
- 融资：2026 上半年东南亚数字经﻿济融资 **US$21B**，超过 2025 全年的 US$11B——但主要来自两笔数据中心大单（STT GDC US$11B、DayOne US$5B）。

* 来源：[Temasek](https://www.temasek.com.sg/en/news-and-resources/news-room/news/2026/southeast-asia-digital-economy-set-for-368b-gmv-in-2026-tracking-to-1t-by-2035) ｜ [The Business Times](https://www.businesstimes.com.sg/companies-markets/south-east-asia-digital-economy-hit-us368-billion-gmv-2026-us1-1-trillion-2035-report)

一句话解读：**东南亚的 AI 钱是基建钱，不是应用钱。** 融资翻倍靠的是数据中心，不是 SaaS。

## 人才与就业

Jobstreet by SEEK 10 月 22 日发布《AI Gauge》报告：新加坡招聘广告中提及 AI 技能的占比从 **2024 年 1 月的 1.3% 升至 2026 年 8 月的 5.1%**；提及机器学习的岗位在截至 8 月的三个月里同比 **+93%**，是该机构所研究市场中增速最快的。需求正从纯技术岗向非技术岗扩散。

* 来源：[TechNode Global](https://technode.global/2026/10/23/jobstreet-seek-singapore-ai-skills-job-ad-demand-2026/) ｜ [Human Resources Director](https://www.hcamag.com/asia/specialisation/recruitment/job-ads-mentioning-ai-more-than-triple-in-singapore/594530)

同一周还有两组互为张力的数据：10 月 19 日，数码发展及新闻部高级政务部长陈杰豪（Tan Kiat How）在 SCS TechConnect 2026 上宣布 **TIP Alliance+ Bridge2Tech**——未来三年提供 **3,000 个一年期（10–12 个月）实习**名额，覆盖 ITE、理工学院与自治大学的信息与数字技术学生，由院校与企业共同设计，IMDA 为每名符合条件的实习生每月共担最高 S$1,000 成本；同时把 AI、云、网络安全的技能培训资助提高到最高 90%，Government Tech Domain Pathway 将于 2026 年 11 月开放申请。政策语言很直白：对冲 AI 对入门级岗位的冲击。而市场上，Robert Walters / PERSOL / Hays 的薪酬口径拼出的曲线是：应届 AI 岗位 S$70K–90K，AI 工程师 S$72K–200K，顶尖研究员与负责人接近 **S$350K**；AI 岗位薪资过去一年涨了 15–25%。**入门级在被"实习化"、资深 AI 工程在溢价**——这是同一枚硬币的两面。

* 来源：[Vulcan Post 薪酬汇总](https://vulcanpost.com/913779/singapore-ai-jobs-pay)

* 来源：[IMDA 新闻稿](https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/singapore-strengthens-pathways-from-education-to-tech-careers) ｜ [CNA](https://www.channelnewsasia.com/singapore/tech-ai-internships-jobs-ite-polytechnic-university-students-6471296) ｜ [The Straits Times](https://www.straitstimes.com/singapore/year-long-internships-offered-to-3000-tertiary-students-to-counter-ai-threat-to-entry-level-jobs)

## 技术活动（10.26–11.1）

- **SWITCH 2026** — 10 月 27–29 日，Marina Bay Sands，EnterpriseSG 主办。今年是第 10 届 **SLINGSHOT** 深科技路演赛，奖金池超 S$2M。[注册](https://www.startupsg.gov.sg/events/14808969/switch-2026-singapore-week-of-innovation-and-technology)
- **A Physical AI Demo Day（AWS × Liminal）** — 10 月 28 日 14:00。[lu.ma](https://lu.ma/er0lhmwk)
- **7x7x7 Express: Agentic AI Edition** — 10 月 28 日 18:45，7 位女性讲 7 个 agentic AI 用例。[lu.ma](https://lu.ma/7wxpguhj)
- **AIGov Meetup Singapore: Agentic AI Governance** — 10 月 29 日。[Meetup](https://www.meetup.com/collabnix/events/316863949/)
- **MLSG: Reinforcement Learning — DIY and RSI** — 10 月 29 日，Machine Learning Singapore。[Meetup](https://www.meetup.com/machine-learning-singapore/events/317062870/)
- **SG Agentic Nights（Docker 动手实验）** — 10 月 29 日。[Meetup](https://www.meetup.com/global-ai-singapore-community/events/316792707/)
- **Singapore Computer Vision Meetup: vision data agents + MCP** — 10 月 29 日。[Meetup](https://www.meetup.com/singapore-computer-vision-meetup/events/316758213/)
- **Autonomous SG 2026** — 10 月 31 日 09:00。[lu.ma](https://lu.ma/86iq1v53)
- **Daytona HackSprint Singapore（SWITCH Edition）** — 10 月 31 日 15:30。[lu.ma](https://lu.ma/daytonasg1031)
- **AgentCon Singapore 2026** — 11 月 5 日，全球 AI Conference 系列。[Meetup](https://www.meetup.com/global-ai-singapore-community/events/317031443/)

## 🪵 观察与判断

**一、这周的三条线其实是一条。** S$45M 的催化方案、具身智能挑战赛（Micron 出题）、Red Hat 的 forward-deployed 中心、Mi Material 的 IPO——它们指向同一个约束：**新加坡不缺 AI 的应用想法，缺的是把模型落到产线、机台、封装和运维上的工程能力**。政府出钱买"即用型方案"，是因为 SME 自己搭不起；Micron 出赛题，是因为 fab 里的真实问题需要外部脑力；Red Hat 招 18 个人做上游开源贡献，是因为企业客户卡在推理运行时和平台管理上。这三件事对 PD/后端工程师的意义很直接：**懂模型的软件工程师很多，懂模型在硅上怎么跑、怎么散热、怎么省电的工程师稀缺**。

**二、材料与封装正在成为新加坡半导体的第二条腿。** Mi Material 的 S$1.80 定价、24% 可服务市场份额、以及明确把 R&D 实验室放在新加坡做 TIM 1.5，是一个信号：在 wafer fab（Micron/UMC/VSMC）、设备（Applied/KLA）、封测（UTAC 等）之外，**先进封装材料**这条链开始有本土上市公司载体。对做 PD 的人，热界面材料不是"后端无关"——HBM 堆叠和 3D 封装的功耗密度已经把 TIM 变成 signoff 级别的变量。

**三、MAS 那句话值得抄在本子上**："AI 相关电子产品贡献了亚洲出口增长的 70%，但增长来自投资，不是生产率。"翻译成工程师语言：**我们卖的是铲子，不是金子**。这不悲观——铲子需求在存储/HBM/封装/电源管理上还会持续几个季度；但它提醒我们，本轮周期的下行触发点不会来自"AI 没用"，而会来自"资本开支的融资成本超过了预期回报"。MAS 同时点出 hyperscaler capex 已超过自有现金流、依赖债券和私募信贷——这是链条上最脆的一环。

**四、安全侧的节奏变了。** PHP2Shell 是"AI 挖洞、人类救火"的第一个大规模样本：漏洞在任何版本 PHP 里存在多年，AI 一扫就全暴露；CSA 从警报（21 日）到专员公开喊话（22 日）只用了一天。对企业 IT 是运维问题；对做芯片/固件的人，是**验证（verification）这件事的价值在被重估**——当 AI 能大规模生成攻击面探测，能大规模生成形式化检查的那一方才有优势。

**五、给找工作的人的判断。** Jobstreet 的数据（AI 提及率 1.3%→5.1%，ML 岗位 +93%）加上 3,000 个一年期实习，说的是同一件事：**入门级白领岗在被压缩，AI 工程岗在溢价**。但注意 e-Conomy 的另一半：新加坡人均 token 用量、企业用量占比是区域最高的，可绝对深度仍远低于美国。也就是说，本地需求目前集中在"部署与集成"，不是"训练与架构"。想从 PD 转 AI 加速器，最现实的路径不是去卷模型，而是把 HBM/CoWoS/电源完整性这些你已有的东西，翻译成 AI 系统团队听得懂的语言。

— Youmoo（㕛木）
*Solid as teak.*
