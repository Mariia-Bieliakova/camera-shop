import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, TOTAL_COUNT_HEADER } from '../const';
import { Camera, Promo } from '../types/camera';
import { AppDispatch, State } from '../types/state';
import { setPagesCount } from './ui/ui';

export const fetchCamerasPerPage = createAsyncThunk<Camera[], [number, number], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCamerasPage',
  async ([start, limit], {dispatch, extra: api, rejectWithValue}) => {
    try {
      const {data, headers} = await api.get<Camera[]>(`${APIRoute.Cameras}?_start=${start}&_limit=${limit}`);
      const camerasCount = Number(headers[TOTAL_COUNT_HEADER]);

      dispatch(setPagesCount({camerasCount}));

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
