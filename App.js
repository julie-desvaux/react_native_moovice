import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Discover from "./src/Views/Discover";
import MovieDetails from "./src/Views/MovieDetails";

const Stack = createStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Discover">
				<Stack.Screen name="Discover" component={Discover} />
				<Stack.Screen name="MovieDetails" component={MovieDetails} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
