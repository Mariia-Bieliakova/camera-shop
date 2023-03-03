import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { cameras } from './cameras/cameras';
import { modals } from './modals/modals';
import { reviews } from './reviews/reviews';
import { ui } from './ui/ui';

export const rootReducer = combineReducers({
  [NameSpace.Camera]: cameras.reducer,
  [NameSpace.Ui]: ui.reducer,
  [NameSpace.Modals]: modals.reducer,
  [NameSpace.Reviews]: reviews.reducer
});
