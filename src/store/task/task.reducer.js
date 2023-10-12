import { createSlice } from '@reduxjs/toolkit';

import { createTask } from './task.thunk';

const initialState = {
  isLoading: false,
  tasks: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    task(state) {
      state.isLogged = true;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createTask.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = [...state.tasks, action.payload.data];
    });
  },
});

export const taskReducer = taskSlice.reducer;
