import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  selectedItem: {
    color: "blue",
    backgroundColor: "gray",
  },

  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
});

export const MenuBar = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const gotoLink = (path) => history.push(path);

  const [anchor, setAnchor] = useState(null);
  const [loadSaveAnchor, setLoadSaveAnchor] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);

  const [topicId, setTopicId] = useState("");

  const handleClick = (event) => setAnchor(event.currentTarget);
  const handleLoadSaveClick = (event) => setLoadSaveAnchor(event.currentTarget);

  const handleClose = (cb) => {
    if (cb instanceof Function) cb();
    setAnchor(null);
    setLoadSaveAnchor(null);
  };

  const handleRoomChange = () => {
    gotoLink(`/room/${topicId}`);
    setDisplayModal(false);
  };

  return (
    <div>
      <AppBar position="static" color="inherit">
        <Toolbar className={classes.toolBar}>
          <Typography>
            <Box fontWeight="600" fontSize={24}>
              letsdrawtogether.net
            </Box>
          </Typography>

          <Button color="inherit" onClick={() => gotoLink("")}>
            Home
          </Button>

          <Button color="inherit" onClick={() => setDisplayModal(true)}>
            Change Room/Topic
          </Button>

          <Modal
            open={displayModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={classes.modal}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Type a topic to navigate to a new Room/white Board
              </Typography>

              <TextField
                onChange={(evt) => setTopicId(evt.target.value)}
              ></TextField>

              <Button color="inherit" onClick={handleRoomChange}>
                Ok
              </Button>
            </Box>
          </Modal>

          <Button color="inherit" onClick={handleLoadSaveClick}>
            Save Image
          </Button>

          <Button color="inherit" onClick={() => gotoLink("/about")}>
            About
          </Button>

          <Button color="inherit" onClick={() => gotoLink("/login")}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
