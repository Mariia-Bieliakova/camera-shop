import { ChangeEvent, useEffect, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSearchCameras } from '../../store/api-actions';
import { clearSearchCameras } from '../../store/cameras/cameras';
import { getSearchCameras, selectSearchCamerasStatus } from '../../store/cameras/selectors';
import Spinner from '../spinner/spinner';

function SearchForm (): JSX.Element {
  const [searchPhrase, setSearchPhrase] = useState('');
  const dispatch = useAppDispatch();
  const searchCamerasList = useAppSelector(getSearchCameras);
  const {isLoading} = useAppSelector(selectSearchCamerasStatus);

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

  const serverAnswer = () => {
    if (!isLoading && searchCamerasList?.length === 0) {
      return (
        <li
          className="form-search__select-item"
        >
        Ничего не найдено
        </li>);
    }

    return (
      <li style={{display: 'flex', justifyContent: 'center'}}>
        <Spinner size='small' color='purple' />
      </li>);
  };

  return (
    <>
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens" />
          </svg>
          <input
            data-testid='search-input'
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
              <Link to={`${AppRoute.Root}${generatePath(AppRoute.Product, {id: String(camera.id)})}`} key={camera.id}>
                <li
                  className="form-search__select-item"
                > {camera.name}
                </li>
              </Link>)) :
            serverAnswer()}
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
