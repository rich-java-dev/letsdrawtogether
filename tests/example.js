//
// take screenshot of home page (after its fully loaded and no more than 2 connections open)
//
const screenshot = require("./puppeteer-tests").screenshot;
const wsRandomDots = require("./websocket-tests").drawRandomDots;
const drawImage = require("./websocket-tests").drawImage;

const puppeteerRandomDots = require("./puppeteer-tests").drawRandomDots;

const run = async () => {
  await drawImage("","../img/monalisa.png");
  await screenshot("screenshots/websocket-test.png");
  //   await wsRandomDots();

  //   await puppeteerRandomDots();
  //   await screenshot("screenshots/puppeteer-test.png");
};

run();
