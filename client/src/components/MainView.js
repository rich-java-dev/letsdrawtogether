import React, { useRef, useState, useEffect } from "react";
import { drawCircle, getRandomColor } from "../utils/Drawing";

let width = window.innerWidth - 10;
let height = window.innerHeight - 10;

let wsClient = null;
let canvas;

const serverAddr = process.env.SERVER_ADDR || "192.168.1.5";
const serverPort = process.env.SERVER_PORT || 1234;
const wsEndPoint = process.env.WEBSOCKET_ENDPOINT || "websockettest";

let canvasState = new Set();

let mouseDown = false;

const init = () => {
  const websockConnStr = `ws://${serverAddr}:${serverPort}/${wsEndPoint}`;
  console.log(`Attempting to connect to websocket on: ${websockConnStr}`);
  wsClient = new WebSocket(websockConnStr);

  wsClient.onopen = () => {
    console.log("WebSocket Client Connected");
  };

  wsClient.onmessage = (msg) => {
    const data = msg.data;
    canvasState = JSON.parse(data);
  };
};

const postCircle = (canvas, event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  let circleState = {
    type: "CIRCLE",
    color: "black",
    radius: 2,
    posX: x,
    posY: y,
  };
  wsClient.send(JSON.stringify(circleState));
};

const draw = (ctx) => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  Array.from(canvasState).map((obj) => {
    drawCircle({
      ctx,
      ...obj,
    });
  });
};

const clearCanvas = () => {
  const url = `http://${serverAddr}:${serverPort}/api/clearCanvas`;
  console.log(url);
  fetch(url, {
    method: "POST",
  });
};

const handleCanvasDown = (canvas, evt) => {
  postCircle(canvas, evt);
  mouseDown = true;
};

const handleCanvasMove = (canvas, evt) => {
  if (mouseDown) postCircle(canvas, evt);
};

const handleCanvasUp = (canvas, evt) => {
  mouseDown = false;
};

export const Canvas = () => {
  const canvasRef = useRef();

  useEffect(async () => {
    init();

    canvas = canvasRef.current;
    canvas.addEventListener("mousedown", (event) => postCircle(canvas, event));

    let requestId;

    //render/update method, called on each key frame
    const render = async () => {
      const ctx = canvas.getContext("2d");
      draw(ctx);
      requestId = requestAnimationFrame(render);
    };

    await render();
    return () => {
      cancelAnimationFrame(requestId);
    };
  });

  return (
    <div>
      <button onClick={clearCanvas}>Clear Canvas</button>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={(evt) => handleCanvasDown(canvas, evt)}
        onMouseMove={(evt) => handleCanvasMove(canvas, evt)}
        onMouseUp={(evt) => handleCanvasUp(canvas, evt)}
        onMouseLeave={(evt) => handleCanvasUp(canvas, evt)}
      />
    </div>
  );
};
