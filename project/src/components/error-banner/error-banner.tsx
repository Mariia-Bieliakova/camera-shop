import styles from './error-banner.module.css';

function ErrorBanner (): JSX.Element {
  return (
    <div className={`banner ${styles.error}`}>
      <p className="banner__info">
        <span className="banner__text">
        Не удалось загрузить промо:( <br />
        Попробуйте обновить страницу.
        </span>
      </p>
    </div>
  );
}

export default ErrorBanner;
