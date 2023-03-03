import { nanoid } from 'nanoid';
import { humanizeDate } from '../../camera';
import { MAX_RATING } from '../../const';
import { Review } from '../../types/review';
import IconStar from '../icon-star/icon-star';

type ReviewItemProps = {
  reviewItem: Review;
}

function ReviewItem ({reviewItem}: ReviewItemProps): JSX.Element {
  const {
    userName,
    advantage,
    disadvantage,
    review,
    rating,
    createAt
  } = reviewItem;

  const reviewDate = humanizeDate(createAt);

  const fullStars = Array(rating).fill(
    <IconStar full />
  );
  const emptyStars = Array(MAX_RATING - rating).fill(
    <IconStar />
  );

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={createAt}>{reviewDate}</time>
      </div>
      <div className="rate review-card__rate">
        {fullStars.map(() => {
          const key = nanoid();

          return <IconStar full key={key}/>;
        })}
        {emptyStars.map(() => {
          const key = nanoid();

          return <IconStar key={key}/>;
        })}
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewItem;
