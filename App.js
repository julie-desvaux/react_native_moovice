import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import moment from "moment";
import axios from "axios";
import Config from "./Config";

export default function App() {
	const [moovies, setMoovies] = useState([]);

	useEffect(() => {
		async function fetchDataDiscover() {
			const TODAY = moment().format("YYYY-MM-DD");
			const NEXT_WEEK = moment().add(7, "days").format("YYYY-MM-DD");
			const url = `${Config.API_ROOT}discover/movie?primary_release_date.gte=${TODAY}&primary_release_date.lte=${NEXT_WEEK}&sort_by=popularity.desc&include_adult=false&include_video=false&api_key=${Config.API_KEY}`;
			await axios.get(url).then((response) => {
				setMoovies(response.data.results);
			});
		}
		fetchDataDiscover();
	}, []);

	const renderItem = ({ item }) => {
		console.log(`${Config.IMG_ROOT}${item.poster_path}`);
		return (
			<View style={styles.moovieContainer}>
				<Text style={styles.titleMoovie}>{item.title}</Text>
				<Image
					source={{
						uri: `${Config.IMG_ROOT}${item.poster_path}`,
					}}
					style={styles.poster}
				/>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Discover Moovice</Text>
			<FlatList data={moovies} renderItem={renderItem} keyExtractor={(moovies) => moovies.id} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#f1f1f1",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 35,
		fontWeight: "bold",
	},
	moovieContainer: {
		marginVertical: 20,
	},
	titleMoovie: {
		fontSize: 15,
		textAlign: "center",
		marginVertical: 8,
	},
	poster: {
		height: 450,
		width: 300,
	},
});
