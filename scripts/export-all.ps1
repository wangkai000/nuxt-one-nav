# 批量数据导出脚本
# 一次性将 nav-data.ts 中的所有数据导出到 JSON

$inputFile = "D:\project1\nuxt\one-nav-ssg\data\nav-data.ts"
$outputFile = "D:\project1\nuxt\one-nav-ssg\data\nav-data.json"

Write-Host "开始导出数据..." -ForegroundColor Green
Write-Host "输入文件: $inputFile"

# 读取文件内容
$content = Get-Content -Path $inputFile -Raw -Encoding UTF8

# 提取 navData 数组（从 export const navData 到 // 分类定义）
$navDataPattern = '(?s)export const navData: NavItem\[\] = \[(.*?)\n\]\s*// 分类定义'
$navDataMatch = [regex]::Match($content, $navDataPattern)

if (-not $navDataMatch.Success) {
    Write-Error "无法找到 navData 数组"
    exit 1
}

$navDataContent = $navDataMatch.Groups[1].Value
Write-Host "找到 navData 数据"

# 提取 categories 数组
$catPattern = '(?s)export const categories: Category\[\] = \[(.*?)\n\]\s*/\*\* 为每个分类计算'
$catMatch = [regex]::Match($content, $catPattern)

if (-not $catMatch.Success) {
    Write-Error "无法找到 categories 数组"
    exit 1
}

$catContent = $catMatch.Groups[1].Value
Write-Host "找到 categories 数据"

# 转换函数
function Convert-ToJson($content) {
    # 保护字符串内的 URL
    $protected = $content -replace '(https?):(\/\/)', '__URL__$1__$2'
    
    # 转换
    $json = $protected `
        -replace "'", '"' `
        -replace ',(\s*[}\]])', '$1' `
        -replace '([{,]\s*)(\w+):\s*', '$1"$2": '
    
    # 恢复 URL
    $json = $json -replace '__URL__(https?)__(\/)', '$1:$2'
    
    return $json
}

# 转换数据
$navDataJson = Convert-ToJson $navDataContent
$catJson = Convert-ToJson $catContent

# 尝试解析
Write-Host "解析数据..."
try {
    $navData = $navDataJson | ConvertFrom-Json
    $categories = $catJson | ConvertFrom-Json
    
    Write-Host "解析成功!"
    Write-Host "  - 网站数量: $($navData.Count)"
    Write-Host "  - 分类数量: $($categories.Count)"
    
    # 构建完整数据
    $fullData = @{
        meta = @{
            name = "MyNuxtNav 导航数据"
            version = "1.0.0"
            lastUpdated = (Get-Date -Format "yyyy-MM-dd")
            description = "基于 Nuxt 3 的导航站数据"
            totalSites = $navData.Count
            totalCategories = $categories.Count
        }
        categories = $categories
        sites = $navData
    }
    
    # 写入文件
    $fullData | ConvertTo-Json -Depth 10 | Out-File -FilePath $outputFile -Encoding UTF8
    
    Write-Host "`n✓ 导出完成!" -ForegroundColor Green
    Write-Host "  输出文件: $outputFile"
    Write-Host "  文件大小: $([math]::Round((Get-Item $outputFile).Length / 1KB, 1)) KB"
    
} catch {
    Write-Error "解析失败: $_"
    
    # 保存调试文件
    $navDataJson | Out-File -FilePath "D:\project1\nuxt\one-nav-ssg\scripts\navdata_debug.json"
    $catJson | Out-File -FilePath "D:\project1\nuxt\one-nav-ssg\scripts\cat_debug.json"
    Write-Host "调试文件已保存到 scripts 目录"
}
