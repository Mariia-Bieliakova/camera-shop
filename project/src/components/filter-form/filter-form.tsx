import { ChangeEvent } from 'react';
import { CameraLevel, CameraType, Category, START_PAGE, TIME_FOR_DEBOUNCE } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentPage, getMaximumPrice, getMinimalPrice} from '../../store/ui/selectors';
import { changePage, clearFilters, setCameraLevel, setCameraType, setCategory, setFromPrice, setToPrice } from '../../store/ui/ui';
import { useSearchParams } from 'react-router-dom';
import { debounce } from 'ts-debounce';

const PRICE_FROM = 'price_gte';
const PRICE_TO = 'price_lte';
const LEVEL = 'level';
const TYPE = 'type';
const CATEGORY = 'category';

function FilterForm (): JSX.Element {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(getCurrentPage);
  const minimalPrice = useAppSelector(getMinimalPrice);
  const maximumPrice = useAppSelector(getMaximumPrice);
  const [searchParams, setSearchParams] = useSearchParams();
  const priceLte = searchParams.get(PRICE_TO);
  const priceGte = searchParams.get(PRICE_FROM);

  const goOnStartPage = () => {
    if (currentPage !== START_PAGE) {
      dispatch(changePage({page: START_PAGE}));
    }
  };

  const handleLevelInputChange = (levelData: CameraLevel) => (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCameraLevel({cameraLevel: levelData}));
    goOnStartPage();

    setSearchParams(() => {
      if (evt.target.checked) {
        searchParams.append(levelData, LEVEL);
      } else {
        searchParams.delete(levelData);
      }

      return searchParams;
    });
  };

  const handleTypeInputChange = (typeData: CameraType) => (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCameraType({cameraType: typeData}));
    goOnStartPage();

    setSearchParams(() => {
      if (evt.target.checked) {
        searchParams.append(typeData, TYPE);
      } else {
        searchParams.delete(typeData);
      }

      return searchParams;
    });
  };

  const handleCategoryInputChange = (categoryData: Category) => (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCategory({category: categoryData}));
    goOnStartPage();

    setSearchParams(() => {
      if (evt.target.checked) {
        if(categoryData === Category.Videocamera) {
          searchParams.delete(CameraType.Film);
          searchParams.delete(CameraType.Snapshot);
        }
        searchParams.append(categoryData, CATEGORY);
      } else {
        searchParams.delete(categoryData);
      }

      return searchParams;
    });
  };

  const handleFromPriceInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const price = Number(e.target.value);

    if (price < 0) {
      e.target.value = '';
      return;
    }

    if (price >= minimalPrice && price <= maximumPrice) {
      if (priceLte && (price > Number(priceLte))) {
        e.target.value = '';
        return;
      }

      setSearchParams(() => {
        searchParams.set('price_gte', String(price));
        return searchParams;
      });

      dispatch(setFromPrice({fromPrice: price}));
      goOnStartPage();
    }
  };

  const debouncedFromPriceInputHandler = debounce(handleFromPriceInputChange, TIME_FOR_DEBOUNCE);

  const handleToPriceInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const price = Number(e.target.value);

    if (price < 0) {
      e.target.value = '';
      return;
    }

    if (price >= minimalPrice && price <= maximumPrice) {
      if (priceGte && price < Number(priceGte)) {
        return;
      }

      setSearchParams(() => {
        searchParams.set(PRICE_TO, String(price));
        return searchParams;
      });

      dispatch(setToPrice({toPrice: price}));
      goOnStartPage();
    }
  };

  const debouncedToPriceInputHandler = debounce(handleToPriceInputChange, TIME_FOR_DEBOUNCE);

  const handleResetButtonClick = () => {
    dispatch(clearFilters());
    setSearchParams(() => {
      searchParams.delete(PRICE_FROM);
      searchParams.delete(PRICE_TO);
      Object.values(Category).forEach((value) => searchParams.delete(value));
      Object.values(CameraLevel).forEach((value) => searchParams.delete(value));
      Object.values(CameraType).forEach((value) => searchParams.delete(value));

      return searchParams;
    });
  };

  let upPlaceholder = 'до';

  if (maximumPrice) {
    upPlaceholder = String(maximumPrice);
  }

  let fromPlaceholder = 'от';

  if (minimalPrice) {
    fromPlaceholder = String(minimalPrice);
  }

  return (
    <form action="#">
      <h2 className="visually-hidden">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="custom-input">
            <label>
              <input
                type="number"
                name="price"
                placeholder={fromPlaceholder}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onChange={debouncedFromPriceInputHandler}
              />
            </label>
          </div>
          <div className="custom-input">
            <label>
              <input
                type="number"
                name="priceUp"
                placeholder={upPlaceholder}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onChange={debouncedToPriceInputHandler}
              />
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Категория</legend>

        {Object.entries(Category).map(([name, value]) => (
          <div className="custom-checkbox catalog-filter__item" key={name}>
            <label>
              <input
                type="checkbox"
                name={name}
                onChange={handleCategoryInputChange(value)}
                checked={searchParams.get(value) !== null}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">{value}</span>
            </label>
          </div>
        ))}

      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Тип камеры</legend>

        {Object.entries(CameraType).map(([name, value]) => (
          <div className="custom-checkbox catalog-filter__item" key={name}>
            <label>
              <input
                type="checkbox"
                name={name}
                onChange={handleTypeInputChange(value)}
                checked={searchParams.get(value) !== null}
                disabled={searchParams.get(Category.Videocamera) !== null && (value === CameraType.Film || value === CameraType.Snapshot)}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">{value}</span>
            </label>
          </div>
        ))}

      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Уровень</legend>

        {Object.entries(CameraLevel).map(([name, value]) => (
          <div className="custom-checkbox catalog-filter__item" key={name}>
            <label>
              <input
                type="checkbox"
                name={name}
                onChange={handleLevelInputChange(value)}
                checked={searchParams.get(value) !== null}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">{value}</span>
            </label>
          </div>
        ))}

      </fieldset>
      <button
        className="btn catalog-filter__reset-btn"
        type="reset"
        onClick={handleResetButtonClick}
      >
        Сбросить фильтры
      </button>
    </form>
  );
}

export default FilterForm;
