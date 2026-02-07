## 目标

添加规则到 `sop/`，明确：
1. 项目架构设计文档放置位置为 `/docs`
2. 非指定不变更 `/docs/参考`
3. `design.md` 的创建应基于代码模块/能力划分和代码复杂度判断
4. 不同模块的根目录的 `design.md` 应包含接口契约进行解耦

## 更新内容

### 1. 更新 04_reference/index.md
添加文档放置规则：
- 项目设计文档 → `/docs/`
- SOP参考文档 → `/docs/参考/`（非指定不变更）
- design.md 放置规则（基于模块划分和复杂度）
- 接口契约规范

### 2. 更新 AGENT_SOP.md
更新文档位置章节，添加 `/docs` 作为项目设计文档位置

### 3. 创建 sop-design-placement Skill
指导 Agent 如何正确放置设计文档：
- 判断设计文档类型
- 确定放置位置（/docs vs /docs/参考）
- 模块划分原则
- 复杂度判断
- 接口契约规范

### 4. 更新 Oracle Prompt
添加 design.md 创建和放置规则

## 输出
- 更新后的 04_reference/index.md
- 更新后的 AGENT_SOP.md
- 新增 sop-design-placement Skill
- 更新后的 Oracle Prompt