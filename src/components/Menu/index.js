import {View} from 'react-native';
import React, {useState} from 'react';
import Category from './Category';
import List from './List';

export default function Menu({menu}) {


  return (
    <View>
      <Category heading={menu.heading} subHeading={menu.subHeading} />
      <List listOfItems={menu.listOfItems} />
    </View>
  );
}
