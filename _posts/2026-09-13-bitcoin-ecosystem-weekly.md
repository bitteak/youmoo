---
layout: post
title: "比特币生态周报 2026.09.07–09.13：Liquid 侧链被窃 $320M，Core 32.0 完成分支切割，Strategy 三年来首次卖币"
date: 2026-09-13 20:30:00 +0800
description: "2026年9月7日至13日比特币生态周报：Liquid侧链因Elements范围证明漏洞被窃约3.2亿美元，Bitcoin Core 32.0完成branch-off，BIP-346与BIP-332入库，全网算力跌破1ZH/s，Strategy三年来首次卖币，CLARITY Act进入9月15日参议院投票。"
tags: [bitcoin, 比特币, 周报]
---

# 比特币生态周报（2026-09-07 ~ 2026-09-13）

**本周主线**：Liquid 侧链 $320M 事件——Elements 范围证明验证缓存漏洞导致联邦钱包约 4,000 BTC（占余额 95%）被提走，Elements v23.3.4 紧急修补，3,400 BTC 已归还但约 598 BTC（~$46M）未收回，Blockstream 拒绝支付赎金，网络于 9/10 恢复出块。Core 侧 **v32.0 进入 branch-off**（版本号升至 32.99），BIPs 仓库接纳 **BIP-346 OP_TXHASH** 与 **BIP-332 Stale Tip Relay**。市场面：BTC 周内 -4.5% 至 ~$76.7K，现货 ETF 三日净流出 $449M（周四单日 -$282.6M 为 7/13 以来最大），**Strategy 三年来首次卖币**。矿工侧：算力跌破 1 ZH/s，近 1/5 机队停机，难度逆势预估 +4.74%。

---

## 一、BIP 进展

- **BIP-346 OP_TXHASH 正式入库（[PR #1500](https://github.com/bitcoin/bips/pull/1500)，9/12 合并）**：Consensus (soft fork)、Draft，作者 Steven Roose / Brandon Black。将 tapscript 的 `OP_SUCCESS189` 重定义为**通用交易自省操作码**，配合 `OP_CHECKSIGFROMSTACK` 可构造完全通用的 sighash（覆盖现有全部 SIGHASH flag、BIP-118 `SIGHASH_ANYPREVOUT` 等）。([BIP-346 文本](https://github.com/bitcoin/bips/blob/master/bip-0346.md))
- **BIP-332 Stale Tip Relay 入库（[PR #2241](https://github.com/bitcoin/bips/pull/2241)，9/9 合并）**：Peer Services / Draft，作者 Anthony Towns、w0xlt、Ram，Assigned 2026-08-21，依赖 BIP-434。新增可选 P2P `staletip` 消息（载荷含 `fork_point` / `CompressedHeader` 向量 / `have_block`），用于广播近期陈旧链尖，以探测**区块传播劣化、网络分区与自私挖矿**等异常；当陈旧块与当前链尖累计 PoW 相同时，预先持有该块还能加速 reorg。([BIP-332 文本](https://github.com/bitcoin/bips/blob/master/bip-0332.md))
- **BIP-458 Half-Aggregation of BIP 340 Signatures（[PR #2205](https://github.com/bitcoin/bips/pull/2205)，9/12 更新，仍开放）**：Schnorr 签名半聚合新提案，评审中，尚无独立文件。
- **BIP-85 扩展**：Nostr 应用（[#2126](https://github.com/bitcoin/bips/pull/2126)）9/13 合并入库；Codex32 应用（`93'`，[#1958](https://github.com/bitcoin/bips/pull/1958)）与保留索引应报错（[#2287](https://github.com/bitcoin/bips/pull/2287)）仍在讨论。
- **Silent Payments 与勘误**：[#2288](https://github.com/bitcoin/bips/pull/2288) 让 BIP-352 参考实现地址解码与 silent payment 规则对齐；[#2278](https://github.com/bitcoin/bips/pull/2278) BIP-327 参考自测改为从 secrets 推导 `extra_in`（9/10 合并）；BIP-93 Codex32 重构格式与种子章节（[#2285](https://github.com/bitcoin/bips/pull/2285)）、checksum 边界修正（[#2258](https://github.com/bitcoin/bips/pull/2258)，9/11）；BIP-155 补充参考实现（[#2244](https://github.com/bitcoin/bips/pull/2244)，9/9）。本周无 BIP 进入 Final，无 Activation 状态变更。

## 二、Bitcoin Core 开发

- **v32.0 进入 branch-off 阶段**：[#36227](https://github.com/bitcoin/bitcoin/pull/36227) 将版本号提升至 **32.99**，[#36226](https://github.com/bitcoin/bitcoin/pull/36226) 在分支切割前把 release notes 迁至 wiki，[#36213](https://github.com/bitcoin/bitcoin/pull/36213) 完成 32.0 翻译更新。最新正式 release 仍为 v31.1（2026-07-08），v32.0 尚未打 tag。([Releases](https://github.com/bitcoin/bitcoin/releases))
- **[#36196](https://github.com/bitcoin/bitcoin/pull/36196) pre-32.0 参数更新**：固定种子（fixed seeds）、chainparams、headerssync 参数与**新的 assumeutxo 快照**一并合入——assumeutxo 快照是主网首次同步时间的关键变量。
- **[#34931](https://github.com/bitcoin/bitcoin/pull/34931) validation 改为对 DB 不可读 UTXO 直接 abort**：此前会把读不出的 coins 当作「不存在」，存在静默状态分歧的风险；现在直接失败退出，属于正确性加固。
- **wallet 两项**：[#35935](https://github.com/bitcoin/bitcoin/pull/35935) 避免不必要的 wtxvariant 重写（性能）；[#35445](https://github.com/bitcoin/bitcoin/pull/35445) 回退 Miniscript 表达式的 `StringType::COMPAT`，并放弃「可校验 Descriptor ID」概念（接口清理）。
- **P2P / 网络层加固**：[#32646](https://github.com/bitcoin/bitcoin/pull/32646) 在 `FillBlock` 内加入 witness mutation 检查、[#33296](https://github.com/bitcoin/bitcoin/pull/33296) 调用 `FillBlock` 前校验空 header（两者配合封堵块中继路径上的变异攻击面）；[#36199](https://github.com/bitcoin/bitcoin/pull/36199) 将 RFC 9637 新增 IPv6 文档段视为无效地址；[#36201](https://github.com/bitcoin/bitcoin/pull/36201) / [#36215](https://github.com/bitcoin/bitcoin/pull/36215) 更新内嵌 ASMap 至 1788801420 并让版本号与外部计算哈希一致；[#36203](https://github.com/bitcoin/bitcoin/pull/36203) 更新 secp256k1 subtree；[#36202](https://github.com/bitcoin/bitcoin/pull/36202) release note 提示可能移除 **CJDNS**。
- **其他**：[#36174](https://github.com/bitcoin/bitcoin/pull/36174) HTTP 在客户端停止读取时对发送缓冲节流；[#36150](https://github.com/bitcoin/bitcoin/pull/36150) index 在首块之前即锁定 prune lock；[#32540](https://github.com/bitcoin/bitcoin/pull/32540) REST 支持按 blockhash 取已花费输出；[#36218](https://github.com/bitcoin/bitcoin/pull/36218) macOS 上暂时回避 `pipe2`。本周无共识规则变更、无 mempool policy 变更。

## 三、Layer 2 / 闪电网络

- **闪电网络上跑通稳定币**：Lightning Labs CEO Elizabeth Stark 在 FT Crypto and Digital Assets Summit 披露，已用 **Taproot Assets** 完成首笔基于比特币闪电网络的稳定币交易测试，称「在比特币区块链上拥有加密美元/稳定币」的协议路径已被验证。她同时点名 **bitVM** 等 DeFi 方向正在吸引开发者回流。([Yellow.com](https://yellow.com/news/bitcoin-based-stablecoin-is-born-lightning-labs-just-ran-a-historical-test-transaction))
- **容量回到纪录区间**：媒体口径称闪电网络容量创 **5,606 BTC** 纪录、交易所增加流动性；[mempool.space](https://mempool.space/api/v1/lightning/statistics/latest) 公开通道快照为 **16,228 节点 / 32,515 通道 / 3,754 BTC**（快照日 2026-08-30，与上周同一快照，尚未刷新）；[1ML](https://1ml.com/statistics) 口径为 5,901 节点 / 19,926 通道 / **2,681.16 BTC**（24h +3%，30 日 +2.89%，约 $205.8M）。两套口径差异源于是否计入不可达/单向通道，趋势均为温和回升。
- **实现更新**：LND 发布 **v0.21.3-beta** 与 **v0.20.4-beta**（9/2，维护分支并行发版，[Releases](https://github.com/lightningnetwork/lnd/releases)）；CLN **v26.06.7 "Quantum-Resistant Lightning Channel VII"**（8/28，[Releases](https://github.com/ElementsProject/lightning/releases)）延续量子抗性通道系列。本周无新的 LN 协议级提案。
- **可编程层 / Ordinals / Runes**：**ORDI 24h 涨 35%**，日成交 $202M；全市场 NFT 销售额涨 6.8% 至 $46.8M，比特币交易活跃是主要拉动；铭文服务商 OrdinalsBot 于 8 月宣布关停（三年后退出），铭文基础设施进入整合期。([crypto.news](https://crypto.news))
- **BitVM**：本周无重大动态（无新验证桥提案或实现里程碑）；相关活跃度主要体现在 Taproot Assets 稳定币测试与 covenant 类 BIP（OP_TXHASH）的推进上。

## 四、挖矿与算力

- **算力跌破 1 ZH/s**：[mempool.space](https://mempool.space/api/v1/mining/hashrate/3d) 当前 **942.6 EH/s**，[blockchain.info](https://api.blockchain.info/charts/hash-rate) 两周口径最新约 **995 EH/s**，较一周前 1,045 EH/s 下降 **4.8%**——为 2025 年 9 月以来首次跌破 1 ZH/s；VanEck 认为接近底部信号。
- **难度逆势上调**：当前难度 **127.45 T**，下一次调整（高度 967,680）预估 **+4.74%**，进度 57.1%，剩余约 864 块（[mempool.space](https://mempool.space/api/v1/difficulty-adjustment)）——算力在下滑而难度仍将上行，矿工单位成本压力进一步抬升。
- **电力挤压与机队停机**：AI 数据中心抢占电网，美国上市矿企被迫减产/转型；CryptoSlate 估算**近 1/5 全网算力处于停机状态**，若同时重启可能触发「margin trap」；伊朗单季流失 **7 EH/s**。
- **矿池格局（近一周 1,052 块）**：[mempool.space](https://mempool.space/api/v1/mining/pools/1w) 数据显示 Foundry USA 25.3%（266 块）、AntPool 19.3%（203）、F2Pool 13.8%（145）、ViaBTC 9.3%（98）、SpiderPool 8.9%（94）、MARA Pool 4.6%（48）、SECPOOL 4.2%（44）、Luxor 3.3%、OCEAN 3.1%。前三家合计约 58%，集中度维持高位。
- **费率极低**：mempool 积压约 **38.6 MvB / 7.5 万笔**，近 144 块平均区块费率约 **0.8 sat/vB**，推荐费率 1–2 sat/vB（[mempool.space](https://mempool.space/api/v1/fees/recommended)）；日交易量 78.4 万笔，环比 +8.3%，但区块空间仍严重过剩。另有单人矿工以极小算力命中区块，约获 **$210K** 奖励（概率 28,000:1）。

## 五、市场、机构与监管

- **价格**：**$76,744**（24h -0.77%），周内自 $80,329 跌至 $76,742（**-4.5%**），最低 $76,555；9/11 CPI 后一度冲高，随后受美伊冲突再起压制。CryptoQuant 认为需站上 **$81,700** 才能确认新一轮牛市结构。([CoinGecko](https://www.coingecko.com/en/coins/bitcoin) / [The Block](https://www.theblock.co/news/markets/2026-09-12-cryptoquant-bitcoin-resistance-support-levels-414519))
- **现货 ETF 由流入转为流出**：三日净流出 **$449M**，周四单日 **-$282.6M** 为 7/13（-$424.7M）以来最大；ARKB -$164M、GBTC -$36M、FBTC -$33.6M；总净资产 **$97.5B**，累计净流入 $55.17B；全周比特币基金净流出约 **$460M**，回吐了此前三周 $3.8B 流入的一部分（SoSoValue）。同时以太坊 ETF 逆势录得 $216M 单日流入。([Cointelegraph](https://cointelegraph.com/markets/bitcoin-etfs-282m-biggest-outflow-july))
- **Strategy 三年来首次卖币（重磅）**：公司授权出售比特币并卖出 **$334M MSTR 股票**，此前把 $176.3M 投入自家 STRC 优先股而非继续买币；CEO 称「是银行推动公司卖币，『永不卖出』从来不是规则」；最新一笔 4,603 BTC 买入均价约 **$80,300**（当前已浮亏），总持仓 **845,050 BTC**，同时把回购额度翻倍至 $2B。
- **机构渠道**：**Nasdaq 向 Kraken 母公司投资 $1 亿**（[Bitcoin Magazine](https://bitcoinmagazine.com/news/nasdaq-invests-in-kraken)）；Bitwise 在上线不足一年后关闭 Dogecoin ETF（[The Block](https://www.theblock.co/news/markets/2026-09-10-bitwise-shuts-down-dogecoin-etf-less-than-a-year-after-launch-414184)），山寨 ETF 出清信号；意大利第二大银行 **UniCredit** 寻求基础设施伙伴开展加密交易与托管（[Cointelegraph](https://cointelegraph.com/news/unicredit-infrastructure-partners-crypto-trading-custody)）；瑞士 Bitcoin Suisse 计划将最多一半本土岗位迁往海外以压缩成本。
- **监管：CLARITY Act 进入 9/15 参议院关键投票**：共和党公布修订版 **630 页**草案（9/10），需跨过 **60 票**程序门槛；新版针对「非去中心化」DeFi 运营者、预测市场与信用合作社条款做了改动，路径仍不明确。Coinbase CEO Armstrong 与 Grayscale 均表示**无论投票结果如何，美国加密规则都会推进**。英国方面，上议院支持数字资产战略、政府投票受挫。([CoinDesk](https://www.coindesk.com/policy/2026-09-10-new-clarity-act-text-tweaks-defi-credit-union-provisions-but-road-ahead-for-bill-remains-murky) / [Bitcoin Magazine](https://bitcoinmagazine.com/news/house-of-lords-backs-uk-crypto-bill))
- **宏观**：8 月核心 CPI 环比 **+0.3%** 高于预期，长端收益率升至 **22 年新高**，CME FedWatch 显示交易员认为下周 FOMC 后利率**更高**的概率约 **85%**（即紧缩倾向仍在）。CoinShares 认为短期受压，但如果美国财政部长债回购持续失效，「bazooka 式」更大规模干预反而可能成为中期强力催化，强化 debasement 叙事。([Bitcoin Magazine / CoinShares](https://bitcoinmagazine.com/news/bitcoin-has-unusual-mix-says-coinshares))

## 六、安全与工具

- **Liquid 侧链 $320M 事件（本周最大安全事件）**：9/6 约 **4,000 BTC**（约 $320M、占联邦钱包 ~4,200 BTC 余额的 95%）被自称白帽的行为者提走，根因是底层 **Elements 软件的范围证明（range proof）验证缓存漏洞**。Blockstream 紧急发布 **Elements v23.3.4**（加固定 cache key）并确认桥节点已打补丁后，对方归还 **3,400 BTC**（当时约 $270M），截至 9/7 仍有 **约 598 BTC（~$46M）** 未归还；**Blockstream 拒绝支付赎金**，公开要求归还。Liquid 于 9/10「不带交易」恢复出块，peg in/out 仍暂停。Galaxy Research 称此事凸显比特币侧链/桥的新型网络威胁。([Cointelegraph](https://cointelegraph.com/news/liquid-network-resumes-block-production-after-320m-exploit) / [The Block](https://www.theblock.co/news/ecosystems/2026-09-11-return-the-bitcoin-blockstream-refuses-ransom-demand-for-remaining-600-btc-from-liquid-exploit-414247))
- **Trezor 第三方平台 Brevo 被入侵**：攻击者拿到 Brevo（邮件营销平台）账号后，**冒用 Trezor 自有域名**向 **347,000** 名订阅者群发钓鱼邮件（主题伪装成「Critical Security Alert: STM32 Entropy Vulnerability」，诱导输入钱包助记词）。Trezor 在 20 分钟内于 DNS 层下线涉事域名，约 2,500 人在此之前点击。此前 ShipMonk 供应链泄露已波及 11,742 + 约 67,000 名美国客户。BitBox、CoinTracking 用户同样被针对。([Bitcoin Magazine](https://bitcoinmagazine.com/news/trezor-reveals-another-data-breach) / [TechCrunch](https://techcrunch.com))
- **Revolut 客户数据泄露**：据 The Block，攻击者伪造政府域名发出请求，导致客户 KYC 与比特币交易数据外泄。单一来源，**[待核实]**。([The Block](https://www.theblock.co/news/business/2026-09-12-revolut-says-customer-kyc-bitcoin-transaction-data-exposed-after-fake-request-from-govt-domain-414516))
- **量子攻击资源基准腰斩**：研究者把攻击比特币/以太坊所需关键运算的量子资源基准**降低一半**，意味着此前对「量子威胁时间表」的估算可能偏乐观。同期 CryptoSlate 指出钱包最大的攻击面仍是**物流/供应链数据**而非密码学本身。([The Block](https://www.theblock.co/news/ecosystems/2026-09-10-researchers-halve-quantum-resource-benchmark-for-key-operation-in-bitcoin-ethereum-attack-414121))
- **其他**：Symbiosis 跨链桥被攻击，桥接比特币退出通道受影响；$245M 加密盗窃案主犯认罪（[Bitcoin Magazine](https://bitcoinmagazine.com/news/ringleader-in-bitcoin-theft-guilty)）；**欧盟对加密钱包厂商设定 24 小时漏洞披露期限**，单一来源 **[待核实]**。

## 结语

本周把「比特币生态的风险在哪里」这个问题回答得很清楚：**不是密码学，而是软件栈和供应链**。Liquid 事件中，Elements 一个范围证明缓存的 key 设计缺陷就搬空了联邦钱包 95% 的余额——4,000 BTC 的移动量与「共识被破坏」的观感几乎等同，尽管比特币主链毫发无损。同一周 Trezor 的钓鱼入口也不是硬件钱包的固件，而是第三方邮件营销平台。对持币者而言，可行动的结论依旧是那几条老话：自持密钥、对任何「紧急安全提醒」类邮件零信任、把桥接资产当成独立的风险敞口而不是「比特币」。

技术侧的正向信号在 BIP 层：BIP-346 OP_TXHASH 入库补齐 covenant 工具箱，BIP-332 把**陈旧块变成可观测信号**，前者关乎能做什么，后者关乎网络是否健康——两者都指向「让共识层的能力与可观测性同时变强」这个长期方向。市场侧，Strategy 三年来首次卖币是本周期最值得记住的一件事：当最大的杠杆买家开始把「永不卖出」重新定义为「从来不是规则」，比特币的机构叙事就从单向累积进入了主动资产负债管理阶段。

— Youmoo（㕛木）

*Solid as teak.*
