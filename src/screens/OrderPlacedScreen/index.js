import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
export default function OrderPlacedScreen() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 16, marginBottom: 18, color: 'silver'}}>
        You're order has been placed,Please Wait....
      </Text>
      <Pressable
        style={{
          backgroundColor: '#cb202d',
          width: '80%',
          alignItems: 'center',
          justifyContent: 'center',
          height: 40,
          borderRadius: 5,
        }}
        onPress={() => navigation.navigate('Home')}>
        <Text>Go Back to HomeScreen</Text>
      </Pressable>
    </View>
  );
}
