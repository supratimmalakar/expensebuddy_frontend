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
    },
    reducers: {
        addContact: (state, action) => {
            state.contacts = [...state.contacts, action.payload];
        },
        removeContact: (state, action) => {
            const toDeleteIndex = state.contacts.map(contact => contact.phone_number).indexOf(action.payload.phone_number);
            if (toDeleteIndex > -1) {
                var copy = state.contacts;
                copy.splice(toDeleteIndex, 1);
                state.contacts = [...copy];
            }
            else {
                state.contacts = state.contacts;
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
            if (!action.payload)  {
                state.payers = state.contacts.map(contact => ({
                    contact : contact,
                    amount_paid : null,
                }));
            }
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
            console.log(amount);
            const indexOfContact = state.payers.map(item => item.contact.contact_user_id).indexOf(contact.contact_user_id);
            if (indexOfContact > -1) {state.payers[indexOfContact].amount_paid = amount;}
        },
        setAmount : (state, action) => {
            state.amount = action.payload;
        },
    },
});

export const { addContact, removeContact, setCategory, setCurrency, addPayer, removePayer, setIsSinglePayer, setAmount, setSinglePayer, setPayerAmount } = expenseSlice.actions;

export default expenseSlice.reducer;
