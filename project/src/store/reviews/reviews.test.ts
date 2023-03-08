import { FetchStatus } from '../../const';
import { makeFakePastReview, makeFutureReview } from '../../utils/mock';
import { fetchReviews, postReview } from '../api-actions';
import { clearPostReviewStatus, reviews } from './reviews';

const fakeReviews = [makeFakePastReview(), makeFakePastReview(), makeFakePastReview()];
const newReview = makeFutureReview();

describe('Reducer: review:', () => {

  it('without additional parameters should return initial state', () => {
    expect(reviews.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        reviews: [],
        fetchReviewsStatus: FetchStatus.Idle,
        postReviewStatus: FetchStatus.Idle
      });
  });

  describe('Clear post review status:', () => {
    it('should set Idle post review status when it was Error', () => {
      const state = {
        reviews: [],
        fetchReviewsStatus: FetchStatus.Idle,
        postReviewStatus: FetchStatus.Error
      };
      expect(reviews.reducer(state, {type: clearPostReviewStatus}))
        .toEqual({
          reviews: [],
          fetchReviewsStatus: FetchStatus.Idle,
          postReviewStatus: FetchStatus.Idle
        });
    });

    it('should set Idle post review status when it was Success', () => {
      const state = {
        reviews: fakeReviews,
        fetchReviewsStatus: FetchStatus.Success,
        postReviewStatus: FetchStatus.Success
      };
      expect(reviews.reducer(state, {type: clearPostReviewStatus}))
        .toEqual({
          reviews: fakeReviews,
          fetchReviewsStatus: FetchStatus.Success,
          postReviewStatus: FetchStatus.Idle
        });
    });
  });

  describe('fetch review:', () => {

    it('should set fetch status error when server is not available', () => {
      const state = {
        reviews: [],
        fetchReviewsStatus: FetchStatus.Idle,
        postReviewStatus: FetchStatus.Success
      };
      expect(reviews.reducer(state, {type: fetchReviews.rejected.type}))
        .toEqual({
          reviews: [],
          fetchReviewsStatus: FetchStatus.Error,
          postReviewStatus: FetchStatus.Success
        });
    });

    it('should set fetch status pending when server is loading', () => {
      const state = {
        reviews: [],
        fetchReviewsStatus: FetchStatus.Idle,
        postReviewStatus: FetchStatus.Idle
      };
      expect(reviews.reducer(state, {type: fetchReviews.pending.type}))
        .toEqual({
          reviews: [],
          fetchReviewsStatus: FetchStatus.Pending,
          postReviewStatus: FetchStatus.Idle
        });
    });

    it('should set fetch status success and add reviews to state', () => {
      const state = {
        reviews: [],
        fetchReviewsStatus: FetchStatus.Idle,
        postReviewStatus: FetchStatus.Idle
      };
      expect(reviews.reducer(state, {type: fetchReviews.fulfilled.type, payload: fakeReviews}))
        .toEqual({
          reviews: fakeReviews,
          fetchReviewsStatus: FetchStatus.Success,
          postReviewStatus: FetchStatus.Idle
        });
    });
  });

  describe('post review', () => {

    it('should set fetch status error when server is not available', () => {
      const state = {
        reviews: [],
        fetchReviewsStatus: FetchStatus.Idle,
        postReviewStatus: FetchStatus.Idle
      };
      expect(reviews.reducer(state, {type: postReview.rejected.type}))
        .toEqual({
          reviews: [],
          fetchReviewsStatus: FetchStatus.Idle,
          postReviewStatus: FetchStatus.Error
        });
    });

    it('should set fetch status pending when server is loading', () => {
      const state = {
        reviews: fakeReviews,
        fetchReviewsStatus: FetchStatus.Success,
        postReviewStatus: FetchStatus.Idle
      };
      expect(reviews.reducer(state, {type: postReview.pending.type}))
        .toEqual({
          reviews: fakeReviews,
          fetchReviewsStatus: FetchStatus.Success,
          postReviewStatus: FetchStatus.Pending
        });
    });

    it('should set fetch status success and add new review in array', () => {
      const state = {
        reviews: fakeReviews,
        fetchReviewsStatus: FetchStatus.Success,
        postReviewStatus: FetchStatus.Idle
      };

      expect(reviews.reducer(state, {type: postReview.fulfilled.type, payload: newReview}))
        .toEqual({
          reviews: [...fakeReviews, newReview],
          fetchReviewsStatus: FetchStatus.Success,
          postReviewStatus: FetchStatus.Success
        });
    });
  });
});
