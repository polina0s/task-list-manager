import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api';
import { done, inProgress } from '../../utils';

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
      return response.data.tasks;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTasks',
  async ({ id }, { rejectWithValue }) => {
    try {
      await api.deleteTask({ id });
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const editTask = createAsyncThunk(
  'tasks/editTask',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.editTask(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const editTaskStatus = createAsyncThunk(
  'tasks/editTaskStatus',
  async (data, { rejectWithValue }) => {
    try {
      if (data.status === inProgress) await api.takeToWork(data);
      if (data.status === done) await api.done(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
