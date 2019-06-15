import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";

import ExerciseCard from "../../components/ExerciseCard/ExerciseCard";
import NavBar from "../../components/Navbar/Navbar";
import Timer from "../../components/Timer/Timer";
import Sidenav from "../../components/Sidenav/Sidenav";
import EditExercise from "../../components/EditExercise/EditExercise";
import EditTimers from "../../components/EditTimers/EditTimers";
import ResetPassword from "../../components/ResetPassword/ResetPassword";
import ResetEmail from "../../components/ResetEmail/ResetEmail";
import DeleteAccount from "../../components/DeleteAccount/DeleteAccount";

import classes from "./Exercises.module.sass";

class Exercises extends Component {
  state = {
    exercises: [],
    number: null,
    timers: [],
    showTimer: false,
    duration: 0,
    timerMessage: "0:00",
    sidenavStyles: {
      width: "0px",
      borderLeft: "none",
      paddingLeft: "0px"
    },
    sidenavVisible: false,
    timerClass: "animated fadeInUp faster ",
    displayTimer: false,
    displayEditModal: null,
    displayEditTimersModal: null,
    playSound: false,
    displayResetPasswordModal: null,
    displayResetEmailModal: null,
    displayDeleteAccountModal: null
  };

  componentDidMount() {
    console.log(this.props.exercises);
    console.log(this.state.exercises);
    this.startTimer();
    if (this.props.exercises) {
      window.localStorage.clear();
      window.localStorage.setItem(
        "exercises",
        JSON.stringify(this.props.exercises)
      );
      window.localStorage.setItem("number", JSON.stringify(this.props.number));
      window.localStorage.setItem("timers", JSON.stringify(this.props.timers));
      console.log(window.localStorage.getItem("exercises"));
      console.log(window.localStorage.getItem("number"));
      console.log(window.localStorage.getItem("timers"));

      this.setState({
        exercises: this.props.exercises,
        number: this.props.number,
        timers: this.props.timers
      });
    } else {
      let localStorageExercises = JSON.parse(
        window.localStorage.getItem("exercises")
      );
      let localStorageNumber = parseInt(window.localStorage.getItem("number"));
      let localStorageTimers = JSON.parse(
        window.localStorage.getItem("timers")
      );
      console.log(localStorageExercises);
      console.log(localStorageNumber);
      console.log(localStorageTimers);
      this.setState({
        exercises: localStorageExercises,
        number: localStorageNumber,
        timers: localStorageTimers
      });
      this.props.getExercisesToRedux(
        localStorageExercises,
        localStorageNumber,
        localStorageTimers
      );
    }

    console.log(this.state.exercises);
  }

  logData = () => {
    console.log(this.state.exercises);
  };

  toggleEditModal = number => {
    this.setState({
      clickedExerciseNumber: number,
      showEditModal: !this.state.showEditModal
    });
    console.log(this.state.showEditModal);
  };

  startTimer = () => {
    setInterval(() => {
      if (this.state.displayTimer) {
        let minutes = parseInt(this.state.duration / 60);
        let seconds = this.state.duration - minutes * 60;
        if (seconds >= 10) {
          this.setState({
            timerMessage: minutes + ":" + seconds
          });
        } else if (seconds < 10) {
          this.setState({
            timerMessage: minutes + ":0" + seconds
          });
        }
        this.setState({
          duration: this.state.duration + 1
        });
        if (this.state.timers.includes(this.state.duration - 1)) {
          document.getElementById("audio").play();
        }
      } else {
        this.setState({
          duration: 0
        });
      }
    }, 1000);
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

  toggleTimer = name => {
    if (name === "closed") {
      this.setState({
        timerClass: "animated slideOutDown faster "
      });
      setTimeout(() => {
        this.setState({
          duration: 1,
          displayTimer: false
        });
      }, 500);
    } else if (name === "active") {
      this.setState({
        timerMessage: "0:00",
        timerClass: "animated slideInUp faster ",
        displayTimer: true,
        duration: 1
      });
    }
  };

  toggleTimerFromNavbar = () => {
    if (this.state.displayTimer) {
      this.setState({
        timerClass: "animated slideOutDown faster "
      });
      setTimeout(() => {
        this.setState({
          duration: 1,
          displayTimer: false
        });
      }, 500);
    } else {
      this.setState({
        timerClass: "animated slideInUp faster ",
        displayTimer: true,
        duration: 1
      });
    }
  };

  closeEditModal = () => {
    this.setState({
      displayEditModal: null
    });
  };

  toggleEditModal = properties => {
    if (this.state.displayEditModal) {
      this.setState({
        displayEditModal: null
      });
    } else {
      console.log("function toggleEditModal worked");
      this.setState({
        displayEditModal: (
          <EditExercise
            key={properties.key}
            exercisesState={properties.exercisesState}
            workoutNumber={properties.workoutNumber}
            exerciseNumber={properties.exerciseNumber}
            closeModal={this.closeEditModal}
            exerciseName={properties.exerciseName}
            sets={properties.sets}
            reps={properties.reps}
            weight={properties.weight}
          />
        )
      });
    }
  };

  toggleEditTimersModal = () => {
    if (this.state.displayEditTimersModal) {
      this.setState({
        displayEditTimersModal: null,
        timers: this.props.timers
      });
      this.toggleSidenav();
    } else {
      this.toggleSidenav();
      this.setState({
        displayEditTimersModal: (
          <EditTimers closeModal={this.toggleEditTimersModal} />
        ),
        timers: this.props.timers
      });
    }
  };

  toggleResetPasswordModal = () => {
    if (this.state.displayResetPasswordModal) {
      this.setState({
        displayResetPasswordModal: null
      });
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
      displayResetPasswordModal: null
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

  render() {
    return (
      <div style={this.state.addedMargin} className={classes.mainDiv}>
        <NavBar
          toggleSidenav={this.toggleSidenav}
          location="exercises"
          exercises={this.state.exercises}
          toggleTimer={this.toggleTimerFromNavbar}
          workoutNumber={this.state.number}
        />
        {this.state.displayEditModal}
        {this.state.displayEditTimersModal}
        {this.state.displayResetPasswordModal}
        {this.state.displayResetEmailModal}
        {this.state.displayDeleteAccountModal}
        <Sidenav
          styles={this.state.sidenavStyles}
          toggleModal={this.toggleEditTimersModal}
          toggleResetPasswordModal={this.toggleResetPasswordModal}
          toggleResetEmailModal={this.toggleResetEmailModal}
          toggleDeleteAccountModal={this.toggleDeleteAccountModal}
          displayEditTimerModal={true}
        />
        <div className={classes.exerciseCardsDiv}>
          {this.state.exercises.map(ex => {
            return (
              <ExerciseCard
                key={ex.exercise.exerciseName + ex.exercise.exerciseNumber}
                exerciseName={ex.exercise.exerciseName}
                exercisesState={this.state.exercises}
                exerciseNumber={ex.exercise.exerciseNumber}
                sets={ex.exercise.sets}
                reps={ex.exercise.reps}
                weight={ex.exercise.weight}
                workoutNumber={this.state.number}
                toggleTimer={this.toggleTimer}
                toggleEditModal={() =>
                  this.toggleEditModal({
                    key: ex.exercise.exerciseName + ex.exercise.exerciseNumber,
                    exerciseName: ex.exercise.exerciseName,
                    exercisesState: this.state.exercises,
                    exerciseNumber: ex.exercise.exerciseNumber,
                    sets: ex.exercise.sets,
                    reps: ex.exercise.reps,
                    weight: ex.exercise.weight,
                    workoutNumber: this.state.number,
                    closeModal: this.closeEditModal
                  })
                }
              />
            );
          })}
          {this.state.displayTimer ? (
            <div className={this.state.timerClass + classes.timerContainer}>
              <Timer
                timerClass={this.state.timerClass}
                timerMessage={this.state.timerMessage}
              />
            </div>
          ) : null}
        </div>
        <audio>
          <source src={"../../assets/bellNotification.mp3"} />
        </audio>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    exercises: state.exercises,
    number: state.number,
    timers: state.timers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getExercisesToRedux: (exercises, number, timers) =>
      dispatch(actionTypes.getExercises(exercises, number, timers))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exercises);
