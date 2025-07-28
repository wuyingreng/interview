import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
// import {useNavigationContainerRef} from '@react-navigation/native';

const Newsitem = ({item, index}) => {
  // const navRef = useNavigationContainerRef();
  const handlePress = event => {
    console.log(event);
    event.navigation.navigate({name: 'Detail', params: event});
  };

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      key={index}
      onPress={() => handlePress(item)}>
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

export default Newsitem;
