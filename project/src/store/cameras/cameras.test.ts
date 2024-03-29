import { FetchStatus } from '../../const';
import { makeFakeCamera, makeFakePromo } from '../../utils/mock';
import { fetchCamerasPerPage, fetchCurrentCamera, fetchPromoAction, fetchSearchCameras, fetchSimilarCameras } from '../api-actions';
import { cameras } from './cameras';

const fakeCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];
const fakePromo = makeFakePromo();
const fakeCurrentCamera = makeFakeCamera();

describe('Reducer: cameras', () => {

  it('without additional parameters should return initial state', () => {
    expect(cameras.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        camerasOnPage: [],
        promo: null,
        currentCamera: null,
        similarCameras: [],
        searchCameras: [],
        fetchCamerasStatus: FetchStatus.Idle,
        fetchPromoStatus: FetchStatus.Idle,
        fetchCurrentCameraStatus: FetchStatus.Idle,
        fetchSimilarCamerasStatus: FetchStatus.Idle,
        fetchSearchCamerasStatus: FetchStatus.Idle
      });
  });
  describe('fetch cameras array:', () => {

    it('add in state cameras array and change Fetch status', () => {
      const state = {
        camerasOnPage: [],
        promo: null,
        currentCamera: null,
        similarCameras: [],
        searchCameras: [],
        fetchCamerasStatus: FetchStatus.Idle,
        fetchPromoStatus: FetchStatus.Idle,
        fetchCurrentCameraStatus: FetchStatus.Idle,
        fetchSimilarCamerasStatus: FetchStatus.Idle,
        fetchSearchCamerasStatus: FetchStatus.Idle
      };
      expect(cameras.reducer(state, {type: fetchCamerasPerPage.fulfilled.type, payload: fakeCameras}))
        .toEqual({
          camerasOnPage: fakeCameras,
          promo: null,
          currentCamera: null,
          similarCameras: [],
          searchCameras: [],
          fetchCamerasStatus: FetchStatus.Success,
          fetchPromoStatus: FetchStatus.Idle,
          fetchCurrentCameraStatus: FetchStatus.Idle,
          fetchSimilarCamerasStatus: FetchStatus.Idle,
          fetchSearchCamerasStatus: FetchStatus.Idle
        });
    });

    it('change Fetch status on error when server is not available', () => {
      const state = {
        camerasOnPage: [],
        promo: null,
        currentCamera: null,
        similarCameras: [],
        searchCameras: [],
        fetchCamerasStatus: FetchStatus.Idle,
        fetchPromoStatus: FetchStatus.Idle,
        fetchCurrentCameraStatus: FetchStatus.Idle,
        fetchSimilarCamerasStatus: FetchStatus.Idle,
        fetchSearchCamerasStatus: FetchStatus.Idle
      };
      expect(cameras.reducer(state, {type: fetchCamerasPerPage.rejected.type}))
        .toEqual({
          camerasOnPage: [],
          promo: null,
          currentCamera: null,
          similarCameras: [],
          searchCameras: [],
          fetchCamerasStatus: FetchStatus.Error,
          fetchPromoStatus: FetchStatus.Idle,
          fetchCurrentCameraStatus: FetchStatus.Idle,
          fetchSimilarCamerasStatus: FetchStatus.Idle,
          fetchSearchCamerasStatus: FetchStatus.Idle
        });
    });

    it('change Fetch status on pending when server loading', () => {
      const state = {
        camerasOnPage: [],
        promo: null,
        currentCamera: null,
        similarCameras: [],
        searchCameras: [],
        fetchCamerasStatus: FetchStatus.Idle,
        fetchPromoStatus: FetchStatus.Idle,
        fetchCurrentCameraStatus: FetchStatus.Idle,
        fetchSimilarCamerasStatus: FetchStatus.Idle,
        fetchSearchCamerasStatus: FetchStatus.Idle
      };
      expect(cameras.reducer(state, {type: fetchCamerasPerPage.pending.type}))
        .toEqual({
          camerasOnPage: [],
          promo: null,
          currentCamera: null,
          similarCameras: [],
          searchCameras: [],
          fetchCamerasStatus: FetchStatus.Pending,
          fetchPromoStatus: FetchStatus.Idle,
          fetchCurrentCameraStatus: FetchStatus.Idle,
          fetchSimilarCamerasStatus: FetchStatus.Idle,
          fetchSearchCamerasStatus: FetchStatus.Idle
        });
    });
  });

  describe('fetch promo:', () => {
    it('change Fetch status on error when server is not available', () => {
      const state = {
        camerasOnPage: [],
        promo: null,
        currentCamera: null,
        similarCameras: [],
        searchCameras: [],
        fetchCamerasStatus: FetchStatus.Idle,
        fetchPromoStatus: FetchStatus.Idle,
        fetchCurrentCameraStatus: FetchStatus.Idle,
        fetchSimilarCamerasStatus: FetchStatus.Idle,
        fetchSearchCamerasStatus: FetchStatus.Idle
      };
      expect(cameras.reducer(state, {type: fetchPromoAction.rejected.type}))
        .toEqual({
          camerasOnPage: [],
          promo: null,
          currentCamera: null,
          similarCameras: [],
          searchCameras: [],
          fetchCamerasStatus: FetchStatus.Idle,
          fetchPromoStatus: FetchStatus.Error,
          fetchCurrentCameraStatus: FetchStatus.Idle,
          fetchSimilarCamerasStatus: FetchStatus.Idle,
          fetchSearchCamerasStatus: FetchStatus.Idle
        });
    });

    it('change Fetch status and add promo to state', () => {
      const state = {
        camerasOnPage: [],
        promo: null,
        currentCamera: null,
        similarCameras: [],
        searchCameras: [],
        fetchCamerasStatus: FetchStatus.Idle,
        fetchPromoStatus: FetchStatus.Idle,
        fetchCurrentCameraStatus: FetchStatus.Idle,
        fetchSimilarCamerasStatus: FetchStatus.Idle,
        fetchSearchCamerasStatus: FetchStatus.Idle
      };
      expect(cameras.reducer(state, {type: fetchPromoAction.fulfilled.type, payload: fakePromo}))
        .toEqual({
          camerasOnPage: [],
          promo: fakePromo,
          currentCamera: null,
          similarCameras: [],
          searchCameras: [],
          fetchCamerasStatus: FetchStatus.Idle,
          fetchPromoStatus: FetchStatus.Success,
          fetchCurrentCameraStatus: FetchStatus.Idle,
          fetchSimilarCamerasStatus: FetchStatus.Idle,
          fetchSearchCamerasStatus: FetchStatus.Idle
        });
    });

    it('change Fetch status on pending when server is loading', () => {
      const state = {
        camerasOnPage: [],
        promo: null,
        currentCamera: null,
        similarCameras: [],
        searchCameras: [],
        fetchCamerasStatus: FetchStatus.Idle,
        fetchPromoStatus: FetchStatus.Idle,
        fetchCurrentCameraStatus: FetchStatus.Idle,
        fetchSimilarCamerasStatus: FetchStatus.Idle,
        fetchSearchCamerasStatus: FetchStatus.Idle
      };
      expect(cameras.reducer(state, {type: fetchPromoAction.pending.type}))
        .toEqual({
          camerasOnPage: [],
          promo: null,
          currentCamera: null,
          similarCameras: [],
          searchCameras: [],
          fetchCamerasStatus: FetchStatus.Idle,
          fetchPromoStatus: FetchStatus.Pending,
          fetchCurrentCameraStatus: FetchStatus.Idle,
          fetchSimilarCamerasStatus: FetchStatus.Idle,
          fetchSearchCamerasStatus: FetchStatus.Idle
        });
    });
  });

  describe('fetch current camera:', () => {

    it('change Fetch status on error when server is not available', () => {
      const state = {
        camerasOnPage: [],
        promo: null,
        currentCamera: null,
        similarCameras: [],
        searchCameras: [],
        fetchCamerasStatus: FetchStatus.Idle,
        fetchPromoStatus: FetchStatus.Idle,
        fetchCurrentCameraStatus: FetchStatus.Idle,
        fetchSimilarCamerasStatus: FetchStatus.Idle,
        fetchSearchCamerasStatus: FetchStatus.Idle
      };
      expect(cameras.reducer(state, {type: fetchCurrentCamera.rejected.type}))
        .toEqual({
          camerasOnPage: [],
          promo: null,
          currentCamera: null,
          similarCameras: [],
          searchCameras: [],
          fetchCamerasStatus: FetchStatus.Idle,
          fetchPromoStatus: FetchStatus.Idle,
          fetchCurrentCameraStatus: FetchStatus.Error,
          fetchSimilarCamerasStatus: FetchStatus.Idle,
          fetchSearchCamerasStatus: FetchStatus.Idle
        });
    });

    it('change Fetch status on pending when server is loading', () => {
      const state = {
        camerasOnPage: [],
        promo: null,
        currentCamera: null,
        similarCameras: [],
        searchCameras: [],
        fetchCamerasStatus: FetchStatus.Idle,
        fetchPromoStatus: FetchStatus.Idle,
        fetchCurrentCameraStatus: FetchStatus.Idle,
        fetchSimilarCamerasStatus: FetchStatus.Idle,
        fetchSearchCamerasStatus: FetchStatus.Idle
      };
      expect(cameras.reducer(state, {type: fetchCurrentCamera.pending.type}))
        .toEqual({
          camerasOnPage: [],
          promo: null,
          currentCamera: null,
          similarCameras: [],
          searchCameras: [],
          fetchCamerasStatus: FetchStatus.Idle,
          fetchPromoStatus: FetchStatus.Idle,
          fetchCurrentCameraStatus: FetchStatus.Pending,
          fetchSimilarCamerasStatus: FetchStatus.Idle,
          fetchSearchCamerasStatus: FetchStatus.Idle
        });
    });

    it('change Fetch status on success and add current camera', () => {
      const state = {
        camerasOnPage: [],
        promo: null,
        currentCamera: null,
        similarCameras: [],
        searchCameras: [],
        fetchCamerasStatus: FetchStatus.Idle,
        fetchPromoStatus: FetchStatus.Idle,
        fetchCurrentCameraStatus: FetchStatus.Idle,
        fetchSimilarCamerasStatus: FetchStatus.Idle,
        fetchSearchCamerasStatus: FetchStatus.Idle
      };
      expect(cameras.reducer(state, {type: fetchCurrentCamera.fulfilled.type, payload: fakeCurrentCamera}))
        .toEqual({
          camerasOnPage: [],
          promo: null,
          currentCamera: fakeCurrentCamera,
          similarCameras: [],
          searchCameras: [],
          fetchCamerasStatus: FetchStatus.Idle,
          fetchPromoStatus: FetchStatus.Idle,
          fetchCurrentCameraStatus: FetchStatus.Success,
          fetchSimilarCamerasStatus: FetchStatus.Idle,
          fetchSearchCamerasStatus: FetchStatus.Idle
        });
    });
  });

  describe('fetch similar cameras:', () => {

    it('change Fetch status on error when server is not available', () => {
      const state = {
        camerasOnPage: [],
        promo: null,
        currentCamera: null,
        similarCameras: [],
        searchCameras: [],
        fetchCamerasStatus: FetchStatus.Idle,
        fetchPromoStatus: FetchStatus.Idle,
        fetchCurrentCameraStatus: FetchStatus.Idle,
        fetchSimilarCamerasStatus: FetchStatus.Idle,
        fetchSearchCamerasStatus: FetchStatus.Idle
      };
      expect(cameras.reducer(state, {type: fetchSimilarCameras.rejected.type}))
        .toEqual({
          camerasOnPage: [],
          promo: null,
          currentCamera: null,
          similarCameras: [],
          searchCameras: [],
          fetchCamerasStatus: FetchStatus.Idle,
          fetchPromoStatus: FetchStatus.Idle,
          fetchCurrentCameraStatus: FetchStatus.Idle,
          fetchSimilarCamerasStatus: FetchStatus.Error,
          fetchSearchCamerasStatus: FetchStatus.Idle
        });
    });

    it('change Fetch status on pending when server is loading', () => {
      const state = {
        camerasOnPage: [],
        promo: null,
        currentCamera: null,
        similarCameras: [],
        searchCameras: [],
        fetchCamerasStatus: FetchStatus.Idle,
        fetchPromoStatus: FetchStatus.Idle,
        fetchCurrentCameraStatus: FetchStatus.Idle,
        fetchSimilarCamerasStatus: FetchStatus.Idle,
        fetchSearchCamerasStatus: FetchStatus.Idle
      };
      expect(cameras.reducer(state, {type: fetchSimilarCameras.pending.type}))
        .toEqual({
          camerasOnPage: [],
          promo: null,
          currentCamera: null,
          similarCameras: [],
          searchCameras: [],
          fetchCamerasStatus: FetchStatus.Idle,
          fetchPromoStatus: FetchStatus.Idle,
          fetchCurrentCameraStatus: FetchStatus.Idle,
          fetchSimilarCamerasStatus: FetchStatus.Pending,
          fetchSearchCamerasStatus: FetchStatus.Idle
        });
    });

    it('change Fetch status on success and add similar cameras', () => {
      const state = {
        camerasOnPage: [],
        promo: null,
        currentCamera: null,
        similarCameras: [],
        searchCameras: [],
        fetchCamerasStatus: FetchStatus.Idle,
        fetchPromoStatus: FetchStatus.Idle,
        fetchCurrentCameraStatus: FetchStatus.Idle,
        fetchSimilarCamerasStatus: FetchStatus.Idle,
        fetchSearchCamerasStatus: FetchStatus.Idle
      };
      expect(cameras.reducer(state, {type: fetchSimilarCameras.fulfilled.type, payload: fakeCameras}))
        .toEqual({
          camerasOnPage: [],
          promo: null,
          currentCamera: null,
          similarCameras: fakeCameras,
          searchCameras: [],
          fetchCamerasStatus: FetchStatus.Idle,
          fetchPromoStatus: FetchStatus.Idle,
          fetchCurrentCameraStatus: FetchStatus.Idle,
          fetchSimilarCamerasStatus: FetchStatus.Success,
          fetchSearchCamerasStatus: FetchStatus.Idle
        });
    });
  });

  describe('fetch searching cameras:', () => {
    it('change Fetch status on error when server is not available', () => {
      const state = {
        camerasOnPage: [],
        promo: null,
        currentCamera: null,
        similarCameras: [],
        searchCameras: [],
        fetchCamerasStatus: FetchStatus.Idle,
        fetchPromoStatus: FetchStatus.Idle,
        fetchCurrentCameraStatus: FetchStatus.Idle,
        fetchSimilarCamerasStatus: FetchStatus.Idle,
        fetchSearchCamerasStatus: FetchStatus.Idle
      };
      expect(cameras.reducer(state, {type: fetchSearchCameras.rejected.type}))
        .toEqual({
          camerasOnPage: [],
          promo: null,
          currentCamera: null,
          similarCameras: [],
          searchCameras: undefined,
          fetchCamerasStatus: FetchStatus.Idle,
          fetchPromoStatus: FetchStatus.Idle,
          fetchCurrentCameraStatus: FetchStatus.Idle,
          fetchSimilarCamerasStatus: FetchStatus.Idle,
          fetchSearchCamerasStatus: FetchStatus.Error
        });
    });

    it('change Fetch status on pending when server is loading', () => {
      const state = {
        camerasOnPage: [],
        promo: null,
        currentCamera: null,
        similarCameras: [],
        searchCameras: [],
        fetchCamerasStatus: FetchStatus.Idle,
        fetchPromoStatus: FetchStatus.Idle,
        fetchCurrentCameraStatus: FetchStatus.Idle,
        fetchSimilarCamerasStatus: FetchStatus.Idle,
        fetchSearchCamerasStatus: FetchStatus.Idle
      };
      expect(cameras.reducer(state, {type: fetchSearchCameras.pending.type}))
        .toEqual({
          camerasOnPage: [],
          promo: null,
          currentCamera: null,
          similarCameras: [],
          searchCameras: [],
          fetchCamerasStatus: FetchStatus.Idle,
          fetchPromoStatus: FetchStatus.Idle,
          fetchCurrentCameraStatus: FetchStatus.Idle,
          fetchSimilarCamerasStatus: FetchStatus.Idle,
          fetchSearchCamerasStatus: FetchStatus.Pending
        });
    });

    it('change Fetch status on success and add search cameras', () => {
      const state = {
        camerasOnPage: [],
        promo: null,
        currentCamera: null,
        similarCameras: [],
        searchCameras: [],
        fetchCamerasStatus: FetchStatus.Idle,
        fetchPromoStatus: FetchStatus.Idle,
        fetchCurrentCameraStatus: FetchStatus.Idle,
        fetchSimilarCamerasStatus: FetchStatus.Idle,
        fetchSearchCamerasStatus: FetchStatus.Idle
      };
      expect(cameras.reducer(state, {type: fetchSearchCameras.fulfilled.type, payload: fakeCameras}))
        .toEqual({
          camerasOnPage: [],
          promo: null,
          currentCamera: null,
          similarCameras: [],
          searchCameras: fakeCameras,
          fetchCamerasStatus: FetchStatus.Idle,
          fetchPromoStatus: FetchStatus.Idle,
          fetchCurrentCameraStatus: FetchStatus.Idle,
          fetchSimilarCamerasStatus: FetchStatus.Idle,
          fetchSearchCamerasStatus: FetchStatus.Success
        });
    });
  });
});
