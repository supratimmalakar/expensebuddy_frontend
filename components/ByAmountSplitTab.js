import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ContactDp from './ContactDp';
import { RadioButton } from 'react-native-radio-buttons-group';
import { theme } from '../utils';
import { setEqualSplit, setSplitAmount } from '../redux/expenseSlice';

const AmountSplitCard = ({ contact, currencyCode }) => {
    const { split_list } = useSelector(state => state.expense);
    const index = !(contact.unregistered) ? split_list.map(payer => payer.contact.contact_user_id).indexOf(contact.contact_user_id) : split_list.map(payer => payer.contact.phone_number).indexOf(contact.phone_number);
    const [amount, setAmount] = useState(split_list[index]?.split_by_amount?.toString() || '');
    const [amtErr, setAmtErr] = useState(false);
    const dispatch = useDispatch();
    const handleAmountChange = (text) => {
        const numericRegex = /^\d+(\.\d+)?$/;
        setAmount(text);
        if (numericRegex.test(text)) {
            dispatch(setSplitAmount({ contact, amount: parseFloat(text), type: 'BY_AMOUNT' }));
            setAmtErr(false);
        }
        else {
            dispatch(setSplitAmount({ contact, amount: null, type: 'BY_AMOUNT' }));
            setAmtErr(true);
        }
    };

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


function ByAmountSplitTab() {
    const { split_list, currency, amount } = useSelector(state => state.expense);
    var amountArray = split_list.filter(payer => payer.split_by_amount).map(payer => payer.split_by_amount);
    var totalAmount = sumOfArray(amountArray) || 0;
    var amountLeft = amount - totalAmount;
    return (
        <View style={styles.container}>
            <Text style={styles.headerText} >Split by exact amount with your buddies</Text>
            <FlatList
                data={split_list}
                renderItem={({ item: { contact }, index }) => {
                    return <AmountSplitCard contact={contact} currencyCode={currency.code} />;
                }}
                ListFooterComponent={<View style={styles.bottomBar}>
                    <Text style={[styles.bottomText, { color: 'black' }]}>{totalAmount} out of {amount} {currency.code}</Text>
                    <Text style={[styles.bottomText, { color: amountLeft < 0 ? theme.error : amountLeft === 0 ? theme.success : 'gray' }]}>{amountLeft} {currency.code} left</Text>
                </View>}
                />
        </View>
    );
}

export default ByAmountSplitTab;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    headerText: {
        fontFamily: 'Montserrat_500',
        fontSize: 14,
        marginBottom: 10,
    },
    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    bottomBar: {
        alignItems: 'center',
    },
    bottomText: {
        fontFamily: 'Montserrat_500',
    },
    payerSelectCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
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
        color: 'gray',
    },
});

