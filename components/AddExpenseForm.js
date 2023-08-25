import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, Pressable, Text } from 'react-native';
import {  useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CategoryModal from './CategoryModal';
import CurrencyModal from './CurrencyModal';

function AddExpenseForm() {
    const {category, currency} = useSelector(state => state.expense);
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [currencyVisible, setCurrencyVisible] = useState(false);
  return (
    <View>
        <View style={styles.inputRow}>
            <Pressable onPress={() => setCategoryVisible(true)} style={{backgroundColor : category.color, ...styles.icon}}>
                <Ionicons name={category.sub_category.iconTitle} size={35} color={category.color === "#ffffff" && "black"}/>
            </Pressable>
            <TextInput style={styles.input} placeholder='Enter a description'/>
        </View>
          <View style={styles.inputRow}>
              <Pressable onPress={() => setCurrencyVisible(true)} style={{ backgroundColor: category.color, ...styles.icon }}>
                  <Text style={styles.currencyText}>{currency.code}</Text>
              </Pressable>
              <TextInput style={styles.input} placeholder='Enter Amount' />
          </View>
          <CategoryModal visible={categoryVisible} onClose={() => setCategoryVisible(false)}/>
          <CurrencyModal visible={currencyVisible} onClose={() => setCurrencyVisible(false)} />
    </View>
  )
}

export default AddExpenseForm;

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    currencyText : {
        fontFamily : 'Montserrat_600'
    },
    icon : {
        width: 50,
        height: 50,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 5,
        borderWidth : 1,
        borderColor : "rgba(0,0,0,0.2)",
    },
    inputRow : {
        flexDirection : 'row',
        alignItems : 'flex-end',
        gap: 10,
        marginBottom : 10,
    },
    input : {
        borderBottomWidth : 0.5,
        width: screenWidth * 0.6,
        fontFamily : 'Montserrat_400',
    }
});
