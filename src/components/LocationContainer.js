import React from "react";
import Location from "./Location";
import "./LocationContainer.scss";
import posed from "react-pose";

const FadeDiv = posed.div({
	visible: { opacity: 1 },
	hidden: { opacity: 0 }
});

class LocationContainer extends React.Component {
	render() {
		console.log("show location prop:", this.props.isVisible);
		const locationList = this.props.locations.map(location => {
			return <Location key={location.city} location={location} />;
		});
		return (
			<FadeDiv
				className="fade-div"
				pose={this.props.isVisible ? "visible" : "hidden"}
			>
				{locationList}
			</FadeDiv>
		);
	}
}

export default LocationContainer;
