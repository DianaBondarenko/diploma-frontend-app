import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';
import logo from '../../global/media/logo-dark.svg';
import telegramLogo from '../../global/media/footer-telegram-logo.svg';
import viberLogo from '../../global/media/footer-viber-logo.svg';
import phoneIcon from '../../global/media/footer-phone-icon.svg';

const Footer = () => {
  const { t } = useTranslation();

  const icons = [
    {
      key: 'telegram',
      icon: telegramLogo,
      route: process.env.REACT_APP_TELEGRAM_URL,
    },
    {
      key: 'viber',
      icon: viberLogo,
      route: process.env.REACT_APP_VIBER_URL,
    },
  ];

  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.contentBlock}>
          <div className={styles.leftBlock}>
            <img src={logo} alt="application logo" />
            <div className={styles.description}>{t('Footer.DESCRIPTION')}</div>
          </div>
          <div className={styles.rightBlock}>
            <div className={styles.linksContainer}>
              {icons.map((item) => (
                <a href={item.route} key={item.key}>
                  <img src={item.icon} alt={item.key} className="icon" />
                </a>
              ))}
            </div>
            <div className={styles.phoneContainer}>
              <div className="icon">
                <img src={phoneIcon} alt="phone icon" />
              </div>
              <a href={`tel: ${process.env.REACT_APP_CONTACT_NUMBER}`}>
                {process.env.REACT_APP_CONTACT_NUMBER}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
