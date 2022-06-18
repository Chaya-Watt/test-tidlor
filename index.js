/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import Routers from './src/Routers';
import {name as appName} from './app.json';

import {Provider} from 'react-redux';
import store from './src/Redux/store';

const ReactApp = () => (
  <Provider store={store}>
    <Routers />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReactApp);
