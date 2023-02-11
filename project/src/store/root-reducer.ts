import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { cameras } from './cameras/cameras';
import { ui } from './ui/ui';

export const rootReducer = combineReducers({
  [NameSpace.Camera]: cameras.reducer,
  [NameSpace.Ui]: ui.reducer
});
