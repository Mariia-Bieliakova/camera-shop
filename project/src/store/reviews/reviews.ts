import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { Review } from '../../types/review';
import { fetchReviews, postReview } from '../api-actions';

type Reviews = {
  reviews: Review[];
  fetchReviewsStatus: FetchStatus;
  postReviewStatus: FetchStatus;
};

const initialState: Reviews = {
  reviews: [],
  fetchReviewsStatus: FetchStatus.Idle,
  postReviewStatus: FetchStatus.Idle
};

export const reviews = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    clearPostReviewStatus: (state) => {
      state.postReviewStatus = FetchStatus.Idle;
    }
  },
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
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.postReviewStatus = FetchStatus.Success;
        const newReview = action.payload;

        if (newReview) {
          state.reviews.push(newReview);
        }
      })
      .addCase(postReview.rejected, (state) => {
        state.postReviewStatus = FetchStatus.Error;
      });
  },
});

export const {clearPostReviewStatus} = reviews.actions;
