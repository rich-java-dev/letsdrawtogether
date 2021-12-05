const ws = require("ws").WebSocket;
var Jimp = require("jimp");

// enable .env file
require("dotenv").config();

const serverAddr = process.env.SERVER_ADDR || "letsdrawtogether.net";
const wsEndPoint = process.env.WEBSOCKET_ENDPOINT || "websockettest";
const websockConnStr = `wss://${serverAddr}/${wsEndPoint}`;

//
// Draw the Mona Lisa as a benchmark/peformance test
//
const drawImage = async (topic, imagePath) => {
  console.log(`Attempting to connect to websocket on: ${websockConnStr}`);
  let wsClient = new ws(websockConnStr);

  const postCircle = (x, y, color) => {
    let msg = {
      topic: topic,
      type: "CIRCLE",
      color: color,
      radius: 2,
      posX: x,
      posY: y,
    };
    wsClient.send(JSON.stringify(msg));
  };

  wsClient.onopen = () => {
    console.log("WebSocket Client Connected");

    img = Jimp.read(imagePath, (err, image) => {
      console.log("Read in " + imagePath);

      for (let i = 0; i < image.bitmap.width; i++) {
        for (let j = 0; j < image.bitmap.height; j++) {
          const pixel = Jimp.intToRGBA(image.getPixelColor(i, j));
          let color = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
          postCircle(i, j, color);
        }
      }
    });
  };

  wsClient.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    const msgTopic = data.topic;
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

    let msg = {
      topic: "test",
      type: "CIRCLE",
      color: `rgba(${Math.floor(255 * Math.random())}, ${Math.floor(
        255 * Math.random()
      )},${Math.floor(255 * Math.random())})`,
      radius: 2,
      posX: x,
      posY: y,
    };
    wsClient.send(JSON.stringify(msg));
  };

  wsClient.onopen = () => {
    console.log("WebSocket Client Connected");
    [...Array(10000).keys()].map(postRandomCircle);
  };

  wsClient.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    const msgTopic = data.topic;
    console.log(data);
  };
};

module.exports = {
  drawRandomDots,
  drawImage,
};
