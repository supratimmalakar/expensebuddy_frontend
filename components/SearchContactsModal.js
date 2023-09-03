/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Modal, TextInput, StyleSheet, Dimensions, View, Pressable, FlatList, Text, ScrollView } from 'react-native';
import { useAuth } from '../providers/auth';
import ContactDp from './ContactDp';
import { get_user_obj, theme } from '../utils';
import { RadioButton } from 'react-native-radio-buttons-group';
import ContactTag from './ContactTag';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, removeContact, setIsSinglePayer, setSinglePayer, setSplitType, setEqualSplit } from '../redux/expenseSlice';

const screenWidth = Dimensions.get('window').width;

const ListHeader = ({ title, isVisible }) => {
    if (!isVisible) {return null;}
    return <Text style={{ fontFamily: 'Montserrat_600', paddingHorizontal: 10, marginVertical: 10 }}>{title}</Text>;
};

function SearchContactsModal({ visible, onClose }) {
    const { authState, unregisteredContacts } = useAuth();
    const { user } = authState;
    const [regResults, setRegResults] = useState([...user.buddies]);
    const [unregResults, setUnregResults] = useState([]);
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();
    const { contacts: selectedContacts } = useSelector(state => state.expense);


    const searchFilterFunction = (text, data, setData, showDefaultListonEmpty) => {
        if (text) {
            const newData = data.filter(item => {
                const itemData = item.contact_name ? item.contact_name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                if (text.length <= 2 && text.length > 0) {
                    return itemData.indexOf(textData) === 0;
                }
                else {
                    return itemData.indexOf(textData) > -1;
                }
            });
            setData(newData);
        } else {
            if (showDefaultListonEmpty) {
                setData([...data]);
            }
            else {
                setData([]);
            }
        }
    };
    const handleContactCardOnPress = (contact, isSelected) => {
        if (!isSelected) {
            dispatch(addContact(contact));
        }
        else {
            dispatch(setSplitType('EQUALLY'));
            dispatch(setEqualSplit({ contact: get_user_obj(user), is_in_equal_split: true }));
            dispatch(setIsSinglePayer(true));
            dispatch(setSinglePayer(get_user_obj(user)));
            dispatch(removeContact(contact));
        }
    };

    const UnregContactsFlatList = () => {
        return (
            <View>
                <FlatList
                    data={unregResults}
                    ListHeaderComponent={<ListHeader title="From your contacts" isVisible={unregResults.length > 0} />}
                    ItemSeparatorComponent={() => <View style={{ backgroundColor: 'rgba(0,0,0,0.1)', marginHorizontal: 10, width: screenWidth - 20, height: 1 }} />}
                    renderItem={({ item, index }) => {
                        const isSelected = selectedContacts.some(contact => contact.phone_number === item.phone_number);
                        return (
                            <View style={styles.contactCard}>
                                <View style={{ flex: 1 }}>
                                    <ContactDp contact={item} />
                                </View>
                                <View style={{ flex: 5 }}>
                                    <Text style={{ fontFamily: 'Montserrat_600' }}>{item.contact_name}</Text>
                                    <Text style={{ fontFamily: 'Montserrat_400' }}>{item.phone_number}</Text>
                                </View>
                                <RadioButton
                                    id={index}
                                    selected={isSelected}
                                    color={theme.primary}
                                    onPress={() => handleContactCardOnPress(item, isSelected)} />
                            </View>
                        );
                    }} />
            </View>
        );
    };
    return (
        <Modal visible={visible}>
            {/* <ScrollView> */}
            <View style={styles.headerBar}>
                <Text style={styles.headerText}>Contacts</Text>
                <Pressable onPress={onClose}>
                    <Text style={styles.saveBtn}>Save</Text>
                </Pressable>
            </View>
            <View style={styles.headerContainer}>
                <TextInput value={searchText} onChangeText={(text) => {
                    setSearchText(text);
                    searchFilterFunction(text, user.buddies, setRegResults, true);
                    searchFilterFunction(text, unregisteredContacts, setUnregResults);
                }} placeholder="Search Contacts" style={styles.input} />
            </View>
                {selectedContacts.length > 0 &&
                    <View style={styles.contactTagsContainer}>
                        {selectedContacts.map((contact, index) => {
                            return (
                                <ContactTag key={contact.phone_number} contact={contact} />
                            );
                        })}
                    </View>}

                <FlatList
                    ListHeaderComponent={<ListHeader title="Friends on ExpenseBuddy" isVisible={regResults.length > 0} />}
                    ListFooterComponent={<UnregContactsFlatList/>}
                    data={regResults}
                    ItemSeparatorComponent={() => <View style={{ backgroundColor: 'rgba(0,0,0,0.1)', marginHorizontal: 10, width: screenWidth - 20, height: 1 }} />}
                    renderItem={({ item, index }) => {
                        const isSelected = selectedContacts.some(contact => contact.phone_number === item.phone_number);
                        return (
                            <View style={styles.contactCard}>
                                <View style={{ flex: 1 }}>
                                    <ContactDp contact={item} />
                                </View>
                                <Text style={styles.contactText}>{item.contact_name}</Text>
                                <RadioButton
                                    id={index}
                                    selected={isSelected}
                                    color={theme.primary}
                                    onPress={() => handleContactCardOnPress(item, isSelected)} />
                            </View>
                        );
                    }} />



            {/* </ScrollView> */}
        </Modal>
    );
}

export default SearchContactsModal;


const styles = StyleSheet.create({
    // closeBtn : {
    //     width: 30
    // },
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
    contactTagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        paddingHorizontal: 10,
        paddingBottom: 15,
    },
    contactListContainer: {
        marginTop: 20,
    },
    contactText: {
        fontFamily: 'Montserrat_500',
        flex: 5,
    },
    contactCard: {
        marginVertical: 5,
        width: screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    headerContainer: {
        width: screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        marginBottom : 20,
    },
    input: {
        height: 50,
        width: screenWidth - 20,
        borderWidth: 0,
        borderBottomWidth: 1,
        padding: 10,
        paddingLeft: 0,
        paddingBottom: 5,
        fontFamily: 'Montserrat_500',
        borderColor: 'gray',
    },
});
