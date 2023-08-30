import React, { useState } from 'react'
import { Modal, View, Text, Pressable, StyleSheet, FlatList, Dimensions, TextInput, Switch, Alert } from 'react-native';
import { theme } from '../utils';
import { currency_list } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactDp from './ContactDp';
import { setIsSinglePayer, setSinglePayer, setPayerAmount } from '../redux/expenseSlice';
import { useAuth } from '../providers/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

const PayerSelectCard = ({ contact, onSelect, isChecked }) => {
    return (
        <Pressable onPress={onSelect} style={[styles.payerSelectCard, { justifyContent: 'space-between' }]} key={contact.phone_number}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <ContactDp contact={contact} />
                <Text style={{ fontFamily: 'Montserrat_500', color : 'black' }}>{contact.contact_name}</Text>
            </View>

            {isChecked && <Ionicons name="checkmark-outline" size={25} color={theme.success} />}
        </Pressable>
    );
};

const MultiplePayersCard = ({ contact, currencyCode }) => {
    const { payers } = useSelector(state => state.expense);
    const [amount, setAmount] = useState(payers[payers.map(payer => payer.contact.contact_user_id).indexOf(contact.contact_user_id)]?.amount_paid?.toString() || '');
    const [amtErr, setAmtErr] = useState(false);
    const dispatch = useDispatch();
    const handleAmountChange = (text) => {
        console.log({ payers })
        const numericRegex = /^\d+(\.\d+)?$/;
        setAmount(text);
        if (numericRegex.test(text)) {
            dispatch(setPayerAmount({ contact, amount: parseFloat(text) }));
            setAmtErr(false);
        }
        else {
            dispatch(setPayerAmount({ contact, amount: null }));
            setAmtErr(true);
        }
    }
    return (
        <View style={styles.payerSelectCard} key={contact.phone_number}>
            <View style={{ flex: 1 }}>
                <ContactDp contact={contact} />
            </View>
            <Text style={styles.payerCardText}>{contact.contact_name}</Text>
            <View style={styles.multiAmtCnt}>
                <TextInput value={amount} onChangeText={handleAmountChange} keyboardType='numeric' style={[styles.multiAmtInput, { borderColor: amtErr ? 'red' : 'black' }]} placeholder='0.00' />
                <Text style={styles.bottomText}>{currencyCode}</Text>
            </View>
        </View>
    );
};

function sumOfArray(arr) {
    return arr.reduce((accum, value) => accum + value, 0);
}

function ChoosePayerModal({ visible, onClose, user_contact_obj }) {
    const dispatch = useDispatch();
    const { contacts, is_single_payer, single_payer, payers, currency, amount } = useSelector(state => state.expense);
    var amountArray = payers.filter(payer => payer.amount_paid).map(payer => payer.amount_paid);
    var totalAmount = sumOfArray(amountArray) || 0;
    var amountLeft = amount - totalAmount;
    return (
        <Modal visible={visible}>
            <View style={styles.headerBar}>
                <Text style={styles.headerText}>Choose payer</Text>
                <Pressable onPress={() => {
                    if (!is_single_payer) {
                        if (amountLeft !== 0) {
                            Alert.alert(`All amounts don't add upto ${amount} ${currency.code}`);
                            return;
                        }
                        if (payers.filter(payer => payer.amount_paid).length === 1) {
                            Alert.alert(`Please add multiple payers`);
                            return;
                        }
                    }
                    onClose();
                }}>
                    <Text style={styles.saveBtn}>Done</Text>
                </Pressable>
            </View>
            <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                <View style={styles.switchBar}>
                    <Text style={styles.subHeaderText}>Single Payer</Text>
                    <Switch thumbColor={is_single_payer ? theme.primary : '#f4f3f4'} trackColor={{ false: '#767577', true: '#c3cdfa' }} value={is_single_payer} onValueChange={() => dispatch(setIsSinglePayer(!is_single_payer))} />
                </View>
                {contacts.length > 0 && is_single_payer &&
                    <>
                        {contacts.map(contact => {
                            return <PayerSelectCard isChecked={single_payer.contact_user_id === contact.contact_user_id} key={contact.phone_number} contact={contact} onSelect={() => { dispatch(setSinglePayer(contact)); onClose(); }} />;
                        })}
                    </>
                }

            </View>
            <View style={{ paddingHorizontal: 10}}>
                <View style={styles.switchBar}>
                    <Text style={styles.subHeaderText}>Multiple Payers</Text>
                    <Switch thumbColor={!is_single_payer ? theme.primary : '#f4f3f4'} trackColor={{ false: '#767577', true: '#c3cdfa' }} value={!is_single_payer} onValueChange={() => dispatch(setIsSinglePayer(!is_single_payer))} />
                </View>
                {contacts.length > 0 && !is_single_payer &&
                    <>
                        {contacts.map((contact, index) => {
                            return <MultiplePayersCard key={contact.contact_user_id} currencyCode={currency.code} contact={contact} />
                        })}
                        <View style={styles.bottomBar}>
                            <Text style={[styles.bottomText, {color : 'black'}]}>{totalAmount} out {amount} {currency.code}</Text>
                            <Text style={[styles.bottomText, {color : amountLeft < 0 ? theme.error : amountLeft === 0 ? theme.success : 'gray'}]}>{amountLeft} {currency.code} left</Text>
                        </View>
                    </>
                }

            </View>
        </Modal>
    );
}

export default ChoosePayerModal;

const styles = StyleSheet.create({
    subHeaderText: {
        fontFamily: 'Montserrat_400',
    },
    bottomBar: {
        alignItems: 'center',
    },
    bottomText: {
        fontFamily: 'Montserrat_500',
    },
    headerBar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    headerText: {
        fontFamily: 'Montserrat_600',
    },
    saveBtn: {
        fontFamily: 'Montserrat_500',
        color: theme.primary,
    },
    payerSelectCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    switchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    multiAmtCnt: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 2,
        gap: 5,
    },
    multiAmtInput: {
        borderBottomWidth: 0.5,
        paddingVertical: 0,
        width: 50,
    },
    payerCardText: {
        flex: 5,
        fontFamily: 'Montserrat_500',
        color: 'black',
    }
})