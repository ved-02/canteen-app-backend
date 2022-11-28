import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import ProfileIcon from 'react-native-vector-icons/Ionicons';
export default function Header() {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {route.name !== 'Home' ? (
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" size={25} color="#cb202d" />
        </Pressable>
      ) : (
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('Profile')}>
          <ProfileIcon name="settings-sharp" size={25} color="#cb202d" />
        </Pressable>
      )}
      <View>
        <Text style={{fontSize: 20, fontFamily: 'Roboto', fontWeight: '800'}}>
          CANTEEN
        </Text>
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate('Cart');
        }}>
        <Icon name="shoppingcart" size={25} color="#cb202d" />
        {/* <Text>Cart</Text> */}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    height: 60,
    // backgroundColor: 'green',
  },
});
