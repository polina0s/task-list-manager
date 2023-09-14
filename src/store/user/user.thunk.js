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
