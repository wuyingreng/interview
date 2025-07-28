import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';

import Router from './router';

export default function App() {
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
