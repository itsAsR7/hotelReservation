import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import { Ionicons } from '@expo/vector-icons';
import SearchScreen from '../screens/SearchScreen';
import Location from '../screens/Location';
import Favourite from '../screens/Favourite';
import Profile from '../screens/Profile';
import { Colors } from 'react-native/Libraries/NewAppScreen';


const Tab = createBottomTabNavigator();

const tabBarStyle = {
  padding: 10,
  paddingBottom: 10,

  borderRadius: 20,
  height: 70,
  position: 'absolute',
  bottom: 20,
  left: 20,
  right: 20,
};

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Search"
      activeColor="#Eb6A58"
      tabBarHideKeyBoard={false}
      headerShown={false}
      inactiveColor="#3e2465"
      barStyle={{ paddingBottom: 48 }}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={35}
              color={focused ? 'red' : 'gray'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Location"
        component={Location}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="location"
              size={35}
              color={focused ? 'red' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons name="heart" size={35} color={focused ? 'red' : 'gray'} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-circle"
              size={35}
              color={focused ? 'red' : 'gray'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
