---
version: v2.4.0
updated: 2026-02-22
---

# 目录维度工作策略

本文档定义 `sop-code-implementation` 如何以 `design.md` 所在目录为维度进行工作，实现自底向上、依赖驱动的并行执行。

---

## 核心概念

### 1. 工作范围定义

`sop-code-implementation` 的工作范围以 `design.md` 文件所在的目录为边界：

CMD: `DIR_SCOPE(dir_with_design_md) = dir/** - {subdir/** | subdir contains design.md}`

参见：05_constraints/command_dictionary.md

### 2. 目录层级

**层级计算规则**：
- 以项目根目录为基准（深度 0）
- 每深入一级，深度 +1
- `design.md` 的深度 = 其所在目录的深度

CMD: `depth(dir) = segments(dir_from_repo_root)`

---

## 执行策略

### 1. 自底向上处理顺序

CMD: `LIST_DESIGN_MD(root) -> design_list`
CMD: `SCHEDULE_DIRS(design_list) -> dir_map`
CMD: `RUN_DIR_BATCH(depth_desc)`（同 depth 并行；父目录等待子目录 `DIR_COMPLETED`）

### 2. 并行执行规则

**可以并行**：
- 同深度且无依赖关系的目录
- 不同子树的目录

**必须串行**：
- 有依赖关系的目录
- 父子目录关系

**依赖检测**：
```
依赖类型：
1. 显式依赖：design.md 中声明的依赖接口
2. 隐式依赖：代码中的 import/require
3. 父子依赖：目录层级关系
```

### 3. 跨模块改动处理

**原则**：只修改 design，不直接修改实现

**处理流程**：
CMD: `REQUEST_CROSS_DIR(src_dir, target_dir, change) -> appended_request`
CMD: `WAIT_DEP(src_dir, target_dir)`

变更记录位置：目标目录 `design.md` 的“待处理变更”章节（单条追加，禁止改写既有内容）

---

## 实现类 Skill 职责

### sop-code-implementation

**工作范围**：
- 负责单个 `design.md` 所在目录
- 实现该目录下的所有代码变更
- 运行该目录下的验收测试

**依赖处理**：
- 发现需要其他目录变更时，仅修改其 design.md
- 通知 `sop-progress-supervisor` 创建或唤醒对应目录执行
- 等待依赖完成后继续

**状态标记**：
参见：05_constraints/state_dictionary.md

### sop-implementation-designer

**工作范围**：
- 基于目录层级创建实现设计
- 识别目录间的依赖关系
- 定义目录内的接口契约

**依赖声明**：
写入位置：design.md 的“目录依赖”表（字段：依赖目录/依赖类型/说明）

### sop-code-explorer

**工作范围**：
- 分析目录结构
- 识别目录间的依赖关系
- 评估目录层级的变更影响

**输出扩展**：
模板：04_reference/interaction_formats/code_audit_report.md

### sop-progress-supervisor

**新增职责**：
- 维护目录-skill 映射表
- 监控目录处理进度
- 协调并行执行
- 处理目录间依赖等待

**目录-skill 映射表**：
模板：04_reference/interaction_formats/supervisor_report.md

---

## 执行流程

### 完整流程

CMD: `ROUTE(task)`
CMD: `LIST_DESIGN_MD(root) -> design_list`
CMD: `SCHEDULE_DIRS(design_list) -> dir_map`
CMD: `RUN_DIR_BATCH(depth_desc) -> IMPLEMENT(dir, design)`
CMD: `DOC_SYNC(scope) -> [已完成]`

### sop-code-implementation 执行细节

CMD: `IMPLEMENT(dir, design.md) -> (WAIT_DEP | COMPLETE_DIR) -> notify sop-progress-supervisor`

输出模板：04_reference/interaction_formats/worker_execution_result.md

---

## 约束

1. **目录边界**：`sop-code-implementation` 不跨越 design.md 边界修改代码
2. **依赖等待**：必须等待依赖目录完成后才能继续
3. **并行限制**：同深度无依赖才能并行
4. **变更通知**：跨目录变更必须通过 `sop-progress-supervisor` 协调
5. **状态同步**：所有状态变更必须同步给 `sop-progress-supervisor`

---

## 示例场景

已移除（减少 token）。用 `dir_map` + 执行结果即可表达场景。
模板：04_reference/interaction_formats/supervisor_report.md + 04_reference/interaction_formats/worker_execution_result.md

---

## 相关文档

- Prompt：`prompts/packs/default/skills/sop-code-implementation.md`
- Prompt：`prompts/packs/default/skills/sop-progress-supervisor.md`
- [深度路径](../03_workflow/deep_path.md)
- [Skill矩阵](../02_skill_matrix/index.md)

---

## Spec 与 design.md 的关系

### 任务划分原则

- 每个 spec 任务对应一个 design.md 目录
- 任务粒度 = DIR_SCOPE(dir_with_design_md)
- 跨目录任务拆分为多个子任务

### 执行顺序

- **自底向上**：按 design.md 深度从深到浅
- **同深度并行**：无依赖关系的任务可并行
- **父目录等待**：父目录任务等待子目录任务完成

### 动态创建 design.md

- **跨目录变更**：自动创建目标目录的 design.md
- **复杂度增加**：考虑创建更深层次的 design.md
- **设计先行**：执行前确认 design.md 已存在或已创建

### 任务声明格式

每个 spec 任务应声明：

| 字段 | 类型 | 说明 |
|------|------|------|
| design_path | string | 对应的 design.md 路径 |
| depth | int | design.md 的深度 |
| dependencies | string[] | 依赖的其他 design.md 路径 |
| scope | string | 任务范围 (DIR_SCOPE) |

### 相关文档

- [ADR-Spec-002: Spec 与 Design.md 关系定义](../04_context_reference/adr_Spec_002_design_relation.md)
- [design_decision_rules.md](design_decision_rules.md)
