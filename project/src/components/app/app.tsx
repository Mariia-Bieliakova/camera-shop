import { HelmetProvider } from 'react-helmet-async';
import Main from '../../pages/main/main';
import Product from '../../pages/product/product';
import Basket from '../../pages/basket/basket';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { AppRoute } from '../../const';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root}>
            <Route index element={<Main />} />
            <Route
              path={AppRoute.Basket}
              element={<Basket />}
            />
            <Route
              path={AppRoute.Product}
              element={<Product />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
