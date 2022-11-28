import {View, FlatList} from 'react-native';
import React, {useState} from 'react';
import ListItem from './ListItem';
import {useNavigation} from '@react-navigation/native';
export default function List({listOfItems}) {
  const navigation = useNavigation();
  return (
    <View style={{marginHorizontal: 8}}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={listOfItems}
        renderItem={({item}) => {
          return <ListItem list={item} />;
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}
