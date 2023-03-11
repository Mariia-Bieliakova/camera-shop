import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import FilterForm from './filter-form';

const history = createMemoryHistory();

describe('Filter Form component', () => {

  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <FilterForm />
      </HistoryRouter>
    );

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByText('Категория')).toBeInTheDocument();
    expect(screen.getByText('Тип камеры')).toBeInTheDocument();
    expect(screen.getByText('Уровень')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
