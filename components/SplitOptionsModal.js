import React, { useState } from 'react'
import { Modal, View, Text, Pressable, StyleSheet, FlatList, Dimensions, TextInput } from 'react-native';
import { theme } from '../utils';
import { currency_list } from '../constants';
import { useDispatch, useSelector } from 'react-redux';

const screenWidth = Dimensions.get('window').width;

function SplitOptionsModal({ visible, onClose }) {
    const dispatch = useDispatch();

    return (
        <Modal visible={visible}>
            <View style={styles.headerBar}>
                <Text style={styles.headerText}>Split options</Text>
                <Pressable onPress={onClose}>
                    <Text style={styles.saveBtn}>Cancel</Text>
                </Pressable>
            </View>
            <View style={{ paddingHorizontal: 10 }}>


            </View>
        </Modal>
    );
}

export default SplitOptionsModal;

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
})