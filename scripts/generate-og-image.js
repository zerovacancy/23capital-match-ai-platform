// This script generates the Open Graph image for social sharing
// Run with: node scripts/generate-og-image.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Skip image generation in Vercel environment
async function generateOGImage() {
  // Check if running in Vercel environment
  if (process.env.VERCEL === '1') {
    console.log('Running in Vercel environment, skipping OG image generation');
    
    // Just copy the existing file if needed
    const sourceImagePath = path.join(__dirname, '../public/assets/images/global/logos/lg-logo.png');
    const dir = path.join(__dirname, '../public/assets/images/social');
    const outputPath = path.join(dir, 'og-image.png');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // If og-image doesn't exist yet, copy the logo as a fallback
    if (!fs.existsSync(outputPath) && fs.existsSync(sourceImagePath)) {
      fs.copyFileSync(sourceImagePath, outputPath);
      console.log(`Created fallback OG image at: ${outputPath}`);
    } else {
      console.log('OG image already exists or logo not found, skipping.');
    }
    return;
  }
  
  console.log('Generating Open Graph image...');
  
  try {
    // This code only runs in local environment
    const puppeteer = await import('puppeteer');
    
    // Create directory if it doesn't exist
    const dir = path.join(__dirname, '../public/assets/images/social');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Launch puppeteer
    const browser = await puppeteer.default.launch({
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
  } catch (error) {
    console.error('Error importing or using puppeteer:', error);
    
    // Fallback to copying the logo if puppeteer fails
    const sourceImagePath = path.join(__dirname, '../public/assets/images/global/logos/lg-logo.png');
    const dir = path.join(__dirname, '../public/assets/images/social');
    const outputPath = path.join(dir, 'og-image.png');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    if (fs.existsSync(sourceImagePath)) {
      fs.copyFileSync(sourceImagePath, outputPath);
      console.log(`Created fallback OG image at: ${outputPath}`);
    } else {
      console.error('Could not create fallback OG image: logo not found');
    }
  }
}

generateOGImage();