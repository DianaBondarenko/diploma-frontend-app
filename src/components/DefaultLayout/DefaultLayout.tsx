import styles from './DefaultLayout.module.scss';
import { ILayoutProps } from './types';

const DefaultLayout = ({ children }: ILayoutProps) => {
  return (
    <div className={styles.mainContentContainer}>
      <div className={styles.mainContent}>{children}</div>
    </div>
  );
};

export default DefaultLayout;
