import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const directory = 'public/images/new_images';

async function processDirectory(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        console.log(`Compressing: ${fullPath}`);
        const tempPath = fullPath + '.tmp';
        try {
          // Read into buffer to avoid Windows file locks
          const buffer = await fs.readFile(fullPath);
          const image = sharp(buffer);
          const metadata = await image.metadata();
          
          // Resize if extremely large (e.g., > 1920 width), otherwise just compress
          const maxWidth = 1920;
          let pipeline = image;
          if (metadata.width > maxWidth) {
            pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
          }

          if (ext === '.jpg' || ext === '.jpeg') {
            pipeline = pipeline.jpeg({ quality: 75, mozjpeg: true });
          } else if (ext === '.png') {
            pipeline = pipeline.png({ quality: 75, compressionLevel: 9 });
          } else if (ext === '.webp') {
            pipeline = pipeline.webp({ quality: 75 });
          }

          await pipeline.toFile(tempPath);
          
          const origStat = await fs.stat(fullPath);
          const newStat = await fs.stat(tempPath);
          
          console.log(`  Size reduced: ${(origStat.size / 1024 / 1024).toFixed(2)}MB -> ${(newStat.size / 1024 / 1024).toFixed(2)}MB`);
          
          if (newStat.size < origStat.size) {
            await fs.rename(tempPath, fullPath);
          } else {
            console.log(`  New file is larger, keeping original.`);
            await fs.unlink(tempPath);
          }
        } catch (err) {
          console.error(`  Failed to compress ${fullPath}:`, err);
        }
      }
    }
  }
}

processDirectory(directory).then(() => {
  console.log('Done compressing images.');
}).catch(err => {
  console.error(err);
});
