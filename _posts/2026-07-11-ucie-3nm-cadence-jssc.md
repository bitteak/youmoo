---
layout: post
title: "UCIe 3nm 实测：0.29 pJ/bit，chiplet 互联的 Cadence 答卷"
date: 2026-07-11 12:00:00 +0800
categories: chiplet interconnect serdes
lang: zh
---

七月号的 IEEE JSSC 刊登了一篇值得 chiplet 从业者细读的论文：Cadence 在 3nm FinFET 上实现了两套完整的 UCIe PHY——一套走 CoWoS 先进封装，一套走有机基板标准封装。这是 ISSCC 2025 短文的扩展版，补上了标准封装（UCIe-SP）的全部测试数据。

## 为什么 UCIe 重要

Chiplet 的核心矛盾：**计算 die 可以拆，但拆开之后怎么连？**

拆 die 的好处很明确——不同 IP 用不同工艺节点，大 die 良率问题得到缓解，SKU 组合更灵活。代价是 die-to-die（D2D）互联必须足够快、足够省电、延迟足够低，否则拆 die 省下的功耗全填进互联开销里。

这就是 UCIe（Universal Chiplet Interconnect Express）的定位：一个开放的 D2D 互联标准，让不同 vendor 的 die 能在一个封装里互操作。在此之前，D2D 互联都是各家自研的私有协议——NVIDIA 的 NVLink-C2C、AMD 的 Infinity Fabric、Apple 的 UltraFusion。UCIe 试图做的是把这件事标准化，就像 PCIe 标准化了板级互联一样。

## 这篇论文做了什么

论文的核心贡献是**首次在 3nm 上验证了完整 UCIe PHY 的两种封装方案**，并且给出了详尽的实测数据：

| 指标 | UCIe-AP（CoWoS） | UCIe-SP（有机基板） |
|---|---|---|
| 工艺 | 3nm FinFET | 3nm FinFET |
| 单 PHY 通道数 | 64 RX + 64 TX | 16 RX + 16 TX |
| 速率范围 | 4–16 Gb/s/pin | 4–16 Gb/s/pin |
| 能效 | **0.29 pJ/bit** | 0.52 pJ/bit |
| 带宽密度 | **5.27 Tb/s/mm** | 0.448 Tb/s/mm |
| 延迟（FDI-to-FDI） | 3.5 ns | 4.0 ns |
| BER 1E-15 眼宽 | 0.29 UI | 0.372 UI（25mm） |
| BER 1E-27 眼宽 | 0.03 UI | 0.108 UI（25mm） |

两个数字值得单拎出来说：

**0.29 pJ/bit。** 这个能效水平意味着，即使跑满 16 Gb/s/pin × 128 lane ≈ 2 Tb/s 的单 PHY 吞吐，互联功耗也只有约 0.6W。这对于多 die AI 加速器来说，互联不再是功耗预算里的大头。

**5.27 Tb/s/mm 的 beachfront 带宽密度。** 在 CoWoS 硅中介层上，这意味着每毫米 die 边缘可以塞进超过 5 Tb/s 的带宽。对于需要海量 die 间通信的 AI training chip，这个密度意味着 die 边缘长度不再是瓶颈。

## 几个架构层面的看点

**TX 驱动可配置为 (P+N)/N 或 P/N。** 这是一种聪明的设计选择——根据所需的输出 swing 切换驱动拓扑，避免在所有场景下都烧满功率。

**RX 采用 ping-pong 架构。** 经典做法，在 16 Gb/s 速率下仍然有效，说明 FinFET 3nm 的器件速度足以支撑这种相对简洁的设计。

**多链路噪声测试。** 论文的一大亮点是 AP 链路的实测并非单链路理想环境，而是 **8 条链路同时跑 8.192 Tb/s 总流量**。这意味着测到的 0.29 pJ/bit 和 0.29UI 眼宽是真实串扰环境下的结果，不是 lab 里屏蔽出来的漂亮数字。

**背景维护模式。** 在 −40°C 到 125°C 温度漂移和 ±5% 电压漂移下，自适应校准最多能把眼宽拉回 0.156UI。对于车载或工业场景，这个特性的价值不亚于标称性能。

**SP 和 AP 的能效差 1.8 倍。** 0.29 vs 0.52 pJ/bit 的差距基本全来自通道损耗——有机基板的 25mm 走线比硅中介层上的微凸点互联损耗大得多。这个差距也解释了为什么高带宽场景几乎必然选先进封装。

## 产业层面的意义

这篇论文的作者列表本身就是一条产业信号：23 位作者，22 位来自 Cadence，1 位来自 Marvell（Ken Chang，前 Cadence 的 SerDes 大佬，现 Marvell 的 interconnect 负责人）。这意味着 **UCIe PHY IP 正在从"标准纸面"走向"可授权的硅验证 IP"**。

对于做 chiplet 的团队，不管是 hyperscaler 自研 ASIC 还是独立芯片公司，这意味着：

1. **UCIe PHY 可以买了。** 不需要自研 D2D SerDes，Cadence 已经提供了一个在 3nm 上硅验证过的方案。
2. **标准封装也能用。** SP 版本 0.52 pJ/bit 的能效对很多场景（推理卡、I/O die 互联）足够用，不需要支付 CoWoS 的成本。
3. **互联不再是最稀缺的 IP。** 当 D2D PHY 变成 commodity，chiplet 竞争的焦点会进一步向计算架构和软件栈转移。

Chiplet 生态的一块关键拼图，正在落位。

---

*论文：D. T. Melek et al., "A 0.29 pJ/b 5.27 Tb/s/mm UCIe Advanced Package Link With 2.5-D CoWoS Interposer and a 0.52 pJ/b 0.448 Tb/s/mm UCIe Standard Package Link With Organic Substrate in 3 nm FinFET," IEEE J. Solid-State Circuits, vol. 61, no. 7, pp. 3535–3547, Jul. 2026. DOI: [10.1109/JSSC.2026.3651425](https://doi.org/10.1109/JSSC.2026.3651425)*
