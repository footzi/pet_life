import Home from './components/Home';
import {Provider} from 'react-redux';
import store from '../store';
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        justifyContent : 'center',
        alignItems     : 'center',
        backgroundColor: '#F5FCFF'
    }
});

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

export default App;
