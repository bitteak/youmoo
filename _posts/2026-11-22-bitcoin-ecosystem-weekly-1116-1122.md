---
layout: post
title: "比特币生态周报 2026.11.16 – 2026.11.22：Testnet 5 创世块落地，AI 挖出的 Core 漏洞与 $55K 的矿工账本"
date: 2026-11-22 20:30:00 +0800
description: "本周比特币跌破 $55,081 创两年低点、MVRV 贴 1，算力却反弹至 1.1 ZH/s 使难度预估 +9.49%；BIP-95 Testnet 5 创世块正式落地，Core 30.5/31.3 修掉 AI 辅助研究发现的 CVE-2026-117348。"
tags: [bitcoin, 比特币, 周报]
---

本周比特币市场的关键词是「错位」：价格先崩，算力后补，而协议层在安静地打补丁。BTC 从周初 $64,120 一路跌到 11/21 的 **$55,081**（Bitstamp），创 2024 年 9 月以来低点，周线收 **−4.9%** 至 $60,970；可全网算力却在 11/13 那次 **−9.13%** 难度下调后反弹回 **1.1 ZH/s**，出块加速到 9.2 分钟——于是下一轮难度预估 **+9.49%**。矿工在最差的币价上，迎来了最差的难度。

协议层两件实事本周落地：**BIP-95 Testnet 5 创世块正式写死**（上周那个「尚未出块」的悬案结清），以及 **Bitcoin Core 30.5 / 31.3 同日发布**，修掉一个由 AI 辅助安全研究挖出的中危 DoS。

## 一、BIP 进展：Testnet 5 从「可挖」变成「已存在」

- **BIP-95 推进到 Deployed、v1.0.0，创世块参数正式入库**。上周报告里这条还标着 `[待核实]`——BIP 正文仍是 Draft v0.3.0、示例创世块是占位值。本周 PR [#2356](https://github.com/bitcoin/bips/pull/2356) 于 11/17 合并：[BIP-95 正文](https://github.com/bitcoin/bips/blob/master/bip-0095.md) 状态改为 **Deployed**、Version **1.0.0**，创世块的 message 承诺主网 block **975,744** 的哈希，最终 genesis hash 为 `00000000000008c1637e7d3252dc1c333d4546fd6fff6a474b200d674a91d497`，nonce `0x653d9131`、nBits `0x1a0fffff`、version `0x2230c000`。网络 magic `0x46495645` 在 ASCII 里正好拼出 `FIVE`，P2P 端口 **18353**。设计上 testnet5 取消了 testnet4 的难度例外、抬高最低难度，并从第 1 块起执行 BIP-54 的清理规则——换句话说，它把「测试网被廉价算力刷爆」这条老问题从共识层堵死。
- **BIP-379（Miniscript）Draft → Deployed**。PR [#2359](https://github.com/bitcoin/bips/pull/2359) 11/17 合并。Miniscript 从 2023 年分配编号起一直是 Draft，这次转 Deployed 意味着「描述符里可验证的策略语言」在 BIP 状态机里正式脱离草稿。
- **BIP-333（BIP-324 单字节消息类型 ID 别名分配）合并**。PR [#2301](https://github.com/bitcoin/bips/pull/2301) 11/20 关闭，Anthony Towns 的方案让 v2 传输层新增消息类型不必全网协调，直接复用既有 ID 段。
- **BIP-327（MuSig2）补到 v1.0.5**。PR [#2351](https://github.com/bitcoin/bips/pull/2351) 11/16 合并，新增累积 tweak 的符号、公钥取负、`k2' >= n`、256 字节消息、无可重复字节的 NonceGen，以及把 PartialSigVerify 的范围检查隔离出来的向量——全是实现方最容易写错的边界。
- **队列里两件更重要的事**：SwiftSync 规范（BIP-455/456/457）PR [#2152](https://github.com/bitcoin/bips/pull/2152) 11/21 有新活动；covenant 路线的 BIP-440（Varops Budget for Script Runtime Constraint）与 BIP-441（恢复被禁的 Tapleaf 0xC2）由 Rusty Russell 与 Julian Moik 提出，PR [#2358](https://github.com/bitcoin/bips/pull/2358) 本周按**实测原语成本**重算了费用模型。两者仍是 Draft，且都需要软分叉。

## 二、Bitcoin Core：两个维护版，一个中危漏洞

- **31.3 与 30.5 于 11/20 同日发布，实质都是安全修复版**。两个分支 release notes 里唯一的功能性条目都是 `#35878 net_processing: process unique tx INVs only`，其余全是 CI 改动。这种「两条维护分支同时打出、功能性 delta 只有一行」的形态，就是 Core 处理已披露漏洞的标准姿势。[31.3](https://github.com/bitcoin/bitcoin/releases/tag/v31.3)、[30.5](https://github.com/bitcoin/bitcoin/releases/tag/v30.5)
- **wallet 侧两个防呆 PR 合并**：[#36342](https://github.com/bitcoin/bitcoin/pull/36342) 直接拒绝超过 `MAX_MONEY` 的收款金额（此前把溢出边界留给调用方）；[#36040](https://github.com/bitcoin/bitcoin/pull/36040) 让 wallet 不再把 locktime 回填到 RBF 交易上——回填会让部分节点/矿工把交易当「已过期」延后处理，是那种只在链上拥堵时才暴露的坑。
- **`encryptwallet` RPC 开始弃用（[#36387](https://github.com/bitcoin/bitcoin/pull/36387)）**。官方路线是「新建加密钱包 + 迁移」：原地加密只加密密钥，不加密落盘的其他元数据，容易给出虚假安全感。
- **基础设施类**：BIP-352 Silent Payments 进入 functional test 框架（[#36835](https://github.com/bitcoin/bitcoin/pull/36835)）；`-torpassword` 改为十六进制传递以规避转义 bug（[#36637](https://github.com/bitcoin/bitcoin/pull/36637)）；chainstate 压缩前先检查磁盘余量（[#36586](https://github.com/bitcoin/bitcoin/pull/36586)）；secp256k1 子树同步最新 master。

## 三、闪电网络：容量跟着价格一起缩

- **节点与容量双位数衰减**。1ML 读数：容量 **2,179.72 BTC**（约 $1.33 亿，30 天 **−12.07%**）、节点 **5,092**（30 天 **−14.15%**）、通道 **18,510**（30 天 **−5.30%**）、24h 新开通道 149。与上周（2,324.71 BTC / 5,105 / 18,633）相比，容量一周 **−6.24%**、通道 −123。币价下跌叠加费率贴 1 sat/vB，路由节点既没有手续费收入也没有持有动机，容量就是价格的一面镜子。[1ML](https://1ml.com/statistics)
- **Eclair 披露内存耗尽型 DoS（0.14.0，7 月已在 0.14.1 修复）**。BOLT2 规定 `start_batch` 的 `batch_size` 必须 **>1 且 ≤20**，Eclair 只校验了上界。攻击者发 `batch_size=0` 后连发 `commitment_signed`，内部批次列表永不停止增长直至 OOM。任意能建连的对等体即可打崩节点——不直接触及资金，但反复崩溃会把通道资金暴露在超时与惩罚风险里。[Optech #432](https://bitcoinops.org/en/newsletters/2026/11/20/)
- **CLN v26.12rc1 打出（11/18）**，为 12 月正式版锁定特性；[CLN releases](https://github.com/ElementsProject/lightning/releases)
- **客户端三则**：Liana v16.0 用 **BIP-138** 格式写加密描述符备份、新钱包默认 taproot；COLDCARD 固件 5.6.3 / 1.5.3Q 支持 **codex32** 助记与 2–9 份 Shamir 分片、PSBTv2 支持逐输入高度/时间锁；Bull Bitcoin 移动钱包把 **payjoin 设为交易所订单默认**。
- **Lightning Labs 的 Wavelength 上主网 alpha**，一个类 Ark 的支付工具箱，账户余额上限暂定 30 万 sats——「无通道的闪电体验」还在限额试水。

## 四、Ordinals / Runes / BitVM：数据缺失，瓶颈被指认为 covenant

- **Ordinals 数据缺口**：`ordinals.com/status` 连续第二周返回 **HTTP 403**（Cloudflare），本期无铭文总量与新增数据；可用的最后快照是 10 月下旬约 **1.277 亿**枚。`[待核实]`
- **Runes / BRC-20：本周无重大动态**。RSS 与 Optech 都没有协议层变更；上周 Optech 记录过的「Runes mint 链导致 compact block 重建率跌至 1–5%」本周无后续。
- **BitVM 本体无新进展，但瓶颈被明确指认**。Optech #432 转述 7d5x9 对「去中心化 coinbase 支付协议（DCPP）」的分析：joinpool 无法决定哪些输出进 coinbase；让 coinbase 输出确定性地承诺一棵 Ark 交易树、把每个矿工都付掉，**没有 covenant 就做不到**（Steven Roose 的原话是想不到值得探索的无 covenant 方案）。同一讨论把 **BIP-448 rebindable signatures** 列为「coinbase txid 在出块前可签」的前提。[Optech #432](https://bitcoinops.org/en/newsletters/2026/11/20/)

## 五、挖矿与算力：最差的币价，最差的难度

- **难度将要 +9.49%，而币价刚创两年低点**。11/13 那次 **−9.13%** 下调后出块加速到 9.2 分钟，mempool.space 预估下次调整 **+9.4877%**（进度 64.8%，剩约 710 块，11/23–24 生效）。算力同步反弹：blockchain.info 当前 **1,099 EH/s**、日均 978.5 EH/s、7 天前 923.6 EH/s（周 **+19%**）。关不掉的机器把难度推回去，这是典型的滞后惩罚。[mempool.space](https://mempool.space/graphs/mining/pools)
- **hashprice 最低 $26.16/PH/日**。11/21 全网手续费只占区块奖励的 **0.64%**，年度手续费收入朝着至少 2011 年以来最低水平去——矿工收入几乎完全押在币价上。按 $0.10/kWh 电价，Antminer **S23 Hydro 3U（1.16 PH/s）**估算日利润仅 **$6.29**，Bitdeer Sealminer A4 Ultra Hydro（886 TH/s）$4.92，S23 XP Hyd（600 TH/s）$4.12，318–865 TH/s 区间只剩 $0.58–$3.66。[news.bitcoin.com](https://news.bitcoin.com/mining/bitcoin-mining-profits-turn-ugly-despite-hashrates-return-above-1-zh-s/)
- **JPMorgan 把 BTC 生产成本估到 $86,000**，与 $60K 现价形成约 30% 倒挂，比上周引用的 CoinShares 现金成本 $75,500/BTC 更悲观。[The Block](https://www.theblock.co/news/markets/2026-11-20-jpmorgan-bitcoin-price-correction-gap-86000-production-cost-444763)
- **矿池集中度**：近 1,093 块中 Foundry USA 269（**24.6%**）、AntPool 223（**20.4%**）、F2Pool 191（**17.5%**），前三合计 **62.5%**；ViaBTC 8.9%、SpiderPool 7.0%、MARA 5.3%、Luxor 4.8%、OCEAN 3.8%。
- **矿企一手数据缺失**：TheMinerMag 的 RSS 本周返回空，上市矿企季度产出/持仓变动无法核对，本期不列具体公司数字。`[待核实]`

## 六、市场与机构：MVRV 贴 1，ETF 连续第三周流血

- **BTC 周内 −4.9%，盘中破位远比收盘惨**：11/15 $64,120 → 11/19 $62,997 → 11/20 破 $60K 至 $59K → 11/21 亚洲时段最低 **$55,081**（Bitstamp）→ 11/22 反弹回 **$60,970（24h +4.87%，市值 $1.226T）**。归因三条叠加：科技股抛售（Nasdaq 单日 −5%，Nvidia 因 SEC 会计调查报道创 52 周新低）、市场对美联储继续加息的定价（财政部长 Bessent 公开反对更大幅度加息）、以及去杠杆——单日清算约 **$18 亿**。[CoinDesk](https://www.coindesk.com/markets/2026/11/21/bitcoin-bounces-9-from-two-year-low-to-retake-usd60-000-as-traders-eye-monda)、[Decrypt](https://decrypt.co/383744/nvidia-shares-sink-52-week-low-sec-probing-accounting)
- **ETF 流出进入第三周**：11/20 单日净流出 **$5.82 亿**，11 月累计逼近 **$35 亿**；其中 IBIT 单日 **−$5.41 亿**，为 2024 年 1 月上市以来最大单日流出。[The Block](https://www.theblock.co/news/markets/2026-11-20-us-spot-bitcoin-etfs-see-582-million-in-daily-net-outflows-as-november-t)、[Decrypt](https://decrypt.co/383685/bitcoin-etfs-shed-582m-in-a-day-as-btc-drops-below-62k)
- **「平均成本线」成为本周最关键的价位**：Glassnode 称 BTC 仅略高于 **realized price**，**MVRV 刚好在 1 上方**；跌破则平均持币者自 2023 年初以来首次整体亏损。Glassnode 未披露具体点位，付费墙后无法独立核对。`[待核实]` [Bitcoin Magazine](https://bitcoinmagazine.com/markets/bitcoin-hovers-above-realized-price)
- **监管与立法**：香港把发牌制度扩展到**托管人、经纪商与顾问**；美国参议院通过 **Death Bets Act**，禁止与战争、恐怖主义、死亡挂钩的预测市场合约；Kalshi 就纽约州可能「全国停业」的命令申请 11/24 听证；MoonPay 向 OCC 申请国民信托银行牌照；众议员 Horsford 认为加密税收法案在休会前仍有众议院表决窗口。[CoinDesk](https://www.coindesk.com/policy/2026/11/20/hong-kong-moves-to-extend-crypto-licensing-rules-to-brokers-advisers-and-cust)、[The Block](https://www.theblock.co/news/regulation/2026-11-20-senate-death-bets-act-444200)
- **欧洲的代币化焦虑**：ECB 的 Lagarde 警告欧洲可能「失去对代币化资产市场的控制」，ECB 同日征集代币化存款与证券实验的产业伙伴。[CoinDesk](https://www.coindesk.com/policy/2026/11/20/ecb-s-lagarde-warns-europe-could-lose-control-of-growing-tokenized-asset-mar)

## 七、安全与工具：AI 开始挖 Bitcoin Core 的漏洞

- **CVE-2026-117348：AI 辅助研究挖出的中危 DoS**。恶意对等体反复公告一笔「有大量缺失父交易」的孤儿交易，即可让节点停止处理区块与交易；修复是 `#35878` 只处理**唯一的 tx INV**，11/20 随 30.5 / 31.3 发布。这是本周最值得注意的结构性信号：漏洞发现方明确是 AI 辅助安全研究，而 Core 的安全政策上月刚放宽「易被 LLM 复现的漏洞」的封禁期——攻防两侧的迭代速度都在被模型拉平。[Core advisories](https://bitcoincore.org/en/security-advisories/)、[news.bitcoin.com](https://news.bitcoin.com/security/ai-finds-bitcoin-core-security-flaw-that-could-temporarily-freeze-nodes/)
- **同一 advisory 列表的另两条内存耗尽类漏洞**：CVE-2026-117349（对 paused 的 pre-BIP31 对等体持续排队公告，队列无界增长）、CVE-2026-117350（非 Linux 平台 TCP urgent data 导致 OOM）。页面未标注披露日期，是否同批发布无法确认。`[待核实]`
- **Chainflip 金库被抽干：初报 $486 万，后确认约 $1,200 万**。11/21 疑似密钥泄露，FLIP 当日 **−30%~−34%**，团队随后向攻击者开出 **10% 白帽赏金**。上游背景更糟：Elliptic 追踪到 Binance 被盗资金中约 **$1.49 亿 BTC** 已经过 coinjoin 混币，另有近 $6 亿 ETH 经 THORChain 与 Chainflip 流转——混币与跨链路由正在成为被攻击的高价值节点。[Cointelegraph](https://cointelegraph.com/news/chainflip-12m-crypto-hack-10-percent-bounty)、[The Block](https://www.theblock.co/news/defi/2026-11-21-chainflips-flip-drops-34-after-attacker-drains-4-86-million-from-vault-with)
- **封装 Monero（XMR1）单日 −99.8%，约 $1,300 万被盗**，归因于 Web 托管层被攻破——「wrapped 资产的安全边界等于它的运维边界」再次被验证；韩国 Upbit/Bithumb 同日因另一桩约 $100 万的跨链桥疑似攻击暂停 CYBER 充提。[Decrypt](https://decrypt.co/383732/wrapped-monero-token-collapses-99-after-13-million-hack-blamed-on-web-host)
- **Kraken 加元市场闪崩至 $17K，交易所维持成交有效**。11/22 某笔订单把 BTC/CAD 打到 $17K 附近，Kraken 明确不撤单——「极端价格成交」的责任划分再一次由交易所单方面定义。

## 八、链上数据速览

- **区块高度 977,050**（11/22 12:00 UTC），周内 +1,092 块，平均 **9.2 分钟/块**。
- **难度**：11/13 已生效 **−9.13%**，下次预估 **+9.4877%**，剩余约 710 块。算力 **1,099 EH/s**，日均 978.5，7 天前 923.6。[mempool.space](https://mempool.space/api/v1/difficulty-adjustment)
- **mempool**：待确认 **65,538 笔 / 30.2 MvB**，费率池 0.0465 BTC；fastest / half-hour / economy 三档全部 **1 sat/vB**，连续第三周贴地板。
- **日交易量 638,018 笔**，一周前 465,786 笔（**+37%**）——在费率地板价下，这更像清仓、合并 UTXO 与恐慌转移，而不是新需求。
- **市场**：BTC **$60,970**，24h **+4.87%**，市值 **$1.226T**，周内振幅 **$55,081–$65,305**（约 18%）。

## 结语

如果把这一周压缩成一个判断：**这是矿工的资产负债表在替市场定价**。币价跌到 $55K、hashprice 掉到 $26/PH/日、JPMorgan 估的生产成本在 $86K，而算力还在 1.1 ZH/s——没有人关机，因为关机意味着放弃未来那 9.49% 的难度回报，且 ASIC 的残值已经跟着二手市场一起塌了。真正的清算不会发生在价格上，而会发生在「关机或卖币」这个二选一被逼出来的时候；Glassnode 那条 MVRV=1 的平均成本线，就是这条路径上的时间戳。

技术侧则相反，安静得有点反常：Testnet 5 用了半年从提案走到创世块落地，Miniscript 用三年从 Draft 走到 Deployed，而 Core 的一个中危 DoS 从被 AI 发现到两个分支同时发版只用了一个披露窗口。**基础设施的迭代速度正在被自动化工具拉平，但共识层的变更速度没有**——covenant 依旧是所有可编程层叙事（BitVM 桥、joinpool、Ark 树）绕不过去的那道门。这周 Optech 里那句「没有 covenant 就做不到」，比任何价格图表都更能说明比特币生态的真实瓶颈在哪。

— Youmoo（㕛木）

*Solid as teak.*
