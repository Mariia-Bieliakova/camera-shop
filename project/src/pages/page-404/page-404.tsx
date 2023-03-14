import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { AppRoute } from '../../const';
import styles from './page-404.module.css';

function PageNotFound(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>
          CameraShop|Not Found
        </title>
      </Helmet>
      <header className="header">
        <div className="container">
          <Logo type={'header'}/>
        </div>
      </header>
      <section className={styles.container}>
        <h1 className={styles.error}>
          404 Страница не найдена
        </h1>
        <Link to={AppRoute.Root} className={styles.back} data-testid='return'>
          Вернуться на главную страницу
        </Link>
      </section>
    </>
  );
}

export default PageNotFound;
