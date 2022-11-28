import {View, Text, Modal, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '@env';
import axios from 'axios';
export default function PaymentModal({
  modalVisible,
  setModalVisible,
  items,
  total,
}) {
  const navigation = useNavigation();

  const makePaymentUsingPassbook = () => {
    const url = `${BASE_URL}/due/add_due`;

    AsyncStorage.getItem('credential').then(token => {
      console.log(token);
      const params = JSON.stringify({
        token: token,
        amount: total,
      });
      console.log(params);
      axios
        .post(url, params, {
          headers: {
            'content-type': 'application/json',
          },
        })
        .then(res => console.log(res.data))
        .catch(e => console.log(e.message));
    });
  };
  const addTransactions = () => {
    const url = `${BASE_URL}/transaction/post`;
    console.log(items);
    AsyncStorage.getItem('credential').then(token => {
      console.log(token);
      const params = JSON.stringify({
        token: token,
        item_list: items,
      });
      console.log(params);
      axios
        .post(url, params, {
          headers: {
            'content-type': 'application/json',
          },
        })
        .then(res => console.log(res.data))
        .catch(e => console.log(e.message));
    });
  };
  const paidUsingCash = () => {
    setModalVisible(false);
    navigation.navigate('OrderPlaced');
    AsyncStorage.removeItem('items');
  };
  const paidUsingPassbook = () => {
    setModalVisible(false);
    makePaymentUsingPassbook();
    addTransactions();
    navigation.navigate('OrderPlaced');
    AsyncStorage.removeItem('items');
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.box}>
          <Text style={styles.heading}>Pay using</Text>
          <View style={styles.paymentMethods}>
            <Pressable
              onPress={() => {
                paidUsingCash();
              }}
              style={styles.paymentMethodContainer}>
              <Icon name="cash" size={35} color="green" />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: 'black',
                  marginLeft: 5,
                }}>
                Cash
              </Text>
            </Pressable>
            <Pressable
              style={styles.paymentMethodContainer}
              onPress={() => paidUsingPassbook()}>
              <Icon name="checkbook" size={35} color="green" />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: 'black',
                  marginLeft: 5,
                }}>
                Passbook
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    height: 200,
    position: 'absolute',
    bottom: '0%',
    backgroundColor: 'lightgrey',
    width: '100%',
    paddingTop: 5,
    paddingLeft: 15,
    // justifyContent: 'center',
  },
  heading: {
    fontWeight: '700',
    fontSize: 18,
    color: 'black',
    margin: 10,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    width: '80%',
    // backgroundColor: 'red',
    marginBottom: 30,
    alignItems: 'center',
    // justifyContent: 'space-around',
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderBottomColor: 'silver',
  },
  paymentMethods: {
    alignItems: 'center',
    marginTop: 15,
  },
});
