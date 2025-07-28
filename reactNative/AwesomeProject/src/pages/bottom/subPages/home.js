import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import React from 'react';
import RefreshListView from 'react-native-refresh-list-view';

import { newsList } from '../../../data';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function home(props) {
  const renderNewsItem = ({ item, index }) => (
    <TouchableWithoutFeedback
      style={styles.container}
      key={index}
      onPress={() => props.navigation.navigate({ name: 'Detail', params: item })}>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: item.uri,
          }}
        />

        <View style={styles.textImage}>
          <Text style={styles.text}>{item.title}</Text>
          <Text> - {item.author}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
  return <RefreshListView data={newsList} renderItem={renderNewsItem} />;
}

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
