import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
import { View, Text } from 'react-native';

const AuthContext = createContext(null);
const { Provider } = AuthContext;
const AUTH_STATE_KEY = 'authState';

const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        accessToken: null,
        authenticated: null,
        user: null,
    });
    const [authStateLoading, setAuthStateLoading] = useState(true);
    const [loginLoading, setLoginLoading] = useState(false);

    useEffect(() => {
        loadStorageData();
    }, []);

    const loadStorageData = async () => {
        try {
            const jsonAuth = await RNSecureStorage.get(AUTH_STATE_KEY);
            const storedAuthState = JSON.parse(jsonAuth);
            setAuthState({ ...storedAuthState });
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setAuthStateLoading(false);
        }
    };

    const login = (email, password) => {
        setLoginLoading(true)
        axios.post('http://localhost:8000/api/login/', {
            email,
            password,
        })
            .then(response => {
                console.log(response);
                const loginAPIData = {
                    accessToken: response.data.access_token,
                    authenticated: true,
                    user: response.data.user,
                };
                setAuthState({ ...loginAPIData });
                RNSecureStorage.set(AUTH_STATE_KEY, JSON.stringify(loginAPIData), {accessible : ACCESSIBLE.ALWAYS})
                    .then((res) => {
                        console.log(res);
                        setLoginLoading(false)
                    }, (err) => {
                        console.log(err);
                        setAuthStateLoading(false)
                    });
            })
            .catch(error => {
                console.log(error);
                setLoginLoading(false)
            });
    };

    const logout = async () => {
        //call logout api
        setAuthState({
            accessToken: null,
            authenticated: false,
            user: null,
        });
        await RNSecureStorage.remove(AUTH_STATE_KEY);
    };

    const getAccessToken = () => {
        return authState.accessToken;
    };

    const getUser = () => {
        return authState.user;
    };

    const isAuthenticated = () => {
        return authState.authenticated;
    };

    if (authStateLoading) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        );
    }

    return (
        <Provider
            value={{
                authState,
                getAccessToken,
                setAuthState,
                logout,
                login,
                authStateLoading,
                loginLoading,
            }}>
            {children}
        </Provider>
    );
};

export { AuthContext, AuthProvider, useAuth };
