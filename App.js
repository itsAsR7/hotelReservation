import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './components/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import BookingScreen from "./screens/BookingScreen";

import BottomTabNav from './navigation/BottomTabNav';
import HotelDetails from './screens/HotelDetails';
import HotelList from './screens/HotelList';
import Search from './screens/Search';
import { auth } from "./dbConfig";

const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const listener = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(user !== null ? true : false);
      console.log(
        `Auth state changed. ${
          user !== null ? `User uid: ${user.uid}` : "User not logged in"
        }`
      );
    });

    return listener;
  }, []);

  return isLoggedIn === null 
  ? (<ActivityIndicator />) 
  : (
    <NavigationContainer>
      <Stack.Navigator>
      {isLoggedIn ? (
        <>
        <Stack.Screen
          name="Bottom"
          component={BottomTabNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HotelDetails"
          component={HotelDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HotelList"
          component={HotelList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookingScreen"
          component={BookingScreen}
          options={{ headerShown:true}}
        />


        </> 
      ) : (
        <>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
