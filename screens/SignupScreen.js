import React, { useState } from 'react';
import { Image,ImageBackground,View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { auth } from '../dbConfig';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const backgroundImage = require('../assets/backgroundSignUp.jpg');

const SignupScreen = ( ) => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setValidEmail] = useState(true);
  const [isValidConfirmEmail, setValidConfirmEmail] = useState(true);


  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    setValidEmail(isValid);

    
  };
  const validateConfirmEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    setValidConfirmEmail(isValid);

    
  };


  const navigation = useNavigation();

  const handleSignup = async () => {
    try {if(email==confirmEmail){
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(`User ${auth.currentUser?.uid} logged in`);
      navigation.navigate('Bottom');
      alert("Sign Up Successful");}
      else{alert("Emails dont match")}
    } catch (err) {
      console.log(`Error when signing in user: ${err}`);
      alert("Login Error");
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
        placeholderTextColor="#5e5e5e"
        value={email}
        lowercase
       
        onChangeText={(text) => setEmail(text)}
        onBlur={validateEmail}
      />

      {!isValidEmail && <Text style={{ color: 'white',fontSize:'24,',fontWeight:'bold' }}>Invalid email address</Text>}

      <TextInput
        style={styles.input}
        placeholder="Confirm Email"
        placeholderTextColor="#5e5e5e"
        value={confirmEmail}
       
        onChangeText={(text) => setConfirmEmail(text)}
        onBlur={validateConfirmEmail}
      />

      {!isValidConfirmEmail && <Text style={{ color: 'white',fontSize:'24,',fontWeight:'bold' }}>Invalid email address</Text>}






      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#5e5e5e"
        plade
        
        keyboardType="email-address"
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleSignup} style={styles.loginButton}>
        <Text style={styles.buttonText} >Sign Up</Text>
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
    marginTop:20,
    fontSize:16,
    
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

export default SignupScreen;
