# PowerShell 脚本：将 nav-data.ts 转换为 JSON
# 运行: powershell -File scripts/convert-to-json.ps1

$ErrorActionPreference = "Stop"

# 读取文件
$content = Get-Content -Path "data/nav-data.ts" -Raw -Encoding UTF8

# 提取 navData 数组
$navDataPattern = 'export const navData: NavItem\[\] = ([\s\S]*?)(?=export const categories)'
$navDataMatch = [regex]::Match($content, $navDataPattern)

if (-not $navDataMatch.Success) {
    Write-Error "无法找到 navData"
    exit 1
}

$navDataContent = $navDataMatch.Groups[1].Value.Trim()

# 提取 categories 数组
$categoriesPattern = 'export const categories: Category\[\] = ([\s\S]*?)(?=\/\*\* 为每个分类)'
$categoriesMatch = [regex]::Match($content, $categoriesPattern)

if (-not $categoriesMatch.Success) {
    Write-Error "无法找到 categories"
    exit 1
}

$categoriesContent = $categoriesMatch.Groups[1].Value.Trim()

# 转换为 JSON 的辅助函数
function Convert-TsArrayToJson($content) {
    # 移除注释
    $content = $content -replace '//.*$', '' -replace '/\*[\s\S]*?\*/', ''

    # 将单引号转为双引号
    $content = $content -replace "'", '"'

    # 移除尾随逗号
    $content = $content -replace ',(\s*[}\]])', '$1'

    # 尝试解析
    try {
        return $content | ConvertFrom-Json
    } catch {
        Write-Error "JSON 解析失败: $_"
        throw
    }
}

try {
    $navData = Convert-TsArrayToJson $navDataContent
    $categories = Convert-TsArrayToJson $categoriesContent

    # 创建完整数据对象
    $fullData = @{
        meta = @{
            name = "MyNuxtNav 导航数据"
            version = "1.0.0"
            lastUpdated = (Get-Date -Format "yyyy-MM-dd")
            totalSites = $navData.Count
            totalCategories = $categories.Count
        }
        categories = $categories
        sites = $navData
    }

    # 保存文件
    $fullData | ConvertTo-Json -Depth 10 | Out-File -FilePath "data/nav-data.json" -Encoding UTF8
    $navData | ConvertTo-Json -Depth 10 | Out-File -FilePath "data/sites.json" -Encoding UTF8
    $categories | ConvertTo-Json -Depth 10 | Out-File -FilePath "data/categories.json" -Encoding UTF8

    Write-Host "✓ 数据转换完成" -ForegroundColor Green
    Write-Host "  - data/nav-data.json ($($navData.Count) 个网站)" -ForegroundColor Gray
    Write-Host "  - data/sites.json" -ForegroundColor Gray
    Write-Host "  - data/categories.json ($($categories.Count) 个分类)" -ForegroundColor Gray

} catch {
    Write-Error "转换失败: $_"
    exit 1
}
