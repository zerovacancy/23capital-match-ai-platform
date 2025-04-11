// This script generates the Open Graph image for social sharing
// Run with: node scripts/generate-og-image.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateOGImage() {
  console.log('Generating Open Graph image...');
  
  // Create directory if it doesn't exist
  const dir = path.join(__dirname, '../public/assets/images/social');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Launch puppeteer
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set viewport to OG image dimensions
    await page.setViewport({
      width: 1200,
      height: 630,
      deviceScaleFactor: 2 // Higher resolution
    });
    
    // Load template HTML
    const templatePath = path.join(__dirname, '../public/assets/images/social/og-template.html');
    const templateHtml = fs.readFileSync(templatePath, 'utf8');
    await page.setContent(templateHtml, { waitUntil: 'networkidle0' });
    
    // Wait for any animations/rendering to complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take screenshot
    const outputPath = path.join(__dirname, '../public/assets/images/social/og-image.png');
    await page.screenshot({
      path: outputPath,
      type: 'png'
    });
    
    console.log(`Open Graph image generated at: ${outputPath}`);
  } catch (error) {
    console.error('Error generating OG image:', error);
  } finally {
    await browser.close();
  }
}

generateOGImage();