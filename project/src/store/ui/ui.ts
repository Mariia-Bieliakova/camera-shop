import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CAMERAS_PER_PAGE, NameSpace, START_PAGE } from '../../const';
import { fetchCamerasAction } from '../api-actions';

type UI = {
  currentPage: number;
  camerasPerPage: number;
  pages: number;
}

const initialState: UI = {
  currentPage: START_PAGE,
  camerasPerPage: CAMERAS_PER_PAGE,
  pages: 0
};

export const ui = createSlice({
  name: NameSpace.Ui,
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<{page: number}>) => {
      const {page} = action.payload;

      state.currentPage = page;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.pages = Math.ceil((action.payload.length) / (state.camerasPerPage));
      });
  },
});

export const {changePage} = ui.actions;
