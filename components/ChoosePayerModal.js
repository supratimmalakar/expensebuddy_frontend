import React, { useState } from 'react'
import { Modal, View, Text, Pressable, StyleSheet, FlatList, Dimensions, TextInput, Switch } from 'react-native';
import { theme } from '../utils';
import { currency_list } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactDp from './ContactDp';
import { setIsSinglePayer, setSinglePayer } from '../redux/expenseSlice';
import { useAuth } from '../providers/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

const PayerSelectCard = ({ contact, onSelect, isChecked }) => {
    return (
        <Pressable onPress={onSelect} style={[styles.payerSelectCard, {justifyContent : 'space-between'}]} key={contact.phone_number}>
            <View style={{flexDirection : 'row', alignItems : 'center', gap : 5}}>
                <ContactDp contact={contact} />
                <Text style={{fontFamily : 'Montserrat_500'}}>{contact.contact_name}</Text>
            </View>

            {isChecked && <Ionicons name="checkmark-outline" size={30} />}
        </Pressable>
    );
};

const MultiplePayersCard = ({ contact, currencyCode }) => {
    return (
        <View style={styles.payerSelectCard} key={contact.phone_number}>
            <View style={{ flex: 1 }}>
                <ContactDp contact={contact} />
            </View>
            <Text style={styles.payerCardText}>{contact.contact_name}</Text>
            <View style={styles.multiAmtCnt}>
                <TextInput style={styles.multiAmtInput} placeholder='0.00' />
                <Text>{currencyCode}</Text>
            </View>
        </View>
    );
};

function ChoosePayerModal({ visible, onClose, user_contact_obj }) {
    const dispatch = useDispatch();
    const { contacts, is_single_payer, single_payer, payers, currency } = useSelector(state => state.expense);
    console.log(single_payer)
    return (
        <Modal visible={visible}>
            <View style={styles.headerBar}>
                <Text style={styles.headerText}>Choose payer</Text>
                <Pressable onPress={onClose}>
                    <Text style={styles.saveBtn}>Done</Text>
                </Pressable>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <View style={styles.switchBar}>
                    <Text>Single Payer</Text>
                    <Switch value={is_single_payer} onValueChange={() => dispatch(setIsSinglePayer(!is_single_payer))} />
                </View>
                {contacts.length > 0 && is_single_payer &&
                    <>
                        <PayerSelectCard isChecked={single_payer.contact_user_id === user_contact_obj.contact_user_id} contact={user_contact_obj} onSelect={() => { dispatch(setSinglePayer(user_contact_obj)); onClose(); }} />
                        {contacts.map(contact => {
                            return <PayerSelectCard isChecked={single_payer.contact_user_id === contact.contact_user_id} key={contact.phone_number} contact={contact} onSelect={() => { dispatch(setSinglePayer(contact)); onClose(); }} />;
                        })}
                    </>
                }

            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <View style={styles.switchBar}>
                    <Text>Multiple Payers</Text>
                    <Switch value={!is_single_payer} onValueChange={() => dispatch(setIsSinglePayer(!is_single_payer))} />
                </View>
                {contacts.length > 0 && !is_single_payer &&
                    <>
                        <MultiplePayersCard  currencyCode={currency.code} contact={user_contact_obj} />
                        {contacts.map(contact => {
                            return <MultiplePayersCard key={contact.contact_user_id} currencyCode={currency.code} contact={contact} />;
                        })}
                    </>
                }

            </View>
        </Modal>
    );
}

export default ChoosePayerModal;

const styles = StyleSheet.create({
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
    },
    switchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    multiAmtCnt: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 2,
        gap : 5,
    },
    multiAmtInput: {
        borderBottomWidth : 0.5,
        paddingVertical : 0,
        width: 50,
    },
    payerCardText: {
        flex: 5,
        fontFamily: 'Montserrat_500',
    }
})