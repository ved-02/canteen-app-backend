import {View, Text, FlatList, StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';
import CartItem from '../../components/CartItem';
import PaymentModal from '../../components/PaymentModal';
export default function CartScreen() {
  const [listOfItems, setListOfItems] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const placeOrder = () => {
    setModalVisible(true);
  };
  const getData = () => {
    AsyncStorage.getItem('items').then(res => {
      res = JSON.parse(res);
      setListOfItems(res);

      let i;
      let cost = 0;
      for (i = 0; i < res.length; i++) {
        cost += res[i].price * res[i].count;
      }
      setTotal(cost);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <Header />
      <View style={{alignItems: 'center'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={listOfItems}
          renderItem={({item}) => {
            return <CartItem item={item} />;
          }}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.totalCostContainer}>
          <Text style={{fontSize: 16, color: 'black'}}>Total Cost</Text>
          <Text style={{color: 'black'}}>${total}</Text>
        </View>
        <Pressable
          style={styles.placeOrderContainer}
          onPress={() => {
            placeOrder();
          }}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </Pressable>
      </View>
      <PaymentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        items={listOfItems}
        total={total}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: '0%',
    width: '100%',
    height: '20%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  placeOrderContainer: {
    width: '80%',
    backgroundColor: '#cb202d',
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  placeOrderText: {
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: '600',
  },
  totalCostContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginBottom: 25,
  },
});
