import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import {enableScreens} from 'react-native-screens';
import Router from './navigator/Router';

import {Provider} from 'react-redux';
import {store} from './data/store';
// import '@/config/http';
// import SplashScreen from 'react-native-splash-screen';

// enableScreens();

export default class extends React.Component {
  componentDidMount() {
    // SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        {/* 界面上方的导航栏，包括 Wi-Fi、电池等信息，设置背景颜色、透明度等信息 */}
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor="transparent"
          hidden={false}
          translucent
        />
        <Router />
      </Provider>
    );
  }
}
