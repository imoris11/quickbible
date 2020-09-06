/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { navigationRef } from './src/lib/NavigationService';
import { persistor, store } from './store';
import App from './src/App';

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={<View />} persistor={persistor}>
      <NavigationContainer ref={navigationRef}>
        <App />
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

export default Root;
