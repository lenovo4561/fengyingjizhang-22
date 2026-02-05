const sharp = require('sharp');
const path = require('path');

async function resizeImage(inputPath, outputPath, width, height) {
  try {
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(outputPath + '.tmp');
    
    // 重命名临时文件
    const fs = require('fs');
    fs.renameSync(outputPath + '.tmp', outputPath);
    
    console.log(`✓ 图片已压缩: ${path.basename(inputPath)} -> ${width}x${height}`);
  } catch (error) {
    console.error('压缩失败:', error.message);
  }
}

// 压缩 canyin.png 到 54x54
const inputPath = path.join(__dirname, '../src/pkg_main/assets/img/zhichu/canyin.png');
const outputPath = inputPath;

resizeImage(inputPath, outputPath, 54, 54);
