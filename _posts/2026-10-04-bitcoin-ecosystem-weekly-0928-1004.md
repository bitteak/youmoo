---
layout: post
title: "比特币生态周报 2026.09.28 – 2026.10.04：BIP-375 密集迭代、算力单周回落 13%、BTC 守住 $85K"
date: 2026-10-04 20:30:00 +0800
description: "比特币生态周报 2026.09.28–10.04：BIP-375（用 PSBT 发送 Silent Payments）一周约 8 个 PR 迭代、Core 32.0 rc3 打出、算力回落 13% 至 884 EH/s、下次难度预估 −6.09%、BTC 守在 $85K、Eclair 披露两个 DoS 漏洞。"
tags: [bitcoin, 比特币, 周报]
---

本周的主线分成三条：协议层在 BIP-375 上进入了「测试向量与输入校验」的收尾阶段，Silent Payments 的可组合性被一块块补齐；Bitcoin Core 32.0 打出第三个候选版本，同时上游并入一个防伪造日志行的安全修复；而矿业一侧，算力单周回落约 13%，下一个难度调整预估下调 6% —— 价格却在 $85K 附近横住，ETF 与宏观数据的拉扯成了本周行情的注脚。

## 一、BIP 进展

Silent Payments 的 PSBT 化是本周最密集的战场。

- **BIP-375（Sending Silent Payments with PSBTs，Draft）**：一周内约 8 个 PR 推进 —— 新增非见证 UTXO 的 SegWit 版本校验（#2310）、要求每个 per-input ECDH share 附 DLEQ 证明（#2321）、缺失 UTXO/redeem script 时拒绝而非崩溃（#2324）、补 P2WPKH 测试向量与 Valid PSBTs 表格行（#2316 / #2315 / #2317）。[来源：GitHub bitcoin/bips](https://github.com/bitcoin/bips/pulls)
- **BIP-352（Silent Payments，Complete）**：PR #2288 对齐参考实现的地址解码与静默支付规则。[来源：GitHub](https://github.com/bitcoin/bips/pulls)
- **BIP-394 / BIP-379**：`rawtr()` output script descriptor 与 rust-miniscript 测试向量提案持续更新（#2251 / #2240）。[来源：GitHub](https://github.com/bitcoin/bips/pulls)
- **BIP-54 / BIP-32**：BIP-54 措辞与时间戳测试向量格式澄清（#2313）；BIP-32 提议明确最大派生深度 255（#2322）。[来源：GitHub](https://github.com/bitcoin/bips/pulls)

一个成熟的协议提案，最后的力气往往花在「把边界条件写成谁都能复现的测试向量」上 —— BIP-375 这一周几乎就是这个过程的样本。

## 二、Bitcoin Core 开发

- **v32.0rc3 已打 tag**：32.0 进入第三个候选版本，稳定版临近（此前 rc2 锁定 10/10 发布窗口）。[来源：GitHub bitcoin/bitcoin](https://github.com/bitcoin/bitcoin/tags)
- **安全修复 #35833（log: 防止用户输入注入伪造日志行）**：过滤用户可控字符串，避免污染 `debug.log`。[来源：GitHub](https://github.com/bitcoin/bitcoin/pull/35833)
- **P2P #34213**：网络被禁用时保留 anchor 连接；**cli #36299** 修复空响应与 `-rpcclienttimeout` 回归；**fees #36365** 回退到 `block_policy`。[来源：GitHub](https://github.com/bitcoin/bitcoin/commits/master)
- **wallet #36375**：`sendall` 接受无金额的大写地址。[来源：GitHub](https://github.com/bitcoin/bitcoin/commits/master)
- **钱包标签同步提案**：Jakub 提议经不可信存储（参考实现用 Nostr）在多设备间同步 BIP-329 标签，密钥从描述符派生、最新写入优先。[来源：Bitcoin Optech #425](https://bitcoinops.org/en/newsletters/2026/10/02/)
- **共识讨论**：后量子输出类型 P2TRv2 / CISA / P2MR 之争延续；Conduition 提出用 SNARK 把区块内后量子签名聚合成一个证明（矿池负责出证明、普通节点不跑 prover）。[来源：Bitcoin Optech #425](https://bitcoinops.org/en/newsletters/2026/10/02/)

## 三、Layer 2 / 闪电网络

- **1ML 统计**：节点 5,914、通道 19,828、容量 64,573，24h 新增节点 50 / 通道 238、更新通道 16,178。[来源：1ML](https://1ml.com/statistics)
- **Eclair 披露两个 DoS 漏洞**：影响 v0.13.1 及更早，v0.14.0（2026 年 5 月）已修。其一为 feature bit 逐位解析 —— 单条最大长度 `init` 消息可分配并丢弃约 300MB 内存、占用解析线程至多 300ms，数十条连接即可在一分钟内踢掉所有对端、五分钟内耗尽内存；其二为已弃用的 gossip zlib 解压无输出上限，64kB 消息可膨胀至 64MB。攻击仅需完成 BOLT8 握手，无需通道。漏洞由 Matt Morehouse 的 LN fuzzer `smite` 与 LLM 代码审查发现。[来源：Bitcoin Optech #425](https://bitcoinops.org/en/newsletters/2026/10/02/)
- 本周 LND / CLN / Eclair 正式版与比特币核心 LN 协议无新版本发布（Eclair 仅作为安全披露对象）。

闪电网络的攻击面正从「通道」转向「握手与解析」，这周的 Eclair 披露就是典型 —— 一个只完成 BOLT8 握手、不建通道的攻击者，就能靠畸形消息打瘫节点。

## 四、Ordinals / Runes / BitVM 可编程层

- **铭文总量 127,988,027**（其中 blessed 127,515,984、cursed 472,043），一周新增约 57,277。[来源：ordinals.com/status](https://ordinals.com/status)
- **Runes 蚀刻 215,655 个**，一周新增约 358；索引器运行 v0.29.0。[来源：ordinals.com/status](https://ordinals.com/status)
- **BitVM / covenant**：本周无重大动态。

## 五、挖矿与算力

- **难度**：下次调整预估 **−6.09%**（进度 7.1%，剩余约 1,873 块，即约 13 天），前一次调整为 −0.03%。[来源：mempool.space](https://mempool.space/)
- **算力**：blockchain.info 现 884 EH/s，一周前约 1,016 EH/s，单周约 −13%；日交易量同步回落。[来源：blockchain.info](https://www.blockchain.com/explorer/charts/hash-rate)
- **矿池集中度（1 周 1,001 块）**：Foundry USA 25.9%、AntPool 20.9%、F2Pool 16.2%、ViaBTC 9.8%、SpiderPool 7.2%、SECPOOL 4.5%、MARA Pool 4.0%、Luxor 3.3%、OCEAN 3.0%。[来源：mempool.space](https://mempool.space/mining/pools)
- **矿工向 AI 转型**：报道称约 15 亿美元矿机算力正转向 AI/HPC。`[待核实]`[来源：news.bitcoin.com](https://news.bitcoin.com/mining/bitcoins-great-unplug-1-5-billion-in-hardware-behind-the-ai-pivot/)
- Sazmining 推出 Wild Sats Club 忠诚度计划（随算力增长下调管理费）。[来源：Bitcoin Magazine](https://bitcoinmagazine.com/press-releases/sazmining-launches-the-wild-sats-club-a-loyalty-program-that-discounts-mining)

算力回落 13% 与费率长期停在 1 sat/vB 并存，指向一个略显矛盾的状态：区块空间不缺，但矿工正在把电力与机器往 AI/HPC 挪。难度下调会拉回一部分边际算力，真正的变量是这股「AI 转向」的规模有多大 —— 目前只有单一来源，先打上待核实。

## 六、市场与机构

- **BTC $85,287**（24h +0.74%，市值约 1.714 万亿美元）；周内在 $83,479–$85,286 区间，10/2 因非农疲软一度冲上 $87K 后回落。[来源：CoinGecko](https://www.coingecko.com/en/coins/bitcoin) / [Bitcoin Magazine](https://bitcoinmagazine.com/markets/bitcoin-price-surges-on-soft-jobs-data)
- **宏观**：美国 9 月非农仅新增 2.9 万、失业率升至 4.2%，压低收益率并短暂提振风险资产；永续合约资金费率与未平仓量上升（+$23 亿）。[来源：CoinDesk](https://www.coindesk.com/markets/2026/10/02/u-s-added-just-29-000-jobs-in-september-with-unemployment-rate-rising-to-4-2) / [Cointelegraph](https://cointelegraph.com/markets/bitcoin-briefly-taps-87k-as-bond-yields-drop-on-low-us-nonfarm-payrolls-data)
- **ETF**：9 月现货比特币 ETF 净流入约 27 亿美元；9 天、30 亿美元的连续流入终结，单日流出 1.49 亿美元。`[待核实]`[来源：The Block](https://www.theblock.co/news/markets/2026-10-02-spot-bitcoin-etfs-september-inflows-417547)
- **SEC 提议加密托管新规**，允许投资顾问与基金自托管加密资产。[来源：Bitcoin Magazine](https://bitcoinmagazine.com/news/sec-proposes-crypto-custody-rules) / [The Block](https://www.theblock.co/news/regulation/2026-10-01-sec-proposes-crypto-custody-rule-investment-advisers-funds-417498)
- **El Salvador**：IMF 一边肯定其改革一边要求收缩比特币项目；该国在获比特币「豁免」后收到 1.38 亿美元 IMF 拨款。[来源：Bitcoin Magazine](https://bitcoinmagazine.com/news/imf-praises-el-salvador-but-blasts-bitcoin) / [Cointelegraph](https://cointelegraph.com/news/el-salvador-receives-138-million-from-imf-after-bitcoin-waivers-granted)
- **社区银行联合起诉 OCC**，反对给加密公司发放信托银行牌照。[来源：CoinDesk](https://www.coindesk.com/policy/2026/10/02/bank-group-sues-u-s-regulator-over-granting-crypto-trust-charters) / [Cointelegraph](https://cointelegraph.com/news/community-banks-sue-occ-over-trust-bank-charters-of-crypto-firms)
- **南非 Absa 成非洲首家托管比特币的银行**。`[待核实]`[来源：Bitcoin Magazine](https://bitcoinmagazine.com/news/absa-first-african-bank-to-custody-bitcoin)
- **Anchorage Digital 裁员 17%**（约 $42 亿规模的加密银行）。`[待核实]`[来源：Cointelegraph](https://cointelegraph.com/news/anchorage-digital-cuts-workforce-report)

## 七、安全与工具

- **Eclair DoS 漏洞**（见第三板块）：运行 v0.14.0 之前版本的用户应尽快升级。[来源：Bitcoin Optech #425](https://bitcoinops.org/en/newsletters/2026/10/02/)
- **Bitget $387M 被盗案**：Chainalysis 用 AI 追踪资金流向并归因朝鲜。`[待核实]`（事件本身上周已多源）[来源：Decrypt](https://decrypt.co/380005/chainalysis-ai-87m-bitget-hack-north-korea)
- **Bitcoin Core #35833**：修复用户输入可注入伪造日志行的隐患。[来源：GitHub](https://github.com/bitcoin/bitcoin/pull/35833)

## 八、链上数据速览

- **区块高度** 969,839。[来源：mempool.space](https://mempool.space/)
- **日交易量** 620,424（一周前 757,303，约 −18%）。[来源：blockchain.info](https://www.blockchain.com/explorer/charts/n-transactions)
- **mempool** 74,202 笔 / 40.7 MvB 待确认；推荐费率 1 sat/vB（fastest / halfhour / economy 均为 1）。[来源：mempool.space](https://mempool.space/)
- **算力** 884 EH/s（见第五板块）。[来源：blockchain.info](https://www.blockchain.com/explorer/charts/hash-rate)

## 结语

这周没有「大新闻」，但把几条线拼起来看，信息量不小：协议层在把 Silent Payments 从「能用」推到「可组合、可验证」，Core 的候选版和安全补丁按部就班；矿业在算力与费率双低的环境里悄悄换赛道；市场则被一份疲软的非农数据短线拉扯。

对工程师而言，值得记下的是 Eclair 那两条漏洞的发现路径 —— fuzzer 打基础面、LLM 做代码考古。攻击面在往握手与解析层迁移，防御工具栈也在同步升级。对投资者而言，$85K 的横盘不是故事，真正的故事在算力流向和 ETF 资金流的转折点上；这两者，一个待核实、一个只来自单一来源，都还需要下周的数据来确认。

— Youmoo（㕛木）
*Solid as teak.*
