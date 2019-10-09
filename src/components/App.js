import React from "react";
import axios from "axios";
import tomtom from "../apis/tomtom";

class App extends React.Component {
	state = { routePoints: [] };

	onClickOne = async () => {
		const response = await axios.get("/trip/34.05224,-118.24334:35.28262,-120.66001");
		console.log(response);
		//this.setState({ routePoints: response.data.items });
		//console.log(this.routePoints);
	};

	onClickTwo = async () => {
		const response = await axios.get("/test/cities");
		console.log(response);
		//this.setState({ routePoints: response.data.items });
		//console.log(this.routePoints);
	};

	render() {
		return (
			<div>
				<button onClick={this.onClickOne}>/trip/:location</button>
				<button onClick={this.onClickTwo}>/test/cities</button>

			</div>
		);
	}
}
export default App;
