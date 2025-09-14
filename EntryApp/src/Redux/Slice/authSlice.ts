import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';              // <-- correct import
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../Config/Constants';

interface AuthState {
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
};

type LoginPayload = {
  success: boolean;
  message: string;
  token?: string;
};

type RejectPayload = {
  success: false;
  message: string;
  status?: number;
};

export const login = createAsyncThunk<
  LoginPayload,
  { email: string; password: string },
  { rejectValue: RejectPayload }
>(
  'tournaments/auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/tournaments/auth/login`, credentials);
      console.log('Login Response in Redux:', res.data);

      // If backend returns no token (even with 200), treat it as a failure
      if (!res.data?.token) {
        const serverMsg: string = res.data?.msg || '';
        let friendly = serverMsg || 'Login failed';

        if (serverMsg === 'password mismatch') friendly = 'Password Incorrect';
        else if (serverMsg === 'User not found')
          friendly = 'Sorry, this user is not available. Please contact Admin.';
        else if (serverMsg === 'Server error') friendly = 'Server Down';

        return rejectWithValue({ success: false, message: friendly, status: res.status });
      }

      const token: string = res.data.token;
      const decoded = jwtDecode(token); // decode for storing user info
      // persist token/user BEFORE returning success
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(decoded));

      return {
        success: true,
        message: res.data?.msg || 'Login successful',
        token,
      };
    } catch (error: any) {
      // Network (no response)
      if (!error.response) {
        console.log('Network Error: Server unreachable.');
        return rejectWithValue({ success: false, message: 'Network Error: Server unreachable.' });
      }

      const serverMsg: string = error.response.data?.msg || '';
      let friendly = serverMsg || 'Login failed';

      if (serverMsg === 'password mismatch') friendly = 'Password Incorrect';
      else if (serverMsg === 'User not found')
        friendly = 'Sorry, this user is not available. Please contact Admin.';
      else if (error.response.status >= 500) friendly = 'Server Down';

      return rejectWithValue({ success: false, message: friendly, status: error.response.status });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // token & storage already handled inside the thunk
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        // action.payload is the rejectWithValue object when used
        state.error =
          (action.payload as RejectPayload)?.message ||
          action.error?.message ||
          'Login failed';
      });
  },
});

export default authSlice.reducer;
