## 目标
更新 SOP 文档，使其完全符合已定义的9个角色关系。主要修改以下文件：

## 需要修改的文件

### 1. `02_role_matrix/router.md`
**问题**：深度路径流程缺少 Analyst 和 Skeptic 角色

**修改内容**：
- 更新深度路径流程图，添加 Analyst 和 Skeptic
- 更新涉及角色列表
- 更新角色分配指南

### 2. `03_workflow/deep_path.md`
**问题**：已更新，但需要检查一致性

**检查内容**：
- 确认流程图正确
- 确认各阶段描述准确
- 确认停止点完整

### 3. `03_workflow/fast_path.md`
**问题**：需要检查是否需要更新

**检查内容**：
- 确认快速路径流程
- 确认涉及角色

### 4. `AGENT_SOP.md`
**问题**：需要确保入口文件反映最新角色关系

**检查内容**：
- 确认角色列表完整
- 确认工作流流程正确

## 角色关系确认

```
新项目/大重构：
Analyst → Prometheus ↔ Skeptic → Oracle → Worker → Librarian
  需求    架构设计   架构审查   实现设计   编码实现   文档维护

功能迭代：
Analyst → Oracle → Worker → Librarian
  需求    实现设计   编码实现   文档维护

快速路径：
Explorer → Worker → Librarian
  审计     编码实现   文档维护
```

## 具体修改计划

1. **router.md**:
   - 更新深度路径处理流程
   - 添加 Analyst 到流程
   - 添加 Skeptic 到流程
   - 更新角色分配指南表格

2. **fast_path.md** (检查):
   - 确认流程正确
   - 确认角色正确

3. **AGENT_SOP.md** (检查):
   - 确认角色总览正确
   - 确认工作流概览正确