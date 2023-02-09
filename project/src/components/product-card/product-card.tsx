import { nanoid } from 'nanoid';
import { Camera } from '../../types/camera';
import IconStar from '../icon-star/icon-star';

const MAX_RATING = 5;

type ProductCardProps = {
  camera: Camera;
}

function ProductCard ({camera}: ProductCardProps): JSX.Element {
  const fullStars = Array(camera.rating).fill(
    <IconStar full />
  );
  const emptyStars = Array(MAX_RATING - camera.rating).fill(
    <IconStar />
  );


  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`} />
          <img src={camera.previewImg} srcSet={`${camera.previewImg2x} 2x`} width="280" height="240" alt={camera.name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {fullStars.map(() => {
            const key = nanoid();

            return <IconStar full key={key}/>;
          })}
          {emptyStars.map(() => {
            const key = nanoid();

            return <IconStar key={key}/>;
          })}

          <p className="visually-hidden">Рейтинг: {camera.rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>
            {camera.reviewCount}
          </p>
        </div>
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {camera.price}
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">
          Купить
        </button>
        <a className="btn btn--transparent" href="/#">
          Подробнее
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
