import { Provider } from 'react-redux';
import React from 'react';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Notification from 'components/Notification';
import store from 'store';
import Index from './pages/home';
import About from './pages/about';

const TabNavigator = createBottomTabNavigator({
  Home: { screen: Index },
  About: { screen: About }
});

const AppContainer = createAppContainer(TabNavigator);

const App = () => (
  <Provider store={store()}>
    <AppContainer />
    <Notification />
  </Provider>
);

export default App;
