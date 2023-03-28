import cn from 'classnames';
import FocusTrap from 'focus-trap-react';
import { useEffect } from 'react';
import { MODAL_OPEN_CLASS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearActiveCamera, closeAddToCartModal } from '../../store/modals/modals';
import { getActiveProduct, getAddToCartModalStatus } from '../../store/modals/selectors';

function ModalAddCart (): JSX.Element {
  const camera = useAppSelector(getActiveProduct);
  const isActive = useAppSelector(getAddToCartModalStatus);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(closeAddToCartModal());
    dispatch(clearActiveCamera());
  };

  const handleEscKeydownEvent = (e: KeyboardEvent) => {
    if (e.code === 'Escape' && isActive) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isActive) {
      document.body.classList.add(MODAL_OPEN_CLASS);
      document.addEventListener('keydown', handleEscKeydownEvent);
    }

    return () => {
      document.body.classList.remove(MODAL_OPEN_CLASS);
      document.removeEventListener('keydown', handleEscKeydownEvent);
    };
  });

  if (!camera) {
    return (<p>Something went wrong:(</p>);
  }

  const {
    name,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    vendorCode,
    type,
    level,
    price
  } = camera;

  const modalClass = cn('modal',
    {'is-active': isActive}
  );

  const handleCloseButtonClick = () => {
    closeModal();
  };

  return (
    <FocusTrap
      active={isActive}
      focusTrapOptions={{
        tabbableOptions: {
          displayCheck: 'none'
        }
      }}
    >
      <div
        className={modalClass}
        onClick={handleCloseButtonClick}
        data-testid='modal'
      >
        <div className="modal__wrapper">
          <div className="modal__overlay"></div>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <p className="title title--h4">Добавить товар в корзину</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`} />
                  <img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`} width="140" height="120" alt={name} />
                </picture>
              </div>
              <div className="basket-item__description">
                <p className="basket-item__title">{name}</p>
                <ul className="basket-item__list">
                  <li className="basket-item__list-item">
                    <span className="basket-item__article">Артикул:</span>
                    <span className="basket-item__number">{vendorCode}</span>
                  </li>
                  <li className="basket-item__list-item">{`${type} фотокамера`}</li>
                  <li className="basket-item__list-item">{`${level} уровень`}</li>
                </ul>
                <p className="basket-item__price">
                  <span className="visually-hidden">Цена:</span>
                  {`${price} ₽`}
                </p>
              </div>
            </div>
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                tabIndex={0}
              >
                <svg width="24" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-add-basket"></use>
                </svg>Добавить в корзину
              </button>
            </div>
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={handleCloseButtonClick}
            >
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default ModalAddCart;
