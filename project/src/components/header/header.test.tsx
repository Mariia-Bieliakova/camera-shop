import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import HistoryRouter from '../history-router/history-router';
import Header from './header';

const history = createMemoryHistory();

describe('Header component', () => {

  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <Header />
      </HistoryRouter>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should redirect to basket when user click basket link', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Basket}
            element={<h1>This is basket page</h1>}
          />
          <Route
            path='*'
            element={<Header />}
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/This is basket page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('basket-link'));

    expect(screen.getByText(/This is basket page/i)).toBeInTheDocument();

  });
});
