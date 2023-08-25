import React from 'react';
import { Home, Buddies, Groups, AddExpense, Account } from '../screens';
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
  // useEffect(() => {
  //   updateContacts();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [authState]);

  // const updateContacts = async () => {
  //   try {
  //     const contacts = await Contacts.getAll();
  //     const parsedContacts = contacts.filter(contact => {
  //       const unParsedPhoneNumber = contact?.phoneNumbers[0]?.number;
  //       if (typeof (unParsedPhoneNumber) === 'string') {
  //         const phone_number = parsePhoneNumber(unParsedPhoneNumber, 'IN').nationalNumber;
  //         return phone_number.length === 10;
  //       }
  //       else {return false;}
  //     })
  //     .map(contact => {
  //       const phone_number = parsePhoneNumber(contact?.phoneNumbers[0]?.number, 'IN').nationalNumber;
  //       const parsedContact = {
  //         contact_name: contact.displayName,
  //         phone_number: '91' + phone_number,
  //       };
  //       return parsedContact;
  //     });
  //     const response = await axiosInstance.post('/api/user/set_contacts/', {
  //       'contacts' : parsedContacts,
  //     });
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // };


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
      <Tab.Screen options={{
        tabBarIcon: getIcons('people-outline', 'people'),
      }} name="Groups" component={Groups} />
      <Tab.Screen options={{
        tabBarIcon: getIcons('person-outline', 'person'),
      }} name="Account" component={Account} />
    </Tab.Navigator>
  );
}

export default AppContainer;
