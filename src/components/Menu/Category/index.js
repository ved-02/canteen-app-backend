import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
export default function Category({heading, subHeading}) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </View>
      <Icon name="arrowright" size={25} color="#cb202d" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    // paddingRight: 5,
    fontSize: 20,
    fontFamily: 'Roboto',
    color: 'grey',
    fontWeight: '700',
  },
  subHeading: {
    fontSize: 14,
    fontFamily: 'Roboto',
    color: 'silver',
    fontWeight: '500',
  },
});
