import { render, screen } from '@testing-library/react';
import { createAPI } from '../../services/api';
import SearchForm from './search-form';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../../types/state';
import { createMemoryHistory } from 'history';
import { Action } from 'redux';
import { FetchStatus, NameSpace } from '../../const';
import { makeFakeCamera } from '../../utils/mock';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import userEvent from '@testing-library/user-event';

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

describe('Search form:', () => {

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SearchForm />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText('Поиск по сайту')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render cameras names, when user type it', async () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SearchForm />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.type(screen.getByTestId('search-input'), fakeCameras[0].name);

    expect(screen.getByText(fakeCameras[0].name)).toBeInTheDocument();
  });
});
