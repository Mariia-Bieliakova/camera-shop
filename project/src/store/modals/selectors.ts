import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';
import { State } from '../../types/state';

export const getActiveProduct = (state: State): Camera | null => state[NameSpace.Modals].activeCamera;

export const getAddToCartModalStatus = (state: State): boolean => state[NameSpace.Modals].isAddToCartOpen;

export const getReviewModalStatus = (state: State): boolean => state[NameSpace.Modals].isReviewOpen;

export const getReviewSuccessModalStatus = (state: State): boolean => state[NameSpace.Modals].isReviewSuccessOpen;
