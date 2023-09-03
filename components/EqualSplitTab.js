import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ContactDp from './ContactDp';
import { RadioButton } from 'react-native-radio-buttons-group';
import { theme } from '../utils';
import { setEqualSplit } from '../redux/expenseSlice';


const EqualSplitCard = ({ contact, index }) => {
  const dispatch = useDispatch();
  const { split_list } = useSelector(state => state.expense);
  const indexOfContact = !(contact.unregistered) ? split_list.map(item => item.contact.contact_user_id).indexOf(contact.contact_user_id) : split_list.map(item => item.contact.phone_number).indexOf(contact.phone_number);
  const isSelected = split_list[indexOfContact].is_in_equal_split;
  const handlePress = () => {
    if (!isSelected) {
      dispatch(setEqualSplit({ contact, is_in_equal_split: true }));
    }
    else {
      dispatch(setEqualSplit({ contact, is_in_equal_split: false }));
    }
  }
  return (
    <Pressable onPress={handlePress} style={styles.contactCard} key={contact.phone_number}>
      <View style={{ flex: 1 }}>
        <ContactDp contact={contact} />
      </View>
      <Text style={[{ flex: 5 }, { fontFamily: isSelected ? 'Montserrat_600' : 'Montserrat_400' }]}>{contact.contact_name}</Text>
      <View style={{ flex: 1 }}>
        <RadioButton onPress={handlePress} id={index} color={theme.primary} selected={isSelected} />
      </View>
    </Pressable>
  );
};

function EqualSplitTab() {
  const { split_list, amount, currency } = useSelector(state => state.expense);
  var split_by = split_list.filter(item => item.is_in_equal_split).length;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText} >Split equally with your buddies</Text>
      <FlatList
        data={split_list}
        renderItem={({ item: { contact }, index }) => {
          return <EqualSplitCard contact={contact} index={index} />;
        }}
        ListFooterComponent={
          <View style={styles.bottomBar}>
            {split_by > 0 ?
              <>
                <Text style={[styles.bottomText, { color: 'black' }]}>{(Math.round((amount / split_by) * 100) / 100).toFixed(2)} {currency.code}/person</Text>
                <Text style={styles.bottomText}>({split_by} people)</Text>
              </>
              :
              <Text style={[styles.bottomText, {color : theme.error}]}>You must select one person to split with</Text>
            }

          </View>}
      />
    </View>
  );
}

export default EqualSplitTab;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  headerText: {
    fontFamily: 'Montserrat_500',
    fontSize: 14,
    marginBottom : 10,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bottomBar: {
    alignItems: 'center',
  },
  bottomText: {
    fontFamily: 'Montserrat_500',
  },
});
