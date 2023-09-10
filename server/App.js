// App.js

// express HTTP server
const express = require("express");
const app = express();

//
// MIDDLE WARE
//

// enable .env file
const dotenv = require("dotenv");
dotenv.config();

// enable cors (cross-origin request from React server running on diff port (testing))
const cors = require("cors");
app.use(
  cors({
    origin: "*", //`http://localhost:${process.env.REACT_PORT || 9001}`,
    optionsSuccessStatus: 200,
  })
);

//
// LOGGING
//

const log = require("log4js");
// set up basic debug logging middleware against all requests
log.level = "debug";
log.configure({
  appenders: { logInfo: { type: "file", filename: "default.log" } },
  categories: { default: { appenders: ["logInfo"], level: "info" } },
});
var logInfo = log.getLogger("logInfo"); // initialize the var to use.

// IP & resource request logging middle ware
app.use((req, res, next) => {
  var fwdIPStr = req.header("x-forwarded-for");
  var IP = "";

  if (fwdIPStr) IP = fwdIPStr = fwdIPStr.split(",")[0];

  logInfo.info(IP + ":" + req.path);

  next();
});

app.use((req, res, next) => {
  try {
    decodeURIComponent(req.path);
  } catch (e) {
    return res.redirect(["https://", req.get("Host"), "/"].join(""));
  }
  next();
});

//
// MONGODB / DB Layer
//
// HANDLED IN CanvasState

//
// json payload/API handling for body
//

var session = require("express-session");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// parse encoded/json
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//
// REACT FRONT-END
//

// use static file server of compiled/webpack React app
app.use(express.static("./react-build/"));

//
// ROUTING
//

const apiRouter = require("./routes/api-router");

app.use("/api", apiRouter);

//
// FALLBACKS
//

// Fall-back for invalid requests
// when using static file server, will default uncaught calls to following binding,
// and catch to prevent revealing any error detail to client
app.get("/*", (req, res) => {
  try {
    res.sendFile(path.join(`${__dirname}/react-build/`, "index.html"));
  } catch (err) {
    // send back home page on errors (security purpose)
    res.sendFile(`${__dirname}/react-build/index.html`);
  }
});

//
// INIT WEBSERVER
//

//start server on specified port
var port = process.env.PORT || 1234;
const server = app.listen(port, () =>
  console.log(`Express Server running on port ${port}`)
);

//
// SET UP WEBSOCKET at given endpoint
//

let canvasState = require("./CanvasState");

//
// Web Socket Server Registry
//

// Set up a headless websocket server that prints any
// events that come in.
const WebSocketServer = require("ws").Server;

var wss = new WebSocketServer({
  server: server,
  path: process.env.WEBSOCKET_ENDPOINT || "/websockettest",
});

// behavior of websocket once first connecting.

wss.on("connection", (socket, req) => {
  const remoteIp = req.socket.remoteAddress;
  logInfo.info("new connection:" + remoteIp);

  socket.on("message", (msg) => {
    processInput(remoteIp, msg);
  });
});

// Sanitize input here prior to passing to updateEntity...
const processInput = async (id, msg) => {
  try {
    const data = JSON.parse(msg);

    if (data.action === "CLEAR") canvasState.clearState(data.topic);
    else if (data.type !== undefined) canvasState.addRecord(data);

    // broadcast all new changes to all open connections
    wss.clients.forEach((client) => {
      client.send(msg);
    });
  } catch (err) {
    console.log(err);
    return;
  }
};
