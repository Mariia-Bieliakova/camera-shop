import { makeFakeCamera } from '../../utils/mock';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { Action } from 'redux';
import { NameSpace} from '../../const';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import CardsList from './cards-list';

const fakeCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const store = mockStore({
  [NameSpace.Modals]: {
    activeCamera: null,
    isAddToCartOpen: false
  }
});

jest.mock('../icon-star/icon-star', () => () => 'Star');
jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => 'some-id'),
}));

const history = createMemoryHistory();

describe('Cards list', () => {

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CardsList cameras={fakeCameras} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(fakeCameras[0].name)).toBeInTheDocument();
    expect(screen.getByText(fakeCameras[1].name)).toBeInTheDocument();
    expect(screen.getByText(fakeCameras[2].name)).toBeInTheDocument();
  });

  it('should render message when cameras array is empty', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CardsList cameras={[]} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('по вашему запросу ничего не найдено')).toBeInTheDocument();
  });
});
