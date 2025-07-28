import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Platform} from 'react-native';
import BottomTabs from './BottomTabs';
import DetailPage from '../pages/detailPage';
import SearchPage from '../pages/searchPage';

const ModalStack = createStackNavigator();
//创建堆栈导航器
const Stack = createStackNavigator();

function RootStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          // 可以针对 ios 和 android 在这里区分特性使用。
          ...Platform.select({
            android: {
              elevation: 0,
              borderBottomWidth: 0,
            },
            ios: {
              shadowOpacity: 0,
            },
          }),
        },
        // headerTruncatedBackTitle: 'BACK',
        // headerBackTitleVisible: true,
        headerTitleStyle: {
          color: '#000',
        },
        headerTintColor: '#333',
        // 屏幕的过渡方式
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="Detail" component={DetailPage} />
      <Stack.Screen
        name="Search"
        component={SearchPage}
        options={{
          title: '搜索栏目',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function Router() {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
}

export default Router;
