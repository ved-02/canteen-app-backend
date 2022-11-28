import {View, Text} from 'react-native';
import React from 'react';
import {Bubbles} from 'react-native-loader';
export default function Loader() {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      <Bubbles size={15} color="red" />
    </View>
  );
}
