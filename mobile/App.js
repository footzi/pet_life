import About from './pages/about';
import Home from './pages/home';
import {Provider} from 'react-redux';
import store from '../store';
import React, {Component} from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';

const RootStack = createStackNavigator({
    Home, About
}, {
    initialRouteName: 'Home'
});

const AppContainer = createAppContainer(RootStack);

class App extends Component {
    render() {
        return (
            <Provider store={store()}>
                <AppContainer/>
            </Provider>
        );
    }
}

export default App;
