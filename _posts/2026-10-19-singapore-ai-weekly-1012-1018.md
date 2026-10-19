---
layout: post
title: "新加坡 AI 周报：2026.10.12–10.18"
date: 2026-10-19 08:30:00 +0800
description: "新加坡 AI 周报 2026.10.12–10.18：Anthropic 落地并签 MOU，IMDA 三箭把 AI assurance 做成制度，Q3 GDP 增长 5.4%、9 月 NODX 冲上 68.4%，而算力资本市场开始转冷。"
tags: [singapore, ai, 新加坡, 周报]
---

## 本周主线：把模型请上自己的土地，把「保证」做成生意

十月的第二周，新加坡同时做了两件事：把一家前沿模型公司请进门，再把「怎么证明 AI 是安全的」变成一套有牌照、有目录、有工作组的产业。

10 月 14 日，**Anthropic 在新加坡开设办公室**——继班加罗尔、首尔、悉尼、东京之后的第五个亚太站点——并与数码发展及新闻部（MDDI）签署 MOU。同一天，**IMDA 在 AI Assurance Exchange 上抛出三项举措**：Agentic AI 测试指南、AI 测试机构认证计划（AI TAP）、前沿 AI 韧性与安全工作组（Fairs）。前一天，尚穆根在 SICW 上把话讲得更直：要求 OpenAI、Anthropic、Google、Amazon 在事故发生时「立刻、完整地」透明。

把这一周看成一条线，它讲的是同一件事：**模型可以在别处训练，但落地、评估、出事之后的处置，必须发生在主权管辖范围内。**「on soil」这个词是 Anthropic 联合创始人 Benjamin Mann 自己说的。

## 政府政策与监管

### Anthropic：第五个亚太办公室，模型要「on soil」，但暂无研究机构

细节里最值得记的三条：

1. MOU 覆盖 **AI 安全与评测、AI 采用及其经济影响研究、公私部门的负责任采用**。由 Mann 与 MDDI 常任秘书庄凯峰（Chng Kai Fong）在 SICW 场边签署，杨莉明与 Anthropic 亚太政策负责人 Michael Sellitto 见证。签署时间是 10 月 13 日，办公室开幕是 10 月 14 日，地点在 Capella Singapore 的 Anthropic Builder Summit。
2. **MOU 不给新加坡优先访问前沿模型的权限**——Sellitto 明确说明这一点——但包含测试与评估工作。
3. **暂无在新加坡设研究机构的计划**，当前重点是组建本地团队。BT 的副标题写得很直白：*no plans for a research operation – for now*。

已有基础并不薄：Anthropic 自 2023 年起就与新加坡机构合作 red-teaming，用英文、华文、马来文、泰米尔文四种语言测试模型的弱点、有害输出与安全风险；本周还与新加坡 AI 安全研究院（AISI）办了一场培训，教政府与民间专家如何评估模型风险。点名的本地客户是 GovTech、Grab、DBS。

Mann 的话值得原样保留：「我们正在尽快把前沿模型 *on soil* 带到新加坡，但目前没有具体时间表。」——这句话的诚实程度，比大多数落地公告都高。

来源：[CNA](https://www.channelnewsasia.com/singapore/anthropic-office-safety-agreement-government-deal-6456671) ｜ [The Business Times](https://www.businesstimes.com.sg/companies-markets/anthropic-works-bring-frontier-ai-models-soil-singapore-signs-government-pact) ｜ [Anthropic 官方公告](https://www.anthropic.com/news/singapore-office-opening)

### IMDA 三箭：从「看输出」到「看过程」

这是本周技术含量最高的一条，值得展开。

**第一箭：Agentic 系统安全与可靠性测试 Starter Kit。** 四步法：识别风险 → 设计测试 → 分析结果与日志 → 持续监控与复测。关键的设计取向是**评估 agent 在整个任务过程中的行为，而不只看最终输出**。它建立在 Global AI Assurance Sandbox 与新加坡 AI Safety Institute 的工作之上，并咨询了 20 多家产业方。

**第二箭：AI Tester Accreditation Programme（AI TAP）**，由 AI Verify Foundation 推出。首批五家：**AIDX Tech、Knovel Engineering、PwC Singapore、Resaro、Vulcan**。评审覆盖技术、运营与财务三个维度，认证有效期一年，并且**按能力域认证**——不是「这家能测所有 AI 系统」，而是「这家能测某类系统」。IMDA 首席执行官黄澄可（Ng Cher Pong）的说法是：给 AI 更多 agency，就要对 agency 如何被行使有更强的保证。他同时公开招募更多有经验的测试机构入场。

**第三箭：Frontier AI Resilience and Security Taskforce（Fairs）**，聚合电信、媒体、网络安全与 AI 领域 20 多位负责人，聚焦 AI 加速型攻击的响应、关键系统韧性、以及新兴攻击手法的情报共享，**计划 2027 年上半年发布实操指南报告**。

把这三件事连起来读：新加坡在复制它在硬件与网络安全领域用过的那套方法——**先有标准，再有合格评定机构，最后谈互认**。这与 UL、TÜV、ISO 17025 实验室体系的逻辑完全一致。区别只在于，这次被认证的对象是会自己行动的软件。

来源：[AsiaOne](https://www.asiaone.com/singapore/imda-ai-safety-initiatives-agentic-ai-testing-cybersecurity) ｜ [The Straits Times](https://www.straitstimes.com/singapore/singapore-launches-new-tool-kit-to-help-firms-test-ai-agents-for-safety-and-reliability) ｜ [AI Verify Foundation 新闻稿](https://aiverifyfoundation.sg/news/press-release-launch-of-the-ai-tester-accreditation-programme/)

### CSA 第三个网络安全战略：不造模型，造「harness」

10 月 13 日，尚穆根在 SICW 发布新加坡**第三份**网络安全战略（第一份 2016 年、第二份 2021 年）。三个关键词：**更早行动（act earlier）**、**国家级规模（at national scale）**、**与威胁同速（at the speed of the threat）**。覆盖范围明确扩到 AI 与量子的能力建设、关键基础设施、全球伙伴关系与人才。

其中最值得记的一句是方法论：「我们不需要为每个用例自研 AI 模型。真正需要的是**评估最好的可用模型、并把它们适配到自己需求上的能力**。」他管这叫 **AI harness engineering**——保持模型可替换的弹性，安全地把最好的模型接进防御方需要的工具、数据与工作流。同时发布了一个全国性工具 **PDNS（protective domain name service）**，用于阻断恶意域名。

同一场采访里更硬的一句：新加坡与其他国家已当面向 OpenAI、Anthropic、Google、Amazon 提出，事故发生时需要**实时、完整**的信息。触发点是 2026 年一起真实事件——OpenAI 的一个 rogue agent 侵入了澳大利亚国家医疗数据库。尚穆根的措辞是「我们需要在事情发生时就实时知道，并且确切知道发生了什么」。官方同时承认，这类谈判仍是 *a work in progress*。

10 月 15 日，OpenAI 公开表态支持新加坡关于 AI 事件透明的呼吁。承诺与可执行之间还有距离，但方向已经明确：**事件披露可能成为进入市场的前置条件**，而不再只是自愿声明。

来源：[CNA（战略）](https://www.channelnewsasia.com/singapore/shanmugam-cybersecurity-strategy-csa-ai-6452641) ｜ [CNA（透明）](https://www.channelnewsasia.com/singapore/cybersecurity-full-transparency-ai-attacks-rogue-6455271) ｜ [The Straits Times](https://www.straitstimes.com/tech/spore-asks-ai-firms-for-full-transparency-after-australian-government-hack-shanmugam) ｜ [ST（OpenAI 回应）](https://www.straitstimes.com/tech/openai-backs-singapores-call-for-ai-incident-transparency)

### 维文：技术规则不能被少数强国垄断

10 月 15 日，维文（Vivian Balakrishnan）在同一个会场把话题推到治理层：**技术规则的制定权不能被少数强国或少数大公司垄断**。对新加坡这种体量，这句话是生存策略而非姿态——规则一旦被两三个法域切成互不兼容的几块，中间地带的国家只能在合规成本里选边。

配套动作是与芬兰签署合作（AI 与新兴技术惠益的可及性，10 月 13 日），以及 2027 年接任东盟主席国时想推的区域 AI 采用议程：共享语言模型、治理工具包、能力建设计划。

来源：[The Straits Times（维文）](https://www.straitstimes.com/tech/rules-governing-tech-cant-be-monopolised-by-a-handful-of-powerful-states-big-tech-firms-vivian) ｜ [The Straits Times（芬兰）](https://www.straitstimes.com/singapore/spore-finland-to-deepen-cooperation-on-accessibility-of-benefits-of-ai-emerging-technologies) ｜ [Singapore Business Review（东盟议程）](https://sbr.com.sg/in-focus/singapore-eyes-regional-ai-adoption-push-under-2027-asean-chairmanship)

### Digital Infrastructure Bill：把「自愿」变成「法定」

10 月 18 日 ALB 的一篇解读把 DIB 讲清楚了。这个 2024 年提出、近期结束公众咨询的法案，解决三个问题：

- 把 Green DC Roadmap 这类**自愿性**方案上升为**有约束力的法律**；
- 补上《网络安全法》没覆盖的运营风险：技术故障、供电与制冷中断、火灾；
- 在 AI 推高算力需求的背景下，管住土地、电力与水这三样稀缺资源。

结构是**双许可**：一张管云服务与数据中心的**安全韧性**，一张管数据中心的**环境可持续性**。分级设计——主要基础数字基础设施（FDI）运营者义务更重；可持续性义务则覆盖全行业，因为环境是所有人的基线责任。对已运营者，最大的变化是从自愿转向强制：**必须满足 PUE 指标，并最终满足 IT 设备的能效与水效要求**。监管方承诺简化流程、认可既有认证、给足过渡期。

对投资人是好消息（比例原则，小运营者不被重义务压死），对工程团队是硬账——冷却系统、设施升级、监控设备都要真金白银。

来源：[Asian Legal Business](https://www.legalbusinessonline.com/features/singapore-tightens-rules-data-centres-and-cloud-services-it-good-business)

### 黄循财：别只保岗位，要保每一个工人——以及被 AI 拆掉的「最底一级」

10 月 12 日 Forbes Global CEO Conference 上，黄循财讲了一个具体例子：DBS 的 AI agent 能处理原本需要数周金融分析与研究的授信备忘录。这引出一个尴尬问题——如果 junior 的活被 agent 干了，junior 怎么获得经验？

他担心的是职业阶梯的 **"bottom rung"**（最底一级）被拆掉。新加坡正在研究银行、法律、医学、工程等职业受影响的程度，并与劳资政三方评估是否需要新的培训计划。他的落点是「不是保护岗位，是保护每一个工人」，并提醒不要在教育里过度依赖 AI——批判性思维、判断力与基本功不能丢。

来源：[Fintech Singapore](https://fintechnews.sg/138874/ai/singapore-ai-entry-level-jobs-lawrence-wong/) ｜ [VnExpress](https://e.vnexpress.net/news/tech/tech-news/singapore-aims-to-turn-ai-boom-into-better-jobs-new-capabilities-pm-wong-5132032.html)

## 经济数据：AI 红利的两种读数

10 月 14 日同一天出的两组数字，一组向上，一组开始打折扣。

**Q3 GDP 同比 +5.4%**（MTI 预估值），超出预期。MAS 同日发布宏观经济评估：近期 AI 产品订单强劲、产能增加，「应能维持科技相关行业的稳健增长」；但 **AI 相关活动的增速预计在 2027 年下半年放缓**。MAS 这次**没有按市场预期收紧**，而是维持新元名义有效汇率政策区间不变——在年内两次收紧之后踩了一脚刹车。核心通胀预计从 2027 年中期起「更明显地」回落，风险仍偏上行（中东能源、极端天气与食品）。

**9 月 NODX 同比 +68.4%**，是市场共识 32.2% 的两倍多，为 **1980 年 2 月以来最强**。拆开看，这条比标题有意思得多：

- 非电子 NODX **+54.2%**（8 月为 +11.9%），主因是船只与钻井平台结构的「块状」出口——EnterpriseSG 因此拒绝给出同比增速，理由是去年同期低基数；
- **电子 NODX +107.6%**，仍由 AI 需求驱动，但**已从 8 月的 +131.6% 减速**；拉动项是磁盘介质 **+312.4%**、**IC +74.7%**、PC **+149.5%**；
- 前九个月累计：电子 **+89.5%**，非电子 +8.2%。

把这条数据和上一期写的「制造业纵深」放在一起看：新加坡这一轮出口顺风里，电子本身就在爆，**IC 的 +74.7% 是实打实的**。但 131.6% → 107.6% 的方向，与 MAS 的 2027 下半年缓和判断、以及下面资本市场那一段，指到了同一个方向。

来源：[The Business Times（NODX）](https://www.businesstimes.com.sg/singapore/singapore-key-exports-jump-higher-expected-68-4-september-led-non-electronics) ｜ [The Straits Times](https://www.straitstimes.com/business/singapores-key-exports-rise-more-than-expected-in-september-driven-by-non-electronics) ｜ [The Business Times（MAS）](https://www.businesstimes.com.sg/singapore/economy-policy/singapore-growth-stay-firm-ai-boost-moderate-2027-mas) ｜ [Al Jazeera](https://www.aljazeera.com/economy/2026/10/14/singapores-economy-grows-more-than-5-percent-amid-ai-boom)

## 行业动向

### IMDA 的 SME 侧：从「给你钱」到「给你试用」

10 月 13 日，IMDA 扩大对中小企业的 AI 支持：一份**超过 100 个工具**的精选清单、新的产业合作，以及与厂商合作的**免费试用**机制，让企业先试再签。具体落地包括：Singtel 与 IMDA 的 STACK-EZ 数据管理能力覆盖**最多 10,000 家** SME；Salesforce 与 IMDA 的 Slack AI 计划覆盖**最多 1,000 家**。同期公布的 SME AI Impact Awards 有 30 家获奖。

这套打法的关键在于**降低第一次采购的摩擦**，而不是再发一轮补贴。对企业是好事；对做工具的公司则意味着「试用期」变成获客成本的固定项。

来源：[The Straits Times](https://www.straitstimes.com/singapore/politics/more-support-for-smes-to-adopt-ai-with-new-industry-tie-ups-curated-list-of-over-100-tools) ｜ [The Business Times](https://www.businesstimes.com.sg/singapore/smes/imda-expands-digital-support-smes) ｜ [Marketing-Interactive](https://www.marketing-interactive.com/imda-ramps-up-ai-support-for-smes-with-new-industry-partnerships)

### EnterpriseSG：把本地半导体 SME 往上游推

10 月 18 日 digitimes 专访 EnterpriseSG 助理局长 Zeng Yi Wong：新加坡的目标是**高价值半导体制造、先进封装、硅光**，依托的是工程能力、精密制造与可靠性。

这条很短，但与硬件方向直接相关。新加坡谈半导体，过去总被说「只有制造、没有设计纵深」「只有外资、没有本土」。把 SME 往**先进封装与硅光**这两个 AI 硬件最缺的环节推，补的正是「本土供应链纵深」这一课。（注：原文付费墙，此处仅据可见摘要。）

来源：[digitimes](https://www.digitimes.com/news/a20261012PD215/manufacturing-equipment-packaging-testing-silicon.html)

### 算力资本市场：这一周开始转冷

- **AirTrunk 推迟新加坡 REIT 的 US$15 亿 IPO**，理由是 AI 相关股票抛售（10 月 13 日）。这是本周最值得注意的信号——不是需求消失，而是**估值窗口关了**。
- **DayOne 的柔佛数据中心项目获 RM150 亿银团融资**（7 家银行，10 月 13 日），billings 突破 1GW，资本还在往南马堆。
- 新加坡半导体股同步回落，STI 当日 −0.4%。

一边是创纪录的出口，一边是推迟的 IPO。这个组合不是矛盾，是典型的**周期中段**：订单还在，但资本市场先重新定价了斜率。

来源：[The Straits Times（AirTrunk）](https://www.straitstimes.com/business/blackstone-backed-airtrunk-delays-singapore-reit-ipo-amid-ai-stock-selloff-sources-say) ｜ [The Business Times（DayOne）](https://www.businesstimes.com.sg/international/asean/dayones-johor-data-centre-project-gets-rm15-billion-boost-financing-seven-lenders)

## 创业与融资

**新加坡科技公司的股权融资在 9 月几乎是断崖。** Tracxn 数据：9 月仅 **US$52m**，环比 **−94.02%**（8 月 8.64 亿美元），同比 **−89.83%**（去年 9 月 5.08 亿美元），为过去 12 个月最低。当月最大轮是支付公司 **dtcpay US$25m**，其后 iPiD US$16m、HiveBotics US$6m、Vikang99 US$1.7m、TacniQ US$1.5m。

深科技侧仍有活水：

- **Antares Ventures 首关 US$50m**，目标 US$100m 的深科技基金；
- **Aliena US$5.5m**（太空电推进），用于扩张欧洲；
- **NEU Battery Materials US$7.6m**，LFP 电池回收，资金用于建厂；
- **南洋生物（Nanyang Biologics）** US$15 亿估值的 AI 药物发现资产，等纳斯达克上市。

一个观察：**9 月的钱全在小轮次**。US$52m 的月度总额意味着几乎没有成规模的 Series A/B。对深科技，这不是坏消息——深科技本来就靠政府与战略投资人，不靠 VC 的月度节奏；但对 SaaS 与消费 AI，这是明确的冬天。

来源：[Singapore Business Review（Tracxn）](https://sbr.com.sg/markets-investing/in-focus/tech-funding-slumps-94-in-september) ｜ [Tech in Asia（Antares）](https://techinasia.com/news/sg-vc-firm-antares-ventures-raises-50m-targets-100m-fund/amp) ｜ [Tech in Asia（Aliena）](https://www.techinasia.com/sg-spacetech-startup-aliena-raises-55m-expand-europe) ｜ [MVA Pulse（NEU）](https://www.mvapulse.com/neu-battery-materials-secures-7-6m-for-lfp-recycling/) ｜ [The Business Times（南洋生物）](https://www.businesstimes.com.sg/companies-markets/consumer-healthcare/nasdaq-listing-awaits-singapores-us1-5-billion-ai-drug-discovery-biotech-nanyang-biologics)

## 技术活动

### Luma（lu.ma，时间为 SGT）

- **Claude for Marketing**（10/19 18:30）——Anthropic 落地后的第一波社区活动 [[链接](https://lu.ma/fe25l2au)]
- **Techies x SGInnovate Tech Talk: New Dev Roles in the AI era**（10/22 18:30）——正好接上黄循财讲的职业阶梯 [[链接](https://lu.ma/i8iy0fzc)]
- **A Physical AI Demo Day by AWS & Liminal**（10/28 13:30）——physical AI 的实机演示，硬件方向值得去 [[链接](https://lu.ma/er0lhmwk)]
- **After SWITCH: B71 Networking Mixer**（10/29 18:00）[[链接](https://lu.ma/9hnajvql)]
- **Autonomous SG 2026**（10/31 09:00）[[链接](https://lu.ma/86iq1v53)]
- **Daytona HackSprint Singapore – SWITCH Edition**（10/31 15:30）[[链接](https://lu.ma/daytonasg1031)]

### Meetup

- **KSUG.AI Singapore #49: Cloud Native & AI @ IMDA**（10/21）[[链接](https://www.meetup.com/ksug-sg/events/316384465/)]
- **SG Agentic Nights — Hands-on Labs with Docker**（10/29）[[链接](https://www.meetup.com/global-ai-singapore-community/events/316792707/)]
- **AIGov Meetup Singapore: Agentic AI Governance**（10/29）——IMDA 的 AI TAP 主题的产业侧版本 [[链接](https://www.meetup.com/docker-singapore/events/316863705/)]

### Eventbrite

- **Sudhir Tiku — The Geography of AI: Beyond Silicon Valley**（10/29）[[链接](https://www.eventbrite.sg/e/sudhir-tiku-the-geography-of-ai-beyond-silicon-valley-tickets-2002987008060)]
- **AI Engineering Summit | Singapore | 2026**（12/03）[[链接](https://www.eventbrite.com/e/ai-engineering-summit-singapore-2026-tickets-1995178186665)]

> 附注：SWITCH 2026 的官方站点本周无法正常访问，主会期与日程未能核实，因此本栏目只保留已抓到的场外活动，不列具体场次。

## 🪵 观察与判断

这一周的信息量很大，但四条线其实可以拧成一根绳：**规则在收口，数据在后视镜里很漂亮，资本已经开始重新定价，而人这一层最没被回答。**

**第一，assurance 从「看输出」变成「看过程」，这是一次架构级的改变。**

IMDA 那份 Starter Kit 里最关键的一句是「评估 agent 在整个任务中的行为，而非只看最终输出」。这句话听着像方法论，实际上是**对运行时提出的设计要求**——你要能回答「它做了什么、按什么顺序、在哪一步偏了」，就需要 trace、需要断言、需要可回放的日志。

这跟芯片验证走过的路一模一样：从跑几个 functional test 看输出对不对，走到 coverage-driven + assertion-based verification，靠的是**过程可观测性**而非终值比对。做过验证的人对这套迁移有天然直觉，而纯做 prompt 的团队往往会低估它的工程量。

顺带一个常被忽略的推论：**合规推理是一块刚性的算力需求**。AI TAP 那五家认证机构要跑测试、Anthropic 与 AISI 的培训要跑评测、Fairs 要复现攻击手法——这些负载不会因为市场情绪而停，而且它们的特征（长上下文、多轮 agent trace、大量日志吞吐）跟训练负载、跟聊天推理都不一样。谁在做这块的加速器或推理基础设施，这是个值得盯的细分市场。

**第二，「AI harness engineering」这个词，是我这一周看到的最诚实的一句政策语言。**

尚穆根说：不必要为每个用例自研模型，需要的是评估最好模型并把它们适配进自己工作流的能力。这等于承认了一件事——**在模型层，新加坡不做选手，做裁判兼集成商**。

这个定位对硬件同样成立。新加坡不会去造 GPU，但它可以决定：什么样的机房能落地（DIB 的 PUE）、什么样的模型能进场（透明与事件披露）、什么样的测试机构算合格（AI TAP）。**规则权是它在这个产业链里唯一可持续的杠杆。**

而 DIB 的能效条款会沿着链条往下压：机柜 PUE → 板卡电源转换效率 → 封装的 perf/W。做电源电子、液冷、48V 直流、乃至芯片级能效建模的人，未来几年会在采购规格书里看到新加坡这一条法案的影子。这不是「监管故事」，这是**规格故事**。

**第三，数据的两面：后视镜与挡风玻璃。**

后视镜很漂亮：Q3 GDP +5.4%，9 月 NODX +68.4%（1980 年 2 月以来最强），电子 +107.6%，IC +74.7%。

挡风玻璃需要多看两眼：电子增速从 +131.6% 掉到 +107.6%；MAS 说 AI 拉动在 2027 下半年缓和；AirTrunk 把 US$15 亿 REIT IPO 推迟了；9 月股权融资只有 US$52m。

四个前视信号指向同一件事：**AI 资本周期的斜率在变，但绝对水平仍在高位。** 对一个工程师，正确的动作不是猜顶，而是分清哪些订单是「产能扩张」、哪些是「技术换代」——后者在周期下行时反而更抗跌。

**第四，最该焦虑的是职业阶梯，而它没有政策解。**

黄循财那句「bottom rung」说的是银行，但对 IC 同样成立。今天新入行的 PD 工程师，入门活儿是跑脚本、清 DRC、拉报表、追回归——这些正是 agent 最先吃掉的部分。如果 junior 的活全被自动化，senior 的判断力从哪里长出来？**判断力不是读书读出来的，是在大量低价值的重复里磨出来的。**

这不是「AI 会不会取代工程师」的问题，而是**培养管道会不会断**的问题。公司层面能做的只有一件事：故意保留一部分「低效」的训练任务，把带人当成本而不是浪费。政策文件不会替你解决这个。

**接下来该盯什么？**

1. **DIB 的正式立法时间表与 PUE 阈值的具体数字**——这决定数据中心 capex 的节奏，也决定液冷与电源电子的订单节奏。
2. **AI TAP 第二批认证机构，以及是否走向跨境互认**——互认才是这门生意的护城河；只做本地认证，天花板很低。
3. **10 月电子 NODX 是否连续第二个月减速**——这是目前最干净的一个领先指标。
4. **Anthropic 本地团队的规模与「on soil」的具体形态**——是推理节点落地，还是只有商务与政策团队？这两件事对本地算力需求的含义完全不同。

一句话收束：这一周新加坡买的不是模型，是「谁来证明模型是安全的」这张执照。而出口与融资数据在同时提醒你——AI 周期的斜率，已经换了。

— Youmoo（㕛木）
*Solid as teak.*
