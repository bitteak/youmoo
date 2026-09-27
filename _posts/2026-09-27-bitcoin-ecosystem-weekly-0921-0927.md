---
layout: post
title: "比特币生态周报 2026.09.21 – 09.27：Silent Payments 合入 Core，后量子闪电与 $3.875 亿被盗同周登场"
date: 2026-09-27 20:30:00 +0800
description: "比特币生态周报（9/21–9/27）：BIP-352 Silent Payments 实现合入 Bitcoin Core，Optech #424 提出后量子闪电网络 PQLN，CLN 发布安全版本，ETF 单周净流入 24 亿美元使 2026 年资金流转正，Bitget 被盗 3.875 亿美元。"
tags: [bitcoin, 比特币, 周报]
---

## 本周主线

这一周比特币的技术面比价格面热闹得多。**BIP-352 Silent Payments 的实现终于合入 Bitcoin Core**（PR #35301，9 月 23 日），这是继 taproot 之后钱包隐私层面最有分量的一次落地；同一天区间内，Optech 第 424 期抛出了把闪电网络链下各层全面升级到**后量子安全**的 PQLN 提案，并附上可跑的 rust-lightning 实现。安全侧则是老问题的新伤口：Bitget 热钱包被盗 $3.875 亿，朝鲜再度成为嫌疑人；而 Ordinals 之外最值得记一笔的可编程层进展，是一篇**不改共识规则**的「Shielded Bitcoin」隐私论文。

市场面反而平静：BTC 在 $81K–$86.6K 之间横盘收于约 $84.9K，但 ETF 单周净流入约 $24–30 亿，把 2026 年年内资金流推回**正值**——这是今年第一次。

## 一、BIP 进展

- **BIP-138「Compact Encryption Scheme for Non-seed Wallet Data」本周密集迭代**。作者 Pyth（Wizardsardine），Draft v0.1.3，为 output script descriptors（BIP-380）与 wallet policies（BIP-388）等钱包元数据定义紧凑加密方案。本周连合三个 PR：encoding 澄清入 changelog（#2298）、拒绝空 payload 与 `0x00` 终止解析的规范（#2299）、跨备份收集并去重 recipient keys、排除已被其他表达式暴露的根、澄清 MuSig 参与资格（#2300）。[GitHub BIPs](https://github.com/bitcoin/bips/commits/master)
- **BIP-352 Silent Payments 状态 Complete 并落地 Core**。该 BIP 由 josibake、Ruben Somsen、Sebastian Falbesoner 提出；对应实现 [PR #35301](https://github.com/bitcoin/bitcoin/pull/35301) 于 2026-09-23 23:18 UTC 合并，是 #28122 的第二版，基于 secp256k1 #1765，聚焦纯 BIP 逻辑（直接以公私钥做测试，不绑定 wallet 与交易实现），含 BIP 官方测试向量，receiver label 延后。
- **BIP-375「Sending Silent Payments with PSBTs」推进**：#2305 把 `PSBT_IN_P2C_TWEAK` 写入 BIP-174 类型注册表；#2309 主张从 BIP-374 直接 import DLEQ 而非 vendoring；#2310 要求校验非 witness UTXO 的 SegWit 版本；#2256/#2257 明确版本字节归属标识符、`k` 按输出索引顺序分配。[GitHub BIPs PRs](https://github.com/bitcoin/bips/pulls)
- **BIP-54 Consensus Cleanup（Status: Complete）继续打磨**：#2293 区分两类时间戳限制中「矿工执行」的部分，#2308 说明时间戳测试向量的树形格式。该 BIP 打包修复 timewarp 攻击、最坏情况区块验证时间、Merkle 树弱点与重复交易。[bip-0054.md](https://github.com/bitcoin/bips/blob/master/bip-0054.md)
- **BIP-98 Fast Merkle Trees** 修正示例证明中的第三个 SKIP 哈希（#2306）。

## 二、Bitcoin Core 开发

- **v32.0rc2 处于终测**：tag 已出，Optech #424 附测试指南；此前锁定稳定版目标 **10 月 10 日**，无语义共识变更。[Optech #424](https://bitcoinops.org/en/newsletters/2026/09/25/)
- **本周最大合并是 Silent Payments（#35301）**，叠加 #35440 在解码前校验 descriptor cache 的 xpub 长度，钱包侧明显向 Silent Payments 靠拢。[merged PRs](https://github.com/bitcoin/bitcoin/pulls?q=is%3Apr+is%3Amerged+sort%3Aupdated-desc)
- **挖矿：新增区块模板管理器**（[#35675](https://github.com/bitcoin/bitcoin/pull/35675)，9/24 合并），为区块模板的构建与复用提供统一抽象。
- **钱包修正**：#34371 让 `importprunedfunds` 支持花费型交易；#29278 新增 `maxfeerate` 启动选项；#36284 修复 `avoidpartialspends` 下输出组被双重丢弃；#35984 签名时跳过没有对应输出的 `SIGHASH_SINGLE` 输入。
- **网络 / init / mempool**：#36312 不再对私有广播对等点施加 discourage；#35696 更新 i2p leaseset 加密类型；#36322 修复重启后费率估计滞后于链；#35948 修正首次运行磁盘空间估算；#35923 mempool 内存用量计入未广播 txid；#36335 从 SECURITY.md 移除某开发者密钥。

## 三、Layer 2 / 闪电网络

- **1ML 口径**：节点 **5,879**（30 日 −2.10%）、通道 **19,709**（30 日 −3.0%）、容量 **2,682.94 BTC**（约 $2.277 亿，30 日 +0.43%）；24h 新增节点 5、新增通道 190、更新通道 15,632。**mempool.space 口径**（8/30 快照）为节点 16,222、通道 32,511、容量 3,753.6 BTC —— 两家口径差异巨大，趋势只看各自序列。[1ML](https://1ml.com/statistics) / [mempool.space](https://mempool.space/api/v1/lightning/statistics/latest)
- **PQLN：后量子闪电网络提案**。Ahmet Kurt 在 Delving Bitcoin 提出把 LN 链下各层升级为量子安全，附论文与基于 rust-lightning 的实现。gossip（BOLT7）由 `node_announcement` 直接携带 ML-DSA / ML-KEM 公钥并 pin 住；传输层（BOLT8）Noise 握手改为双 ML-KEM 混合（静态密钥 + 临时密钥提供前向保密，不做带内协商）；发票（BOLT11）因 tagged field 上限 639 字节，2,420 字节的 ML-DSA-44 签名要拆到 4 个字段；offers（BOLT12）每个 offer 提交新 ML-DSA key；onion（BOLT4）格式不变但 Sphinx secret 混合，密文随 `update_add_htlc` 以 20 槽位下发，空槽填 dummy 以防推断路由长度。**代价是带宽：下载约 10 倍、存储约 9 倍；计算不是瓶颈（ML-DSA 签名 0.33 ms）**。regtest 上与经典节点互操作通过。[Optech #424](https://bitcoinops.org/en/newsletters/2026/09/25/)
- **Core Lightning v26.06.8 安全版本（9/22）**：代号 "Quantum-Resistant Lightning Channel V"，修复多方报告的漏洞，无禁运期、源码立即可得，但暂扣少量测试以延缓攻击者定位；开发构建因 schema 更新无法回退，官方强烈建议升级。[CLN releases](https://github.com/ElementsProject/lightning/releases)
- **LND 同日出两个 RC**：`v0.21.4-beta.rc1` 与 `v0.20.5-beta.rc1`（9/25），无数据库迁移。[lnd releases](https://github.com/lightningnetwork/lnd/releases)
- **LDK v0.3-rc2**：为待处理 splice 增加 RBF 手续费提升、支持同一 splice 内加/减资金、默认协商 anchor 通道；升级会使含 payment metadata 的旧 BOLT11 发票失效。**Stacks 4.0.4**（9/24）为出块稳定性修复。Taproot Assets、Babylon、RGB 本周无新版本。[stacks-core releases](https://github.com/stacks-network/stacks-core/releases)

## 四、Ordinals / Runes / BitVM 可编程层

- **链上序列化数据**：高度 968,837；铭文总量 **127,930,750**（blessed 127,458,707 / cursed 472,043）；**Runes 215,297**；ord 0.29.0，四类索引全开。[ordinals.com](https://ordinals.com/status)
- **Shielded Bitcoin：不改共识规则的「Zcash 式」隐私**。密码学公司 [alloc] init 的 Clara Shikhelman、Mikhail Komarov、Aleksei Moskvin 发布论文：比特币计价价值以加密 note 持有，花费时广播「已用标记」+ 所有权与无通胀证明，金额、发送方、接收方全部隐藏。与 Zcash 不同，证明不由比特币链校验，而由**独立软件**验证——因此可能出现「比特币交易确认、但私密支付自身校验失败」。论文也还没有解决最关键的一环：如何把真 BTC 锁进去再放出来。批评点集中在手续费可见、交易成本更高与可信设置依赖。[CoinDesk](https://www.coindesk.com/tech/2026/09/25/bitcoin-could-soon-get-zcash-style-shielded-privacy-without-changing-its-rules)
- **BitVM 本周无重大动态**：主仓最新提交仍是 1 月的 Zellic 审计（#411/#412）。本周可编程层的实际进展在隐私与后量子签名成本两端。[BitVM commits](https://github.com/BitVM/BitVM/commits)
- **BIP-110 之争延续**：围绕 Ordinals 与链上数据限制的客户端分歧仍未收敛，Optech 的 Stack Exchange 环节还在讨论「BIP110 分叉后是否需要从区块 0 重新同步」。[Optech #424](https://bitcoinops.org/en/newsletters/2026/09/25/)

## 五、挖矿与算力

- **难度：上次 +4.163%，下次预估 −1.96%**（进度 57.4%，剩 859 块），当前 132.757 T —— 相比上周 −7% 的预估已大幅上修，反映近期出块偏快。[mempool.space](https://mempool.space/api/v1/difficulty-adjustment)
- **算力回升**：blockchain.info 最新约 **1,016 EH/s**（1 日前 884 EH/s、1 周前 826 EH/s）；mempool.space 3 日窗口 **955 EH/s**。两源都指向自上周 915 EH/s 的回升（平滑窗口不同）。[mempool.space hashrate](https://mempool.space/api/v1/mining/hashrate/3d)
- **矿池集中度（近一周 1,017 块）**：Foundry USA 24.2%、AntPool 22.3%、F2Pool 14.8%、ViaBTC 9.3%、SpiderPool 7.4%、MARA Pool 5.7%、SECPOOL 3.8%、Luxor 2.9%、OCEAN 2.8%、Binance Pool 1.7%。**Top2 合计 46.5%**。[mempool.space pools](https://mempool.space/api/v1/mining/pools/1w)
- **Riot Platforms 还清 Coinbase 信贷**：偿还 6.15% 利率的 **$2 亿**比特币抵押额度并关闭，抵押 BTC 全部释放，无提前还款罚金。[news.bitcoin.com](https://news.bitcoin.com/mining/riot-repays-coinbase-loan-ends-200-million-bitcoin-backed-facility/)
- **矿企 AI/HPC 转型继续加码**：Nscale 获 **$33.6 亿** pre-IPO 融资（Third Point 领投）；Cipher Digital 德州 Barber Lake 获 20 年承诺，合约收入自 $38 亿升至**逾 $90 亿**；Applied Digital 确认阿拉巴马 Brookwood 为 Delta Forge 2 站点（$32 亿、210 MW）。[TheEnergyMag](https://theminermag.com/)
- **JPMorgan 认为 BTC 站上 $85,000 生产成本可缓解矿工抛压**（现价 $84.9K 已贴近该线）——单源，待核实。[The Block](https://www.theblock.co/news/markets/2026-09-24-jpmorgan-bitcoin-production-cost-miners-relief-416283)

## 六、市场与机构

- **BTC $84,891（24h +0.87%），市值 $1.705 万亿**；周内路径 $81,169（9/21）→ $86,597（9/22）→ $84,417（9/27）。Q3 收 **+44%**，为比特币历史第二好的第三季度。[CoinGecko](https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd)
- **ETF 资金流首次年度转正**：单周净流入约 **$24 亿**（The Block 记为「自去年 10 月以来最大单周」），Bitcoin Magazine 口径近 **$30 亿**，连续 7 个交易日净流入，2026 年年内累计转为正值。[Bitcoin Magazine](https://bitcoinmagazine.com/news/bitcoin-etfs-bring-in-nearly-3-billion) / [Decrypt](https://decrypt.co/379391/bitcoin-etfs-notch-seven-day-winning-streak-as-2026-flows-turn-green)
- **Strategy 提议优先股按日分红**（STRC/STRD/STRF/STRK，365 天累计），把折价的 STRC 拉回 $100 面值——比特币财库公司的融资结构进一步「类固收化」。[CoinDesk](https://www.coindesk.com/markets/2026/09/25/strategy-proposes-daily-dividends-to-bring-strc-back-toward-usd100)
- **机构与产品线**：Bitwise 调研的 15 家机构显示更多潜在买方；ARK Invest 通过 Securitize 把 **$13 亿**风投基金上链；Grayscale 申报 Zcash 收益型 ETF（双周派息），ZEC 本周 $1,658（+7.6%）——隐私资产叙事与上文的 Shielded Bitcoin 论文同频。[news.bitcoin.com](https://news.bitcoin.com/featured/grayscale-files-for-zcash-income-etf-with-planned-biweekly-payouts/)
- **宏观**：债市波动率飙升而比特币与美股保持平静；美联储依 GENIUS Act 提出稳定币发行方的准备金上限与资本标准（单源）。[CoinDesk](https://www.coindesk.com/markets/2026/09/25/bond-volatility-surges-while-bitcoin-and-wall-street-stay-calm)

## 七、安全与工具

- **Bitget 热钱包被盗 $3.875 亿（9/24 披露）**：交易所确认影响热钱包资产，CEO 将事件与朝鲜黑客关联；攻击者随后转移 **$8,300 万 XRP**（Ripple 无法冻结），Circle 与 Tether 冻结了相关稳定币，但**大部分资金已流出**。[Decrypt](https://decrypt.co/379350/bitget-hack-387m-what-happened-why-north-korea-suspect) / [CoinDesk](https://www.coindesk.com/markets/2026/09/26/bitget-hacker-moves-usd83-million-in-stolen-xrp-that-ripple-cannot-freeze)
- **Magic Eden 旧版以太坊 NFT 授权漏洞**：遗留 approval 使价值 **$570 万** NFT 暴露于支付处理合约利用，已在被榨干前抢救——对所有运行多年市场的团队都是同一类「历史授权债」。[Decrypt](https://decrypt.co/379342/magic-eden-old-ethereum-nft-listings-exposed-exploit)
- **量子安全交易构造成本一周降约 80%**：StarkWare 联合 Yukon Research、Eigen Labs 举办 Quantum-Safe Bitcoin Optimization Challenge，把构造一笔量子安全交易的估算成本从约 **$320 压到约 $67**。成本发生在用户 GPU 上的暴力搜索（约 7 万亿分之一哈希才命中签名占位），而非链上手续费；榜首由跑 AI 模型的开发者占据（Anthropic Opus 5、Fable 5.1，GPT-6 Astra、Grok 4.6、Kimi 紧随）。首笔量子安全交易上月已进主网，约耗 3,100 GPU 小时。StarkWare 强调 $67 是估算而非价格，长期仍倾向软分叉路径。[Decrypt](https://decrypt.co/379378/ai-agents-racing-make-quantum-safe-bitcoin-cheap)
- **工具与合规**：SEC 委员 Hester Peirce 离任前主张用零知识证明改造 KYC；CFTC 起诉 Cash FX，指控 **$9.5 亿**加密相关外汇骗局。[news.bitcoin.com](https://news.bitcoin.com/technology/secs-hester-peirce-wants-zero-knowledge-proofs-to-fix-kyc-system/)

## 八、链上数据速览

- **区块高度 968,837**；日交易量 **757,303 笔**（一周前 592,465，+28%）。
- **mempool**：77,965 笔 / 40.6 MvB，待确认手续费合计 **0.0772 BTC**；费率**最快 2 sat/vB、半小时 1、经济 1** —— 链上空间持续宽松。
- **难度** 132.757 T，上次 +4.163%，下次预估 −1.96%，剩 859 块。
- **铭文 127,930,750（cursed 472,043）、Runes 215,297。**

## 结语

把本周四条线放在一起看，会发现它们指向同一个主题：**比特币正在用「不触碰共识」的方式扩容它的能力边界**。Silent Payments 是钱包层的隐私与可组合性（BIP-352 完成、BIP-375 在 PSBT 层跟进），Shielded Bitcoin 试图把隐私推到极致但仍老老实实停在侧系统，PQLN 把抗量子压力全部压在链下 gossip/传输/发票层，而 StarkWare 那条 $320 → $67 的曲线说明「在签名位置上塞一个哈希」这种权宜构造，成本正被 AI 辅助的优化以周为单位压下来。

对工程视角而言，最值得记住的不是某个数字，而是这个约束条件：**共识层几乎冻结，创新全部转移到钱包、L2 与客户端策略**。这也解释了为什么本周最大的安全事件（Bitget）和最多的技术动作（BIPs / Core / CLN）发生在完全不同的层次——在缺少共识变更通道的时候，风险与进展都会往边缘堆积。价格横盘、费率跌到 1 sat/vB、ETF 资金慢慢转正的组合，正好给了 builders 一段安静干活的时间窗。

— Youmoo（㕛木）
*Solid as teak.*
