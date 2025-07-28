import {Text, View} from 'react-native';
import React, {Component} from 'react';

import Bottom from '../pages/bottom/index';
import Detail from '../pages/detail/index';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

export default function Index() {
  return (
    <NavigationContainer>
      {/* 构建堆栈导航器 */}
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#333',
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen
          name="Bottom"
          options={{title: '首页'}}
          component={Bottom}
        />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
