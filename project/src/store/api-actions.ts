import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, TOTAL_COUNT_HEADER } from '../const';
import { Camera, Promo } from '../types/camera';
import { Review, ReviewPost } from '../types/review';
import { AppDispatch, State } from '../types/state';
import { setPagesCount } from './ui/ui';

export const fetchCamerasPerPage = createAsyncThunk<Camera[], [number, number], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCamerasPerPage',
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

export const fetchCurrentCamera = createAsyncThunk<Camera, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCurrentCamera',
  async(id, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.get<Camera>(`${APIRoute.Cameras}/${id}`);

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchSimilarCameras = createAsyncThunk<Camera[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarCameras',
  async(id, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.get<Camera[]>(`${APIRoute.Cameras}/${id}${APIRoute.Similar}`);

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchReviews = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async(id, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.get<Review[]>(`${APIRoute.Cameras}/${id}${APIRoute.Reviews}`);

      return data;
    } catch(err) {
      return rejectWithValue(err);
    }
  }
);

export const postReview = createAsyncThunk<Review | undefined, ReviewPost, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'reviews/postReview',
  async(review, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.post<Review>(APIRoute.Reviews, review);

      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
