import React from "react";
import Location from "./Location";
import './LocationContainer.css';

class LocationContainer extends React.Component {
	render() {
		const locationList = this.props.locations.map(location => {
			return (
				<Location
					key={location.city}
					location={location}
				/>
			);
		});
		return <div>{locationList}</div>;
	}
}

export default LocationContainer;
