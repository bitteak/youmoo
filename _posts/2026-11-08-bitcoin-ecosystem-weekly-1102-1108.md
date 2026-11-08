---
layout: post
title: "比特币生态周报 2026.11.02–11.08：CISA 三件套入库，ETF 与算力同步收缩"
date: 2026-11-08 20:30:00 +0800
description: "比特币周报：BIP-458/459/460 cross-input signature aggregation 入库、BIP-54 首谈 2027H2 激活、现货 ETF 单周流出 12.8 亿美元令 2026 年转负、算力跌至 988 EH/s 且难度预估 −4.84%、BTC 收于 $75,888。"
tags: [bitcoin, 比特币, 周报, bip, 挖矿, 闪电网络]
---

本周比特币的两条线走成了剪刀差。协议层是这几个月里最"暖"的一周：cross-input signature aggregation（CISA，跨输入签名聚合）的三个草案 BIP-458 / 459 / 460 一起进了 BIP 库，BIP-54 consensus cleanup 的激活时点也第一次被公开讨论到「2027 下半年」。市场与算力这一侧则相反——中期选举民主党横扫国会叠加 AI 资本开支疑虑，BTC 周四单日跌 5.6%、周五跌破 $75K 到 11 周低点，现货 ETF 单周净流出 $12.8 亿，把 2026 年的年内涨幅一次性抹平；全网算力从 1,076.8 EH/s 掉到 988 EH/s，下一轮难度预估 −4.84%。

对做后端的人来说，值得记一笔的是：这周真正有长期价值的东西全在协议层，而市场噪音全在资金层。两者时间尺度不同，不要用后者的情绪去判断前者的进展。

## 一、BIP 进展：签名聚合一次进三个

- **BIP-458 / 459 / 460 入场**：BIPs #2205 / #2210 / #2212 合入三个草案。BIP-458 是非交互半聚合，把 n 个 BIP340 签名从 64×n 字节压到 32×(n+1) 字节；BIP-459 是 DahLIAS，交互式协议，多密钥多消息合成**单个 64 字节签名**；BIP-460 把两者用于新 witness version 2 输出的 keypath 花费，scriptpath 保留独立签名，keypath 输入可以 opt-out。相较 Optech #417 的初版，opt-out 输入已经改成普通 BIP341 签名、不再有特殊标记——钱包可以先采用新输出类型而沿用旧签名逻辑，这是落地路径上的关键让步。收益是多重参与输入（coinjoin、payjoin）的权重和费用；代价是**需要软分叉**，而 BIP-460 没规定激活方式与参数。[Optech #430](https://bitcoinops.org/en/newsletters/2026/11/06/)
- **BIP-54 时间表首次松口**：Antoine Riard 在 Bitcoin-Dev 做了状态盘点——参考实现 [Core #35793](https://github.com/bitcoin/bitcoin/pull/35793) 正在评审测试（只在 regtest 启用新规则、无主网激活），btcd 已有互操作实现（[btcd #2537](https://github.com/btcsuite/btcd/pull/2537)），libbitcoin 据他所知没有。最受争议的仍是「witness 剥离后恰好 64 字节的交易」禁令。他个人认为若社区届时达成一致，**2027 下半年**开始讨论激活是现实的。同期 Pieter Wuille 把「两条时间戳规则如何约束链长」的工作量下界公式做了 Lean 形式化证明。
- **BIP-394 `rawtr()` 合入**（#2251），output script descriptor 家族补上 raw taproot 输出键的原语。
- **BIP-95 Testnet 5 创世块结构修订合入**（#2347），8 月开出后第一次动到创世块定义；**BIP-34** 补早期区块编码澄清与 changelog（#2342 等）。
- 仍在 open 的队列值得盯：BIP-362（Output Public Key Exposure Classification，输出公钥暴露面分类）、BIP-395（Unspendable Internal Keys for Wallet Policies）；BIP-375 这周又修了一批测试向量（#2316 / #2317 / #2324 / #2348 全围绕 P2WPKH scriptPubKey 与签名），规范的测试数据一直是这块的薄弱环节。

## 二、Bitcoin Core：把上周的坑填掉

上一期四条分支（32.1 / 31.2 / 30.4 / 29.5）同日发布带三个安全修复，代价是 32.1 引入了一个回归，这周补上了。

- **32.1 的 PSBT 回归修复（#36539）**：32.1 把 GUI 导出的未签名交易与提费交易写成 PSBTv2，只支持 v0 的签名工具直接无法处理。修复恢复 PSBTv0 导出；`-signer` 外部签名流程仍走 PSBTv2，用户需 HWI ≥ 2.1.0。[#36539](https://github.com/bitcoin/bitcoin/pull/36539)
- **flush 失败仍写索引/UTXO 库的 bug（#35714）**：节点刷盘失败后虽会收到关机信号，但处理写入的代码仍可能在停机前更新数据库；一旦更新成功，数据库就记录了一个「所依赖的块/undo 数据尚未安全落盘」的状态。现在失败的那次 flush 直接跳过写库。这类问题不会立刻爆，只在恢复时咬人——典型的存储一致性债。[#35714](https://github.com/bitcoin/bitcoin/pull/35714)
- **`bitcoin-wallet dump` 部分写入仍报成功（#35492）**：原实现只检查目标文件能否打开，检测不到后续写失败（磁盘满等），用户以为导出完整、恢复时才发现缺数据。现在校验 write / flush / close，失败报错并删除残缺文件。[#35492](https://github.com/bitcoin/bitcoin/pull/35492)
- **P2P 与接口**：`SENDTXRCNCL` 必须在 `VERACK` 之后才断开（#36752，交易中继路径加固）；wallet 删除 `removeprunedfunds` RPC（#36333）；clang 最低版本升到 19（#36036）；leveldb / minisketch subtree 更新；新增 BIP-352 公钥提取基准（#36475，standard + P2PKH worst-case）。

## 三、闪电网络：容量 30 天 −13%

- **1ML 读数**：节点 5,517（30 天 −6.81%）、通道 18,941（−4.25%）、公开容量 **2,295.39 BTC**（约 $1.74 亿，30 天 −13%）；平均节点容量 0.416 BTC、平均通道 0.121 BTC、平均节点年龄 1,468.9 天；Tor 节点 2,762、公网 IP 节点 4,401。[1ML](https://1ml.com/statistics)

  这里要纠正我们上周的一个读数错误：上一期写的「容量 64,802 BTC [待核实]」，那个数字其实是 1ML 的 **Nodes Observed（本周 64,859）**，不是容量。真实容量是 2,295 BTC 这个量级——差了近 30 倍，正好说明为什么聚合读数必须对单位。

- **LND v0.21.6-beta / v0.20.7-beta：绕开 Linux 内核 CVE-2026-98432**：默认关闭 MPTCP 监听。Go 1.24+ 在支持的 Linux 上默认开启 MPTCP 监听，运营者即使没显式配置也可能暴露，而该内核漏洞已演示可借 MPTCP 做远程代码执行。[LND #11456](https://github.com/lightningnetwork/lnd/pull/11456) 把 `multipathtcp=0` 写进 Go 默认值，堵住经由 LND 监听器的攻击路径，**但不修内核**。已装二进制可临时用 `GODEBUG=multipathtcp=0`，长期仍要打内核补丁——这是本周唯一一条「你的节点可能被远程打穿」级别的信息。
- **Core Lightning 26.06.10 安全版本**：修 dual funding、splicing、链上 HTLC 结算、访问控制等多处；修复源码公开但测试**暂时扣留**，给用户留升级窗口。
- **LND #11151 收紧入站通道**：拒绝高于「3 块估算 10 倍」且 >100 sat/vB 的 commitment feerate，并按 BOLT2 初始储备规则拒绝双方余额都不足以维持储备的通道。理由很实际：commitment 费用由发起方付，但过高费用会吃掉其可用余额、浪费接收方的 pending 容量，成交后留下一条不可用的通道。
- **LDK #5089**：anchor 输出 CPFP 凑不齐费用时改为单独广播 commitment（此前可能两笔都发不出去）；零费率 commitment 例外，仍需子交易付 relay 费。CLN `#9592` 则让 xpay 在同一节点两次返回 `unknown_next_peer` 后在本次支付的 askrene 私有路由层直接排除它。

## 四、Ordinals / Runes / BitVM：链上冷，规范热

- **铭文活动在低位，本周无重大协议动态**：Ordinals 区块页显示 tip 附近单块铭文 0–81 个（975,000–975,013 区间），远低于 2024 年高峰。`ordinals.com/status` 这周被 Cloudflare 拦住（403 + 人机验证），**累计总量没取到**，最近可核实的是 2026-10-20 快照的 1.277 亿铭文 / 34.1 GB / 累计约 4,465 BTC 手续费。[Ordiscan](https://ordiscan.com/blocks) / [TokenPost](https://www.tokenpost.com/news/investing/38281)
- **covenant 阵营：BIP-448 有 signet、没激活客户端**。GOAT Network 11/4 的综述把现状摆得很清楚：BIP-448（TEMPLATEHASH + CSFS + BIP-349 OP_INTERNALKEY 打包成「Taproot-native rebindable transactions」）2026 年 3 月 Draft，原语 7/27 在 Bitcoin Inquisition signet 激活，但无激活客户端、无主网信令；CTV 有信号窗口而矿工支持可忽略；OP_CAT 规范标 Complete。Robin Linus 的 BitVM-448 就是用这组原语做非交互充值、省掉每笔充值的联签方集合。[GOAT Network](https://www.goat.network/news/understanding-bitcoin-covenants-and-what-they-change-for-bitvm-bridges)
- **「联签方花费策略」标准化草案**：Luke Carriere 在 Delving 提议统一各家「模拟 covenant 时联签方执行的花费策略」——目前 blinded co-signers、chain code delegation 各定义一套，为 A 设计的钱包用不了 B 的联签方或预言机。方案五段式：output / co-signer group / templates / conditions / profiles，四条原则里最要紧的是「能用脚本强制的一律走脚本」和「必须留一条无需联签方的花费路径」。讨论中有人指出 `statement-v0` 缺 finality flag（联签方可能对随后被修正的临时证明采取行动）、policy hash 必须提交精确的验证器语义，作者都接受。该草案**未申请 BIP 号**。[Optech #430](https://bitcoinops.org/en/newsletters/2026/11/06/)
- **BitVM 桥的现实检验（背景）**：BitVM3 论文（[eprint 2026/933](https://eprint.iacr.org/2026/933)）之后，Bitlayer 的 BitVM Bridge 6/3 起停服且无后继；在产的唯一 BitVM2 部署仍是 Citrea 的 Clementine，挑战窗口约两周。本周没有新增桥。

从 IC 的角度看这段很像 PDK：原语（opcode）有了 signet 验证，但标准单元库（钱包可复用的策略/描述符）还没建起来，所以设计者每家自己写一套 layout、谁也不能复用。联签方策略标准化做的正是建库这件事。

## 五、挖矿：难度预估 −4.84%，算力周内 −8.2%

- **难度**：当前周期进度 65.9%，剩余约 688 块，下轮预估 **−4.84%**（上轮实际 +5.54%）。这是 8 月以来第一次接近 −5% 级别的下修。[mempool.space](https://mempool.space/api/v1/difficulty-adjustment)
- **算力**：blockchain.info 口径 988 EH/s（24h 1,003，一周前 1,076.8，**−8.2%**）。价格与算力同向下行、难度预估转负，是矿工边际出清的典型组合：高成本机队先关机，难度随后回吐。
- **矿池集中度（近 933 块）**：Foundry USA 24.1%、AntPool 18.9%、F2Pool 18.2%，前三合计 **61.2%**；随后 ViaBTC 9.3%、SpiderPool 6.0%、MARA 5.5%、OCEAN 5.5%、SECPOOL 4.5%、Luxor 4.4%。[mempool.space](https://mempool.space/api/v1/mining/pools/1w)
- **TeraWulf：BTC 挖矿收入 −69%，HPC 租赁因 Anthropic 建设放量**。收入结构本季完成翻转，AI 托管成主引擎、自营挖矿退为次要项——「矿企变数据中心运营商」这条线这周有了最直接的财报证据。[The Block](https://www.theblock.co/news/business/2026-11-06-terawulfs-bitcoin-mining-revenue-falls-69-as-hpc-leasing-surges-amid-an)
- **Strive（ASST）10 月买入 15,124 BTC**，Q3 净利 $5.09 亿、普通股净利 $4.748 亿、BTC yield 63.2%。在下行周靠「买入 + 增值」而非经营现金流做 EPS，这就是 2026 年财库公司的标准剧本。[Bitcoin Magazine](https://bitcoinmagazine.com/news/strive-asst-posts-474-8m-common-net-income) / [The Block](https://www.theblock.co/news/business/2026-11-06-strives-bitcoin-gains-509-million-q3-profit-btc-buying-ramps-up-435907)

## 六、市场与机构：ETF 年内转负

- **BTC 周线 $75,888（周 −2.5%）**：11/1 $77,521 → 11/5 高点 $80,443 → 11/6 跌破 $75K 至 11 周低点 → 11/8 $75,888，市值 $1.526T。[CoinGecko](https://www.coingecko.com/en/coins/bitcoin)
- **现货 ETF 单周净流出 $12.8 亿，2026 年 YTD 转负**：12 只美国现货 BTC ETF 周内只有周三净流入 $7,460 万，周一 −$3.986 亿、周二 −$1.156 亿、周四 −$4.302 亿、周五 −$4.119 亿；全周抹掉年内涨幅，YTD 从 +$3.68 亿变成 **−$9.141 亿**。为 6 月底以来最差周、史上第 7 大周流出；持仓市值 $959 亿（占 BTC 市值 6.3%），IBIT 净资产 $603 亿。[The Block](https://www.theblock.co/news/markets/2026-11-07-bitcoin-etfs-flip-negative-for-2026-after-1-28-billion-outflow-week-worst-since-june)
- **宏观双杀**：10 月非农 +16.5 万（预期 6.5 万）压低降息预期；中期选举民主党横扫两院叠加 AI 资本开支疑虑，科技股抛售传导到加密，BTC 周四单日 −5.6%、多头清算超 $10 亿。分析师特别点名德州「蓝潮」可能放缓当地矿场与数据中心扩张——这条对矿业估值的影响比对币价更持久。[CoinDesk](https://www.coindesk.com/markets/2026/11/06/u-s-added-165-000-jobs-in-october-blowing-past-65-000-estimate) / [Decrypt](https://decrypt.co/382717/bitcoin-price-11-week-low-crypto-liquidations-ai-stock)
- **401(k) 加密规则送白宫终审**：DOL 规则进入最后审查，但方案仍为 altcoin 留了口子，同时留下受托责任与菜单设计的硬门槛。[Bitcoin Magazine](https://bitcoinmagazine.com/news/dol-rule-crypto-401k-white-house-review)
- **Galaxy 提示民主党双院下的新监管风险**，是本轮「政策风险重定价」的卖方版本。[news.bitcoin.com](https://news.bitcoin.com/regulation-and-legal/galaxy-flags-new-risks-for-crypto-as-democrats-take-both-chambers/)

## 七、安全与工具：Binance 事件的第二幕

- **Binance 洗钱与人事**（盗币本身见[上期](https://youmoo.xyz/posts/bitcoin-ecosystem-weekly-1026-1101/)）：Elliptic 称黑客已把部分赃币换成约 **$1.24 亿 BTC**，另有约 **$31 亿尚未洗出**；CFO Kaiser Ng 在事件 9 天后离职，co-CEO 称交接半年前已规划；CZ 就 AI 辅助攻击发警告。被盗总额按 Reuters 口径是 $63 亿。[The Block](https://www.theblock.co/news/markets/2026-11-06-binance-hackers-swap-stolen-tokens-124-million-bitcoin-exchange-plans-wi) / [Decrypt](https://decrypt.co/382711/3-1b-in-stolen-binance-crypto-has-yet-to-be-laundered-elliptic)
- **MEXC 被美国财政部切断美元通道**：指其约 **$160 亿**交易涉伊朗、朝鲜、俄罗斯非法资金流；同周财政部撤回加密「travel rule」监控提案。方向很清楚：打交易所、松合规。[Bitcoin Magazine](https://bitcoinmagazine.com/news/fincen-cuts-off-mexc-us-financial-system) / [CoinDesk](https://www.coindesk.com/business/2026/11/07/u-s-treasury-moves-to-cut-off-crypto-exchange-mexc-over-usd16-billion-in-al)
- **Gnosis Pay 数据泄露**：卡号、家庭住址与关联钱包外泄，资金未受影响，问题出在遗留借记卡系统。[CoinDesk](https://www.coindesk.com/business/2026/11/07/gnosis-pay-breach-exposes-card-numbers-home-addresses-and-linked-crypto-wal)
- **GOPAX 预防性停摆**：收到自称已入侵的邮件后 11/6 暂停充值、常规提币与交易（未平仓单全撤），热钱包资产转冷钱包，称威胁真实性未验证、无实际损失。背景是韩国 FSC 在 Binance 事件后要求交易所提高冷钱包比例（≥80%）。[Reuters](https://reut.rs/4fezvTP) / [Yonhap](https://en.yna.co.kr/view/AEN20261106011751320)
- **前 FBI 反谍特工认罪**：从 35 起案件关联钱包窃取 $247 万加密资产——执法环节的「内鬼」类风险。[The Block](https://www.theblock.co/news/regulation/2026-11-07-ex-fbi-agent-pleads-guilty-to-stealing-2-47-million-in-crypto-from-wa)

## 八、链上数据速览

- 区块高度 **975,056**；mempool 待确认 **62,901 笔 / 14.0 MvB**，待确认费用池 0.0477 BTC；费率 fastest 3 / halfhour 1 / economy 1 sat/vB——除最快档全部贴地板。[mempool.space](https://mempool.space/api/mempool)
- 日交易量 **591,830**，一周前 723,329（**−18%**），与铭文/Runes 降温、费率贴底一致。[blockchain.info](https://api.blockchain.info/charts/n-transactions)
- 闪电网络容量占 2,100 万上限的 0.0109%；24h 新节点 8、新通道 175。[1ML](https://1ml.com/statistics)

## 政策与监管（补充）

- **希腊**：通过加密税法，收益 10%、质押与 DeFi 收入 15%。
- **俄罗斯**：加密交易规则定稿，11/17 生效。
- **尼日利亚**：央行出台稳定币牌照规则，禁止算法稳定币。
- **欧盟**：组建专项加密工作组打击俄罗斯规避制裁；美国制裁加拿大换汇机构（伊朗关联）与 Prince Group 生态 45 个目标。
- **泰国**：SEC 对 Bitget 提刑事控告，12/5 起封禁本地访问。

## 结语

这周最有信息量的不是币价，而是三条同时指向「区块空间需求转弱」的指标：难度预估 −4.84%、算力周内 −8.2%、费率全档位贴 1 sat/vB。链上没人抢块了，矿工开始关机，然后难度回吐——这是一条完整的负反馈链，会自己走完，不需要谁来干预。

资金面则在做另一件事：把「比特币是数字黄金」的叙事换成「比特币是高 beta 科技资产」来定价。ETF 单周 −$12.8 亿、年内 YTD 转负，触发点是中期选举和 AI 资本开支疑虑，而不是任何比特币自身的事件。这两种定价方式来回切换，是这个周期最折磨人的地方。

技术侧反而在稳步推进：CISA 三件套意味着多重签名/coinjoin 的边际成本有望降一个量级，BIP-54 谈论 2027 下半年激活说明 consensus cleanup 从「学术讨论」进入了「工程排队」。如果你关心的是三五年后的比特币，这周的好消息全部在这一栏；如果你关心的是三个月内的价格，这周没有好消息。

— Youmoo（㕛木）

*Solid as teak.*
