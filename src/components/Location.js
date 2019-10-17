import React from "react";
import "./Location.scss";

const imgPath = process.env.PUBLIC_URL + "/assets/";

const imageKey = {
	"clear-day": "clear-day.jpeg",
	"clear-night": "clear-night.jpg",
	"partly-cloudy-day": "partly-cloudy-day.jpg",
	"partly-cloudy-night": "partly-cloudy-night.jpg",
	cloudy: "cloudy.jpg",
	rain: "rain.jpg",
	snow: "snow.jpg",
	sleet: "snow.jpg",
	fog: "fog.jpg"
};

const locationConfig = location => {
	return {
		start: {
			timeClass: "start",
			timeLabel: "Leaving time",
			nodeClass: "end",
			distanceLabel: <h3>Start</h3>
		},
		stop: {
			timeClass: "",
			timeLabel: "Estimated time",
			nodeClass: "",
			distanceLabel: <h3>{location.distance} mi</h3>
		},
		end: {
			timeClass: "end",
			timeLabel: "Estimated arrival",
			nodeClass: "end",
			distanceLabel: (
				<div>
					<h3>{location.distance} mi</h3>
					<h3>Destination</h3>
				</div>
			)
		}
	};
};

const Location = ({ location, nodeType }) => {
	console.log(location.location);
	const { timeClass, timeLabel, nodeClass, distanceLabel } = locationConfig(location)[
		nodeType
	];
	const locationStyle = {
		//width: "100%",
		//height: "auto",
		backgroundSize: "120%",
		backgroundImage: `url(${imgPath}${imageKey[location.icon] ||
			"clear.jpeg"})`
	};

	return (
		<div className="row-container">
			<div className={"distance-label " + nodeClass}>{distanceLabel}</div>
			<div className={"node " + nodeClass} style={locationStyle}>
				<div className="node-container">
					<h4 className="node-item">
						{location.city + ", " + location.state}
					</h4>
					<h2 className="node-item">{location.temp}°</h2>
					<h4 className="node-item">{location.summary}</h4>
				</div>
			</div>
			<div className={"time-node " + timeClass}>
				<div className="time-container">
					<h4 className="node-item">{timeLabel}</h4>
					<h3 className="node-item">{location.time}</h3>
				</div>
			</div>
		</div>
	);
};
export default Location;
