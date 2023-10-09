import { createSlice } from '@reduxjs/toolkit';

import { createTask } from './task.thunk';

const initialState = {
  text: '',
  tags: '',
  id: '',
  isLoading: false,
  status: '',
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    login(state) {
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
    builder.addCase(createTask.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});
