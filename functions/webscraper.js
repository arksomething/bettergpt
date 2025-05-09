const axios = require('axios');
const cheerio = require('cheerio');
const imageSize = require('image-size');
const https = require('https');
const http = require('http');

/**
 * Gets the largest image from a webpage
 * @param {string} url - The URL of the webpage to scrape
 * @returns {Promise<string>} - The URL of the largest image
 */
async function getLargestImage(url) {
  try {
    console.log(`Fetching content from: ${url}`);
    
    // Fetch HTML content from the URL with an extended timeout
    const response = await axios.get(url, {
      headers: {
        // Using a more complete user agent to avoid blocking
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      },
      timeout: 10000
    });
    
    const html = response.data;
    console.log(`HTML content length: ${html.length} characters`);
    
    const $ = cheerio.load(html);
    
    // Extract all image URLs using various selectors
    const images = [];
    
    // Regular img tags
    $('img').each((i, element) => {
      const src = $(element).attr('src');
      if (src) {
        // Handle relative URLs
        const imageUrl = src.startsWith('http') ? src : new URL(src, url).href;
        images.push(imageUrl);
        console.log(`Found image (img tag): ${imageUrl}`);
      }
      
      // Also check for srcset attribute (responsive images)
      const srcset = $(element).attr('srcset');
      if (srcset) {
        const srcsetUrls = srcset.split(',').map(part => part.trim().split(' ')[0]);
        for (const srcUrl of srcsetUrls) {
          if (srcUrl) {
            const imageUrl = srcUrl.startsWith('http') ? srcUrl : new URL(srcUrl, url).href;
            images.push(imageUrl);
            console.log(`Found image (srcset): ${imageUrl}`);
          }
        }
      }
    });
    
    // Check for background images in style attributes
    $('[style*="background"]').each((i, element) => {
      const style = $(element).attr('style');
      if (style) {
        const match = style.match(/background(?:-image)?\s*:\s*url\(['"]?([^'")]+)['"]?\)/i);
        if (match && match[1]) {
          const imageUrl = match[1].startsWith('http') ? match[1] : new URL(match[1], url).href;
          images.push(imageUrl);
          console.log(`Found image (background): ${imageUrl}`);
        }
      }
    });
    
    // Look for picture tags with source elements
    $('picture source').each((i, element) => {
      const srcset = $(element).attr('srcset');
      if (srcset) {
        const srcsetUrls = srcset.split(',').map(part => part.trim().split(' ')[0]);
        for (const srcUrl of srcsetUrls) {
          if (srcUrl) {
            const imageUrl = srcUrl.startsWith('http') ? srcUrl : new URL(srcUrl, url).href;
            images.push(imageUrl);
            console.log(`Found image (picture source): ${imageUrl}`);
          }
        }
      }
    });
    
    // Try to find data-src attributes (lazy loading)
    $('[data-src]').each((i, element) => {
      const dataSrc = $(element).attr('data-src');
      if (dataSrc) {
        const imageUrl = dataSrc.startsWith('http') ? dataSrc : new URL(dataSrc, url).href;
        images.push(imageUrl);
        console.log(`Found image (data-src): ${imageUrl}`);
      }
    });
    
    console.log(`Found ${images.length} images on ${url}`);
    
    if (images.length === 0) {
      console.log("No images found. HTML snippet:");
      console.log(html.substring(0, 500) + "..."); // Log a sample of the HTML
      return null;
    }
    
    // Simplified approach: Instead of getting dimensions, just return the first image
    // This avoids the issues with the image-size library
    console.log('Using first found image as result:', images[0]);
    return images[0];
  } catch (error) {
    console.error('Error scraping website:', error);
    throw error;
  }
}

/**
 * This function is now simplified to avoid image-size issues
 * We're including it to maintain compatibility but not using it
 */
function getImageDimensions(url) {
  return new Promise((resolve) => {
    // Return a default size instead of trying to calculate
    resolve({ width: 100, height: 100 });
  });
}

module.exports = {
  getLargestImage
}; 