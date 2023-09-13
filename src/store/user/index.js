import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { countReducer } from './countReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({ countReducer, userReducer });

export const store = configureStore({ reducer: rootReducer });
