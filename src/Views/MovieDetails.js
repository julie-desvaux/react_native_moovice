import React from "react";
import { Text, View } from "react-native";

export default function MovieDetails(props) {
	console.log({ props });
	console.log(props.route.params.id);
	return (
		<View>
			<Text>{props.route.params.item.title}</Text>
		</View>
	);
}
