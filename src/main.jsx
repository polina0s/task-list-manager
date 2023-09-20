import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { api } from './api';
import { App } from './App';
import { store } from './store/store';
import { logout } from './store/user/user.actions';
import { tokenService } from './utils';

api.onRefresh = async () => {
  api.refreshTokens().catch((err) => {
    console.log(err);
    store.dispatch(logout());
    tokenService.removeTokens();
  });
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
