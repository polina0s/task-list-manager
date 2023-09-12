import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { configureStore } from '@reduxjs/toolkit';
import ReactDOM from 'react-dom/client';

import { App } from './App.jsx';

const defaultState = {
  cash: 0,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_CASH':
      return { ...state, cash: state.cash + action.payload };
    case 'GET_CASH':
      return { ...state, cash: state.cash - action.payload };
    default:
      return state;
  }
};

const store = configureStore(reducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider>
    <App />
  </Provider>,
);
