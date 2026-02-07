## 目标
创建一个名为 **Skeptic（质疑者）** 的新角色，专门用于对 Prometheus 的架构设计文档进行挑刺和审查。

## 角色定义

### Skeptic - 质疑者
**一句话定义**：负责审查架构设计文档，发现潜在问题、遗漏和风险。

**职责**：
- 审查 Prometheus 的架构设计文档
- 提出质疑、发现盲点、指出风险
- 确保设计的完整性、一致性和可实现性

**权限**：
- 读取：架构设计文档、相关代码
- 写入：审查意见、问题列表
- 禁止：修改设计文档、编写代码

## 工作流程

```
Prometheus 完成架构设计
        ↓
Skeptic 进行审查（第1轮挑刺）
        ↓
Prometheus 回复并修正
        ↓
Skeptic 再次审查（第2轮挑刺）
        ↓
   ... 循环继续 ...
        ↓
Skeptic 无法继续挑刺 / Prometheus 无法回复
        ↓
寻求用户反馈和决策
        ↓
用户决策后进入下一阶段（Oracle）
```

## 实施步骤

1. **创建 Skeptic 角色文档**
   - 在 `02_role_matrix/skeptic.md` 创建角色定义
   - 更新 `02_role_matrix/index.md` 添加新角色

2. **定义审查标准和流程**
   - 审查检查清单
   - 挑刺的维度（完整性、一致性、可实现性、性能、安全等）
   - 回复和修正的规范

3. **更新工作流**
   - 修改 `03_workflow/deep_path.md`
   - 在 Prometheus 之后增加 Skeptic 审查环节
   - 定义循环审查的终止条件

4. **创建审查交互模板**
   - 审查意见格式
   - Prometheus 回复格式
   - 用户决策请求格式

## 循环终止条件

- **正常终止**：Skeptic 认为设计已无重大问题
- **异常终止**：
  - Prometheus 无法回复 Skeptic 的质疑（3次尝试后）
  - Skeptic 和 Prometheus 陷入僵局
  - 需要用户介入决策

## 更新文件列表

1. `02_role_matrix/skeptic.md` - 新角色定义
2. `02_role_matrix/index.md` - 更新角色矩阵
3. `03_workflow/deep_path.md` - 更新工作流
4. `04_reference/interaction_formats/design_review.md` - 审查交互格式