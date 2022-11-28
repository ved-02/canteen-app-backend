import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '@env';
import Transaction from '../../components/Transaction';
import axios from 'axios';
export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState('');
  const getTransactions = () => {
    AsyncStorage.getItem('credential').then(token => {
      const url = `${BASE_URL}/transaction/get`;
      const params = JSON.stringify({
        token: token,
      });
      axios
        .post(url, params, {
          headers: {
            'content-type': 'application/json',
          },
        })
        .then(res => {
          // console.log(res.data.transaction[0].item_list);
          setTransactions(res.data.transaction);
        });
    });
  };
  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <View>
      <Header />
      <Text
        style={{
          marginLeft: 15,
          fontSize: 18,
          fontWeight: '600',
          color: 'black',
          marginTop: 10,
        }}>
        Transactions
      </Text>
      <View style={{marginLeft: 25}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={transactions}
          renderItem={({item}) => {
            return <Transaction item={item} />;
          }}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </View>
  );
}
