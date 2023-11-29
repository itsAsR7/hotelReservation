import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './components/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import BookingScreen from "./screens/BookingScreen";
import ProfileScreen from "./screens/Profile";
import BottomTabNav from './navigation/BottomTabNav';
import HotelDetails from './screens/HotelDetails';
import HotelList from './screens/HotelList';
import Search from './screens/Search';
import { auth } from "./dbConfig";
import { Provider as PaperProvider, Menu, IconButton } from "react-native-paper";

const Stack = createNativeStackNavigator();
const handleLogout = async () => {
  try {
    await auth.signOut();
    navigation.navigate('Onboarding');
  } catch (err) {
    console.error(
      `Error when signing user (uid: ${auth.currentUser.uid}) out: ${err}`
    );
  }
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const openMenu = () => setIsMenuVisible(true);
  const closeMenu = () => setIsMenuVisible(false);

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
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator>
      {isLoggedIn ? (
        <>
        <Stack.Screen
          name="Bottom"
          component={BottomTabNav}
          options={({ navigation }) => ({
            headerShown: true,

            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              color:"black",
              fontSize:26,
              fontFamily:"monospace"
            },
  
            title: "Quick Stay",
            headerRight: () => (
              <Menu
                visible={isMenuVisible}
                onDismiss={closeMenu}
                anchor={
                  <IconButton
                    icon="dots-vertical"
                    color="white"
                    size={24}
                    onPress={openMenu}
                  />
                }
              >
                
                <Menu.Item onPress={handleLogout} title="Logout" />
              </Menu>
            ),
          })}
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
           <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
