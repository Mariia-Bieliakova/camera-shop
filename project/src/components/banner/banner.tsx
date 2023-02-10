import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getPromo } from '../../store/cameras/selectors';
import ErrorBanner from '../error-banner/error-banner';

function Banner (): JSX.Element {
  const promo = useAppSelector(getPromo);

  if (!promo) {
    return <ErrorBanner />;
  }

  const {
    id,
    name,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x
  } = promo;

  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}/>
        <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="1280" height="280" alt="баннер" />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">
          {name}
        </span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link
          className="btn"
          to={`${AppRoute.Root}${generatePath(AppRoute.Product, {id: String(id)})}`}
        >
            Подробнее
        </Link>
      </p>
    </div>
  );
}

export default Banner;
