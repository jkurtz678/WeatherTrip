import React from "react";
import axios from "axios";
//import tomtom from "../apis/tomtom";
import SearchForm from "./SearchForm"
import LocationContainer from "./LocationContainer";

class App extends React.Component {
	state = { routePoints: [] };

	onSearchSubmit = async term => {
		console.log("term on search term:", term);
		const response = await axios.get("/trip/" + term);
		console.log(response);
		//this.setState({ routePoints: response.data.items });
		//console.log(this.routePoints);
		this.setState({routePoints: response.data});
	}

	onClickTwo = async () => {
		const response = await axios.get("/test/cities");
		console.log(response);
		this.setState({ routePoints: response.data });
		//console.log(this.routePoints);
	};

	render() {
		return (
			<div>
				<SearchForm onFormSubmit={this.onSearchSubmit} />
				<button onClick={this.onClickTwo}>/test/cities</button>
				<LocationContainer locations={this.state.routePoints}/>
			</div>
		);
	}
}
export default App;