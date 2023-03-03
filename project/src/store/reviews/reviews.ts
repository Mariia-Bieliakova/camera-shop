import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { Review } from '../../types/review';
import { fetchReviews } from '../api-actions';

type Reviews = {
  reviews: Review[];
  fetchReviewsStatus: FetchStatus;
};

const initialState: Reviews = {
  reviews: [],
  fetchReviewsStatus: FetchStatus.Idle
};

export const reviews = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.fetchReviewsStatus = FetchStatus.Success;
      })
      .addCase(fetchReviews.pending, (state) => {
        state.fetchReviewsStatus = FetchStatus.Pending;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.fetchReviewsStatus = FetchStatus.Error;
      });
  },
});
