import { createSlice } from '@reduxjs/toolkit';

import { createTag, editTag, getTags } from './index';

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
    builder.addCase(editTag.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editTag.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(editTag.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tags = state.tags.map((tag) => {
        if (tag.id === action.payload.data.id) {
          return action.payload.data;
        }
        return tag;
      });
    });
  },
});

export const tagReducer = tagSlice.reducer;
