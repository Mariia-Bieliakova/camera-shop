import { render, screen } from '@testing-library/react';
import { createAPI } from '../../services/api';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import Layout from './layout';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../../types/state';
import { Action } from 'redux';
import { FetchStatus, NameSpace } from '../../const';
import { makeFakeCamera } from '../../utils/mock';
import { Provider } from 'react-redux';

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

describe('Layout component', () => {

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Layout>
            <p> I am children </p>
          </Layout>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('I am children')).toBeInTheDocument();
  });
});
