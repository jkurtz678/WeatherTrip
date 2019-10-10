import React from "react";
import "./Location.css";

const Location = location => {
	console.log(location.location);
	return (
		<div className="row-container">
			<div className="node">
				<h4>
					{location.location.city + ", " + location.location.state}
				</h4>
			</div>
		</div>
	);
};
export default Location;
