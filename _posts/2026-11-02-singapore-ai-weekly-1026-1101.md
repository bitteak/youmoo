---
layout: post
title: "新加坡 AI 周报：2026.10.26–11.01"
date: 2026-11-02 08:30:00 +0800
description: "新加坡一周 AI 动态：A*STAR 获 S$150M 建 MARVEL-AI 材料平台、EnterpriseSG 首批 24 家 Champions of AI、Google 设新加坡研究院并落地 AI 健康教练、GF 启用 AI 设施控制中心，Megaspeed 间谍疑云引发 MHA 澄清。"
tags: [singapore, ai, 新加坡, 周报]
---

本周新加坡同时踩了油门和刹车。油门在 SWITCH 2026：S$150M 的 MARVEL-AI 材料平台、EnterpriseSG 的「Champions of AI」首批 24 家、以及 Google 把东南亚第一个健康 AI 研究枢纽放在这里。刹车来自一桩外部事件：美国媒体把本地数据中心公司 Megaspeed 的一名前高管指为中方情报资产，内政部连续两天出面澄清报道「失实」，同时确认对 Megaspeed 的调查仍在进行。

把这两件事放在一起看，本周的主线不是「新加坡又拿到多少投资」，而是**新加坡作为中立 AI 算力与部署枢纽的身份，正在被地缘政治重新定价**。政策与产业侧的回应方式很一致：把 AI 往受监管的实体产业里塞——材料、晶圆厂设施、港口、医院——这些场景容错率低，但一旦跑通，护城河也深。

## 政府政策

### MARVEL-AI：S$150M 押注「AI + 自驱动实验室」做材料

10 月 27 日，副总理兼贸工部长颜金勇在 SWITCH 2026 开幕演讲上宣布 **MARVEL-AI**（Materials Accelerator for Research, Venture and Enterprise Launchpad），首期政府投入 **S$150M**，属 RIE2030 框架，由 A\*STAR 牵头，贸工部、EnterpriseSG、EDB、NRF 共同支持。

平台的逻辑是闭环：AI 模型筛选候选材料并设计实验 → 自驱动实验室合成、测试、验证 → 数据回流模型。聚焦四类材料：金属合金、聚合物与有机物、陶瓷与复合材料，落点是半导体、先进制造、能源与化工。产业伙伴包括富士康工业互联网（FII）与 ST Engineering。

A\*STAR 材料研究与工程研究院院长罗贤俊给出的一个数字值得记住：用 AI 打通「发现—放大」链路后，一款新型复合材料储氢罐从原型开发的三到四年压缩到 **九个月**，重量减半、耐久性提升四倍。真正的瓶颈不在发现，而在从克级到吨级的放大——这正是把自驱动实验室和产业验证能力捆在一起的原因。

* 来源：[The Business Times](https://www.businesstimes.com.sg/singapore/singapore-invests-s150-million-ai-driven-materials-discovery-launches-business-ai-adoption-support) ｜ [CNA](https://www.channelnewsasia.com/singapore/ai-lab-breakthroughs-new-businesses-innovation-singapore-6499511) ｜ [联合早报](https://www.zaobao.com.sg/en/news/singapore/star-sets-ai-powered-automated-lab-accelerate-advanced-materials-development)

同场 EnterpriseSG 推出被其称为「国家级旗舰 AI 计划」的 **Champions of AI**，首批 **24 家**新加坡企业入选，另有面向中小企业的 agentic AI 工作坊、以及先从先进制造与贸易物流起步的催化式 AI 方案工作坊。

* 来源：[The Straits Times](https://www.straitstimes.com/business/economy/singapore-unveils-new-initiatives-to-help-companies-harness-ai-such-as-to-develop-new-products)

### 黄循财：提议做 AI 事故报告的「国际试点」

10 月 28 日，黄循财总理在芬兰与挪威共同主持的**前沿 AI 安全领导人线上会议**（22 国 + 欧盟委员会）上提议：先不谈宏大的国际架构，从一个小规模、自愿参与的 **AI 事故与near-miss 报告试点**开始——先对齐事故分类与需共享的信息字段，再解决安全交换机制，跑通后再考虑更大的框架。类比对象是国际民航的事故报告文化。

这个提议的锋利之处在于它挑战了信息来源结构：目前关于前沿模型安全性的认知几乎全部来自开发者，而政府、企业这些使用方遇到的严重失效与near-miss，往往不触发任何现有报告义务。

* 来源：[CNA](https://www.channelnewsasia.com/singapore/pilot-ai-incident-report-safety-governance-pm-wong-6500216) ｜ [总理公署演讲全文](https://www.pmo.gov.sg/newsroom/pm-lawrence-wong-at-the-virtual-leaders-meeting-on-frontier-ai-safety-co-hosted-by-norway-and-finland-oct-2026)

### 新加坡—德国：把 AI 合作压到工业与海底基础设施

10 月 27 日，新德双方更新产业 AI 合作安排，把重点放在制造业 AI 应用与新技术研究上，同时扩展到海底基础设施等领域。

* 来源：[The Straits Times](https://www.straitstimes.com/singapore/politics/singapore-germany-to-collaborate-on-ai-use-in-industries-step-up-research-on-new-tech)

## 行业动向

### Google：把「健康 AI」的第一个区域研究枢纽放在新加坡

10 月 29 日首届 **Google for Health Summit**（Mapletree Business City）一次性放出三件事：

1. **在新加坡设立 Google Research 枢纽**，由本地研究科学家与软件工程师组成，主攻基础模型效率（foundational AI efficiency），并与 NUS、NTU 合作培养科研人才；
2. 与 **NHG Health** 做群体健康数字化转型：用去标识化的群体健康数据库叠加 Google 的地理空间数据（气候、环境、搜索与行为信号）预测慢性病与衰弱风险，再把这些预测喂进 WhatsApp 上的 **NHG HealthBot AI 健康教练**，用 Gemini Enterprise for Customer Experience 平台落地。试点 2027 年 Q1 启动、为期九个月，覆盖 Healthier SG 未筛查人群与年长者，支持四种官方语言与语音输入；
3. Google DeepMind 与 **NUHS** 评估其「AI co-clinician」工具；Google.org 与 DeepMind 另出资 **US$7M** 支持 Philanthropy Asia Alliance 的健康联盟（含 US$1M 给 PathGen）。

* 来源：[Google 官方博客](https://blog.google/innovation-and-ai/technology/health/google-for-health-summit-singapore) ｜ [The Straits Times](https://www.straitstimes.com/singapore/health/google-to-partner-nhg-health-on-ai-powered-health-coach)

### GlobalFoundries：五座厂务控制中心并成一座，新加坡先跑

10 月 26 日，GF 在新加坡启用与西门子共建的 **Advanced Facilities Control Centre（AFCC）**，把园区内五座按厂划分的厂务控制中心合并为一。功能是 AI 驱动的预测性维护与根因分析，加上带热成像、气体检测、振动声学的自主巡逻机器人回传实时数据。全球铺开后将对接近 **100 万**个厂务数据点做跨厂对标。

选择新加坡做首发站点，本身就是对本地「厂务—IT—自动化」工程能力的一次背书——这套东西对良率没有直接贡献，但对非计划停机时间有。

* 来源：[GlobalFoundries 新闻稿](https://gf.com/news-and-events/news/globalfoundries-launches-advanced-facilities-control-centre-in-singapore)

### NCS：AI Mission Centre 开在宏茂桥，前哨工程师要翻三倍

10 月 29 日，新电信旗下的 NCS 启用 **AI Mission Centre**（宏茂桥），同时承诺两年内把嵌入客户团队的 iFDE（Intelligentisation Forward-Deployed Engineer）从 100 人扩到 **300 人以上**，靠内部转岗与外部招聘各出一半。中心拿 Sunshine.AI 产品线（Sunshine.core 做企业智能体的构建与治理底座，Sunshine.commanderAI 做多厂商机器人协同），并签下樟宜机场集团、心理卫生学院（IMH）、Life3 Biotech 三份 MOU。

* 来源：[CNA](https://www.channelnewsasia.com/singapore/ncs-ai-mission-centre-ang-mo-kio-engineers-6500661) ｜ [NCS 新闻稿](https://prnewswire.com/apac/news-releases/ncs-launches-ai-mission-centre-commits-to-building-a-workforce-of-more-than-300-forward-deployed-engineers-in-the-next-two-years-302923761.html)

### Meta Muse 落地新加坡，首批连接器全是本地生活入口

10 月 27 日 Meta 宣布、28 日起新加坡用户可下载个人 AI agent **Muse**（iOS / Android / muse.ai）。首发连接器是 Shopee、Lazada、Grab、Singapore Airlines、Agoda、ShopBack、Klook、Trip.com，外加 Gmail、Calendar、Instagram。工程上的卖点是 **Muse Secure VM**（凭据与支付方式不进 agent 视野）与 **Sentinel agent**（敏感动作前二次授权）。免费额度按周计，订阅 S$22–139。

一个消费级通用 agent 选择新加坡作为美加、日本之后的第三站，理由不难猜：这里既有高渗透的电商/出行/支付 API，也有愿意配合监管做灰度的人群。

* 来源：[Meta 官方](https://about.fb.com/news/2026/10/muse-is-now-available-in-singapore-the-worlds-first-personal-ai-agent-built-for-everyone) ｜ [CNA](https://www.channelnewsasia.com/singapore/meta-muse-ai-agent-singapore-shopping-travel-email-connectors-6499331)

### Synopsys 加入 NUS 热带数据中心测试床

10 月 28 日，Synopsys 宣布加入 NUS 设计与工程学院主导的 **STDCT 2.0**（Sustainable Tropical Data Center Testbed 二期）联盟，贡献多物理场仿真与 digital twin 能力，研究课题包括面向高热流 AI 加速器的**两相直接芯片液冷**、AI 辅助热流体设计与降阶模型（ROM）。Synopsys 给的行业估算是：热带数据中心里制冷可占总能耗的 **40%**。

* 来源：[HPCwire / Synopsys](https://www.hpcwire.com/off-the-wire/synopsys-joins-singapore-consortium-to-improve-tropical-data-center-cooling) ｜ [Yahoo Finance](https://finance.yahoo.com/news/synopsys-joins-nus-led-group-193755725.html)

### Cisco 与 PSA：把 AI 事故管理搬进大士港

10 月 29 日，Cisco 与 PSA Singapore 宣布合作，在大士港（全球最大全自动集装箱码头）做 AI 驱动的可观测性与事故管理平台 PoC：把应用、基础设施、网络数据汇到统一视图，AI 负责映射服务依赖、定位根因、给出处置建议，先在二期 Living Lab 验证。参照点是 Cisco 自家研究——单次停机年均成本已升至 **US$300M**。

* 来源：[PSA Singapore](https://www.singaporepsa.com/2026/10/29/cisco-and-psa-singapore-collaborate-to-power-the-next-phase-of-tuas-port-with-ai-driven-operations/)

## 创业与融资

### Ailytics 完成 US$7.4M A 轮：把旧摄像头变成安全与运营层

10 月 26 日，新加坡工业视觉 AI 公司 **Ailytics** 宣布完成 **US$7.4M** A 轮，由 Tin Men Capital 领投，SEEDS（SG Growth Capital 旗下）、日本云摄像头厂商 Safie、以及一家日本大型建筑公司跟投。从 2024 年 4 月的 US$2.7M pre-A 至今，项目数从 4 国 70 个增至 **15 国 400+ 部署**，客户流失率低于 1%。起点是 2019 年 NUS 与建屋局（HDB）的研究项目。

这类公司的价值不在模型，而在「不换硬件」的部署经济性——把既有工业 CCTV 变成实时安全与运营层，客户切换成本高，所以 churn 才压得住。

* 来源：[DealStreetAsia](https://www.dealstreetasia.com/stories/ailytics-series-a-tin-men-capital-499128) ｜ [PR Newswire](https://prnewswire.com/news-releases/tin-men-capital-leads-us7-4m-series-a-for-vision-ai-startup-ailytics-to-expand-across-apac-us-and-gulf-302918676.html)

### Stryv 完成 US$11.5M B 轮

同样在 10 月 27 日，新加坡个护与家居健康品牌 **Stryv** 完成 **US$11.5M** B 轮，ACV Capital 领投，Openspace、OCTAVE 跟投，累计融资约 US$20M。资金用于进台湾、加码马来西亚与香港，并继续通过并购扩品牌组合（2026 年 3 月已收购 Sterra）。不是 AI 公司，但它是本地消费硬件「先做现金流、再谈上市」路径的一个样本。

* 来源：[DealStreetAsia](https://www.dealstreetasia.com/stories/stryv-secures-11-5m-in-acv-led-funding-499265) ｜ [TNGlobal](https://technode.global/2026/10/27/singapores-stryv-raises-11-5m-series-b-led-by-acv-capital-to-expand-into-taiwan)

## 本周最大变量：Megaspeed 与「中立枢纽」的代价

10 月 30 日《华尔街日报》报道称，美国情报部门认定新加坡数据中心公司 **Megaspeed** 的一名前高管 Alice Huang（黄乐）为中方情报资产，并称新加坡与台湾当局曾分别调查其涉华关系。Nvidia CEO 黄仁勋次日回应：与 Megaspeed 的往来「完全正常」，公司已逐颗核对 GPU 部署，未发现非法转运中国；该高管已离开 Megaspeed。

新加坡内政部 10 月 30 日、31 日两次发澄清声明，明确 WSJ 报道中「新加坡官员对其与黄仁勋的密切关系或情报身份有所担忧」「新加坡另行调查其涉华关系」的说法**不实**，警方从未据此调查 Alice Huang；同时确认**对 Megaspeed 的调查仍在进行**，并重申新加坡不执行他国单边出口管制，但不容忍企业借「新加坡身份」规避他国出口管制。

* 来源：[MHA 澄清声明](https://www.mha.gov.sg/media-room/newsroom/clarification-statement-on-wall-street-journals-article/) ｜ [The Straits Times](https://www.straitstimes.com/world/united-states/nvidia-ceo-jensen-huang-says-ties-to-company-under-spying-probe-were-normal)

## 技术活动（未来两周）

- **11/4（三）** GraphRAG 与知识层：`Build Better AI with Graphs` — [Meetup](https://www.meetup.com/graphdb-singapore/events/317007265/)；同日 `ChatGPT Sites x TPF Singapore` — [Luma](https://lu.ma/gizf6zfy)；`Mindstone Singapore November AI Meetup` — [Meetup](https://www.meetup.com/mindstone-singapore-ai-meetup/events/316567489/)
- **11/5（四）** `AgentCon Singapore 2026`（全球 AI 会议系列新加坡站）— [Meetup](https://www.meetup.com/global-ai-singapore-community/events/317031443/)；新加坡计算机视觉 meetup 的视觉 AI 农业专场 — [Meetup](https://www.meetup.com/singapore-computer-vision-meetup/events/316768291/)
- **11/6（五）** Google for Startups 的 `AI Masterclass: Build Smart` — [Luma](https://lu.ma/cgh0hmxm)；GovTech `Digital4Good` 在线安全黑客松 — [Luma](https://lu.ma/rrtmeqr5)
- **11/10（二）** `Build with ElevenLabs: Voice AI & Creative Agents` — [Luma](https://lu.ma/olv1aat3)
- **11/11（三）** `Claude × SlackForce × AWS Meetup #13` — [Luma](https://lu.ma/claude-myn7)；`Muse Singapore meetup` — [Luma](https://lu.ma/ysqjr5gz)；AI/ML/CV meetup — [Meetup](https://www.meetup.com/singapore-computer-vision-meetup/events/316572580/)
- **11/28（六）** `DevFest Singapore 2026`（GDG，两场：原型实战 / agentic 架构）— [Meetup](https://www.meetup.com/gdg-singapore/events/316848180/)

## 🪵 观察与判断

**一、新加坡的 AI 叙事正在从「投资额」转向「落点」。** 本周三个 S$ 级别的动作——MARVEL-AI 的 S$150M、Google 的研究枢纽、GF 的 AFCC——共同点是都嵌在受监管的实体流程里：材料放大、临床路径、晶圆厂厂务。这类项目不好讲故事，但一旦上线，替换成本极高。对做后端的人来说，这意味着需求正在从「模型能力」转向「模型 + 设备 + 验证闭环」，而后者恰好是新加坡有存量优势的部分。

**二、半导体侧的机会在「厂务与设施」这一层被公开化。** GF 把五座控制中心并成一座，Synopsys 去做两相液冷与 digital twin，两家都把新加坡当首发验证地。这和 PD 工程师的日常离得很近：热、功耗、可靠性、监控点位——AI 在这里不是替代设计，而是把原来靠人巡检和经验判断的部分数据化。想把技能栈往 AI 基础设施迁移的人，厂务侧的可观测性与热管理，比追模型论文更接近可迁移的岗位。

**三、Megaspeed 事件的真正成本是「信任溢价」。** 内政部的澄清说明措辞很硬（点名 WSJ「不实」），但同时承认调查在进行。这对新加坡的长期定位是个微妙处：作为中立算力与部署枢纽，它的商业价值建立在「合规可信」上，而一旦被卷入大国出口管制的执法叙事，客户会开始做 jurisdiction 风险定价。本周本地芯片股随华尔街科技股回调（AEM 等），9 月制造业产出同比仅增 3.4%——AI 需求还在，但资本已经开始对「AI 回报」挑刺，这个情绪会传导到本地供应链的估值。

**四、人才市场的信号比融资更清楚。** NCS 要把前哨工程师翻三倍、Red Hat 上周把亚太 AI CoE 放在这里并配 FDE 团队、Google 设本地研究枢纽——三者抢的是同一类人：能进客户现场、把 agent 从 demo 推到生产的人。这类岗位对 IC 背景不排斥（要懂系统边界、懂失败模式），但要补的是软件交付与治理的语感。

— Youmoo（㕛木）
*Solid as teak.*
