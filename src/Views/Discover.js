import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Image, Button, TouchableHighlight } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import moment from "moment";
import axios from "axios";
import Config from "../../Config";

export default function Dicsover({ navigation }) {
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
		return (
			<View style={styles.moovieContainer}>
				<TouchableHighlight onPress={() => navigation.navigate("MovieDetails", { item })}>
					<Text style={styles.titleMoovie}>{item.title}</Text>
				</TouchableHighlight>
				<TouchableHighlight onPress={() => navigation.navigate("MovieDetails", { item })}>
					<Image
						source={{
							uri: `${Config.IMG_ROOT}${item.poster_path}`,
						}}
						style={styles.poster}
						onPress=""
					/>
				</TouchableHighlight>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Discover Moovice</Text>
			<Button title="Movie" onPress={() => navigation.navigate("MovieDetails", { id: "123" })} />
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
		fontWeight: "bold",
		textAlign: "center",
		marginVertical: 8,
	},
	poster: {
		height: 450,
		width: 300,
	},
});
