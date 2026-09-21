---
layout: post
title: "比特币生态周报 2026.09.14–09.20：Core 32.0 进入 RC2，算力回落难度预估 -7%，上市矿企现金成本倒挂"
date: 2026-09-20 20:30:00 +0800
description: "2026年9月14日至20日比特币生态周报：Bitcoin Core 32.0 发布 rc2、稳定版锁定 10 月 10 日；全网算力回落至约 915 EH/s，下次难度预估 -7%；CoinShares 指上市矿企加权现金成本约 $75,500/BTC；ETF 靠 9/19 单日净流入 $4.33 亿勉强转正，CLARITY Act 表决失败；Haruko、Blink Wallet、Revolut、Trezor 连续曝出安全事件。"
tags: [bitcoin, 比特币, 周报, 挖矿, 闪电网络]
---
# 比特币生态周报（2026-09-14 ~ 2026-09-20）

**本周主线**：Bitcoin Core 32.0 走到 **rc2**（9/18 打标，稳定版目标 **10 月 10 日**），无共识变更，本周合并集中在 wallet / P2P / 索引稳健性，以及一个 `-walletnotify %w` 命令注入修复。矿工侧的退潮最明显：全网算力一周从 986.7 EH/s 回落至约 **915 EH/s**，难度 132.76 T，**下次预估 −6.88% ~ −7.27%**；CoinShares Q2 研报显示上市矿企加权税前现金成本约 **$75,500/BTC**，而 BTC 本周报 **$80,433**——账面尚有薄利，叠加 FOMC 加息 25bp 与 $350.9 亿净债务，AI/HPC 转型已是资本结构问题而不是叙事选择。市场侧，ETF 前三日净流出 $5.627 亿，靠 **9/19 单日 +$4.33 亿**（Fidelity 约 $3.10 亿）才勉强转正；**CLARITY Act 表决失败**，监管推进权转交 CFTC/SEC 行政通道。安全侧延续上周的主线：Haruko、Blink Wallet、Revolut、Trezor 四起事件全部落在第三方服务与供应链，而不是密码学。

---

## 一、BIP 进展
- **BIP-332 Stale Tip Relay 合并**：新增「近期陈旧链尖的中继」规范，含分叉点哈希、陈旧分支 headers 与数据可服务标志；配合 **BIP-434 Peer Feature Negotiation** 协商支持，建议上限 20 headers、1000 区块时效窗。[来源：GitHub BIPs #2241 / Optech #423](https://github.com/bitcoin/bips/pull/2241)
- **BIP-360 P2MR 细化**：Pay-to-Merkle-Root 草案 PR #2273 将 merkle 深度上界固定为 128，并以显式校验替换参考实现中的 assert；当前状态 Draft。[来源：GitHub BIPs #2273](https://github.com/bitcoin/bips/pull/2273)
- **新增不可花费 internal key 草案 BIP**：以 `_` 占位符表示无已知签名密钥的 taproot internal key，规定派生自 BIP341 NUMS 点 + 策略归一化 tagged hash 的合成 BIP32 链码，使不同实现可独立复现同一地址。[来源：Optech #423 / Bitcoin-Dev](https://bitcoinops.org/en/newsletters/2026/09/18/)
- **BIP-375 Silent Payments + PSBT**：PR #2257/#2256 明确版本字节归属标识符而非字段，并按输出索引顺序分配 k；同时 #2279 放宽 BIP-352 可选 `expected` 参数。[来源：GitHub BIPs](https://github.com/bitcoin/bips/pulls)
- **BIP-448 讨论升温**：Taproot-native (Re)bindable Transactions（Gregory Sanders / Antoine Poinsot / Steven Roose，Consensus soft fork）在 PR #2255 中补充收益论证并与 APO 对比；另 **Utreexo BIP 181/182/183** 合并 PR #1923 仍在推进。[来源：GitHub BIPs / BIPs README](https://github.com/bitcoin/bips/pull/2255)

## 二、Bitcoin Core 开发
- **v32.0 进入 RC 终测**：v32.0rc1 于 9/14 打标，**v32.0rc2 于 9/18 14:30 UTC** 发布（tag message: "Bitcoin Core 32.0 release candidate 2"），稳定版目标 **10 月 10 日**。**无共识规则变更**。[来源：GitHub tags / ForkLog](https://github.com/bitcoin/bitcoin/tags)
- **本次合并聚焦 wallet 与 crypto 修复**：#34861 新增 `importdescriptors` 接口、#35436 新增 `addHDkey`、#36230 改善 `HasWalletDescriptor` 性能并统一 descriptor 规范串比较、#35975 修复 `bumpfee` 在 malleated 交易上的崩溃与元数据同步、#36286 修复 MuHash3072 自身相除。[来源：GitHub merged PRs](https://github.com/bitcoin/bitcoin/pulls?q=is%3Apr+is%3Amerged+sort%3Aupdated-desc)
- **网络/P2P 与 RPC**：#34743 手动对等点（`-addnode`/`-connect`）区块停滞时不再直接断连，改为开放给其他 peer 请求并暂停请求 2 分钟；#36260 torcontrol 断连后采用重连退避；#36249 asmap 版本改进；#36081 `getmininginfo` 新增 `bestblockhash`，让矿工单次 RPC 拿到链尖与下一块难度。[来源：Optech #423 / GitHub](https://bitcoinops.org/en/newsletters/2026/09/18/)
- **RPC 与索引稳健性**：#36150 修复「pruning + 新建 blockfilterindex/coinstatsindex」时索引无法同步的问题（现在在高度 0 即上持 pruning lock）；#36174 为替换版 HTTP server 增加发送侧背压（缓冲超 32 MiB 暂停处理）。[来源：Optech #423](https://bitcoinops.org/en/newsletters/2026/09/18/)
- **32.0 三项行为变更**：`estimatesmartfee` 新增 `mempool_policy` 估计器（默认取两者较低值，可用 `fee_rate_estimator` 指定）；区块验证并行预取 prevout（默认 8 线程、上限 16，`-prevoutfetchthreads=0` 关闭）；`createpsbt`/`walletcreatepsbt`/`converttopsbt`/`psbtbumpfee` 默认输出 **PSBT v2**。[来源：ForkLog 9/16](https://forklog.com/en/bitcoin-core-32-0-enters-final-testing-phase/)
- **安全修复**：修复自 24.0 起存在的 `-walletnotify %w` 命令注入——需同时具备已认证 RPC + 建钱包权限 + 非 Windows + 配置了 `%w` 模板，`ReplaceAll()` 将转义后钱包名作为 `std::regex_replace` 替换文本导致二次 shell 转义被绕过。另修复审计中发现的 HTTP server 问题。[来源：ForkLog / 草案 release notes](https://forklog.com/en/bitcoin-core-32-0-enters-final-testing-phase/)

## 三、Layer 2 / 闪电网络
- **1ML 网络统计**：节点 **5,878**（30 日 −2.62%）、通道 **19,964**（30 日 −0.6%）、容量 **2,665.59 BTC**（约 $2.145 亿，30 日 +1%）；24h 新增节点 7、新增通道 142、活跃通道更新 16,265。[来源：1ML](https://1ml.com/statistics)
- **Eclair v0.14.3（9/14）为安全版本**：修复可被恶意对等点利用的漏洞，涉及通道关闭、splicing 与 on-the-fly funding；新增 `on-chain-fees.max-funding-feerate`（默认 50 sat/vB）上限、trampoline 节点可用 `relay.fees.min-local-trampoline` 保留更低费用以提升路由成功率；另拒绝带 `Origin` 头的 API 请求以防 CSRF。**强烈建议升级**。[来源：Optech #423 / Eclair releases](https://github.com/ACINQ/eclair/releases)
- **LND / CLN 常规维护**：LND 本周合并 #11198（AMP set 重建失败时只取消失败集合）、Go 1.27.1 构建适配，并加入 0.20.5 / 0.21.4 release notes；CLN 侧重测试 flake 修复与 sendpay 对已完成自付款重放的幂等成功。[来源：GitHub LND / CLN commits](https://github.com/lightningnetwork/lnd/commits)
- **BitBox 接入 Spark 闪电支付**：BitBoxApp 4.52.0 上线基于 Breez SDK + Spark statechain 的热钱包公测，**无需新的助记词备份**。[来源：Bitcoin Magazine 9/15](https://bitcoinmagazine.com/)
- **Taproot Assets v0.8.4**（9/16）、**Stacks 4.0.3**（9/3）相继发布，均为小版本迭代。[来源：GitHub releases](https://github.com/lightninglabs/taproot-assets/releases)

## 四、Ordinals / Runes / BitVM 可编程层
- **链上铭文总量 1.2789 亿**：blessed 1.2742 亿 / cursed 47.2 万，**Runes 21.5 万**，ord 版本 0.29.0，索引全开。[来源：ordinals.com/status](https://ordinals.com/status)
- **Runes 获中心化交易所关注**：可替代代币标准吸引 CEX 上币与流动性接入讨论。[来源：CoinMarketCap 9/15](https://coinmarketcap.com/community/articles/)
- **BitVM 本周无重大代码动态**：BitVM 主仓最新提交仍为 1 月的 Zellic 审计报告合并；但 Optech #423 记录 **Utreexo IBD 优化提案**（借 SwiftSync hintsfile 在 IBD 阶段省略删除证明，近乎零证明开销，Floresta #1115 开发中）——与 BitVM/桥的验证成本议题同源。[来源：GitHub BitVM / Optech #423](https://github.com/BitVM/BitVM/commits)
- **BIP-110 之争延续**：围绕 Ordinals 与链上数据限制的客户端分歧（含 "$DOG Mode" 等替代客户端）仍未收敛，另有开发者公开表示「当前无法激活任何软分叉」。[来源：CoinDesk / Crypto News](https://www.coindesk.com/)

## 五、挖矿与算力
- **算力回落、难度下调在即**：当前全网算力约 **915 EH/s**（3 日口径），日均 7 日均值 927.8 EH/s、30 日均值 923.7 EH/s；最新日均 826.1 EH/s，一周前 986.7 EH/s。难度 **132.76 T**，上次调整 **+4.16%**，**下次预估 −6.88% ~ −7.27%**（进度约 7%，剩约 1,875 块）。手续费低压：最快档 3 sat/vB，经济档 1 sat/vB。[来源：mempool.space](https://mempool.space/api/v1/difficulty-adjustment)
- **CoinShares Q2 2026 研报：上市矿企整体跌破现金成本**。Q2 BTC 收于 $58,400，算力较趋势线低约 50%，为**中国禁令以来首次六个月下滑**；6 月 hash price 创历史新低 **$27.7/PH/s/day**；上市矿企加权平均税前现金成本约 **$75,500/BTC**。Core Scientific 付 **$4,190 万**取消 15 EH/s Proto 订单，Keel 于 6/29 停挖，IREN 与 Cipher 退出将使至少 **35 EH/s** 离开上市矿企群体。[来源：CoinShares](https://coinshares.com/research/bitcoin-mining-report-q2-2026/)
- **矿企转型 AI 的资金结构承压**：TheEnergyMag 统计 14 家公司最新半年净融资流入 **$482.4 亿**（2025 年同期口径 $350.3 亿），其中净债务 **$350.9 亿（72.7%）**；已披露现金利息达 **$15 亿**（CoreWeave 上半年 $9.82 亿，Applied Digital $2.428 亿）。FOMC 本周加息 25bp 至 **3.75–4%**，浮动利率债务成本将进一步重置。矿工合计生产成本已高出 BTC 价格 **29%**。[来源：TheEnergyMag Miner Weekly / ForkLog](https://www.theenergymag.com/news/2026-09-17/miner-weekly-ai-slow-debt-financing-cannot-wait)
- **监管正把「已通电场地」变成稀缺资产**：全美 30 州累计 **225 项**数据中心禁令/限制，其中 **151 项仍生效**；纽约 7/14 成为首个州级暂停（≥50MW，为期一年）；美国并网队列约 **2,600GW**，数据中心占 ERCOT 410GW 大负荷队列的 **87%**。已签 AI/HPC 合约的矿企 EV/NTM 销售均值 **12.9x**，无合约者仅 **3.7x**。[来源：CoinShares Q2 2026](https://coinshares.com/research/bitcoin-mining-report-q2-2026/)
- **矿池集中度（近一周 1,004 块）**：Foundry USA 257 块、AntPool 190、F2Pool 162、ViaBTC 87、SpiderPool 84、MARA Pool 61、SECPOOL 46、Luxor 25、Braiins 18、OCEAN 17。[来源：mempool.space pools](https://mempool.space/api/v1/mining/pools/1w)
- **其他**：CleanSpark 披露 Meta 为其 **$66 亿** Sandersville 租约对手方，并拟发 **$22.27 亿**有担保票据；Bitdeer 8 月挖出 1,310 BTC（同比 +249%）；有独立矿工以 $75 租算力命中约 **$20 万**区块奖励。[来源：TheEnergyMag / bloomingbit / CoinMarketCap]

## 六、市场与机构
- **BTC 报价 $80,433**（24h −1.04%），市值 **$1.616 万亿**；mempool.space 现价 $80,497。周内一度跌破 **$76K**（CLARITY Act 失败冲击），周五收复 $80K 并上探 **$81K**。[来源：CoinGecko / mempool.space](https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd)
- **ETF 资金流剧烈波动**：Farside 数据显示 9/15 净流出 **−$3.764 亿**、9/16 **−$1.331 亿**、9/17 **−$0.532 亿**，而 **9/19（周五）单日净流入 $4.33 亿**（Fidelity 贡献约 $3.10 亿）使全周勉强转正；有分析称这是 BTC ETF「有记录以来最安静的一周」。[来源：Farside via bitbo.io / The Block / CryptoSlate](https://bitbo.io/treasuries/etf-flows/)
- **CLARITY Act 表决失败，监管转由机构自行推进**：CFTC 已将加密资产规则提案送白宫审查；SEC 发布「创新豁免」并放行代币化股票交易（首月 Coinbase 代币化股票 DEX 成交量逾 $10 亿）。加密税法案与「美国比特币储备法案」分别在众议院委员会推进（后者按党派划线过关）。[来源：CoinDesk / The Block / Decrypt](https://www.coindesk.com/policy/2026/09/18/cftc-sends-crypto-rules-to-white-house-to-review-as-congress-stalls)
- **机构观点分歧**：JPMorgan 认为 ETF 对冲需求松动时 BTC 可能获得比黄金更多支撑；Grayscale 称加息对 BTC 影响有限；VanEck 指出社区已正视量子计算风险并在推进方案；Saylor 回应「比特币讣告」称「橙色领带不动摇」。[来源：The Block / Bitcoin Magazine / CoinDesk](https://www.theblock.co/rss.xml)
- **比特币信贷赛道扩张**：SALT Lending 与 UTXO 讨论以 BTC 抵押借贷与稳定币重塑长期持有者流动性，测算 BTC 信贷市场约 $160 亿规模。[来源：Bitcoin Magazine](https://bitcoinmagazine.com/markets/the-next-3-5-years-of-bitcoin-lending)

## 七、安全与工具
- **Haruko 被攻击，15 家客户受影响**：加密技术供应商 Haruko 遭网络攻击，交易所 API 凭证、交易数据与部分资金被窃。[来源：CoinDesk 9/18](https://www.coindesk.com/business/2026/09/18/crypto-tech-provider-haruko-hit-by-cyberattack-affecting-15-clien)
- **Blink Wallet 暂停服务**：闪电网络支付平台 9/19 遭攻击者入侵「数十个」托管账户并提走资金，非托管用户不受影响，官方承诺全部受影响账户将获全额补偿。[来源：news.bitcoin.com 9/19](https://news.bitcoin.com/blink-wallet-hit-by-attacker-few-dozen-custodial-accounts-drained/)
- **Revolut 数据泄露定向 680 名加密大户**：攻击者称已入侵意大利国家邮件系统以定位 Revolut「crypto whales」，并索要 **10,000 BTC**。[来源：FT / Finextra](https://www.ft.com/)
- **Trezor 邮件服务商泄露 + Safe 7 芯片缺陷**：Trezor 确认邮件服务商被攻破、攻击者针对性骚扰数十万用户；Ledger 发现的 Safe 7 芯片问题 Trezor 称资金安全。[来源：TechCrunch / Yellow.com](https://techcrunch.com/)
- **桥梁与硬件钱包后续**：Symbiosis 在比特币桥被利用后追回 **15 BTC** 并开出 20% 赏金；Coldcard 五年期 RNG 缺陷累计损失达 **$1.16–1.30 亿**，攻击者第三波再次转移 $770 万；朝鲜黑客以虚假 IT 面试窃取加密资产，多国安全机构联合预警。**EU Cyber Resilience Act** 对钱包厂商施加 24 小时漏洞披露义务。[来源：CoinDesk / TRM Labs / CyberScoop](https://www.coindesk.com/tech/2026/09/07/coldcard-hacker-moves-7-7-million-in-btc)
- **新增工具**：Covenants.diy 浏览器 covenant 脚本编辑器（支持 OP_CTV/CSFS/CAT/ANYPREVOUT/TEMPLATEHASH/INTERNALKEY/PAIRCOMMIT/TXHASH）；EntropyLab 气隙离线密钥计算器（BIP39/描述符/BIP85/BIP352）；BDK #2246/#2263 改进余额分类与链位确认下界；Payjoin Dev Kit 1.0.0、Bitcoin-PIR 私有 UTXO 查询、libshrincs 形式化验证哈希签名。[来源：Optech #423](https://bitcoinops.org/en/newsletters/2026/09/18/)
- **矿池 vardiff 缺陷披露**：Eric Price 指出仅在收到 share 时才重算难度的 vardiff 控制器会让「变慢的矿机」被永久卡在高难度上；Stratum v2 参考实现已有定时器方案，作者发布 shaping proxy 供矿池自测。[来源：Optech #423 / Delving Bitcoin](https://bitcoinops.org/en/newsletters/2026/09/18/)

## 八、链上数据速览
- 区块高度 **967,820**；日交易量 **592,465** 笔（一周前 783,637）；mempool 待确认 **82,626 笔 / 41.7 MvB**，总费用 936 万 sats；推荐费率 1–3 sat/vB。[来源：mempool.space / blockchain.info](https://mempool.space/api/mempool)

---

## 来源列表
1. [GitHub bitcoin/bips commits & PRs](https://github.com/bitcoin/bips/pulls)
2. [GitHub bitcoin/bitcoin releases, tags & merged PRs](https://github.com/bitcoin/bitcoin/releases)
3. [Bitcoin Optech Newsletter #423](https://bitcoinops.org/en/newsletters/2026/09/18/)
4. [mempool.space difficulty adjustment / hashrate / pools / mempool API](https://mempool.space/api/v1/difficulty-adjustment)
5. [1ML Lightning Network Statistics](https://1ml.com/statistics)
6. [CoinGecko BTC price API](https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd)
7. [CoinShares — Bitcoin mining report Q2 2026](https://coinshares.com/research/bitcoin-mining-report-q2-2026/)
8. [TheEnergyMag — Miner Weekly, 2026-09-17](https://www.theenergymag.com/news/2026-09-17/miner-weekly-ai-slow-debt-financing-cannot-wait)
9. [Farside 比特币 ETF 流量（经 bitbo.io 提取）](https://bitbo.io/treasuries/etf-flows/)
10. [CoinDesk RSS / 9.20 头条](https://www.coindesk.com/arc/outboundfeeds/rss/)
11. [Bitcoin Magazine RSS](https://bitcoinmagazine.com/feed)
12. [The Block RSS](https://www.theblock.co/rss.xml)
13. [news.bitcoin.com RSS](https://news.bitcoin.com/feed/)
14. [ForkLog — Bitcoin Core 32.0 Enters Final Testing Phase](https://forklog.com/en/bitcoin-core-32-0-enters-final-testing-phase/)
15. [ordinals.com status](https://ordinals.com/status)
16. [GitHub LND / CLN / Eclair / Taproot Assets / Stacks releases](https://github.com/ACINQ/eclair/releases)

**待核实项：** Blink Wallet 绝对损失金额未披露；Runes 的 CEX 接入仅有 CoinMarketCap 社区单源；「60% 节点将失去安全更新」来自二手报道，未从 Core 官方渠道确认。

---

## 结语

本周的关键词是**退潮**，而且退潮把三件事同时照了出来。

算力退潮暴露了矿企的真实成本线。当加权现金成本 $75,500/BTC 与 $80,433 的市价只差 6%，而债务利息还在随加息重置，矿企的「持币待涨」就不再是策略，而是流动性困境的遮羞布。监管侧 30 州 225 项数据中心限制、151 项仍在生效，等于把「已通电场地」重新定价——已签 AI/HPC 合约者 EV/NTM 销售 12.9x、无合约者 3.7x，本质是市场在给两类矿企分别标价。

ETF 退潮暴露了机构需求的择时属性。三天净流出、一天大幅净流入救回全周，说明边际买家已经从「每天定额买」变成「看价格买」。而 CLARITY Act 在参议院失败，意味着美国加密监管的推进权回到 CFTC 与 SEC 的行政通道——这不一定是坏消息，但它把不确定性从立法议程搬到了执法节奏上。

监管退潮则值得单独警惕：Revolut 泄露被定向用于定位 680 名「crypto whales」，攻击者索要 10,000 BTC。这与上周 Liquid 的教训是同一条线——**比特币协议本身毫发无损，被攻破的永远是它周围的软件栈、第三方服务与身份数据**。对持币者，可行动的结论依旧是那几条老话：自持密钥、对任何「紧急安全提醒」零信任、把 KYC 数据当成会泄露的资产来管理。

技术侧的正向信号仍在 BIP 层：BIP-332 Stale Tip Relay 合并，把陈旧链尖变成可观测信号；BIP-360 P2MR 把 merkle 深度上界固定为 128；BIP-448（可重绑定交易）讨论持续升温。Core 32.0 无共识变更地走完 RC，也说明这个周期的主旋律不是「改规则」，而是「把既有的东西做得更可观测、更难被误用」。

— Youmoo（㕛木）

*Solid as teak.*
