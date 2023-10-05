import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { auth } from '../dbConfig';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignupScreen = ( ) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(`User ${auth.currentUser?.uid} logged in`);
      navigation.navigate('Search');
    } catch (err) {
      console.log(`Error when signing in user: ${err}`);
      alert("Login Error");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

export default SignupScreen;
