import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import HistoryRouter from '../history-router/history-router';
import Breadcrumbs from './breadcrumbs';

const history = createMemoryHistory();

describe('Breadcrumbs component:', () => {

  describe('Without props:', () => {

    it('should render correctly', () => {

      render(
        <HistoryRouter history={history}>
          <Breadcrumbs />
        </HistoryRouter>
      );

      expect(screen.getByRole('link')).toBeInTheDocument();
      expect(screen.getByText('Каталог')).toBeInTheDocument();
    });

    it('should redirect to main page on link click', async () => {
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
              element={<Breadcrumbs />}
            />
          </Routes>
        </HistoryRouter>
      );

      expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
      await userEvent.click(screen.getByRole('link'));
      expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
    });
  });

  describe('With Product name Prop:', () => {
    it('should render correctly', () => {

      render(
        <HistoryRouter history={history}>
          <Breadcrumbs productName='some product'/>
        </HistoryRouter>
      );

      expect(screen.getAllByRole('link')).toHaveLength(2);
      expect(screen.getByText('some product')).toBeInTheDocument();
    });

    it('should redirect to main page on link click', async () => {
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
              element={<Breadcrumbs productName='some product'/>}
            />
          </Routes>
        </HistoryRouter>
      );

      expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

      const links = screen.getAllByRole('link');

      await userEvent.click(links[0]);
      await userEvent.click(links[1]);

      expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
    });
  });
});
