import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import FilterForm from '../../components/filter-form/filter-form';
import SortingForm from '../../components/sorting-form/sorting-form';
import ProductCard from '../../components/product-card/product-card';
import Pagination from '../../components/pagination/pagination';
import Layout from '../../components/layout/layout';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasOnPage } from '../../store/cameras/selectors';
import { getCurrentPage } from '../../store/ui/selectors';
import { useEffect } from 'react';
import { fetchCamerasPerPage } from '../../store/api-actions';
import { CAMERAS_PER_PAGE } from '../../const';
import ModalAddCart from '../../components/modal-add-cart/modal-add-cart';

function Main (): JSX.Element {
  const currentPage = useAppSelector(getCurrentPage);
  const dispatch = useAppDispatch();
  const camerasOnPage = useAppSelector(getCamerasOnPage);

  useEffect(() => {
    window.scrollTo(0, 0);
    const startIndex = (currentPage - 1) * CAMERAS_PER_PAGE;

    dispatch(fetchCamerasPerPage([startIndex, CAMERAS_PER_PAGE]));
  }, [currentPage, dispatch]);

  return (
    <div className="wrapper">
      <Layout>
        <main>
          <Banner />
          <div className="page-content">
            <Breadcrumbs />
            <section className="catalog">
              <div className="container">
                <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
                <div className="page-content__columns">
                  <div className="catalog__aside">
                    <div className="catalog-filter">
                      <FilterForm />
                    </div>
                  </div>
                  <div className="catalog__content">
                    <div className="catalog-sort">
                      <SortingForm />
                    </div>
                    <div className="cards catalog__cards">
                      {camerasOnPage.map((camera) => (
                        <ProductCard
                          camera={camera}
                          key={camera.id}
                        />
                      ))}
                    </div>
                    <Pagination />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <ModalAddCart />
        </main>
      </Layout>
    </div>
  );
}

export default Main;
