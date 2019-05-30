import React, { Component } from "react";
import classes from "./EditTimers.module.sass";

class EditTimers extends Component {
  state = {
    minutes: NaN,
    minutesClass: classes.inputField,
    seconds: NaN,
    secondsClass: classes.inputField,
    timers: [],
    class: ""
  };

  componentDidMount = () => {};

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
            <h5 className={classes.modalHeader}>Add workout</h5>
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
                className={this.state.minutesClass}
                type="number"
                placeholder="Minutes"
              />
              <input
                className={this.state.secondsClass}
                type="number"
                placeholder="Seconds"
              />
              <div className={classes.addExerciseButtonContainer}>
                <button className={classes.addExerciseButton}>
                  <span className={classes.addExerciseButtonText}>
                    Add timer
                  </span>
                  <i className={"material-icons " + classes.plusIcon}>add</i>
                </button>
              </div>
              {/* <div className={this.state.exerciseListClass}>
                {this.state.exercises.map(ex => {
                  return (
                    <span
                      number={ex.exercise.exerciseNumber}
                      className={classes.exerciseListSpan}
                      key={
                        ex.exercise.exerciseName +
                        ex.exercise.exerciseNumber +
                        ex.exercise.weight
                      }
                    >
                      Exercise {ex.exercise.exerciseNumber} -{" "}
                      {ex.exercise.exerciseName} {ex.exercise.sets} sets{" "}
                      {ex.exercise.reps} reps with {ex.exercise.weight} kg
                      <i
                        onClick={() =>
                          this.removeExercise(ex.exercise.exerciseNumber - 1)
                        }
                        className={"material-icons " + classes.iconSpan}
                      >
                        close
                      </i>
                    </span>
                  );
                })}
              </div> */}
            </div>
          </div>
          <div className={classes.bottomModalDiv}>
            {this.state.loader}
            <button
              className={classes.submitButton + " " + classes.buttonAnimation}
            >
              <span className={classes.submitSpan}>Submit Workout</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditTimers;
