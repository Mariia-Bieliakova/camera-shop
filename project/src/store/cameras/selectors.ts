import { createSelector } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { Camera, Promo } from '../../types/camera';
import { State } from '../../types/state';

export const getCameras = (state: State): Camera[] => state[NameSpace.Camera].cameras;

export const getCamerasFetchStatus = (state: State): FetchStatus => state[NameSpace.Camera].fetchCamerasStatus;

export const getPromo = (state: State): Promo | null => state[NameSpace.Camera].promo;

export const getCamerasOnPage = (state: State): Camera[] => state[NameSpace.Camera].camerasOnPage;

export const getPromoFetchStatus = (state: State): FetchStatus => state[NameSpace.Camera].fetchPromoStatus;

export const selectPromoStatus = createSelector(
  [getPromoFetchStatus],
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isError: status === FetchStatus.Error
  })
);
