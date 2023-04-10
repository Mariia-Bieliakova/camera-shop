import { render, screen } from '@testing-library/react';
import SortingForm from './sorting-form';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { createMemoryHistory } from 'history';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { NameSpace, OrderData, SortData, START_PAGE } from '../../const';

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
    sort: SortData.Idle,
    order: OrderData.Idle
  }
});

const history = createMemoryHistory();

describe('Sorting form:', () => {

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SortingForm />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(4);
  });
});
