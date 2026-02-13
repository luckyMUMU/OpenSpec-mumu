# SOP 文档审查指南（Skill-first）

> **版本**: v2.1.0  
> **更新日期**: 2026-02-12  
> **用途**: 以 SSOT 为中心，对 `docs/参考/sop/**` 的流程规范、模板、约束、Prompt Pack 与 Skill 合约做系统性审查

---

## 1. 核心理念与范围

- 本 SOP 以 Skill 作为唯一执行单元；审查以 SSOT 为起点，不依赖任何特定实现、平台机制或特定执行者。
- 本指南仅定义“如何审查 SOP 体系”，不定义业务方案与实现细节。
- 仅当需要表达“强闭环/并行探索/续跑交接”等意图时 → 使用**手动模板**（可复制粘贴），不采用自动注入/自动格式化 prompt。

---

## 2. SSOT（唯一真源）

审查顺序必须从 SSOT 开始：

- Skill 清单与边界：`sop/02_skill_matrix/index.md`
- 状态字典：`sop/05_constraints/state_dictionary.md`
- 命令字典：`sop/05_constraints/command_dictionary.md`
- 约束矩阵与红线：`sop/05_constraints/constraint_matrix.md`
- 参考索引入口：`sop/04_reference/index.md`
- Prompt Pack 规范：`sop/04_reference/prompt_pack.standard.md`
- 上下文交接标准：`sop/04_reference/review_standards/context_handoff.standard.md`
- 手动模式模板：`sop/04_reference/interaction_formats/manual_mode_templates.md`
- 续跑与恢复模板：`sop/04_reference/interaction_formats/continuation_request.md`

---

## 3. 版本管理规则

### 3.1 版本格式

```
v[主版本].[次版本].[修订版本]
```

### 3.2 版本定义

| 版本位 | 更新规则（命令式） | 影响范围 |
|---|---|---|
| 主版本 | 仅当 Skill-first 体系/SSOT 边界发生架构级变化 → 必须 +1，次/修订归零 | 全局统一 |
| 次版本 | 仅当新增/调整 Skill、路径、约束、模板类型 → 必须 +1，修订归零 | 全局统一 |
| 修订版本 | 仅当修正文档错误、格式、链接、表述优化（不改语义） → 仅 +1 | 允许差异化 |

### 3.3 全局统一规则

- 主/次版本：所有 `sop/**` 核心文档必须一致，且以 `sop/CHANGELOG.md` 为准。
- 修订版本：允许子文档独立递增；仅当形成一次“对外发布基线”时 → 推荐统一修订版本号。
- Skill 合约：`sop/skills/**/SKILL.md` 的主/次版本必须与 SOP 主/次一致。

### 3.4 版本一致性检查清单

- [ ] `sop/CHANGELOG.md` 的当前主/次版本与 `sop/**` 核心文档一致
- [ ] `sop/skills/**/SKILL.md` 主/次版本与 SOP 一致
- [ ] 文档页眉版本号与文档内部引用一致（不得自相矛盾）

---

## 4. 审查目标（必须同时满足）

1. **SSOT 一致性**：任何规则/状态/命令/路径/交付物引用必须可追溯到 SSOT。
2. **流程闭环**：每个 Skill 都有清晰输入/输出/停止点/落盘交付物，且可被下游复用。
3. **表达可执行**：规则满足“仅当/当…时 → 必须/禁止/仅能 → 输出（交付物/路径）”。
4. **手动可操作**：当需要模式切换/并行探索/续跑交接时，有可复制粘贴的模板支撑。
5. **简洁且可审计**：信息不重复，长内容下沉并可按需引用，避免在正文堆砌实现细节。

---

## 5. 审查维度与检查清单

### 5.1 SSOT 一致性（硬门槛）

- [ ] Skill 清单与边界以 `sop/02_skill_matrix/index.md` 为唯一来源
- [ ] 状态/命令引用仅来自 `sop/05_constraints/*_dictionary.md`
- [ ] 禁止项与后果等级以 `sop/05_constraints/constraint_matrix.md` 为准
- [ ] 任何“新增/调整”必须同步更新：Skill矩阵、相关模板索引、相关约束引用

### 5.2 Prompt Pack 合规性

- [ ] Prompt Pack 仅表达偏好/侧重点/排版，不重复 `SKILL.md` 合约正文
- [ ] Prompt Pack 不引入平台实现细节（例如自动注入、hook、会话系统）
- [ ] 覆盖机制与禁止覆盖项符合 `sop/04_reference/prompt_pack.standard.md`

### 5.3 交付物与索引可达性

- [ ] 每个 Skill 的“必须落盘交付物”可在 `sop/04_reference/index.md` 找到入口
- [ ] 新增模板/标准必须在 `sop/04_reference/index.md` 中可达引用
- [ ] 交互格式与审查标准的引用路径正确且存在

### 5.4 停止点与决策闭环

- [ ] 当输入不足/冲突/依赖缺口时 → 必须进入 `[USER_DECISION]` 并要求决策落盘
- [ ] 当进入等待类状态（如 `[DIR_WAITING_DEP]`/`[WAITING_FOR_*]`）时 → 必须产出“续跑/恢复请求”（模板见 continuation_request）
- [ ] 交接与压缩遵循 `context_handoff.standard.md`（必须保留 TODO 与证据）

### 5.5 表达规范（命令式）

- [ ] 禁止使用含混词：建议/尽量/可能/一般/视情况/差不多
- [ ] 每条规则必须包含触发条件、动作、输出（或落盘位置）
- [ ] 长背景/长解释/长示例必须下沉到参考文档，并在正文以链接引用

### 5.6 简洁性（面向长期维护）

- [ ] 重复信息合并为 SSOT 引用或表格
- [ ] 目录边界/Scope 规则不重复定义（统一引用目录策略或 Skill矩阵）
- [ ] 文档内容与模板库不冲突（模板变更优先以模板文件为准）

---

## 6. 审查流程（建议顺序）

```
步骤1: 确认版本基线
  → 读取 sop/CHANGELOG.md + sop/02_skill_matrix/index.md

步骤2: 核对 SSOT
  → state_dictionary / command_dictionary / constraint_matrix

步骤3: 核对索引与模板可达性
  → sop/04_reference/index.md

步骤4: 核对 Prompt Pack 合规
  → sop/prompts/packs/** + sop/04_reference/prompt_pack.standard.md

步骤5: 核对 Skill 合约可执行闭环
  → sop/skills/**/SKILL.md

步骤6: 链接/引用检查
  → 记录 FAIL 并给出命令式修复动作
```

---

## 7. 审查交付物（Artifacts）规范

仅当需要固化一次审查结论时 → 必须落盘到：

```
docs/参考/sop/reviews/YYYY-MM-DD_<topic>/
```

| 文件 | 必须内容 | 用途 |
|---|---|---|
| `00_scope.md` | 审查范围 + 版本基线 + SSOT清单 | 固定边界 |
| `01_ssot_check.md` | SSOT 核对结果（通过/失败项） | 防漂移 |
| `02_issue_list.md` | 问题分级（🔴🟠🟡🟢）+ 修复动作 | 修复输入 |
| `03_link_check.md` | 链接/引用检查清单（OK/FAIL） | 可达性 |
| `04_version_check.md` | 版本核对（主/次必须一致） | 发布基线 |
| `05_review_report.md` | 结论 + 风险 + 建议（引用前述交付物） | 审查闭环 |

---

## 8. 常见问题与命令式修复

### 8.1 SSOT 漂移

症状：文档出现未在字典/矩阵定义的状态/命令/交付物。\n\n修复：必须将引用改为 SSOT 已定义项；仅当确需新增时 → 先更新字典/矩阵，再更新引用方。

### 8.2 Prompt Pack 重复合约

症状：Prompt Pack 粘贴或改写 `SKILL.md` 正文。\n\n修复：必须删除重复正文，仅保留偏好/输出风格/侧重点；合约语义以 `SKILL.md` 为准。

### 8.3 新增模板不可达

症状：新增 interaction_formats/review_standards 文件，但 `sop/04_reference/index.md` 无入口。\n\n修复：必须在 `sop/04_reference/index.md` 增加索引链接并声明用途与关联 Skill。

### 8.4 交接信息丢失

症状：长任务拆分后无法恢复执行，TODO/证据缺失。\n\n修复：必须按 `context_handoff.standard.md` 补齐交接快照，并用 `continuation_request.md` 固化续跑输入。

---

## 9. 模板库（最小化）

仅当需要快速落盘时使用；更完整模板以 `sop/04_reference/*` 为准。

### 9.1 版本一致性核对（摘录）

```markdown
# 版本一致性核对

## 元信息
- 日期: YYYY-MM-DD
- 目标主/次版本: v<MAJOR>.<MINOR>.x（以 sop/CHANGELOG.md 为准）

| 文件 | 声明版本 | 是否符合目标主/次版本 | 修复动作（命令式） |
|---|---|---|---|
| [path] | vX.Y.Z | [ ] | 必须将版本更新为 v<MAJOR>.<MINOR>.* |
```

### 9.2 链接检查结果（摘录）

```markdown
# 链接检查结果

| 来源文件 | 链接文本 | 目标 | 结果（OK/FAIL） | 修复动作（命令式） |
|---|---|---|---|---|
| [path] | [text] | [target] | [ ] | 必须将…更新为… |
```
 
---
 
（完）
