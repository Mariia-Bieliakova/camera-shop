import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import IconStar from '../../components/icon-star/icon-star';
import Layout from '../../components/layout/layout';
import ModalAddCart from '../../components/modal-add-cart/modal-add-cart';
import ReviewBlock from '../../components/review-block/review-block';
import SimilarProducts from '../../components/similar-products/similar-products';
import { MAX_RATING } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCurrentCamera } from '../../store/api-actions';
import { getCurrentProduct, selectCurrentProductStatus } from '../../store/cameras/selectors';
import { openAddToCartModal, setActiveCamera } from '../../store/modals/modals';

function Product (): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const {isLoading, isError} = useAppSelector(selectCurrentProductStatus);
  const camera = useAppSelector(getCurrentProduct);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (id) {
      dispatch(fetchCurrentCamera(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return <p>Please wait a little</p>;
  }

  if (isError || !camera) {
    return <p>Something went wrong. Try again.</p>;
  }

  const {
    name,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    rating,
    reviewCount,
    price,
    vendorCode,
    category,
    type,
    level,
    description
  } = camera;

  const fullStars = Array(rating).fill(
    <IconStar full />
  );
  const emptyStars = Array(MAX_RATING - rating).fill(
    <IconStar />
  );

  const handleToBuyButtonClick = () => {
    dispatch(setActiveCamera({camera}));
    dispatch(openAddToCartModal());
  };

  return (
    <div className="wrapper">
      <Layout>
        <main>
          <div className="page-content">

            <Breadcrumbs productName={name}/>

            <div className="page-content__section">
              <section className="product">
                <div className="container">
                  <div className="product__img">
                    <picture>
                      <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}/>
                      <img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`} width="560" height="480" alt={name} />
                    </picture>
                  </div>
                  <div className="product__content">
                    <h1 className="title title--h3">{name}</h1>
                    <div className="rate product__rate">
                      {fullStars.map(() => {
                        const key = nanoid();

                        return <IconStar full key={key}/>;
                      })}
                      {emptyStars.map(() => {
                        const key = nanoid();

                        return <IconStar key={key}/>;
                      })}

                      <p className="visually-hidden">Рейтинг: {rating}</p>
                      <p className="rate__count">
                        <span className="visually-hidden">Всего оценок:</span>
                        {reviewCount}
                      </p>
                    </div>
                    <p className="product__price">
                      <span className="visually-hidden">Цена:</span>
                      {price} ₽
                    </p>
                    <button
                      className="btn btn--purple"
                      type="button"
                      onClick={handleToBuyButtonClick}
                    >
                      <svg width="24" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-add-basket" />
                      </svg>Добавить в корзину
                    </button>
                    <div className="tabs product__tabs">
                      <div className="tabs__controls product__tabs-controls">
                        <button className="tabs__control" type="button">Характеристики</button>
                        <button className="tabs__control is-active" type="button">Описание</button>
                      </div>
                      <div className="tabs__content">
                        <div className="tabs__element">
                          <ul className="product__tabs-list">
                            <li className="item-list">
                              <span className="item-list__title">Артикул:</span>
                              <p className="item-list__text"> {vendorCode}</p>
                            </li>
                            <li className="item-list">
                              <span className="item-list__title">Категория:</span>
                              <p className="item-list__text">{category}</p>
                            </li>
                            <li className="item-list">
                              <span className="item-list__title">Тип камеры:</span>
                              <p className="item-list__text">{type}</p>
                            </li>
                            <li className="item-list">
                              <span className="item-list__title">Уровень:</span>
                              <p className="item-list__text">{level}</p>
                            </li>
                          </ul>
                        </div>
                        <div className="tabs__element is-active">
                          <div className="product__tabs-text">
                            <p>{description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="page-content__section">
              <SimilarProducts />
            </div>
            <div className="page-content__section">
              <ReviewBlock />
            </div>
          </div>
          <ModalAddCart />
        </main>
        <a className="up-btn" href="#header">
          <svg width="12" height="18" aria-hidden="true">
            <use xlinkHref="#icon-arrow2" />
          </svg>
        </a>
      </Layout>
    </div>
  );
}

export default Product;
