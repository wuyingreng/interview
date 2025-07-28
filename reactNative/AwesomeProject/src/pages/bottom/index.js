import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './subPages/home';
import DashBoard from './subPages/dash';
import News from './subPages/news';
import Self from './subPages/self';

const Tab = createBottomTabNavigator();

// 将图标组件定义移到外部
const HomeIcon = ({ color, size }) => (
  <Icon name="home" color={color} size={size} />
);

const DashBoardIcon = ({ color, size }) => (
  <Icon name="dashboard" color={color} size={size} />
);

const NewsIcon = ({ color, size }) => (
  <Icon name="newspaper-o" color={color} size={size} />
);

const SelfIcon = ({ color, size }) => (
  <Icon name="user" color={color} size={size} />
);

export default function Bottom() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: '首页',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="DashBoard"
        component={DashBoard}
        options={{
          headerShown: false,
          tabBarLabel: '面板',
          tabBarIcon: DashBoardIcon,
        }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          headerShown: false,
          tabBarLabel: '新闻',
          tabBarIcon: NewsIcon,
        }}
      />
      <Tab.Screen
        name="Self"
        component={Self}
        options={{
          headerShown: false,
          tabBarLabel: '我的',
          tabBarIcon: SelfIcon,
        }}
      />
    </Tab.Navigator>
  );
}
