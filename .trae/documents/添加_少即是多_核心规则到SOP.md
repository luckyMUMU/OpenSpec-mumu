## 目标

为 `d:\Code\AI\OpenSpec-mumu\docs\参考\sop` 添加"少即是多"核心规则，但不更新 sop_GUIDE.md。

## 更新内容

### 1. 更新 01_concept_overview.md
在"核心原则"部分添加"少即是多"原则：
- 先查看是否有需要的能力
- 如果不存在或不足够，优先选择改进优化已有
- 创造新的逻辑后要验证过时或相似代码被处理

### 2. 更新 AGENT_SOP.md
在"核心原则"部分添加简要说明

### 3. 更新 AGENT_SOP_COMPACT.md
添加简要规则说明

### 4. 创建 Skill
创建 `sop-capability-reuse` Skill，指导 Agent 如何复用和优化能力：
- 检查现有能力
- 评估改进 vs 新建
- 新建后清理过时代码

## 输出
- 更新后的文档（01_concept_overview.md, AGENT_SOP.md, AGENT_SOP_COMPACT.md）
- 新增 Skill（sop-capability-reuse）