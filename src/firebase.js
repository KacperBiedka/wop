import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyCaFvsr8WCamI6A1VuKWynbJmdNHqGWEUw",
    authDomain: "workout-planner-e9847.firebaseapp.com",
    databaseURL: "https://workout-planner-e9847.firebaseio.com",
    projectId: "workout-planner-e9847",
    storageBucket: "workout-planner-e9847.appspot.com",
    messagingSenderId: "493004229911"
  };
firebase.initializeApp(config);
export default firebase;