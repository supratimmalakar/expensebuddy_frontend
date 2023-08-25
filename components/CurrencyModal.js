import React from 'react'
import { Modal, View, Text, Pressable, StyleSheet, FlatList, Dimensions } from 'react-native';
import { theme } from '../utils';
import { currency_list } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { setCurrency } from '../redux/expenseSlice';

const screenWidth = Dimensions.get('window').width

function CurrencyModal({ visible, onClose }) {
    const dispatch = useDispatch();
    return (
        <Modal visible={visible}>
            <View style={styles.headerBar}>
                <Text style={styles.headerText}>Currency</Text>
                <Pressable onPress={onClose}>
                    <Text style={styles.saveBtn}>Cancel</Text>
                </Pressable>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <FlatList
                    // ItemSeparatorComponent={Separator}
                    data={currency_list}
                    renderItem={({ item }) => {
                        return (
                            <Pressable onPress={() => {
                                dispatch(setCurrency({ name: item.name, code: item.code }));
                                onClose();
                            }} style={styles.currencyCard}>
                                <Text style={styles.currencyLabel}>{item.name}</Text>
                                <Text style={styles.currencyCode}>{item.code}</Text>
                            </Pressable>
                        )
                    }} />

            </View>
        </Modal>
    );
}

export default CurrencyModal;

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
        color: theme.primary
    },
    currencyCard: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
        justifyContent : 'space-between',
        gap: 15,
        backgroundColor: 'rgba(0,0,0,0.02)',
        paddingVertical : 10,
    },
    icon: {
        padding: 5,
    },
    currencyLabel: {
        flex : 7,
        fontFamily: 'Montserrat_500',
        color: 'black',
    },
    currencyCode: {
        flex : 1,
        fontFamily: 'Montserrat_400',
    },
})