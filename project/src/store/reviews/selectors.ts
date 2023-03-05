import { createSelector } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const getReviews = (state: State): Review[] => state[NameSpace.Reviews].reviews;

export const getReviewFetchStatus = (state: State): FetchStatus => state[NameSpace.Reviews].fetchReviewsStatus;

export const getPostReviewStatus = (state: State): FetchStatus => state[NameSpace.Reviews].postReviewStatus;

export const selectPostReviewStatus = createSelector(
  [getPostReviewStatus],
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isError: status === FetchStatus.Error
  })
);
