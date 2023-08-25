import { configureStore } from '@reduxjs/toolkit';
import expenseSlice from './expenseSlice';

export default configureStore({
    reducer: {
        expense : expenseSlice,
    },
});
