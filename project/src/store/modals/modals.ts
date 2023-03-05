import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';

type Modals = {
  activeCamera: Camera | null;
  isAddToCartOpen: boolean;
  isReviewOpen: boolean;
  isReviewSuccessOpen: boolean;
}

const initialState: Modals = {
  activeCamera: null,
  isAddToCartOpen: false,
  isReviewOpen: false,
  isReviewSuccessOpen: false
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
    },
    openReviewModal: (state) => {
      state.isReviewOpen = true;
    },
    closeReviewModal: (state) => {
      state.isReviewOpen = false;
    },
    openReviewSuccessModal: (state) => {
      state.isReviewSuccessOpen = true;
    },
    closeReviewSuccessModal: (state) => {
      state.isReviewSuccessOpen = false;
    }
  }
});

export const {
  setActiveCamera,
  clearActiveCamera,
  openAddToCartModal,
  closeAddToCartModal,
  openReviewModal,
  closeReviewModal,
  closeReviewSuccessModal,
  openReviewSuccessModal} = modals.actions;
