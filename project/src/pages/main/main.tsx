import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import FilterForm from '../../components/filter-form/filter-form';
import SortingForm from '../../components/sorting-form/sorting-form';
import Pagination from '../../components/pagination/pagination';
import Layout from '../../components/layout/layout';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasOnPage, selectCamerasStatus } from '../../store/cameras/selectors';
import { getCurrentPage } from '../../store/ui/selectors';
import { useEffect } from 'react';
import { fetchCamerasPerPage } from '../../store/api-actions';
import { CameraLevel, CamerasParams, CAMERAS_PER_PAGE, CameraType, Category, OrderData, SortData } from '../../const';
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
  const [searchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const startIndex = (currentPage - 1) * CAMERAS_PER_PAGE;

    const photocameraParam = searchParams.get(Category.Photocamera);
    const videocameraParam = searchParams.get(Category.Videocamera);

    const categoryParams = [photocameraParam, videocameraParam];
    const categories = Object.values(Category).reduce((acc: Category[], cur, i) => {
      if (categoryParams[i]) {
        return [...acc, cur];
      }
      return acc;
    }, []);

    const nonProfessionalParam = searchParams.get(CameraLevel.NonProfessional);
    const professionalParam = searchParams.get(CameraLevel.Professional);
    const zeroParam = searchParams.get(CameraLevel.Zero);

    const levelsParams = [zeroParam, nonProfessionalParam, professionalParam];
    const levels = Object.values(CameraLevel).reduce((acc: CameraLevel[], cur, i) => {
      if (levelsParams[i]) {
        return [...acc, cur];
      }
      return acc;
    }, []);

    const digitalParam = searchParams.get(CameraType.Digital);
    const filmParam = searchParams.get(CameraType.Film);
    const snapshotParam = searchParams.get(CameraType.Snapshot);
    const collectionParam = searchParams.get(CameraType.Collection);

    const typeParams = [digitalParam, filmParam, snapshotParam, collectionParam];
    const types = Object.values(CameraType).reduce((acc: CameraType[], cur, i) => {
      if (typeParams[i]) {
        return [...acc, cur];
      }
      return acc;
    }, []);

    let params: CamerasParams = {
      start: startIndex,
      limit: CAMERAS_PER_PAGE
    };

    if (searchParams.get('sort')) {
      params = {
        ...params,
        sort: searchParams.get('sort') === SortData.Price ? SortData.Price : SortData.Rating,
        order: searchParams.get('order') === OrderData.Ascending ? OrderData.Ascending : OrderData.Descending
      };
    }

    if (categories.length > 0) {
      params = {
        ...params,
        categories: categories
      };
    }

    if (levels.length > 0) {
      params = {
        ...params,
        levels: levels
      };
    }

    if (types.length > 0) {
      params = {
        ...params,
        types: types
      };
    }

    if (searchParams.get('price_gte')) {
      params = {
        ...params,
        fromPrice: Number(searchParams.get('price_gte'))
      };
    }

    if (searchParams.get('price_lte')) {
      params = {
        ...params,
        toPrice: Number(searchParams.get('price_lte'))
      };
    }

    dispatch(fetchCamerasPerPage(params));
  }, [currentPage, dispatch, searchParams]);

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
