const { getRandomColor } = require("./utils/Utils");
const Types = require("./utils/Types");

let state = new Set();

let diff = new Set();

const getState = () => {
  return state;
};

const currDiff = () => {
  return diff;
};

const mergeState = () => {
  state = new Set([...state, ...diff]);
  // Array.from(diff).map((obj) => state.add(obj));
  clearDiff();
};

const stampCanvas = (props) => {
  const { color, radius, posX, posY } = props;

  state.add({
    type: Types.CIRCLE,
    color: color,
    radius: radius,
    posX: posX,
    posY: posY,
  });
};

const clearState = () => {
  state.clear();
};

const clearDiff = () => {
  diff.clear();
};

module.exports = {
  getState,
  currDiff,
  mergeState,
  clearState,
  clearDiff,
  stampCanvas,
};
