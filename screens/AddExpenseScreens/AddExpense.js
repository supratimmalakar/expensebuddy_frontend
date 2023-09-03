import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Pressable,
    ImageBackground,
    Dimensions,
    ScrollView,
} from 'react-native';
import { useAuth } from '../../providers/auth';
import { ContactTag, SearchContactsModal, AddExpenseForm } from '../../components';
import { theme } from '../../utils';
import { useSelector, useDispatch } from 'react-redux';


const AddExpense = ({ navigation }) => {
    const dispatch = useDispatch();
    const [contactSearchModalVisible, setContactSearchModalVisible] = useState(false)
    const { authState : {user} } = useAuth();
    const { contacts: selectedContacts } = useSelector(state => state.expense)
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ImageBackground style={{ flex: 1, width: Dimensions.get('window').width }} source={require('../../assets/layered-waves-2.png')}>
                <View style={styles.subContainer}>
                    <View style={styles.headerBar}>
                        {/* <Pressable style={{opacity : 0}}>
                            <Ionicons color="rgba(0,0,0,0.7)" name="close-sharp" size={25} />
                        </Pressable> */}
                        <Text style={styles.headerText}>Add an expense</Text>
                        <Pressable>
                            <Text style={styles.saveBtn}>Save</Text>
                        </Pressable>
                    </View>
                    <View style={styles.addPeopleBar}>
                        <Text style={styles.addPeopleBarText}>With <Text style={{ fontFamily: 'Montserrat_700' }}>you</Text> and:  </Text>
                        {selectedContacts.length > 0 && selectedContacts.map((contact, index) => <ContactTag key={contact.phone_number} contact={contact} />)}
                        <TouchableOpacity onPress={() => setContactSearchModalVisible(true)} activeOpacity={0.4} style={styles.addPeopleBtn}><Image style={{ width: 35, height: 35 }} source={require('../../assets/add-circle.png')} /></TouchableOpacity>
                    </View>
                    <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                        <AddExpenseForm />
                    </View>
                </View>
            </ImageBackground>
            <SearchContactsModal visible={contactSearchModalVisible} onClose={() => setContactSearchModalVisible(false)} />
        </ScrollView>
    );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: screenWidth,
        justifyContent: "center",
        alignItems: "center",
    },
    subContainer: {
        flex: 1,
        justifyContent: 'start',
        alignItems: 'center',
    },
    input: {
        height: 50,
        width: screenWidth,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 20
    },
    button: {
        backgroundColor: theme.primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 10,
        width: 250,
        marginBottom: 30,
        height: 50
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        fontFamily: 'Montserrat_500',
        color: 'white',
    },
    header: {
        marginBottom: 40,
        fontFamily: 'Montserrat_400',
        fontSize: 18,
        color: 'rgba(0,0,0,0.6)',
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
    },
    addPeopleBar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
        gap: 5,
        borderBottomWidth: 1,
        paddingBottom: 6,
        borderColor: 'rgba(0,0,0,0.08)',
    },
    addPeopleBarText: {
        fontFamily: 'Montserrat_400',

    },
    addPeopleBtn: {
        backgroundImage: 'linear-gradient(to bottom, #ff0000, #0000ff)',
    }
});
export default AddExpense;
