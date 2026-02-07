## 调整目标
参考 `document_llm_GUIDE.md` 规范，将 SOP 架构设计文档调整为基于渐进式披露的多层级结构。

## 当前 vs 目标

| 层级 | 当前 | 目标 (基于document_llm_GUIDE) |
|------|------|------------------------------|
| L1 | PRD (需求) | 核心概念 (已存在) |
| L2 | 架构设计 `.pseudo` | **逻辑工作流 `.pseudo`** (强化伪代码) |
| L3 | 实现设计 `design.md` | **技术规格** (接口/数据结构) |
| L4 | 无 | **决策参考 ADR** (新增) |

## 具体修改

### 1. 更新架构设计模板 (`document_templates/architecture_design.md`)
- 强化伪代码规范 (UPPER_SNAKE_CASE, 4空格缩进)
- 明确 L2 层职责：只写逻辑，不写技术细节
- 添加伪代码示例

### 2. 更新实现设计模板 (`document_templates/implementation_design.md`)
- 对应 L3 技术规格层
- 明确技术选型、接口契约、数据模型
- 与 L2 伪代码建立映射关系

### 3. 新增 ADR 模板 (`document_templates/adr.md`)
- 对应 L4 决策参考层
- 记录架构决策 (Why)
- 包含决策背景、选项对比、选择理由

### 4. 更新参考文档索引 (`04_reference/index.md`)
- 添加 L2-L4 层级说明
- 更新模板链接
- 添加伪代码规范详情

### 5. 更新 Prometheus Prompt
- 明确 L2 层职责 (逻辑工作流)
- 强调技术无关性
- 输出指向 `.pseudo` 文件

### 6. 更新 Oracle Prompt
- 明确 L3 层职责 (技术规格)
- 建立与 L2 伪代码的映射
- 输出指向 `03_technical_spec/` 或 `design.md`

## 文件清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `document_templates/architecture_design.md` | 更新 | 强化L2伪代码规范 |
| `document_templates/implementation_design.md` | 更新 | 对应L3技术规格 |
| `document_templates/adr.md` | 新增 | L4决策参考 |
| `04_reference/index.md` | 更新 | 添加L2-L4层级 |
| `prompts/prometheus_prompt.md` | 更新 | 明确L2职责 |
| `prompts/oracle_prompt.md` | 更新 | 明确L3职责 |

## 层级对应关系

```
L1 (概念)     → 01_concept_overview.md
L2 (逻辑)     → 02_logical_workflow/*.pseudo (Prometheus)
L3 (技术)     → 03_technical_spec/* 或 src/**/design.md (Oracle)
L4 (决策)     → 04_context_reference/adr_*.md (Prometheus/Oracle)
```