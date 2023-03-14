import { createAPI } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { CAMERAS_PER_PAGE, FetchStatus, NameSpace, START_PAGE } from '../../const';
import { makeFakeCamera, makeFakePromo } from '../../utils/mock';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../../components/history-router/history-router';
import Main from './main';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const fakeCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];
const fakePromo = makeFakePromo();
const fakeCurrentCamera = makeFakeCamera();

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
  }
});

jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => 'some-id'),
}));

const history = createMemoryHistory();

describe('Main page:', () => {
  beforeEach(window.Window.prototype.scrollTo = jest.fn());

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <Main />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
    expect(screen.queryByText('Сервер недоступен. Перезагрузите, пожалуйста, страницу')).not.toBeInTheDocument();
    expect(screen.getByText(fakeCameras[0].name)).toBeInTheDocument();
    expect(screen.getByText(fakeCameras[1].name)).toBeInTheDocument();
    expect(screen.getByText(fakeCameras[2].name)).toBeInTheDocument();
    expect(screen.getByText(fakeCameras[3].name)).toBeInTheDocument();
  });

  it('should render error text when server is not replying', () => {

    const errorStore = mockStore({
      [NameSpace.Camera]: {
        camerasOnPage: [],
        promo: fakePromo,
        currentCamera: fakeCurrentCamera,
        similarCameras: fakeCameras,
        fetchCamerasStatus: FetchStatus.Error,
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
      }
    });

    render(
      <Provider store={errorStore}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <Main />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByText('Сервер недоступен. Перезагрузите, пожалуйста, страницу')).toBeInTheDocument();
    expect(screen.queryByText('Каталог фото- и видеотехники')).not.toBeInTheDocument();
  });
});
