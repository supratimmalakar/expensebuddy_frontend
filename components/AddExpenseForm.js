import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, Pressable, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CategoryModal from './CategoryModal';
import CurrencyModal from './CurrencyModal';
import ChoosePayerModal from './ChoosePayerModal';
import SplitOptionsModal from './SplitOptionsModal';
import { useAuth } from '../providers/auth';
import { setSinglePayer } from '../redux/expenseSlice';

function AddExpenseForm() {
    const { category, currency, payers, is_single_payer, single_payer } = useSelector(state => state.expense);
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [currencyVisible, setCurrencyVisible] = useState(false);
    const [choosePayerVisible, setChoosePayerVisible] = useState(false);
    const [splitOptionsVisible, setSplitOptionsVisible] = useState(false);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const {authState : {user}} = useAuth();
    const dispatch = useDispatch();
    const user_contact_obj = {
        contact_name: `${user.first_name} ${user.last_name} (you)`,
        phone_number: user.phone_number,
        is_user: true,
        contact_user_id : user.id,
    };
    useEffect(() => {
        dispatch(setSinglePayer(user_contact_obj));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <View style={styles.expenseFormContainer}>
            <View style={styles.inputRow}>
                <Pressable onPress={() => setCategoryVisible(true)} style={{ backgroundColor: category.color, ...styles.icon }}>
                    <Ionicons name={category.sub_category.iconTitle} size={35} color={category.color === "#ffffff" && "black"} />
                </Pressable>
                <TextInput value={description} onChangeText={(text) => {
                    if (text.length < 150) {
                        setDescription(text);
                    }
                }}
                    style={styles.input}
                    placeholder='Enter a description' />
            </View>
            <View style={styles.inputRow}>
                <Pressable onPress={() => setCurrencyVisible(true)} style={{ backgroundColor: category.color, ...styles.icon }}>
                    <Text style={styles.currencyText}>{currency.code}</Text>
                </Pressable>
                <TextInput value={amount} onChangeText={(text) => setAmount(text)}
                    keyboardType='numeric'
                    style={styles.input}
                    placeholder='Enter Amount' />
            </View>
            <View style={styles.splitBar}>
                <Text style={styles.splitText}>Paid by </Text>
                <Pressable
                    onPress={() => setChoosePayerVisible(true)}
                    style={styles.splitBtn}>
                    <Text style={styles.splitText}>
                        {is_single_payer ? single_payer?.contact_user_id === user.id ? 'you' : single_payer?.contact_name : `${payers.length} people` }
                    </Text>
                </Pressable>
                <Text style={styles.splitText}> and split </Text>
                <Pressable
                    onPress={() => setSplitOptionsVisible(true)}
                    style={styles.splitBtn}>
                    <Text style={styles.splitText}>
                        equally
                    </Text>
                </Pressable>
            </View>
            <CategoryModal visible={categoryVisible} onClose={() => setCategoryVisible(false)} />
            <CurrencyModal visible={currencyVisible} onClose={() => setCurrencyVisible(false)} />
            <ChoosePayerModal visible={choosePayerVisible} onClose={() => setChoosePayerVisible(false)} user_contact_obj={user_contact_obj}/>
            <SplitOptionsModal visible={splitOptionsVisible} onClose={() => setSplitOptionsVisible(false)} />
        </View>
    )
}

export default AddExpenseForm;

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    splitBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    splitText: {
        fontFamily: 'Montserrat_600',
    },
    currencyText: {
        fontFamily: 'Montserrat_600',
    },
    expenseFormContainer: {
        alignItems: 'center',
    },
    icon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 10,
        marginBottom: 10,
    },
    input: {
        borderBottomWidth: 0.5,
        width: screenWidth * 0.6,
        fontFamily: 'Montserrat_400',
    },
    splitBtn: {
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: 'rgba(0,0,0,0.2)',
        padding: 5,
        paddingTop: 4,
        backgroundColor: 'white',
    }
});
