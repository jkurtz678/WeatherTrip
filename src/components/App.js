import React from "react";
import axios from "axios";
import tomtom from "../apis/tomtom";

const KEY = "X29HwNj6VBmCD2KXJXXlVMi5QUxQA10g";

class App extends React.Component {
	state = { routePoints: [], map: "" };

	reverseGeocode = point => {
		const loc_string = point[0] + "," + point[1];
		return tomtom.get("/search/2/reverseGeocode/" + loc_string + ".json", {
			params: {
				key: KEY
			}
		});
	};
	reverseGeocodePoints = async points => {

		console.log("num points: " + points.length);
		const requests = [];
		let batch = [];
		for (let i = 0; i < points.length; i++) {
			const point = points[i];
			batch.push( () => this.reverseGeocode(points[i]));
			if ((i + 1) % 5 === 0) {
				requests.push(batch);
				batch = [];
			}
		} 
		console.log(requests)
		const results = await axios.all(requests[0].map((func)=>func()));
		console.log(results);

		let results2 = [];
		setTimeout(async () => {
			results2 = await axios.all(requests[1].map((func)=>func()));
			console.log(results2);
		}, 1000);
		let results3 = [];
		setTimeout(async () => {
			results3 = await axios.all(requests[2].map((func)=>func()));
			console.log(results3);
			const joined_results = results.concat(results2, results3);
			console.log(joined_results);
			const cities = joined_results.map((res) => res.data.addresses[0].address.countryTertiarySubdivision);
			console.log(cities);
		}, 2000);
		/*const results1 = await axios.all([
			this.reverseGeocode(points[0]),
			this.reverseGeocode(points[1]),
			this.reverseGeocode(points[2]),
			this.reverseGeocode(points[3]),
			this.reverseGeocode(points[4])
		]);
		console.log(results1);
		const results2 = [];*/
		

		//const requests = [[],[],[];
		/*const requests = [];
		let batch = [];
		for (let i = 0; i < points.length; i++) {
			const point = points[i];
			const loc_string = point[0] + "," + point[1];
			batch.push( () => 
				tomtom.get("/search/2/reverseGeocode/" + loc_string + ".json", {
					params: {
						key: KEY
					}
				}
				)
			);

			if ((i + 1) % 5 === 0) {
				requests.push(batch);
				batch = [];
			}
		}
		console.log(requests);
		const responses_1 = await requests[0][0]();
		//const responses_1 = await axios.all(requests[0]);
		console.log("responses: " + responses_1);
		*/
		//const responses_2 = await axios.all(requests[1]);
		//const responses_3 = await axios.all(requests[2]);

		//console.log(responses_1);
		//console.log([responses_1, responses_2, responses_3]);
		/*const cities = responses_1.map(
			res => res.data.addresses[0].address.countryTertiarySubdivision
		);
		console.log(cities);*/
	};

	onClickButton = async () => {
		console.log("button pressed...");
		const locations = "33.97389,-118.40637:35.28262,-120.66001";
		const response = await tomtom.get(
			"/routing/1/calculateRoute/" + locations + "/json",
			{
				params: {
					key: KEY
				}
			}
		);
		const markerOptions = {
			icon: window.tomtom.L.icon({
				iconUrl:
					process.env.PUBLIC_URL + "/sdk/images/circle-major.png",
				iconSize: [3, 5],
				iconAnchor: [15, 34]
			})
		};

		const points_list = response.data.routes[0].legs[0].points.map(pt =>
			Object.values(pt)
		);
		console.log("num route points: " + points_list.length);

		const numEntries = points_list.length;
		const routePoints = [];
		for (const [ind, point] of points_list.entries()) {
			if (ind % Math.floor(numEntries / 14) === 0) {
				/*const pair = [point["latitude"], point["longitude"]];
				console.log(pair);*/
				routePoints.push(Object.values(point));
				window.tomtom.L.marker(point, markerOptions).addTo(
					this.state.map
				);
			}
		}
		this.setState({ routePoints: routePoints });

		this.reverseGeocodePoints(this.state.routePoints);
	};

	componentDidMount() {
		const script = document.createElement("script");
		script.src = process.env.PUBLIC_URL + "/sdk/tomtom.min.js";
		document.body.appendChild(script);
		script.async = true;
		script.onload = () => {
			const map = window.tomtom.L.map("map", {
				source: "vector",
				key: "X29HwNj6VBmCD2KXJXXlVMi5QUxQA10g",
				center: [37.769167, -122.478468],
				basePath: "/sdk",
				zoom: 15
			});
			this.setState({ map: map });
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
