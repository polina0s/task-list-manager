import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api';

export const getTags = createAsyncThunk(
  'tags/getTags',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.getTags(data);
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

export const editTag = createAsyncThunk(
  'tags/editTag',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.editTag(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteTag = createAsyncThunk(
  'tags/deleteTag',
  async ({ id }, { rejectWithValue }) => {
    try {
      await api.deleteTag({ id });
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
