import { useState } from 'react';
import { sortReviewsByDate } from '../../camera';
import { Review } from '../../types/review';
import ReviewItem from '../review-item/review-item';

const REVIEW_COUNT_PER_STEP = 3;

type ReviewBlockProps = {
  reviews: Review[];
}

function ReviewBlock ({reviews}: ReviewBlockProps): JSX.Element {
  const [displayedReviews, setDisplayedReviews] = useState(REVIEW_COUNT_PER_STEP);

  const reviewsCount = reviews.length;
  const sortedReviews = reviews.slice().sort(sortReviewsByDate);

  const handleMoreButtonClick = () => {
    let reviewsToShow = displayedReviews + REVIEW_COUNT_PER_STEP;

    if (reviewsToShow > reviewsCount) {
      reviewsToShow = reviewsCount;
    }

    setDisplayedReviews(reviewsToShow);
  };

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button">Оставить свой отзыв</button>
        </div>
        <ul className="review-block__list">
          {sortedReviews.slice(0, displayedReviews).map((review) => <ReviewItem reviewItem={review} key={review.id}/>)}
        </ul>
        <div className="review-block__buttons">
          {reviewsCount > displayedReviews &&
          <button
            className="btn btn--purple"
            type="button"
            onClick={handleMoreButtonClick}
          > Показать больше отзывов
          </button>}
        </div>
      </div>
    </section>
  );
}

export default ReviewBlock;
