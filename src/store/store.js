import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { taskReducer } from './task/task.reducer';
import { userReducer } from './user';

const reducer = {
  user: userReducer,
  task: taskReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: import.meta.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
