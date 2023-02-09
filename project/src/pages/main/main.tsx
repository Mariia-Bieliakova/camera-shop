import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import FilterForm from '../../components/filter-form/filter-form';
import SortingForm from '../../components/sorting-form/sorting-form';
import ProductCard from '../../components/product-card/product-card';
import Pagination from '../../components/pagination/pagination';
import Layout from '../../components/layout/layout';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/cameras/selectors';

function Main (): JSX.Element {
  const cameras = useAppSelector(getCameras);

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
                      {cameras.map((camera) => (
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
        </main>
      </Layout>
    </div>
  );
}

export default Main;
