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
  if (api.isRefreshing) {
    
  }

  api.isRefreshing = true;
  return api
    .refreshTokens()
    .then(async (response) => {
      await api.enqueue();
      return response;
    })
    .catch(() => {
      store.dispatch(logout());
      api.clearQueue();
      tokenService.removeTokens();
    })
    .finally(() => {
      api.isRefreshing = false;
    });
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
