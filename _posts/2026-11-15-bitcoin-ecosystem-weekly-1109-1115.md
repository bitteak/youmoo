---
layout: post
title: "比特币生态周报 2026.11.09–11.15：难度两周连降 10%，Core 三个老漏洞解禁"
date: 2026-11-15 20:30:00 +0800
description: "比特币周报：11/13 难度下调 9.13% 且下轮预估再降 1.52%，算力 923.6 EH/s、hashprice 约 $31.9/PH/日、费率全贴 1 sat/vB；BTC 周跌 13.7% 至 $65,412 并跌破 200 周均线，ETF 两周流出 $23.5 亿；Core 披露 1 高危 2 中危历史漏洞。"
tags: [bitcoin, 比特币, 周报, bip, 挖矿, 闪电网络, 安全]
---

这一周把上一条负反馈链完整跑完了：价格跌 → 算力退出 → 出块变慢 → 难度回吐 → 边际矿工进一步出清。11/13（block 975,744）难度**下调 9.13%**，下一轮预估再降 1.52%；全网算力从一周前的 988 EH/s 掉到 **923.6 EH/s**，窗口内只出 **902 个块**（预期 1,008），平均出块间隔 **11.2 分钟**。价格侧同步破位：BTC 周五跌破 200 周均线，周末触及四个月低点 $62K 附近，全周 **−13.7%** 收在 $65,412。

协议层这周最有分量的不是新提案，是**旧漏洞的解禁**：Bitcoin Core 一次性公开三个历史漏洞（1 高危 / 2 中危），其中一个能让矿工节点在 reorg 后**停止出块**。同一周，anti-exfil 签名的两份草案 BIP 上了邮件列表——把「硬件签名设备可能一直在偷偷泄漏你的种子」从恐怖故事变成一份可实现的规范。

对做后端的人来说，这两件事的价值远高于价格：它们说明这套系统的**披露纪律**和**威胁模型迭代**都在正常工作。

## 一、BIP 进展：Testnet5 进入「可挖」状态，anti-exfil 上桌

- **BIP-95 Testnet 5：创世块进入可挖状态，但出生与否未确认**。Anthony Towns 在 Bitcoin-Dev 给出方案：主网到达下一次难度调整（block **975,744**，实际 11/13）后开始挖 testnet5 创世块，创世块承诺一个**该高度或之后**的主网区块哈希，因此没人能提前预挖。由于 testnet5 的最低难度比 testnet4 高约**一百万倍**（防止上线后被瞬间刷出大量区块），头几个块必须用 ASIC，Towns 同时公布了一个公开矿池供任何人投算力，避免开发者抢跑。配套改动是 [BIPs #2347](https://github.com/bitcoin/bips/pull/2347)：承诺值从 coinbase 输出的公钥字段移到 **coinbase input script 的明文**，输出改用 OP_RETURN（明确不可花费，还多 8 字节 extra nonce），并允许矿工变动 block version 扩大搜索空间。截至本期，[BIP-95 正文](https://github.com/bitcoin/bips/blob/master/bip-0095.md)仍是 **Draft v0.3.0**、示例创世块仍是占位值，补创世参数的 PR [#2356](https://github.com/bitcoin/bips/pull/2356) 11/14 仍 open。**创世块是否已经出块，公开渠道无法确认** `[待核实]`。[Optech #431](https://bitcoinops.org/en/newsletters/2026/11/13/)
- **anti-exfil 签名：两份草案 BIP 上邮件列表**。Connor Avila 提出标准化「抗外泄签名」——nonce 由签名设备自己选，所以一台被攻破的设备可以把种子一位一位泄出去，而主机完全看不出来。方案引入**主机参与 nonce 随机性**（多家厂商已有实现，但从未标准化），并要求设备证明自己确实用了主机给的随机性；两轮协议覆盖 schnorr 与 ECDSA。第二份草案给 PSBT 加**三个 per-input 字段**来承载这套流程。附带测试向量、Python 参考实现和 libsecp256k1 的 C 模块；Sjors Provoost 已有的单签 taproot keypath 实验草案将向该规范对齐。历史脉络值得记：2020 年 Snigirev 首发、Wuille 做过技术综述、2024 年 Moonsettler 提协议，刚合入的 **BIP-461** 则负责*识别*设备泄漏密钥的尝试——本周这套拼图第一次闭合到「可实施」。作者明说密码学部分**尚未审计**。[Optech #431](https://bitcoinops.org/en/newsletters/2026/11/13/)
- **状态机清理**：**BIP-353 升 Active**（DNS 支付指令，[#1979](https://github.com/bitcoin/bips/pull/1979)），同时 [#1980](https://github.com/bitcoin/bips/pull/1980) 把 BIP-327 / 353 的状态表述统一。[BIPs commits](https://github.com/bitcoin/bips/commits/master)
- **被关掉的与仍在排队的**：新草案「Adaptive Block Weight Limit」（[#2352](https://github.com/bitcoin/bips/pull/2352)）已 closed 未合入；「Signing message encoding」（[#2353](https://github.com/bitcoin/bips/pull/2353)）open；BIP-395 Unspendable Internal Keys（[#2340](https://github.com/bitcoin/bips/pull/2340)）、BIP-32 最大深度 255（[#2322](https://github.com/bitcoin/bips/pull/2322)）、BIP-352 测试向量（[#2323](https://github.com/bitcoin/bips/pull/2323)）仍在评审。BIP-375 升到 v0.1.4（[#2315](https://github.com/bitcoin/bips/pull/2315)），BIP-392 修正 xprv/xpub 示例改用 BIP-352 派生路径（[#2349](https://github.com/bitcoin/bips/pull/2349)）。[BIPs PRs](https://github.com/bitcoin/bips/pulls)

## 二、Bitcoin Core：一个命令注入修复，一句版本 EOL

- **Tor 控制端点命令注入（#36142）**：攻击者控制或冒充 Tor control endpoint 后，可以返回一个**恶意 onion service 私钥**；Core 会把它存下来并复用，从而让攻击者注入额外的 Tor 控制命令与参数。现在 Core 在保存与复用前校验 key、并核对返回的 onion service ID；若缓存的 key 校验失败，onion 服务将不可用（删缓存重启即可重新生成地址）。这是本周唯一「远程可控 → 命令注入」级别的合并修复。[Optech #431](https://bitcoinops.org/en/newsletters/2026/11/13/) / [PR #36142](https://github.com/bitcoin/bitcoin/pull/36142)
- **三个历史漏洞按政策解禁**（细节见第六节）：高危的 TRUC sibling eviction 会让**矿工节点**在特定 reorg 后无法构造 block template 直到重启，影响 28.0–29.1。触发披露的条件是 29.x 于 **10/27 EOL**——政策规定：最后一个受影响版本 EOL 后两周公开。[Optech #431](https://bitcoinops.org/en/newsletters/2026/11/13/)
- **本周合并的实质改动**：`#36757` net 忽略 privacy network 对端对我们地址的视图（收窄隐私网络路径的地址泄漏面）；`#36488` wallet 把混合大小写 `confTarget` 选项排入弃用流程；`#36785` 给 `listunspent` 选项加 **snake_case 别名**；`#36817` 移除 pre-v14 libmultiprocess 兼容定义；`#36805` 所有头文件内容纳入 include guard；`#36224` 补 `PartiallySignedTransaction::Merge()` 测试覆盖；`#36105` 修 Windows 下 `bitcoin` wrapper 不等子进程的问题。[Core commits](https://github.com/bitcoin/bitcoin/commits/master)
- **维护版本仍是 10/28 的四条线**：32.1 / 31.2 / 30.4 / 29.5，本周无新 RC。仍在跑 29.x 的节点应升级。[Releases](https://github.com/bitcoin/bitcoin/releases)

## 三、Layer 2 / 闪电网络：容量微增，节点在掉

- **1ML 读数**：节点 **5,105**（30 天 **−13.74%**）、通道 **18,633**（−4.9%）、公开容量 **2,324.71 BTC**（约 $1.52 亿，30 天 −8.22%）。周环比容量 **+1.28%**、通道 −1.63%、节点 **−7.47%**——下跌期「小节点退出、存量通道留存」的典型形态。注：采集脚本输出的「64,891」是 1ML 的 **Nodes Observed** 口径，不是容量（上期已纠正过一次，本期复现）。[1ML](https://1ml.com/statistics)
- **LDK 出 v0.3-rc4 + 两个安全分支**：v0.3-rc4 是下一大版本的第四个候选，**此前签发、含 payment metadata 的 BOLT11 发票作废**（升级前必须看 API 与向后兼容变更）；v0.2.8 / v0.1.14 是 0.2 / 0.1 分支的安全版本，修可导致**资金损失或 DoS** 的漏洞、静态 BOLT12 发票的**多付费**问题、LSPS2 服务 DoS，以及下面这条 cooperative close 缺陷。[Optech #431](https://bitcoinops.org/en/newsletters/2026/11/13/)
- **LDK cooperative close 签名复用（#5507 / #5532）**：旧实现只要手续费相同就复用**另一笔关闭交易**的缓存签名；另一处是 async signer 不可用后对端断线、未清理待签状态，重连后把旧对端签名和新本地提案拼在一起。两种情形都可能广播无效关闭交易却把通道标记为已关闭，留下需要人工恢复的资金。[Optech #431](https://bitcoinops.org/en/newsletters/2026/11/13/)
- **LND 维护版 v0.21.8-beta / v0.20.8-beta，BOLT12 继续推进**：维护版修 AMP 强制关闭后的链上恢复（此前查 invoice 级 preimage 而非该 HTLC 的 preimage，钱直接拿不回来）、多通道注资广播失败时错误放弃 pending 通道并释放输入、静态备份通道强关崩溃、confirmation-hint 缓存被伪造 txid 污染（可能延误 revoked commitment 的惩罚交易）。BOLT12 侧 `#11340` / `#11374` 加入 offer 创建与 invoice request 处理（`CreateOffer` RPC / `lncli createoffer`），但**尚不保存可结算的 invoice 状态**，仅限 dev build。[Optech #431](https://bitcoinops.org/en/newsletters/2026/11/13/)
- **CLN 修对等方触发的崩溃（#9610）**：对端可以提一个金额 ≥ 约 **9,200 万 BTC** 的 HTLC（把金额字段最高位置 1），在有符号余额检查里被解释成负数，从而绕过余额校验；随后 commitment 构造触发 assertion，直接杀掉 channeld。现在在余额运算之前先按 BOLT1 上限 **2,100 万 BTC** 拒绝。[Optech #431](https://bitcoinops.org/en/newsletters/2026/11/13/)
- **Stacks / Babylon / RGB / Taproot Assets：本周无重大动态。**

## 四、Ordinals / Runes / BitVM：Runes 的「10 sat 刷量」被写成事故复盘

- **`ordinals.com/status` 全周 403**（Cloudflare 人机验证，浏览器与 urllib 双路径均失败），本期**未能取到累计铭文总量**；最近可核实快照仍是 2026-10-20 的 **1.277 亿**铭文 / 34.1 GB。Ordinals 侧本周无协议级动态 `[待核实：累计总量]`。
- **Runes mint 链导致 compact block 重建率跌到 1%–5%**：0xB10C 在 Delving 解释了 7 月中到 10 月中 compact block relay 为何表现极差——他的节点只能在不请求交易的情况下重建 **1%–5%** 的区块，每块还要额外请求约 **100 kB**。Greg Sanders 发现缺失的交易几乎都属于 **rune mint 链**，且这些链比其他节点早几分钟到达矿池。追查结果是「有人用最便宜的方式刷代币」：每笔交易约 **100 vB**、带 pay-to-anchor（P2A）输入与 P2A / OP_RETURN 输出、只付约 **10 sat**。发起方把这些链**直接推给节点**（不宣告），同时另有一些对等方发出「花掉链中部某个 P2A 输出、把整条链的值当手续费」的替代交易——每个替代交易在接受的 mempool 里替掉其后的整条链，而节点保留链还是接受替代，部分取决于谁先到。于是 mempool 与矿池视图分叉，节点只能去请求缺失交易。这是 Runes 上线以来对中继层最实质的一次负外部性记录，也说明 **P2A 锚点输出可以被当成廉价的链式费用承载体**。[Optech #431](https://bitcoinops.org/en/newsletters/2026/11/13/)
- **BIP-394 `rawtr()` 描述符**（[BIPs #2251](https://github.com/bitcoin/bips/pull/2251)）：与 `tr()` 不同，`rawtr()` 直接接受 taproot **输出键**、不做 tweak，钱包因此可以在不知道内部结构的情况下描述输出；代价是它无法证明**不存在**其他花费路径，从未受信来源导入时必须警告可能有隐藏 scriptpath（Core 自 24.0 起已支持）。[Optech #431](https://bitcoinops.org/en/newsletters/2026/11/13/)
- **BitVM / covenant：本周无重大动态**（BIP-448 仍无激活客户端，CTV / OP_CAT 状态未变）。

## 五、挖矿与算力：hashprice 掉到 $32/PH/日

- **难度两周连续下调：11/13 实际 −9.13%，下轮预估 −1.52%**。block 975,744 调整后难度回落 9.13%；当前周期进度 10.6%、剩余约 1,802 块，下次预估再降 1.52%。这是价格、算力、费率三条线同时转弱后的必然回吐，不是独立事件。[mempool.space](https://mempool.space/api/v1/difficulty-adjustment)
- **算力周内 −6.5%，出块明显变慢**：blockchain.info 口径 **923.6 EH/s**（24h 833.4 EH/s，一周前 988.3 EH/s）。窗口内只出 **902 块**（预期 1,008）、平均间隔 **11.2 分钟**——这正是难度下调 9.13% 的直接来源。[blockchain.info](https://api.blockchain.info/charts/hash-rate)
- **hashprice 约 $31.9/PH/日**：按 450 BTC/日补贴产出 + $65,412 估算，全网单位算力日收入已落到 $32 以下；手续费侧几乎不贡献（mempool 全部待确认费用仅 0.035 BTC ≈ $2,289）。对 S19 一代机队是深度亏损区，对最新一代（<15 J/TH）也只是薄利。[CoinGecko](https://www.coingecko.com/en/coins/bitcoin) / [mempool.space](https://mempool.space/api/mempool)
- **矿池集中度（近 901 块）**：Foundry USA **24.3%**、AntPool 19.8%、F2Pool 17.0%（前三 **61.1%**）；随后 ViaBTC 8.9%、SpiderPool 7.5%、MARA Pool 6.2%、Luxor 5.2%、SECPOOL 3.7%、OCEAN 3.4%、Braiins 1.8%。[mempool.space](https://mempool.space/api/v1/mining/pools/1w)
- **矿业转 AI 的两条实证**：Miner Weekly 记录「这批矿工砍掉 50% 算力、AI 收入翻倍」`[待核实：单一来源]`；CoinDesk 的巴拉圭报道给出另一面——矿工每年向巴拉圭支付约 **$3.5 亿**电费，但 AI 数据中心正在把他们挤出去。[news.bitcoin.com](https://news.bitcoin.com/mining/miner-weekly-these-miners-cut-hashrate-50-as-ai-revenue-doubles/) / [CoinDesk](https://www.coindesk.com/tech/2026/11/13/bitcoin-miners-pay-paraguay-usd350-million-a-year-but-ai-is-pushing-them-out)
- **硬件一条小新闻**：FutureBit 的 Apollo III 家用矿机进入 **Micro Center** 实体货架，是该品类第一次线下零售铺货。[Bitcoin Magazine](https://bitcoinmagazine.com/news/futurebit-apollo-iii-hits-micro-center-shelves)

## 六、市场与机构：跌破 200 周均线，ETF 年内转负

- **BTC $65,412（周 −13.7%），跌破 200 周均线**：11/8 $75,776 → 11/13 破 $68K（12 周低点、清算 **$16 亿**）→ 11/14 破 $63K（四个月低点）→ 11/15 低点 $62K 附近后回抽到 $65.4K。这是**第六周连跌**；驱动是美元指数 19 个月高位 + 降息预期回撤，而非任何比特币自身事件。[CoinGecko](https://www.coingecko.com/en/coins/bitcoin) / [Bitcoin Magazine](https://bitcoinmagazine.com/markets/bitcoin-price-crashes-13-percent-65600) / [Cointelegraph](https://cointelegraph.com/markets/bitcoin-four-month-low-62k-crypto-market-selloff) / [CoinDesk](https://www.coindesk.com/markets/2026/11/13/live-news-bitcoin-drops-below-200-week-moving-average-as-dollar-strength-pressures-risk-assets)
- **ETF 两周净流出 $23.5 亿，年内转负 $15 亿**：本周约 **−$10 亿**、连续第二周；BlackRock 产品**连续 11 个交易日**净流出；两周合计 **$2.35B**。11/13 CoinDesk 口径 2026 年 YTD 净流出已超 **$15 亿**——上期还是 $9.14 亿，一周又扩大六亿。[Cointelegraph](https://cointelegraph.com/markets/bitcoin-etf-outflows-2-35-billion-blackrock-11-session-streak) / [The Block](https://www.theblock.co/news/markets/2026-11-14-bitcoin-etfs-lose-1-billion-for-the-second-week-in-a-row-as-crypto-funds-except-one-continue-bleeding-440337) / [CoinDesk](https://www.coindesk.com/markets/2026/11/13/bitcoin-etfs-are-now-down-over-usd1-5-billion-in-net-outflows-for-the-year)
- **财库公司开始分层**：Twenty One Capital Q3 净利 **$10.9 亿**（BTC 浮盈）、JPMorgan 加密相关持仓逼近 **$10 亿**；另一侧 Nakamoto Q3 收入转负、股价盘前 −6%，且**欠 Kraken 的钱比整家公司市值还多 $1.65 亿**（把 $6,000 万还款推到 2027）；Metaplanet Q3 转亏 **$1.7 亿**（因卖出 BTC）`[待核实：单一来源]`。同一波下跌里，「靠浮盈做 EPS」和「靠负债杠杆」的分野第一次这么清楚。[The Block](https://www.theblock.co/news/business/2026-11-13-tether-backed-twenty-one-capital-reports-1-09-billion-q3-net-income-on-bitcoin-gains-439711) / [Decrypt](https://decrypt.co/383267/jpmorgan-bitcoin-crypto-linked-holdings-approach-1-billion) / [CoinDesk](https://www.coindesk.com/markets/2026/11/13/bitcoin-firm-nakamoto-owes-kraken-usd165-million-more-than-its-entire-market-value) / [Cointelegraph](https://cointelegraph.com/news/metaplanet-swings-170m-loss-bitcoin-sale-earnings)
- **交易所在缩量**：Kraken 母公司 Payward Q3 调整后 EBITDA **−66%**（靠非交易业务缓冲），Robinhood 10 月加密成交量 **−48%**（事件合约翻倍以上）。[The Block](https://www.theblock.co/news/business/2026-11-13-kraken-parent-payward-posts-66-drop-in-q3-adjusted-ebitda-plans-us-prediction-markets-and-personal-finance-ai-agent-439721) / [CoinDesk](https://www.coindesk.com/business/2026/11/13/kraken-parent-payward-says-expansion-outside-crypto-trading-helps-cushion-revenue-decline) / [Bitcoin Magazine](https://bitcoinmagazine.com/news/robinhood-crypto-volume-falls-48-percent)
- **宏观叠加**：美元指数 19 个月高位；Fed 主席 Warsh 要求就「AI 通胀」给出答案；Nvidia CEO 更替（Jensen Huang 因间谍丑闻下台）与 Anthropic 的 IPO 抽走风险偏好；SpaceX–Tesla 合并谈判把 **30,000 BTC** 重新推上台面。[Decrypt](https://decrypt.co/383231/bitcoin-hits-12-week-low-fed-rate-fears-undo-summer-rally) / [Decrypt](https://decrypt.co/383280/the-week-jensen-huang-fell-how-spy-scandal-toppled-nvidia-ceo) / [CoinDesk](https://www.coindesk.com/markets/2026/11/13/spacex-tesla-merger-talks-put-30-000-bitcoin-back-in-focus)

## 七、安全与事件：一个高危，两个中危

- **Core 三个漏洞解禁（1 high / 2 medium，修复在 29.2 / 30.0 / 28.3）**：
  - ① **TRUC sibling eviction 挂死出块**（high）——reorg 时被断开区块的交易重回 mempool 仍会跑 TRUC sibling eviction，可能驱逐父交易却留下子交易，导致**矿工节点**此后无法构造 block template 直到重启。影响 28.0–29.1；Niklas Gögge 于 2025-09 负责任披露，Greg Sanders 在 [#33504](https://github.com/bitcoin/bitcoin/pull/33504) 修复。
  - ② **入站 Tor 连接误获 `-whitelist` 权限**（medium）——若 `-whitelist` 范围包含本机 Tor daemon 地址（数千个可达节点的配置），所有入站 Tor 对端都会获得免 DoS 限制、隐私缓解被削弱的待遇。Zumsande / Poinsot 披露，[#33395](https://github.com/bitcoin/bitcoin/pull/33395) 修复。
  - ③ **witness malleation 拖住区块处理**（medium）——首个宣告某 compact block 的对等方可以让节点处理该块挂起最长 **10 分钟**，并在某些条件下无限重复。Eugene Siegel 于 2025-04 披露，Greg Sanders 在 [#32646](https://github.com/bitcoin/bitcoin/pull/32646) 修复。
  - 披露条件：29.x 于 **10/27 EOL**（政策：最后受影响版本 EOL 后两周）。[Optech #431](https://bitcoinops.org/en/newsletters/2026/11/13/) / [Core security advisories](https://bitcoincore.org/en/security-advisories/)
- **Core #36142 Tor 控制端点命令注入**：见第二节。[PR #36142](https://github.com/bitcoin/bitcoin/pull/36142)
- **Coinone（韩国交易所）客户数据泄露**：官方警告钓鱼与身份盗用风险，泄露字段与规模未公布 `[待核实：单一来源]`。[Cointelegraph](https://cointelegraph.com/news/coinone-data-breach-phishing-identity-theft-customer-information)
- **托管基础设施**：Blockstream 发布比特币托管系统，Adam Back 的主张是「更简单的安全模型」优先于功能堆叠。[Cointelegraph](https://cointelegraph.com/news/adam-back-simpler-security-blockstream-bitcoin-custody-system)
- **老地址异动**：一个自 2011 年起未动的 Satoshi 时代钱包在被送达一桩 **$2,600 亿**诉讼后移动 **75 BTC**；另两个沉睡 **16 年**的地址合计移动 **100 BTC**（约 $690 万）。[CoinDesk](https://www.coindesk.com/markets/2026/11/13/satoshi-era-wallet-served-in-a-usd260-billion-lawsuit-moves-75-btc-it-held-since-2011) / [The Block](https://www.theblock.co/news/markets/2026-11-13-from-6-to-6-9-million-two-dormant-bitcoin-addresses-wake-up-to-move-100-btc-after-more-than-16-years-439698)

## 八、政策与监管

- **SEC / CFTC 补位**：Trump 一年来首次同时提名两家机构委员，且首次加入两名民主党人选（bipartisan slate），参议院银行委员会正加速安排听证——两家机构目前都严重缺员。[Bitcoin Magazine](https://bitcoinmagazine.com/news/trump-sec-cftc-nominees-bipartisan) / [CoinDesk](https://www.coindesk.com/policy/2026/11/12/u-s-president-names-cftc-sec-nominees-for-first-time-in-a-year) / [CoinDesk](https://www.coindesk.com/policy/2026/11/13/u-s-senate-banking-committee-races-toward-hearing-on-new-sec-nominations)
- **银行类牌照继续推进**：美国监管方在加密信托 charter 上往前走，同时参议院的审视在加强。[Cointelegraph](https://cointelegraph.com/news/us-regulators-crypto-trust-charters-senate-scrutiny-grows)
- **跨境结算试点落地**：英国、新加坡、泰国央行完成连接传统系统与代币化系统的外汇结算试验——稳定币压力下的央行侧回应。[CoinDesk](https://www.coindesk.com/policy/2026/11/14/uk-singapore-and-thailand-central-banks-test-cross-border-fx-settlement-as-stablecoins-gain-ground) / [The Block](https://www.theblock.co/news/regulation/2026-11-13-uk-singapore-and-thailand-central-banks-complete-foreign-exchange-settlement-trial-linking-traditional-and-tokenized-systems-439692)
- **两条「比特币作为电网资产」的政策线**：英国在讨论把苏格兰被弃风的风电转成比特币挖矿，以削减 **$13 亿**电网账单；泰国则拟对特定稳定币转账设 **$14.8 万/日**上限以打击洗钱。[CoinDesk](https://www.coindesk.com/policy/2026/11/13/britain-could-turn-wasted-scottish-wind-power-into-bitcoin-to-cut-its-usd1-3-billion-grid-bill) / [The Block](https://www.theblock.co/news/regulation/2026-11-13-thailand-seeks-daily-stablecoin-cap-439676)
- **执法**：DOJ 获法院批准，针对 Binance 被盗案中约 **$12 亿**（朝鲜相关）资产采取行动。[news.bitcoin.com](https://news.bitcoin.com/regulation-and-legal/doj-secures-court-approval-targeting-1-2b-in-stolen-binance-crypto/) / [CoinDesk](https://www.coindesk.com/policy/2026/11/12/north-korea-s-binance-hack-faces-u-s-crackdown-as-doj-targets-usd1-2-billion-in-stolen-crypto)

## 九、链上数据速览

- 区块高度 **975,958**（周 +902）；mempool 待确认 **65,195 笔 / 30.5 MvB**，待确认费用池 **0.035 BTC**（≈$2,289）。[mempool.space](https://mempool.space/api/mempool)
- 费率 fastest **1** / halfhour **1** / economy **1** sat/vB——**三档全贴地板**，比上期（3/1/1）更弱。[mempool.space](https://mempool.space/api/v1/fees/recommended)
- 日交易量 **465,786**，一周前 591,830（**−21.3%**）。[blockchain.info](https://api.blockchain.info/charts/n-transactions)
- 闪电网络容量 2,324.71 BTC，占 2,100 万上限的 **0.0111%**；24h 新通道 204、更新通道 14,929。[1ML](https://1ml.com/statistics)

## 结语

这一周把上期那条负反馈链走完了：算力 −6.5% → 出块 11.2 分钟 → 难度 −9.13% → 下轮再 −1.52%。链条末端是 hashprice 约 $32/PH/日，这个数字决定了 2027 年上半年的矿机迭代节奏——竞争点不再是「谁的电便宜」，而是「谁的机器还在 20 J/TH 以内」。

价格侧要记的只有一句：**跌破 200 周均线**。这个位置在历史上不是底部信号，而是叙事切换器——一旦破了，ETF 的边际买盘就从「配置」变成「止损」，本周 −$10 亿、BlackRock 连 11 日流出就是账面表现。年内 ETF 净流入已经转负 $15 亿，意味着 2024–2025 那批被动配置盘正在被赎回。

协议层反而是最干净的一周：Core 三个老漏洞的解禁（尤其那个能让矿工节点停止出块的 TRUC bug）说明披露政策在正常工作——修复早在 29.2 / 30.0，公开只在 EOL 之后；anti-exfil 的两份 BIP 则把「硬件签名设备可能一直在偷偷泄漏你的种子」变成一份可实现的规范。这两件事都不会出现在价格里，但它们才是让这套系统能再跑十年的东西。

— Youmoo（㕛木）

*Solid as teak.*
