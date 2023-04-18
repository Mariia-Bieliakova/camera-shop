import { Link } from 'react-router-dom';
import { AppRoute, START_PAGE } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changePage } from '../../store/ui/ui';

type LogoProps = {
  type: 'header' | 'footer';
}

const xlink = {
  header: '#icon-logo',
  footer: '#icon-logo-mono'
};

function Logo ({type}: LogoProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleLogoClick = () => {
    dispatch(changePage({page: START_PAGE}));
  };

  return (
    <Link
      className={`${type}__logo`}
      to={AppRoute.Root}
      aria-label="Переход на главную"
      onClick={handleLogoClick}
    >
      <svg width="100" height="36" aria-hidden="true">
        <use xlinkHref={xlink[type]} />
      </svg>
    </Link>
  );
}

export default Logo;
