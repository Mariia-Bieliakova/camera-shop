import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../../types/state';
import { Action } from 'redux';
import { FetchStatus, NameSpace } from '../../const';
import { Provider } from 'react-redux';
import Basket from './basket';import { createAPI } from '../../services/api';
import { makeFakeCamera } from '../../utils/mock';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';

const fakeCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const store = mockStore({
  [NameSpace.Camera]: {
    searchCameras: fakeCameras,
    fetchSearchCamerasStatus: FetchStatus.Success
  }
});
const history = createMemoryHistory();

describe('Basket', () => {

  it('should render correctly', () => {

    render(
      <HelmetProvider>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Basket />
          </HistoryRouter>
        </Provider>
      </HelmetProvider>
    );

    expect(screen.queryAllByText('Корзина')).toHaveLength(2);
    expect(screen.getByText('Оформить заказ')).toBeInTheDocument();
    expect(screen.getByText('К оплате:')).toBeInTheDocument();
  });
});
