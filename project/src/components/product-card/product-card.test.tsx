import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { Action } from 'redux';
import { AppRoute, NameSpace} from '../../const';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { makeFakeCamera } from '../../utils/mock';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import ProductCard from './product-card';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const fakeCamera = makeFakeCamera();

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

describe('Product card:', () => {

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCard camera={fakeCamera} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(fakeCamera.name)).toBeInTheDocument();
    expect(screen.getByText(`${fakeCamera.price} ₽`)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should redirect to Product screen when user click on link', async () => {
    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Product}
              element={<h1>This is product page</h1>}
            />
            <Route
              path='*'
              element={<ProductCard camera={fakeCamera} />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/This is product page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/This is product page/i)).toBeInTheDocument();
  });
});
