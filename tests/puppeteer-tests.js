const puppeteer = require("puppeteer");

// enable .env file
require("dotenv").config();

const serverAddr = process.env.SERVER_ADDR || "letsdrawtogether.net";
const wsEndPoint = process.env.WEBSOCKET_ENDPOINT || "websockettest";
const websockConnStr = `wss://${serverAddr}/${wsEndPoint}`;

//
// take screenshot of home page (after its fully loaded and no more than 2 connections open)
//
const screenshot = async (topic = "", name = "screenshot.png") => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    `https://www.letsdrawtogether.net/${topic !== "" ? "room/" + topic : ""}`,
    {
      waitUntil: "networkidle0",
    }
  );
  await page.screenshot({ path: name });
  await browser.close();
};

const drawRandomDots = async () => {
  const offsetX = 10;
  const offsetY = 70;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.letsdrawtogether.net/room/test", {
    waitUntil: "networkidle2",
  });

  // synchronously iterate over large range producing random points/data
  for (let i = 0; i < 1000; i++) {
    const posX = offsetX + 900 * Math.random();
    const posY = offsetY + 500 * Math.random();
    await page.mouse.click(posX, posY);
  }

  await page.screenshot({ path: "puppeteer-test.png" });
  await browser.close();
};

module.exports = {
  screenshot,
  drawRandomDots,
};
