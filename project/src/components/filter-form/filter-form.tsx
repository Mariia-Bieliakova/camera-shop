import { CameraLevel, CameraType, Category } from '../../const';

function FilterForm (): JSX.Element {

  return (
    <form action="#">
      <h2 className="visually-hidden">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="custom-input">
            <label>
              <input type="number" name="price" placeholder="от" />
            </label>
          </div>
          <div className="custom-input">
            <label>
              <input type="number" name="priceUp" placeholder="до" />
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Категория</legend>

        {Object.entries(Category).map(([name, value]) => (
          <div className="custom-checkbox catalog-filter__item" key={name}>
            <label>
              <input type="checkbox" name={name} />
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
              <input type="checkbox" name={name} />
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
              <input type="checkbox" name={name} />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">{value}</span>
            </label>
          </div>
        ))}

      </fieldset>
      <button className="btn catalog-filter__reset-btn" type="reset">
        Сбросить фильтры
      </button>
    </form>
  );
}

export default FilterForm;
