import React from "react";
import "./Location.scss";

const Location = location => {
	console.log(location.location);
	return (
		<div className="row-container">
			<h2 className="distance-label"> 50mi </h2>
			<div className="node">
				<div className="node-container">
					<h4 className="node-item">
						{location.location.city +
							", " +
							location.location.state}
					</h4>
					<h2 className="node-item">77°</h2>
					<h4 className="node-item">Sunny</h4>
				</div>
			</div>
			<div className="time-node">
				<div className="time-container">
					<h4 className="node-item">Estimated time</h4>
					<h3 className="node-item">3:30pm</h3>
				</div>
			</div>
		</div>
	);
};
export default Location;
