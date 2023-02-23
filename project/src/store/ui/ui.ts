import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CAMERAS_PER_PAGE, NameSpace, START_PAGE } from '../../const';

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
    },
    setPagesCount: (state, action: PayloadAction<{camerasCount: number}>) => {
      const {camerasCount} = action.payload;
      state.pages = Math.ceil((camerasCount / state.camerasPerPage));
    }
  },
});

export const {changePage, setPagesCount} = ui.actions;
