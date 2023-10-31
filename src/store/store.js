import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { tagReducer } from './tag';
import { taskReducer } from './task/task.reducer';
import { userReducer } from './user';

const reducer = {
  user: userReducer,
  task: taskReducer,
  tag: tagReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: import.meta.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
