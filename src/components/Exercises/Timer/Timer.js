import React, { Component } from 'react';
import classes from './Timer.module.css';


class Timer extends Component {
state = {
    visible: false,
    minutes: null,
    seconds: null,
    timerMessage: null,
    duration: 0
}
componentDidMount = () => {
    this.setState({
        visible: this.props.visible
    })
    this.startTimer();    
}

startTimer = () => {
        this.setState({
            duration: 0 
        })
        setInterval(function () {
            if (this.props.visible) {
            console.log(this.state.duration);
            let minutes = parseInt(this.state.duration / 60);
            let seconds = this.state.duration - minutes*60;
            if (seconds >= 10) {
                this.setState({
                    timerMessage: minutes + ":" + seconds
                })
            } else if (seconds < 10) {
               this.setState({
                    timerMessage: minutes + ":0" + seconds  
               }) 
            }
            this.setState({
               duration: this.state.duration + 1
            })
            if (this.state.duration == 30) {
                console.log("loop finished");
            }
        } else {
            this.setState({
                duration: 0
            })
            console.log(this.state.duration);
        }
    }.bind(this), 1000);   
}

render() {
if (this.props.visible) {
    return (
        <div className={classes.timerDiv}>
            <h3>{this.state.timerMessage}</h3>
        </div>
     )
   } else {
      return null;
  }
 }
}

export default Timer;