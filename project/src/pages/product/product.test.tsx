import { createAPI } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { CAMERAS_PER_PAGE, FetchStatus, NameSpace, START_PAGE } from '../../const';
import { makeFakeCamera, makeFakePastReview, makeFakePromo } from '../../utils/mock';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../../components/history-router/history-router';
import Product from './product';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const fakeCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];
const fakePromo = makeFakePromo();
const fakeCurrentCamera = makeFakeCamera();
const fakeReviews = [makeFakePastReview(), makeFakePastReview()];

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
    similarCameras: fakeCameras,
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

jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => 'some-id'),
}));

const history = createMemoryHistory();

describe('Product page', () => {

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <Product />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.queryAllByText(fakeCurrentCamera.name)).toHaveLength(2);
    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getByText('Описание')).toBeInTheDocument();
    expect(screen.queryByText('Please wait a little')).not.toBeInTheDocument();
    expect(screen.queryByText('Something went wrong. Try again.')).not.toBeInTheDocument();
  });

  it('should render error text when server is not available', () => {

    const errorStore = mockStore({
      [NameSpace.Camera]: {
        camerasOnPage: fakeCameras,
        promo: fakePromo,
        currentCamera: null,
        similarCameras: fakeCameras,
        fetchCamerasStatus: FetchStatus.Success,
        fetchPromoStatus: FetchStatus.Success,
        fetchCurrentCameraStatus: FetchStatus.Error,
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

    render(
      <Provider store={errorStore}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <Product />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );
    expect(screen.getByText('Something went wrong. Try again.')).toBeInTheDocument();
    expect(screen.queryByText('Please wait a little')).not.toBeInTheDocument();
    expect(screen.queryByText(fakeCurrentCamera.name)).not.toBeInTheDocument();
  });

  it('should render loading text when server is pending', () => {

    const errorStore = mockStore({
      [NameSpace.Camera]: {
        camerasOnPage: fakeCameras,
        promo: fakePromo,
        currentCamera: null,
        similarCameras: fakeCameras,
        fetchCamerasStatus: FetchStatus.Success,
        fetchPromoStatus: FetchStatus.Success,
        fetchCurrentCameraStatus: FetchStatus.Pending,
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

    render(
      <Provider store={errorStore}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <Product />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );
    expect(screen.getByText('Please wait a little')).toBeInTheDocument();
    expect(screen.queryByText(fakeCurrentCamera.name)).not.toBeInTheDocument();
    expect(screen.queryByText('Something went wrong. Try again.')).not.toBeInTheDocument();
  });
});
