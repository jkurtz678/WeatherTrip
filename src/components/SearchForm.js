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
				<h3>Enter your trip:</h3>
				<form onSubmit={this.onFormSubmit}>
					<div className="input-container">
						<div>
							<h4>Start:</h4>
							<h4>Destination:</h4>
						</div>
						<div>
							<input
								type="text"
								value={this.state.start}
								onChange={this.onStartChange}
							/>
							<br />
							<input
								type="text"
								value={this.state.end}
								onChange={this.onEndChange}
							/>
						</div>
					</div>
					<input type="submit" value="search" />
				</form>
			</div>
		);
	}
}

export default SearchBar;
