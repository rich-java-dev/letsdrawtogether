const ws = require("ws").WebSocket;
var Jimp = require("jimp");

const { performance } = require('perf_hooks');

// enable .env file
require("dotenv").config();

const serverAddr = process.env.SERVER_ADDR || "letsdrawtogether.net";
const wsEndPoint = process.env.WEBSOCKET_ENDPOINT || "websockettest";
const websockConnStr = `wss://${serverAddr}/${wsEndPoint}`;

console.log(`Attempting to connect to websocket on: ${websockConnStr}`);
let wsClient = new ws(websockConnStr);

//adhere to original API/format server expects
const postCircle = async (topic, x, y, color, radius = 1) => {
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

// wsClient.onmessage = (msg) => {
//   const data = JSON.parse(msg.data);
//   const msgTopic = data.topic;
// };

//
// Draw Image to a given board ('topic'), and benchmark performance
//
const drawImage = async (topic, imagePath) => {
  wsClient.onopen = () => {
    console.log("WebSocket Client Connected");

    //read in image from path
    img = Jimp.read(imagePath, (err, image) => {
      console.log("Read in " + imagePath);

      const width = image.bitmap.width;
      const height = image.bitmap.height;

      //deconstruct image into 5 basic ints: x, y, r, g, b
      let points = [];
      for (let i = 1; i < width + 1; i++) {
        for (let j = 1; j < height + 1; j++) {
          const pixel = Jimp.intToRGBA(image.getPixelColor(i, j));
          const color = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
          points.push({
            x: i,
            y: j,
            color: color,
          });
        }
      }
      console.time("image-write");
      let startTime = performance.now();
      points.map(point => {
        postCircle(topic, point.x, point.y, point.color);
      })

      let received = 0;
      wsClient.onmessage = (msg) => {
        received++;
        const data = JSON.parse(msg.data);

        // check if this is the last bit recieved.
        if (data.posX == width && data.posY == height) {
          let endTime = performance.now();
          console.timeEnd("image-write");

          let totalTimeLapse = endTime - startTime;
          let count = width * height;

          console.log(`POINTS SENT: ${count}`);
          console.log(`POINTS RECEIVED: ${received}`)
          console.log(`AVG THROUGHPUT: ${count / totalTimeLapse} round-trip transmits/ms`);
          console.log(`AVG THROUGHPUT: ${1000 * count / totalTimeLapse} round-trip transmits/sec`);

        }
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

      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          const pixel = Jimp.intToRGBA(image.getPixelColor(i, j));
          let color = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
          postCircle(topic, i * 2, j * 2, color, 2);
        }
      }

      wsClient.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
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
