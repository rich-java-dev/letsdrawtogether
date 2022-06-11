const express = require("express");
const router = express.Router();

const canvasState = require("../CanvasState");
const topicRegistry = require("../TopicRegistry");

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

router.get("/canvasState", async (req, res) => {
  const roomId = req.query.roomId;
  console.log("GET: canvasState called: " + roomId);
  let state = await canvasState.getState(roomId);
  console.log(state)
  res.send(JSON.stringify(Array.from(state)));
});

router.post("/subscribe", (req, res) => {
  var fwdIPStr = req.header("x-forwarded-for");
  var IP = "";
  if (fwdIPStr) IP = fwdIPStr = fwdIPStr.split(",")[0];

  const roomId = req.query.roomId;
  console.log("POST: subscribe: " + roomId);
});

router.post("/unsubscribe", (req, res) => {
  var fwdIPStr = req.header("x-forwarded-for");
  var IP = "";
  if (fwdIPStr) IP = fwdIPStr = fwdIPStr.split(",")[0];

  const roomId = req.query.roomId;
  console.log("POST: unsubscribe: " + roomId);
});

module.exports = router;
