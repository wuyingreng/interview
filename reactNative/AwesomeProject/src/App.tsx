/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Fragment } from 'react';
import { StatusBar } from 'react-native';
import Router from './router';

function App() {
  return (
    <Fragment>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        hidden={false}
      />
      <Router />
    </Fragment>
  );
}

export default App;
