import React, { useRef, useState, useEffect } from "react";
import { drawCircle, getRandomColor } from "../utils/Drawing";

let width = window.innerWidth - 15;
let height = window.innerHeight - 15;

let wsClient = null;
let canvas;

const serverAddr = process.env.SERVER_ADDR || "192.168.1.5";
const serverPort = process.env.SERVER_PORT || 1234;
const wsEndPoint = process.env.WEBSOCKET_ENDPOINT || "websockettest";

let gameState = {};

const init = () => {
  const websockConnStr = `ws://${serverAddr}:${serverPort}/${wsEndPoint}`;
  console.log(`Attempting to connect to websocket on: ${websockConnStr}`);
  wsClient = new WebSocket(websockConnStr);

  wsClient.onopen = () => {
    console.log("WebSocket Client Connected");
    wsClient.send("test!");
  };

  wsClient.onmessage = (msg) => {
    const data = msg.data;
    gameState = JSON.parse(data);
  };

  const codeMap = {
    ArrowDown: "D",
    ArrowLeft: "L",
    ArrowRight: "R",
    ArrowUp: "U",
  };

  window.addEventListener("keydown", (event) => {
    switch (event.code) {
      case "ArrowDown":
      case "ArrowLeft":
      case "ArrowRight":
      case "ArrowUp":
        wsClient.send(codeMap[event.code]);
        break;
    }
  });
};

const stepSystem = (ctx) => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  Object.values(gameState).map((entity) => {
    drawCircle({
      ctx,
      ...entity,
    });
  });
};

export const Canvas = () => {
  const canvasRef = useRef();

  useEffect(async () => {
    init();

    canvas = canvasRef.current;

    let requestId;

    //render/update method, called on each key frame
    const render = async () => {
      const ctx = canvas.getContext("2d");
      stepSystem(ctx);
      requestId = requestAnimationFrame(render);
    };

    await render();
    return () => {
      cancelAnimationFrame(requestId);
    };
  });

  return <canvas ref={canvasRef} width={width} height={height} />;
};
