import { createSlice } from '@reduxjs/toolkit';
import { useAuth } from '../providers/auth';

export const expenseSlice = createSlice({
    name: 'expense',
    initialState: {
        contacts: [],
        category : {
            title: 'Uncategorized',
            color: '#ffffff',
            sub_category : {
                title: 'General',
                iconTitle: 'document-text-outline',
            },
        },
        currency: { name: 'Indian Rupee', code: 'INR' },
        is_single_payer : true,
        single_payer : null ,
        payers: [],
        amount : null,
        split_type : 'EQUALLY', //'EQUALLY', 'BY_AMOUNT', 'BY_PERCENTAGE'
        split_list : [],
    },
    reducers: {
        addContact: (state, action) => {
            const index = state.contacts.map(contact => contact.phone_number).indexOf(action.payload.phone_number);
            if (index <= -1) {
                state.contacts = [...state.contacts, action.payload];
                state.split_list = [
                    ...state.split_list,
                    {
                        contact : action.payload,
                        is_in_equal_split : true,
                        split_by_amount : null,
                        split_by_percent : null,
                    },
                ];
                state.payers = [...state.payers, {contact : action.payload, amount_paid : null}];
            }
        },
        removeContact: (state, action) => {
            const toDeleteIndex = state.contacts.map(contact => contact.phone_number).indexOf(action.payload.phone_number);
            if (toDeleteIndex > -1) {
                var copy = state.contacts;
                var split_copy = state.split_list;
                var payers_copy = state.payers;
                copy.splice(toDeleteIndex, 1);
                split_copy.splice(toDeleteIndex, 1);
                payers_copy.splice(toDeleteIndex, 1);
                state.contacts = [...copy];
                state.split_list = [...split_copy];
                state.payers = [...payers_copy];
            }
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setCurrency: (state, action) => {
            state.currency = action.payload;
        },
        setIsSinglePayer : (state, action) => {
            state.is_single_payer = action.payload;
        },
        setSinglePayer : (state, action) => {
            state.is_single_payer = true;
            state.single_payer = action.payload;
        },
        addPayer: (state, action) => {
            state.payers = [...state.payers, action.payload];
        },
        removePayer: (state, action) => {
            const toDeleteIndex = state.payers.map(payer => payer.phone_number).indexOf(action.payload.phone_number);
            if (toDeleteIndex > -1) {
                var copy = state.payers;
                copy.splice(toDeleteIndex, 1);
                state.payers = [...copy];
            }
            else {
                state.payers = state.payers;
            }
        },
        setPayerAmount : (state, action) => {
            const {contact, amount} = action.payload;
            const indexOfContact = !(contact.unregistered) ? state.payers.map(item => item.contact.contact_user_id).indexOf(contact.contact_user_id) : state.payers.map(item => item.contact.phone_number).indexOf(contact.phone_number);
            if (indexOfContact > -1) {state.payers[indexOfContact].amount_paid = amount;}
        },
        setAmount : (state, action) => {
            state.amount = action.payload;
        },
        setSplitAmount : (state, action) => {
            const { contact, amount, type } = action.payload; //type can be either 'BY_AMOUNT' or 'BY_PERCENTAGE'
            const indexOfContact = !(contact.unregistered) ? state.split_list.map(item => item.contact.contact_user_id).indexOf(contact.contact_user_id) : state.split_list.map(item => item.contact.phone_number).indexOf(contact.phone_number);
            if (indexOfContact > -1) {
                if (type === 'BY_AMOUNT') {
                    state.split_list[indexOfContact].split_by_amount = amount;
                }
                else if (type === 'BY_PERCENTAGE') {
                    state.split_list[indexOfContact].split_by_percent = amount;
                }
                else {
                    state.split_list[indexOfContact].split_by_amount = amount;
                }
            }
        },
        setEqualSplit : (state, action) => {
            const { contact, is_in_equal_split } = action.payload;
            const indexOfContact = !(contact.unregistered) ? state.split_list.map(item => item.contact.contact_user_id).indexOf(contact.contact_user_id) : state.split_list.map(item => item.contact.phone_number).indexOf(contact.phone_number);
            if (indexOfContact > -1) {
                state.split_list[indexOfContact].is_in_equal_split = is_in_equal_split;
            }
        },
        setSplitType : (state, action) => {
            state.split_type = action.payload;
        },
    },
});

export const { addContact, removeContact, setCategory, setCurrency, addPayer, removePayer, setIsSinglePayer, setAmount, setSinglePayer, setPayerAmount, setSplitAmount, setEqualSplit, setSplitType } = expenseSlice.actions;

export default expenseSlice.reducer;
