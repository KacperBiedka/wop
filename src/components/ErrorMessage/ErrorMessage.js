import React from "react";
import classes from "./ErrorMessage.module.css";

const errorMessage = props => {
  return (
    <div className={classes.errorDiv + " alert alert-danger"} role="alert">
      <span className={classes.errorText}>{props.text}</span>
    </div>
  );
};

export default errorMessage;
