import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createAPI } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import ErrorScreen from './error-screen';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { State } from '../../types/state';
import { FetchStatus, NameSpace } from '../../const';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const store = mockStore({
  [NameSpace.Camera]: {
    camerasOnPage: [],
    currentCamera: null,
    fetchCamerasStatus: FetchStatus.Error,
    fetchCurrentCameraStatus: FetchStatus.Error
  },
});

describe('Error screen:', () => {

  it('should render correctly:', () => {

    render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <ErrorScreen />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByText('Что-то пошло не так:( Попробуйте обновить страницу')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
