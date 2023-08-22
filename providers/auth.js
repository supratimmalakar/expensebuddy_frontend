import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        accessToken: null,
        authenticated: null,
        user : null,
    });

    const login = (email, password) => {
        axios.post('http://localhost:8000/api/login/', {
            email,
            password,
        })
        .then(response => {
            console.log(response);
            setAuthState({
                accessToken : response.data.access_token,
                authenticated : true,
                user : response.data.user,
            });
        })
        .catch(error => console.log(error));
    }

    const logout = async () => {
        //call logout api
        setAuthState({
            accessToken: null,
            authenticated: false,
            user : null,
        });
    };

    const getAccessToken = () => {
        return authState.accessToken;
    };

    return (
        <Provider
            value={{
                authState: {
                    accessToken : null,
                    authenticated : false,
                },
                getAccessToken,
                setAuthState,
                logout,
                login,
            }}>
            {children}
        </Provider>
    );
};

export { AuthContext, AuthProvider };
