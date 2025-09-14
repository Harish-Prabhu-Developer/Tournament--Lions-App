import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../Redux/Slice/authSlice';
const Store=configureStore({
    reducer:{
        auth:authReducer,
        // Add your reducers here
    },

});
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store;