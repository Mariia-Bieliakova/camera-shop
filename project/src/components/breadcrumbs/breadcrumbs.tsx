import { Link } from 'react-router-dom';
import { AppRoute, START_PAGE } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changePage } from '../../store/ui/ui';

type BreadcrumbsProps = {
  productName?: string;
}

function Breadcrumbs ({productName}: BreadcrumbsProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleMainClick = () => {
    dispatch(changePage({page: START_PAGE}));
  };

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link
              className="breadcrumbs__link"
              to={AppRoute.Root}
              onClick={handleMainClick}
            >Главная
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini" />
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item">
            {productName ?
              <Link className="breadcrumbs__link" to={AppRoute.Root}>Каталог
                <svg width="5" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini" />
                </svg>
              </Link>
              : <span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>}
          </li>
          {productName &&
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active"> {productName} </span>
            </li>}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;
