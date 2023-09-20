import { createSlice } from '@reduxjs/toolkit';

import { logout } from './user.actions';
import { getUserById, loginUser, registerUser } from './user.thunk';

const initialState = { isLogged: false, login: '', isLoading: false };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state) {
      state.isLogged = true;
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
    builder.addCase(getUserById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserById.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.login = action.payload?.data?.login ?? '';
    });
    builder.addCase(logout, (state) => {
      state.isLogged = false;
    });
  },
});

export const { login } = userSlice.actions;
export const userReducer = userSlice.reducer;
