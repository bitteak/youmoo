---
layout: post
title: "比特币生态周报 2026.10.05 – 2026.10.11：BIP-324 草案让新消息免协调、Ledger 确认硬件植入、算力强反弹 +15.6%"
date: 2026-10-11 20:30:00 +0800
description: "比特币生态周报 2026.10.05–10.11：BIP-324 动态单字节消息类型 ID 草案、BIP-352 Silent Payments 补测试向量并修漏收款 bug、Core v32.0rc3 与私有广播隐私修复、算力单周 +15.6% 至 1,022 EH/s、下次难度转正 +4.29%、Ledger 确认未授权硬件植入损失或超 $8,600 万、BTC 全周约 −2% 至 $83K。"
tags: [bitcoin, 比特币, 周报]
---

这一周的三条线很整齐：**协议层在松绑**，BIP-324 冒出「动态单字节消息类型 ID」草案，让新 P2P 消息不必再排队等一个全局分配的一字节 ID；**安全圈在震动**，Ledger 确认经销商渠道出现未授权硬件植入、损失或超 $8,600 万；**算力在反弹**，单周回升约 15.6% 至 1,022 EH/s，下次难度预估由负转正，而 BTC 却全周回落约 2% 到 $83K 附近。价格、算力与安全事件同时出现方向背离，是本周最值得记下的结构。

窗口：2026-10-05 ~ 2026-10-11（周日截止）。链上快照：高度 970,926 ｜ 算力 1,022 EH/s ｜ mempool 72,150 笔 / 39.1 MvB ｜ 费率 1 sat/vB。

## 一、BIP 进展

- **BIP-324 动态单字节消息类型 ID（草案）**：Anthony Towns 在 Bitcoin-Dev 提出草案 BIP，允许每个对端在连接时通过新的 `set324alias` 消息声明自己的一字节 ID。现行 BIP324 用固定表分配一字节 ID，任何新消息要么等一个全局协调的条目，要么只能带完整的 12 字节名；新方案让新消息可在 P2P 层直接部署实验。省流量从「纯 ping 连接最多约 66%」到「典型连接约 5%」，在新消息真正落地前为零。[来源：Bitcoin Optech #426](https://bitcoinops.org/en/newsletters/2026/10/09/) / [GitHub bitcoin/bips](https://github.com/bitcoin/bips/pulls)
- **BIP-352（Silent Payments，Complete）**：PR #2330 补 skipped inputs 与 label 边界测试向量、#2323 补 malleated p2pkh pubkey 提取向量、#2288 对齐参考实现地址解码；Core 侧 #36338 修复一个可能**漏收款**的实现 bug（交易含被修改但共识有效的 P2PKH 输入时）。[来源：GitHub](https://github.com/bitcoin/bips/pulls) / [Bitcoin Optech #426](https://bitcoinops.org/en/newsletters/2026/10/09/)
- **BIP-375（用 PSBT 发送 Silent Payments，Draft）**：持续迭代——#2321 要求每个 per-input ECDH share 附 DLEQ 证明、#2310 校验非见证 UTXO 的 SegWit 版本、#2309 改为从 BIP-374 导入 DLEQ 而非内置、#2324 缺失 UTXO/redeem script 时拒绝而非崩溃。[来源：GitHub](https://github.com/bitcoin/bips/pulls)
- **BIP-461 / BIP-346 / BIP-327 / BIP-379 测试向量**：#2328 BIP-461 参考实现与测试向量、#2327 BIP-346 拒绝截断的 long-form TxFieldSelector、#2329 补 BIP-327 未覆盖用例、#2240 引入 rust-miniscript 向量。[来源：GitHub](https://github.com/bitcoin/bips/pulls)
- **新草案**：#2297 NestedMuSig2（BIP340 兼容签名）、#2294 Output Public Key Exposure Classification。[来源：GitHub](https://github.com/bitcoin/bips/pulls)

BIP-324 这份草案的意义在于治理面而非字节面：过去每个新消息类型都是一次全网的协调动作，`set324alias` 把协商下放到单条连接，新协议可以「先跑起来再说」。省下的那 5% 流量是副产品，真正的价值是把 P2P 层的创新门槛降下来。

## 二、Bitcoin Core 开发

- **v32.0rc3 已打 tag**：32.0 第三个候选版本，附测试指南；本周无正式新版本发布（上一批正式版仍为 7 月的 v29.4 / v31.1 / v30.3）。[来源：GitHub](https://github.com/bitcoin/bitcoin/tags) / [Bitcoin Optech #426](https://bitcoinops.org/en/newsletters/2026/10/09/)
- **#36277 修复私有广播的交易来源隐私泄漏（重要）**：实验性 opt-in 私有广播功能里，攻击者可通过延迟自身请求、并经另一连接把交易回传，推断交易是否源自本节点。修复后即使交易已传播，节点也会完成全部三次 Tor/I2P 初始广播（后续重试仍可停）。[来源：Bitcoin Optech #426](https://bitcoinops.org/en/newsletters/2026/10/09/)
- **#35989 修复钱包崩溃**：`importdescriptors` 的 range 以 2^31−1 结尾时会崩溃。[来源：GitHub](https://github.com/bitcoin/bitcoin/pull/35989)
- **#36365 修复 mempool 费率估算器**：mempool 估算器不可用时回退到基于确认的估算；重启后 mempool 加载失败不再误用旧健康统计造成费率偏低；`estimatesmartfee` 默认值 none → auto。[来源：Bitcoin Optech #426](https://bitcoinops.org/en/newsletters/2026/10/09/)
- **其他合并**：#36471 `bitcoin-util` 按显示顺序打印创世哈希、#35037 `-ipcbind` 支持每地址最大连接数、#36462 修复 OpenRPC hex 正则允许空串、#36467 / #36416 测试改进。[来源：GitHub](https://github.com/bitcoin/bitcoin/commits/master)

## 三、Layer 2 / 闪电网络

- **1ML 统计**：节点 5,920、通道 19,759、容量 64,643；24h 新增节点 8 / 通道 241、更新通道 15,735。对照上周（节点 5,914 / 通道 19,828 / 容量 64,573），通道数 −69、容量 +70、节点 +6——容量小幅上移而通道数微降，属于正常的开合再平衡。[来源：1ML](https://1ml.com/statistics)
- **Core Lightning 26.06.9 安全版本**：修复 channel reestablishment、splicing、HTLC 处理、访问控制等漏洞；并修复 26.06.8 因错误限流 gossip/ping/onion 消息而拖慢通道流量的回归。安全测试暂缓公开以防被利用，但源码即时可用，项目强烈建议升级。[来源：Bitcoin Optech #426](https://bitcoinops.org/en/newsletters/2026/10/09/)
- **LDK v0.3-rc3**：为 pending splice 增加 RBF 手续费追加、支持同一 splice 内加/减资金；默认协商 anchor 通道并要求应用显式接受入向通道；升级会使含 payment metadata 的旧 BOLT11 发票失效。[来源：Bitcoin Optech #426](https://bitcoinops.org/en/newsletters/2026/10/09/)
- **LDK v0.2.7 / v0.1.13 安全版本**：含 channel reestablishment 盗币修复与 Electrum 同步 DoS 修复。[来源：Bitcoin Optech #426](https://bitcoinops.org/en/newsletters/2026/10/09/)
- **BTCPay Server 2.4.5 安全版本**：默认阻止出站 HTTP 访问私有网段（防 SSRF）、收紧发票与退款权限、Tor 改为 opt-in 并移除若干无人维护的集成。[来源：Bitcoin Optech #426](https://bitcoinops.org/en/newsletters/2026/10/09/)
- Taproot Assets / RGB / Stacks / Babylon：本周无重大动态。

闪电网络这一周是「补丁周」：CLN、LDK 两条主线都发了安全版本，加上 BTCPay 的 SSRF 加固。channel reestablishment 这个环节同时出现在 CLN 和 LDK 的修复清单里，值得运维方当成一次集体提醒——通道重连状态机是全场最脆的接缝之一。

## 四、Ordinals / Runes / BitVM 可编程层

- **铭文总量 128,057,062**（其中 blessed 127,585,019、cursed 472,043），一周新增约 69,035。[来源：ordinals.com/status](https://ordinals.com/status)
- **Runes 蚀刻 215,849 个**，一周新增约 194（上周 215,655）。[来源：ordinals.com/status](https://ordinals.com/status)
- **Shielded Bitcoin 隐私元协议提案**：Misha Komarov 等提出无需共识变更的链上私密转账元协议——用类 UTXO 的加密记录 note + nullifier + 由外部 indexer 验证的证明，实现金额与对手方均不可见；peg-in/out 基于 witness encryption（PIPEs）；非托管、无需可信运营方/交互/活性依赖。需一次性 setup 仪式（≥1 诚实方即安全），进出协议会留可见痕迹。论文里与 Zcash、Shielded CSV（Glass Coins）、coinjoin/payjoin 做了对比。[来源：Bitcoin Optech #426](https://bitcoinops.org/en/newsletters/2026/10/09/)
- **BitVM / covenant 验证桥**：本周无重大动态。

Shielded Bitcoin 思路和上个月公开的隐私论文是同一条路线：**把隐私做成比特币之上的元协议，而不是改共识**。这个取向很务实——绕开软分叉的政治成本，代价是引入外部 indexer 与一次性 setup，隐私强度与「无信任」程度都在 Zcash 与 coinjoin 之间找一个中间点。

## 五、挖矿与算力

- **难度**：下次调整预估 **+4.29%**（进度 61.0%，剩余约 786 块、约 5.5 天）；前一次调整为 −0.03%。[来源：mempool.space](https://mempool.space/)
- **算力强反弹**：blockchain.info 现 1,022 EH/s，1 天前 963 EH/s、一周前 884 EH/s——单周约 **+15.6%**，扭转上周约 −13% 的回落。[来源：blockchain.info](https://www.blockchain.com/explorer/charts/hash-rate)
- **矿池集中度（1 周 1,087 块）**：Foundry USA 27.0%、AntPool 19.8%、F2Pool 17.3%、ViaBTC 9.3%、SpiderPool 6.3%、MARA Pool 5.1%、SECPOOL 4.0%、Luxor 3.2%、OCEAN 2.5%、Braiins Pool 1.6%、BTC.com 0.9%。[来源：mempool.space](https://mempool.space/mining/pools)
- **MARA 向 Galaxy Digital 转出约 $8,110 万比特币**，作为其向 AI 转型的战略动作之一。[来源：CoinDesk](https://www.coindesk.com/markets/2026/10/09/mara-transfers-usd81-1-million-in-bitcoin-to-galaxy-digital-as-strategy-pivots-to-ai)
- 新矿机发布与上市矿企财报：本周无重大动态（TheMinerMag RSS 本期无输出）。

算力 +15.6% 与难度预估 +4.29% 是同一件事的两面：上周的 −13% 更像一次噪声/统计波动，本周直接补回来还多。而 MARA 把 $8,110 万 BTC 转给 Galaxy，和它「转向 AI」的战略标签连在一起看，说明头部矿企的资金用途正在从「囤币」转向「出资建 AI 基础设施」——这条线索值得后续几周持续跟踪，目前仅 CoinDesk 单条来源。

## 六、市场与机构

- **BTC $83,091**（24h +0.33%，市值约 1.670 万亿美元）；周内 10/5 高见 $86,490、10/9 低见 $81,686，全周约 −2%，随后小幅回稳。[来源：CoinGecko](https://www.coingecko.com/en/coins/bitcoin)
- **现货比特币 ETF 两日净流出 $7.29 亿**，投资者情绪反转；以太坊 ETF 则连续 9 日流出。[来源：Bitcoin Magazine](https://bitcoinmagazine.com/markets/bitcoin-etfs-shed-729-million-in-two-days) / [The Block](https://www.theblock.co/news/markets/2026-10-10-ether-etfs-extend-outflow-streak-to-nine-days-as-solana-funds-snap-record-14-week-inflow-run-418215)
- **Meanwhile（Sam Altman 支持的比特币寿险公司）融资 $3,750 万**，Bain Capital Crypto 领投。[来源：Cointelegraph](https://cointelegraph.com/news/sam-altman-backed-bitcoin-life-insurer-meanwhile-raises-more-funds) / [The Block](https://www.theblock.co/news/deals/2026-10-09-sam-altman-backed-bitcoin-life-insurer-meanwhile-raises-37-5-million-round-led-by-bain-capital-crypto-418131) / [Decrypt](https://decrypt.co/380633/sam-altman-backed-life-insurer-bitcoin-raise)
- **JPMorgan 估计今年已有约 $500 亿流入加密市场**，Q4 动能改善。[来源：The Block](https://www.theblock.co/news/markets/2026-10-08-jpmorgan-crypto-inflows-50-billion-etf-futures-q4-418115)
- **泰国 SEC 发布比特币/以太坊 ETF 规则，10 月 16 日生效**。[来源：The Block](https://www.theblock.co/news/regulation/2026-10-09-thailand-sec-issues-bitcoin-and-ether-etf-rules-set-to-take-effect-oct-16-418132) / [CoinDesk](https://www.coindesk.com/policy/2026/10/09/thailand-opens-door-to-locally-listed-bitcoin-and-ether-etfs)
- **宏观与监管**：美国财政部长 Bessent 称本周将查扣约 $10 亿与伊朗相关加密资产（「我们知道它在哪」）；Trump 排除中期选举前对伊动武，BTC 一度企稳 $82,500。CFTC 拟把事件合约纳入 swaps 监管。纽约州总检察长与 Celsius 前 CEO Mashinsky 达成最高 $3,500 万和解 + 终身禁业。[来源：CoinDesk](https://www.coindesk.com/markets/2026/10/09/bitcoin-steadies-near-usd82-500-after-trump-rules-out-iran-strike-before-midterms) / [Cointelegraph](https://cointelegraph.com/news/scott-bessent-us-seize-crypto-iran-sanctions) / [Decrypt](https://decrypt.co/380635/cftc-draws-line-prediction-markets-and-gambling-new-rules) / [The Block](https://www.theblock.co/news/regulation/2026-10-09-ny-attorney-general-alex-mashinsky-celsius-35-million-ban-418154)
- **10/10 一周年**：媒体回顾一年前（2025-10-10）约 $190 亿清算的闪崩，称 BTC/ETH 流动性已修复，但极端波动仍比 2018 年更频繁。[来源：CoinDesk](https://www.coindesk.com/markets/2026/10/10/bitcoin-s-usd19-billion-wake-up-call-one-year-later-has-crypto-learned-anything)

## 七、安全与工具

- **Ledger 确认未授权硬件植入，损失或超 $8,600 万**：事件与东南亚经销商 CryptoBilis 有关，用户报告钱包资金被清空；Ledger 警告不要使用经销商预置的助记词/种子初始化钱包，并展开调查。多家媒体对损失金额口径略有出入（$8,600 万 / $8,700 万）。[多源：Cointelegraph](https://cointelegraph.com/news/ledger-confirms-unauthorized-hardware-implant-losses-may-exceed-86m) / [CoinDesk](https://www.coindesk.com/business/2026/10/09/ledger-investigates-potential-wallet-tampering-after-reports-of-usd86-million-in-crypto-stolen) / [The Block](https://www.theblock.co/news/business/2026-10-09-ledger-cryptobilis-fund-losses-418163) / [Decrypt](https://decrypt.co/380582/ledger-probes-87m-theft-crypto-wallet-reseller)
- **Coldcard 调查其 X 账号出现钓鱼链接**。[来源：Cointelegraph](https://cointelegraph.com/news/coldcard-says-its-investigating-how-phishing-link-appeared-on-its-x-account)
- **Bitcoin Core #36277**：修复私有广播的交易来源隐私泄漏（见第二板块）。[来源：Bitcoin Optech #426](https://bitcoinops.org/en/newsletters/2026/10/09/)
- **DWF Labs 子公司起诉 BitGo 索赔 $1.41 亿**，指其违反代币锁仓约定、提前售出代币。[来源：CoinDesk](https://www.coindesk.com/policy/2026/10/09/dwf-labs-subsidiaries-sue-bitgo-for-usd141-million-over-alleged-token-lock-up-breach) / [Decrypt](https://decrypt.co/380593/dwf-bitgo-141-million-lawsuit-early-token-sales)
- **英国对三家加密交易所（含 Cryptomus、TokenSpot）就涉俄资金实施制裁**。[来源：Decrypt](https://decrypt.co/380568/uk-targets-cryptomus-and-tokenspot-in-new-russia-sanctions-package) / [CoinDesk](https://www.coindesk.com/policy/2026/10/09/uk-slaps-sanctions-on-three-crypto-exchanges-over-alleged-russia-links)

Ledger 这次不是软件漏洞，而是**供应链**问题：硬件钱包的信任根是设备本身，一旦经销商能在出厂后接触设备，用户「自持私钥」的安全性就被从物理层面绕过。这也是为什么官方反复强调「种子只自己生成、不要在渠道预置设备上初始化」——和 8 月 Coldcard PRNG 事件放在一起看，硬件钱包的攻击面正稳定地从固件转向物流与渠道。

## 八、链上数据速览

- **区块高度** 970,926。[来源：mempool.space](https://mempool.space/) / [ordinals.com](https://ordinals.com/status)
- **日交易量** 754,899（一周前 620,424，约 +22%）。[来源：blockchain.info](https://www.blockchain.com/explorer/charts/n-transactions)
- **mempool** 72,150 笔 / 39.1 MvB 待确认；推荐费率 1 sat/vB（fastest / halfhour / economy 均为 1）。[来源：mempool.space](https://mempool.space/)
- **算力** 1,022 EH/s（见第五板块）。[来源：blockchain.info](https://www.blockchain.com/explorer/charts/hash-rate)

## 结语

把八条线合起来看，这周的信息量不在价格，而在「谁在改、谁在守、谁在挪」。**改**的是协议层：BIP-324 想靠 `set324alias` 减少一次全局协调，BIP-375 把 Silent Payments 的边界逐步写成可复现的测试向量，方向都是「降低创新的协调成本」。**守**的是安全：Ledger 的渠道植入和 Coldcard 的账号钓鱼提醒所有人，硬件钱包的战线已经退到供应链与社交层；Core 则在同一周补掉一个私有广播的来源隐私洞。**挪**的是资源：算力一周 +15.6%，MARA 把 $8,110 万 BTC 交给 Galaxy 并向 AI 转型——矿业的资本开支正在从「买币囤币」转向「建 AI 基础设施」。

对工程师，这周该记的是 Core #36277 那个隐私泄漏：它不涉及共识、不影响余额，却能让攻击者推断出「这笔交易是你发起的」——元数据级的漏洞往往比资金级漏洞更难被察觉，也更值得写进威胁模型。对投资者，$83K 的横盘不是信号，ETF 两日净流出 $7.29 亿与 JPMorgan 的 $500 亿年内流入估算同时存在，说明资金面在分化；真正的锚点是难度转正与算力回升，那意味着边际供给方对未来区块价值仍然乐观。

—— 数据截至 2026-10-11 20:00 SGT；LEDGER 事件金额口径与 MARA 转出用途仍待官方进一步确认。

— Youmoo（㕛木）
*Solid as teak.*
