架构师（JiaGouX）

我们都是架构师！  
架构未来，你来不来？

  

  

  

===

这段时间我整理了几篇 OpenClaw / Claude Code 的拆解，越来越确定一件事：**会写代码 ≠ 能交付。**  

用 AI 工具 ≠ 个人提效 ≠ 组织提效, 真正难的是把不确定性关进笼子，让它按规矩做事、做完能验收、出事能止损。

前两天补 OpenAI 开发者博客，刷到 2 月 11 日 Charlie Guo 写的《Shell + Skills + Compaction: Tips for long-running agents that do real work》。这篇文章把长跑型 Agent 的三个硬问题讲得很透：**流程怎么复用、执行怎么落地、上下文怎么续航。**

文章给出了三个"更像工程件"的积木：**Skills（可复用流程包）**、**Shell（可执行环境）**、**Compaction（自动压缩长历史）**。主要围绕 OpenAI 的 Responses API，结合了他们做 Codex 和内部 Agent 的经验，以及 Glean 等早期客户的生产反馈。我把它按"可落地的动作"重新组织成 10 条建议 + 3 个组合模式 + 7 步团队落地。

如果你看过我前面几篇，会发现这些话题其实在同一条主线上。

我反复说"[先写方案、再落代码](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408449&idx=1&sn=77af092803a98afca9556fce4d098d9e&scene=21#wechat_redirect)"，因为它能把歧义压下去，让 AI 的输出变成你能审查、能回滚的东西。[lencx 在分析 OpenClaw 架构时](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408256&idx=1&sn=45870e6db5db87ce2b8d19941da8fc6d&scene=21#wechat_redirect)也提到类似判断：安全与自主本质上是矛盾需求，你既想让 Agent 有探索能力，又要保证它不越界，光靠规则不够，得写进架构基因里。

[工具副作用治理](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408462&idx=1&sn=e2932c687af7d23f462f58f46caab653&scene=21#wechat_redirect)更是绕不开的话题：工具更像权限，能不能上线，取决于副作用是否可控。

OpenAI 这篇博客把这些散落的关切统一成了一套组合拳：**把 SOP 变成 Skill，把执行变成 Shell，把长跑变成可续航的线程。**

* * *

太长不看版（先拿走 8 条）
--------------

*   • **Skills = 程序化流程**：把 SOP、模板、示例、边界条件打包成 Skill，按需加载。别再把 System Prompt 堆成"万字巨石"。
    
*   • **Skill 描述要写成路由规则**：写清楚"什么时候用 / 什么时候别用 / 产出是什么"，别写营销文案。
    
*   • **负例比正例更能救命**：Glean 的经验是，Skill 路由在初期触发率会下降约 20%，补充负例和边界条件后才恢复。
    
*   • **模板和示例放 Skill 里几乎"零成本"**：不触发时不占上下文窗口；触发时立刻可复用，尤其适合报告、工单分诊、账号计划、分析写作。
    
*   • **长跑从一开始就要设计续航**：复用容器、保留中间产物、用 `previous_response_id` 在同一线程里续跑，把 Compaction 当默认能力。
    
*   • **需要确定性时就直说**：别让模型"猜"要不要用 Skill，关键步骤直接写：`Use the "<skill name>" skill.`
    
*   • **Skills + 网络访问是高风险组合**：严格 allowlist、默认不信任工具输出、避免"开放互联网 + 强流程"直接进 C 端关键链路。
    
*   • **把 `/mnt/data` 当交付边界**：工具写盘、模型读盘、你取回产物再审核。别让结果只存在于聊天气泡里。
    

* * *

先对齐心智模型：三件事各管一段链路
-----------------

你可以把一个"能干活的 Agent"拆成三段：

1.  1. **怎么做（Procedure）**：可复用的流程，由 **Skills** 负责。版本化、可挂载、按需加载。
    
2.  2. **真的去做（Execution）**：安装依赖、跑脚本、改文件、写报告，由 **Shell** 负责。一个可控的真实执行环境。
    
3.  3. **能跑得久（Continuity）**：对话变长、上下文膨胀，任务还要继续推进，由 **Compaction** 负责。自动压缩历史，保持续航。Compaction 既可以是服务端在阈值触发时自动执行的 in-stream 压缩，也可以是你显式调用 `/responses/compact` 端点来控制压缩时机。
    

三个东西放在一起，最大的变化是：**你不再指望"提示词写得更巧"来换稳定性，用"流程 + 执行 + 续航"直接换交付。**

把原文的定义再说精确一点。这部分很多人容易一扫而过，但它决定了你能不能工程化复刻：

*   • **Skill 是一包文件加一个 `SKILL.md` 清单**（含 frontmatter 和指引）。平台把 Skill 的 `name / description / path` 暴露给模型，模型先用元信息决定要不要调用；一旦调用，再读 `SKILL.md` 里的完整流程。这和 lencx 提到的 OpenClaw Skills 生态方向一致：流程可复用、可版本管理、可按需挂载。
    
*   • **Shell 是"真实执行"**：既可以是 OpenAI 托管的容器（受控网络），也可以是你自己管理的本地 Shell runtime，同一套工具语义，但机器由你管。这和 Agent CLI 化的趋势相呼应：把能力封装成可组合的"命令 + 参数 + 结构化输出"契约，取代脆弱的 UI 自动化。
    
*   • **Hosted Shell 走 Responses API**，所以你的请求天然带上"有状态的工作会话、tool calls、多轮续跑、产物（artifacts）"这些特性。
    
*   • **Compaction 有两种用法**：一种是服务端在阈值触发时自动压缩（in-stream，无需单独调用），另一种是你显式调用 `/responses/compact` 来精确控制压缩时机。
    

原文用一组朴素的对比把"组合价值"说清楚了：

*   • Skills 把稳定流程从 System Prompt 里剥离出来，减少 prompt spaghetti。
    
*   • Shell 给你一个可执行的环境，能安装、能运行、能写出文件产物。
    
*   • Compaction 负责续航，让长任务不用手动"切上下文"也能继续跑。
    
*   • 三者合起来，你的 System Prompt 才不会变成一份既脆弱又臃肿的大文档。
    

* * *

图 1：把"会聊"变成"能交付"的最小闭环
---------------------

一句话概括：**Skill 负责规范做法，Shell 负责产出产物，Compaction 负责长跑续航。产物落盘，审核和交付在盘外。**  
  

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 2：长跑型任务怎么"不断线"
----------------

原文有一句话很实用：**把 Compaction 当成默认的长跑能力，别等上下文爆了再补救。**

换成工程动作，就是三件事同时做：**复用容器**让环境和中间结果不丢，**用 `previous_response_id` 续跑**让线程不断，**用 Compaction** 让上下文不爆。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

* * *

10 条建议，按"能落地的动作"理解
------------------

下面 10 条来自 OpenAI 博客的经验总结。每条改写成"你可以马上做什么"。

* * *

### 1）Skill 描述别写成介绍文案，写成"路由规则"

Skill 的 `description` 本质上是模型的"决策边界"，它决定了模型在什么条件下调用你的 Skill。你需要它清楚回答三个问题：

*   • **什么时候用我？**
    
*   • **什么时候别用我？**
    
*   • **用完产出什么？怎么算成功？**
    

落地动作：

*   • 把 `description` 写成一段简短的 `Use when / Don't use when / Outputs`。
    
*   • 让输入尽量具体：文件路径、数据格式、工具依赖、预期产物（例如"在 `/mnt/data` 输出 `report.md`"）。
    

一个常用的描述模板（直接复制改就行）：

`Use when: ...   Don't use when: ...   Inputs: ...   Outputs: ...   Success criteria: ...`

* * *

### 2）加"负例"和"边界条件"，比加"正例"更能救命

一个反直觉的发现：你把 Skills 开起来之后，路由触发一开始反而可能变差。

Glean 在定向评测中观察到，Skill 路由的触发率最初下降了约 20%。后来他们在描述里补充了负例和边界条件，触发准确率才恢复甚至超过基线。

落地动作：

*   • 每个 Skill 至少写 3 条"别叫我"的场景，并写清楚"应该叫谁 / 应该怎么做"。
    
*   • 把最容易混淆的相邻 Skill 放到一起对比，尤其是"写作类 / 总结类 / 排障类"这种边界模糊的组合。
    

* * *

### 3）把模板和 worked example 放进 Skill，不用时几乎不花钱

很多团队把模板塞在 System Prompt 里，结果两个问题：

*   • 上下文常年膨胀，延迟和成本跟着涨
    
*   • 改模板就要改"全局大提示词"，回滚困难
    

落地动作：

*   • 把"输出模板 + 示例输出 + 常见坑"都放进 Skill 的文件里。
    
*   • System Prompt 只保留最小原则：安全边界、工具权限、确认机制。
    

Glean 的生产反馈印证了这一点：示例按需加载后，质量和延迟同时改善，因为那些示例只在 Skill 触发时才被加载进上下文。

* * *

### 4）长跑型任务：从第一步就设计"可续航"

长任务不是"一次问好就结束"。要让它持续推进，三件事一起上：

*   • **复用同一个容器**（依赖缓存、临时文件、中间产物都在）
    
*   • **用 `previous_response_id` 续跑**（同一线程继续，不要频繁重开）
    
*   • **默认启用 Compaction**（别等上下文爆了才补救）
    

落地动作：

*   • 把任务拆成"可验证的里程碑"：每一步都落盘一个可审查的产物。
    
*   • 产物优先写到 `/mnt/data`，让开发者和用户可以直接取回检查。
    

* * *

### 5）需要确定性时：直接要求模型"必须用某个 Skill"

默认模式下，模型自己决定要不要用 Skill。多数时候这没问题。

但当你在跑一条生产流程，而且这条流程有明确契约（产物格式、验证步骤、输出目录），就别赌"它会想起来用"。

原文的说法很直接：**把模糊的智能路由变成显式的合同。** 一句 `Use the "<skill name>" skill.` 就够了。

落地动作：

*   • 在关键步骤显式指定 Skill，把"是否调用"从"智能决策"变成"明确合同"。
    
*   • 自动路由留给探索性任务，生产链路走确定性路径。
    

* * *

### 6）Skills + 网络访问：默认按高风险设计

OpenAI 的提醒很直白：**把强流程（Skills）和开放网络放在一起，会形成高风险的数据外泄通路。**

lencx 在分析 OpenClaw 安全性时也说过类似的话：创新需要极大的操作权限，但这些操作本身就危险。解法是先收口，再按需放开。

落地动作（建议默认配置）：

*   • Skills：允许
    
*   • Shell：允许
    
*   • Network：默认关闭；需要时按请求打开，**allowlist 越小越好**
    

两个实操要点：

*   • **假设工具输出不可信**（网页内容、API 返回、脚本 stdout 都可能携带提示注入）。
    
*   • 面向 C 端的流程，加入强确认和二次审核，把"能联网的强流程"关在护栏里。
    

* * *

### 7）把 `/mnt/data` 当"交付边界"，别让结果只活在聊天气泡里

长任务的交付标准不应该是"模型说它做完了"，应该是：

*   • 有文件、有 diff、有报告、有表格
    
*   • 你能取回、能审查、能回放
    

原文的心智模型：**tools write to disk, models reason over disk, developers retrieve from disk.**（工具写盘、模型读盘、开发者取盘。）

落地动作：

*   • 约定所有可交付物都写到 `/mnt/data`。
    
*   • 上层应用拿到产物后，做展示、对比、审批、归档。别直接相信口头总结。
    

* * *

### 8）Allowlist 是两层系统：组织级 + 请求级

网络访问的控制分两层，很多人容易忽略：

*   • **组织级 allowlist**：最大允许访问的域名集合（管理员配置）
    
*   • **请求级 `network_policy`**：每次任务允许访问的子集，必须是组织级的子集
    

落地动作：

*   • 组织级 allowlist 要小而稳定（"我们信任的域名集合"）。
    
*   • 请求级 allowlist 更小（"这次任务非访问不可的域名"）。
    
*   • 任何超出组织级 allowlist 的请求都会直接报错。别在运行时才发现配置不对。
    

* * *

图 3：联网的两层闸门

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

* * *

### 9）鉴权用 `domain_secrets`，别把密钥喂给模型

如果某个允许域名需要 `Authorization` 之类的 header，正确做法是 **用 `domain_secrets` 注入**。

运行时模型只看到占位符（例如 `$API_KEY`），由 sidecar 在请求发出时才对"被批准的目的地"注入真实值。模型自始至终不接触明文密钥。

落地动作：

*   • 模型侧永远只看到占位符，真实密钥只对 allowlist 内的域名注入。
    
*   • 这是任何需要从容器内调用受保护 API 的场景的强默认做法。
    

* * *

### 10）同一套 API：本地先跑通，再迁到云端容器

你没必要一开始就"全上云"。

一个更顺的迭代节奏是：

1.  1\. 本地跑（快、好 debug、好接内网工具）
    
2.  2\. 再迁到托管容器（可复现、隔离、适合部署）
    
3.  3\. Skills 保持不变，流程稳定，执行环境可替换
    

这和当前 Agent CLI 化的趋势高度吻合。lencx 的判断是：**Browser UI 给人用，Headless Browser + CLI 给 Agent 用，两种模式会长期共存。** OpenAI 的 Shell 设计也在走同一条路：本地和云端用同一套工具语义，区别只在执行环境。

落地动作：

*   • 把 Skills 当成"企业 SOP"，独立版本管理。
    
*   • 执行环境换来换去都行，但 SOP 别跟着飘。
    

原文一个关键细节：Shell 支持"本地执行模式"，你自己执行 `shell_call`，再把 `shell_call_output` 回传给模型。对很多团队来说，这是一条很舒服的上线路径，先在本地把工程链路跑顺，再迁到托管容器。

* * *

三种组合模式：从"能跑"到"可产品化"
-------------------

* * *

### 模式 A：Install > Fetch > Write Artifact（最小闭环）

最简单、也最容易产出真实价值的模式：

*   • 安装依赖
    
*   • 拉取或调用外部数据
    
*   • 写出一个明确的交付物（例如 `/mnt/data/report.md`）
    

你拿到产物就能做很多事：展示给用户、打 diff、归档、再喂回下一步继续跑。原文的说法是，这个模式之所以重要，是因为它创建了一个 **clean review boundary（干净的审查边界）**。

* * *

### 模式 B：Skills + Shell（把一次成功变成可复用）

第一次跑通"Shell 产物链路"后，下一步的痛点很快出现：**提示词漂移导致质量不稳定**。

这时 Skills 的价值就出来了：

1.  1\. 把流程、护栏、模板写进 Skill
    
2.  2\. 把 Skill 挂载进执行环境
    
3.  3\. 让 Agent 按 Skill 产出可预测的文件和报告
    

适用场景：表格分析、数据清洗 + 总结、周期性报表、重复性的排障与复盘。

* * *

### 模式 C（进阶）：Skills 作为"企业工作流载体"

Glean 的案例：他们用一个 Salesforce 定向 Skill，把评测准确率从 73% 提升到 85%+，同时把 TTFT（Time-to-First-Token）降低了 18.1%。具体策略包括精细路由、负例补充、以及把模板和示例嵌入 Skill。

往更远看，Skills 可以按"自主程度"分层理解：

*   • **辅助层**：Agent 只在写代码时打辅助，Skill 和 Shell 都不参与。
    
*   • **协同层**：Skills 编排 + Shell 执行，人和 Agent 深度配合，分步验收。
    
*   • **自主层**：Skills 驱动端到端工作流，人的角色更像产品经理，只做验收和决策。
    

**Skill 最终会变成"活的 SOP"：组织变了，SOP 跟着更新；执行交给 Agent，但标准留在仓库里。**

* * *

团队落地建议（7 步）
-----------

如果你们正在做 Agent，建议先把目标定得"工程一点"：

1.  1\. 先定义 3 个最常用的交付物（报告 / 表格 / 代码 patch / 工单摘要），统一落盘路径与格式
    
2.  2\. 为每种交付物写一个 Skill（含模板、示例输出、负例、边界）
    
3.  3\. 让 Agent 强制使用对应 Skill（别先追求"自动路由很聪明"）
    
4.  4\. 每一步都写 `/mnt/data` 产物，应用侧做审查 / 对比 / 回放
    
5.  5\. 需要联网时先上最小 allowlist；密钥全部走 `domain_secrets`
    
6.  6\. 给 Skills 做版本号与变更记录（像改 SOP 一样管理它）
    
7.  7\. 最后再做自动路由与更复杂的多工具编排（别一上来就上难度）
    

#### 引用链接

`[1]` Shell + Skills + Compaction: Tips for long-running agents that do real work: _https://developers.openai.com/blog/skills-shell-tips_  

  

延伸阅读
----

Anthropic 发布 2026 Agentic Coding 趋势报告：八大趋势与 4 个优先级深度解读 

*   [深度拆解 Clawdbot（OpenClaw）架构与实现](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408256&idx=1&sn=45870e6db5db87ce2b8d19941da8fc6d&scene=21#wechat_redirect)
    -------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
*   [OpenClaw 背后的秘密武器：极简智能体框架 Pi](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408341&idx=1&sn=d4ca8e6c70ad3f708c36bce24ce83aac&scene=21#wechat_redirect)
    
*   [NanoBot 架构拆解：4000 行代码实现OpenClaw能力?](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408297&idx=1&sn=bfde8bb77458f99047e78392676bc981&scene=21#wechat_redirect)
    
*   [深度拆解 OpenClaw 系统提示词：如何更像人?](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408287&idx=1&sn=2aa862c60b7d4fdf4ace8a1677d98013&scene=21#wechat_redirect)
    

*   [你可信? OpenClaw+Skills，让 AI 开始在 Moltbook 自主注册、开趴、开会](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408249&idx=1&sn=c6d956a98858034cf786f55818630869&scene=21#wechat_redirect)
    
*   [OpenClaw 是怎么工作的？一条消息的旅程讲清楚](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408419&idx=1&sn=324e134199f8647e591e3d98f53af4ec&scene=21#wechat_redirect)
    
*   [OpenClaw 是怎么工作的（2）：控制面两阶段协议与 runId](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408439&idx=1&sn=4b550be49e950c397deb3d4164cc6e3f&scene=21#wechat_redirect)
    
*   [OpenClaw 是怎么工作的（3）：会话键与队列策略，怎么把并发关进笼子](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408455&idx=1&sn=fb073e4e41fe8c362833c426aa64278c&scene=21#wechat_redirect)
    

  

如喜欢本文，请点击右上角，把文章分享到朋友圈  
如有想了解学习的技术点，请留言给若飞安排分享

**因公众号更改推送规则，请点“在看”并加“星标”第一时间获取精彩技术分享**

**·END·**  

**相关阅读：**

*   [跟Cloudflare大佬学用 Claude Code](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408449&idx=1&sn=77af092803a98afca9556fce4d098d9e&scene=21#wechat_redirect)
    
*   [Claude Skills 入门：把“会用 AI”变成“可复制的工程能力”](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408200&idx=1&sn=2f2cce7dfcbdb0766eac3590f777a17b&scene=21#wechat_redirect)
    
*   [一套可复制的 Claude Code 配置方案：CLAUDE.md、Rules、Commands、Hooks](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408189&idx=1&sn=7d4f7a442a22af37f95c46ff1048a3df&scene=21#wechat_redirect)  
    
*   [Claude Code 最佳实践：把上下文变成生产力（团队可落地版）](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408183&idx=1&sn=0b6f1437465d3a61118db688cc889b17&scene=21#wechat_redirect)
    
*   [把 AI 当成新同事：Agent Coding 的上下文与验证体系](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408169&idx=1&sn=7bba1377a31ffa0ce68932935c8d923a&scene=21#wechat_redirect)  
    
*   [Skill 到底是什么：从第一性原理深入剖析 Claude Agent Skills](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408393&idx=1&sn=d12788e94562bbce6022d27ed22d03ce&scene=21#wechat_redirect)  
    
*   [把 Claude Code 用成工程工具：8 条黄金法则与一套可复用工作流](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408385&idx=1&sn=3425cb256cb9cef30d43afd1e1165e1b&scene=21#wechat_redirect)  
    
*   [Anthropic 官方 33 页指南拆解: 构建Skills的最佳实践](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408372&idx=1&sn=130b7168be5d53c99f7bc7d98e54a447&scene=21#wechat_redirect)  
    
*   [2026 开年这篇综述，把高效 Agents 讲得很工程（附落地清单）](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408367&idx=1&sn=34d6ed1ad87acfd2fd8d2270a4e106e4&scene=21#wechat_redirect)  
    
*   [AI编程实践：从 Claude Code 到团队协作的 6 个落地抓手](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408326&idx=1&sn=4df2b48b3ee3e71a3c6bc99261f338e5&scene=21#wechat_redirect)
    

*   [Anthropic 发布 2026 Agentic Coding 趋势报告：八大趋势与 4 个优先级深度解读](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408313&idx=1&sn=7e534f0042f2fa8e1d73f8b499bab008&scene=21#wechat_redirect)  
    
    ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
*   [Claude Agent Teams 架构与实战拆解](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408308&idx=1&sn=17637ced8bfe0d055ece14d05b2e6beb&scene=21#wechat_redirect)  
    
    --------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
*   [Claude Code 创始人亲授：10 条进阶秘籍（附 12 条工作流 Prompt 清单）](https://mp.weixin.qq.com/s?__biz=MzAwNjQwNzU2NQ==&mid=2650408273&idx=1&sn=11ddeb3b4599cac0d63d45ea45152ced&scene=21#wechat_redirect)
    --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    

> 版权申明：内容来源网络，仅供学习研究，版权归原创者所有。如有侵权烦请告知，我们会立即删除并表示歉意。谢谢!

**架构师**

我们都是架构师！

  

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

****关注**架构师(JiaGouX)，添加“星标”**

**获取每天技术干货，一起成为牛逼架构师**  

**技术群请****加若飞：****1321113940** **进架构师群**

投稿、合作、版权等邮箱：**admin@137x.com**

本文转自 <https://mp.weixin.qq.com/s/s5XbsplbiY_n8oUBD1F2Gw>，如有侵权，请联系删除。