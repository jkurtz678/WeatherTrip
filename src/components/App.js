import React from "react";
import './App.css';
import axios from "axios";
import SearchForm from "./SearchForm";
import LocationContainer from "./LocationContainer";

class App extends React.Component {
	state = { routePoints: [] };

	getTrip = async geoPair => {
		const cityResponse = await axios.get("/trip/" + geoPair);
		//const response = await axios.get("/test/" + start);
		console.log(cityResponse);
	};

	onSearchSubmit = async (start, end) => {
		//const path = "/location/" + start;
		//console.log(path);
		//console.log("end:", end);
		const response = await axios.all([
			axios.get(/location/ + start),
			axios.get(/location/ + end)
		]);
		console.log(response);
		const geoPair =
			response[0].data.lat +
			"," +
			response[0].data.lon +
			":" +
			response[1].data.lat +
			"," +
			response[1].data.lon;

		const cityResponse = await axios.get("/trip/" + geoPair);
		console.log(cityResponse);

		//console.log(geoPair);
		//this.getTrip(geoPair)
		//this.setState({ routePoints: response.data.items });
		//console.log(this.routePoints);
		this.setState({ routePoints: cityResponse.data });
	};

	onClickTwo = async () => {
		const response = await axios.get("/test/barstow");
		console.log(response);
		//this.setState({ routePoints: response.data });
		//console.log(this.routePoints);
	};

	render() {
		return (
			<div className="app-container">
				<div>
					<h1>WeatherTrip</h1>
					<h3>Weather conditions for the road ahead</h3>
					<SearchForm onFormSubmit={this.onSearchSubmit} />
				</div>
				{/*<button onClick={this.onClickTwo}>/test/cities</button>}*/}
				<LocationContainer locations={this.state.routePoints} />
			</div>
		);
	}
}
export default App;
