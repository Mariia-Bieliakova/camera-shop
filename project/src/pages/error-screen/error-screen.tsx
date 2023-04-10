import { CamerasParams, CAMERAS_PER_PAGE } from '../../const';
import { useAppDispatch } from '../../hooks';
import { fetchCamerasPerPage } from '../../store/api-actions';
import styles from './error-screen.module.css';

export default function ErrorScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleReplayButtonClick = () => {
    const camerasParams: CamerasParams = {
      start: 0,
      limit: CAMERAS_PER_PAGE
    };
    dispatch(fetchCamerasPerPage(camerasParams));
  };

  return (
    <div className={styles.container}>
      <p className={styles.errorText}> Что-то пошло не так:( Попробуйте обновить страницу </p>
      <button className={styles.replay}
        onClick={handleReplayButtonClick}
      >
        <span className={styles.btnText}> Обновить страницу </span>
      </button>
    </div>
  );
}
