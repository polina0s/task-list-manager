import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api';

export const createTask = createAsyncThunk(
  'tasks/creteTask',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.createTask(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.getTasks(data);
      console.log(response.data.tasks);
      return response.data.tasks;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
