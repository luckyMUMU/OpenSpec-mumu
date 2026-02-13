# SOP 版本统一脚本
# 用途：将 SOP 文档的版本号从 v2.0.0 统一更新到 v2.1.0

param(
    [string]$TargetDir = "d:\code\AI\openspec-mumu\docs\参考\sop",
    [string]$OldVersion = "v2.0.0",
    [string]$NewVersion = "v2.1.0",
    [switch]$Preview,
    [switch]$Verbose
)

$ErrorActionPreference = "Stop"

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $color = switch ($Level) {
        "INFO" { "White" }
        "WARN" { "Yellow" }
        "ERROR" { "Red" }
        "SUCCESS" { "Green" }
        default { "White" }
    }
    Write-Host "[$timestamp] [$Level] $Message" -ForegroundColor $color
}

function Get-MarkdownFiles {
    param([string]$Path)
    Get-ChildItem -Path $Path -Filter "*.md" -Recurse -File -ErrorAction SilentlyContinue
}

function Update-VersionInFile {
    param([string]$FilePath, [string]$OldVer, [string]$NewVer)

    $content = Get-Content -Path $FilePath -Raw -Encoding UTF8
    $originalContent = $content

    # 模式1: frontmatter 格式 (version: v2.0.0)
    $content = $content -replace "version:\s*$OldVer", "version: $NewVersion"

    # 模式2: 行内版本标注 (> **版本**: v2.0.0)
    $content = $content -replace "> \*\*版本\*\*:\s*$OldVer", "> **版本**: $NewVersion"

    # 模式3: 纯文本版本 (版本: v2.0.0 在行首)
    $content = $content -replace "^> 版本: $OldVer", "> 版本: $NewVersion"

    if ($content -ne $originalContent) {
        Set-Content -Path $FilePath -Value $content -Encoding UTF8 -NoNewline
        return $true
    }
    return $false
}

# 主流程
Write-Log "========================================" "INFO"
Write-Log "SOP 版本统一脚本" "INFO"
Write-Log "目标目录: $TargetDir" "INFO"
Write-Log "旧版本: $OldVersion -> 新版本: $NewVersion" "INFO"
Write-Log "========================================" "INFO"

if ($Preview) {
    Write-Log "预览模式: 仅显示将要修改的文件，不实际修改" "WARN"
}

$files = Get-MarkdownFiles -Path $TargetDir
$totalFiles = $files.Count
$matchedFiles = 0
$updatedFiles = 0

Write-Log "扫描目录: $TargetDir" "INFO"
Write-Log "找到 $totalFiles 个 Markdown 文件" "INFO"

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8

    if ($content -match "version:\s*$OldVersion" -or $content -match "> \*\*版本\*\*:\s*$OldVersion" -or $content -match "^> 版本: $OldVersion") {
        $matchedFiles++

        if ($Verbose) {
            Write-Log "匹配文件: $($file.FullName)" "INFO"
        }

        if (-not $Preview) {
            $success = Update-VersionInFile -FilePath $file.FullName -OldVer $OldVersion -NewVer $NewVersion
            if ($success) {
                $updatedFiles++
                Write-Log "已更新: $($file.Name)" "SUCCESS"
            }
        } else {
            Write-Log "[预览] 将更新: $($file.FullName)" "WARN"
        }
    }
}

Write-Log "========================================" "INFO"
Write-Log "扫描完成" "INFO"
Write-Log "总文件数: $totalFiles" "INFO"
Write-Log "匹配文件数: $matchedFiles" "INFO"

if ($Preview) {
    Write-Log "预览模式未执行实际修改" "WARN"
} else {
    Write-Log "已更新文件数: $updatedFiles" "SUCCESS"
}

Write-Log "========================================" "INFO"

# 输出未匹配的文件（可选，用于调试）
if ($Verbose -and $matchedFiles -eq 0) {
    Write-Log "未找到匹配版本号的文件" "WARN"
}
