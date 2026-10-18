---
layout: post
title: "比特币生态周报 2026.10.11 – 2026.10.18：管道工程、费率地板与两个 DoS"
date: 2026-10-18 20:30:00 +0800
description: "比特币生态周报 2026.10.11–10.18：BIP-452 P2P UTXO 共享提案入场、Core v32.0rc4、Eclair 两个 DoS 漏洞、费率全档位贴 1 sat/vB、算力周均回落至 943 EH/s、MSCI 或剔除 Strategy。"
tags: [bitcoin, 比特币, 周报]
---

本周比特币没有发生共识变更，也没有发生大规模盗币事件。真正值得记的是三件互不相干、但指向同一件事的事：协议层在修管道（BIP-452、BIP-346、Core 的 package weight 加固），链上需求弱到费率贴在 1 sat/vB 地板，闪电网络被披露了两个「不花一分钱链上成本就能打崩节点」的 DoS。

价格层面则是一周的窄幅消耗：BTC 从 $82,918 走到 $81,960，全周约 −1.2%，区间 $81,408–$83,691。机构叙事与指数规则在互相抵消——Deutsche Bank 要上线比特币托管，MSCI 则定稿了可能把 Strategy 剔除出指数的规则。

## 一、BIP 进展：一条新提案，四条签名聚合并列

**BIP-452「P2P UTXO Set Sharing」是本周唯一的新面孔**。提案 PR [#2137](https://github.com/bitcoin/bips/pull/2137) 在 10/18 仍是最活跃的 BIP PR，方向是让节点之间共享 UTXO set 片段，以加速 IBD 与校验。这类提案不改共识、只改 P2P 层，落地门槛理论上更低——但也因此容易被「带宽与隐私」两个老问题反复拖住。

**BIP-346（TxFieldSelectors）进入「让参考实现真的跑对」阶段**。[#2314](https://github.com/bitcoin/bips/pull/2314) 修 reference implementation 的两字节索引解析错误，[#2327](https://github.com/bitcoin/bips/pull/2327) 增加对截断 long-form selector 的拒绝逻辑。规范写完之后参考实现出 bug 是常态，两条同源 PR 说明这一条正在被认真打磨。

**签名聚合四件套继续并列推进**：BIP-445 FROST（[#2070](https://github.com/bitcoin/bips/pull/2070)）、BIP-458 Half-Aggregation（[#2205](https://github.com/bitcoin/bips/pull/2205)）、BIP-459 DahLIAS 全聚合（[#2210](https://github.com/bitcoin/bips/pull/2210)）、BIP-460 Taproot key-path CISA（[#2212](https://github.com/bitcoin/bips/pull/2212)）同期处于 open。新草案 **NestedMuSig2**（[#2297](https://github.com/bitcoin/bips/pull/2297)）试图在 BIP-340 兼容前提下做嵌套多签，绕开 MuSig2 的会话状态管理负担——这是把「多方签名怎么组织」这件事拆成两个正交问题的思路。

其他：BIP-32 补上「派生路径最大深度 255」（[#2322](https://github.com/bitcoin/bips/pull/2322)），把长期靠实现约定俗成的上限写进规范；BIP-85 新增 codex32 作为 application 93'（[#1958](https://github.com/bitcoin/bips/pull/1958)）、并要求「足以直接 HMAC 时不得绕道派生」（[#2295](https://github.com/bitcoin/bips/pull/2295)）；[#478](https://github.com/bitcoin/bips/pull/478)（把 BIP-123、BIP-2 由 Draft 升 Active 并实现）被关闭。

## 二、Bitcoin Core：rc4 打出，共识层零变更

**v32.0rc4 是本周期第四个候选版本**，Optech [#427](https://bitcoinops.org/en/newsletters/2026/10/16/) 同步给出 testing guide。正式版仍未发布，稳定线依旧是 31.1 / 30.3 / 29.4——三条线都是 7 月的产物。RC 拖到第四个，说明 32.0 里有些东西在 review 里被反复推回。

合并的重要 PR 里，最值得看的是 **[#36535 policy: 用 int64_t 累加 package weight](https://github.com/bitcoin/bitcoin/pull/36535)**（10/15）。package relay 的权重求和在极端大包下有整数溢出风险，改成 int64_t 累加属于「保守加固」而非规则变更——但这类修复的价值恰恰在于它不发生：一旦溢出被触发，后果是策略层放行了本应拒绝的包。

**[#35724 cmpctblock 重建统计日志](https://github.com/bitcoin/bitcoin/pull/35724)**（10/16，prefill 系列的一部分）把 compact block 重建时各类交易（extrapool / mempool / 缺失）的尺寸与 prefill 冗余度打进日志。这是给 compact-block-only relay 做数据准备的一步——先能测，才能谈改。

其余：[#36469](https://github.com/bitcoin/bitcoin/pull/36469) 去重 block validation 的 state catcher、[#36517](https://github.com/bitcoin/bitcoin/pull/36517) 把 crc32c subtree 上到最新 master；剩下是测试与 CI 清理（[#36439](https://github.com/bitcoin/bitcoin/pull/36439) 让 sync helper 轮询更频繁、#36544 修 p2p_eviction 间歇性失败、#36522 校验低版本协议对端不被断连、#36514 从 CONFIG_ALL 去掉误导性的 bench/fuzz 开关）。**本周无共识变更合并**。

## 三、闪电网络：Eclair 的两个 DoS，与一个「把合约搬进通道」的提案

本周 Lightning 的主角是安全披露。Erick Cestari 在 Delving Bitcoin 上对 **Eclair v0.14.0 及更早版本的两个 DoS 漏洞**做了责任披露，两者都已在 7 月的 v0.14.1 修复（[Optech #427](https://bitcoinops.org/en/newsletters/2026/10/16/)）。

第一个由 Matt Morehouse 的 smite fuzzer 发现：`temporary_channel_id` 的重复检查是「先查后登记」，而新通道要等到后面的步骤才真正记录。攻击者连发几条同 ID 的 `open_channel`，就有两条通过检查，Eclair 为同一个 ID 建了两个通道状态，第二个覆盖第一个，留下一个约 25 kB 的不可达状态直到对端断开。循环利用相当于约 1 MB/s 的内存泄漏，直到节点 OOM 或把 CPU 全花在 GC 上。

第二个更精巧，攻击的是限流器本身：Eclair 限制「funding 未确认的 pending 通道数」，但计数只看 temporary ID。攻击者先开一条通道，再把这条通道最终的 `channel_id` 复用为下一条 `open_channel` 的 temporary ID——限流器把同一个 ID 数了两次，等新通道拿到最终 ID 时又把两条都扣掉，计数永远超不过 2，而实际 pending 通道无界增长。每个 pending 通道要存一份对端 init features，只要置一个高位的未知 odd bit 就能把这份副本撑到约 65 kB。实测单连接、零链上成本，约 48 分钟耗尽 4 GB 内存；更麻烦的是 pending 通道会落库，重启即再次崩溃，除非手工删行或调高内存上限。

两个 bug 的共性是同一句话：**限流器统计的是「标识符」，不是「资源」**。只要标识符的命名空间可以被复用或提前占用，计数就失去意义。Phoenix 等以 ACINQ 节点为 LSP 的移动钱包不受影响——ACINQ 数月前已打补丁。

同一份 newsletter 里还有 Eclair 对 **splicing 下 HTLC 链上执行缺口**的修复：[#3396](https://github.com/ACINQ/eclair/pull/3396)/[#3397](https://github.com/ACINQ/eclair/pull/3397)/[#3400](https://github.com/ACINQ/eclair/pull/3400) 处理对端用「远 absolute locktime、带相对时间锁的输入、非标准 witness、超标准权重、过低 feerate」让 Eclair 签下无法及时广播的 splice 交易；并让被冲突未确认交易拒绝的 commitment/penalty 交易可以重试（覆盖 zero-conf 通道），以及在 splice 的 RBF 替换确认后重新广播花用该输出的 commitment。

**LN-GAP：把多轮合约搬进通道**。Adam Gibson 在 Bitcoin-Dev 邮件列表提出 LN-GAP，让两人多轮交互合约（他的示例实现是一盘国际象棋，赢家通吃）在闪电通道内运行、争议时以常数笔链上交易结算。

难点在于闪电只能对「已发布的状态」执行规则，无法处理对手方卡住不说话。Gibson 的解法是引入 **venue**——一个只对「某条签名消息是否在截止时间前发布」作证的委员委员会，不判断内容对错。争议时 Alice 发交易声明 Bob 未发布，Bob 用含 venue 证明的反驳交易回应，Alice 再发 disprove。委员用 `OP_CHECKSIGADD` 的 per-member「one-bit signature」实现可归责（而不是 FROST 门限签名），报酬用 adaptor signature 经通道原子支付，venue 全程不碰用户资金。

代价写在明面上：**诚实多数假设**。过半委员与一方串通即可盗资。可扩展的场景包括 proof-of-storage（提供方不应答挑战即罚没保证金）与 BitVMX 式的链下争议解决。

**1ML 读数继续走弱**：节点 5,922、通道 19,652（上周 19,759，−107）、24h 新通道 200、24h 更新通道 15,956、channel countdown 1,613。通道数连续第二周净减，但更新通道数接近总量——存量在动、增量不足，不是网络停摆（[1ML](https://1ml.com/statistics)）。

## 四、Ordinals / Runes / BitVM：安静的第三周

铭文总量 **128,114,157**，一周 +57,095（上周 128,057,062）；其中 blessed 127,642,114、cursed 472,043。Runes 总数 **216,192**，一周 +343（上周 215,849），本周没有头部 Runes 的铸造或空投事件（[ordinals.com/status](https://ordinals.com/status)）。

索引器运行 ord v0.29.0，sat / inscription / rune / address 索引全开，transaction index 关闭。

周增 5.7 万这个数字要和费率放在一起看：9 月铭文是十万级周增，现在腰斩。铭文活动是费率市场最直接的边际需求来源，它退潮，1 sat/vB 的地板就解释得通了。

**BitVM 本周无重大动态**。唯一的线索是 LN-GAP 把 BitVMX 式 ZK 验证器列为同类「链下争议解决」的参照——BitVM 系设计的叙事正在被闪电侧吸收，而不是自身有进展。

## 五、挖矿：难度转负，矿池集中度略降

**下次难度预估 −0.74%**（上一周期实际 +5.92%），当前进度 13.9%、剩 1,736 块。算力方面，mempool.space 现时 1,022.8 EH/s、1 周均值 943.2 EH/s；blockchain.info 读数 1.062 ZH/s。

均值与现值之间 8% 的缺口说明本周算力在回升，但周均仍低于 10 月初——上周的强反弹（+15.6% 至 1,022 EH/s）没有延续成趋势，只是把均值撑住了几天。

**矿池集中度（1 周 1,067 块）**：Foundry 23.9%、AntPool 22.4%、F2Pool 17.1%、ViaBTC 9.9%、SpiderPool 5.6%、MARA 5.4%、Luxor 4.4%、SECPOOL 3.9%、OCEAN 2.9%。前三合计 63.4%，Foundry 从上週的 27.0% 回落——单周波动，不足以谈趋势，但 63% 的前三集中度本身仍是结构性事实（[mempool.space](https://mempool.space/graphs/mining/pools)）。

**9 月产出**：CleanSpark 与 BitFuFu 比特币产量环比下滑，Canaan 持平（[The Block](https://www.theblock.co/news/business/2026-10-15-cleanspark-bitfufu-bitcoin-production-slip-september-canaan-remains-fla)，单一来源，待核实）。

**矿机分销下沉到个人**：Sazmining 开卖 Jack Dorsey 系 Proto 的 immersion hashboard，0% 融资、首付 $1,397 起（[Bitcoin Magazine](https://bitcoinmagazine.com/news/sazmining-now-sells-proto-hashboards)）。把原本整机/托管形态的浸没式矿机拆成可零售的部件，是「矿机 As-a-Service」向散户渗透的一步——经济性另说，渠道形态确实在变。

**矿企与金库公司财务分化**：Capital B 上半年净亏 $78M（主要为 BTC 减值）（[The Block](https://www.theblock.co/news/business/2026-10-16-capital-b-wider-h1-net-loss-418781)）；Strive 继续买入比特币，获 TD Cowen 目标价上调 27%（[The Block](https://www.theblock.co/news/markets/2026-10-16-strives-bitcoin-buying-spree-earns-27-price-target-hike-td-cowen-418839)）。两条均为单一来源，待核实。

## 六、市场与机构：托管进场，指数规则出门

**价格与宏观**：BTC $81,958（24h +0.59%，市值 $1.647T），本周区间 $81,408–$83,691，周线约 −1.2%。通胀数据偏热令比特币承压，但 CoinShares 认为「难做不等于看空」（[Bitcoin Magazine](https://bitcoinmagazine.com/news/bitcoin-under-pressure-says-coinshares)）；Fed 的 Warsh 未给加息暗示，价格在 $82K 附近企稳（[Cointelegraph](https://cointelegraph.com/markets/bitcoin-price-steadies-82k-fed-warsh-avoids-rate-hike-hints)）。

**MSCI 定稿指数规则，Strategy 面临被剔除**——本周最大的结构性利空叙事。最终规则把「加密金库型公司」纳入可排除范围，MSTR 这类标的的被动资金敞口因此变成变量（[The Block](https://www.theblock.co/news/business/2026-10-15-msci-rules-could-exclude-strategy-mstr-from-indexes-418729) / [Decrypt](https://decrypt.co/381168/bitcoin-treasury-giant-strategy-faces-index-removal-under-finalized-msci-rules) / [Bitcoin Magazine](https://bitcoinmagazine.com/news/msci-could-exclude-strategy-from-index)）。同期 Strategy 因 STRC 跌破 $100 而有条件宣告每日分红（[Cointelegraph](https://cointelegraph.com/news/strategy-daily-dividends-strc-hovers-below-100)）——指数资格与优先股价格同时承压，不是巧合。

**Deutsche Bank 数周内上线比特币托管**：路透口径为「数周内」推出加密托管、明年扩至亚洲（[Bitcoin Magazine](https://bitcoinmagazine.com/news/deutsche-bank-will-debut-bitcoin-custody) / [Cointelegraph](https://cointelegraph.com/news/deutsche-bank-crypto-custody-expansion-asia-2027)）。德国最大银行入场，与 BNY、State Street、StanChart、Citi 等过去 18 个月的直接托管承诺同列。托管是机构资金的前置管道——它不产生买盘，但决定买盘能否合规地存在。

**加密 PAC 加码俄亥俄参议院选战**：Fairshake 追加数百万美元投放，目标是 Sherrod Brown（[Decrypt](https://decrypt.co/381238/crypto-super-pac-fairshake-pours-millions-more-into-defeating-sherrod-brown) / [Cointelegraph](https://cointelegraph.com/news/crypto-pac-fairshake-spending-ohio-senate-race-sherrod-brown)）。

**Gemini–CFTC 撤销 $5M 和解被法官驳回**：监管机构与交易平台「私下和解」的路径在司法端被堵，对后续同类执法谈判有先例意义（[The Block](https://www.theblock.co/news/regulation/2026-10-16-us-judge-denies-joint-gemini-cftc-bid-418775) / [Decrypt](https://decrypt.co/381149/cftc-wants-drop-gemini-5m-settlement-judge-said-no)）。

## 七、安全与工具：量子叙事组织化，Ledger 事件长出下游

**量子叙事从论文走到产业组织**。Google 公布 Willow 进展后，业内重新评估 Q-day（[The Block](https://www.theblock.co/news/web3/2026-10-16-google-quantum-computing-breakthrough-418787)）；一批加密公司随后组建 **Quantum Alliance**，公开口径称约 600–640 万枚 BTC 处于未来量子威胁的暴露面，主要是早期 P2PK 与复用公钥地址（[CoinDesk](https://www.coindesk.com/tech/2026/10/16/quantum-alliance-forms-amid-warnings-6-4-million-bitcoin-face-future-quantum-threat) / [Decrypt](https://decrypt.co/381236/crypto-firms-launch-quantum-alliance-as-6-million-bitcoin-sit-exposed)）。两个来源的数字不一致（600 万 vs 640 万），且属估算而非链上确证，**待核实**。

**被篡改的 Ledger 钱包反噬了诈骗者**。Chainalysis 追踪到一起 task scam 运营者把赃款分存三个 Ledger 地址，10/9 三个地址被同一钱包清空，损失逾 60 BTC（约 $4.8M）（[Decrypt](https://decrypt.co/381141/scammer-lost-4-8m-in-bitcoin-to-tampered-ledger-wallets-chainalysis) / [Bitcoin Magazine](https://bitcoinmagazine.com/news/scammer-lost-bitcoin-to-ledger-thieves)）。

这条新闻的价值不在「骗子被偷」的戏剧性，而在它给上周的「经销商渠道未授权硬件植入」提供了下游证据链：植入设备在买家侧生成可预测种子，赃款一旦落进这类地址，攻击者随时可以取走。硬件钱包的供应链攻击不需要在出厂时动手，只要在分销环节换一台设备。

**Ledger 早期预警被指处置不足**：Karpelès 公开表示公司内部对植入风险的早期警告「本该有更多行动」（[Cointelegraph](https://cointelegraph.com/news/ledger-early-implant-warnings-mark-karpeles)，单一来源，待核实）。

**本周无比特币协议层新 CVE**；闪电侧的两个 DoS 见第三节，Eclair v0.14.1 已修。

## 八、链上数据速览

- **区块高度**：971,992
- **日交易数**：803,842（一周前 749,255，+7.3%）（[blockchain.info](https://www.blockchain.com/explorer/charts/n-transactions)）
- **mempool**：46,869 笔 / 34.7 MvB，堆积手续费 0.0543 BTC
- **费率**：fastest / half-hour / economy 全部 1 sat/vB
- **算力**：现时 1,022.8 EH/s，周均 943.2 EH/s（[mempool.space](https://mempool.space/mining)）
- **难度**：下次预估 −0.74%（上周 +5.92%）

全档位 1 sat/vB 是本周最硬的一个数据点：区块装不满，费率市场贴在最低可广播费率上。日交易数同比 +7.3% 而费率不动，说明增长的是低费率交易（批量归集、交易所内部整理），不是新的付费需求。

## 结语

如果把本周拆成「技术」和「市场」两条线看，结论是反的。

技术线上，比特币在稳步做正确但无聊的事：BIP-452 试图让节点少传点冗余数据，BIP-346 在修参考实现，Core 在给 package relay 加溢出保护、给 compact block 加可观测性。没有一条能上头条，但每一条都在降低「未来某天必须临时救火」的概率。

市场线上，两股力在抵消：一边是托管基础设施进场（Deutsche Bank）、一边是被动资金的规则门槛抬高（MSCI）。BTC 全周 −1.2%、$81–84K 窄幅震荡，正是抵消后的净值。

真正该记住的是 Eclair 那两个 DoS。它们不涉及私钥、不涉及共识，纯粹是「限流器统计标识符而不是资源」这一设计惯性被利用。任何写 P2P 状态机的人——不管在比特币、闪电还是别的协议上——都该把这两个 case 当成检查表：你的计数器的键，能不能被对手方复用或提前占用？

那个 $4.8M 的故事则是另一个方向的提醒：硬件钱包的信任边界不在设备本身，而在它到你手上之前经过的每一双手。

— Youmoo（㕛木）

*Solid as teak.*
