import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import ContactDp from './ContactDp';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { removeContact, setEqualSplit, setIsSinglePayer, setSinglePayer, setSplitType } from '../redux/expenseSlice';
import { useAuth } from '../providers/auth';
import { get_user_obj } from '../utils';


function ContactTag({ contact }) {
    const {authState : {user}} = useAuth();
    const dispatch = useDispatch();
    if (user.id === contact.contact_user_id) return null;
    return (
        <View style={styles.contactTags}>
            <ContactDp contact={contact} size={16} />
            <Text style={styles.contactTagText}>{contact.contact_name}</Text>
            <Pressable onPress={() => {
                dispatch(setSplitType('EQUALLY'));
                dispatch(setEqualSplit({ contact: get_user_obj(user), is_in_equal_split : true}));
                dispatch(setIsSinglePayer(true));
                dispatch(setSinglePayer(get_user_obj(user)));
                dispatch(removeContact(contact));
            }}>
                <Ionicons color="rgba(0,0,0,0.7)" name="close-sharp" size={25} />
            </Pressable>
        </View>
    )
}

export default ContactTag;

const styles = StyleSheet.create({
    contactTagText: {
        fontFamily: 'Montserrat_500',
        fontSize: 12,
    },
    contactTags: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        alignSelf: 'flex-start',
        gap: 5,
        paddingRight: 5,
        paddingVertical: 2,
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
})