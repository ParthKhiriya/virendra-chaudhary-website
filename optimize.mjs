import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const galleryDir = path.join(process.cwd(), 'public', 'images', 'gallery', 'new');

async function optimizeImages() {
  try {
    const files = await fs.readdir(galleryDir);
    
    for (const file of files) {
      if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpeg')) {
        const inputPath = path.join(galleryDir, file);
        const ext = path.extname(file);
        const baseName = path.basename(file, ext);
        const outputPath = path.join(galleryDir, `${baseName}.webp`);

        console.log(`Processing ${file}...`);
        
        await sharp(inputPath)
          .resize(1200, null, { withoutEnlargement: true }) // resize to max 1200px width, auto height
          .webp({ quality: 80 }) // convert to webp at 80% quality
          .toFile(outputPath);
          
        console.log(`Successfully converted to ${baseName}.webp`);
        
        // Optional: delete original to save space
        // await fs.unlink(inputPath);
      }
    }
    console.log('All images optimized successfully.');
  } catch (err) {
    console.error('Error optimizing images:', err);
  }
}

optimizeImages();
