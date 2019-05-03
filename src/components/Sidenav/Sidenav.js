import React, { Component } from "react";
import classes from "./Sidenav.module.sass";

class Sidenav extends Component {
  render() {
    return (
      <div className={classes.sidenavDiv}>
        <i />
        <div className={classes.iconDiv}>
          <i className={"material-icons " + classes.navIcon}>account_box</i>
          <p className={classes.iconText}>Account</p>
        </div>
        <div className={classes.iconDiv}>
          <i className={"material-icons " + classes.navIcon}>settings</i>
          <p className={classes.iconText}>Settings</p>
        </div>
        <div className={classes.iconDiv}>
          <i className={"material-icons " + classes.navIcon}>forum</i>
          <p className={classes.iconText}>Forum</p>
        </div>
        <div className={classes.iconDiv}>
          <i className={"material-icons " + classes.navIcon}>trending_up</i>
          <p className={classes.iconText}>Check Progress</p>
        </div>
        <div className={classes.iconDiv}>
          <i className={"material-icons " + classes.navIcon}>looks_one</i>
          <p className={classes.iconText}>1RM calculator</p>
        </div>
        <div className={classes.iconDiv}>
          <i className={"material-icons " + classes.navIcon}>alarm</i>
          <p className={classes.iconText}>Edit timers</p>
        </div>
        <div className={classes.iconDiv}>
          <i className={"material-icons " + classes.navIcon}>help</i>
          <p className={classes.iconText}>Help</p>
        </div>
      </div>
    );
  }
}

export default Sidenav;
