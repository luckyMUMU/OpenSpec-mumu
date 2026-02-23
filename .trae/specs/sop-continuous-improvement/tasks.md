# Tasks

## 阶段一：短期改进（v2.8.1）

- [x] Task 1: 创建版本更新检查清单
  - [x] 创建 `05_constraints/version_sync_checklist.md`
  - [x] 定义检查项（版本号核对、SSOT 引用、链接可达性）
  - [x] 定义检查流程（步骤顺序、责任人、输出格式）

- [x] Task 2: 更新 CHANGELOG.md
  - [x] 在版本历史模板中增加检查清单引用
  - [x] 更新版本号规则说明

- [x] Task 3: 更新 sop_GUIDE.md
  - [x] 增加审查触发条件章节
  - [x] 增加版本同步检查清单引用
  - [x] 增加 SSOT 漂移监控方法

## 阶段二：中期改进（v2.8.2）

- [x] Task 4: 建立 SSOT 漂移监控方法
  - [x] 定义漂移检测规则（状态/命令/约束引用）
  - [x] 创建漂移检测检查清单
  - [x] 更新到 `05_constraints/` 目录
  
- [x] Task 5: 更新审查交付物模板
  - [x] 在 `04_reference/interaction_formats/` 增加漂移检测报告模板
  - [x] 更新 `04_reference/index.md` 索引

## 阶段三：长期改进（v2.9.0+）

- [x] Task 6: 设计自动化检查方案
  - [x] 调研技术可行性（脚本/工具/CI集成）
  - [x] 编写自动化检查需求文档
  - [x] 评估实施成本

# Task Dependencies

- Task 2 依赖 Task 1 完成
- Task 3 依赖 Task 1 完成
- Task 4 可与 Task 1-3 并行
- Task 5 依赖 Task 4 完成
- Task 6 可独立进行
