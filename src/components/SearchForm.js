import React from "react";
import "./SearchForm.scss";

class SearchBar extends React.Component {
	state = { start: "", end: "" };

	onStartChange = event => {
		this.setState({ start: event.target.value });
	};

	onEndChange = event => {
		this.setState({ end: event.target.value });
	};

	onFormSubmit = event => {
		event.preventDefault();
		/*const search = this.state.start + ":" + this.state.end;
		console.log("Search term:", search);
		if( search.includes(' ')) {
			console.log("invalid search!")
		} else {
			this.props.onFormSubmit(search);
		}*/
		this.props.onFormSubmit(this.state.start, this.state.end);
		//this.props.onFormSubmit();
	};

	render() {
		return (
			<div className="search-container">
				<h3>Enter your trip (must be US cities):</h3>
				<form onSubmit={this.onFormSubmit}>
					<div className="input-container">
						<div>
							<h4>Start:</h4>
							<h4>Destination:</h4>
						</div>
						<div>
							<input
								className="location-search"
								type="text"
								value={this.state.start}
								onChange={this.onStartChange}
								placeholder="city, state"
							/>
							<br />
							<input
								className="location-search"
								type="text"
								value={this.state.end}
								onChange={this.onEndChange}
								placeholder="city, state"
							/>
						</div>
					</div>
					<input type="submit" value="Build route" className="search-button"/>
				</form>
			</div>
		);
	}
}

export default SearchBar;
