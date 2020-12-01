import React, { Component } from "react";


class Countdown extends Component {


	state = {
		timerOn: false,
		timerStart: 0,
		timerTime: 0
	};

	startTime = () => {
		this.setState({
			timerOn: true,
			timerTime: this.state.timerTime,
			timerStart: this.state.timerTime
		});

		this.timer = setInterval(() => {
    			const newTime = this.state.timerTime - 10;
    			if (newTime >= 0) {
      				this.setState({
        				timerTime: newTime
      			});
    			} else {
      				clearInterval(this.timer);
      				this.setState({ timerOn: false });
      				alert("Countdown ended");
    			}
  		}, 10);
	};




	stopTimer = () => {
		clearInterval(this.timer);
		this.setState({ timerOn: false });
	};




	adjustTimer = input => {
	  const { timerTime, timerOn } = this.state;
	  const max = 216000000;
	  if (!timerOn) {
	    if (input === "incHours" && timerTime + 3600000 < max) {
	      this.setState({ timerTime: timerTime + 3600000 });
	    } else if (input === "decHours" && timerTime - 3600000 >= 0) {
	      this.setState({ timerTime: timerTime - 3600000 });
	    } else if (input === "incMinutes" && timerTime + 60000 < max) {
	      this.setState({ timerTime: timerTime + 60000 });
	    } else if (input === "decMinutes" && timerTime - 60000 >= 0) {
	      this.setState({ timerTime: timerTime - 60000 });
	    } else if (input === "incSeconds" && timerTime + 1000 < max) {
	      this.setState({ timerTime: timerTime + 1000 });
	    } else if (input === "decSeconds" && timerTime - 1000 >= 0) {
	      this.setState({ timerTime: timerTime - 1000 });
	    }
	  }
	};

	const { timerTime, timerStart, timerOn } = this.state;
	let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
	let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
	let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

	render() {
		return (
			<div className="Countdown">
				<div> className="Countdown-time">
					{hours} : {minutes} : {seconds}
				</div>
			</div>
		);
	}
}

export default Countdown:
