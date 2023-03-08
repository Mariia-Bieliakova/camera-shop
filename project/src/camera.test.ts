import { humanizeDate, sortReviewsByDate } from './camera';
import { makeFakePastReview, makeFutureReview } from './utils/mock';

const fakeDate = '2022-07-09T13:24:57.980Z';
const humanizedFakeDate = '9 июля';

const fakePastReview = makeFakePastReview();
const fakeFutureReview = makeFutureReview();

describe('Utils: checks utils functions', () => {
  describe('Function: humanizeDate', () => {
    it ('should return string with humanized date', () => {
      expect(humanizeDate(fakeDate)).toBe(humanizedFakeDate);
    });
  });

  describe('Function: sortReviewsByDate', () => {
    it('should return > 0 if second date later than first', () => {
      expect(sortReviewsByDate(fakePastReview, fakeFutureReview)).toBeGreaterThan(0);
    });
    it('should return < 0 if first date later than second', () => {
      expect(sortReviewsByDate(fakeFutureReview, fakePastReview)).toBeLessThan(0);
    });
  });
});

