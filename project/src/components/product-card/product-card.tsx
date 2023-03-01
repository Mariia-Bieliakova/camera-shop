import { nanoid } from 'nanoid';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute, MAX_RATING } from '../../const';
import { useAppDispatch } from '../../hooks';
import { openAddToCartModal, setActiveCamera } from '../../store/modals/modals';
import { Camera } from '../../types/camera';
import IconStar from '../icon-star/icon-star';
import cn from 'classnames';

type ProductCardProps = {
  camera: Camera;
  isActive?: boolean;
}

function ProductCard ({camera, isActive}: ProductCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const cardClass = cn('product-card', {
    'is-active': isActive
  });

  const fullStars = Array(camera.rating).fill(
    <IconStar full />
  );
  const emptyStars = Array(MAX_RATING - camera.rating).fill(
    <IconStar />
  );

  const handleToBuyButtonClick = () => {
    dispatch(setActiveCamera({camera}));
    dispatch(openAddToCartModal());
  };

  return (
    <div className={cardClass}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${camera.previewImgWebp}, /${camera.previewImgWebp2x} 2x`} />
          <img src={`/${camera.previewImg}`} srcSet={`/${camera.previewImg2x} 2x`} width="280" height="240" alt={camera.name} />
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
        <div>
          <p className="product-card__title">{camera.name}</p>
          <p className="product-card__price">
            <span className="visually-hidden">Цена:</span>
            {`${camera.price} ₽`}
          </p>
        </div>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={handleToBuyButtonClick}
        >
          Купить
        </button>
        <Link
          className="btn btn--transparent"
          to={`${AppRoute.Root}${generatePath(AppRoute.Product, {id: String(camera.id)})}`}
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
