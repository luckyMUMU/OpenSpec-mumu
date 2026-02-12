## 现状诊断（可审计性缺口）
- 目前 `docs/参考/sop/**` 的版本信息存在多种写法：
  - 仅正文：`> **版本**` / `> **更新日期**`
  - 仅 YAML Frontmatter：`---\nversion: ...\nupdated: ...\n---`
  - 混合：如 `skills/**/SKILL.md` 既有 YAML（name/description）又在正文写版本。
- 这会导致：
  - 版本/更新时间无法被稳定机器抽取与批量核对
  - 同一文件存在双源版本字段（容易漂移）

## 目标（补全可审计性改进）
- 为 SOP 全域建立“可机器核对”的统一元数据：每个 Markdown 文件都具备 `version` 与 `updated`。
- 将“版本/日期”的单一真源收敛到 YAML Frontmatter，避免正文重复声明。
- 不引入平台/实现/特定执行者依赖；仅做元数据与一致性收敛。

## 统一元数据规范（将被应用）
### A) 通用文件
- 文件头必须包含：
  ```yaml
  ---
  version: v2.0.0
  updated: 2026-02-12
  ---
  ```
- 若正文存在 `> **版本**` / `> **更新日期**`：将其删除（避免双源）。

### B) 已有 YAML 的文件（例如 skills/**/SKILL.md）
- 在原 YAML 中追加字段，不新增第二段 YAML：
  - `version: v2.0.0`
  - `updated: 2026-02-12`
- 删除正文 `> **版本**: ...`（避免双源）。

### C) 特殊文件
- `CHANGELOG.md`：保留现有内容结构，同时补齐 YAML 头（不改正文版式）。

## 变更范围（按审查扫描结果收敛）
- `docs/参考/sop/` 根目录：AGENT_SOP、01_concept_overview、CHANGELOG、ROLE_CHEATSHEET、sop_for_human
- `02_skill_matrix/index.md`
- `03_workflow/*.md`
- `04_reference/*`（含 document_templates/、rag/README、prompt_pack.standard 等）
- `05_constraints/*.md`
- `prompts/packs/default/**`
- `skills/**/SKILL.md`（在现有 YAML 中追加 version/updated，并移除正文版本行）

## 实施步骤（你确认后我会执行）
1. 批量为上述缺失文件补齐 YAML `version/updated` 头。
2. 对存在正文版版本块的文件执行去重：删除正文版本/更新日期块，使 YAML 成为唯一真源。
3. 对 skills 的 YAML 头执行“追加字段”而不是新增第二段 YAML，并删除正文版本行。
4. 复核：全库检索确保每个目标文件都可抽取到 `version:` 与 `updated:`，且不存在重复版本声明。

## 验收标准
- 目标范围内所有 Markdown 文件：文件头均可见 `version: v2.0.0` 与 `updated: 2026-02-12`。
- `skills/**/SKILL.md` 不存在“YAML + 正文版本”双源。
- 不引入任何平台/实现细节词汇（hook/自动注入等）。