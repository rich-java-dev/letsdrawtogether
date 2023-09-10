// Auth.js

const jwt = require("jsonwebtoken");
const jwtSecret = "TESTTESTTESTTEST";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const models = require("./models");
const UserSchema = models.UserSchema;
const User = mongoose.model("User", UserSchema);

let load = false;
const init = async () => {
  await mongoose.connect("mongodb://mongo/letsdrawtogether");
  load = true;
};

const userRegister = async (req, res, next) => {
  const { userName, pw } = req.body;
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }
  try {
    await User.create({
      username,
      password,
    }).then((user) =>
      res.status(200).json({
        message: "User successfully created",
        user,
      })
    );
  } catch (err) {
    res.status(401).json({
      message: "User not successful created",
      error: error.mesage,
    });
  }
};

const userLogin = async (req, res, next) => {
  const userName = req.body.userName;
  const pw = req.body.pw;

  try {
    if (userName == "test" && pw == "test") {
      const maxAge = 3 * 60 * 60; // 3 hrs in seconds

      token = jwt.sign({ userName: userName }, jwtSecret, {
        expiresIn: maxAge,
      });

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000, // 3hrs in ms
      });

      res.status(200).json({
        message: "Login successful",
        user: userName,
      });
    } else {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

const userAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        if (decodedToken.userName !== "test") {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

module.exports = {
  userRegister,
  userLogin,
  userAuth,
};
