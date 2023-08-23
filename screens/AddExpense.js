import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Button,
    Pressable,
    ImageBackground,
    Dimensions
} from 'react-native';
import { useAuth } from '../providers/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddExpenseScreen } from './AddExpenseScreens';

const Stack = createNativeStackNavigator();


const AddExpense = ({ navigation }) => {
    const { authState } = useAuth();
    console.log(authState);
    return (
        <Stack.Navigator screenOptions={{
            headerTitleStyle: {
                fontFamily: 'Montserrat_600',
            },
            headerShown: false,
        }}>
            <Stack.Screen
                name="Add-Expense-Main"
                component={AddExpenseScreen}
            />
        </Stack.Navigator>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: "#5170ff",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 10,
        width: 250,
        marginBottom: 30,
        height: 50
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        fontFamily: 'Montserrat_500',
        color: 'white',
    },
    header: {
        marginBottom: 40,
        fontFamily: 'Montserrat_400',
        fontSize: 18,
        color: 'rgba(0,0,0,0.6)',
    }
});
export default AddExpense;
