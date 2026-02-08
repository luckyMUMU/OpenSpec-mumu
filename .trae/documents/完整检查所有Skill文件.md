## 检查目标
完整检查 `sop/skills/` 目录下的所有 Skill 文件，确保：
1. frontmatter 格式正确
2. 内容与其他文档一致
3. 交叉引用正确
4. 没有遗漏或过时的信息

## Skill 文件清单

| Skill 文件 | 用途 | 检查重点 |
|------------|------|----------|
| sop-workflow-orchestrator/SKILL.md | 工作流编排 | 路径定义、角色分配 |
| sop-requirement-analyst/SKILL.md | 需求分析 | 6维度分析、PRD生成 |
| sop-architecture-design/SKILL.md | 架构设计 | 伪代码规范、L2定义 |
| sop-architecture-reviewer/SKILL.md | 架构审查 | 审查维度、循环机制 |
| sop-implementation-designer/SKILL.md | 实现设计 | L3映射、技术选型 |
| sop-code-explorer/SKILL.md | 代码审计 | 审计范围、影响评估 |
| sop-code-implementation/SKILL.md | 代码实现 | 三错即停、编码规范 |
| sop-document-sync/SKILL.md | 文档同步 | 渐进披露、索引更新 |
| sop-progress-supervisor/SKILL.md | 进度监管 | 熔断机制、异常检测 |
| sop-fast-path/SKILL.md | 快速路径 | 触发条件、简化流程 |
| sop-deep-path/SKILL.md | 深度路径 | 完整流程、停止点 |
| sop-design-placement/SKILL.md | 设计放置 | 文档位置、复杂度判断 |
| sop-capability-reuse/SKILL.md | 能力复用 | 复用规则、改进流程 |
| sop-tdd-workflow/SKILL.md | TDD工作流 | 测试独立、权限隔离 |

## 检查维度

1. **frontmatter 完整性**
   - name 字段是否存在
   - description 字段是否存在
   - 格式是否正确

2. **内容一致性**
   - 角色定义是否与其他文档一致
   - 路径定义是否与其他文档一致
   - 停止点是否统一

3. **交叉引用**
   - 链接是否正确
   - 引用的文档是否存在
   - 版本号是否一致

4. **完整性**
   - 输入输出是否明确
   - 约束条件是否清晰
   - 使用场景是否说明

## 输出
- 每个 Skill 文件的检查结果
- 发现的问题列表
- 修复建议