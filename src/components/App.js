import React from "react";
import "./App.scss";
import axios from "axios";
import SearchForm from "./SearchForm";
import LocationContainer from "./LocationContainer";

class App extends React.Component {
	state = { routePoints: [], showLocations: false };

	getTrip = async geoPair => {
		const cityResponse = await axios.get("/trip/" + geoPair);
		//const response = await axios.get("/test/" + start);
		console.log(cityResponse);
	};

	startBackground = () => {
		this.refs.bgVid.play();
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
		this.setState({ routePoints: cityResponse.data, showLocations: true });
		this.startBackground();
	};

	onClickTwo = async () => {
		const response = await axios.get("/test/cities");
		console.log(response);
		this.setState({ routePoints: response.data, showLocations: true });
		//console.log(this.routePoints);
		this.startBackground();
	};

	render() {
		return (
			<div className="app-container">
				<div className="video-background">
					<div className="video-foreground">
						<video ref="bgVid" className="video-iframe">
							<source src="./asphalt.mp4" type="video/mp4" />
							Your browser does not support the video tag.
						</video>
					</div>
				</div>
				<div className="title-container">
					<h1>WeatherTrip</h1>
					<h3>Weather conditions for the road ahead</h3>
					<SearchForm onFormSubmit={this.onSearchSubmit} />
					<button onClick={this.onClickTwo}>Test</button>
				</div>
				<div className="route-container">
					<LocationContainer
						locations={this.state.routePoints}
						isVisible={this.state.showLocations}
					/>
				</div>
			</div>
		);
	}
}
export default App;
