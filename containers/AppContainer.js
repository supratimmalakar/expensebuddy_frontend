import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Buddies, Groups, AddExpense, Account } from '../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Users from '@styled-icons/feather/Users';
// import { Icon } from '@iconify/react';
// import peopleIcon from '@iconify/icons-bi/people';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const getIcons = (iconName, focusedIconName) => {
  return ({ focused, color, size }) => {
    return <Ionicons name={focused ? focusedIconName : iconName} size={size} color={color} />;
  };
};

function AppContainer() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: '#5170FF',
      tabBarStyle: { paddingBottom: 10, paddingTop: 10, height: 60 },
      tabBarLabelStyle: { fontFamily: 'Montserrat_500' },
      headerShown : false,
    }}>
      <Tab.Screen options={{
        tabBarIcon: getIcons('person-outline', 'person'),
      }} name="Buddies" component={Buddies} />
      <Tab.Screen options={{
        tabBarIcon: ({focused, color, size}) => {
          return <Image style={{ width: size, height: size }} source={require('../assets/add.png')}/>
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
