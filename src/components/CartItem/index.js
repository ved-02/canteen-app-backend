import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

export default function CartItem({item}) {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.itemCountContainer}>
          <Text style={styles.itemCount}>{item.count}</Text>
          <Text>X</Text>
        </View>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: `${item.img}`,
          }}
        />
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <Text style={styles.cost}>$ {item.count * item.price}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingHorizontal: 15,
    backgroundColor: 'lightgrey',
    margin: 5,
    height: 70,
    alignItems: 'center',
    width: '98%',
    justifyContent: 'center',
    borderRadius: 15,
  },

  infoContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
  },
  itemCountContainer: {
    flexDirection: 'row',
    width: '50%',
  },
  itemCount: {
    marginRight: 25,
  },
  name: {
    marginRight: 80,
    marginLeft: 15,
  },
  tinyLogo: {
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
});
