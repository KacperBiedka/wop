import React, { Component } from 'react';
import classes from './Timer.module.css';


class Timer extends Component {
state = {
    visible: false,
    timerMessage: null
}
componentDidMount = () => {
    this.setState({
        visible: this.props.visible
    })  
}

render() {
if (this.props.visible) {
    return (
        <div className={classes.timerDiv}>
            <h5 className={classes.timerMessage}>{this.props.timerMessage}</h5>
        </div>
     )
   } else {
      return null;
  }
 }
}

export default Timer;