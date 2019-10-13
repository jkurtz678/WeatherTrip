import React from "react";
import "./App.scss";
import axios from "axios";
import SearchForm from "./SearchForm";
import LocationContainer from "./LocationContainer";
import YouTube from 'react-youtube';

function _onReady(event) {
  // access to player in all event handlers via event.target
  // event.target.mute();
  //console.log("asdfasdf");
}

function _onEnd(event) {
  event.target.playVideo();
}

const videoOptions = {
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0
    	}
  	};

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
		const response = await axios.get("/test/cities");
		console.log(response);
		this.setState({ routePoints: response.data });
		//console.log(this.routePoints);
	};

	

	render() {
		return (
			<div className="app-container">
				<div className="video-background">
					<div className="video-foreground">
						<YouTube
							videoId="NIIQsm3T2VE"
							opts={videoOptions}
							className="video-iframe"
							onReady={this._onReady}
							onEnd={e=>e.target.playVideo()}
						/>
					</div>
				</div>
				<div className="title-container">
					<h1 >WeatherTrip</h1>
					<h3>Weather conditions for the road ahead</h3>
					<SearchForm onFormSubmit={this.onSearchSubmit} />
					<button onClick={this.onClickTwo}>Test</button>
				</div>
				<div className="route-container">
					<LocationContainer locations={this.state.routePoints} />
				</div>
			</div>
		);
	}
}
export default App;
