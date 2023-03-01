import { useState } from 'react';
import { Camera } from '../../types/camera';
import ProductCard from '../product-card/product-card';

const SIMILARS_COUNT = 3;

type SimilarCamerasProps = {
  cameras: Camera[];
}

function SimilarProducts ({cameras}: SimilarCamerasProps):JSX.Element {
  const [startIndex, setStartIndex] = useState(0);
  const [currentPage, setPage] = useState(1);

  const pagesCount = Math.ceil(cameras.length / 3);

  const handleNextButtonClick = () => {
    setPage(currentPage + 1);
    setStartIndex(startIndex + SIMILARS_COUNT);
  };

  const handlePrevButtonClick = () => {
    setPage(currentPage - 1);
    setStartIndex(startIndex - SIMILARS_COUNT);
  };

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {cameras
              .slice(startIndex, SIMILARS_COUNT + startIndex)
              .map((camera) => (
                <ProductCard
                  camera={camera}
                  key={camera.id}
                  isActive
                />
              ))}
          </div>
          <button
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            onClick={handlePrevButtonClick}
            disabled={currentPage === 1}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
          <button
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
            onClick={handleNextButtonClick}
            disabled={currentPage === pagesCount}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default SimilarProducts;
