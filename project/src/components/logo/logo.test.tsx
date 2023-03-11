import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import HistoryRouter from '../history-router/history-router';
import Logo from './logo';

const history = createMemoryHistory();

describe('Logo component:', () => {

  describe('Logo header:', () => {

    it('should render correctly', () => {
      render(
        <HistoryRouter history={history}>
          <Logo type='header' />
        </HistoryRouter>
      );

      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('should redirect to root when user click it', async () => {
      history.push('/fake');

      render(
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<h1>This is main page</h1>}
            />
            <Route
              path='*'
              element={<Logo type={'header'}/>}
            />
          </Routes>
        </HistoryRouter>
      );

      expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
      await userEvent.click(screen.getByRole('link'));
      expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
    });
  });

  describe('Logo footer:', () => {

    it('should render correctly', () => {
      render(
        <HistoryRouter history={history}>
          <Logo type='footer' />
        </HistoryRouter>
      );

      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('should redirect to root when user click it', async () => {
      history.push('/fake');

      render(
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<h1>This is main page</h1>}
            />
            <Route
              path='*'
              element={<Logo type={'footer'}/>}
            />
          </Routes>
        </HistoryRouter>
      );

      expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
      await userEvent.click(screen.getByRole('link'));
      expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
    });
  });
});
