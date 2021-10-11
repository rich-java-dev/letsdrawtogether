const { list } = require("pm2");

let registry = {};

const subscribe = (topic, ip) => {
  if (registry[topic] == undefined) register[topic] = [];
  let list = registry[topic];
  list.append(ip);
};

const isSubscribed = (topic, ip) => {
  if (registry[topic] == undefined) return false;
  let list = registry[topic];
  return list.contains(ip);
};

const unSubscribe = (topic, ip) => {};

module.exports = {
  subscribe,
  unSubscribe,
  isSubscribed,
};
