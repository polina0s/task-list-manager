import { createSlice } from '@reduxjs/toolkit';

import { loginUser, registerUser } from './user.thunk';

const initialState = { isLogged: false, login: '', isLoading: false };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state) {
      state.isLogged = true;
    },
    logout(state) {
      state.isLogged = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogged = true;
      state.login = action.payload?.data?.user?.login ?? '';
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogged = true;
      state.login = action.payload?.data?.user?.login ?? '';
    });
  },
});

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
