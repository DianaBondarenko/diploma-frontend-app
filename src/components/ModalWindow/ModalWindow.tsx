import { FC } from 'react';
import styles from './ModalWindow.module.scss';
import closeIcon from '../../global/media/modal-close-icon.svg';

interface ModalWindowProps {
  onClose: () => void;
}

const ModalWindow: FC<ModalWindowProps> = ({ onClose, children }) => {
  return (
    <>
      <div className={styles.modalBackdrop} />
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <div onClick={onClose}>
            <img src={closeIcon} alt="close icon" />
          </div>
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </>
  );
};

export default ModalWindow;
