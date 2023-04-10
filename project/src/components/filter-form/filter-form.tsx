import { ChangeEvent } from 'react';
import { CameraLevel, CameraType, Category, START_PAGE, TIME_FOR_DEBOUNCE } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameraLevels, getCameraTypes, getCategories, getCurrentPage, getFromPrice, getMaximumPrice, getMinimalPrice, getToPrice} from '../../store/ui/selectors';
import { changePage, clearFilters, setCameraLevel, setCameraType, setCategory, setFromPrice, setToPrice } from '../../store/ui/ui';
import { debounce } from 'ts-debounce';

function FilterForm (): JSX.Element {
  const dispatch = useAppDispatch();
  const levels = useAppSelector(getCameraLevels);
  const types = useAppSelector(getCameraTypes);
  const categories = useAppSelector(getCategories);
  const currentPage = useAppSelector(getCurrentPage);
  const minimalPrice = useAppSelector(getMinimalPrice);
  const maximumPrice = useAppSelector(getMaximumPrice);
  const fromPrice = useAppSelector(getFromPrice);
  const toPrice = useAppSelector(getToPrice);

  const goOnStartPage = () => {
    if (currentPage !== START_PAGE) {
      dispatch(changePage({page: START_PAGE}));
    }
  };

  const handleLevelInputChange = (levelData: CameraLevel) => () => {
    dispatch(setCameraLevel({cameraLevel: levelData}));
    goOnStartPage();
  };

  const handleTypeInputChange = (typeData: CameraType) => () => {
    dispatch(setCameraType({cameraType: typeData}));
    goOnStartPage();
  };

  const handleCategoryInputChange = (categoryData: Category) => () => {
    dispatch(setCategory({category: categoryData}));
    goOnStartPage();
  };

  const handleFromPriceInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let price = Number(e.target.value);

    if (price < minimalPrice) {
      e.target.value = String(minimalPrice);
      price = minimalPrice;
    }

    dispatch(setFromPrice({fromPrice: price}));
    goOnStartPage();
  };

  const debouncedFromPriceInputHandler = debounce(handleFromPriceInputChange, TIME_FOR_DEBOUNCE);

  const handleToPriceInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let price = Number(e.target.value);

    if (price < 0) {
      e.target.value = '';
      return;
    }

    if (price < minimalPrice || (fromPrice && price < fromPrice)) {
      e.target.value = '';
      return;
    }

    if (price > maximumPrice) {
      e.target.value = String(maximumPrice);
      price = maximumPrice;
    }

    dispatch(setToPrice({toPrice: price}));
    goOnStartPage();
  };

  const debouncedToPriceInputHandler = debounce(handleToPriceInputChange, TIME_FOR_DEBOUNCE);

  const handleResetButtonClick = () => {
    dispatch(clearFilters());
  };

  let upPlaceholder = 'до';

  if (toPrice) {
    upPlaceholder = String(toPrice);
  }

  if (!toPrice && maximumPrice) {
    upPlaceholder = String(maximumPrice);
  }

  let fromPlaceholder = 'от';

  if (fromPrice) {
    fromPlaceholder = String(fromPrice);
  }

  if (!fromPrice && minimalPrice) {
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
                checked={categories.includes(value)}
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
                checked={types.includes(value)}
                disabled={categories.includes(Category.Videocamera) && (value === CameraType.Film || value === CameraType.Snapshot)}
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
                checked={levels.includes(value)}
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
