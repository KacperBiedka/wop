import React from "react";
import firebase from "../../firebase";
import classes from "./Sidenav.module.sass";

const Sidenav = props => {
  let resetPasswordDiv = null;

  const logout = () => {
    firebase.auth().signOut();
    window.location.href = "..";
  };

  const renderResetPassword = () => {
    var user = firebase.auth().currentUser;
    if (user != null) {
      user.providerData.forEach(profile => {
        if (profile.providerId === "password") {
          console.log(profile.providerId);
          resetPasswordDiv = (
            <div
              onClick={props.toggleResetPasswordModal}
              style={props.styles.iconDiv}
              className={classes.iconDiv}
            >
              <i className={"material-icons " + classes.navIcon}>cached</i>
              <p className={classes.iconText}>Change password</p>
            </div>
          );
          return resetPasswordDiv;
        } else {
          resetPasswordDiv = null;
          return resetPasswordDiv;
        }
      });
    } else {
      console.log("there is no user logged in");
    }
  };

  return (
    <div style={props.styles.sideNavDiv} className={classes.sidenavDiv}>
      <i />
      {renderResetPassword()}
      <div
        onClick={props.toggleResetEmailModal}
        style={props.styles.iconDiv}
        className={classes.iconDiv}
      >
        <i className={"material-icons " + classes.navIcon}>account_box</i>
        <p className={classes.iconText}>Change email</p>
      </div>
      {resetPasswordDiv}
      <div
        onClick={props.toggleDeleteAccountModal}
        style={props.styles.iconDiv}
        className={classes.iconDiv}
      >
        <i className={"material-icons " + classes.navIcon}>delete_outline</i>
        <p className={classes.iconText}>Delete account</p>
      </div>
      {props.displayEditTimerModal ? (
        <div
          onClick={props.toggleModal}
          style={props.styles.iconDiv}
          className={classes.iconDiv}
        >
          <i className={"material-icons " + classes.navIcon}>alarm</i>
          <p className={classes.iconText}>Edit timers</p>
        </div>
      ) : null}
      {/* <div style={props.styles.iconDiv} className={classes.iconDiv}>
        <i className={"material-icons " + classes.navIcon}>help</i>
        <p className={classes.iconText}>FAQ</p>
      </div> */}
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
