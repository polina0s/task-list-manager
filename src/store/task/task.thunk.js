import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api';

export const createTask = createAsyncThunk(
  'tasks/creteTask',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.addTask(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
