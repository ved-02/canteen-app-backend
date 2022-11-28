import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
export default function ListItem({list}) {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate('Item', {list: list});
      }}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: `${list.img}`,
        }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{list.name}</Text>
        <Text style={styles.price}>${list.price}</Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 180,
    width: 150,
    // marginHorizontal: 8,
  },
  infoContainer: {
    backgroundColor: 'lightgrey',
    width: '90%',
    height: 50,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    // paddingBottom: 2,
  },
  tinyLogo: {
    width: '90%',
    height: '60%',
    resizeMode: 'stretch',
  },
  name: {
    color: 'black',
    fontWeight: '600',
    fontFamily: 'Roboto',
    marginLeft: 5,
    fontSize: 15,
  },
  price: {
    fontSize: 13,
    color: 'black',
    fontWeight: '500',
    fontFamily: 'Roboto',
    marginLeft: 5,
    // marginBottom: 5,
  },
});
