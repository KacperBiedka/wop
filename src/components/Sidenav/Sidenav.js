import React from "react";
import firebase from "../../firebase";
import classes from "./Sidenav.module.sass";

const Sidenav = props => {
  const logout = () => {
    firebase.auth().signOut();
    window.location.href = "..";
  };

  const playAudio = () => {
    let audio = new Audio("../../assets/bellNotification.mp3");
    audio.play();
  };

  return (
    <div style={props.styles.sideNavDiv} className={classes.sidenavDiv}>
      <i />
      <div style={props.styles.iconDiv} className={classes.iconDiv}>
        <i className={"material-icons " + classes.navIcon}>account_box</i>
        <p className={classes.iconText}>Account</p>
      </div>
      <div style={props.styles.iconDiv} className={classes.iconDiv}>
        <i className={"material-icons " + classes.navIcon}>settings</i>
        <p className={classes.iconText}>Settings</p>
      </div>
      <div style={props.styles.iconDiv} className={classes.iconDiv}>
        <i className={"material-icons " + classes.navIcon}>trending_up</i>
        <p className={classes.iconText}>Check Progress</p>
      </div>
      <div style={props.styles.iconDiv} className={classes.iconDiv}>
        <i className={"material-icons " + classes.navIcon}>looks_one</i>
        <p className={classes.iconText}>1RM calculator</p>
      </div>
      <div
        onClick={props.toggleModal}
        style={props.styles.iconDiv}
        className={classes.iconDiv}
      >
        <i className={"material-icons " + classes.navIcon}>alarm</i>
        <p className={classes.iconText}>Edit timers</p>
      </div>
      <div
        onClick={playAudio}
        style={props.styles.iconDiv}
        className={classes.iconDiv}
      >
        <i className={"material-icons " + classes.navIcon}>help</i>
        <p className={classes.iconText}>Help</p>
      </div>
      <div
        onClick={logout}
        style={props.styles.iconDiv}
        className={classes.iconDiv}
      >
        <i className={"material-icons " + classes.navIcon}>
          power_settings_new
        </i>
        <p className={classes.iconText}>Logout</p>
      </div>
    </div>
  );
};

export default Sidenav;
