import React, { Component } from "react";
import classes from "./ExerciseSquare.module.sass";

class ExerciseSquare extends Component {
  state = {
    class: classes.exerciseCardSquare,
    textClass: classes.squareText
  };

  toggleSquare = () => {
    console.log(this.props.toggleTimer);
    if (this.state.class === classes.exerciseCardSquare) {
      this.setState({
        class: classes.exerciseClickedSquare,
        textClass: classes.clickedSquareText
      });
      this.props.toggleTimer("active");
    } else {
      this.setState({
        class: classes.exerciseCardSquare,
        textClass: classes.squareText
      });
      this.props.toggleTimer("closed");
    }
  };

  render() {
    return (
      <div
        onClick={this.toggleSquare}
        key={this.props.number + this.props.exerciseName + this.props.sets}
        className={"animated fadeIn " + this.state.class}
      >
        <p className={this.state.textClass}>{this.props.reps}</p>
      </div>
    );
  }
}

export default ExerciseSquare;
