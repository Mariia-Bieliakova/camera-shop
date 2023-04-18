import cn from 'classnames';
import { generatePath, Link, useSearchParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentPage, getPagesCount } from '../../store/ui/selectors';
import { changePage } from '../../store/ui/ui';

function Pagination ():JSX.Element {
  const pagesCount = useAppSelector(getPagesCount);
  const currentPage = useAppSelector(getCurrentPage);
  const dispatch = useAppDispatch();
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const pages = [...Array(pagesCount).keys()].map((el) => el + 1);
  const [searchParams] = useSearchParams();

  const handlePageClick = (page: number) => () => {
    dispatch(changePage({page}));
  };


  return (
    <div className="pagination">
      <ul className="pagination__list">

        {prevPage >= 1 &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={`${AppRoute.Root}${generatePath(AppRoute.Catalog, {page: String(prevPage)})}?${searchParams.toString()}`}
              onClick={handlePageClick(prevPage)}
            >Назад
            </Link>
          </li>}

        {pages.map((page) => {
          const className = cn(
            'pagination__link',
            {'pagination__link--active': page === currentPage}
          );
          return (
            <li className="pagination__item" key={page}>
              <Link
                className={className}
                to={`${AppRoute.Root}${generatePath(AppRoute.Catalog, {page: String(page)})}?${searchParams.toString()}`}
                onClick={handlePageClick(page)}
              > {page}
              </Link>
            </li>
          );})}

        {nextPage <= pagesCount &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={`${AppRoute.Root}${generatePath(AppRoute.Catalog, {page: String(nextPage)})}?${searchParams.toString()}`}
              onClick={handlePageClick(nextPage)}
            >Далее
            </Link>
          </li>}

      </ul>
    </div>
  );
}

export default Pagination;
