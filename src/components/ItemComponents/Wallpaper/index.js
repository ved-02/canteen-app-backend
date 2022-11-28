import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

export default function Wallpaper({img}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: `${img}`,
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '60%',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
});
