const { getRandomColor } = require("./utils/Utils");
const Types = require("./utils/Types");

// let state = {};
let state = new Set();

const getState = () => {
  return state;
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
  state = new Set();
};

module.exports = {
  clearState,
  getState,
  stampCanvas,
};
