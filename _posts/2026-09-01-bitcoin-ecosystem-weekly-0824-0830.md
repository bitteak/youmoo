---
layout: post
title: "比特币生态周报 2026.08.24–08.30：AI 漏洞报告冲击闪电网络，Warsh 鹰派打断 ETF 反弹"
date: 2026-09-01 21:00:00 +0800
description: "2026年8月最后一周比特币生态动态：Core Lightning 遭 AI 生成漏洞报告冲击紧急补丁，Fed 主席 Warsh 偏鹰讲话打断 ETF 九连流入，OCEAN 与 Luke Dashjr 分手，BlackRock 下调 ETF swap 门槛 96%。"
tags: [bitcoin, 比特币, 周报, lightning, etf, 挖矿]
---

# 比特币生态周报（2026-08-24 ~ 2026-08-30）

**本周主线**：AI 生成的漏洞报告首次大规模冲击闪电网络（Core Lightning 紧急补丁 26.06.7）；Fed 主席 Kevin Warsh 首次 Jackson Hole 演讲意外偏鹰，打断 ETF 驱动的反弹；OCEAN 与 Luke Dashjr 正式分道扬镳，BIP-110 失败分叉余波未平。

---

## 一、BIP 进展

- **BIP 110（Reduced Data Temporary Softfork，Dathon Ohm）状态更新为 Closed**：激活尝试正式宣告失败，其少数派链仅挖出 2 个区块后停滞；支持者酝酿 PoW 算法硬分叉改造（列出 6 个候选），引发"矿机将贬值"的争议。PR #2245 于 8/10 合并，仓库本周整体低活跃。（[PR #2245](https://github.com/bitcoin/bips/pull/2245) / [Bitcoin.com News](https://news.bitcoin.com/crypto-news/luke-dashjr-comms-chief-step-away-from-dorsey-backed-mining-pool-ocean/)）
- **BIP 89（Chain Code Delegation）推进至 Deployed**：8/13 由 PR #2252 合并，是近期少有的状态晋升；BIP 327（MuSig2）此前亦为 Deployed。（[PR #2252](https://github.com/bitcoin/bips/pull/2252)）
- **新草案提交**：BIP Draft "Anti-Fee-Sniping with LockTime"（[PR #2266](https://github.com/bitcoin/bips/pull/2266)，8/21）；"Time-Shifted Proof of Work（TSPOW）"（[PR #2269](https://github.com/bitcoin/bips/pull/2269)，8/27 提交后即关闭）。
- **编辑与流程治理**：bips 仓库新增 SECURITY.md（[#2243](https://github.com/bitcoin/bips/pull/2243)，8/17）；"Add AI policy" 草案（[#2265](https://github.com/bitcoin/bips/pull/2265)，8/21）回应 AI 生成报告增多；Luke Dashjr 被移出 BIP 编辑名单（[#2248](https://github.com/bitcoin/bips/pull/2248)），而 BIP 3 尚无书面移除规则，引发流程争议。
- **在途草案持续活跃**：BIP 460 CISA、BIP 459 DahLIAS、BIP 458 Half-Aggregation、BIP 455–457 SwiftSync、BIP 445 FROST、BIP 332 Stale Tip Relay、BIP 153 SENDTEMPLATE 等仍在评审；BIP-379（Miniscript）补充测试向量；BIP-327 修正 PartialSigAgg。（[bips PRs](https://github.com/bitcoin/bips/pulls)）

## 二、Bitcoin Core 开发

- **本周无新版本发布**：最新稳定版仍为 7 月的 v31.1 / v30.3 / v29.4，31.x 分支以 backport 维护为主。（[Releases](https://github.com/bitcoin/bitcoin/releases)）
- **[#36111](https://github.com/bitcoin/bitcoin/pull/36111)（8/29 合并）RPC 层 DoS 加固**：`validateaddress` 对超长 Bech32 输入的错误定位会生成约 3,300 万个 UniValue 对象，现限制内存占用（固定输出位置 90）。
- **[#36077](https://github.com/bitcoin/bitcoin/pull/36077)（8/26 合并）TxDownloadManager 数据竞争修复**：修复 #35986 引入的回归——orphan 交易重考虑在 validation 后台线程并发使用 PeerManager 的非线程安全 RNG，现为 TxDownloadManager 配备独立 RNG 并补回归测试。
- **[#36044](https://github.com/bitcoin/bitcoin/pull/36044)（8/27 合并）共识测试补强**：覆盖 BIP-342 规定的 OP_SUCCESSx 可绕过初始栈大小检查的行为。
- **其他**：#36092 修复 mempool estimator 日志 UB；#35868 修复 14 个 RPC 文档 curl 示例；CI 升级 riscv 工具链（#36094）。本周无共识变更，以加固、测试与维护为主。

## 三、Layer 2 / 闪电网络

- **网络持续收缩**：mempool.space 口径 8/30 为 **16,230 节点 / 32,511 通道 / 3,753.7 BTC 容量**，周环比 -1.1% / -2.1% / -1.8%；1ML 口径 30 日节点 -4.89%、通道 -6.47%、容量 -6%，报道称公开通道容量较去年底已缩水约 1/3。（[mempool.space](https://mempool.space/api/v1/lightning/statistics/latest) / [1ML](https://1ml.com/statistics)）
- **CLN 26.06.7 安全补丁版发布（8/28）**：即本周最大安全事件对应的修复版本，属 "Quantum-Resistant Lightning Channel" 系列第 7 个补丁。（[Releases](https://github.com/ElementsProject/lightning/releases)）
- **LND v0.21.2-beta 与 v0.20.3-beta 于 8/13 发布**：本月内两大 Lightning 实现均完成版本更新。
- **SwiftSync（BIP 455–457）仍在评审**：以 UTXO 集同步替代整链下载，目标是显著降低新节点与 LN 参与门槛。

## 四、挖矿与算力

- **OCEAN 与 Luke Dashjr 发布联合声明（8/29–30），正式分手**：Dashjr 8/11 已宣布从 OCEAN 主席/CTO 职位休假，专注 BIP-110 分叉与开源开发；BIP-110 少数链停滞 2 块后支持者计划 PoW 硬分叉改造，与 OCEAN 路线分歧成为导火索之一。（[Wyoming News](https://www.wyomingnews.com/online_features/press_releases/joint-statement-of-ocean-and-luke-dashjr/article_aecf4198-0c0c-5233-9f1a-48b02e1efb6d.html)）
- **HIVE 财报（8/28）**：Q2 挖出 **1,004 BTC**，算力较去年同期近翻三倍。（[MSN](https://www.msn.com/en-us/news/other/hive-mined-1004-bitcoin-in-q2-as-its-hashrate-nearly-triples/ar-AA2b8iS2)）
- **IREN 财报（8/27–28）**：比特币矿场减值拖累季度亏损 **$684M**（年度 $703M），AI 云收入首次超过挖矿收入，目标 ARR $4B+，股价当日跌约 8%。（[Blockspace](https://blockspace.media/insight/iren-684-million-loss-ai-cloud-conversion/)）
- **算力格局**：美国挖矿份额自 Q1 至 Q3 下滑、他国追赶；俄克拉荷马 El Reno 数据中心水管泄漏超 300 万加仑，市政开出违规单。（[Bitcoin.com News](https://news.bitcoin.com/mining/us-bitcoin-mining-grip-slips-from-q1-to-q3-as-rival-nations-gain/)）
- **网络数据**：当前难度 **125.81T**，上次调整 -1.31%，下次预计 +0.24%（约 9/6）；全网算力约 **898 EH/s**，一周均值区间 830–964 EH/s。（[mempool.space](https://mempool.space/api/v1/difficulty-adjustment)）

## 五、市场与机构

- **价格**：ETF 驱动反弹延续一周，8/27 触及 **$80,793**（3 个月新高），周涨约 10%；8/28 Warsh 鹰派讲话后回落，现约 **$78.1K**。（[Bitcoin Magazine](https://bitcoinmagazine.com/news/bitcoin-rises-ahead-of-fed-meeting)）
- **ETF 资金流**：连续 **9 个交易日净流入（累计 >$3B）** 后，8/28 转净流出 **$201.8M**（ARKB -$114.9M、BITB -$49.7M、IBIT -$33.4M；Morgan Stanley Bitcoin Trust +$9.3M 为唯一净流入）；总 AUM 破 $100B 后回落至 **$97.6B**，8 月累计仍 +$3.3B；ETH/XRP/SOL ETF 则延续流入。（[FinanceFeeds](https://financefeeds.com/bitcoin-etfs-snap-nine-day-inflow-streak-with-202-million-in-outflows/) / [CryptoSlate](https://cryptoslate.com/bitcoin-etf-inflows-snap-after-3-billion-streak-as-eth-xrp-and-solana-keep-buying/)）
- **机构持仓**：MSTR 涨至 **$137**（2 个月新高），单日成交 $4.4B 跻身美股成交前 15；分析师下调目标价 22% 但仍称有 176% 上行空间；**Schiff 与 Saylor 就"死亡螺旋"论战**。**BlackRock 将 ETF swap 最低门槛从 $25M 降至 $1M（-96%）**，降低机构进场门槛。（[BeInCrypto](https://beincrypto.com/schiff-mstr-death-spiral-saylor-bulls/) / [Yahoo Finance](https://finance.yahoo.com/markets/crypto/articles/bitcoin-buy-now-blackrock-slashes-150215484.html)）
- **宏观**：Fed 主席 Kevin Warsh 首次 Jackson Hole 演讲（主题含数字支付与加密）偏鹰，比特币与黄金齐跌，$100B ETF AUM 里程碑被推迟；**Coinbase CEO Brian Armstrong 预测 2030 年 BTC 可达 $300K–400K**。（[CoinDesk](https://www.coindesk.com/markets/2026/08/28/here-s-why-warsh-s-jackson-hole-speech-is-a-major-event-for-bitcoin-and-gold) / [FinanceFeeds](https://financefeeds.com/coinbase-ceo-brian-armstrong-predicts-bitcoin-could-reach-300000-400000-by-2030/)）
- **链上**：2011–2014 年休眠钱包一周内移动约 **$40M**，多数绕过交易所直接转账；realized cap 单周 +$4.6B。（[FinanceFeeds](https://financefeeds.com/dormant-bitcoin-wallets-move-40-million-after-more-than-a-decade/) / [Yahoo Finance](https://finance.yahoo.com/markets/crypto/articles/bitcoin-buyers-step-back-realized-115008327.html)）

## 六、安全与工具

- **Core Lightning 多漏洞（本周最大安全事件）**：项目在 10 天内收到大量 **AI 生成的 CVE 报告**，确认其中多个为真实漏洞；8/26 通知节点运营者"升级或 --offline"（当时补丁未发布、细节处于两周 embargo）；8/27 公开确认多漏洞，未披露严重性与 CVE 编号，无已知利用或损失；8/28 发布 **v26.06.7** 修复版。该漏洞与 5 月/7 月披露的远程 DoS 漏洞相互独立。（[The Defiant](https://thedefiant.io/news/security/core-lightning-tells-node-operators-to-go-offline-with-no-patch-published) / [Cointelegraph](https://cointelegraph.com/news/core-lightning-vulnerabilities-node-security-update)）
- **AI 驱动漏洞发现成为新常态**：除 CLN 事件外，Sparrow 钱包在 AI 标记问题后发布更新（8/27）；bips 仓库同步提出 AI 政策草案，Bitcoin Core 侧则以 fuzz 与 RPC 加固应对。（[Decrypt](https://decrypt.co/376755/bitcoin-sparrow-wallet-update-ai-fixes)）
- **工具发布**：CLN v26.06.7（8/28）、LND v0.21.2-beta（8/13）；Bitcoin Core 新增 connect_block fuzz harness（[#35850](https://github.com/bitcoin/bitcoin/pull/35850)）与 Bech32 RPC 内存加固（[#36111](https://github.com/bitcoin/bitcoin/pull/36111)）。
- **背景**：本月早些时候的 Coldcard 相关 $116M 利用事件与 BTCPay Server 补丁显示，硬件钱包与支付服务器供应链仍是重点攻击面。

---

**来源列表**（本周）：GitHub bitcoin/bips、bitcoin/bitcoin、ElementsProject/lightning、lightningnetwork/lnd；mempool.space、1ML；Bitcoin Magazine、CoinDesk、FinanceFeeds、CryptoSlate、The Defiant、Cointelegraph、Decrypt、BeInCrypto、Yahoo Finance、Blockspace、Bitcoin.com News。

— Youmoo（㕛木）
*Solid as teak.*
