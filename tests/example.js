const screenshot = require("./puppeteer-tests").screenshot;
const puppeteerRandomDots = require("./puppeteer-tests").drawRandomDots;

const wsRandomDots = require("./websocket-tests").drawRandomDots;
const drawImage = require("./websocket-tests").drawImage;
const drawPointilismImage = require("./websocket-tests").drawPointilismImage;

//
// take screenshot of home page (after its fully loaded and no more than 2 connections open)
//

const run = async () => {
  await drawImage("test", "../img/monalisa.png");
  await screenshot("test", "screenshots/test.png");

  await wsRandomDots();
  await puppeteerRandomDots();
  await screenshot("screenshots/puppeteer-test.png");
};
//run();
// drawPointilismImage("test", "../img/monalisa.png");
// wsRandomDots();

drawImage("", "../img/monalisa.png");
// puppeteerRandomDots();
