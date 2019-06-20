import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import About from './pages/about';
import Home from './pages/home';
import store from '../store';

const RootStack = createStackNavigator({
  Home, About,
}, {
  initialRouteName: 'Home',
});

const AppContainer = createAppContainer(RootStack);

class App extends Component {
  render() {
    return (
      <Provider store={store()}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
