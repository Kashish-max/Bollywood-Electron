import React, { Component } from 'react';
import './timer.scss'

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timerValue: 60,
            timerClass: "",
         }
    }

    timerfunc;

    componentDidMount() {
        setTimeout(() => {
            this.setState({ timerClass: "bar-timer init" });
            this.timerfunc = setInterval(() => {
                this.setState({ timerValue: this.state.timerValue - 1 })
                if (this.state.timerValue == 0) {
                    clearInterval(this.timerfunc);            
                }
            }, 100);
        }, 500);
        
    }
    componentWillMount() {
        this.setState({timerClass: "bar-timer"})
    }
    componentWillUnmount() {
        clearInterval(this.timerfunc);
        this.setState({timerClass: "bar-timer"})
    }

    render() { 
        return (
            <div className="timer">
                <div className={this.state.timerClass}><p>Timer</p></div>
                <div className="number-timer"><p>{this.state.timerValue}</p></div>
            </div>    
        );
    }
}
 
export default Timer;