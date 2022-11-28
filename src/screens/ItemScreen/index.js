import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/ItemComponents/Header';
import Wallpaper from '../../components/ItemComponents/Wallpaper';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from '../../Loader';
export default function ItemScreen({route}) {
  const {list} = route.params;
  const [counter, setCounter] = useState(0);
  const [loader, setLoader] = useState(1);

  const getItemData = () => {
    AsyncStorage.getItem('items').then(res => {
      if (!res) setCounter(0);
      else {
        res = JSON.parse(res);

        let i;
        for (i = 0; i < res.length; i++) {
          if (res[i].name === list.name) {
            setCounter(res[i].count);
          }
        }
      }
      setLoader(0);
    });
  };
  const addProduct = () => {
    setCounter(counter => counter + 1);
    AsyncStorage.getItem(`items`).then(res => {
      if (!res) {
        AsyncStorage.setItem(
          `items`,
          JSON.stringify([
            {
              name: list.name,
              count: counter + 1,
              img: list.img,
              price: list.price,
            },
          ]),
        );
      } else {
        res = JSON.parse(res);

        let i;
        for (i = 0; i < res.length; i++) {
          if (list.name === res[i].name) {
            res[i].count = res[i].count + 1;
            break;
          }
        }
        if (i === res.length) {
          res.push({
            name: list.name,
            count: counter + 1,
            img: list.img,
            price: list.price,
          });
        }
        AsyncStorage.setItem(`items`, JSON.stringify(res));
      }
    });
  };
  const removeProduct = () => {
    setCounter(counter => counter - 1);
    AsyncStorage.getItem('items').then(res => {
      res = JSON.parse(res);

      let i;
      for (i = 0; i < res.length; i++) {
        if (list.name === res[i].name) {
          if (res[i].count > 1) res[i].count = res[i].count - 1;
          else {
            res = res.filter((_, index) => {
              return index !== i;
            });
          }
        }
      }
      AsyncStorage.setItem('items', JSON.stringify(res));
    });
  };
  useEffect(() => {
    getItemData();
  }, []);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <View>
          <Header name={list.name} />
          <Wallpaper img={list.img} />
          <Text
            style={{
              marginLeft: 23,
              fontSize: 18,
              color: 'black',
              fontFamily: 'Roboto',
              marginVertical: 5,
            }}>
            Add to Cart
          </Text>
          <View style={styles.counterContainer}>
            <Pressable
              style={styles.symbolContainer}
              onPress={() => addProduct()}>
              <Icon name="plus" size={20} color="white" />
            </Pressable>
            <Text style={{marginHorizontal: 5, fontSize: 15, color: 'black'}}>
              {counter}
            </Text>
            <Pressable
              style={[
                styles.symbolContainer,
                counter === 0 && {backgroundColor: '#FA8072'},
              ]}
              disabled={counter === 0}
              onPress={() => removeProduct()}>
              <Icon name="minus" size={20} color="white" />
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  symbolContainer: {
    margin: 5,
    backgroundColor: '#cb202d',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
