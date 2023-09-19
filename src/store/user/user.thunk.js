import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api';

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.createUser(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.loginUser(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getUserById = createAsyncThunk(
  'users/userId',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.fetchUserById(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
