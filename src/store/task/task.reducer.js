import { createSlice } from '@reduxjs/toolkit';

import { filterTasksById } from '../../utils';
import {
  createTask,
  deleteTask,
  editTask,
  editTaskStatus,
  getTasks,
} from './task.thunk';

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
    builder.addCase(editTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editTask.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(editTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return action.payload;
        }
        return task;
      });
    });
    builder.addCase(editTaskStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editTaskStatus.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(editTaskStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, status: action.payload.status };
        }
        return task;
      });
    });
  },
});

export const taskReducer = taskSlice.reducer;
