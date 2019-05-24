import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import store from "../store";
import { Provider } from "react-redux";
import Home from "./components/Home";

class App extends Component {
	render() {
		return (
			<Provider store={store()}>
				<View style={styles.container}>
					<Text style={styles.welcome}>Hello</Text>
					<Home />
				</View>
			</Provider>    
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	}
});

export default App;