import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import browserHistory from './browser-history';
import App from './components/app/app';
import HistoryRouter from './components/history-router/history-router';
import { CamerasParams, CAMERAS_PER_PAGE } from './const';
import { store } from './store';
import { fetchCameras, fetchCamerasPerPage, fetchPromoAction } from './store/api-actions';

const camerasParams: CamerasParams = {
  start: 0,
  limit: CAMERAS_PER_PAGE
};
store.dispatch(fetchCamerasPerPage(camerasParams));
store.dispatch(fetchCameras());
store.dispatch(fetchPromoAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
