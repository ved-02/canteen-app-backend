import React, {useEffect, useState} from 'react';
import Loader from '../Loader';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import AboutUs from '../screens/AboutUs';
import OrderPlacedScreen from '../screens/OrderPlacedScreen';
import ItemScreen from '../screens/ItemScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Navigator() {
  const Stack = createNativeStackNavigator();
  const [credential, setCredential] = useState('');
  const checkAsync = async () => {
    await AsyncStorage.getItem('credential')
      .then(res => {
        res ? setCredential(res) : setCredential('Async Empty');
      })
      .catch(e => console.log(e.message));
  };
  useEffect(() => {
    checkAsync();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {credential === '' ? (
          <Stack.Screen name="Loader" component={Loader} />
        ) : credential === 'Async Empty' ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Transactions" component={TransactionsScreen} />
            <Stack.Screen name="AboutUs" component={AboutUs} />
            <Stack.Screen name="Item" component={ItemScreen} />
            <Stack.Screen name="OrderPlaced" component={OrderPlacedScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Transactions" component={TransactionsScreen} />
            <Stack.Screen name="AboutUs" component={AboutUs} />
            <Stack.Screen name="Item" component={ItemScreen} />
            <Stack.Screen name="OrderPlaced" component={OrderPlacedScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
