import React, { Component } from "react";
import firebase from "../../firebase";
import classes from "./ResetEmail.module.sass";

class ResetEmail extends Component {
  state = {
    firebaseEmail: "woah",
    email: "",
    newEmail: "",
    emailError: null,
    newEmailError: null,
    class: "",
    emailClass: classes.inputField,
    newEmailClass: classes.inputField,
    loader: null
  };

  updateEmailState = e => {
    console.log(e.target.value);
    this.setState({
      email: e.target.value
    });
    console.log(this.state.email);
  };

  updateNewEmailState = e => {
    console.log(e.target.value);
    this.setState({
      newEmail: e.target.value
    });
    console.log(this.state.newEmail);
  };

  checkForEmailError = () => {
    if (!this.state.email.trim()) {
      this.setState({
        emailError: (
          <p className={classes.errorMessage}>Email field can't be empty</p>
        ),
        emailClass: classes.inputFieldError
      });
    } else if (this.state.email.length < 6) {
      this.setState({
        emailError: (
          <p className={classes.errorMessage}>
            Email should be at least 6 characters
          </p>
        ),
        emailClass: classes.inputFieldError
      });
    } else {
      this.setState({
        emailClass: classes.inputFieldSuccess,
        emailError: null
      });
    }
  };

  checkForNewEmailError = () => {
    if (!this.state.newEmail.trim()) {
      this.setState({
        newEmailError: (
          <p className={classes.errorMessage}>New email field can't be empty</p>
        ),
        newEmailClass: classes.inputFieldError
      });
    } else if (this.state.newEmail.length < 6) {
      this.setState({
        newEmailError: (
          <p className={classes.errorMessage}>
            Email should be at least 6 characters
          </p>
        ),
        newEmailClass: classes.inputFieldError
      });
    } else {
      this.setState({
        newEmailClass: classes.inputFieldSuccess,
        newEmailError: null
      });
    }
  };

  getEmailFromFirebase = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then(doc => {
            let email = doc.data().email;
            this.checkEmailWithFirebase(email);
          })
          .catch(error => {
            console.log("error updating state with firebase data: ", error);
          });
      } else {
        console.log("user is not logged in");
      }
    });
  };

  checkEmailWithFirebase = firebaseEmail => {
    console.log(this.state.email);
    console.log(firebaseEmail);
    if (!(this.state.email === firebaseEmail)) {
      this.setState({
        emailError: <p className={classes.errorMessage}>Email is incorrect</p>,
        emailClass: classes.inputFieldError
      });
    } else {
      if (!this.state.emailError && !this.state.newEmailError) {
        const user = firebase.auth().currentUser;
        user
          .updateEmail(this.state.newEmail)
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(user.uid)
              .update({
                email: this.state.newEmail
              })
              .then(() => {
                console.log(
                  "successfuly set the new email value in users collection"
                );
                this.closeModal();
              })
              .catch(error => {
                console.log("error updating email in firestore: ", error);
              });
            alert("Successfuly updated the email");
          })
          .catch(error => {
            alert(error.message);
            console.log("Error updating the email: ", error);
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
              onClick={this.checkEmailWithFirebase}
              className={classes.resetEmailHeader}
            >
              Reset Email
            </h5>
            <input
              onChange={this.updateEmailState}
              onBlur={this.checkForEmailError}
              className={this.state.emailClass}
              type="email"
              placeholder="Email"
              value={this.state.email}
            />
            {this.state.emailError}
            <input
              onChange={this.updateNewEmailState}
              onBlur={this.checkForNewEmailError}
              className={this.state.newEmailClass}
              type="email"
              placeholder="New Email"
              value={this.state.newEmail}
            />
            {this.state.newEmailError}
          </div>
          <div className={classes.bottomModalDiv}>
            {this.state.loader}
            <button
              onClick={this.getEmailFromFirebase}
              className={classes.submitButton + " " + classes.buttonAnimation}
            >
              <span className={classes.submitSpan}>Edit Timers</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetEmail;
