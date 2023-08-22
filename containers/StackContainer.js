import React, { useContext } from 'react';
import { AppContainer, AuthenticationContainer } from './';
import { AuthContext } from '../providers/auth';
import { NavigationContainer } from '@react-navigation/native';

function StackContainer() {
    const { authState, getAccessToken } = useContext(AuthContext);
    return (
        <NavigationContainer>
            {/* find out why getAccessToken() works and not authState */}
            {getAccessToken() ? <AppContainer /> : <AuthenticationContainer />}
        </NavigationContainer>
    );
}

export default StackContainer;
