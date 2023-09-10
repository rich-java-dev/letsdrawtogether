const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const PointSchema = new Schema({
    topic: String,
    type: String,
    color: String,
    radius: Number,
    posX: Number,
    posY: Number,
  });
  
  const UserSchema = new Schema({
    user: String,
    pw: String,
  });

  module.exports = {
    PointSchema,
    UserSchema,
  };
  