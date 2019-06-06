import React from "react";
import firebase from "../../firebase";
import classes from "./DeleteAccount.module.sass";

const DeleteAccount = () => {
  return (
    <div className={classes.opacityLayerDiv}>
      <div className={"animated zoomIn faster " + classes.mainModalDiv}>
        <div className={classes.closeIconDiv}>
          <i className={"material-icons " + classes.closeIcon}>close</i>
        </div>
        <div className={classes.bigIconDiv}>
          <i className={"material-icons " + classes.bigIcon}>error_outline</i>
        </div>
        <div className={classes.mainHeaderDiv}>
          <h1 className={classes.mainHeader}>Are you sure?</h1>
        </div>
        <div className={classes.bottomTextDiv}>
          <h5 className={classes.bottomText}>
            Do you really want to delete this account? This process can not be
            undone.
          </h5>
        </div>
        <div className={classes.bottomModalDiv}>
          <div className={classes.cancelButtonDiv}>
            <button
              className={
                classes.submitButton +
                " " +
                classes.buttonAnimation +
                " " +
                classes.cancelButton
              }
            >
              <span className={classes.submitSpan}>Cancel</span>
            </button>
          </div>
          <div className={classes.deleteButtonDiv}>
            <button
              className={
                classes.submitButton +
                " " +
                classes.deleteButton +
                " " +
                classes.buttonAnimation
              }
            >
              <span className={classes.submitSpan + " " + classes.deleteSpan}>
                Delete
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
