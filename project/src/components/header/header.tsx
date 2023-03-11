import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Logo from '../logo/logo';
import SearchForm from '../search-form/search-form';

function Header (): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container">

        <Logo type='header'/>

        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Root}>Каталог</Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="/#">Гарантии</a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="/#">Доставка</a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="/#">О компании</a>
            </li>
          </ul>
        </nav>
        <div className="form-search">
          <SearchForm />
        </div>
        <Link
          className="header__basket-link"
          to={AppRoute.Basket}
          data-testid='basket-link'
        >
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
          <span className="header__basket-count">3</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
