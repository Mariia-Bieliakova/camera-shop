import { useSearchParams } from 'react-router-dom';
import { OrderData, SortData, SortOrder, START_PAGE } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOrderType, getSortType } from '../../store/ui/selectors';
import { changePage, setOrderType, setSortType } from '../../store/ui/ui';

type SortingType = {[key: string]: SortData};
type SortingOrder = {[key: string]: OrderData};

const sortingType: SortingType = {
  'по цене': SortData.Price,
  'по популярности': SortData.Rating
};

const sortingOrder: SortingOrder = {
  'up': OrderData.Ascending,
  'down': OrderData.Descending
};

function SortingForm (): JSX.Element {
  const sortType = useAppSelector(getSortType);
  const orderType = useAppSelector(getOrderType);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const handleSortInputCheck = (sortBy: SortData) => () => {
    if (orderType === OrderData.Idle) {
      dispatch(setOrderType({orderType: OrderData.Ascending}));
    }

    dispatch(changePage({page: START_PAGE}));
    dispatch(setSortType({sortType: sortBy}));

    setSearchParams(() => {
      const order = orderType ? orderType : OrderData.Ascending;

      searchParams.set('sort', sortBy);
      searchParams.set('order', order);

      return searchParams;
    });
  };

  const handleOrderInputCheck = (order: OrderData) => () => {
    if (sortType === SortData.Idle) {
      dispatch(setSortType({sortType: SortData.Price}));
    }

    dispatch(changePage({page: START_PAGE}));
    dispatch(setOrderType({orderType: order}));

    setSearchParams(() => {
      const sort = sortType ? sortType : SortData.Price;

      searchParams.set('sort', sort);
      searchParams.set('order', order);

      return searchParams;
    });
  };

  return (
    <form action="#">
      <div className="catalog-sort__inner">
        <p className="title title--h5">Сортировать:</p>
        <div className="catalog-sort__type">

          {Object.entries(sortingType).map(([name, value]) => (
            <div className="catalog-sort__btn-text" key={value}>
              <input
                type="radio"
                id={value}
                name="sort"
                onChange={handleSortInputCheck(value)}
                checked={currentSort === value}
                data-testid={value}
              />
              <label htmlFor={value}>{name}</label>
            </div>
          ))}
        </div>
        <div className="catalog-sort__order">

          {Object.values(SortOrder).map(({name, value}) => (
            <div className={`catalog-sort__btn catalog-sort__btn--${name}`} key={name}>
              <input
                type="radio"
                id={name}
                name="sort-icon"
                aria-label={value}
                onChange={handleOrderInputCheck(sortingOrder[name])}
                checked={sortingOrder[name] === currentOrder}
              />
              <label htmlFor={name}>
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
          ))}

        </div>
      </div>
    </form>
  );
}

export default SortingForm;
