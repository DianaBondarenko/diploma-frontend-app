import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HOME_ROUTE } from '../../global/constants';
import styles from './ConfirmationModal.module.scss';
import { ReactComponent as SuccessIcon } from '../../global/media/success.svg';
import { ReactComponent as ErrorIcon } from '../../global/media/error.svg';
import ModalWindow from '../ModalWindow';
import { ButtonVariant } from '../Button/Button';
import Button from '../Button';

interface ConfirmationModalProps {
  type: 'success' | 'error';
  isOpen: boolean;
  orderNumber: number | null | string;
  onModalClose: () => void;
}

const ConfirmationModal = ({
  type,
  isOpen,
  onModalClose,
  orderNumber,
}: ConfirmationModalProps) => {
  const history = useHistory();
  const { t } = useTranslation();

  const handleRedirectToHomePage = () => {
    history.push(HOME_ROUTE);
    onModalClose();
  };

  const successfulConfirm = (
    <div className={styles.mainContainer}>
      <div className={styles.icon}>
        <SuccessIcon />
      </div>
      <div className={styles.description}>
        <div className={styles.title}>{t('ConfirmationModal.TITLE')}</div>
        {orderNumber && (
          <div className={styles.orderNumber}>
            {t('ConfirmationModal.ORDER_NUMBER')}
            <div className={styles.number}>{orderNumber}</div>
          </div>
        )}
        <div className={styles.content}>
          {t('ConfirmationModal.DESCRIPTION')}
        </div>
      </div>
      <div className={styles.mainButton}>
        <Button
          variant={ButtonVariant.OUTLINED}
          onClick={handleRedirectToHomePage}
          text={t('ConfirmationModal.BACK_TO_HOME')}
        />
      </div>
    </div>
  );

  const errorConfirm = (
    <div className={styles.mainContainer}>
      <div className={styles.icon}>
        <ErrorIcon />
      </div>
      <div className={styles.description}>
        <div className={styles.title}>{t('ConfirmationModal.ERROR_TITLE')}</div>
        <div className={styles.content}>
          {t('ConfirmationModal.ERROR_DESCRIPTION')}
        </div>
      </div>
      <div className={styles.mainButton}>
        <Button
          variant={ButtonVariant.OUTLINED}
          onClick={handleRedirectToHomePage}
          text={t('ConfirmationModal.BACK_TO_HOME')}
        />
      </div>
    </div>
  );

  return (
    <>
      {isOpen && (
        <ModalWindow onClose={handleRedirectToHomePage}>
          {type === 'success' && successfulConfirm}
          {type === 'error' && errorConfirm}
        </ModalWindow>
      )}
    </>
  );
};

export default ConfirmationModal;
