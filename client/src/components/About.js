import React from "react";
import { makeStyles } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  avatar: {
    width: "20vw",
    height: "20vw",
    maxWidth: "200px",
    maxHeight: "200px",
  },
  typography: {
    width: "50vw",
  },
  gap: {
    width: "20vw",
  },
  vgap: {
    height: "100px",
  },
});

const About = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.vgap}></div>
      <Avatar className={classes.avatar} alt="RW" src="aboutme.png" />

      <Typography className={classes.typography}>
        Hello! My name is Richard White. <br />
        I am a software developer based out of NJ. <br />
        Computer science, education, and art are a few of my passions I
        wanted to to bring together in this fun project. <br />
        
        While this site is still in very early development, I plan to
        incorporate more interaction, support and new features/variants.
        <br />
        This site was built with:
        <br />
        react
        express
        websockets
        couchdb
        docker
        kubernetes

        <br />
        If you have any questions or comments you can reach me at
        <br />
        <a href="mailto:therichphysicist@gmail.com">
          therichphysicist@gmail.com
        </a>
        <br />
        Thanks and enjoy!
      </Typography>
      <div className={classes.gap} />
    </div>
  );
};

export default About;
