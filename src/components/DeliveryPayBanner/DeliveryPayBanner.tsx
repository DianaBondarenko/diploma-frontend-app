import { useHistory } from 'react-router-dom';
import styles from './DeliveryPayBanner.module.scss';
import Button from '../../components/Button';
import { useTranslation } from 'react-i18next';
import { SHOPS_ROUTE } from '../../global/constants';

interface DeliveryPayBannerProps {
  disabled?: boolean;
}

const DeliveryPayBanner = ({ disabled }: DeliveryPayBannerProps) => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleButtonClick = () => {
    history.push(SHOPS_ROUTE);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainInfo}>
        <div className={styles.title}>
          {t('DeliveryPayBanner.DELIVERY_AND_PAYMENT')}
        </div>
        <div className={styles.info}>
          {[
            t('DeliveryPayBanner.INFO.INFO_P1'),
            t('DeliveryPayBanner.INFO.INFO_P2'),
            t('DeliveryPayBanner.INFO.INFO_P3'),
            t('DeliveryPayBanner.INFO.INFO_P4'),
            t('DeliveryPayBanner.INFO.INFO_P5'),
          ].map((item, index) => (
            <ul key={index}>
              <li>{item}</li>
            </ul>
          ))}
        </div>
        <div className={styles.additionalInfo}>
          {t('DeliveryPayBanner.ADDITIONAL_INFO')}
        </div>
      </div>
      <div className={styles.button}>
        <Button
          onClick={handleButtonClick}
          text={t('DeliveryPayBanner.BUTTON_TEXT')}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default DeliveryPayBanner;
