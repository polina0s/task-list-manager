import { createSlice } from '@reduxjs/toolkit';

import { filterTasksById } from '../../utils';
import { createTask, deleteTask, getTasks } from './task.thunk';

const initialState = {
  isLoading: false,
  tasks: [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,

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
    builder.addCase(getTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTasks.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
    });
    builder.addCase(deleteTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTask.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = filterTasksById(state.tasks, action.payload);
    });
  },
});

export const taskReducer = taskSlice.reducer;
