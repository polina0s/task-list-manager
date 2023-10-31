import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api';

export const getTags = createAsyncThunk(
  'tags/getTags',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.getTags(data);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createTag = createAsyncThunk(
  'tags/createTag',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.createTag(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
