// index.js
const scrape = require('website-scraper');
const PuppeteerPlugin = require('website-scraper-puppeteer');
const path = require('path');
//const puppeteer = require('puppeteer');

let t =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzRlODAzYmUwNDM0MDM3Y2VjNDdjOCIsImlhdCI6MTY1NDM2NzgzMywiZXhwIjoxNjU0NDU0MjMzfQ.sApq2BvumCb4hRrJmWl-9WuKhG7TidM1dNXXI1FJub8';
async function clone(page) {
  scrape({
    // Provide the URL(s) of the website(s) that you want to clone
    // In this example, you can clone the Our Code World website
    urls: ['https://betaacp.ownaware.com/#/manage/enable-modules'],
    // Specify the path where the content should be saved
    // In this case, in the current directory inside the ourcodeworld dir
    directory: path.resolve(__dirname, 'enable-modules'),

    // Load the Puppeteer plugin
    plugins: [
      new PuppeteerPlugin({
        launchOptions: {
          // If you set  this to true, the headless browser will show up on screen
          headless: false,
          args: ['--start-fullscreen'],
        } /* optional */,
        scrollToBottom: {
          timeout: 10000,
          viewportN: 10,
        } /* optional */,
      }),
    ],
  });
}
async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 720 });
  await page.goto('https://www.daum.net', { waitUntil: 'networkidle0' }); // wait until page load
  await page.type('#id', CREDS.username);
  await page.type('#loginPw', CREDS.password);
  // click and wait for navigation
  await Promise.all([
    page.click('#loginSubmit'),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);
}

clone();
