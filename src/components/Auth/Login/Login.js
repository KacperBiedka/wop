import React, { Component } from 'react';
import firebase from '../../../firebase.js';
import * as firebaseui from 'firebaseui';
import classes from './Login.module.sass';

class Login extends Component {
state = {
    email: '',
    password: '',
    loginError: null
}

componentDidMount = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      window.location.href = '/workouts';
    } else {
      console.log("User not logged in");
    }
  });
}


render() {
  
  const updateEmailState = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  const updatePasswordState = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  const loginWithEmailAndPassword = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(function() {
      window.location.href = '/workouts';
    })
    .catch(error => {
      var errorComponent = null;
      var errorMessage = error.message;
      console.log(errorMessage);
      errorComponent = <div className={classes.loginErrorDiv}>{error.message}</div>
      this.setState({
        loginError: errorComponent
      })
    })
  }

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log("login info: ", token, user);
      window.location.href = '/workouts';
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      alert("Error logging in: " + error.message);
    });
  }

  const loginWithFacebook = () => {
    const provider =  new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log("login info: ", token, user);
      window.location.href = '/workouts';
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      alert("Error logging in: " + error.message);
    });
  }

  const loginWithTwitter = () => {
    const provider =  new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log("login info: ", token, user);
      window.location.href = '/workouts';
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      alert("There is no twitter user signed in");
    });
  }


       return (
        <div className={classes.mainDiv + " shadow p-3 mb-1 bg-white rounded"}>
          <div className={classes.authDiv + " row"}>
            <h1 className={classes.mainHeader}>Login</h1>
            <div className={classes.standardloginDiv + " col-6"}>
              <p className={classes.inputParagraph}>Email</p>
              <input className={classes.inputField}  onChange={updateEmailState} type="email" placeholder=""/>
              <p className={classes.inputParagraph}>Password</p>
              <input className={classes.inputField} onChange={updatePasswordState} type="password" placeholder=""/>
              <button className={classes.loginButton} onClick={loginWithEmailAndPassword}>LOGIN</button>
              <p className={classes.forgotPassword}>Forgot password ?</p>
            </div>
            <div className="col-6">
              <button className={classes.googleAuthButton} onClick={loginWithGoogle}><i className={classes.buttonIcon + " fab fa-google"}></i>Login with Google</button>
              <button className={classes.twitterAuthButton} onClick={loginWithTwitter}><i className={classes.buttonIcon + " fab fa-twitter"}></i>Login with Twitter</button>
              <button className={classes.facebookAuthButton} onClick={loginWithFacebook}><i className={classes.buttonIcon + " fab fa-facebook"}></i>Login with Facebook</button>  
            </div>
          </div>
          {this.state.loginError}
         </div>
        )
    }
}

export default Login;