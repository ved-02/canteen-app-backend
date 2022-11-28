import {
  View,
  Text,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-paper';
import {BASE_URL} from '@env';
import axios from 'axios';
export default function SignUpScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [address, setAddress] = useState('');
  const [rNo, setRNo] = useState('');
  const [name, setName] = useState('');
  // const [credential, setCredential] = useState('');
  const SignUpOperation = async () => {
    const url = `${BASE_URL}/auth/register`;
    const params = JSON.stringify({
      email: email,
      password: pwd,
      university_rollno: rNo,
      address: address,
      name: name,
    });
    axios
      .post(url, params, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then(res => {
        return res.data.token;
      })
      .then(res => {
        AsyncStorage.setItem('credential', res).then(
          navigation.navigate('Home'),
        );
      })
      .catch(e => console.log(e.message));
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.loginText}>Create Account</Text>
        <Text style={styles.loginSubText}>Please sign in to continue</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          mode="outlined"
          label="Email"
          activeOutlineColor="#cb202d"
          outlineColor="#cb202d"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Name"
          activeOutlineColor="#cb202d"
          outlineColor="#cb202d"
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Roll No."
          activeOutlineColor="#cb202d"
          outlineColor="#cb202d"
          value={rNo}
          onChangeText={text => setRNo(text)}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Address"
          activeOutlineColor="#cb202d"
          outlineColor="#cb202d"
          value={address}
          onChangeText={text => setAddress(text)}
          style={styles.input}
        />
        <TextInput
          secureTextEntry={true}
          value={pwd}
          mode="outlined"
          activeOutlineColor="#cb202d"
          outlineColor="#cb202d"
          label="Password"
          onChangeText={text => setPwd(text)}
          style={styles.input}
        />
        <Pressable
          style={styles.loginButton}
          onPress={() => {
            SignUpOperation();
          }}>
          <Text style={styles.loginButtonText}>Register</Text>
          <Icon name="arrowright" size={25} color="white" />
        </Pressable>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomContainerText}>Already have an account?</Text>
        <Pressable
          style={styles.createAccountContainer}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={styles.createAccountText}>Login</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    // backgroundColor: 'lightgrey',
  },
  topContainer: {
    marginTop: '30%',
    marginRight: '30%',
  },
  loginText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#cb202d',
    marginBottom: 4,
  },
  loginSubText: {
    color: 'grey',
    fontSize: 16,
  },
  formContainer: {
    width: '70%',
    height: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
  },
  input: {
    width: '93%',
    marginTop: 20,
    borderRadius: 5,
  },
  loginButton: {
    marginLeft: '55%',
    width: '35%',
    height: '12%',
    backgroundColor: '#cb202d',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8%',
    borderRadius: 25,
    flexDirection: 'row',
  },
  loginButtonText: {
    color: 'white',
  },
  bottomContainer: {
    flexDirection: 'row',
  },
  bottomContainerText: {
    color: 'black',
  },
  createAccountContainer: {},
  createAccountText: {
    color: '#cb202d',
  },
});
