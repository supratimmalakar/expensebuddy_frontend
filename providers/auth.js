import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import { View, Text } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { BASE_URL } from '../App';
import Contacts from 'react-native-contacts';
import { axiosInstance } from '../utils';
import parsePhoneNumber from 'libphonenumber-js';

const AuthContext = createContext(null);
const { Provider } = AuthContext;
const AUTH_STATE_KEY = 'authState';

const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};

const AuthProvider = ({ children }) => {
    const [unregisteredContacts, setUnregisteredContacts] = useState([]);
    const [authState, setAuthState] = useState({
        accessToken: null,
        authenticated: null,
        user: null,
    });
    const [authStateLoading, setAuthStateLoading] = useState(true);
    const [loginLoading, setLoginLoading] = useState(false);

    useEffect(() => {
        loadStorageData()
        .then(res => {
            if (authState.accessToken) {
                updateContacts();
            }
        })
        .catch(error => {
            console.log(error);
        });
    }, [authState.accessToken]);

    const loadStorageData = async () => {
        try {
            const jsonAuth = await RNSecureStorage.get(AUTH_STATE_KEY);
            const storedAuthState = JSON.parse(jsonAuth);
            setAuthState({ ...storedAuthState });
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setAuthStateLoading(false);
        }
    };

    const updateContacts = async () => {
        try {
            const contacts = await Contacts.getAll();
            const parsedContacts = contacts.filter(contact => {
                const unParsedPhoneNumber = contact?.phoneNumbers[0]?.number;
                if (typeof (unParsedPhoneNumber) === 'string') {
                    const phone_number = parsePhoneNumber(unParsedPhoneNumber, 'IN').nationalNumber;
                    return phone_number.length === 10;
                }
                else { return false; }
            })
                .map(contact => {
                    const phone_number = parsePhoneNumber(contact?.phoneNumbers[0]?.number, 'IN').nationalNumber;
                    const parsedContact = {
                        contact_name: contact.displayName,
                        phone_number: '91' + phone_number,
                    };
                    return parsedContact;
                });
            const response = await axiosInstance.post('/api/user/set_contacts/', {
                'contacts': parsedContacts,
            });
            const unregisteredContactsCache = parsedContacts.filter(contact => {
                const isContactRegistered = response.data.buddies.some(buddy => (buddy.phone_number === contact.phone_number));
                return !isContactRegistered;
            }).map(contact => ({
                ...contact,
                unregistered : true,
            }));
            setUnregisteredContacts([...unregisteredContactsCache]);
            setAuthState(prev => {
                return {
                    ...prev,
                    user : {...response.data},
                };
            });
        }
        catch (error) {
            console.log(error);
        }
    };

    const login = (email, password) => {
        setLoginLoading(true);
        axios.post(`${BASE_URL}/api/login/`, {
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
                        setLoginLoading(false);
                    }, (err) => {
                        console.log(err);
                        setAuthStateLoading(false);
                    });
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 404) {
                    Snackbar.show({
                        text: 'Email or password or both are incorrect',
                        duration: Snackbar.LENGTH_SHORT,
                    });
                }
                else {
                    Snackbar.show({
                        text: 'There was a error',
                        duration: Snackbar.LENGTH_SHORT,
                    });
                }
                setLoginLoading(false);
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
                unregisteredContacts,
            }}>
            {children}
        </Provider>
    );
};

export { AuthContext, AuthProvider, useAuth };
