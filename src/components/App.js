import React from "react";
import tomtom from "../apis/tomtom";

class App extends React.Component {
	onClickButton = async () => {
		console.log("button pressed...");
		const locations = "34.05224,-118.24334:35.28262,-120.66001";
		const response = await tomtom.get(
			"/routing/1/calculateRoute/" + locations + "/json",
			{
				params: {
					key: "X29HwNj6VBmCD2KXJXXlVMi5QUxQA10g"
				}
			}
		);

		console.log(response);
	};

	componentDidMount() {
		const script = document.createElement("script");
		script.src = process.env.PUBLIC_URL + "/sdk/tomtom.min.js";
		document.body.appendChild(script);
		script.async = true;
		script.onload = function() {
			window.tomtom.L.map("map", {
				source: "vector",
				key: "X29HwNj6VBmCD2KXJXXlVMi5QUxQA10g",
				center: [37.769167, -122.478468],
				basePath: "/sdk",
				zoom: 15
			});
		};
	}

	render() {
		return (
			<div>
				<button onClick={this.onClickButton}>make api request</button>
				<div id="map"></div>
			</div>
		);
	}
}
export default App;
