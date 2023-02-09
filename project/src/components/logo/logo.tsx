import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type LogoProps = {
  type: 'header' | 'footer';
}

const xlink = {
  header: '#icon-logo',
  footer: '#icon-logo-mono'
};

function Logo ({type}: LogoProps): JSX.Element {
  return (
    <Link className={`${type}__logo`} to={AppRoute.Root} aria-label="Переход на главную">
      <svg width="100" height="36" aria-hidden="true">
        <use xlinkHref={xlink[type]} />
      </svg>
    </Link>
  );
}

export default Logo;
