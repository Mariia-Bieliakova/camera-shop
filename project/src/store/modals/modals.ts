import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';

type Modals = {
  activeCamera: Camera | null;
  isAddToCartOpen: boolean;
}

const initialState: Modals = {
  activeCamera: null,
  isAddToCartOpen: false
};

export const modals = createSlice({
  name: NameSpace.Modals,
  initialState,
  reducers: {
    setActiveCamera: (state, action: PayloadAction<{camera: Camera}>) => {
      const {camera} = action.payload;

      state.activeCamera = camera;
    },
    clearActiveCamera: (state) => {
      state.activeCamera = null;
    },
    openAddToCartModal: (state) => {
      state.isAddToCartOpen = true;
    },
    closeAddToCartModal: (state) => {
      state.isAddToCartOpen = false;
    }
  }
});

export const {setActiveCamera, clearActiveCamera, openAddToCartModal, closeAddToCartModal} = modals.actions;
