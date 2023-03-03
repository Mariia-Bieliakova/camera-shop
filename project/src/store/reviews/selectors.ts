import { FetchStatus, NameSpace } from '../../const';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const getReviews = (state: State): Review[] => state[NameSpace.Reviews].reviews;

export const getReviewFetchStatus = (state: State): FetchStatus => state[NameSpace.Reviews].fetchReviewsStatus;
