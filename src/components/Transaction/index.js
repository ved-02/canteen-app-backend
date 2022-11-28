import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';

export default function Transaction({item}) {
  const [totalCount, setTotalCount] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [date, setDate] = useState(item.date.split('T')[0]);

  const findTotalCount = () => {
    let i;
    let totalP = 0;
    let totalC = 0;
    for (i = 0; i < item.item_list.length; i++) {
      console.log(item.item_list[i]);
      totalC += item.item_list[i].count;
      totalP += item.item_list[i].price * item.item_list[i].count;
    }
    setTotalCount(totalC);
    setTotalPrice(totalP);
  };
  useEffect(() => {
    findTotalCount();
  });
  return (
    <View
      style={{
        marginTop: 15,
        width: '95%',
        height: 100,
        borderRadius: 5,
        backgroundColor: 'lightgrey',
        justifyContent: 'space-between',
        paddingVertical: 3,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 8,
        }}>
        <Text>Total Products: {totalCount}</Text>
        <Text>Total Price: {totalPrice}</Text>
      </View>
      <Text style={{padding: 10}}>Date: {date}</Text>
    </View>
  );
}
