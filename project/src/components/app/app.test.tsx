import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Action } from 'redux';
import { AppRoute, CAMERAS_PER_PAGE, FetchStatus, START_PAGE, NameSpace } from '../../const';
import { createAPI } from '../../services/api';
import { makeFakeCamera, makeFakePastReview, makeFakePromo } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import App from './app';
import { State } from '../../types/state';

const fakeCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];
const fakePromo = makeFakePromo();
const fakeCurrentCamera = makeFakeCamera();
const fakeSimilarCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];
const fakeReviews = [makeFakePastReview(), makeFakePastReview()];

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const store = mockStore({
  [NameSpace.Camera]: {
    camerasOnPage: fakeCameras,
    promo: fakePromo,
    currentCamera: fakeCurrentCamera,
    similarCameras: fakeSimilarCameras,
    fetchCamerasStatus: FetchStatus.Success,
    fetchPromoStatus: FetchStatus.Success,
    fetchCurrentCameraStatus: FetchStatus.Success,
    fetchSimilarCamerasStatus: FetchStatus.Success
  },
  [NameSpace.Ui]: {
    currentPage: START_PAGE,
    camerasPerPage: CAMERAS_PER_PAGE,
    pages: 1
  },
  [NameSpace.Modals]: {
    activeCamera: fakeCurrentCamera,
    isAddToCartOpen: false,
    isReviewOpen: false,
    isReviewSuccessOpen: false
  },
  [NameSpace.Reviews]: {
    reviews: fakeReviews,
    fetchReviewsStatus: FetchStatus.Success,
    postReviewStatus: FetchStatus.Idle
  }
});

jest.mock('../../components/product-card/product-card', () => () => 'Product Card');
jest.mock('../../components/icon-star/icon-star', () => () => 'Star');
jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => 'some-id'),
}));

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing:', () => {
  beforeEach(window.HTMLHtmlElement.prototype.scrollTo = jest.fn());
  beforeEach(window.Window.prototype.scrollTo = jest.fn());

  it('should render basket when user navigate to "/basket"', () => {
    history.push(AppRoute.Basket);

    render(fakeApp);

    expect(screen.getByText(/Если у вас есть промокод на скидку, примените его в этом поле/i)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
  });

  it('should render main screen when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render Page 404 when user navigate to unknown url', () => {
    history.push('/something');

    render(fakeApp);

    expect(screen.getByText(/404 Страница не найдена/i)).toBeInTheDocument();
  });

  it('should render Product page when user navigate to /cameras/id', () => {
    history.push('/cameras/2');

    render(fakeApp);

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
  });
});
