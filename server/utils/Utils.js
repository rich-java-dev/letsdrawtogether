const getRandomColor = () => {
  return `rgb(${255 * Math.random()}, ${255 * Math.random()},${
    255 * Math.random()
  })`;
};

module.exports = {
  getRandomColor,
};
