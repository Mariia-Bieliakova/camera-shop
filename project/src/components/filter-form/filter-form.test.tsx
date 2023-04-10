import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import FilterForm from './filter-form';
import { NameSpace, START_PAGE } from '../../const';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const store = mockStore({
  [NameSpace.Ui]: {
    currentPage: START_PAGE,
    cameraLevels: [],
    cameraTypes: [],
    categories: [],
    minimalPrice: undefined,
    maximumPrice: undefined
  }
});

const history = createMemoryHistory();

describe('Filter Form component', () => {

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilterForm />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByText('Категория')).toBeInTheDocument();
    expect(screen.getByText('Тип камеры')).toBeInTheDocument();
    expect(screen.getByText('Уровень')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
