import React from "react";
import classes from "./Timer.module.sass";

const Timer = props => {
  return (
    <div className={classes.timerDiv}>
      <p className={classes.timerMessage}>{props.timerMessage}</p>
    </div>
  );
};

export default Timer;
