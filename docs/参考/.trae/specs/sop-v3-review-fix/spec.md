# SOP v3.0.0 审查与修复 Spec

## Why

在 SOP v3.0.0 重构完成后，需要对 `d:\Code\AI\OpenSpec-mumu\docs\参考\sop` 目录下的所有文件进行全面审查，识别并修复以下问题：
- 过时或多余的描述
- 命令式表述不准确
- 优先级定义不清晰
- 与新架构不一致的内容

## What Changes

- **审查范围**: `sop/` 目录下所有 45 个文件
- **审查标准**: Spec-first 架构、P0-P3 规范分层、契约式协作
- **修复原则**: 
  - 准确性优先于精简
  - 采用命令式表述（必须/禁止/仅能）
  - 删除过时或多余描述
  - 确保与 v3.0.0 架构一致

## Impact

- **影响文件**: 所有 SOP 文档（45 个文件）
- **影响范围**: 工程宪章、规范分层、工作流、Skill 定义、约束体系、模板体系
- **变更类型**: 文档优化（不改变核心架构）

## ADDED Requirements

### Requirement: 审查标准
审查过程 SHALL 遵循以下优先级：
1. **准确性**: 描述必须准确反映设计意图
2. **命令式**: 使用"必须/禁止/仅能"等明确表述
3. **精简性**: 在准确基础上删除冗余内容
4. **一致性**: 与 Spec-first 架构保持一致

### Requirement: 修复范围
审查 SHALL 覆盖以下维度：
- P0 级工程宪章（4 个文件）
- P1-P2 级规范分层（2 个文件 + 3 个目录）
- 5 阶段工作流（10 个文件 + 5 个契约）
- Skill 定义（5 个文件）
- 约束体系（7 个文件）
- 模板体系（10 个文件）
- 参考资料（1 个文件）

## MODIFIED Requirements

### Requirement: 工作流文档优化
原工作流文档（stage-0 到 stage-4）可能存在：
- 与契约模板不一致的描述
- 过多的解释性内容
- 命令式表述不够明确

**修改要求**:
- 以契约模板为准，删除不一致描述
- 删除过多解释，保留核心步骤
- 使用命令式表述（必须/禁止/仅能）

### Requirement: Skill 定义优化
原 Skill 定义（4 类 Skill）可能存在：
- Spec-first 定位不清晰
- 与规范分层关系不明确
- 能力边界描述过多

**修改要求**:
- 明确 Skill 是规范的"翻译器"定位
- 简化能力边界描述
- 强化与规范的映射关系

### Requirement: 约束体系优化
原约束文件（p0-p3-constraints.md）可能存在：
- 优先级定义不清晰
- 与工程宪章重复的内容
- 验证方法不够具体

**修改要求**:
- 明确 P0-P3 优先级定义
- 删除与工程宪章重复内容
- 补充具体验证方法

## REMOVED Requirements

### Requirement: 过时内容
**删除内容**:
- Skill-first 相关表述（已全部删除）
- Prompt Pack 相关引用（已删除）
- 旧目录引用（02_skill_matrix、04_reference 等）

**原因**: SOP v3.0.0 已完全转变为 Spec-first 架构

### Requirement: 多余描述
**删除内容**:
- 过多的背景说明
- 重复的定义解释
- 过长的示例（下沉到参考资料）

**原因**: 保持文档简洁，长内容下沉

## 审查检查清单

### 工程宪章（P0 级）
- [ ] project-charter.md: 愿景、核心价值、成功标准
- [ ] quality-redlines.md: P0 红线（安全/质量/合规/架构）
- [ ] architecture-principles.md: 分层架构、依赖方向、DDD 模式
- [ ] security-baseline.md: 身份验证、数据加密、输入验证

### 规范分层（P1-P2 级）
- [ ] index.md: 系统规范索引
- [ ] system-spec.md: 系统级规范定义

### 工作流（5 阶段）
- [ ] index.md: 工作流总览
- [ ] stage-0-weight.md: 规范重量选择
- [ ] stage-1-design.md: 理解与设计
- [ ] stage-2-implement.md: 实现与验证
- [ ] stage-3-deliver.md: 交付与同步
- [ ] stage-4-archive.md: 归档与演化
- [ ] deep_path.md: 重规范路径
- [ ] fast_path.md: 轻规范路径
- [ ] three_strike_rule.md: 三振规则
- [ ] contracts/: 5 个契约文件

### Skill 定义
- [ ] index.md: Skill 索引
- [ ] specification/: Spec 驱动 Skill
- [ ] design/: 设计 Skill
- [ ] implementation/: 实现 Skill
- [ ] delivery/: 交付 Skill

### 约束体系（P0-P3）
- [ ] index.md: 约束索引
- [ ] p0-constraints.md: P0 级约束（不可违背）
- [ ] p1-constraints.md: P1 级约束（跨模块）
- [ ] p2-constraints.md: P2 级约束（单模块）
- [ ] p3-constraints.md: P3 级约束（实现细节）
- [ ] state-dictionary.md: 状态字典
- [ ] command-dictionary.md: 命令字典

### 模板体系
- [ ] index.md: 模板索引
- [ ] contracts/: 契约模板（3 个）
- [ ] documents/: 文档模板（4 个）
- [ ] reports/: 报告模板（2 个）

### 参考资料
- [ ] index.md: 参考索引

---

**Spec 版本**: v1.0.0  
**创建时间**: 2026-03-01  
**审查范围**: `d:\Code\AI\OpenSpec-mumu\docs\参考\sop` (45 个文件)
