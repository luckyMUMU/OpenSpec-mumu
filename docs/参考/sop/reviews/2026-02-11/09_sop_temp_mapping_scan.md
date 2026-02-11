---
date: 2026-02-11
baseline: v1.5.0
topic: sop_mapping_to_root_sop_and_temp
---

# 09 SOP 映射调整回归扫描（sop/ + temp/）

## 目标

- SOP 默认落地位置使用 `sop/`
- 临时/非持久化产物使用 `temp/`

## 扫描结论（摘要）

- `.temp/`：未发现残留
- `docs/参考/sop_GUIDE.md`：未发现残留
- `docs/参考/sop/reviews/`：未发现残留
- `docs/参考/sop/skills/`：未发现残留
- `docs/参考/sop/`：仅保留在 `document_directory_mapping.md` 的“本仓库参考位置”列，用于指向本仓库的参考实现路径
