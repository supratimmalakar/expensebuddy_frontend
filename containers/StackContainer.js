import React from 'react';
import { AppContainer, AuthenticationContainer } from './';
import { useAuth } from '../providers/auth';
import { NavigationContainer } from '@react-navigation/native';

function StackContainer() {
    const { getAccessToken } = useAuth();
    return (
        <NavigationContainer>
            {getAccessToken() ? <AppContainer /> : <AuthenticationContainer />}
        </NavigationContainer>
    );
}

export default StackContainer;
