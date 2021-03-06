import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import firebase from "../../firebase.js";
import classes from "./Workouts.module.sass";

import Navbar from "../../components/Navbar/Navbar";
import Loading from "../../components/Loading/Loading";
import WorkoutMessage from "../../components/WorkoutMessage/WorkoutMessage";
import AddWorkout from "../../components/AddWorkout/AddWorkout";
import Sidenav from "../../components/Sidenav/Sidenav";
import WorkoutCard from "../../components/WorkoutCard/WorkoutCard";
import ResetPassword from "../../components/ResetPassword/ResetPassword";
import ResetEmail from "../../components/ResetEmail/ResetEmail";
import DeleteAccount from "../../components/DeleteAccount/DeleteAccount";

class Workouts extends Component {
  state = {
    workouts: [],
    workoutNames: [],
    exercises: [],
    workoutCards: {},
    loading: true,
    numberOfWorkouts: 0,
    displayWorkoutMessage: false,
    displayAddWorkoutModal: null,
    addWorkoutDisplay: "none",
    reduxExercises: [],
    sidenavStyles: {
      width: "0px",
      borderLeft: "none",
      paddingLeft: "0px"
    },
    sidenavVisible: false,
    removingWorkout: false,
    displayResetPasswordModal: null,
    displayResetEmailModal: null,
    displayDeleteAccountModal: null
  };

  componentDidMount() {
    this.getAllWorkoutsFromFirebase();
    this.getNumberOfUserWorkouts();
  }

  logData = () => {
    console.log(this.state.workouts);
    console.log(this.state.exercises);
  };

  renderResetPassword = () => {
    firebase.auth().currentUser.providerData.forEach(profile => {
      console.log(profile.providerId);
    });
  };

  // updateTimers = () => {
  //   const db = firebase.firestore();
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       db.collection("workouts")
  //         .get()
  //         .then(snapshot => {
  //           if (snapshot.docs.length > 0) {
  //             snapshot.docs.forEach(doc => {
  //               db.collection("workouts")
  //                 .doc(doc.id)
  //                 .update({
  //                   timers: [15, 30, 90]
  //                 });
  //             });
  //           } else {
  //             console.log("there are no documents");
  //           }
  //         });
  //     } else {
  //       console.log("user not logged in");
  //     }
  //   });
  // };

  getAllWorkoutsFromFirebase = () => {
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid;
        const query = db
          .collection("workouts")
          .where("uid", "==", uid)
          .orderBy("workoutNumber", "asc");
        query
          .get()
          .then(snapshot => {
            if (snapshot.docs.length > 0) {
              snapshot.docs.forEach(doc => {
                let exercisesCopy = this.state.exercises;
                exercisesCopy.push(doc.data().exercises);
                let workoutsCopy = this.state.workouts;
                let workoutObject = {
                  name: doc.data().workoutName,
                  number: doc.data().workoutNumber,
                  timers: doc.data().timers
                };
                workoutsCopy.push(workoutObject);
                this.setState({
                  exercises: exercisesCopy,
                  workouts: workoutsCopy
                });
              });
              this.setState({
                loading: false
              });
            } else {
              this.setState({
                loading: false,
                displayWorkoutMessage: true
              });
            }
          })
          .catch(error => {
            console.log("Error getting workoutName: " + error);
            this.setState({
              loading: false
            });
          });
      } else {
        console.log("Error getting document");
        window.location = "..";
      }
    });
  };

  getNumberOfUserWorkouts = () => {
    const db = firebase.firestore();
    let globalWorkoutNumber = 0;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid;
        const usersCollection = db.collection("users");
        usersCollection
          .where("uid", "==", uid)
          .orderBy("workoutsNumber", "desc")
          .limit(1)
          .get()
          .then(snapshot => {
            if (snapshot.docs.length > 0) {
              console.log("snapshot docs length: " + snapshot.docs.length);
              console.log("doc exists");
              snapshot.docs.forEach(doc => {
                console.log(doc.data().uid);
                console.log(doc.data().workoutsNumber);
                globalWorkoutNumber = doc.data().workoutsNumber;
                this.setState({
                  numberOfWorkouts: globalWorkoutNumber
                });
                this.props.getWorkoutsNumber(globalWorkoutNumber);
              });
            } else if (snapshot.docs.length === false) {
              console.log("doc doesn't exist");
              globalWorkoutNumber = 0;
              this.setState({
                numberOfWorkouts: globalWorkoutNumber
              });
              console.log("globalWorkoutNumber = " + globalWorkoutNumber);
              this.props.getWorkoutsNumber(globalWorkoutNumber);
            }
          })
          .catch(function(error) {
            console.log("Error getting workoutNumber data: ", error);
          });
      } else {
        console.log("user not logged in");
      }
    });
  };

  removeWorkout = number => {
    if (!this.state.removingWorkout) {
      this.setState({
        removingWorkout: true
      });
      console.log("removeWorkout function triggered " + number);
      const db = firebase.firestore();
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log(user.uid);
          const uid = user.uid;
          let deleteQuery = db
            .collection("workouts")
            .where("uid", "==", uid)
            .where("workoutNumber", "==", number)
            .limit(1);
          const subtractNumberQuery = db
            .collection("workouts")
            .where("uid", "==", uid)
            .orderBy("workoutNumber", "desc");
          deleteQuery.get().then(snapshot => {
            console.log("get doc for delete function worked");
            snapshot.docs.forEach(doc => {
              db.collection("workouts")
                .doc(doc.id)
                .delete()
                .then(() => {
                  console.log("delete firebase function worked");
                  subtractNumberQuery
                    .get()
                    .then(snapshot => {
                      if (snapshot.docs.length > 0) {
                        console.log("get function worked");
                        snapshot.docs.forEach(doc => {
                          console.log("------workout number------");
                          console.log(doc.data().workoutNumber);
                          if (doc.data().workoutNumber > number) {
                            db.collection("workouts")
                              .doc(doc.id)
                              .update({
                                workoutNumber: doc.data().workoutNumber - 1
                              })
                              .catch(error => {
                                console.log(
                                  "Error while looping through other workouts ",
                                  error.message
                                );
                              });
                          }
                        });
                      } else {
                        console.log("there are no other workouts");
                      }
                    })
                    .then(() => {
                      db.collection("users")
                        .doc(uid)
                        .update({
                          workoutsNumber: this.state.numberOfWorkouts - 1
                        })
                        .then(() => {
                          window.location.reload();
                        })
                        .catch(error => {
                          console.log(
                            "error updating user workoutsNumber ",
                            error
                          );
                        });
                    })
                    .catch(error => {
                      console.log(
                        "error updating user workoutNumber doc ",
                        error
                      );
                    });
                });
            });
          });
        } else {
          console.log("user is not logged in");
        }
      });
    } else {
      alert("You already removing a workout");
    }
  };

  editWorkoutName = event => {
    let workoutsStateCopy = this.state.workouts;
    let number = this.state.selectedInputNumber;
    console.log(workoutsStateCopy);
    let inputValue = event.target.value;
    workoutsStateCopy[number - 1].name = inputValue;
    this.setState({
      workouts: workoutsStateCopy
    });
  };

  setSelectedInputNumber = number => {
    this.setState({
      selectedInputNumber: number
    });
  };

  addWorkoutNameToFirebase = number => {
    const db = firebase.firestore();
    const inputValue = this.state.workouts[number - 1].name;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const uid = user.uid;
        const editWorkoutNameQuery = db
          .collection("workouts")
          .where("uid", "==", uid)
          .where("workoutNumber", "==", number)
          .limit(1);
        editWorkoutNameQuery
          .get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
              db.collection("workouts")
                .doc(doc.id)
                .update({
                  workoutName: inputValue
                })
                .then(() => {
                  console.log(
                    "successfuly updated the workout name with " + inputValue
                  );
                })
                .catch(error => {
                  console.log(
                    "error updating the workoutName with -- " +
                      inputValue +
                      "error : " +
                      error
                  );
                });
            });
          })
          .catch(error => {
            console.log("error getting editWorkoutName -- ", error);
          });
      } else {
        console.log("user not logged in :( ");
      }
    });
  };

  toggleAddWorkoutModal = () => {
    if (this.state.displayAddWorkoutModal) {
      this.setState({
        displayAddWorkoutModal: null
      });
    } else {
      this.setState({
        displayAddWorkoutModal: (
          <AddWorkout closeModal={this.closeAddWorkoutModal} />
        )
      });
    }
  };

  closeAddWorkoutModal = () => {
    this.setState({
      displayAddWorkoutModal: null
    });
  };

  toggleResetPasswordModal = () => {
    if (this.state.displayResetPasswordModal) {
      this.setState({
        displayResetPasswordModal: null
      });
      this.toggleSidenav();
    } else {
      this.toggleSidenav();
      this.setState({
        displayResetPasswordModal: (
          <ResetPassword closeModal={this.closeResetPasswordModal} />
        )
      });
    }
  };

  closeResetPasswordModal = () => {
    this.setState({
      displayAddWorkoutModal: null
    });
  };

  toggleResetEmailModal = () => {
    if (this.state.displayResetEmailModal) {
      this.setState({
        displayResetEmailModal: null
      });
    } else {
      this.toggleSidenav();
      this.setState({
        displayResetEmailModal: (
          <ResetEmail closeModal={this.closeResetEmailModal} />
        )
      });
    }
  };

  closeResetEmailModal = () => {
    this.setState({
      displayResetEmailModal: null
    });
  };

  toggleDeleteAccountModal = () => {
    if (this.state.displayDeleteAccountModal) {
      console.log("yes");
      this.setState({
        displayDeleteAccountModal: null
      });
    } else {
      console.log("no");
      this.toggleSidenav();
      this.setState({
        displayDeleteAccountModal: (
          <DeleteAccount closeModal={this.closeDeleteAccountModal} />
        )
      });
    }
  };

  closeDeleteAccountModal = () => {
    this.setState({
      displayDeleteAccountModal: null
    });
  };

  toggleSidenav = () => {
    if (this.state.sidenavVisible) {
      this.setState({
        sidenavStyles: {
          sideNavDiv: {
            paddingLeft: "0px",
            width: "0px",
            borderLeft: "none"
          },
          iconDiv: {
            visibility: "hidden",
            opacity: "0"
          }
        },
        sidenavVisible: false
      });
    } else {
      if (window.screen.width >= 3840) {
        this.setState({
          sidenavStyles: {
            sideNavDiv: {
              paddingLeft: "60px",
              width: "400px",
              borderLeft: "solid 2px #707070"
            },
            iconDiv: {
              transitionDelay: "0.3s",
              visibility: "visible",
              opacity: "1"
            }
          },
          sidenavVisible: true
        });
      } else {
        this.setState({
          sidenavStyles: {
            sideNavDiv: {
              paddingLeft: "30px",
              width: "200px",
              borderLeft: "solid 1px #707070"
            },
            iconDiv: {
              transitionDelay: "0.3s",
              visibility: "visible",
              opacity: "1"
            }
          },
          sidenavVisible: true
        });
      }
    }
  };

  render() {
    return (
      <div className={classes.workoutsDiv}>
        <Navbar
          toggleSidenav={this.toggleSidenav}
          location="workouts"
          exercises={null}
          number={null}
        />
        <Sidenav
          toggleModal={this.toggleAddWorkoutModal}
          toggleResetPasswordModal={this.toggleResetPasswordModal}
          toggleResetEmailModal={this.toggleResetEmailModal}
          toggleDeleteAccountModal={this.toggleDeleteAccountModal}
          styles={this.state.sidenavStyles}
          displayEditTimerModal={false}
        />
        {this.state.displayAddWorkoutModal}
        {this.state.displayResetPasswordModal}
        {this.state.displayResetEmailModal}
        {this.state.displayDeleteAccountModal}
        {this.state.loading ? <Loading /> : null}
        {this.state.displayWorkoutMessage ? (
          <WorkoutMessage toggleAddWorkoutModal={this.toggleAddWorkoutModal} />
        ) : null}
        <div className={classes.workoutCardsDiv}>
          {this.state.workouts.map(w => {
            console.log(w.timers);
            return (
              <WorkoutCard
                key={w.number}
                number={w.number}
                addWorkout={() => this.addWorkoutNameToFirebase(w.number)}
                setInputNumber={() => this.setSelectedInputNumber(w.number)}
                editWorkoutName={this.editWorkoutName}
                name={this.state.workouts[w.number - 1].name}
                exercises={this.state.exercises}
                getExercisesToRedux={() =>
                  this.props.getExercisesToRedux(
                    this.state.exercises[w.number - 1],
                    w.number,
                    w.timers
                  )
                }
                removeWorkout={() => this.removeWorkout(w.number)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    exercises: state.exercises,
    workoutsNumber: state.workoutsNumber
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getExercisesToRedux: (exercises, number, timers) =>
      dispatch(actionTypes.getExercises(exercises, number, timers)),
    getWorkoutsNumber: number => dispatch(actionTypes.getWorkoutsNumber(number))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workouts);
