import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import {menu} from '../../assets/menu';
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />

      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={menu}
          renderItem={({item}) => {
            return <Menu menu={item} />;
          }}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  introContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  hi: {
    fontSize: 18,
    fontWeight: '600',
    color: '#808080',
    fontFamily: 'Roboto',
  },
  nameContainer: {
    flexWrap: 'wrap',
    width: 30,
    backgroundColor: 'green',
  },
});
