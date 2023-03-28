import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSearchCameras } from '../../store/api-actions';
import { clearSearchCameras } from '../../store/cameras/cameras';
import { getSearchCameras } from '../../store/cameras/selectors';

function SearchForm (): JSX.Element {
  const [searchPhrase, setSearchPhrase] = useState('');
  const dispatch = useAppDispatch();
  const searchCamerasList = useAppSelector(getSearchCameras);

  useEffect(() => {
    searchPhrase.length > 0 ?
      dispatch(fetchSearchCameras(searchPhrase)) :
      dispatch(clearSearchCameras());
  }, [searchPhrase, dispatch]);

  const handleInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setSearchPhrase(target.value);
  };

  const handleResetButtonClick = () => {
    setSearchPhrase('');
  };

  return (
    <>
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens" />
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={searchPhrase}
            onChange={handleInputChange}
          />
        </label>
        <ul
          className="form-search__select-list"
          style={searchPhrase.length > 0 ?
            {visibility: 'visible', opacity: '1'} :
            {}}
        >
          {searchCamerasList && searchCamerasList.length > 0 ?
            searchCamerasList.map((camera) => (
              <li
                className="form-search__select-item"
                tabIndex={0}
                key={camera.id}
              > {camera.name}
              </li>)) :
            <li className="form-search__select-item"
              tabIndex={0}
            >Ничего не удалось найти
            </li>}
        </ul>
      </form>
      <button
        className="form-search__reset"
        type="reset"
        onClick={handleResetButtonClick}
        style={searchPhrase.length > 0 ?
          {display: 'inline-block'} :
          {}}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </>
  );
}

export default SearchForm;
