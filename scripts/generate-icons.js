const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '..', 'public', 'favicon.jpg');
const outputDir = path.join(__dirname, '..', 'public');

// 生成各种尺寸的图标
const sizes = [192, 512];

async function generateIcons() {
  console.log('Generating PWA icons...');
  console.log('Input:', inputFile);
  
  for (const size of sizes) {
    const outputFile = path.join(outputDir, `favicon-${size}x${size}.png`);
    
    await sharp(inputFile)
      .resize(size, size, { fit: 'cover' })
      .png()
      .toFile(outputFile);
    
    console.log(`✓ Generated ${size}x${size} icon`);
  }
  
  // 生成小尺寸 favicon
  await sharp(inputFile)
    .resize(32, 32, { fit: 'cover' })
    .png()
    .toFile(path.join(outputDir, 'favicon.png'));
  
  console.log('✓ Generated favicon.png');
  console.log('Done!');
}

generateIcons().catch(console.error);
