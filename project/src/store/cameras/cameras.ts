import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { Camera, Promo } from '../../types/camera';
import { fetchCamerasAction, fetchPromoAction } from '../api-actions';

type Cameras = {
  cameras: Camera[];
  promo: Promo | null;
  fetchCamerasStatus: FetchStatus;
  fetchPromoStatus: FetchStatus;
}

const initialState: Cameras = {
  cameras: [],
  promo: null,
  fetchCamerasStatus: FetchStatus.Idle,
  fetchPromoStatus: FetchStatus.Idle,
};

export const cameras = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.fetchCamerasStatus = FetchStatus.Pending;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.fetchCamerasStatus = FetchStatus.Error;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.fetchCamerasStatus = FetchStatus.Success;
        state.cameras = action.payload;
      })
      .addCase(fetchPromoAction.pending, (state) => {
        state.fetchPromoStatus = FetchStatus.Pending;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.fetchPromoStatus = FetchStatus.Error;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.fetchPromoStatus = FetchStatus.Success;
        state.promo = action.payload;
      });
  },
});
