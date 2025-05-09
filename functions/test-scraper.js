const { getLargestImage } = require('./webscraper');

async function testScraper() {
  try {
    // Replace with any URL you want to test
    const url = 'https://samwho.dev/reservoir-sampling/';
    console.log(`Testing scraper with URL: ${url}`);
    
    const largestImageUrl = await getLargestImage(url);
    console.log('Result:', largestImageUrl);
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testScraper();
