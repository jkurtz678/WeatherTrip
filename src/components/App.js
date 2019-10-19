import React from "react";
import "./App.scss";
import axios from "axios";
import SearchForm from "./SearchForm";
import LocationContainer from "./LocationContainer";
import posed from "react-pose";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const ErrorMessage = posed.div({
	visible: { opacity: 1 },
	hidden: { opacity: 0 }
});

class App extends React.Component {
	state = {
		routePoints: [],
		showLocations: false,
		showError: false,
		loading: false
	};

	getTrip = async geoPair => {
		const cityResponse = await axios.get("/trip/" + geoPair);
		//const response = await axios.get("/test/" + start);
		console.log(cityResponse);
	};

	startBackground = () => {
		this.refs.bgVid.play();
	};

	onSearchSubmit = async (start, end) => {
		console.log("sending location request...");
		this.startBackground();
		this.setState({
			showLocations: false,
			showError: false,
			loading: true
		});
		//const path = "/location/" + start;
		//console.log(path);
		//console.log("end:", end);
		try {
			const response = await axios.all([
				axios.get(/location/ + start),
				axios.get(/location/ + end)
			]);

			console.log("REACT: location response:", response);
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
			this.setState({
				routePoints: cityResponse.data,
				showLocations: true,
				showError: false,
				loading: false
			});
		} catch {
			console.log("REACT ERROR");
			this.setState({
				showError: true,
				showLocations: false,
				loading: false
			});
		}
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
			<div className="page-container">
				<div className="video-background">
					<div className="video-foreground">
						<video ref="bgVid" className="video-iframe">
							<source src="./asphalt.mp4" type="video/mp4" />
							Your browser does not support the video tag.
						</video>
					</div>
				</div>
				<div className="app-container">
					<div className="left-container">
						<div className="title-container">
							<h1>WeatherTrip</h1>
							<h3>Weather conditions for the road ahead</h3>
						</div>
						<SearchForm onFormSubmit={this.onSearchSubmit} />
						{/*<button onClick={this.onClickTwo}>Test</button>*/}
						<ErrorMessage
							className="error"
							pose={this.state.showError ? "visible" : "hidden"}
						>
							Invalid route locations!
						</ErrorMessage>
						<div className={ "progress-container " + (this.state.loading ? "" : "hidden")}>
							<Loader
								type="Puff"
								color="white"
								height={100}
								width={100}
							/>
							<h3>Building route</h3>
							<h3>Should take 8-15 seconds</h3>
						</div>
					</div>
					<div className="route-container">
						<LocationContainer
							locations={this.state.routePoints}
							isVisible={this.state.showLocations}
						/>
					</div>
					<div className="footer">
						© Jackson Kurtz. All rights reserved. Powered by
						<a href="https://developer.tomtom.com" target="_blank">
							TomTom
						</a>{" "}
						and
						<a href="https://developer.tomtom.com" target="_blank">
							{" "}
							Darksky
						</a>
					</div>
				</div>
			</div>
		);
	}
}
export default App;
