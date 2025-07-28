import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RefreshListView from 'react-native-refresh-list-view';
import ListItem from '../../components/ListItem';

import {newsList as initalNewsList} from '../../data';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const Search = ({navigation}) => {
  const [newsList, setNewsList] = useState(initalNewsList);
  const handleBack = () => navigation.goBack();
  const onSubmit = e => {
    console.log(e.nativeEvent.text);
    setNewsList(
      initalNewsList.filter(
        item =>
          ~item.title.indexOf(e.nativeEvent.text) ||
          ~item.desc.indexOf(e.nativeEvent.text),
      ),
    );
  };
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.searchContainer}>
        <View style={styles.back}>
          <TouchableWithoutFeedback onPress={handleBack}>
            <Icon name="angle-double-left" size={25} color={'#0000008A'} />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name="search"
            size={16}
            style={styles.iconSearch}
            color={'#00000042'}
          />
          <TextInput
            style={styles.input}
            placeholder={'帮你找到感兴趣的新闻'}
            returnKeyType="search"
            onSubmitEditing={onSubmit}
          />
        </View>
      </View>
      <View>
        <RefreshListView
          data={newsList.map(item => ({...item, navigation}))}
          renderItem={ListItem}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  voice: {
    marginEnd: 15,
  },
  back: {
    paddingHorizontal: 15,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 36,
    backgroundColor: '#0000000D',
    borderRadius: 18,
    alignItems: 'center',
    marginRight: 15,
  },
  input: {
    flex: 1,
    height: 40,
  },
  iconSearch: {
    marginLeft: 15,
    marginRight: 2,
  },
  keyWordList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 15,
  },
  keyWordContainer: {
    backgroundColor: '#0000001A',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginHorizontal: 3,
    marginVertical: 5,
  },
  keyWord: {
    color: '#00000073',
    fontSize: 12,
  },
  hotSearch: {
    fontSize: 16,
    color: '#000',
    marginLeft: 15,
    marginTop: 25,
    marginBottom: 15,
  },
  searchKey: {
    alignSelf: 'center',
    color: '#0000008A',
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  searchVideoContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  feedContainer: {
    width: ScreenWidth,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feed: {
    width: ScreenWidth,
    height: 200,
  },
  timeContainer: {
    position: 'absolute',
    padding: 5,
    borderRadius: 4,
    backgroundColor: '#0000008A',
  },
  timeText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#fff',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 5,
  },
});

export default Search;
