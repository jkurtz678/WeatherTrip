import React from "react";

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
			<div>
				<form onSubmit={this.onFormSubmit}>
					<div>
						<label>Start:</label>
						<input
							type="text"
							value={this.state.start}
							onChange={this.onStartChange}
						/>
						<label>Destination:</label>
						<input
							type="text"
							value={this.state.end}
							onChange={this.onEndChange}
						/>
						<input type="submit" value="search"/>
					</div>
				</form>
			</div>
		);
	}
}

export default SearchBar;