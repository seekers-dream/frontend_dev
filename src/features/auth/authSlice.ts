import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './interfaces';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

// Load initial state from localStorage
const storedData = localStorage.getItem('@seeker_user');
const initialState: AuthState = storedData
  ? JSON.parse(storedData)
  : {
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken: string;
        isAuthenticated: boolean;
      }>,
    ) {
      const { user, accessToken, refreshToken, isAuthenticated } =
        action.payload;

      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = isAuthenticated;

      // Persist authentication state to localStorage
      localStorage.setItem('@seeker_user', JSON.stringify(state));
    },
    logout(state) {
      localStorage.removeItem('@seeker_user');

      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      window.location.replace('/');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
