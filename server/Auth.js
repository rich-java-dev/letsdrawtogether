// Auth.js

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// enable .env file
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_ENDPOINT = process.env.MONGO_ENDPOINT;
const SALT = process.env.SALT;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const models = require("./models");
const UserSchema = models.UserSchema;
const User = mongoose.model("User", UserSchema);

let load = false;
const init = async () => {
  await mongoose.connect(MONGO_ENDPOINT);

  const hashPw = await bcrypt.hash("test", SALT + "");
  console.log(hashPw);
  let userObj = { userName: "test", pw: hashPw };
  const user = await User.findOne(userObj);
  if (!user) User.create(userObj);
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
  const rawPw = req.body.pw;
  const hashPw = await bcrypt.hash(rawPw, SALT + "");
  if (!load) await init();

  try {
    let userObj = { userName: userName, pw: hashPw };
    const user = await User.findOne(userObj);
    if (user) {
      const maxAge = 3 * 60 * 60; // 3 hrs in seconds

      token = jwt.sign({ userName: userName }, JWT_SECRET, {
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
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
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
