import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddExpenseScreen } from './AddExpenseScreens';

const Stack = createNativeStackNavigator();


const AddExpense = ({ navigation }) => {
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
};

export default AddExpense;
