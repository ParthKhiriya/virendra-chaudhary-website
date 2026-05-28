import path from 'path';
import sharp from 'sharp';
import fs from 'fs/promises';

const galleryDir = path.join(process.cwd(), 'public', 'images', 'gallery', 'new');
const imagesToRotate = ['0L4A9235.webp'];

async function rotateImages() {
  for (const img of imagesToRotate) {
    try {
      const imgPath = path.join(galleryDir, img);
      
      console.log(`Rotating ${img}...`);
      
      const buffer = await fs.readFile(imgPath);
      
      // Rotate 90 degrees counter-clockwise (270 degrees clockwise)
      await sharp(buffer)
        .rotate(270) // or -90
        .toFile(imgPath);
      
      console.log(`Successfully rotated ${img}`);
    } catch (err) {
      console.error(`Error rotating ${img}:`, err);
    }
  }
}

rotateImages();
