import { HelmetProvider } from 'react-helmet-async';
import Main from '../../pages/main/main';
import Product from '../../pages/product/product';
import Basket from '../../pages/basket/basket';
import {Route, Routes} from 'react-router-dom';
import { AppRoute } from '../../const';
import PageNotFound from '../../pages/page-404/page-404';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<Main />} />
          <Route path={AppRoute.Catalog} element={<Main />}/>
          <Route
            path={AppRoute.Basket}
            element={<Basket />}
          />
          <Route
            path={AppRoute.Product}
            element={<Product />}
          />
        </Route>
        <Route path={AppRoute.NotFound} element={<PageNotFound />}/>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
