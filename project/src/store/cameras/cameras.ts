import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { Camera, Promo } from '../../types/camera';
import { fetchCamerasPerPage, fetchCurrentCamera, fetchPromoAction, fetchSearchCameras, fetchSimilarCameras } from '../api-actions';

type Cameras = {
  promo: Promo | null;
  camerasOnPage: Camera[];
  currentCamera: Camera | null;
  similarCameras: Camera[];
  searchCameras: Camera[] | undefined;
  fetchCamerasStatus: FetchStatus;
  fetchPromoStatus: FetchStatus;
  fetchCurrentCameraStatus: FetchStatus;
  fetchSimilarCamerasStatus: FetchStatus;
  fetchSearchCamerasStatus: FetchStatus;
}

const initialState: Cameras = {
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

export const cameras = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {
    clearSearchCameras: (state) => {
      state.searchCameras = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.pending, (state) => {
        state.fetchPromoStatus = FetchStatus.Pending;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.fetchPromoStatus = FetchStatus.Error;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.fetchPromoStatus = FetchStatus.Success;
        state.promo = action.payload;
      })
      .addCase(fetchCamerasPerPage.fulfilled, (state, action) => {
        state.fetchCamerasStatus = FetchStatus.Success;
        state.camerasOnPage = action.payload;
      })
      .addCase(fetchCamerasPerPage.pending, (state) => {
        state.fetchCamerasStatus = FetchStatus.Pending;
      })
      .addCase(fetchCamerasPerPage.rejected, (state) => {
        state.fetchCamerasStatus = FetchStatus.Error;
      })
      .addCase(fetchCurrentCamera.fulfilled, (state, action) => {
        state.fetchCurrentCameraStatus = FetchStatus.Success;
        state.currentCamera = action.payload;
      })
      .addCase(fetchCurrentCamera.pending, (state) => {
        state.fetchCurrentCameraStatus = FetchStatus.Pending;
      })
      .addCase(fetchCurrentCamera.rejected, (state) => {
        state.fetchCurrentCameraStatus = FetchStatus.Error;
      })
      .addCase(fetchSimilarCameras.fulfilled, (state, action) => {
        state.fetchSimilarCamerasStatus = FetchStatus.Success;
        state.similarCameras = action.payload;
      })
      .addCase(fetchSimilarCameras.pending, (state) => {
        state.fetchSimilarCamerasStatus = FetchStatus.Pending;
      })
      .addCase(fetchSimilarCameras.rejected, (state) => {
        state.fetchSimilarCamerasStatus = FetchStatus.Error;
      })
      .addCase(fetchSearchCameras.fulfilled, (state, action) => {
        state.searchCameras = action.payload;
        state.fetchSearchCamerasStatus = FetchStatus.Success;
      })
      .addCase(fetchSearchCameras.pending, (state) => {
        state.fetchSearchCamerasStatus = FetchStatus.Pending;
        state.searchCameras = [];
      })
      .addCase(fetchSearchCameras.rejected, (state) => {
        state.fetchSearchCamerasStatus = FetchStatus.Error;
        state.searchCameras = undefined;
      });
  },
});

export const {clearSearchCameras} = cameras.actions;
