const express = require("express");
const router = express.Router();
const canvasState = require("../CanvasState");

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
  res.send("success");
});

module.exports = router;
