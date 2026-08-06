---
layout: post
title: "Jeff Dean 离开谷歌：四位 AI 大佬创办 Discovery Loop，目标是把科学方法自动化"
date: 2026-08-06 09:00:00 +0800
description: "Jeff Dean 工作 27 年后离开 Google，与 Sanjay Ghemawat、Oriol Vinyals、Quoc Le 共同创办 AI-for-Science 公司 Discovery Loop。分析创始团队、发现循环愿景、谷歌 AI 领导层地震，以及芯片设计作为目标领域对 EDA 与后端工程师的意义。"
image: "/assets/youmoo-og.png"
tags: [ai-for-science, discovery-loop, jeff-dean, chip-design, eda, google]
---

今天早上（2026-08-06），谷歌 AI 圈发生了一次真正的地震：**Jeff Dean 在 Google 工作 27 年后正式离开**，与三位 DeepMind/Google 顶级研究员共同创办新公司 **Discovery Loop**。同日，**Demis Hassabis 也卸任 DeepMind CEO 的日常职务**——谷歌 AI 的两位标志性人物同一天退场。

这不是又一个"大佬离职创业"的普通新闻。这是 MapReduce、Bigtable、TensorFlow、TPU 的作者组合，把赌注押在了同一个方向上：**把科学方法本身自动化**。

## 创始团队：三个时代的拼图

| 创始人 | 原职 | 代表作 |
|---|---|---|
| Jeff Dean | Google DeepMind 首席科学家 | MapReduce、Bigtable、TensorFlow、TPU、Google Brain |
| Sanjay Ghemawat | Google Fellow | GFS、MapReduce、Bigtable（与 Dean 合作 20+ 年） |
| Oriol Vinyals | DeepMind 研究副总裁 | Seq2Seq、Pointer Networks、AlphaStar、Gemini |
| Quoc Le | DeepMind 杰出科学家 | AutoML、NAS、EfficientNet、ViT、PaLM/Gemini |

Dean + Ghemawat 是计算史上最高产的工程搭档之一——GFS/MapReduce/Bigtable 定义了现代分布式计算，间接孵化出 Hadoop、Spark、Cassandra、HBase 整个生态。Vinyals 代表前沿模型与强化学习时代，Quoc Le 代表 AutoML 与模型设计时代。

这四个人拼起来，恰好是 AI 全栈：

```
分布式计算（Ghemawat）
   ↓
训练基础设施（Dean）
   ↓
基础模型（Vinyals）
   ↓
AutoML/模型设计（Quoc Le）
   ↓
科学发现（Discovery Loop）
```

## Discovery Loop 要做什么

核心理念是一个**自动化的"发现循环"**：

1. 生成科学假设
2. 设计实验
3. 执行/编排实验
4. 分析结果
5. 自动迭代

目标领域：**生物、医学、芯片设计、材料科学、以及机器学习本身**。公司注册为公共利益公司（Public Benefit Corporation），由 Khosla Ventures 与 Radical Ventures 领投，**谷歌既是创始投资人、又承诺提供第一年的算力**——这个安排相当罕见，说明双方都清楚：这四个人出来单干，与其对抗，不如入股。

公司第一个客户就是自己：先用自己的技术改进 AI 系统，再推向科研市场。

## 更大的背景：谷歌 AI 领导层地震

同一天，**Demis Hassabis 卸任 DeepMind CEO 日常职务**（Axios、CNBC、Reuters 均有报道），Alphabet 股价当日下跌约 5%（Investing.com）。WSJ 的标题更直白："Google Overhauls AI Leadership as Longtime Chief Scientist Joins Wave of Exits"——**人才外流潮**。

这释放了一个信号：谷歌 AI 的组织重心正在从"研究驱动"转向"产品/Gemini 商业化驱动"，而最顶尖的研究人才选择用脚投票，去追逐下一个十年的范式——科学发现自动化。

## AI for Science：三代演进

把视野拉远，AI for Science 正在从第二代走向第三代：

- **第一代（预测工具）**：AlphaFold——2021 年蛋白质结构预测，如今 2 亿+ 结构公开
- **第二代（设计工具）**：GNoME、RFdiffusion、MatterGen——设计分子与材料
- **第三代（自主科学家）**：Discovery Loop、FutureHouse、Lila Sciences——假设→实验→学习的闭环

学术界的分布：生物最成熟（AlphaFold 已从论文变成基础设施）、材料最热（"生成 1000 万候选 → ML 筛选 → DFT 模拟 → 机器人合成 → 表征 → 模型更新"的流水线已跑通）、化学与物理次之、数学在靠 AlphaGeometry/AlphaProof 探路。

产业端四大垂直：药物发现（最成熟：Isomorphic、Recursion、Xaira）、材料（Microsoft AI for Science、Orbital）、**自主实验室**（可能是定义性的基础设施层）、科学智能体（最新浪潮）。

瓶颈很清晰：科学数据稀疏昂贵、实验周期以天/月计、需要因果而非相关性、不确定性量化不足、机器人实验集成困难。

## 对芯片设计意味着什么

这是与我们最相关的一条线。Discovery Loop 把 **芯片设计明确列为目标领域**——而这是第一次有 TPU 架构师 + GFS 作者这种量级的团队，公开把"自动化设计循环"作为公司使命。

对 EDA 和芯片后端工程师，我的判断是：

1. **RTL 生成只是开始**。上一波 LLM 热潮里，Kimi K3 展示了 48 小时"设计"一颗芯片。但 Discovery Loop 的野心不是生成代码，而是把**假设→综合/布局布线实验→PPA 分析→迭代**这个循环闭环。这正好落在 EDA ML（Synopsys、Cadence、Siemens 的 DSO.ai / Cerebrus 路线）的延长线上。

2. **后端物理设计是 AI 最难啃、也最值钱的部分**。时序收敛、PDN/IR drop、热、DFM 这些问题的核心是物理直觉与海量仿真数据——正是"发现循环"适合的领域，也恰恰是纯文本训练学不到的部分（硅的工艺特性、3nm 线延迟、库特征化）。短期内 AI 会是"生成方案 → 工程师裁决 → 迭代"的副驾驶，而不是取代。

3. **职业信号**：当构建 TPU 基础设施的人开始押注自动化设计循环，说明这个方向的技术验证期不远了。对后端工程师，最稳的策略依然是守住物理直觉这个不变的核心，同时学会把"发现循环"当工具——这与我们之前聊的 AI ASIC 转型路径一脉相承。

## 我的判断

如果 2023-2025 是对话式 AI 的时代，2026-2035 很可能属于**AI 驱动的科学发现**。真正能创造长期价值的公司，不是把聊天界面做得更好的那批，而是能在生物、化学、材料、半导体设计里**反复产出可验证突破**的那批。

Discovery Loop 的四人组合——分布式系统 + 训练基础设施 + 前沿模型 + AutoML——是迄今为止离开大厂的最强"梦之队"之一。谷歌选择以投资人和算力供应商的身份留在牌桌上，本身就是对这个方向最有力的背书。

对芯片行业的人来说，值得记住今天这个日期：**当"自动化科学方法"成为一家公司使命的那一天，芯片设计第一次被放进了同一个括号里。**

## 参考来源

- ChatGPT 分享对话（创始人梳理 + AI for Science 全景）：[chatgpt.com/share/6a73d114](https://chatgpt.com/share/6a73d114-9f4c-83ec-a81a-ca8a4337e973)
- WIRED — "4 of Google's Top AI Brains Are Leaving—and Launching Their Own AI Startup"（Steven Levy）
- NYT — "Four Top Google A.I. Researchers Form New Start-Up"（Cade Metz）
- WSJ — "Google Overhauls AI Leadership as Longtime Chief Scientist Joins Wave of Exits"
- CNBC / Reuters / Axios — Hassabis 卸任 DeepMind CEO、Dean 离职报道
- Google News 聚合：[news.google.com 搜索 "Discovery Loop" Jeff Dean](https://news.google.com/search?q=%22Discovery%20Loop%22%20Jeff%20Dean)

---

— Youmoo（㕛木）

*Solid as teak.*
