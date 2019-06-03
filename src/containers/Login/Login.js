import React, { Component } from "react";
import firebase from "../../firebase.js";
import classes from "./Login.module.sass";

class Login extends Component {
  state = {
    email: "",
    password: "",
    emailError: null,
    passwordError: null,
    mainClass: " animated zoomIn fast ",
    emailClass: classes.inputField,
    passwordClass: classes.inputField + " " + classes.passwordInput,
    loader: null
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        window.location.href = "/workouts";
      } else {
        console.log("User not logged in");
      }
    });
    setTimeout(() => {
      this.setState({
        mainClass: " "
      });
    }, 700);
  };

  updateEmailState = e => {
    this.setState({
      email: e.target.value
    });
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
        passwordClass: classes.inputFieldSuccess + " " + classes.passwordInput,
        passwordError: null
      });
    }
  };

  updatePasswordState = e => {
    this.setState({
      password: e.target.value
    });
  };

  checkForAllErrors = () => {
    this.checkForEmailError();
    this.checkForPasswordError();
  };

  validateErrorCode = (code, message) => {
    if (code === "auth/user-disabled") {
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
    } else if (code === "auth/user-not-found") {
      this.setState({
        loader: null,
        emailError: (
          <p className={classes.errorMessage}>
            There is no user with such email
          </p>
        ),
        emailClass: classes.inputFieldError
      });
    }
    if (code === "auth/wrong-password") {
      this.setState({
        loader: null,
        passwordError: (
          <p className={classes.errorMessage}>The password is invalid</p>
        ),
        passwordClass: classes.inputFieldError
      });
    }
  };

  loginWithEmailAndPassword = async () => {
    await this.checkForAllErrors();
    if (this.state.passwordError || this.state.emailError) {
      console.log("Input valid email and password before pressing Sign In");
    } else {
      this.setState({
        loader: <div className={classes.loader} />
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(function() {
          window.location.href = "/workouts";
        })
        .catch(error => {
          this.validateErrorCode(error.code, error.message);
        });
    }
  };

  loginWithGoogle = () => {
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

  loginWithFacebook = () => {
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

  switchToSignUp = () => {
    this.setState({
      mainClass: " animated fadeOutUp fast"
    });
    setTimeout(() => {
      this.props.switchToSignUpDiv();
    }, 500);
  };

  sendForgotPasswordEmail = () => {
    this.checkForEmailError();
    if (this.state.emailError) {
      alert(
        "Enter a valid email adress if you want to recieve the reset password email"
      );
    } else {
      this.setState({
        loader: <div className={classes.loader} />
      });
      firebase
        .auth()
        .sendPasswordResetEmail(this.state.email)
        .then(() => {
          this.setState({
            loader: null
          });
          alert("the email was sent to " + this.state.email);
        })
        .catch(error => {
          console.log("error sending forgot password email: ", error);
        });
    }
  };

  render() {
    return (
      <div className={classes.mainLoginDiv}>
        <div className={classes.authDiv + this.state.mainClass}>
          <h1 className={classes.mainHeader}>Sign In</h1>
          <div className={classes.standardLoginDiv}>
            <input
              className={this.state.emailClass}
              onChange={this.updateEmailState}
              onBlur={this.checkForEmailError}
              type="email"
              placeholder="Email"
            />
            {this.state.emailError}
            <input
              className={this.state.passwordClass}
              onChange={this.updatePasswordState}
              onBlur={this.checkForPasswordError}
              type="password"
              placeholder="Password"
            />
            {this.state.passwordError}
            <button
              className={classes.loginButton + " " + classes.buttonAnimation}
              onClick={this.loginWithEmailAndPassword}
            >
              <span className={classes.loginSpan}>Sign In</span>
            </button>
            <div className={classes.forgotPasswordDiv}>
              <p
                onClick={this.sendForgotPasswordEmail}
                className={classes.forgotPassword}
              >
                Forgot password ?
              </p>
            </div>
          </div>
          <div className={classes.differentOptionsDiv}>
            <p className={classes.differentOptionsHeader}>
              Different login options
            </p>
            <i
              onClick={this.loginWithGoogle}
              className={"fab fa-google " + classes.googleIcon}
            />
            <i
              onClick={this.loginWithFacebook}
              className={"fab fa-facebook " + classes.facebookIcon}
            />
          </div>
          <div className={classes.signUpDiv}>
            <p onClick={this.redirectToSignUp} className={classes.signUpHeader}>
              Don't have an account ?
            </p>
            <p onClick={this.switchToSignUp} className={classes.signUpAnchor}>
              Sign Up
            </p>
          </div>
          {this.state.loader}
        </div>
      </div>
    );
  }
}

export default Login;
