const ws = require("ws").WebSocket;
var Jimp = require("jimp");

// enable .env file
require("dotenv").config();

const serverAddr = process.env.SERVER_ADDR || "letsdrawtogether.net";
const wsEndPoint = process.env.WEBSOCKET_ENDPOINT || "websockettest";
const websockConnStr = `wss://${serverAddr}/${wsEndPoint}`;

console.log(`Attempting to connect to websocket on: ${websockConnStr}`);
let wsClient = new ws(websockConnStr);

const postCircle = (topic, x, y, color, radius = 1) => {
  let msg = {
    topic: topic,
    type: "CIRCLE",
    color: color,
    radius: radius,
    posX: x,
    posY: y,
  };
  wsClient.send(JSON.stringify(msg));
};

wsClient.onmessage = (msg) => {
  const data = JSON.parse(msg.data);
  const msgTopic = data.topic;
};

//
// Draw the Mona Lisa as a benchmark/peformance test
//
const drawImage = async (topic, imagePath) => {
  wsClient.onopen = () => {
    console.log("WebSocket Client Connected");

    img = Jimp.read(imagePath, (err, image) => {
      console.log("Read in " + imagePath);

      const width = image.bitmap.width;
      const height = image.bitmap.height;

      console.time("image-write");
      for (let i = 1; i < width + 1; i++) {
        for (let j = 1; j < height + 1; j++) {
          const pixel = Jimp.intToRGBA(image.getPixelColor(i, j));
          let color = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
          postCircle(topic, i, j, color);
        }
      }

      wsClient.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.posX == width && data.posY == height)
          console.timeEnd("image-write");
      };
    });
  };
};

//
// Draw the Mona Lisa as a benchmark/peformance test
//
const drawPointilismImage = async (topic, imagePath) => {
  wsClient.onopen = () => {
    console.log("WebSocket Client Connected");

    img = Jimp.read(imagePath, (err, image) => {
      console.log("Read in " + imagePath);

      const width = image.bitmap.width;
      const height = image.bitmap.height;

      console.time("pimage-write");
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          const pixel = Jimp.intToRGBA(image.getPixelColor(i, j));
          let color = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
          postCircle(topic, i * 2, j * 2, color);
        }
      }

      wsClient.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.posX == width * 2 && data.posY == height * 2)
          console.timeEnd("pimage-write");
      };
    });
  };
};

//
// Programatically test
//
const drawRandomDots = async () => {
  console.log(`Attempting to connect to websocket on: ${websockConnStr}`);
  let wsClient = new ws(websockConnStr);

  const postRandomCircle = () => {
    const x = 900 * Math.random();
    const y = 600 * Math.random();
    const color = `rgba(${Math.floor(255 * Math.random())}, ${Math.floor(
      255 * Math.random()
    )},${Math.floor(255 * Math.random())})`;

    postCircle("test", x, y, color);
  };

  wsClient.onopen = () => {
    console.log("WebSocket Client Connected");
    [...Array(10000).keys()].map(postRandomCircle);
  };
};

module.exports = {
  drawRandomDots,
  drawImage,
  drawPointilismImage,
};
