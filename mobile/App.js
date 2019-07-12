import { Provider } from 'react-redux';
import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Index from './pages/home';
import store from '../store';

const RootStack = createStackNavigator(
  {
    Index
  },
  {
    initialRouteName: 'Index'
  }
);

const AppContainer = createAppContainer(RootStack);

const App = () => (
  <Provider store={store()}>
    <AppContainer />
  </Provider>
);

export default App;
