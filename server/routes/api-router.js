const express = require("express");
const router = express.Router();

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

module.exports = router;
