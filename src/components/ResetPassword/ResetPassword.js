import React, { Component } from "react";
import firebase from "../../firebase";
import classes from "./ResetPassword.module.sass";

class ResetPassword extends Component {
  state = {
    firebasePassword: "woah",
    password: "",
    newPassword: "",
    passwordError: null,
    newPasswordError: null,
    class: "",
    passwordClass: classes.inputField,
    newPasswordClass: classes.inputField,
    loader: null
  };

  updatePasswordState = e => {
    console.log(e.target.value);
    this.setState({
      password: e.target.value
    });
    console.log(this.state.password);
  };

  updateNewPasswordState = e => {
    console.log(e.target.value);
    this.setState({
      newPassword: e.target.value
    });
    console.log(this.state.newPassword);
  };

  checkForPasswordError = () => {
    if (!this.state.password.trim()) {
      this.setState({
        passwordError: (
          <p className={classes.errorMessage}>Password field can't be empty</p>
        ),
        passwordClass: classes.inputFieldError
      });
    } else if (this.state.password.length < 6) {
      this.setState({
        passwordError: (
          <p className={classes.errorMessage}>
            Password should be at least 6 characters
          </p>
        ),
        passwordClass: classes.inputFieldError
      });
    } else {
      this.setState({
        passwordClass: classes.inputFieldSuccess,
        passwordError: null
      });
    }
  };

  checkForNewPasswordError = () => {
    if (!this.state.newPassword.trim()) {
      this.setState({
        newPasswordError: (
          <p className={classes.errorMessage}>
            New password field can't be empty
          </p>
        ),
        newPasswordClass: classes.inputFieldError
      });
    } else if (this.state.newPassword.length < 6) {
      this.setState({
        newPasswordError: (
          <p className={classes.errorMessage}>
            Password should be at least 6 characters
          </p>
        ),
        newPasswordClass: classes.inputFieldError
      });
    } else {
      this.setState({
        newPasswordClass: classes.inputFieldSuccess,
        newPasswordError: null
      });
    }
  };

  getPasswordFromFirebase = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then(doc => {
            let password = doc.data().password;
            this.checkPasswordWithFirebase(password);
          })
          .catch(error => {
            console.log("error updating state with firebase data: ", error);
          });
      } else {
        console.log("user is not logged in");
      }
    });
  };

  checkPasswordWithFirebase = firebasePassword => {
    console.log(this.state.password);
    console.log(firebasePassword);
    if (!(this.state.password === firebasePassword)) {
      this.setState({
        passwordError: (
          <p className={classes.errorMessage}>Password is incorrect</p>
        ),
        passwordClass: classes.inputFieldError
      });
    } else {
      if (!this.state.passwordError && !this.state.newPasswordError) {
        const user = firebase.auth().currentUser;
        user
          .updatePassword(this.state.newPassword)
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(user.uid)
              .update({
                password: this.state.newPassword
              })
              .then(() => {
                console.log(
                  "successfuly set the new password value in users collection"
                );
                this.closeModal();
              })
              .catch(error => {
                console.log("error updating password in firestore: ", error);
              });
            alert("Successfuly updated the password");
          })
          .catch(error => {
            alert(error.message);
            console.log("Error updating the password: ", error);
          });
      }
    }
  };

  closeModal = () => {
    this.setState({
      class: "animated fadeOutUp fast "
    });
    setTimeout(() => {
      this.props.closeModal();
    }, 700);
  };

  render() {
    return (
      <div className={this.state.class + classes.opacityLayerDiv}>
        <div className={"animated zoomIn faster " + classes.mainModalDiv}>
          <div className={classes.modalHeaderMainDiv}>
            <h5 className={classes.modalHeader}>Account</h5>
            <i
              onClick={this.closeModal}
              className={"material-icons " + classes.closeIcon}
            >
              close
            </i>
          </div>
          <div className={classes.mainBodyDiv}>
            <h5
              onClick={this.checkPasswordWithFirebase}
              className={classes.resetPasswordHeader}
            >
              Reset Password
            </h5>
            <input
              onChange={this.updatePasswordState}
              onBlur={this.checkForPasswordError}
              className={this.state.passwordClass}
              type="password"
              placeholder="Password"
              value={this.state.password}
            />
            {this.state.passwordError}
            <input
              onChange={this.updateNewPasswordState}
              onBlur={this.checkForNewPasswordError}
              className={this.state.newPasswordClass}
              type="password"
              placeholder="New Password"
              value={this.state.newPassword}
            />
            {this.state.newPasswordError}
          </div>
          <div className={classes.bottomModalDiv}>
            {this.state.loader}
            <button
              onClick={this.getPasswordFromFirebase}
              className={classes.submitButton + " " + classes.buttonAnimation}
            >
              <span className={classes.submitSpan}>Reset Password</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
