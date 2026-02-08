## 审查目标
对 `sop/` 目录进行系统性审查，确保全局一致且流程顺畅。

## 审查维度

### 1. 角色定义一致性
检查各文件中角色描述是否一致：
- AGENT_SOP.md 中的角色定义
- ROLE_CHEATSHEET.md 中的角色速查
- 02_role_matrix/index.md 中的权限矩阵
- 各 Prompt 文件中的角色定义

### 2. 工作流完整性
检查工作流是否完整：
- 快速路径：Explorer → Worker → Librarian
- 深度路径：Analyst → Prometheus ↔ Skeptic → Oracle → Worker → Librarian
- TDD深度路径：Analyst → Prometheus ↔ Skeptic → Oracle → Tester → Worker + TestWorker → Librarian
- 各路径的触发条件是否明确
- 角色转换是否顺畅

### 3. 文档层级一致性
检查 L1-L4 定义是否统一：
- L1: 概念/项目级 (PRD)
- L2: 逻辑/模块级 (MRD, .pseudo)
- L3: 技术/功能级 (FRD, design.md, CSV, 原型)
- L4: 决策参考 (ADR)

### 4. 权限矩阵准确性
检查各角色权限：
- 读/写权限是否正确
- 测试文件权限隔离是否明确
- 特殊权限（如Tester唯一维护CSV）是否标注

### 5. 停止点完整性
检查所有关键节点：
- `[WAITING_FOR_REQUIREMENTS]` - Analyst
- `[WAITING_FOR_ARCHITECTURE]` - Prometheus
- `[ARCHITECTURE_PASSED]` - Skeptic
- `[WAITING_FOR_DESIGN]` - Oracle
- `[WAITING_FOR_TEST_REVIEW]` - Tester
- Diff展示 - Worker

### 6. Prompt 与 Skill 一致性
检查指令与功能模块：
- Prompt 中的角色与 Skill 定义是否匹配
- Skill 的 frontmatter 是否正确
- Skill 的调用条件是否明确

### 7. 模板完整性
检查所有模板：
- project_prd.md (L1)
- module_mrd.md (L2)
- feature_frd.md (L3)
- prototype_guide.md (L3)
- architecture_design.md (L2)
- implementation_design.md (L3)
- adr.md (L4)
- test_cases.csv (L3)

### 8. 交叉引用正确性
检查链接和引用：
- 文档间链接是否正确
- 路径引用是否一致
- 版本号是否统一

## 审查步骤

1. **读取关键文件** - AGENT_SOP.md, ROLE_CHEATSHEET.md, 02_role_matrix/index.md
2. **检查角色定义** - 对比各文件中的角色描述
3. **检查工作流** - 验证路径完整性和角色转换
4. **检查文档层级** - 验证 L1-L4 定义一致性
5. **检查权限矩阵** - 验证权限定义准确性
6. **检查模板** - 验证模板完整性和一致性
7. **汇总问题** - 列出发现的不一致和问题
8. **提出修复方案** - 针对问题提出修复建议

## 预期输出

审查报告包含：
1. 发现的问题列表
2. 不一致点详细说明
3. 修复建议
4. 优先级排序（高/中/低）