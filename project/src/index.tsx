import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { CAMERAS_PER_PAGE } from './const';
import { store } from './store';
import { fetchCamerasPerPage, fetchPromoAction } from './store/api-actions';

store.dispatch(fetchCamerasPerPage([0, CAMERAS_PER_PAGE]));
store.dispatch(fetchPromoAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
