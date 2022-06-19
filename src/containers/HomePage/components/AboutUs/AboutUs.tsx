import { useTranslation } from 'react-i18next';
import styles from './AboutUs.module.scss';

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.aboutUsContainer}>
      <div className={styles.title}>{t('AboutUs.TITLE_TEXT')}</div>
      <div className={styles.subtitle}>
        <div className={styles.firstPart}>{t('AboutUs.SUBTITLE1_TEXT')}</div>
        <div className={styles.secondPart}>{t('AboutUs.SUBTITLE2_TEXT')}</div>
      </div>
    </div>
  );
};

export default AboutUs;
