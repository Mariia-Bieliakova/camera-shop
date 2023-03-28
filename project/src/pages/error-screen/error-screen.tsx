import { CAMERAS_PER_PAGE } from '../../const';
import { useAppDispatch } from '../../hooks';
import { fetchCamerasPerPage } from '../../store/api-actions';
import styles from './error-screen.module.css';

export default function ErrorScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <p className={styles.errorText}> Что-то пошло не так:( Попробуйте обновить страницу </p>
      <button className={styles.replay}
        onClick={() => {
          dispatch(fetchCamerasPerPage([0, CAMERAS_PER_PAGE]));
        }}
      >
        <span className={styles.btnText}> Обновить страницу </span>
      </button>
    </div>
  );
}
