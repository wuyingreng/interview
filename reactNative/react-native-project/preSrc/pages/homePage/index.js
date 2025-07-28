import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  PixelRatio,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RefreshListView from 'react-native-refresh-list-view';

import Newsitem from '../../components/NewsItem';

import {useDispatch, useSelector} from 'react-redux';
// import {newsList} from '../../data';
import {fetchList} from '../../data/store';

const Tab = createMaterialTopTabNavigator();

const renderHeader = () => (
  <View>
    <Text>{PixelRatio.get()}</Text>
  </View>
);

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchList());
  }, []);
  const newsList = useSelector(state => state.list);
  return (
    <RefreshListView
      data={newsList.map(item => ({...item, navigation}))}
      renderItem={Newsitem}
      ListHeaderComponent={renderHeader}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingVertical: 5,
  },
  textImage: {
    flexDirection: 'row',
    padding: 6,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  text: {
    fontSize: 14,
    color: '#000000DD',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default Home;
