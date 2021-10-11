const { getRandomColor } = require("./utils/Utils");
const Types = require("./utils/Types");

let stateMap = {};

const getState = (topic) => {
  if (stateMap[topic] == undefined) stateMap[topic] = new Set();
  return stateMap[topic];
};

const clearState = (topic) => {
  console.log("clearState called:" + topic);
  stateMap[topic] = new Set();
};

const addRecord = (props) => {
  const { color, radius, posX, posY, topic } = props;
  
  if (stateMap[topic] == undefined) stateMap[topic] = new Set();
  let state = stateMap[topic];

  state.add({
    type: Types.CIRCLE,
    color: color,
    radius: radius,
    posX: posX,
    posY: posY,
  });
};

module.exports = {
  getState,
  clearState,
  addRecord,
};
