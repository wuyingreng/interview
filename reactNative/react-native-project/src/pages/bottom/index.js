import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './subPages/home';
import DashBoard from './subPages/dash';
import News from './subPages/news';
import Self from './subPages/self';

const Tab = createBottomTabNavigator();

export default function Bottom(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: '首页',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="DashBoard"
        component={DashBoard}
        options={{
          headerShown: false,
          tabBarLabel: '面板',
          tabBarIcon: ({color, size}) => (
            <Icon name="dashboard" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          headerShown: false,
          tabBarLabel: '新闻',
          tabBarIcon: ({color, size}) => (
            <Icon name="newspaper-o" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Self"
        component={Self}
        options={{
          headerShown: false,
          tabBarLabel: '我的',
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
