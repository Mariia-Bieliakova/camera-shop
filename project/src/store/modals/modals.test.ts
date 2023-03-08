import { makeFakeCamera } from '../../utils/mock';
import { clearActiveCamera, closeAddToCartModal, closeReviewModal, closeReviewSuccessModal, modals, openAddToCartModal, openReviewModal, openReviewSuccessModal, setActiveCamera } from './modals';

const fakeCamera = makeFakeCamera();

describe('Reducer: modals', () => {
  it('without additional parameters should return initial state', () => {
    expect(modals.reducer(undefined, {type: 'UNKNOWN_TYPE'}))
      .toEqual({
        activeCamera: null,
        isAddToCartOpen: false,
        isReviewOpen: false,
        isReviewSuccessOpen: false
      });
  });

  it('should appear an equal camera in state', () => {
    const state = {
      activeCamera: null,
      isAddToCartOpen: false,
      isReviewOpen: false,
      isReviewSuccessOpen: false
    };

    expect(modals.reducer(state, setActiveCamera({camera: fakeCamera})))
      .toEqual({
        activeCamera: fakeCamera,
        isAddToCartOpen: false,
        isReviewOpen: false,
        isReviewSuccessOpen: false
      });
  });

  it('should clear camera from state', () => {
    const state = {
      activeCamera: fakeCamera,
      isAddToCartOpen: false,
      isReviewOpen: false,
      isReviewSuccessOpen: false
    };

    expect(modals.reducer(state, clearActiveCamera()))
      .toEqual({
        activeCamera: null,
        isAddToCartOpen: false,
        isReviewOpen: false,
        isReviewSuccessOpen: false
      });
  });

  it('should open modals', () => {
    const state = {
      activeCamera: null,
      isAddToCartOpen: false,
      isReviewOpen: false,
      isReviewSuccessOpen: false
    };

    expect(modals.reducer(state, openAddToCartModal()))
      .toEqual({
        activeCamera: null,
        isAddToCartOpen: true,
        isReviewOpen: false,
        isReviewSuccessOpen: false
      });

    expect(modals.reducer(state, openReviewModal()))
      .toEqual({
        activeCamera: null,
        isAddToCartOpen: false,
        isReviewOpen: true,
        isReviewSuccessOpen: false
      });

    expect(modals.reducer(state, openReviewSuccessModal()))
      .toEqual({
        activeCamera: null,
        isAddToCartOpen: false,
        isReviewOpen: false,
        isReviewSuccessOpen: true
      });
  });

  it('should close modals', () => {
    const state = {
      activeCamera: null,
      isAddToCartOpen: true,
      isReviewOpen: true,
      isReviewSuccessOpen: true
    };

    expect(modals.reducer(state, closeAddToCartModal()))
      .toEqual({
        activeCamera: null,
        isAddToCartOpen: false,
        isReviewOpen: true,
        isReviewSuccessOpen: true
      });

    expect(modals.reducer(state, closeReviewModal()))
      .toEqual({
        activeCamera: null,
        isAddToCartOpen: true,
        isReviewOpen: false,
        isReviewSuccessOpen: true
      });

    expect(modals.reducer(state, closeReviewSuccessModal()))
      .toEqual({
        activeCamera: null,
        isAddToCartOpen: true,
        isReviewOpen: true,
        isReviewSuccessOpen: false
      });
  });
});
