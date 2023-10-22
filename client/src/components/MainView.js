import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/styles";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

import { CompactPicker } from "react-color";
import { Button, Checkbox, Box, TextField } from "@material-ui/core";

import { drawCircle, getRandomColor } from "../utils/Drawing";
// import { DrawPanel } from "./DrawPanel";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  paintBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  cursorSize: {
    width: "60px",
  },
});

const serverAddr = process.env.SERVER_ADDR || "drawing.richwhite.net";
const wsEndPoint = process.env.WEBSOCKET_ENDPOINT || "websockettest";
let roomId = "";
let CLEAR_CANVAS_CMD = JSON.stringify({ action: "CLEAR", topic: roomId });


// Tracking state outside of React to avoid component refresh/breaking websocket connection.
let width = window.innerWidth - 15;
let height = window.innerHeight - 200;

let color = "black";
let hue = 0;
let cursorSize = 2;
let rainbowMode = false;

let mouseDown = false;

let wsClient = null;
let canvas;

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

const postCircle = async (canvas, event, radius = 2, rainbowMode = false) => {
  //event.preventDefault();

  const rect = canvas.getBoundingClientRect();

  let x = Math.floor(event.clientX - rect.left);
  let y = Math.floor(event.clientY - rect.top);

  if (event.type === "touchmove") {
    x = event.touches[0].screenX;
    y = event.touches[0].screenY;
  }

  color = rainbowMode ? incHue() : color;

  let msg = {
    topic: roomId,
    type: "CIRCLE",
    color: color,
    radius: radius,
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

      for (let i = 1; i <= prevRad / 2; i++) {
        let interpolate = {
          topic: roomId,
          type: "CIRCLE",
          color: color,
          radius: radius,
          posX: prevX + 2 * i * cos,
          posY: prevY + 2 * i * sin,
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

export const clearCanvas = () => {
  wsClient.send(CLEAR_CANVAS_CMD);
};

//
//
const fetchCanvasState = () => {
  const url = `https://drawing.richwhite.net/api/canvasState?roomId=${roomId}`;
  fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => {
      json.map((a) => diffState.add(a));
      // diffState = json;
    });
};

//
//
const incHue = () => {
  hue += 1;
  if (hue > 360) hue -= 360;
  return `hsl(${hue}, 100%, 50%)`;
};

//
//
const handleCanvasUp = (canvas, evt) => {
  mouseDown = false;
  prevX = 0;
  prevY = 0;
};

//
//
const resizeCanvas = (canvas, newWidth, newHeight) => {
  canvas.width = newWidth;
  canvas.height = newHeight;
  width = newWidth;
  height = newHeight;
};

//
//
export const Canvas = ({ match, location }) => {
  const classes = useStyles();
  const canvasRef = useRef();

  if (match?.params?.roomId !== undefined) roomId = match.params.roomId;
  CLEAR_CANVAS_CMD = JSON.stringify({ action: "CLEAR", topic: roomId });

  disableBodyScroll(canvasRef);
  window.addEventListener("resize", resizeCanvas, false);

  //
  const changeColor = (newColor, evt) => {
    color = newColor.hex;
  };

  //
  const changeCursorSize = (evt) => {
    const val = evt.target.value;
    try {
      cursorSize = parseInt(val);
    } catch (err) {}
  };

  //
  const changeRainbowMode = () => {
    rainbowMode = !rainbowMode;
  };

  //
  const handleCanvasDown = async (canvas, evt) => {
    postCircle(canvas, evt, cursorSize, rainbowMode);
    mouseDown = true;
  };

  //
  const handleCanvasMove = async (canvas, evt) => {
    if (mouseDown) {
      postCircle(canvas, evt, cursorSize, rainbowMode);
    }
  };

  //
  useEffect(async () => {
    init(roomId);

    canvas = canvasRef.current;

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

  //
  return (
    <div>
      <Button onClick={clearCanvas}>Clear Canvas</Button>

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={(evt) => handleCanvasDown(canvas, evt)}
        onMouseMove={(evt) => handleCanvasMove(canvas, evt)}
        onMouseUp={(evt) => handleCanvasUp(canvas, evt)}
        onMouseLeave={(evt) => handleCanvasUp(canvas, evt)}
        onTouchStart={(evt) => handleCanvasDown(canvas, evt)}
        onTouchMove={(evt) => handleCanvasMove(canvas, evt)}
        onTouchEnd={(evt) => handleCanvasUp(canvas, evt)}
      />

      <div className={classes.paintBar}>
        <CompactPicker onChange={changeColor} />

        <div></div>
        <Box>
          <TextField
            className={classes.cursorSize}
            
            label="cursor size"
            variant="outlined"
            onChange={changeCursorSize}
          />

          <Checkbox
            value={rainbowMode}
            label="Rainbow Mode"
            onChange={changeRainbowMode}
          />
        </Box>
      </div>
    </div>
  );
};
