const mongoose = require("mongoose");
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
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  pw: {
    type: String,
    minlength: 4,
    required: true,
  },
});

module.exports = {
  PointSchema,
  UserSchema,
};
