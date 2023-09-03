import React, { useState } from 'react'
import { Modal, View, Text, Pressable, StyleSheet, FlatList, Dimensions, TextInput } from 'react-native';
import { theme } from '../utils';
import { currency_list } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {EqualSplitTab, ByAmountSplitTab, ByPercentSplitTab} from './';
import { setSplitType } from '../redux/expenseSlice';
import Snackbar from 'react-native-snackbar';

const screenWidth = Dimensions.get('window').width;

const TabSwitch = ({currTab}) => {
    switch (currTab) {
        case 0 : return <EqualSplitTab/>;
        case 1 : return <ByAmountSplitTab/>;
        case 2 : return <ByPercentSplitTab/>;
        default : return <EqualSplitTab/>;
    }
};

function sumOfArray(arr) {
    return arr.reduce((accum, value) => accum + value, 0);
}


function SplitOptionsModal({ visible, onClose }) {
    const {split_type, split_list, amount, currency} = useSelector(state => state.expense);
    var storeCurrTab = split_type === 'EQUALLY' ? 0 : split_type === 'BY_AMOUNT' ? 1 : 2;

    const dispatch = useDispatch();

    const tabs = [
        {
            title : 'Equal',
            text : '=',
            split_type : 'EQUALLY',
        },
        {
            title: 'By Amount',
            text : '1.23',
            split_type : 'BY_AMOUNT',
        },
        {
            title: 'By Percent',
            text : '%',
            split_type : 'BY_PERCENTAGE',
        },
    ];

    const handleOnClose = () => {
        if (split_type === 'EQUALLY') {
            const equal_split_arr = split_list.filter(item => item.is_in_equal_split);
            if (equal_split_arr.length > 0) {
                onClose();
            }
            else {
                Snackbar.show({
                    text: 'You must select one person to split with',
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
        }
        else if (split_type === 'BY_AMOUNT') {
            var amountArray = split_list.filter(payer => payer.split_by_amount).map(payer => payer.split_by_amount);
            var totalAmount = sumOfArray(amountArray) || 0;
            var amountLeft = amount - totalAmount;
            if (amountLeft === 0) {
                onClose();
            }
            else {
                Snackbar.show({
                    text: `Entered amounts don't add upto ${amount} ${currency.code}`,
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
        }
        else if (split_type === 'BY_PERCENTAGE') {
            var amountArray = split_list.filter(payer => payer.split_by_percent).map(payer => payer.split_by_percent);
            var totalAmount = sumOfArray(amountArray) || 0;
            var amountLeft = (Math.round((100 - totalAmount) * 100) / 100);
            if (amountLeft === 0) {
                onClose();
            }
            else {
                Snackbar.show({
                    text: 'Entered percentages don\'t add upto 100%',
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
        }
        else {
            Snackbar.show({
                text : 'There was an error',
                duration : Snackbar.LENGTH_SHORT,
            })
        }
    }

    return (
        <Modal visible={visible}>
            <View style={styles.headerBar}>
                <Text style={styles.headerText}>Split options</Text>
                <Pressable onPress={handleOnClose}>
                    <Text style={styles.saveBtn}>Done</Text>
                </Pressable>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
               <View style={styles.tabsContainer}>
                {tabs.map((tab, index) => {
                    return (
                        <Pressable key={index} onPress={() => {dispatch(setSplitType(tab.split_type))}} style={[styles.tab, {backgroundColor : storeCurrTab === index ? theme.primary : 'white'}]}>
                            <Text style={[styles.tabText, { color: storeCurrTab === index ? '#fff' : 'gray' }]}>{tab.text}</Text>
                        </Pressable>
                    );
                })}
               </View>
                <TabSwitch currTab={storeCurrTab}/>
            </View>
        </Modal>
    );
}

export default SplitOptionsModal;

const styles = StyleSheet.create({
    tabsContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        gap : screenWidth / 7,
    },
    tab : {
        borderWidth : 1,
        elevation : 5,
        borderColor : 'rgba(0,0,0,0.4)',
        borderRadius : 2,
        flex : 1,
        alignItems : 'center',
    },
    tabText : {
        fontFamily : 'Montserrat_800',
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
})