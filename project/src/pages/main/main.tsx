import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import FilterForm from '../../components/filter-form/filter-form';
import SortingForm from '../../components/sorting-form/sorting-form';
import Pagination from '../../components/pagination/pagination';
import Layout from '../../components/layout/layout';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasOnPage, selectCamerasStatus } from '../../store/cameras/selectors';
import { getCameraLevels, getCameraTypes, getCategories, getCurrentPage, getFromPrice, getOrderType, getSortType, getToPrice } from '../../store/ui/selectors';
import { useEffect } from 'react';
import { fetchCamerasPerPage } from '../../store/api-actions';
import { CamerasParams, CAMERAS_PER_PAGE } from '../../const';
import ModalAddCart from '../../components/modal-add-cart/modal-add-cart';
import { getAddToCartModalStatus } from '../../store/modals/selectors';
import FullpageSpinner from '../../components/fullpage-spinner/fullpage-spinner';
import ErrorScreen from '../error-screen/error-screen';
import CardsList from '../../components/cards-list/cards-list';
import { useSearchParams } from 'react-router-dom';

function Main (): JSX.Element {
  const currentPage = useAppSelector(getCurrentPage);
  const dispatch = useAppDispatch();
  const camerasOnPage = useAppSelector(getCamerasOnPage);
  const {isError, isLoading} = useAppSelector(selectCamerasStatus);
  const isModalActive = useAppSelector(getAddToCartModalStatus);
  const sortType = useAppSelector(getSortType);
  const orderType = useAppSelector(getOrderType);
  const categoryFilters = useAppSelector(getCategories);
  const levelFilters = useAppSelector(getCameraLevels);
  const typeFilters = useAppSelector(getCameraTypes);
  const fromPrice = useAppSelector(getFromPrice);
  const toPrice = useAppSelector(getToPrice);
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const startIndex = (currentPage - 1) * CAMERAS_PER_PAGE;

    let params: CamerasParams = {
      start: startIndex,
      limit: CAMERAS_PER_PAGE
    };

    let searchParams: {[key: string]: string} = {};

    if (sortType || orderType ) {
      params = {
        ...params,
        sort: sortType,
        order: orderType
      };

      searchParams = {
        ...searchParams,
        sort: sortType,
        order: orderType
      };
    }

    if (categoryFilters.length > 0) {
      params = {
        ...params,
        categories: categoryFilters
      };

      searchParams = {
        ...searchParams,
        categories: categoryFilters.join(',')
      };
    }

    if (levelFilters.length > 0) {
      params = {
        ...params,
        levels: levelFilters
      };

      searchParams = {
        ...searchParams,
        levels: levelFilters.join(',')
      };
    }

    if (typeFilters.length > 0) {
      params = {
        ...params,
        types: typeFilters
      };

      searchParams = {
        ...searchParams,
        types: typeFilters.join(',')
      };
    }

    if (fromPrice) {
      params = {
        ...params,
        fromPrice
      };

      searchParams = {
        ...searchParams,
        'price_gte': String(fromPrice)
      };
    }

    if (toPrice) {
      params = {
        ...params,
        toPrice
      };

      searchParams = {
        ...searchParams,
        'price_lte': String(toPrice)
      };
    }

    setSearchParams(searchParams);
    dispatch(fetchCamerasPerPage(params));
  }, [sortType, orderType, currentPage, dispatch, categoryFilters, levelFilters, typeFilters, fromPrice, toPrice, setSearchParams]);

  if (isLoading) {
    return <FullpageSpinner size='big'/>;
  }

  if (isError) {
    return <ErrorScreen />;
  }

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
                    <CardsList cameras={camerasOnPage} />
                    <Pagination />
                  </div>
                </div>
              </div>
            </section>
          </div>
          {isModalActive && <ModalAddCart />}
        </main>
      </Layout>
    </div>
  );
}

export default Main;
