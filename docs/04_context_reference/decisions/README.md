# Decision Records

本目录用于落盘 `[USER_DECISION]` 相关决策记录（由 `RECORD_DECISION(topic, decision)` 产出），并要求在后续文档/产物中引用对应文件路径。

## 命名建议

- `[YYYYMMDD]_[topic].md`

## 最小结构

```markdown
# 决策记录（Decision Record）

## 元信息
- 日期: YYYY-MM-DD
- 主题: SOURCE_MISSING / DEPENDENCY_MISSING / CONFLICT
- 触发状态: [USER_DECISION]

## 缺口描述
- 缺少的来源/依赖: ...
- 影响: ...

## 选项
- A: ...
- B: ...
- C: ...

## 用户选择
- 选择: A/B/C/自定义
- 理由: ...

## 后续引用
- 必须在后续产物中引用本文件路径
```
