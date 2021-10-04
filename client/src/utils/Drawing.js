export const drawCircle = (props) => {
  const { ctx, posX, posY, radius, color } = props;

  ctx.beginPath();
  ctx.arc(posX, posY, radius + 1, 0, 2 * Math.PI);
  ctx.fillStyle = "gray";
  ctx.fill();
  ctx.strokeStyle = "gray";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(posX, posY, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.stroke();
};
