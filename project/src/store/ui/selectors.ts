import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getCurrentPage = (state: State): number => state[NameSpace.Ui].currentPage;

export const getPagesCount = (state: State): number => state[NameSpace.Ui].pages;
