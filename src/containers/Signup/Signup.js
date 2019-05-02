import React, { Component } from "react";
import firebase from "../../firebase.js";
import classes from "./Signup.module.sass";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    repeatPassword: "",
    emailError: null,
    passwordError: null,
    repeatPasswordError: null,
    mainClass: " animated zoomIn",
    emailClass: classes.inputField,
    passwordClass: classes.inputField,
    repeatPasswordClass: classes.inputField,
    loader: null
  };

  componentWillMount = () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        window.location.href = "workouts";
      } else {
        // No user is signed in.
        console.log("not logged in");
      }
    });
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        mainClass: " "
      });
    }, 1000);
  };

  checkForAllErrors = () => {
    this.checkForEmailError();
    this.checkForPasswordError();
    this.checkForRepeatPasswordError();
  };

  validateErrorCode = (code, message) => {
    if (code === "auth/email-already-in-use") {
      this.setState({
        loader: null,
        emailError: <p className={classes.errorMessage}>{message}</p>,
        emailClass: classes.inputFieldError
      });
    } else if (code === "auth/invalid-email") {
      this.setState({
        loader: null,
        emailError: <p className={classes.errorMessage}>{message}</p>,
        emailClass: classes.inputFieldError
      });
    }
    if (code === "auth/weak-password") {
      this.setState({
        loader: null,
        passwordError: <p className={classes.errorMessage}>{message}</p>,
        passwordClass: classes.inputFieldError
      });
    }
  };

  createNewUser = () => {
    if (
      !this.state.emailError &&
      !this.state.passwordError &&
      !this.state.repeatPasswordError
    ) {
      this.setState({
        loader: <div className={classes.loader} />
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch(error => {
          this.validateErrorCode(error.code, error.message);
        });
    } else {
      console.log("error logging in");
    }
  };

  submitUserToFirebase = async () => {
    await this.checkForAllErrors();
    this.createNewUser();
  };

  updateEmailState = e => {
    console.log(e.target.value);
    this.setState({
      email: e.target.value
    });
    console.log(this.state.email);
  };

  updatePasswordState = e => {
    console.log(e.target.value);
    this.setState({
      password: e.target.value
    });
    console.log(this.state.password);
  };

  updateRepeatPasswordState = e => {
    console.log(e.target.value);
    this.setState({
      repeatPassword: e.target.value
    });
    console.log(this.state.repeatPassword);
  };

  checkForEmailError = () => {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.state.email.trim()) {
      this.setState({
        emailError: (
          <p className={classes.errorMessage}>Email field can't be empty</p>
        ),
        emailClass: classes.inputFieldError
      });
    } else if (!re.test(String(this.state.email).toLowerCase())) {
      this.setState({
        emailError: (
          <p className={classes.errorMessage}>Invalid Email format</p>
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

  checkForRepeatPasswordError = () => {
    if (!this.state.repeatPassword.trim()) {
      this.setState({
        repeatPasswordError: (
          <p className={classes.errorMessage}>
            Repeat password field can't be empty
          </p>
        ),
        repeatPasswordClass: classes.inputFieldError
      });
    } else if (this.state.repeatPassword !== this.state.password) {
      this.setState({
        repeatPasswordError: (
          <p className={classes.errorMessage}>Passwords don't match</p>
        ),
        repeatPasswordClass: classes.inputFieldError
      });
    } else {
      this.setState({
        repeatPasswordClass: classes.inputFieldSuccess,
        repeatPasswordError: null
      });
    }
  };

  signUpWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log("login info: ", token, user);
        window.location.href = "/workouts";
      })
      .catch(function(error) {
        console.log("Error logging in: " + error.message);
      });
  };

  signUpWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log("login info: ", token, user);
        window.location.href = "/workouts";
      })
      .catch(function(error) {
        console.log("Error logging in: " + error.message);
      });
  };

  switchToLogin = () => {
    this.setState({
      mainClass: " animated fadeOutUp"
    });
    setTimeout(() => {
      this.props.switchToLoginDiv();
    }, 1000);
  };

  render() {
    return (
      <div className={classes.signUpMainDiv}>
        <div className={classes.authDiv + this.state.mainClass}>
          <h2 className={classes.mainHeader}>Sign Up</h2>
          <div className={classes.standardLoginDiv}>
            <input
              className={this.state.emailClass}
              value={this.state.email}
              onChange={this.updateEmailState}
              onBlur={this.checkForEmailError}
              type="email"
              placeholder="Email"
            />
            {this.state.emailError}
            <input
              className={this.state.passwordClass}
              value={this.state.password}
              onChange={this.updatePasswordState}
              onBlur={this.checkForPasswordError}
              type="password"
              placeholder="Password"
            />
            {this.state.passwordError}
            <input
              className={this.state.repeatPasswordClass}
              value={this.state.repeatPassword}
              onChange={this.updateRepeatPasswordState}
              onBlur={this.checkForRepeatPasswordError}
              type="password"
              placeholder="Repeat password"
            />
            {this.state.repeatPasswordError}
            <button
              onClick={this.submitUserToFirebase}
              className={classes.loginButton + " " + classes.buttonAnimation}
            >
              <span className={classes.loginSpan}>Sign up</span>
            </button>
          </div>
          <div className={classes.differentOptionsDiv}>
            <p className={classes.differentOptionsHeader}>
              Different sign up options
            </p>
            <i
              onClick={this.signUpWithGoogle}
              className={"fab fa-google " + classes.googleIcon}
            />
            <i
              onClick={this.signUpWithFacebook}
              className={"fab fa-facebook " + classes.facebookIcon}
            />
          </div>
          <div className={classes.signUpDiv}>
            <p onClick={this.redirectToSignUp} className={classes.signUpHeader}>
              Already have an account ?
            </p>
            <p onClick={this.switchToLogin} className={classes.signUpAnchor}>
              Sign In
            </p>
          </div>
          {this.state.loader}
        </div>
      </div>
    );
  }
}

export default Signup;
