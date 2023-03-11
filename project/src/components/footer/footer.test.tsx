import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import Footer from './footer';

const history = createMemoryHistory();

describe('Footer component', () => {

  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <Footer />
      </HistoryRouter>
    );

    expect(screen.getByText('Интернет-магазин фото- и видеотехники'))
      .toBeInTheDocument();
    expect(screen.getAllByRole('list')).toHaveLength(5);
    expect(screen.getByText('Навигация'))
      .toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
