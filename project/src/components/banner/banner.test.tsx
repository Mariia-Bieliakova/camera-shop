import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, FetchStatus, NameSpace } from '../../const';
import { makeFakePromo } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import Banner from './banner';

const mockStore = configureMockStore();
const fakePromo = makeFakePromo();

const store = mockStore({
  [NameSpace.Camera]: {
    promo: fakePromo,
    fetchPromoStatus: FetchStatus.Success
  }
});

const history = createMemoryHistory();

describe('Banner component', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <Banner />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByText(/Новинка!/i)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to Product screen when user click on link', async () => {
    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Product}
              element={<h1>This is product page</h1>}
            />
            <Route
              path='*'
              element={<Banner />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/This is product page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/This is product page/i)).toBeInTheDocument();
  });
});
