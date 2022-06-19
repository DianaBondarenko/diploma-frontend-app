import styles from './AboutUs.module.scss';
import { ABOUT_US } from './constants';

const AboutUs = () => {
  return (
    <div className={styles.aboutUsContainer}>
      <div className={styles.title}>{ABOUT_US.title}</div>
      <div className={styles.subtitle}>
        <div className={styles.firstPart}>{ABOUT_US.subtitleP1}</div>
        <div className={styles.secondPart}>{ABOUT_US.subtitleP2}</div>
      </div>
    </div>
  );
};

export default AboutUs;
