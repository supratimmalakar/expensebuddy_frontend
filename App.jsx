import { StyleSheet, Dimensions } from 'react-native';
import { AuthenticationContainer, StackContainer } from './containers';
import { AuthProvider } from './providers/auth';
import { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

export const CONTACTS_PERM_GRANTED_KEY = 'contacts-perm-granted';

export const BASE_URL = 'http://localhost:8000';

export default function App() {
  useEffect(() => {
    getPermissions();
  }, []);
  const getPermissions = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'ExpenseBuddy would like to access your contacts.',
      buttonPositive: 'Allow Access',
    })
      .then(async (res) => {
        console.log('Permission: ', res);
        if (res === 'granted') {
          await RNSecureStorage.set(CONTACTS_PERM_GRANTED_KEY, 'true', {
            accessible: ACCESSIBLE.ALWAYS,
          });
        } else {
          await RNSecureStorage.set(CONTACTS_PERM_GRANTED_KEY, 'false', {
            accessible: ACCESSIBLE.ALWAYS,
          });
        }
      })
      .catch(async (error) => {
        console.error('Permission error: ', error);
        await RNSecureStorage.set(CONTACTS_PERM_GRANTED_KEY, "false", {
          accessible: ACCESSIBLE.ALWAYS,
        });
      });
  };
  return (
    <AuthProvider>
      <StackContainer />
    </AuthProvider>
  );
}
