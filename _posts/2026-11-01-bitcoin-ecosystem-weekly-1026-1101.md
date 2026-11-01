---
layout: post
title: "比特币生态周报 2026.10.26–11.01：史上最大 $63 亿被盗，Core 跳过 32.0 直接发 32.1"
date: 2026-11-01 20:30:00 +0800
description: "Binance 热钱包被盗约 63 亿美元（朝鲜 TraderTraitor）、Bitcoin Core 32.1/31.2/30.4/29.5 同日发布并带走三个安全修复、32.0 整个版本被跳过、算力单周回落 4.6%、ETF 单周净流出 2.02 亿美元、BTC 报 77,857 美元。"
tags: [bitcoin, 比特币, 周报]
---

窗口：2026-10-26 → 2026-11-01（UTC）。区块高度 974,123。BTC $77,857（周 −3.7%）。闪电网络节点 5,906 / 通道 19,109。

## 本周主线：一次交易所失陷，和一次被跳过的版本号

协议层这一周的主题是「补作业」。Bitcoin Core 在 10 月 28 日同一天放出 32.1、31.2、30.4、29.5 四份版本，一次性带上三个安全修复；而原本该是主角的 **32.0 因为修复合入晚于打 tag 的时间点，被官方直接跳过、从未正式发布**。这在 Core 的发布史里极不常见——版本号按 major 递进，23 年里没有几个 major 是被吞掉的。

真正决定市场情绪的则在链下：Binance 热钱包在 10 月 29 日 20:05 UTC 起被抽干约 **63 亿美元**，是加密史上最大单次被盗。TRM Labs 与 Chainalysis 都把矛头指向朝鲜的 TraderTraitor 组织（2025 年 Bybit 15 亿美元案的同一批人），FBI 10 月 31 日公开确认。约 30 亿美元被发行方与合作伙伴冻结，Binance 另备 63.4 亿自有资金兜底，11 月 1 日起按阶段恢复提币、先开 BTC。

BTC 的走势是教科书式的「事件驱动 + 快速钝化」：10 月 29 日还冲到 $81,274，事件曝光后 24 小时内跌到 $77,839，10 月 31 日低见 $77,223，随后在 $77.9K 附近横住。ETF 周五单日净流出 6.43 亿美元，把周一到周四的 4.408 亿净流入全部抹平还倒亏。

矿业端的故事仍是「用 AI 的现金流养矿」：IREN 拿已部署的 GPU 做 3.63 亿美元设备再融资，HIVE 以 9.0% 固定利率借 1.29 亿美元去买 GB200 NVL72。

## 一、BIP 进展

**BIP-139「Wallet Metadata Export Format」进入 Optech 视野。** BIPs #2130 合入的草案规定用 JSON 导出钱包账户、output script descriptors、签名器信息、标签、交易、coins 与 PSBT，目的是让钱包之间可以迁移、并且恢复那些「种子备份恢复不出来」的元数据。规范明确禁止在 mainnet 导出里夹带私钥或助记词——它是密钥备份的补充，不是替代。见 [Optech #429](https://bitcoinops.org/en/newsletters/2026/10/30/) 与 [BIP-139](https://github.com/bitcoin/bips/blob/master/bip-0139.mediawiki)。

**BIP-352 Silent Payments 补齐测试向量。** #2337 合入了 taproot key-path spend 带 annex 的向量，BIP352 也补了 1.1.2 changelog；同一批还有 #2323（malleated p2pkh pubkey extraction 向量）与 #2339（把「共识有效性」写进 scanning requirements）在 open。这个方向的推进方式很典型：不是改协议，而是把边界写死，让多签钱包、PSBT 流程的各个实现不必各自解释。见 [BIPs commits](https://github.com/bitcoin/bips/commits/master)、[#2337](https://github.com/bitcoin/bips/pull/2337)。

**BIP-374 边界测试向量合入**（#2335，10/27），给静默支付的 DLEQ 证明补边界用例，与 #2337 属同一批清理。

**新提案继续排队。** BIP-458「Half-Aggregation of BIP-340 Signatures」（#2205，11/1 仍有更新）、BIP-333「BIP324 one-byte message type ID alias」（#2301）、「Unspendable Internal Keys for Wallet Policies」（#2340）都在 open。签名聚合是 2026 年最拥挤的赛道，Half-Agg / FROST / DahLIAS / CISA 四条线并列，谁也没有收敛迹象。

**BIP-323 开始影响节点行为。** Core 31.2 / 30.4 把 BIP-323 为矿工预留的 24 bit nVersion extra nonce 空间，从 BIP9「未知软分叉」告警里排除。这条对做 ASIC 和矿池的人是实打实的：BIP-320 给的 16 bit 不够用，已经有设备从 nTime 里抠 7 bit 当 nonce，BIP-323 直接把 nVersion 扩到 24 bit，header-only 挖矿才不用频繁 roll nTime。见 [BIP-323](https://github.com/bitcoin/bips/blob/master/bip-0323.mediawiki)。

## 二、Bitcoin Core 开发

**四版齐发，三个安全修复。** 这是本周技术含量最高的一块，Optech #429 有完整描述：

- `#36665`：`select()` socket 后端在接收队列满时会暂停读取，但仍然监听 exceptional condition；对端发 TCP urgent data 就能触发额外读取、绕过队列上限，把内存打爆。Windows / macOS / BSD 受影响，Linux 用的是另一套 socket 后端所以不受影响。
- `#36667`：发送缓冲超限后加 20 分钟超时断开。原本 ping 超时会兜住慢读节点，但自称 BIP31 之前协议版本的对端可以躲开 ping 机制，长期挂着连接慢慢堆积公告。新超时与协议版本无关。
- `#36669`：undo 文件 32 位偏移溢出。undo 数据可能比对应区块数据还大，文件超过 4 GiB 偏移回绕就会覆盖前面的数据，之后一次 reorg 节点就停机，只能用修好的版本 reindex 才能恢复。修复把偏移扩到 64 位，Windows 上同时改用 64 位文件定位调用。披露文档认为实际利用不现实（要挖几千个特制区块并精确摆位），但 32 位系统和 FAT32 存储的节点仍受影响。

见 [Optech #429](https://bitcoinops.org/en/newsletters/2026/10/30/) 与 [v32.1 release](https://github.com/bitcoin/bitcoin/releases/tag/v32.1)。

**32.0 被跳过。** 三个修复合入晚于 32.0 打 tag，官方干脆不发 32.0，改发 32.1。release notes 写明：按常规节奏，两周后会披露 30.0 的中高危漏洞 3 个、32.1 的低危漏洞 0 个。29.x 及更早版本已经 EOL。见 [32.1 release notes](https://github.com/bitcoin/bitcoin/blob/master/doc/release-notes/release-notes-32.1.md)。

**安全政策的第二次收紧。** Antoine Poinsot 在 Bitcoin-Dev 邮件列表宣布：对「易发现漏洞」（例如一条 LLM prompt 就能挖出来的那种），不再等下一个大版本 + 严重性分级 embargo，而是回补到**每一个**维护中的分支、尽快出点版本、同时发 advisory。本周披露的三个漏洞就是这个新分类下的第一批。上周我们刚写过这条政策的重写，一周之内它就产出了第一批实际动作——这个速度本身说明 LLM 挖洞的压力有多大。

**32.1 的功能面**：BIP-434 的 P2P 版本 70017（握手阶段新增 feature 协商消息，取代「每加一个特性就 bump 一次版本号」的历史做法）、mempool 驱动的费率估算、PSBT v2 默认开启、watch-only 钱包导出、更快的区块验证。tx 与 txout-spender 索引仍兼容，但需要重建才能省磁盘。

**其他合并的 PR**：`#36714` net_processing 移除 `m_wtxid_relay_peers`（wtxid relay 早已是默认）、`#36594` 让孤立交易重考更细粒度、`#35818` 修 bloom 过滤器的未定义尺寸计算、`#29843` 允许 `-acceptnonstdtxn=1` 在测试网接受非标准脚本。

## 三、Layer 2 / 闪电网络

**1ML：通道数继续净减。** 节点 5,906（上周 5,925，−19）、通道 19,109（上周 19,498，**−389**）、24h 新通道 200、24h 更新通道 14,906、channel countdown 1,182。通道数连续第四周净减，但更新活跃度维持高位——存量在动、增量在退的格局没变。容量读数 64,802（页面未标单位，按 BTC 理解 `[待核实]`）。见 [1ML](https://1ml.com/statistics)。

**CLN 自引用通道公告 DoS 披露。** 影响 CLN 25.02–26.04。`channel announcement` 里两个 node ID 相同也能通过校验，写进 gossip store 后加载时同一节点被加两次，触发 gossipd 的 no-duplicates 断言直接崩溃；更麻烦的是这条消息存在磁盘上，每次重启都会复崩，只能手工删掉，光升级不够。攻击者只需自己控制一个 2-of-2 输出、用那两个密钥加一个新 node key 签名，成本仅为链上手续费；旧版 CLN 不会崩，还会帮忙转发。修复在 26.04.1（#9082：要求 `node_id_1 < node_id_2`），BOLTs #1333 把同样的接收方要求写进 BOLT7。

**Eclair 0.14.6 安全版本。** 修 splicing force-close 与 on-the-fly funding 的费用追踪，官方明确「恶意对端可利用其中部分问题」。行为变化：非零确认通道改为选「资金交易已确认或在后端 mempool 中」的最新 commitment，并随出块与广播重新评估；anchor CPFP 计入未确认祖先；新增默认开启的 `require-confirmed-inputs-for-splicing`。

**LND v0.21.5-beta / v0.20.6-beta 转正**：commitment feerate 修复、TLV 解析的过量内存分配、SQL 数据库死锁、SQL 节点启动清理加速。

**LDK 两个隐私 / DoS 修复**：`#5314` 修 onion message 转发里按候选 SCID 反推「未公开通道 ↔ 链上资金输出」的隐私泄漏（现在拒绝为未公开通道解析真实 SCID，alias 仍可用）；`#5412` 修 LSPS2 JIT 通道里重复 request ID 把全服务 pending 计数刷到 1,000 上限、从而拒绝其他客户端的 DoS。另有 CLN `#9627` 让 xpay 在选路前先扣掉 BOLT4 的 1,300 字节 onion 上限，避免「路由找得到、onion 装不下」。

**Babylon × Aave V4 的背景值。** 10 月 14 日的 ARFC（原生 BTC 作抵押、Taproot vault + BaBe 证明，争议成本 $37.82 vs BitVM2 的 $14,211）以 299,743 AAVE 赞成、0 反对通过温度检查，进入 Snapshot 阶段。这是窗口外的旧闻，但它是本周「让 BTC 生息」叙事唯一的定价锚 `[待核实：投票最终结果]`。

## 四、Ordinals / Runes / BitVM 可编程层

**本周无新叙事，链上活动仍在地板。** Ordiscan 快照：1.2772 亿条铭文（127,723,867）、34.1 GB 数据、累计手续费 4,465 BTC；Runes 板块市值约 1.11 亿美元、24h 成交约 42.3 万美元。8 月起 Runes / BRC-20 / Ordinals 相关交易已回落到减半前水平，平均单笔手续费约 $0.40。截至 10 月 20 日那周 BTC NFT 销售额约 913 万美元。这些数字只支持一个结论：低基数上的稳定，谈不上复苏。见 [Ordiscan](https://ordiscan.com) 与 [TokenPost](https://tokenpost.com/news/investing/38281)。

**BitVM：本周无重大动态。** 窗口内没有新的 BitVM / BitVM2 实现、签名方加入或主网桥参数变更。上一轮实质进展仍是 Babylon BaBe 把争议成本压到两位数美元、Lichen 用 Groth16 + BitVMX 做无合作退出。

**但需求侧出现了反向变量。** 纳斯达克上市的 Next Technology Holding（NXTT）董事会以「交易所安全 + 量子威胁」为由，授权卖出或抵押其全部 5,833 BTC（约 4.5 亿美元）。这家公司市值只有约 780 万美元、股价 $5.30，持仓是市值的 50 倍以上，且它的币并不在 Binance。对 L2 / BitVM 这类「让 BTC 生息」的叙事，这是逆风：当持有者开始把「托管风险 + 后量子」写进公司金库决议，任何需要把币挪出去生息的方案都要先回答同一个问题。见 [CoinDesk](https://www.coindesk.com/markets/2026/10/31/a-nasdaq-listed-company-may-sell-usd450-million-bitcoin-citing-binance-hack-) 与 [CryptoBriefing](https://cryptobriefing.com/next-technology-holding-may-sell-bitcoin)。

## 五、挖矿与算力

**算力单周回落，难度几乎不动。** 下次难度预估 **+0.12%**（进度 19.6%，剩 1,621 块），上一轮是 +5.54%；blockchain.info 现时算力 1,006 EH/s，24 小时前 1,104 EH/s、一周前 1,055 EH/s（周 −4.6%）。手续费侧极弱，mempool 里 fastest 只有 2 sat/vB。见 [mempool.space](https://mempool.space/api/v1/difficulty-adjustment) 与 [blockchain.info](https://api.blockchain.info/charts/hash-rate)。

**矿池集中度（近一周 1,054 块）**：Foundry USA 26.6%、AntPool 20.4%、F2Pool 16.7%、ViaBTC 9.2%、Luxor 4.9%、SpiderPool 4.6%、SECPOOL 4.3%、MARA 4.1%、OCEAN 3.7%。前三家合计 63.7%，与上周结构基本一致。

**IREN：3.63 亿美元 GPU 设备再融资（10/28）。** Wingspire Equipment Finance 牵头六家放款方（Eldridge、Silver Point 为主要承诺方），以已部署并产生收入的 GPU 服务器与网络设备作抵押，把已投入的资本换回流动性，抵押结构由多年期客户合同支撑。相对其 FY2027 的 250–300 亿美元 capex 计划这只是零头，但它示范了「矿企把 AI 资产证券化」的融资路径——不卖币、不发新股，拿设备做 ABS。见 [Business Wire / Yahoo](https://finance.yahoo.com/news/iren-wingspire-equipment-finance-complete-131700873.html)。

**HIVE：BUZZ HPC 借 1.29 亿美元、固定利率 9.0%（10/27–28）。** 80% loan-to-cost，用于购买 1.65 亿美元的 NVIDIA GB200 NVL72 集群，对应与 Cohere 的三年 2.25 亿美元 TCV；公司称今年已签 6 亿美元 GPU 云 TCV，本次融资不发新股。见 [SEC 8-K](https://www.sec.gov/Archives/edgar/data/1720424/000106299326005585/exhibit99-1.htm)。

**电力侧**：Fortitude Mining 的 15 MW 内布拉斯加 Aurora 站点开始以可中断负荷参与 SPP 批发市场（需求响应）。「矿场当电网调节器」这条路，正在从概念变成标准动作。见 [TheEnergyMag](https://theminermag.com/news)。

## 六、市场与机构

**BTC $77,857，周 −3.7%。** 路径很清楚：10/25 收 $80,811 → 10/29 冲 $81,274（事件前最后高点）→ 10/30 跌至 $77,839 → 10/31 低点 $77,223 → 11/1 回到 $77,859（24h +0.40%），市值 1.565 万亿美元。跌幅集中在事件后的 24 小时，随后横盘——没有出现 2018 年式的连环清算。见 [CoinGecko](https://www.coingecko.com/en/coins/bitcoin)。

**ETF：周五单日 −6.43 亿美元，全周 −2.02 亿美元。** 10/26–10/29 净流入 4.408 亿，10/30 一天吐光并倒亏：IBIT −2.337 亿、FBTC −2.010 亿、ARKB −1.296 亿、GBTC −0.533 亿、BITB −0.257 亿，其余 7 只零流量、没有一只净流入。这是 6 月以来最大单日流出，成交量放大到 63.5 亿美元（约前一日的三倍），净资产跌破 1,000 亿至 981.4 亿。10 月整月 −5.159 亿（9 月为 +26.5 亿）。见 [CryptoSlate](https://cryptoslate.com/bitcoin-etfs-643-million-outflows-weekly-reversal/) 与 [FinanceFeeds](https://financefeeds.com/bitcoin-etf-outflows-of-643-million-on-30-october-end-a-four-day-inflow-streak-ibit-and-fbtc-led/)。

**Strategy Q3 净利 195 亿美元。** 优先股股东批准按日派息，分析师认为这修复了融资结构、为恢复买币铺路。同期 Coinbase Q3 净利同比 +66% 但营收不及预期、月活下降，股价随加密股一起走弱。见 [The Block](https://www.theblock.co/news/business/2026-10-29-strategy-q3-net-income-preferred-daily-dividends-432141) 与 [Bitcoin Magazine](https://bitcoinmagazine.com/news/coinbase-falls-armstrong-sets-up-new-share)。

**Tether Q3：利润 15 亿美元、超额储备接近翻倍至 80 亿。** 在风险资产抛售周里，稳定币发行方的现金流反而是最抗跌的一环。见 [Cointelegraph](https://cointelegraph.com/news/tethers-excess-reserves-nearly-double-to-8b-as-q3-profit-hits-15b)。

## 七、安全与工具

**Binance 被盗约 63 亿美元，史上最大。** TRM Labs 定位首笔异常转账在 10/29 20:05 UTC，热钱包跨多链被抽干。TRM 与 Chainalysis 归因朝鲜 TraderTraitor，FBI 10/31 确认并要求 DeFi 社区封禁相关 BTC / ETH / SOL 地址。约 30 亿美元已被发行方与合作伙伴冻结（Circle 单笔冻结 8.23 亿），Binance 另备 63.4 亿自有资金（含 50 亿同币种持仓）覆盖损失，11/1 起按阶段恢复提币、先开 BTC。攻击路径中 EIP-7702 委托被用于取得热钱包执行权，但业界共识是「签名系统被攻破」才是根因——EIP-7702 只是让一次扫空变得更容易。CoinDesk 的复盘点出了那个悖论：中心化让这次被盗成为可能，也正是中心化救回了 30 亿。见 [CoinDesk](https://www.coindesk.com/business/2026/10/31/the-usd6-3-billion-binance-hack-paradox-centralization-made-the-hack-possib)、[Cointelegraph 复盘](https://cointelegraph.com/news/recap-binances-record-63b-hack-unfolded)、[Decrypt](https://decrypt.co/382306/binance-hack-everything-you-need-to-know)。

**Chainalysis 自身被入侵，攻击者用了「offensive agentic techniques」。** 客户姓名与邮箱被访问。这是本周第二个「AI 代理作为攻击工具」的公开案例——第一个是 8 月那波 AI 挖洞潮（CLN、Core 的 LLM 可发现漏洞）。安全行业自己成了样本。见 [The Block](https://www.theblock.co/news/business/2026-10-31-chainalysis-says-hacker-using-offensive-agentic-techniques-accessed-its) 与 [Cointelegraph](https://cointelegraph.com/news/blockchain-investigator-chainalysis-hit-by-cybersecurity-incident)。

**Trezor Safe 5 疑似硬件植入（经销商 CryptoBilis）。** 与 2025 年 Ledger 那批同源渠道风险，官方已发警告。硬件钱包只从官方直营买——这条规则今年已经第三次被验证。见 [The Block](https://www.theblock.co/news/ecosystems/2026-10-30-trezor-reports-suspected-hardware-implant-432196)。

**Name.com 注册的十余个 DeFi 站点被劫持，损失约 13.8 万美元**；**Polymarket 因第三方服务商被攻破损失 265 万美元后恢复交易**。两起都不是 BTC 协议层问题，但都说明「前端 / DNS / 第三方」仍是加密用户资产的主要暴露面。见 [The Block](https://www.theblock.co/news/defi/2026-10-31-hackers-hijack-a-dozen-defi-websites-all-registered-with-name-com-and-steal) 与 [The Block](https://www.theblock.co/news/defi/2026-10-29-polymarket-exploit-2-5-million-cancel-only-mode-432158)。

## 八、政策与监管

**11 月 3 日中期选举成了 CLARITY Act 的生死线。** 法案 2025 年 7 月众院以 294–134 通过，参院 2026 年 9 月 15 日的 cloture 表决 49–50 失败（需 60 票），119 届国会 2027 年 1 月 3 日到期。Kalshi 押注民主党夺参院 64%、夺众院 90%，而参院谈判主力 Angela Alsobrooks 直言，民主党掌权后「绝对不会」优先推 CLARITY。跛鸭会期是最后窗口，三个未解议题是伦理条款（是否覆盖总统及其家族）、稳定币奖励（银行 vs 加密）、以及 DeFi 前端与非法金融的边界。见 [The Block](https://www.theblock.co/news/regulation/2026-10-28-crypto-braces-for-potential-shift-in-congressional-oversight-after-midterms-431949) 与 [TokenPost](https://www.tokenpost.com/news/regulation/45263)。

**Bessent 提「财政部协调 SEC / CFTC」（10/27，Ripple Swell）。** 称参院结果「令人失望」，财政部有「很多召集权」，可以推动两家监管机构出 best practices 与 guardrails、解决加密企业开户难——但未宣布任何具体规则、指令或时间表。立法停摆时，监管靠行政协调补位，这个模式在 2027 年会看得更清楚。见 [TokenPost](https://www.tokenpost.com/news/regulation/42474)。

**Binance 事件迅速政治化。** Trump 称「正在调查」，CFTC 主席借机主张离岸交易所应受美国监管，两党在选举前互相归责。安全事件正在被直接换算成立法动能——这对 CLARITY 的跛鸭窗口可能是唯一的好消息。见 [The Block](https://www.theblock.co/news/regulation/2026-10-30-trump-looking-into-binance-hack-calls-grow-for-crypto-rules-432236) 与 [Decrypt](https://decrypt.co/382285/binance-hack-why-offshore-exchanges-need-us-oversight-cftc-chair)。

**SEC 起诉两家公司涉 1.3 亿美元加密交易计划（10/30）。** 属于执法而非立法，但方向上与「市场结构立法缺位 → 执法补位」一致。见 [Bitcoin Magazine](https://bitcoinmagazine.com/news/sec-charges-companies-130-million-crypto)。

## 九、链上数据速览

- **区块高度**：974,123
- **日交易量**：642,252（一周前 709,817，−9.5%）
- **mempool**：52,987 笔 / 21.5 MvB / 待确认手续费合计 0.0477 BTC
- **推荐费率**：fastest 2、half-hour 1、economy 1 sat/vB
- **难度**：下次调整预估 +0.12%（进度 19.6%），上轮 +5.54%
- **闪电网络**：节点 5,906 / 通道 19,109 / 容量 64,802（1ML 读数，单位按 BTC 理解 `[待核实]`）

## 结语：安全的边际成本正在重新定价

这周把两件事同时摆上桌：一是**基础设施层的安全投入已经进入边际收益递减区**——Core 三个漏洞里两个是「对端可以低成本打爆你的内存」，一个是「4 GiB 文件偏移回绕」，都是长期存在、只有在 LLM 把审计成本压到接近于零之后才被系统性挖出来的东西；二是**托管层的安全边际几乎没变**——Binance 的 63 亿美元不是因为某个新奇的密码学攻击，而是签名系统被攻破＋热钱包有执行权。前者在加速修，后者在原地。

对做硬件的人，值得多看一眼 BIP-323：把 nVersion 从 16 bit 扩到 24 bit 做 extra nonce，是「header-only 挖矿」在物理层的直接需求，背后是矿机把 nTime 抠到 7 bit 的既成事实。协议为了迁就硅，正在让出元数据位——这类妥协在 AI 加速器那边同样在发生（HBM 容量换 die 面积、NoC 拓扑换良率），只是比特币这条链把它写进了 BIP。

市场层面，$77K 的 BTC 与 2 sat/vB 的费率是一对很有意思的组合：矿工收入里手续费占比接近可忽略，减半后的安全预算问题重新浮上来，而 ETF 的资金流已经证明它对单个交易所事件极度敏感。下周看三件事：11/3 选举结果对 CLARITY 的影响、Binance 提币全面恢复后是否有二次挤兑、以及 11 月中旬那次难度调整会不会重新转负。

— Youmoo（㕛木）

*Solid as teak.*
