import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens';

const Stack = createNativeStackNavigator();

function AppContainer() {
  return (
      <Stack.Navigator screenOptions={{
        headerTitleStyle: {
          fontFamily: 'Montserrat_600',
        },
      }} initialRouteName="AuthWelcome">
        <Stack.Screen
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
  )
}

export default AppContainer