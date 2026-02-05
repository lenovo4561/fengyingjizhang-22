const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const inputPath = path.join(__dirname, '../src/assets/images/logo.png')
const outputPath = path.join(__dirname, '../src/assets/images/logo.png')

// 确保目录存在
const outputDir = path.dirname(outputPath)
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

console.log('开始压缩 logo...')
console.log('输入文件:', inputPath)
console.log('输出文件:', outputPath)

sharp(inputPath)
  .resize(192, 192, {
    fit: 'cover',
    position: 'center'
  })
  .png({
    quality: 90,
    compressionLevel: 9
  })
  .toFile(outputPath + '.tmp')
  .then(() => {
    // 替换原文件
    fs.renameSync(outputPath + '.tmp', outputPath)
    console.log('✓ Logo 压缩完成：192x192')

    // 输出文件大小
    const stats = fs.statSync(outputPath)
    const fileSizeInKB = (stats.size / 1024).toFixed(2)
    console.log(`✓ 文件大小: ${fileSizeInKB} KB`)
  })
  .catch(err => {
    console.error('压缩失败:', err)
    process.exit(1)
  })
