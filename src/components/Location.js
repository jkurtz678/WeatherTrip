import React from "react";
import "./Location.scss";

const imgPath = process.env.PUBLIC_URL + "/assets/";

const imageKey = {
	"clear-day": "clear-day.jpeg",
	"clear-night": "clear-night.jpg",
	"partly-cloudy-day": "partly-cloudy-day.jpg",
	"partly-cloudy-night": "partly-cloudy-night.jpg",
	"cloudy": "cloudy.jpg",
	rain: "rain.jpg",
	snow: "snow.jpg",
	sleet: "snow.jpg",
	fog: "fog.jpg"
};

const Location = location => {
	console.log(location.location);

	const locationStyle = {
		//width: "100%",
		//height: "auto",
		backgroundSize: "110%",
		backgroundImage: `url(${imgPath}${imageKey[location.location.icon] ||
			"clear.jpeg"})`
	};

	return (
		<div className="row-container">
			<h2 className="distance-label">{location.location.distance} mi</h2>
			<div className="node" style={locationStyle}>
				<div className="node-container">
					<h4 className="node-item">
						{location.location.city +
							", " +
							location.location.state}
					</h4>
					<h2 className="node-item">{location.location.temp}°</h2>
					<h4 className="node-item">{location.location.summary}</h4>
				</div>
			</div>
			<div className="time-node">
				<div className="time-container">
					<h4 className="node-item">Estimated time</h4>
					<h3 className="node-item">{location.location.time}</h3>
				</div>
			</div>
		</div>
	);
};
export default Location;
