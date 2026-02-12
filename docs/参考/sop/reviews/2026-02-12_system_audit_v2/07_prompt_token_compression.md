---
version: v2.0.0
updated: 2026-02-12
artifact: Prompt Optimization Report
---

# Prompt 优化实验（准确与效果优先）

## 原则

- 第一优先级：准确传达与执行效果。
- 仅在不影响语义与可执行性的前提下做压缩；否则保持不变或适度增补。

## 范围

- `docs/参考/sop/prompts/packs/default/**.md`（system/operator/skills + pack 索引）

## 度量方法

- 以字符数（UTF-8 string length）为主度量，并给出近似 token：`tokens≈chars/4`（粗估，仅用于相对变化）。
- baseline 使用 `git show HEAD:<path>` 的同路径文件内容。

## 结果摘要

- 对“既有 prompt 文件集合”（不含新增 `default/index.md`）做了安全压缩：字符数约 **-4.7%**（近似 token 同比例下降）。\n- 新增 `default/index.md` 是为可发现性与 ≤3 跳结构服务，整体 pack 目录字符数会相应增加；该增量属于“效果优先”的结构性成本。

## 采取的安全压缩手段（不改语义）

- 去冗余结构：减少重复分隔线与多余空行。
- 文本收敛：将“输出风格（固定）”统一为“输出”，并保持“必须包含/必须输出”类硬约束不变。
- 标题简化：例如 `(default pack)` → `(default)`（不改变 pack 含义）。

## 未做的压缩（原因）

- 未将各 skill prompt 的通用部分抽到共享引用文件：虽然可进一步减 token，但会增加“读者需要跳转加载”的成本，且容易削弱“单文件即可执行”的效果。
