import React, { Component } from 'react';
import Redux from 'redux';
import firebase from '../../../firebase.js';
import * as firebaseui from 'firebaseui';
import classes from './Login.module.css';
import { Link } from 'react-router-dom';


class Login extends Component {
  state = {
    email: '',
    password: ''
  }
    render() {
        var uiConfig = {
            signInSuccessUrl: 'workouts',
            signInOptions: [
              firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ],
            tosUrl: 'privacy',
            privacyPolicyUrl: function() {
              window.location.assign('<your-privacy-policy-url>');
            }
          };
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
            .catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorMessage);
            });
          }

          let ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
          ui.start('#firebaseui-auth-container', uiConfig);



       return (
          <div className={"shadow p-3 mb-5 bg-white rounded " + classes.mainDiv}>
            <h2 className={classes.loginHeader}>Login</h2>
            <div className={classes.emailAuthContainer}>
            <input value={this.state.email} onChange={updateEmailState} className={classes.inputField} type="email" placeholder="email" />
            <input value={this.state.password} onChange={updatePasswordState} className={classes.inputField + " " + classes.passwordInput} type="password" placeholder="password" />
            <button onClick={loginWithEmailAndPassword}className={classes.authButton + " " + classes.loginButton}>
              Login
            </button>
            <Link to='/signup'>
              <button className={classes.authButton + " " + classes.signupButton}>
                Sign up
              </button>
            </Link>
            </div>
            <p className={classes.dividingParagraph}>or</p>
            <div id="firebaseui-auth-container" className={classes.firebaseuiDiv}>
            </div>
          </div>
        )
    }
}

export default Login;