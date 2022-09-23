const Types = require("./utils/Types");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PointSchema = new Schema({
  topic: String,
  type: String,
  color: String,
  radius: Number,
  posX: Number,
  posY: Number,
});

const Point = mongoose.model("Point", PointSchema);

let load = false;
const init = async () => {
  await mongoose.connect("mongodb://localhost/letsdrawtogether");
  console.log("connected")
};

init()
