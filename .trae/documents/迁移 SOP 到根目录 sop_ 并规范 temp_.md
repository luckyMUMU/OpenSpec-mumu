## 目标
- 将 SOP 从 `docs/参考/sop` 迁移到仓库根目录 `sop/`。
- 将“非持久化/临时产物”统一迁移到仓库根目录 `temp/`（原 `.temp/` 逻辑目录改为 `temp/`）。

## 现状影响面（只读扫描结论）
- 仓库内存在多处硬编码路径：`docs/参考/sop`、`docs/参考/sop_GUIDE.md`、以及 `.temp/`（主要出现在 skills/prompt/目录映射）。
- `.temp/` 当前被用于“调度状态/审计报告/复用决策/架构审查报告”等临时或中间产物，需要改为 `temp/`。

## 迁移策略
### 1) 目录与文件迁移（物理位置）
- 新建根目录：`sop/`、`temp/`。
- 迁移 SOP 主体：
  - `docs/参考/sop/**` → `sop/**`
  - `docs/参考/sop_GUIDE.md` → `sop/sop_GUIDE.md`
  - `docs/参考/sop_for_human.md` → `sop/sop_for_human.md`
- 兼容性（可选但推荐）：
  - 在旧位置保留极简“跳转/说明”文件（例如 `docs/参考/sop/README.md`、`docs/参考/sop_GUIDE.md` 的占位提示），避免外部文档/历史链接瞬断。

### 2) 路径与引用更新（内容一致性）
- 全量替换/修正以下硬编码引用：
  - `docs/参考/sop/...` → `sop/...`
  - `docs/参考/sop_GUIDE.md` → `sop/sop_GUIDE.md`
- 更新文档目录映射：
  - `04_reference/document_directory_mapping.md` 中：
    - “避免在 `docs/参考/sop` 内使用相对路径” → 改为 “避免在 `sop` 内使用会断链的相对路径”
    - `.temp/` → `temp/`
- 更新临时产物落盘位置：
  - 所有出现 `.temp/...` 的 skills/prompts 文本，改为 `temp/...`
  - 保留语义：这些产物依旧是“中间态/可覆盖”，不进入 SOP 的 reviews（reviews 仍用于持久化审查记录）。
- 更新 SOP 内关于“参考目录”的约束描述：
  - 将“非Librarian修改 `/docs/参考/`”这类规则，补充/调整为“非Librarian修改 `sop/`”为主（保留 `docs/参考/` 的规则作为历史参考目录约束或按需删除）。

### 3) reviews 与 temp 的边界
- `sop/reviews/YYYY-MM-DD/`：作为审查的持久化交付物目录（保留不动，仅随 SOP 迁移）。
- `temp/`：用于 `.temp/*` 这类临时/非持久化文件（调度状态、一次性审计输出、临时报告等）。

## 验证与回归
- 结构验证：`sop/` 与 `temp/` 存在，且 SOP 全部文件在新位置可访问。
- 引用验证：全仓扫描不再出现以下字符串（除旧位置跳转说明文件外）：
  - `docs/参考/sop`、`docs/参考/sop_GUIDE.md`、`.temp/`
- SSOT 验证：`sop/05_constraints/state_dictionary.md` 与 `command_dictionary.md` 中的路径描述与新目录一致。
- 产物验证：skills/prompts 中的“落盘路径”均指向 `temp/` 或项目逻辑目录（docs/01..04、src/**、tests/**）。

## 交付物
- 新目录：`sop/`、`temp/`（可含 `.gitkeep`）
- 更新后的 SOP 全量文档与引用
-（可选）旧路径跳转说明文件，避免历史链接断裂