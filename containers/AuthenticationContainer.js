import React from 'react';
import { AuthWelcome, Login, Signup } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function AuthenticationContainer() {
    return (
            <Stack.Navigator screenOptions={{
                headerTitleStyle: {
                    fontFamily: 'Montserrat_600',
                },
            }} initialRouteName="AuthWelcome">
                <Stack.Screen
                    name="AuthWelcome"
                    component={AuthWelcome}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    name="Signup"
                    component={Signup}
                />
            </Stack.Navigator>
    );
}

export default AuthenticationContainer;
