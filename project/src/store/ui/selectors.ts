import { CameraLevel, CameraType, Category, NameSpace, OrderData, SortData } from '../../const';
import { State } from '../../types/state';

export const getCurrentPage = (state: State): number => state[NameSpace.Ui].currentPage;

export const getPagesCount = (state: State): number => state[NameSpace.Ui].pages;

export const getSortType = (state: State): SortData => state[NameSpace.Ui].sort;

export const getOrderType = (state: State): OrderData => state[NameSpace.Ui].order;

export const getCameraLevels = (state: State): CameraLevel[] => state[NameSpace.Ui].cameraLevels;

export const getCameraTypes = (state: State): CameraType[] => state[NameSpace.Ui].cameraTypes;

export const getCategories = (state: State): Category[] => state[NameSpace.Ui].categories;

export const getFromPrice = (state: State): number | undefined => state[NameSpace.Ui].fromPrice;

export const getToPrice = (state: State): number | undefined => state[NameSpace.Ui].toPrice;

export const getMinimalPrice = (state: State): number => state[NameSpace.Ui].minimalPrice;

export const getMaximumPrice = (state: State): number => state[NameSpace.Ui].maximumPrice;
