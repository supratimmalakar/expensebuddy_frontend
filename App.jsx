import { StyleSheet, Dimensions } from "react-native";
import { AuthenticationContainer, StackContainer } from "./containers";
import { AuthProvider } from "./providers/auth";
import { useEffect } from "react";
import { PermissionsAndroid } from "react-native";
import Contacts from "react-native-contacts";

export default function App() {
  useEffect(() => {
    getPermissions();
  }, []);
  const getPermissions = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: "Contacts",
      message: "This app would like to view your contacts.",
      buttonPositive: "Please accept bare mortal",
    })
      .then((res) => {
        console.log("Permission: ", res);
        if (res === 'granted') {
          Contacts.getAll()
            .then((contacts) => {
              // work with contacts
              console.log(contacts);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      })
      .catch((error) => {
        console.error("Permission error: ", error);
      });
  };
  return (
    <AuthProvider>
      <StackContainer />
    </AuthProvider>
  );
}
