import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import IconStar from '../../components/icon-star/icon-star';
import Layout from '../../components/layout/layout';
import ModalAddCart from '../../components/modal-add-cart/modal-add-cart';
import ReviewBlock from '../../components/review-block/review-block';
import SimilarProducts from '../../components/similar-products/similar-products';
import TabCharacteristic from '../../components/tab-characteristic/tab-characteristic';
import TabDescription from '../../components/tab-description/tab-description';
import { MAX_RATING, TabType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCurrentCamera, fetchReviews, fetchSimilarCameras } from '../../store/api-actions';
import { getCurrentProduct, getSimilarCameras, selectCurrentProductStatus } from '../../store/cameras/selectors';
import { openAddToCartModal, setActiveCamera } from '../../store/modals/modals';
import { getAddToCartModalStatus, getReviewModalStatus, getReviewSuccessModalStatus } from '../../store/modals/selectors';
import cn from 'classnames';
import { getReviews } from '../../store/reviews/selectors';
import ModalReview from '../../components/modal-review/modal-review';
import ModalReviewSuccess from '../../components/modal-review-success/modal-review-success';
import FullpageSpinner from '../../components/fullpage-spinner/fullpage-spinner';
import ErrorScreen from '../error-screen/error-screen';

function Product (): JSX.Element {
  const [tabType, setTabType] = useState<TabType>(TabType.Characteristic);

  const {id} = useParams();
  const dispatch = useAppDispatch();
  const {isLoading, isError} = useAppSelector(selectCurrentProductStatus);
  const camera = useAppSelector(getCurrentProduct);
  const similarCameras = useAppSelector(getSimilarCameras);
  const reviews = useAppSelector(getReviews);
  const isModalBasketActive = useAppSelector(getAddToCartModalStatus);
  const isReviewModalActive = useAppSelector(getReviewModalStatus);
  const isReviewSuccessActive = useAppSelector(getReviewSuccessModalStatus);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (id) {
      dispatch(fetchCurrentCamera(id));
      dispatch(fetchSimilarCameras(id));
      dispatch(fetchReviews(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return <FullpageSpinner size='big' />;
  }

  if (isError || !camera) {
    return <ErrorScreen />;
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
    description
  } = camera;

  const fullStars = Array(rating).fill(
    <IconStar full />
  );
  const emptyStars = Array(MAX_RATING - rating).fill(
    <IconStar />
  );

  const tabButtonCharClass = cn('tabs__control', {
    'is-active': tabType === TabType.Characteristic
  });

  const tabButtonDescriptionClass = cn('tabs__control', {
    'is-active': tabType === TabType.Description
  });

  const handleToBuyButtonClick = () => {
    dispatch(setActiveCamera({camera}));
    dispatch(openAddToCartModal());
  };

  const handleCharButtonClick = () => {
    setTabType(TabType.Characteristic);
  };

  const handleDescriptionButtonClick = () => {
    setTabType(TabType.Description);
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
                        <button
                          className={tabButtonCharClass}
                          type="button"
                          onClick={handleCharButtonClick}
                        > Характеристики
                        </button>
                        <button
                          className={tabButtonDescriptionClass}
                          type="button"
                          onClick={handleDescriptionButtonClick}
                        > Описание
                        </button>
                      </div>
                      <div className="tabs__content">
                        <TabCharacteristic
                          camera={camera}
                          tabType={tabType}
                        />
                        <TabDescription
                          description={description}
                          tabType={tabType}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="page-content__section">
              {similarCameras.length > 0 &&
                <SimilarProducts cameras={similarCameras}/>}
            </div>
            <div className="page-content__section">
              {reviews.length > 0 &&
                <ReviewBlock reviews={reviews}/>}
            </div>
          </div>
          {isModalBasketActive && <ModalAddCart />}
          {isReviewModalActive && <ModalReview />}
          {isReviewSuccessActive && <ModalReviewSuccess />}
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
