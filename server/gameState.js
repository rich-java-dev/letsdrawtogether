const { getRandomColor } = require("./utils/Utils");

let state = {};

const getState = () => {
  return state;
};

const addEntity = (entityId) => {
  if (state[entityId]) return;

  state[entityId] = {
    id: entityId,
    posX: 800 * Math.random(),
    posY: 600 * Math.random(),
    velX: 0,
    velY: 0,
    radius: 10,
    color: getRandomColor(),
  };
};

const updateEntity = (id, msg) => {
  console.log("id:" + id + " - " + msg);
  let idState = state[id];

  switch (msg) {
    case "U":
      idState.velY = -2;
      break;
    case "D":
      idState.velY = 2;
      break;
    case "L":
      idState.velX = -2;
      break;
    case "R":
      idState.velX = 2;
      break;
  }
};

const stepSystem = () => {
  Object.values(state).map((entity) => {
    entity.posX += entity.velX;
    entity.posY += entity.velY;
    entity.velX = 0;
    entity.velY = 0;
  });
};

module.exports = {
  getState,
  addEntity,
  updateEntity,
  stepSystem,
};
