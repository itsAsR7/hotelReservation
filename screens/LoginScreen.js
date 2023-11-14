import React, { useState, useEffect } from 'react';
import { Image,ImageBackground,View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { auth } from '../dbConfig';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { TouchableOpacity } from 'react-native';

const backgroundImage = require('../assets/backgroundLogin.jpg');





const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setValidEmail] = useState(true);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    setValidEmail(isValid);

    
  };

  



  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(`User ${auth.currentUser?.uid} logged in`);
      navigation.navigate('Bottom');
    } catch (err) {
      console.log(`Error when signing in user: ${err}`);
      alert('Login Error');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.background}>
       
          <View style={styles.formContainer}>
          <Image
          style={styles.logo}
          source={require('../assets/HotelAppLogo.png')}
        />


          <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
       
        onChangeText={(text) => setEmail(text)}
        onBlur={validateEmail}
      />

      {!isValidEmail && <Text style={{ color: 'red',fontSize:'20' }}>Invalid email address</Text>}




      <TextInput
        style={styles.input}
        placeholder="Password"
        keyboardType="email-address"
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.buttonText} >Login</Text>
      </TouchableOpacity>
         
          </View>
        
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the overlay opacity as needed
  },
  formContainer: {
    
    
    padding: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust the input background opacity as needed
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop:20
  },
  loginButton: {
    backgroundColor: '#e76f51',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop:20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logo: {
    padding:50,
    height: 200,
    width: 200,
    borderRadius: 100,
    marginBottom:10,
    marginLeft:90,
    marginTop:10,

  },
});

export default LoginScreen;
