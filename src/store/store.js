import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { userReducer } from './user';

const reducer = {
  user: userReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: import.meta.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
