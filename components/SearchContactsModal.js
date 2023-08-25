import React, {useState} from 'react';
import { Modal, TextInput, StyleSheet, Dimensions, View, Pressable, FlatList, Text } from 'react-native';
import { useAuth } from '../providers/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ContactDp from './ContactDp';
import { RadioButton } from 'react-native-paper';
import { theme } from '../utils';

const screenWidth = Dimensions.get('window').width;

function SearchContactsModal({ visible, onClose }) {
    const { authState, unregisteredContacts } = useAuth();
    const { user } = authState;
    const [regResults, setRegResults] = useState([]);
    const [unregResults, setUnregResults] = useState([]);
    return (
        <Modal visible={visible}>
            <View style={styles.headerContainer}>
                <TextInput onChangeText={(text) => {
                    setRegResults([...user.buddies.filter(buddy => buddy.contact_name.toLowerCase().includes(text.toLowerCase()))]);
                    setUnregResults([...unregisteredContacts.filter(contact => contact.contact_name.toLowerCase().includes(text.toLowerCase()))])
                }} placeholder="Search Contacts" style={styles.input} />
                <Pressable style={styles.closeBtn} onPress={onClose}><Ionicons color="rgba(0,0,0,0.7)" name="close-sharp" size={30} /></Pressable>
            </View>
            <View style={styles.contactListContainer}>
                <FlatList
                    data={unregResults}
                    ItemSeparatorComponent={() => <View style={{backgroundColor : 'rgba(0,0,0,0.1)', marginHorizontal : 10 ,width : screenWidth - 20, height : 1}}/>}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.contactCard}>
                                <View style={{flexDirection : 'row', alignItems :'center', gap : 15}}>
                                    <ContactDp title={item.contact_name} />
                                    <Text style={styles.contactText}>{item.contact_name}</Text>
                                </View>
                                <RadioButton color={theme.primary} />
                            </View>
                        );
                    }} />
            </View>
        </Modal>
    );
}

export default SearchContactsModal;


const styles = StyleSheet.create({
    // closeBtn : {
    //     width: 30
    // },
    contactListContainer : {
        marginTop : 20,
    },
    contactText : {
        fontFamily : 'Montserrat_500',
    },
    contactCard: {
        marginVertical : 5,
        width: screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent : 'space-between',
        paddingHorizontal : 10
    },
    headerContainer: {
        width: screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    input: {
        height: 50,
        width: screenWidth - 60,
        borderWidth: 0,
        borderBottomWidth: 1,
        padding: 10,
        paddingBottom: 5,
        fontFamily: 'Monteserrat_500',
        borderColor: 'gray',
    },
})