import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

async function generateFavicons() {
  const inputFile = path.join(process.cwd(), 'src', 'assets', 'bk-logo.jpg');
  const publicDir = path.join(process.cwd(), 'public');

  // Ensure public directory exists
  await fs.mkdir(publicDir, { recursive: true });

  // Generate PNG files
  // Generate favicon-16x16.png
  await sharp(inputFile)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));

  // Also save as favicon.ico (browsers will accept PNG as ico)
  await sharp(inputFile)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));

  // Generate favicon-32x32.png
  await sharp(inputFile)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));

  // Generate apple-touch-icon.png (180x180)
  await sharp(inputFile)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  console.log('Favicons generated successfully!');
}

generateFavicons().catch(console.error);