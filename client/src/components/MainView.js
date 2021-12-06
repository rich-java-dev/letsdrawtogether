import React, { useRef, useState, useEffect } from "react";
import { drawCircle, getRandomColor } from "../utils/Drawing";
import { CompactPicker } from "react-color";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";

const serverAddr = process.env.SERVER_ADDR || "letsdrawtogether.net";
const wsEndPoint = process.env.WEBSOCKET_ENDPOINT || "websockettest";
let CLEAR_CANVAS_CMD = JSON.stringify({ action: "CLEAR", topic: roomId });

let width = window.innerWidth - 15;
let height = window.innerHeight - 160;
let color = "black";

let mouseDown = false;

let wsClient = null;
let canvas;

let roomId = "";

let bezierCurveSet = new Set();

let canvasState = new Set();
let diffState = new Set();

let clearFlag = false;

let prevX = 0;
let prevY = 0;

const init = () => {
  fetchCanvasState();

  const websockConnStr = `wss://${serverAddr}/${wsEndPoint}`;
  console.log(`Attempting to connect to websocket on: ${websockConnStr}`);
  wsClient = new WebSocket(websockConnStr);

  wsClient.onopen = () => {
    console.log("WebSocket Client Connected");
  };

  wsClient.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    const msgTopic = data.topic;
    if (msgTopic !== roomId) return;

    if (data?.type !== undefined) diffState.add(data);
    else if (data?.action === "CLEAR") {
      canvasState.clear();
      clearFlag = true;
      console.log("Clear called");
    }
  };
};

const postCircle = async (canvas, event) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor(event.clientX - rect.left);
  const y = Math.floor(event.clientY - rect.top);
  let msg = {
    topic: roomId,
    type: "CIRCLE",
    color: color,
    radius: 2,
    posX: x,
    posY: y,
  };
  wsClient.send(JSON.stringify(msg));

  if (mouseDown && prevX > 0 && prevY > 0) {
    const prevRad = Math.sqrt(Math.pow(x - prevX, 2) + Math.pow(y - prevY, 2));

    if (prevRad > 4) {
      const slope = (y - prevY) / (x - prevX);

      const cos = (x - prevX) / prevRad;
      const sin = (y - prevY) / prevRad;

      for (let i = 1; i <= prevRad; i++) {
        let interpolate = {
          topic: roomId,
          type: "CIRCLE",
          color: color,
          radius: 2,
          posX: prevX + i * cos,
          posY: prevY + i * sin,
        };
        wsClient.send(JSON.stringify(interpolate));
      }
    }
  }

  prevX = x;
  prevY = y;
};

const draw = (ctx) => {
  if (clearFlag) {
    console.log("Clear Canvas");
    clearLocalCanvas(ctx);
    clearFlag = false;
  }
  // ctx.fillStyle = "white";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  Array.from(diffState).map((obj) => {
    drawCircle({
      ctx,
      ...obj,
    });
  });

  canvasState = new Set([...canvasState, ...diffState]);
  diffState = new Set();
  // Array.from(canvasState).map((obj) => {
  //   drawCircle({
  //     ctx,
  //     ...obj,
  //   });
  // });
};

const clearLocalCanvas = (ctx) => {
  console.log("Clear Canvas called");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const clearCanvas = () => {
  wsClient.send(CLEAR_CANVAS_CMD);
};

const fetchCanvasState = () => {
  const url = `https://letsdrawtogether.net/api/canvasState?roomId=${roomId}`;
  fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => {
      diffState = new Set(json);
    });
};

const handleCanvasDown = async (canvas, evt) => {
  postCircle(canvas, evt);
  mouseDown = true;
};

const handleCanvasMove = async (canvas, evt) => {
  if (mouseDown) postCircle(canvas, evt);
};

const handleCanvasUp = (canvas, evt) => {
  mouseDown = false;
  prevX = 0;
  prevY = 0;
};

export const Canvas = ({ match, location }) => {
  const canvasRef = useRef();
  if (match?.params?.roomId !== undefined) roomId = match.params.roomId;
  CLEAR_CANVAS_CMD = JSON.stringify({ action: "CLEAR", topic: roomId });

  const resizeCanvas = (canvas, newWidth, newHeight) => {
    canvas.width = newWidth;
    canvas.height = newHeight;
    width = newWidth;
    height = newHeight;
  };

  window.addEventListener("resize", resizeCanvas, false);

  const changeColor = (newColor, evt) => {
    color = newColor.hex;
  };

  useEffect(async () => {
    init(roomId);

    canvas = canvasRef.current;
    canvas.addEventListener("mousedown", (event) => postCircle(canvas, event));

    let requestId;

    //render/update method, called on each key frame
    const render = async () => {
      const width = window.innerWidth - 15;
      const height = window.innerHeight - 160;
      // resizeCanvas(canvas, width, height);

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
      <div>created by Rich White</div>
      <Button onClick={clearCanvas}>Clear Canvas</Button>

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={(evt) => handleCanvasDown(canvas, evt)}
        onMouseMove={(evt) => handleCanvasMove(canvas, evt)}
        onMouseUp={(evt) => handleCanvasUp(canvas, evt)}
        onMouseLeave={(evt) => handleCanvasUp(canvas, evt)}
      />

      <CompactPicker onChange={changeColor} />
    </div>
  );
};
