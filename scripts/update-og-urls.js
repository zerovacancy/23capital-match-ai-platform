// This script updates OpenGraph URLs to absolute URLs for production builds
// Run with: node scripts/update-og-urls.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure your production domain here
const PRODUCTION_DOMAIN = 'https://lgdevelopment.ai';

async function updateOgUrls() {
  console.log('Updating OpenGraph URLs for production...');
  
  const indexPath = path.join(__dirname, '../dist/index.html');
  
  if (!fs.existsSync(indexPath)) {
    console.error('Error: dist/index.html not found. Run build first.');
    process.exit(1);
  }
  
  try {
    let html = fs.readFileSync(indexPath, 'utf8');
    
    // Update relative OG image URLs to absolute URLs
    html = html.replace(
      /content="\/assets\/images\/social\/og-image.png"/g,
      `content="${PRODUCTION_DOMAIN}/assets/images/social/og-image.png"`
    );
    
    fs.writeFileSync(indexPath, html);
    console.log('OpenGraph URLs updated successfully');
  } catch (error) {
    console.error('Error updating OpenGraph URLs:', error);
  }
}

updateOgUrls();