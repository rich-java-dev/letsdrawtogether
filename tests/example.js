const screenshot = require("./puppeteer-tests").screenshot;
const puppeteerRandomDots = require("./puppeteer-tests").drawRandomDots;

const wsRandomDots = require("./websocket-tests").drawRandomDots;
const drawImage = require("./websocket-tests").drawImage;
const drawPointilismImage = require("./websocket-tests").drawPointilismImage;

/**
 * 
 * The below class is meant to  demonstrate execution of 2 types of Bots written for letdrawtogether
 *
 * 1) Websocket client designed to 'upload'/draw an arbitrary image onto the canvas
 * 
 * 
 * 2) Puppeteer - Browser Bot (based on Chromium) 
 * to perform certain actions such as 
 * load a page, apply arbitrary input, then screenshot the result.
 * 
 */

const run = async () => {
 // await drawImage("test", "../img/monalisa.png");
  await screenshot("test", "screenshots/test.png");

  // await wsRandomDots();
   await puppeteerRandomDots();
   await screenshot("screenshots/puppeteer-test.png");
};
run();


// drawPointilismImage("", "../img/monalisa.png");
// wsRandomDots();

// drawImage("", "../img/monalisa.png");
// drawImage("", "../img/readme.png");
// puppeteerRandomDots("test");
