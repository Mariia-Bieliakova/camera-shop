import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { Camera } from '../../types/camera';
import { fetchCamerasAction } from '../api-actions';

type Cameras = {
  cameras: Camera[];
  fetchCamerasStatus: FetchStatus;
}

const initialState: Cameras = {
  cameras: [],
  fetchCamerasStatus: FetchStatus.Idle
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
      });
  },
});
