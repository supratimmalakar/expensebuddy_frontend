import React from 'react';
import { Home, Buddies, AddExpense, Account } from '../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native';
import { useEffect } from 'react';
import { useAuth } from '../providers/auth';
import Contacts from 'react-native-contacts';
import { BASE_URL } from '../App';
import { axiosInstance } from '../utils';
import parsePhoneNumber from 'libphonenumber-js';
import {theme} from '../utils';

const Tab = createBottomTabNavigator();

const getIcons = (iconName, focusedIconName) => {
  return ({ focused, color, size }) => {
    return <Ionicons name={focused ? focusedIconName : iconName} size={size} color={color} />;
  };
};

function AppContainer() {
  const { authState, setAuthState } = useAuth();

  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: theme.primary,
      tabBarStyle: { paddingBottom: 10, paddingTop: 10, height: 60 },
      tabBarLabelStyle: { fontFamily: 'Montserrat_500' },
      headerShown: false,
    }}>
      <Tab.Screen options={{
        tabBarIcon: getIcons('person-outline', 'person'),
      }} name="Buddies" component={Buddies} />
      <Tab.Screen options={{
        tabBarIcon: ({ focused, color, size }) => {
          return <Image style={{ width: size, height: size }} source={require('../assets/add.png')} />
        },
      }} name="Add Expense" component={AddExpense} />
      {/* <Tab.Screen options={{
        tabBarIcon: getIcons('people-outline', 'people'),
      }} name="Groups" component={Groups} /> */}
      <Tab.Screen options={{
        tabBarIcon: getIcons('person-outline', 'person'),
      }} name="Account" component={Account} />
    </Tab.Navigator>
  );
}

export default AppContainer;
