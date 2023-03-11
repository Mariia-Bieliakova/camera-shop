import { createAPI } from '../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/state';
import { Action } from 'redux';
import { makeFakeCamera, makeFakeNewReview, makeFakePastReview, makeFakePromo, makeFutureReview } from '../utils/mock';
import { APIRoute } from '../const';
import { fetchCamerasPerPage, fetchCurrentCamera, fetchPromoAction, fetchReviews, fetchSimilarCameras, postReview } from './api-actions';

describe('Async actions:', () => {
  const api = createAPI();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch LOAD_PROMO when GET /promo', async () => {
    const mockPromo = makeFakePromo();
    mockApi
      .onGet(APIRoute.Promo)
      .reply(200, mockPromo);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });

  it('should dispatch LOAD_CURRENT_CAMERA when GET /cameras/id', async () => {
    const mockCamera = makeFakeCamera();
    const mockId = '2';
    mockApi
      .onGet(`${APIRoute.Cameras}/${mockId}`)
      .reply(200, mockCamera);

    const store = mockStore();

    await store.dispatch(fetchCurrentCamera(mockId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCurrentCamera.pending.type,
      fetchCurrentCamera.fulfilled.type
    ]);
  });

  it('should dispatch LOAD_SIMILAR_CAMERAS when GET /cameras/id/similar',
    async () => {
      const mockSimilarCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];
      const mockId = '2';

      mockApi
        .onGet(`${APIRoute.Cameras}/${mockId}${APIRoute.Similar}`)
        .reply(200, mockSimilarCameras);

      const store = mockStore();

      await store.dispatch(fetchSimilarCameras(mockId));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchSimilarCameras.pending.type,
        fetchSimilarCameras.fulfilled.type
      ]);
    });

  it('should dispatch LOAD_REVIEWS when GET /cameras/id/reviews',
    async () => {
      const mockReviews = [makeFakePastReview(), makeFakePastReview(), makeFakePastReview()];
      const mockId = '2';

      mockApi
        .onGet(`${APIRoute.Cameras}/${mockId}${APIRoute.Reviews}`)
        .reply(200, mockReviews);

      const store = mockStore();

      await store.dispatch(fetchReviews(mockId));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchReviews.pending.type,
        fetchReviews.fulfilled.type
      ]);
    });

  it('should dispatch LOAD_CAMERAS_PER_PAGE when GET /cameras?_start=start&_limit=limit',
    async () => {
      const mockCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];
      const mockStart = 0;
      const mockLimit = 3;

      mockApi
        .onGet(`${APIRoute.Cameras}?_start=${mockStart}&_limit=${mockLimit}`)
        .reply(200, mockCameras);

      const store = mockStore();

      await store.dispatch(fetchCamerasPerPage([mockStart, mockLimit]));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchCamerasPerPage.pending.type,
        fetchCamerasPerPage.fulfilled.type
      ]);
    });

  it('should dispatch POST_REVIEW when POST /reviews',
    async () => {
      const mockReview = makeFakeNewReview();
      const mockReply = makeFutureReview();

      mockApi
        .onPost(APIRoute.Reviews)
        .reply(200, mockReply);

      const store = mockStore();

      await store.dispatch(postReview(mockReview));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        postReview.pending.type,
        postReview.fulfilled.type
      ]);
    });
});
