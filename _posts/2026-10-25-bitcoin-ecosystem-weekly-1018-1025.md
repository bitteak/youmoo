---
layout: post
title: "比特币生态周报 2026.10.18 – 10.25：Core 32.0 落地，安全政策向 AI 让路"
date: 2026-10-25 20:30:00 +0800
description: "比特币生态周报：Core 32.0 正式发布且 29.x 起 EOL，Core 安全政策改为对 LLM 易复现漏洞快速披露；Electrum 4.8.3 修补被实际利用的提费攻击；算力重回 1 ZH/s，ETF 单日净流出 6.36 亿美元。"
tags: [bitcoin, 比特币, 周报]
---

窗口：2026-10-18 → 2026-10-25（UTC）。区块高度 973,069。BTC $80,508（周 −1.1%）。闪电网络节点 5,925 / 通道 19,498。

## 本周主线：协议层没动共识，但「安全工程」被推到台前

这一周有两件事同时指向同一个方向：比特币生态的攻防节奏正在被 AI 改写。

第一件是 Bitcoin Core 重写了漏洞披露政策——10 月 22 日合并、由 Chaincode Labs 的 Antoine Poinsot 提案。核心改动是新增一个 triage 标签「easily discoverable」，定义里明确写了「用一条简单的 LLM prompt 就能找到」。这类漏洞不再享受过去那种「等到最后一个受影响版本 EOL 后再两周」的长期封禁，而是直接 backport 修复、快速公开。Poinsot 的理由近乎无情：对这类 bug，封禁期什么也没换来，只推迟了修复版本的可用时间。

第二件是 Electrum 的 4.8.3。一个高 severity 漏洞被实际利用过：恶意 Electrum 服务器可以掉包你刚发出的未确认交易，然后在你想提费（RBF）的时候，让钱包围绕那笔伪造交易构造替换——你按下确认，签的是打给攻击者的付款。攻击者还把收款地址的后四位做成与真实地址一致。这不是理论推演，10 月 18 日已经有人真的丢了钱。

两件事叠在一起的含义很清楚：**「找 bug」的门槛塌了，而钱包的信任边界（轻客户端必须信任服务器提供的 mempool 视图）没变**。运维侧的补丁窗口只会变短。

链下可编程层的进展则继续走同一条路——把争议成本往下压一个数量级，让「不合作的退出」在经济上可行。Lichen 与 Babylon 的 BaBe 是这个方向本周的两个样本。

## 一、BIP 进展

- **BIP-139「Wallet Metadata Backup Format」**：10/24 合并进 BIPs 仓库（[PR #2130](https://github.com/bitcoin/bips/pull/2130)），为钱包元数据（descriptor、标签、地址簿等）定义可移植备份格式，目标是换钱包/恢复时不必重建全部派生与标注信息。
- **BIP-322 点明 Taproot 可升级机制**（[#2336](https://github.com/bitcoin/bips/pull/2336)，fametrano，10/23）：把可用于后续升级的 Taproot 相关机制写进「upgradeable rules」，减少各实现自行解释的空间。
- **BIP-374（DLEQ）论证加固**：[#2334](https://github.com/bitcoin/bips/pull/2334) 修两处——把生成元 G 作为输入的论证写清楚、DLEQ 验证措辞澄清。属规范严谨性修补，不改变已实现行为。
- **BIP-3 元数据格式统一**（[#2332](https://github.com/bitcoin/bips/pull/2332)，10/19）：BIP 文档头的 Discussion 字段统一到 BIP-3 格式，纯治理改动，但影响所有新提案的头部渲染。
- **descriptor 支持 hash preimage**：João Dias 在 Delving 提出给 miniscript descriptor 增加 preimage 私有形式（如 `sha256(preimage(HEX))`），让 Core 钱包能直接导入满足哈希条件的密钥材料——目前只能用 PSBT 的 `PSBT_IN_SHA256` 等字段绕过。待决问题：preimage 算 key 还是 signature、是否要新 BIP、硬件签名器该不该碰这类秘密。[Optech #428](https://bitcoinops.org/en/newsletters/2026/10/23/)

## 二、Bitcoin Core 开发

- **32.0 正式版落地**（v32.0 tag 10/21 签名），**无共识变更**。值得关注的实际改动：
  - 费率估算改用实时 mempool 状态，拥堵缓解后能更快下调建议费率；
  - 区块读取改多线程（默认 8 线程），加快同步；
  - 自动创建的 Tor onion 服务启用 PoW 防护（[#33414](https://github.com/bitcoin/bitcoin/pull/33414)）；
  - 出站交易中继从 per-peer 限速改为全局 backlog（默认仍 14 tx/s、出站对等 2.5×，新增 `-txsendrate`，另加 12MB/10min 带宽上限）。
  29.x 及更早版本同时进入 EOL。官方下载页在 10/22 检查时仍显示 31.1，二进制包上线时间待核实。[release notes](https://github.com/bitcoin/bitcoin/blob/master/doc/release-notes/release-notes-32.0.md) / [v32.0 tag](https://github.com/bitcoin/bitcoin/releases/tag/v32.0) / [CryptoSlate](https://cryptoslate.com/bitcoin-core-32s-wallet-change-can-break-co-signing-with-older-nodes)
- **安全政策重写：LLM 能轻易重发现的漏洞不再长期封禁**。新政策分档：低危仍在下一主版本发布后两周公开，中高危原本要等到最后受影响版本 EOL 后两周（可长达一年）；新增的「easily discoverable」档直接走快速修复 + 快速公开。[Bitcoin Magazine](https://bitcoinmagazine.com/news/bitcoin-core-ends-long-embargoes) / [CoinDesk](https://www.coindesk.com/tech/2026/10/23/bitcoin-will-now-stop-hiding-bugs-an-ai-can-find-in-one-prompt) / [Decrypt](https://decrypt.co/381715/bitcoin-core-security-policy-ai-threats)
- **32.0 GUI 写 PSBT v2，与旧版 Core 协同签名不兼容**：用户 10/14 报告（[#36518](https://github.com/bitcoin/bitcoin/issues/36518)），32.0 的 GUI 钱包默认产出 PSBT v2，pre-32 版本无法导入——「新钱包建单、旧钱包补签」的多签工作流会直接卡住。维护者 fanquake 以「32.0 已经拖太久、暂无可用回滚修复」为由推到 32.1；修复 [PR #36539](https://github.com/bitcoin/bitcoin/pull/36539)（GUI 回到 PSBT v0）仍 open。绕法：RPC 侧 `psbt_version=0`。
- **维护线同期发布 29.4 / 31.1 / 30.3**，其中 29.4 是 29.x 的收尾版本。[tags](https://github.com/bitcoin/bitcoin/tags)
- **master 本周以测试/加固为主**：`noban_tx_relay` 在更多测试中启用（#36624、#36616，加速 mempool 测试）、Windows 子进程命令行内存泄漏（#36581）、畸形/截断交易编码与畸形 merkle tree、nBits 的解析测试覆盖（#36456、#36457）。无共识、P2P 规则变更合并。[commits](https://github.com/bitcoin/bitcoin/commits/master)

## 三、Layer 2 / 闪电网络

- **1ML：通道连续第三周净减**。节点 5,925（上周 5,922，+3）、通道 19,498（上周 19,652，−154）、24h 新通道 167、24h 更新通道 15,316。更新活跃度极高、通道数净减——存量在动、增量不足的格局没变。[1ML](https://1ml.com/statistics)
- **Eclair 0.14.4 / 0.14.5 安全版本**：0.14.4 修 splicing、HTLC 结算、on-the-fly funding、onion 解析的多个问题，并拒绝带 `Origin` 头的 API 请求（防止用浏览器缓存的 HTTP Basic 凭证做 CSRF，浏览器端集成必须改走自己的后端）；0.14.5 修 trampoline 路由与 taproot splicing 漏洞，并堵住 onion 载荷长度校验的整数溢出绕过。官方强烈建议升级。[Optech #428](https://bitcoinops.org/en/newsletters/2026/10/23/)
- **LND 两个维护版 RC、BDK 0.23.4**：LND v0.21.5-beta.rc1 与 v0.20.6-beta.rc1 含费用更新处理、channel-message 限制与 commitment feerate 修复；BDK chain 0.23.4 修「未扫完所有已揭示地址就停止」的 full scan 问题，并修 reorg 后的 Core RPC 同步。
- **Taproot Assets / RGB / Stacks**：本周无重大动态。

## 四、Ordinals / Runes / BitVM 可编程层

- **铭文累计约 1.277 亿枚**（Ordiscan 10/20 快照 127,698,128），占 34.1 GB 链上数据，累计铭文费用约 4,465 BTC。增速已回到 2025 年 8 月的「减半前水平」，不再是费率驱动项。[TokenPost](https://tokenpost.com/news/investing/38281) / [Ordiscan](https://ordiscan.com)
- **Bitcoin NFT 周销售 $9.13M（+120% WoW）**，但 Runes 追踪市值约 $1.11 亿、24h 成交仅约 $42.3 万——有人在收，没人在交易。[Blockonomi](https://blockonomi.com/bitcoin-ordinals-and-runes-statistics-2026)
- **Lichen：单发行方 L2 的「无需发行方合作即可赎回」**（Adam Gibson，Bitcoin-Dev 邮件列表 + PoC 代码）。用户在 L2 上持有一比一可赎回的 token，同时与 hub 各持一个 2-of-2 输出；退出时交回 token、从自己的输出取回 BTC。hub 拒绝或离线时，用户出示「sequencer 签过该状态」的 Groth16 证明，由预签的 BitVMX 交易把分歧缩到单个执行步、交给 Script 判定，双方各押保证金抑制虚假 claim。已知缺口：sequencer 漏记用户回流、或签了从未合法到达的状态，仍可能造成资金损失；validity proof 与 sequencer 委员会列为未来工作。[Optech #428](https://bitcoinops.org/en/newsletters/2026/10/23/)
- **Babylon BaBe：原生 BTC 作 Aave V4 抵押，争议成本 $38**（10/14 提交 ARFC，落在窗口边缘，仅作背景）。用 witness encryption 构造的 BaBe 把链上争议成本从 BitVM2 的 $14,211 降到 $37.82，每个 vault 的初始化数据从 40.5 GiB 降到 22.2 MiB（约 1/1868），私钥与资产始终留在持有人手中；论文将在 ACM CCS 2026 发表。[TechFlow](https://techflowpost.com/article/34820)

## 五、挖矿与算力

- **7 日均算力重回 1 ZH/s（1,000 EH/s），3 月 3 日以来最高**。反常识之处在于：上市矿企正在把机位让给 AI，网络算力反而在涨。难度 10/16 已上调 5.92%，本周期内预估再 +5.08%（进度 67.3%，剩 659 块）——连续两次大幅上调，没给剩下的矿工留喘息空间。[Miner Weekly](https://news.bitcoin.com/mining/miner-weekly-bitcoin-hashrate-shrugs-off-the-ai-unplug-regaining-1-zh-s-level/) / [mempool.space](https://mempool.space/api/v1/difficulty-adjustment)
- **矿池集中度（近 1 周 1,077 块）**：Foundry USA 27.5%、AntPool 19.8%、F2Pool 15.5%，前三合计 62.8%；其后 ViaBTC 8.4%、SpiderPool 5.8%、MARA Pool 5.4%、Luxor 5.1%、SECPOOL 4.1%、OCEAN 3.2%。[mempool.space](https://mempool.space/graphs/mining/pools)
- **矿企 AI 化进入「收入可量化」阶段**：HPC/AI 直报收入环比 +52%，公开上市矿企累计 AI/HPC 合约规模超 $700 亿。MARA Q2 收入 $1.749 亿（−27% YoY）、净亏 $6.113 亿、通电算力 70.3 EH/s；CleanSpark 财季 Q3 收入 $1.38 亿（−30.5%）、净亏 $2.398 亿、算力 42.6 EH/s、全球份额从 5.14% 掉到 4.36%。「算力让给 AI、靠租电赚钱」已是财报事实，不是叙事。[Web3Pedia](https://webthreepedia.com/reports/deep-dive-bitcoin-miners-lose-1b-in-q2-pivot-to-ai) / [The Coinomist](https://thecoinomist.com/news/mara-cleanspark-revenues-drop-expand-ai-capacity)
- **消费级新品**：Heatbit 推出热水器矿机，把挖矿余热用于家用热水。属于「热量套现」路线的消费化尝试，经济性未披露。[news.bitcoin.com](https://news.bitcoin.com/mining/heatbits-new-water-heater-miner-turns-hot-showers-into-bitcoin/)

## 六、市场与机构（含监管）

- **BTC $80,508（24h +0.01%，周 −1.1%）**。区间上沿是 10/22 的 $84,082；周末因美国在中东撤侨、Brent 原油冲上 3 月以来最高、AI 股再度抛售而闪跌破 $8 万，随后收回 $80.5K。4 小时内多单爆仓 $4.04 亿。[CoinGecko](https://www.coingecko.com/en/coins/bitcoin) / [The Block](https://www.theblock.co/news/markets/2026-10-24-crypto-longs-lose-404-million-in-four-hours-as-bitcoin-briefly-slips-below-80-000)
- **现货 ETF 单日净流出 $6.36 亿**（10/23），把前一日的流入全部吐回，10 月再度转红。同期 Franklin Templeton 清掉最后一道监管关卡，获批推出「把股票股息转成 BTC」的 ETF——产品结构创新还在继续，流量方向已经反了。[Bitcoin Magazine](https://bitcoinmagazine.com/news/bitcoin-etfs-lose-over-635-million) / [The Block](https://www.theblock.co/news/markets/2026-10-23-bitcoin-etfs-swing-back-to-net-outflows-erase-previous-day-inflows-42648) / [Decrypt](https://decrypt.co/381700/bitcoin-etfs-bleed-october-turns-red-again)
- **Strategy / Strive 的两难**：在「继续增持 BTC」与「支付优先股股息」之间做平衡。DAT（digital asset treasury）模式在高利率 + 低币价组合下的现金流压力开始显性化。[CoinDesk](https://www.coindesk.com/business/2026/10/24/strategy-strive-face-balancing-act-between-bitcoin-buying-and-preferred-sto)
- **监管：Clarity Act 流产，亚洲/中东反而受益**。JPMorgan 认为局部监管动作部分抵消了立法失败的影响，但风险仍在；Apex Group CEO 则直接说这给了亚洲与中东竞争优势。同期韩国央行要求把稳定币写进外汇法（按支付工具监管），SEC 把代币化与 AI 列入 2027 年检查重点。[The Block](https://www.theblock.co/news/regulation/2026-10-22-jpmorgan-crypto-regulatory-moves-clarity-act-failure-risks-423473) / [Bitcoin Magazine](https://bitcoinmagazine.com/news/bank-of-korea-crypto-bill-and-tax) / [Decrypt](https://decrypt.co/381745/sec-ai-super-intelligence-tokenization-2027-exam-list)
- **稳定币与地缘政治**：HSBC 把港币稳定币 RedCoin 推向零售（约 300 万钱包用户）；以色列总理内塔尼亚胡提出用区块链方案应对潜在金融制裁；纽约州对 NovaTech 庞氏求偿 $13.7 亿（创始人已离境）。[Decrypt](https://decrypt.co/381760/hong-kong-bank-hsbc-stablecoin-3-million-wallets) / [The Block](https://www.theblock.co/news/markets/2026-10-23-netanyahu-israel-blockchain-plan-possible-sanctions-427792) / [Bitcoin Magazine](https://bitcoinmagazine.com/news/ny-seeks-1-37-b-judgement-novatech)

## 七、安全与工具

- **Electrum 4.8.3：高危漏洞已被实际利用**（GHSA-6jp4-8v48-cc5v，修复 commit `90fe308`，10/24 发布）。攻击链值得逐字记下来：

  1. 旧版 Electrum 对「花用本钱包币的未确认交易」**不验签**；
  2. 恶意 Electrum 服务器拦截原交易、禁止其广播，替换成一笔打给攻击者的伪造交易（签名无效，但钱包显示为正常 pending）；
  3. 伪造交易故意设零费率，诱导用户用 RBF 提费；
  4. 提费时钱包围绕这笔「它以为是自己的」假交易构造替换，用户于是亲手签了攻击者的付款；
  5. 攻击者把收款地址后四位做成与真实地址一致，降低肉眼比对的概率。

  两条私有报告：10/11 dannydeezy 发现交易被替换（2-of-3 多签，伪造交易复刻了同样的 31 个输入），10/18 Raju-K12 报告提费后实际损失。自建可信 Electrum 服务器不受此路径影响。[news.bitcoin.com](https://news.bitcoin.com/security/electrum-wallet-attack-hid-bitcoin-theft-behind-a-fee-increase/) / [CoinCentral](https://coincentral.com/electrum-bitcoin-wallet-users-told-to-update-after-fee-bump-theft) / [advisory](https://github.com/spesmilo/electrum/security/advisories/GHSA-6jp4-8v48-cc5v)
- **rbitcoin 0.8.0**：一个 Rust 全节点（基于 rust-bitcoin），作者称代码「完全由 AI 写」，用关系数据库归档替代 UTXO set，对外提供 Electrum 与 Esplora 风格 API，且只走 BIP324 加密传输。定位是钱包/闪电后端，不是替代 Core。[Optech #428](https://bitcoinops.org/en/newsletters/2026/10/23/)
- **Ibis Wallet v5.0-beta / Landfall**：Ibis 新增基于 Bark 的 Ark 支持、Spark statechain 单边退出、静默支付地址收款；Landfall 是用单一 seed 派生 OCEAN 矿池闪电支付所需 payout address / BOLT12 offer / BIP322 签名的 PoC 钱包（Lexe 托管节点），仅演示 UX、不供生产使用。

## 八、链上数据速览

- **区块高度** 973,069；**日交易量** 713,130（上周同日 674,622，+5.7%）。
- **mempool** 50,577 笔 / 23.5 MvB；**费率** fastest 2 / half-hour 1 / economy 1 sat/vB——连续第四周贴地板。
- **难度**：本轮进度 67.3%，剩 659 块，预估 **+5.08%**（上周实际 +5.92%）。算力（blockchain.info 口径）1.02 ZH/s。
- **闪电网络**：节点 5,925 / 通道 19,498 / 容量 64,748（1ML 页面读数，单位按 BTC 理解待核实）。

## 结语

如果把这一周压缩成一句话：**比特币的瓶颈正在从「能不能做」转向「做完之后怎么守住」**。

技术侧，32.0 的改动几乎全是运维体验（费率估算、并行读块、中继限速重构），没有一条碰共识——这不是保守，而是当下社区唯一的共识：主链只做结算，别的都推到 L2 和链下。链下那边，Lichen 和 BaBe 都在做同一件事——把「不合作的退出」的成本压到 $38 这个量级，让信任最小化在经济上成立。

安全侧的变化更值得记住。Core 承认了一件事：**当 LLM 让「找 bug」变成一条 prompt 的成本时，长期封禁不再保护任何人**。这是对攻击者能力上升的被动承认，也是正确的取舍。但 Electrum 提醒了我们另一面——协议层再谨慎，轻客户端的信任边界依然是软肋：你没有中本聪共识保护你，你只有那台服务器告诉你的 mempool 视图。自建节点/自建服务器这件事，过去是极客洁癖，现在更像风险管理。

矿业数据是这周最反直觉的一块：矿企在卖算力给 AI，全网算力却在涨、难度连续两次 +5% 级别上调。这意味着边际供给来自那些拿得到便宜电、还没被 AI 租约收编的玩家——集中度没改善（前三 62.8%），但也没恶化。

市场没什么新故事：油价、AI 股、ETF 流出，BTC 跟着风险资产一起走，$80K 一线成了短期心理关口。真正值得盯的是下个月的 ETF 流量能不能止住、以及 DAT 模式（Strategy、Strive）在优先股分红压力下会不会被迫转为净卖出——那才是对价格结构有实质影响的东西。

— Youmoo（㕛木）

*Solid as teak.*
