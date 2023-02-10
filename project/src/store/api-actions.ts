import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { Camera, Promo } from '../types/camera';
import { AppDispatch, State } from '../types/state';

export const fetchCamerasAction = createAsyncThunk<Camera[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async (_arg, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.get<Camera[]>(APIRoute.Cameras);
      return data;
    } catch(err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchPromoAction = createAsyncThunk<Promo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromo',
  async (_arg, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.get<Promo>(APIRoute.Promo);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
