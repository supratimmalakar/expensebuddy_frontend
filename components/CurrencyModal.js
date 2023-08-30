import React, {useState} from 'react'
import { Modal, View, Text, Pressable, StyleSheet, FlatList, Dimensions, TextInput } from 'react-native';
import { theme } from '../utils';
import { currency_list } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency } from '../redux/expenseSlice';

const screenWidth = Dimensions.get('window').width

function CurrencyModal({ visible, onClose }) {
    const dispatch = useDispatch();
    const {currency} = useSelector(state => state.expense)
    const [searchText, setSearchText] = useState('');
    const [filtered, setFiltered] = useState([...currency_list])

    const searchFilterFunction = (text, data, setData) => {
        if (text) {
            const newData = data.filter(item => {
                const itemData1 = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const itemData2 = item.code ? item.code.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                if (text.length <= 2 && text.length > 0) {
                    return itemData1.indexOf(textData) === 0 || itemData2.indexOf(textData) === 0;
                }
                else {
                    return itemData1.indexOf(textData) > -1 || itemData2.indexOf(textData) > -1;
                }
            });
            setData(newData);
        } else {
            setData([...currency_list]);
        }
    };
    return (
        <Modal visible={visible}>
            <View style={styles.headerBar}>
                <Text style={styles.headerText}>Currency</Text>
                <Pressable onPress={onClose}>
                    <Text style={styles.saveBtn}>Cancel</Text>
                </Pressable>
            </View>
            <View style={styles.headerContainer}>
                <TextInput value={searchText} onChangeText={(text) => {
                    setSearchText(text);
                    searchFilterFunction(text, currency_list, setFiltered);
                }} placeholder="Search Contacts" style={styles.input} />
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <FlatList
                    // ItemSeparatorComponent={Separator}
                    data={filtered}
                    renderItem={({ item }) => {
                        return (
                            <Pressable onPress={() => {
                                dispatch(setCurrency({ name: item.name, code: item.code }));
                                onClose();
                            }} style={[styles.currencyCard, { backgroundColor: item.code === currency.code ? 'rgba(0,0,0,0.08)' :'rgba(0,0,0,0.02)', }]}>
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
        paddingVertical : 10,
        paddingLeft : 5,
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
    headerContainer: {
        width: screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        marginBottom : 10,
    },
    input: {
        height: 50,
        width: screenWidth - 20,
        borderWidth: 0,
        borderBottomWidth: 1,
        padding: 10,
        paddingBottom: 5,
        paddingLeft : 0,
        fontFamily: 'Montserrat_500',
        borderColor: 'gray',
    },
})