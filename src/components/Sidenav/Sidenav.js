import React, { Component } from "react";
import firebase from "../../firebase";
import classes from "./Sidenav.module.sass";

class Sidenav extends Component {
  state = {
    accountStyle: {},
    accountContent: null
  };

  logout = () => {
    firebase.auth().signOut();
    window.location.href = "..";
  };

  deleteUser = () => {
    firebase
      .auth()
      .currentUser.delete()
      .then(function() {
        window.location.href = "../login";
      })
      .catch(function(error) {
        alert(error.message);
      });
  };

  toggleAccountDiv = () => {
    if (this.state.accountContent) {
      this.setState({
        accountContent: (
          <div className={classes.childrenIconDiv}>
            <div
              style={this.props.styles.iconDiv}
              className={"animated fadeOutRight faster " + classes.iconDiv}
            >
              <i className={"material-icons " + classes.navIcon}>cached</i>
              <p className={classes.iconText}>Reset password</p>
            </div>
            <div
              style={this.props.styles.iconDiv}
              className={"animated fadeOutRight faster " + classes.iconDiv}
            >
              <i className={"material-icons " + classes.navIcon}>delete</i>
              <p className={classes.iconText}>Delete account</p>
            </div>
          </div>
        )
      });
      setTimeout(() => {
        this.setState({
          accountContent: null
        });
      }, 400);
    } else {
      this.setState({
        accountContent: (
          <div className={classes.childrenIconDiv}>
            <div
              style={this.props.styles.iconDiv}
              className={"animated fadeInRight faster " + classes.iconDiv}
            >
              <i className={"material-icons " + classes.navIcon}>cached</i>
              <p className={classes.iconText}>Reset password</p>
            </div>
            <div
              onClick={this.deleteUser}
              style={this.props.styles.iconDiv}
              className={"animated fadeInRight faster " + classes.iconDiv}
            >
              <i className={"material-icons " + classes.navIcon}>delete</i>
              <p className={classes.iconText}>Delete account</p>
            </div>
          </div>
        )
      });
    }
  };

  render() {
    return (
      <div style={this.props.styles.sideNavDiv} className={classes.sidenavDiv}>
        <i />
        <div
          onClick={this.toggleAccountDiv}
          style={this.props.styles.iconDiv}
          className={classes.iconDiv}
        >
          <i className={"material-icons " + classes.navIcon}>account_box</i>
          <p className={classes.iconText}>Account</p>
        </div>
        {this.state.accountContent}
        <div style={this.props.styles.iconDiv} className={classes.iconDiv}>
          <i className={"material-icons " + classes.navIcon}>trending_up</i>
          <p className={classes.iconText}>Check Progress</p>
        </div>
        <div style={this.props.styles.iconDiv} className={classes.iconDiv}>
          <i className={"material-icons " + classes.navIcon}>looks_one</i>
          <p className={classes.iconText}>1RM calculator</p>
        </div>
        {this.props.displayEditTimerModal ? (
          <div
            onClick={this.props.toggleModal}
            style={this.props.styles.iconDiv}
            className={classes.iconDiv}
          >
            <i className={"material-icons " + classes.navIcon}>alarm</i>
            <p className={classes.iconText}>Edit timers</p>
          </div>
        ) : null}
        <div style={this.props.styles.iconDiv} className={classes.iconDiv}>
          <i className={"material-icons " + classes.navIcon}>help</i>
          <p className={classes.iconText}>FAQ</p>
        </div>
        <div
          onClick={this.logout}
          style={this.props.styles.iconDiv}
          className={classes.iconDiv}
        >
          <i className={"material-icons " + classes.navIcon}>
            power_settings_new
          </i>
          <p className={classes.iconText}>Logout</p>
        </div>
      </div>
    );
  }
}

export default Sidenav;
