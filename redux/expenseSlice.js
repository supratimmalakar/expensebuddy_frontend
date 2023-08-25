import { createSlice } from '@reduxjs/toolkit';

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
    },
});

export const { addContact, removeContact, setCategory, setCurrency } = expenseSlice.actions;

export default expenseSlice.reducer;
