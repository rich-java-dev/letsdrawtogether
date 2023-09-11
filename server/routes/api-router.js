const express = require("express");
const router = express.Router();

// enable .env file
const dotenv = require("dotenv");
dotenv.config();

const canvasState = require("../CanvasState");
const topicRegistry = require("../TopicRegistry");

const auth = require("../Auth");
const userLogin = auth.userLogin;
const userAuth = auth.userAuth;

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

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
  console.log(state);
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

/**
 * LOGIN END-POINT
 */
router.post("/login", userLogin);

/**
 * END-POINT protected behind userAuth middle-ware
 */
router.get("/profile", userAuth, (req, res) => {
  const token = req.cookies.jwt;
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      res.send("ERROR");
    } else {
      const userName = decodedToken.userName;
      res.send(`Welcome ${userName}! you are logged in!`);
    }
  });
});

module.exports = router;
