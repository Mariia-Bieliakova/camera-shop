import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { cameras } from './cameras/cameras';

export const rootReducer = combineReducers({
  [NameSpace.Camera]: cameras.reducer
});
