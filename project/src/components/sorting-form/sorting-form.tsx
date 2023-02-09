import { SortOrder, SortType } from '../../const';

function SortingForm (): JSX.Element {
  return (
    <form action="#">
      <div className="catalog-sort__inner">
        <p className="title title--h5">Сортировать:</p>
        <div className="catalog-sort__type">

          {Object.entries(SortType).map(([name, value]) => (
            <div className="catalog-sort__btn-text" key={name}>
              <input type="radio" id={name} name="sort" />
              <label htmlFor={name}>{value}</label>
            </div>
          ))}
        </div>
        <div className="catalog-sort__order">

          {Object.values(SortOrder).map(({name, value}) => (
            <div className={`catalog-sort__btn catalog-sort__btn--${name}`} key={name}>
              <input type="radio" id={name} name="sort-icon" aria-label={value} />
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
