const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const dotenv = require("dotenv");
dotenv.config();
const MONGO_ENDPOINT = process.env.MONGO_ENDPOINT;

const Types = require("./utils/Types");

const models = require("./models");
const PointSchema = models.PointSchema;
const Point = mongoose.model("Point", PointSchema);

let load = false;
const init = async () => {
  await mongoose.connect(MONGO_ENDPOINT);
  load = true;
};

const getState = async (topic) => {
  if (!load) await init();

  const point = mongoose.model("Point");

  const filter = { topic: topic };
  const state = await point.find(filter);

  result = state.map((a) => {
    return {
      topic: a.topic,
      type: a.type,
      color: a.color,
      radius: a.radius,
      posX: a.posX,
      posY: a.posY,
    };
  });

  return result;
};

const clearState = async (topic) => {
  const point = mongoose.model("Point");
  await point.deleteMany({ topic: topic });
};

const addRecord = (props) => {
  const { color, radius, posX, posY, topic } = props;

  const point = new Point({
    type: Types.CIRCLE,
    topic: topic,
    color: color,
    radius: radius,
    posX: posX,
    posY: posY,
  });
  point.save();
};

module.exports = {
  getState,
  clearState,
  addRecord,
};
