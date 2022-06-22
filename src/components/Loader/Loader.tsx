import CircularProgress from '@mui/material/CircularProgress';
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.mainContainer}>
      <CircularProgress size={75} />
    </div>
  );
};

export default Loader;
