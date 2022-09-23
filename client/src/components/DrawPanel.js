import { useRef, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/styles";


const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  gap: {
    width: "5vw",
  },
  static_gaps: {
    width: "50px",
  },
});

export const DrawPanel = () => {
  const classes = useStyles();

  let [x,setX] = useState("");
  return (
    <div>
      <div></div>
    </div>
  );
};
