import { createSlice } from '@reduxjs/toolkit';

import { createTag, getTags } from './index';

const initialState = {
  isLoading: false,
  tags: [],
};

const tagSlice = createSlice({
  name: 'tag',
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getTags.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTags.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tags = action.payload.data.tags;
    });
    builder.addCase(createTag.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createTag.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createTag.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tags = [...state.tags, action.payload.data];
    });
  },
});

export const tagReducer = tagSlice.reducer;
