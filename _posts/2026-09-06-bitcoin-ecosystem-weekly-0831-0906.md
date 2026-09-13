---
layout: post
title: "比特币生态周报 2026.08.31–09.06：非农重燃加息担忧跌破 $80K，ETF 却创 1 月以来最大单日流入"
date: 2026-09-06 20:30:00 +0800
description: "2026年8月31日至9月6日比特币生态周报：美国非农超预期重燃加息担忧、币价跌破8万美元；现货比特币ETF单日净流入7.31亿美元创1月以来新高；CLARITY法案进入9月表决窗口；Trezor数据泄露扩大6.7万用户；矿工AI转型提速。"
tags: [bitcoin, 比特币, 周报, ETF, 挖矿]
---

# 比特币生态周报（2026-08-31 ~ 2026-09-06）

**本周主线**：$80K 攻防战——美国 8 月非农大超预期，Fed 9 月加息担忧重燃，BTC 周五跌破 $80K；但现货 ETF 在 9/4 录得 **$731M 净流入**（1 月以来最大单日），近三周累计 **$3.8B** 为 2026 最强。立法面：CLARITY Act 进入 9 月表决窗口，全国警长协会撤回反对。安全面：Trezor 数据泄露范围扩大。矿工侧：公共矿工 AI 转型提速。

---

## 一、BIP 进展

- **新草案 ChillDKG（[PR #2227](https://github.com/bitcoin/bips/pull/2227)，9/5 更新）**：Blockstream Research 提交的 FROST 分布式密钥生成（DKG）协议草案，作为 [BIP 445（FROST Signing）](https://github.com/bitcoin/bips/pull/2070) 的配套，评审中、尚无 BIP 编号。
- **BIP-360 P2MR（Pay-to-Merkle-Root，Draft / soft fork）测试与实现加固**：[#2232](https://github.com/bitcoin/bips/pull/2232)（9/4）补充 spend-path 测试向量（此前向量止于构造、无花费路径）；[#2273](https://github.com/bitcoin/bips/pull/2273)（9/2）将 merkle depth 上限设为 128 并替换 ref-impl 中的 validation asserts，改动来自与独立实现的差分测试（16 个官方向量 + 2000 个随机脚本树完全一致）。
- **新草案 rawtr() Output Script Descriptors（[PR #2251](https://github.com/bitcoin/bips/pull/2251)，9/4）**：将 Bitcoin Core 自 24.0 已实现的 `rawtr()` 描述符表达式正式成文（仿 BIPs 381–387 风格）。
- **勘误与澄清批次**：[#2276](https://github.com/bitcoin/bips/pull/2276) BIP-376 Finalizer 应保留 PSBT_IN_WITNESS_UTXO（与 BIP-174 及 Core/Sparrow 等实现一致）；[#2271](https://github.com/bitcoin/bips/pull/2271) BIP-352 澄清 silent payment 地址长度（主网 HRP "sp" 为 116 字符）；[#2258](https://github.com/bitcoin/bips/pull/2258) BIP-93 修正 checksum 选择边界并限制 `ms` 长度；[#1958](https://github.com/bitcoin/bips/pull/1958) BIP-85 增加 Codex32 应用 `93'`。
- **已合并的编辑类 PR**：[#2274](https://github.com/bitcoin/bips/pull/2274) BIP-353 DNSSEC proof 拼写修复（9/3）；[#2270](https://github.com/bitcoin/bips/pull/2270) BIP-441 修正拼写与 changelog 年份（9/1）；[#2268](https://github.com/bitcoin/bips/pull/2268) BIP-450 更新作者邮箱（8/31）。本周无 BIP 状态晋升，无 Activation 变更。

## 二、Bitcoin Core 开发

- **本周无新版本发布**：最新稳定版仍为 7 月的 v31.1 / v30.3 / v29.4 补丁系列。（[Releases](https://github.com/bitcoin/bitcoin/releases)）
- **[#36169](https://github.com/bitcoin/bitcoin/pull/36169)（9/6 合并）Windows HTTP 端口独占**：用 SO_EXCLUSIVEADDRUSE 取代 SO_REUSEADDR，防止端口被劫持/共享（含 QA 验证）。
- **[#36123](https://github.com/bitcoin/bitcoin/pull/36123)（9/5 合并）HTTP 层 DoS 加固**：请求在途时对每连接读取进行限速（throttle），缓解慢连接占用资源。
- **[#35738](https://github.com/bitcoin/bitcoin/pull/35738)（9/5 合并）并行化输入 prevout 获取的后续收尾**：承接此前并行化改造，修复边界情况并补测试。
- **其他合并**：[#36166](https://github.com/bitcoin/bitcoin/pull/36166) validation 重构——封装 Chainstate::m_target_blockhash；测试补强 [#36130](https://github.com/bitcoin/bitcoin/pull/36130)（transaction_tests 变异覆盖）、[#36163](https://github.com/bitcoin/bitcoin/pull/36163)（PSBT ComputeTimeLock 不可满足 locktime 组合）；CI 迁移 LLVM 23（[#36100](https://github.com/bitcoin/bitcoin/pull/36100)）。本周无共识变更、无 P2P/mempool policy 变更。

## 三、Layer 2 / 闪电网络

- **网络规模企稳**：mempool.space 快照为 **16,227 节点 / 32,512 通道 / 约 3,754 BTC 容量**，与 8/30 快照基本持平（连续收缩后进入平台期）；1ML 口径 24h 新增节点 +9、新增通道 +211。（[mempool.space](https://mempool.space/api/v1/lightning/statistics/latest) / [1ML](https://1ml.com/statistics)）
- **实现侧平静周**：LND（最新 v0.21.2-beta，8/13）与 CLN（26.06.7 安全补丁，8/28）本周均无新版本，无重大协议级动态。（[LND Releases](https://github.com/lightningnetwork/lnd/releases) / [CLN Releases](https://github.com/ElementsProject/lightning/releases)）
- **配套协议演进**：FROST DKG 草案（ChillDKG）落地，为 BIP-445 生态补上分布式密钥生成环节；SwiftSync（BIP-455–457，UTXO 集同步）仍在评审。当前链上费率 1 sat/vB 低位，LN 路由与通道开启成本处于宽松环境。

## 四、挖矿与算力

- **全网算力约 927 EH/s**（7 日均值，周环比 +1.6%）。（[blockchain.info](https://api.blockchain.info/charts/hash-rate)）
- **难度调整**：本周（约 9/5–6，高度 965,664）完成一次调整，**125.81T → 127.45T（约 +1.3%）**；新周期刚开启 5%，下一次预计 **+5.5%**（约 9/19）。（[mempool.space](https://mempool.space/api/v1/difficulty-adjustment)）
- **公共矿工 AI 转型提速**：BlocksBridge Miner Weekly（[TheEnergyMag](https://www.theenergymag.com/news/2026-09-03/bitcoin-miner-unplug-ai-revenue-surge)，9/3）显示公共矿工卸载约 **23% 矿机容量**，AI 收入环比激增 **52%**——能源-算力-市场（energy-compute-markets）格局持续重塑。
- **网络环境**：mempool 费率 **1–2 sat/vB**，区块空间充裕，矿工手续费收入占比低位；日交易量约 **72.4 万笔**，与上周基本持平（-1.5%）。本周无重大矿企财报发布。

## 五、市场与机构

- **价格**：约 **$79,900**（24h +0.4%，市值 $1.60T）。周内 $78–81K 拉锯——9/3 DXY 走弱（疑似日元干预）收复 $80K 并一度破 $81K（[Bitcoin Magazine](https://bitcoinmagazine.com/markets/bitcoin-rallies-over-81000)）；9/4 非农超预期、加息担忧重燃，跌破 $80K 至 ~$79.7K（[Bitcoin Magazine](https://bitcoinmagazine.com/markets/bitcoin-dips-on-strong-jobs-report) / [Cointelegraph](https://cointelegraph.com/markets/surprise-labor-market-print-sends-bitcoin-back-below-80k)）。（[CoinGecko](https://www.coingecko.com/en/coins/bitcoin)）
- **ETF 资金流**：9/4 单日净流入 **$731M**，为 1 月以来最大单日（[The Block](https://www.theblock.co/news/markets/2026-09-04-us-bitcoin-etfs-largest-inflow-day-since-january-413515)）；近三周累计 **$3.8B**，为 2026 年最强三周连涨（[Cointelegraph](https://cointelegraph.com/markets/bitcoin-etf-inflows-3-8-billion-strongest-three-week-run-2026)）。
- **Fidelity 报告（9/3）**：比特币底部可能已在 7 月出现，但熊市未必结束，年内仍有再探新低的风险。（[Bitcoin Magazine](https://bitcoinmagazine.com/news/bitcoin-bear-market-not-over-says-fidelity)）
- **BTC–黄金相关性升至六年高位**：投资者对法币贬值担忧升温，BTC 与黄金同步交易；分析师质疑与股市脱钩能否持续。（[Bitcoin Magazine](https://bitcoinmagazine.com/news/bitcoin-gold-correlation-soars) / [The Block](https://www.theblock.co/news/markets/2026-09-03-bitcoin-gold-correlation-hits-six-year-high-but-analysts-question-whether-equity-decoupling-will-last-413437)）
- **机构与渠道**：Strive CEO 称 ASST 有望在 2026 年底成为第二大公开比特币持有者（[The Block](https://www.theblock.co/news/markets/2026-09-03-strive-ceo-company-could-end-2026-second-largest-bitcoin-holder-asst-413455)）；英国散户平台 Hargreaves Lansdown 上线比特币 ETN 交易——一年前该公司还称 BTC"不是资产类别"（[Bitcoin Magazine](https://bitcoinmagazine.com/news/hargreaves-lansdown-to-allow-bitcoin-etns)）；Kraken 与 SoFi 合作将加密交易接入银行清算轨道（[Bitcoin Magazine](https://bitcoinmagazine.com/news/kraken-sofi-partnership)）。

## 六、安全与工具

- **Trezor 数据泄露扩大（9/4）**：第三方仓储合作方 **ShipMonk 未按约删除客户数据**，再波及约 **67,000 名美国用户**（累计影响扩大）；资金与密钥不受影响，主要风险为定向钓鱼。（[Bitcoin Magazine](https://bitcoinmagazine.com/news/trezor-data-breach-worse-than-reported) / [Cointelegraph](https://cointelegraph.com/news/trezor-says-data-breach-affects-another-67k-us-customers)）
- **QuFi 后量子验证平台（9/4）**：上线 post-quantum verification 平台并完成 Bitcoin testnet proof，展示量子抗性签名验证与 BTC 网络的结合路径。（[Cointelegraph](https://cointelegraph.com/news/qufi-launches-post-quantum-verification-platform-with-bitcoin-testnet-proof)）
- **无协议级 CVE / 利用事件**：本周未披露 Bitcoin 协议、Core/LND/CLN 新漏洞；Bitcoin Core 侧 HTTP 加固（[#36123](https://github.com/bitcoin/bitcoin/pull/36123) / [#36169](https://github.com/bitcoin/bitcoin/pull/36169)）已合入 master，延续 8 月以来的加固节奏。工具侧无重大新钱包/基础设施发布。

---

**来源列表**（本周）：GitHub bitcoin/bips、bitcoin/bitcoin、ElementsProject/lightning、lightningnetwork/lnd；mempool.space、1ML、blockchain.info、CoinGecko；TheEnergyMag（BlocksBridge）、Bitcoin Magazine、Cointelegraph、The Block。

— Youmoo（㕛木）
*Solid as teak.*
