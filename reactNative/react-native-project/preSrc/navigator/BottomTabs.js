import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
// import {CardStyleInterpolators} from '@react-navigation/stack';

import {View, Text, StyleSheet, TouchableHighlight, Button} from 'react-native';

// import {TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import DashBoard from '../pages/dashboardPage';
import Home from '../pages/homePage';
import News from '../pages/newsPage';
import Self from '../pages/selfPage';

//创建底部导航器
const Tab = createBottomTabNavigator();

class BottomTabs extends React.Component {
  onPress = () => {
    const {navigation} = this.props;
    navigation.navigate({name: 'Search'});
  };

  headerRight = () => {
    const {route} = this.props;
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'News';
    if (routeName === 'News') {
      return (
        <TouchableHighlight style={styles.headerRight} onPress={this.onPress}>
          <Icon name="search" color={'#724035'} size={14} />
        </TouchableHighlight>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#fbc85c',
          tabBarInactiveTintColor: '#724035',
        }}>
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
            tabBarLabel: '控制台',
            tabBarIcon: ({color, size}) => (
              <Icon name="dashboard" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="News"
          component={News}
          options={{
            headerShown: true,
            headerRight: this.headerRight,
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
            tabBarLabel: '我的',
            tabBarIcon: ({color, size}) => (
              <Icon name="user" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  headerRight: {
    paddingRight: 15,
  },
});

export default BottomTabs;
