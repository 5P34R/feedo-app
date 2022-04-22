import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';



import HomeScreen from '../screens/Home';
import SettingsScreen from '../screens/SettingsScreen';
import PhScreen from '../screens/PhScreen'; 
import Temperature from '../screens/TempScreen';

const Tab = createBottomTabNavigator();

export default function Navbar() {
  return (

    <NavigationContainer>
      <Tab.Navigator
      
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list' : 'ios-list';
            }
            else if (route.name === 'PH'){
              iconName = focused ? 'ios-eyedrop': 'ios-eyedrop-outline'
            }
            else if (route.name === "Temperature"){
              iconName = focused ? 'flame':'flame-outline'
            }

            // You can return any component that you like here!
            //<Ionicons name="ios-eyedrop" size={24} color="black" />
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="PH" component={PhScreen} />
        <Tab.Screen name="Temperature" component={Temperature} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}