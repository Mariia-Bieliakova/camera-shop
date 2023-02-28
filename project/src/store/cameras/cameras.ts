import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { Camera, Promo } from '../../types/camera';
import { fetchCamerasPerPage, fetchCurrentCamera, fetchPromoAction } from '../api-actions';

type Cameras = {
  promo: Promo | null;
  camerasOnPage: Camera[];
  currentCamera: Camera | null;
  fetchCamerasStatus: FetchStatus;
  fetchPromoStatus: FetchStatus;
  fetchCurrentCameraStatus: FetchStatus;
}

const initialState: Cameras = {
  camerasOnPage: [],
  promo: null,
  currentCamera: null,
  fetchCamerasStatus: FetchStatus.Idle,
  fetchPromoStatus: FetchStatus.Idle,
  fetchCurrentCameraStatus: FetchStatus.Idle
};

export const cameras = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {},
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
      });
  },
});
