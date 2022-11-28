import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
export default function Header({name}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Icon name="arrowleft" size={30} color="#cb202d" />
      </Pressable>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 0.5,
    width: '100%',
    borderBottomColor: 'lightgrey',
  },
  name: {
    color: 'black',
    fontSize: 18,
    marginLeft: 15,
  },
});
