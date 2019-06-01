import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import classes from "./EditTimers.module.sass";

class EditTimers extends Component {
  state = {
    exercises: [],
    number: null,
    timers: [],
    timerMessages: [],
    minutes: NaN,
    minutesClass: classes.inputField,
    minutesError: null,
    seconds: NaN,
    secondsClass: classes.inputField,
    secondsError: null,
    class: ""
  };

  componentDidMount = async () => {
    await this.setState({
      exercises: [...this.props.exercises],
      number: this.props.number,
      timers: [...this.props.timers]
    });
    console.log(this.props.exercises, this.props.number, this.props.timers);
    this.createTimerMessages();
  };

  createTimerMessages = () => {
    let timerMessagesCopy = [];
    this.state.timers.map((timer, index) => {
      let minutes = parseInt(timer / 60);
      let seconds = timer - minutes * 60;
      let timerMessage = null;
      if (seconds >= 10) {
        timerMessage = minutes + ":" + seconds;
      } else if (seconds < 10) {
        timerMessage = minutes + ":0" + seconds;
      }
      console.log(this.state.timerMessages);
      timerMessagesCopy.push(timerMessage);
      return timerMessagesCopy;
    });
    this.setState({
      timerMessages: timerMessagesCopy
    });
  };

  updateMinutesState = e => {
    this.setState({
      minutes: parseInt(e.target.value.trim())
    });
  };

  updateSecondsState = e => {
    this.setState({
      seconds: parseInt(e.target.value.trim())
    });
  };

  checkMinutesError = () => {
    if (!this.state.minutes && !this.state.seconds) {
      this.setState({
        minutesClass: classes.inputFieldError,
        minutesError: (
          <p className={classes.errorMessage}>
            You can't leave both fields empty
          </p>
        )
      });
    }
    if (this.state.minutes > 99) {
      this.setState({
        minutesClass: classes.inputFieldError,
        minutesError: (
          <p className={classes.errorMessage}>
            You can't set this field's value to more than 99 minutes
          </p>
        )
      });
    }
    if (
      this.state.minutes &&
      this.state.minutes <= 99 &&
      this.state.secondsError
    ) {
      this.setState({
        minutesClass: classes.inputFieldSuccess,
        minutesError: null
      });
    }
  };

  checkSecondsError = () => {
    if (!this.state.seconds && !this.state.minutes) {
      this.setState({
        secondsClass: classes.inputFieldError,
        secondsError: (
          <p className={classes.errorMessage}>
            You can't leave both fields empty
          </p>
        )
      });
    }
    if (this.state.seconds > 59) {
      this.setState({
        secondsClass: classes.inputFieldError,
        secondsError: (
          <p className={classes.errorMessage}>
            You can't set this field's value to more than 59 seconds
          </p>
        )
      });
    }
    if (this.state.seconds && this.state.seconds <= 59) {
      this.setState({
        secondsClass: classes.inputFieldSuccess,
        secondsError: null
      });
    }
  };

  removeTimer = number => {
    let timersCopy = this.state.timers;
    timersCopy.splice(number, 1);
    this.setState({
      timers: timersCopy
    });
    console.log(timersCopy);
    this.createTimerMessages();
  };

  closeModal = () => {
    this.setState({
      class: "animated fadeOutUp fast "
    });
    setTimeout(() => {
      this.props.closeModal();
    }, 700);
  };

  addTimer = async () => {
    console.log("function fworkeed");
    this.checkMinutesError();
    this.checkSecondsError();
    if (
      (this.state.minutes || this.state.seconds) &&
      (!this.state.minutes || this.state.minutes <= 99) &&
      (!this.state.seconds || this.state.seconds <= 59)
    ) {
      console.log(this.state.seconds);
      console.log(this.state.minutes);
      let timersArrayCopy = [...this.state.timers];
      console.log(timersArrayCopy);
      let timer = 0;
      if (this.state.minutes && this.state.seconds) {
        timer = this.state.minutes * 60 + this.state.seconds;
        timersArrayCopy.push(timer);
        await this.setState({
          timers: timersArrayCopy
        });
        console.log(timersArrayCopy);
      }
      if (this.state.minutes && !this.state.seconds) {
        console.log(this.state.minutes);
        timer = this.state.minutes * 60;
        timersArrayCopy.push(timer);
        await this.setState({
          timers: timersArrayCopy
        });
        console.log(timersArrayCopy);
      }
      if (this.state.seconds && !this.state.minutes) {
        timer = this.state.seconds;
        timersArrayCopy.push(timer);
        await this.setState({
          timers: timersArrayCopy
        });
        console.log(timersArrayCopy);
      }
      console.log("it reached here");
      console.log(this.state.timers);
      this.createTimerMessages();
      this.setState({
        seconds: NaN,
        minutes: NaN,
        secondsClass: classes.inputField,
        minutesClass: classes.inputField,
        secondsError: null,
        minutesError: null
      });
    } else {
      console.log("It didnt pass ");
    }
  };

  render() {
    return (
      <div className={this.state.class + classes.opacityLayerDiv}>
        <div className={"animated zoomIn faster " + classes.mainModalDiv}>
          <div className={classes.modalHeaderMainDiv}>
            <h5 className={classes.modalHeader}>Edit timers</h5>
            <i
              onClick={this.closeModal}
              className={"material-icons " + classes.closeIcon}
            >
              close
            </i>
          </div>
          <div className={classes.mainBodyDiv}>
            <div className={classes.modalBodyDiv}>
              <h5 className={classes.exercisesHeader}>Timers</h5>
              <input
                onChange={this.updateMinutesState}
                className={this.state.minutesClass}
                type="number"
                placeholder="Minutes"
                value={this.state.minutes}
              />
              {this.state.minutesError}
              <input
                onChange={this.updateSecondsState}
                className={this.state.secondsClass}
                type="number"
                placeholder="Seconds"
                value={this.state.seconds}
              />
              {this.state.secondsError}
              <div className={classes.addExerciseButtonContainer}>
                <button
                  onClick={this.addTimer}
                  className={classes.addExerciseButton}
                >
                  <span className={classes.addExerciseButtonText}>
                    Add timer
                  </span>
                  <i className={"material-icons " + classes.plusIcon}>add</i>
                </button>
              </div>
              <div className={this.state.exerciseListClass}>
                {this.state.timerMessages.map((timer, index) => {
                  return (
                    <span
                      number={index}
                      className={classes.exerciseListSpan}
                      key={timer + index}
                    >
                      {timer}
                      <i
                        onClick={() => this.removeTimer(index)}
                        className={"material-icons " + classes.iconSpan}
                      >
                        close
                      </i>
                    </span>
                  );
                })}
                {console.log(this.state.timerMessages)};
              </div>
            </div>
          </div>
          <div className={classes.bottomModalDiv}>
            {this.state.loader}
            <button
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
)(EditTimers);
