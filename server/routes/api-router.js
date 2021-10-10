const express = require("express");
const router = express.Router();
const canvasState = require("../CanvasState");

const app = require("../App");

const CLEAR_CANVAS_CMD = JSON.stringify({ action: "CLEAR" });

router.get("/", (req, res) => {
  let msg = "api root called!";
  console.log(msg);

  res.send({ msg: msg });
});

router.get("/test", (req, res) => {
  let msg = "/api/test called!";
  console.log(msg);

  res.send({ msg: msg });
});

router.post("/clearCanvas", (req, res) => {
  console.log("clearCanvas called");
  canvasState.clearState();

  console.log(app);

  app.webSocketConnections().forEach((client) => {
    client.send(CLEAR_CANVAS_ACTION);
  });

  res.send("success");
});

router.get("/canvasState", (req, res) => {
  console.log("GET: CanvasState called");
  let state = canvasState.getState();

  res.send(JSON.stringify(Array.from(state)));
});

module.exports = router;
