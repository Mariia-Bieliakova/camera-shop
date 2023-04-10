import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CameraLevel, CAMERAS_PER_PAGE, CameraType, Category, NameSpace, OrderData, SortData, START_PAGE } from '../../const';
import { Camera } from '../../types/camera';

export type UI = {
  currentPage: number;
  camerasPerPage: number;
  pages: number;
  sort: SortData;
  order: OrderData;
  categories: Category[];
  cameraTypes: CameraType[];
  cameraLevels: CameraLevel[];
  minimalPrice: number;
  maximumPrice: number;
  fromPrice: number | undefined;
  toPrice: number | undefined;
}

const initialState: UI = {
  currentPage: START_PAGE,
  camerasPerPage: CAMERAS_PER_PAGE,
  pages: 0,
  sort: SortData.Idle,
  order: OrderData.Idle,
  categories: [],
  cameraTypes: [],
  cameraLevels: [],
  minimalPrice: 0,
  maximumPrice: 0,
  fromPrice: undefined,
  toPrice: undefined
};

export const ui = createSlice({
  name: NameSpace.Ui,
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<{page: number}>) => {
      const {page} = action.payload;

      state.currentPage = page;
    },
    setPagesCount: (state, action: PayloadAction<{camerasCount: number}>) => {
      const {camerasCount} = action.payload;
      state.pages = Math.ceil((camerasCount / state.camerasPerPage));
    },
    setSortType: (state, action: PayloadAction<{sortType: SortData}>) => {
      const {sortType} = action.payload;
      state.sort = sortType;
    },
    setOrderType: (state, action: PayloadAction<{orderType: OrderData}>) => {
      const {orderType} = action.payload;
      state.order = orderType;
    },
    setCategory: (state, action: PayloadAction<{category: Category}>) => {
      const {category} = action.payload;

      state.categories.includes(category) ?
        state.categories = state.categories.filter((item) => item !== category)
        :
        state.categories.push(category);

      if (category === Category.Videocamera) {
        state.cameraTypes = state.cameraTypes.filter((type) => type !== CameraType.Film && type !== CameraType.Snapshot);
      }
    },
    setCameraType: (state, action: PayloadAction<{cameraType: CameraType}>) => {
      const {cameraType} = action.payload;

      state.cameraTypes.includes(cameraType) ?
        state.cameraTypes = state.cameraTypes.filter((item) => item !== cameraType)
        :
        state.cameraTypes.push(cameraType);
    },
    setCameraLevel: (state, action: PayloadAction<{cameraLevel: CameraLevel}>) => {
      const {cameraLevel} = action.payload;

      state.cameraLevels.includes(cameraLevel) ?
        state.cameraLevels = state.cameraLevels.filter((item) => item !== cameraLevel)
        :
        state.cameraLevels.push(cameraLevel);
    },
    clearFilters: (state) => {
      state.cameraLevels = [];
      state.cameraTypes = [];
      state.categories = [];
      state.fromPrice = undefined;
      state.toPrice = undefined;
    },
    setMinAndMaxPrice: (state, action: PayloadAction<{cameras: Camera[]}>) => {
      const {cameras} = action.payload;
      const prices = cameras.reduce((acc: number[], camera) => [...acc, camera.price], []);
      const minimalPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      state.minimalPrice = minimalPrice;
      state.maximumPrice = maxPrice;
    },
    setFromPrice: (state, action: PayloadAction<{fromPrice: number}>) => {
      const {fromPrice} = action.payload;

      state.fromPrice = fromPrice;
    },
    setToPrice: (state, action: PayloadAction<{toPrice: number}>) => {
      const {toPrice} = action.payload;

      state.toPrice = toPrice;
    }
  },
});

export const {
  changePage,
  setPagesCount,
  setSortType,
  setOrderType,
  setCameraLevel,
  setCategory,
  setCameraType,
  clearFilters,
  setMinAndMaxPrice,
  setFromPrice,
  setToPrice
} = ui.actions;
