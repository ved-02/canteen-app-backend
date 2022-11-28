import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import MailIcon from 'react-native-vector-icons/Foundation';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '@env';
import axios from 'axios';
import Loader from '../../Loader';
export default function ProfileScreen() {
  const [loader, setLoader] = useState(0);
  const [user, setUser] = useState('');
  const navigation = useNavigation();
  const logOut = async () => {
    await AsyncStorage.removeItem('credential').then(() => {
      navigation.navigate('Login');
    });
  };
  const getInfoData = async () => {
    const url = `${BASE_URL}/user/get-data`;
    await AsyncStorage.getItem('credential').then(res => {
      const params = JSON.stringify({
        token: res,
      });
      axios
        .post(url, params, {
          headers: {
            'content-type': 'application/json',
          },
        })
        .then(res => {
          setLoader(1);

          setUser(res.data.user);
        });
    });
  };
  useEffect(() => {
    getInfoData();
  }, []);
  return (
    <>
      {loader ? (
        <View style={styles.container}>
          <Header />
          <View style={styles.subContainer}>
            <View style={styles.infoContainer}>
              <Image
                style={styles.userIcon}
                source={require('../../assets/profileScreen/userIcon.png')}
              />
              <View>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.profession}>Student</Text>
              </View>
            </View>
            <View style={styles.someInfoContainer}>
              <View style={styles.subInfoContainer}>
                <Icon name="home" size={25} color="lightgrey" />
                <Text style={styles.subInfoText}>{user.address}</Text>
              </View>
              <View style={styles.subInfoContainer}>
                <MailIcon name="mail" size={25} color="lightgrey" />
                <Text style={styles.subInfoText}>{user?.email}</Text>
              </View>
            </View>
            <View style={styles.orderInfoContainer}>
              <View style={styles.orderInfoBox}>
                <Text>${500.0 - user.money_due}</Text>
                <View>
                  <Text>Balance</Text>
                </View>
              </View>
              <View style={styles.orderInfoBox}>
                <Text>{user.transactions}</Text>
                <Text>Orders</Text>
              </View>
            </View>
            <Pressable
              style={styles.transactionsContainer}
              onPress={() => {
                navigation.navigate('Transactions');
              }}>
              <Text style={styles.navigateText}>Transactions</Text>
            </Pressable>

            <Pressable
              style={styles.transactionsContainer}
              onPress={() => {
                logOut();
                // navigation.navigate('Login');
              }}>
              <Text style={styles.navigateText}>Log out</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <Loader />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {},
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    height: 70,
    width: 70,
    marginRight: 5,
  },
  infoContainer: {
    marginTop: '5%',
    paddingLeft: '2%',
    width: '90%',
    paddingBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  name: {
    fontSize: 18,
    color: '#cb202d',
  },
  profession: {
    color: 'lightgrey',
  },
  someInfoContainer: {
    width: '100%',
    paddingLeft: 15,
    marginVertical: 15,
  },
  subInfoContainer: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
  },
  subInfoText: {
    marginLeft: 7,
  },
  orderInfoContainer: {
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    justifyContent: 'space-around',
  },
  orderInfoBox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'lightgrey',
    width: '45%',
    borderRadius: 5,
    paddingVertical: 15,
    margin: 4,
  },
  transactionsContainer: {
    margin: 15,
  },
  navigateText: {
    color: '#cb202d',
    fontWeight: '700',
    fontSize: 18,
  },
});
