import { FC } from 'react';
import styles from './Button.module.scss';

enum ButtonVariant {
  CONTAINED = 'CONTAINED',
  OUTLINED = 'OUTLINED',
}
interface ButtonProps {
  onClick: () => void;
  text: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const Button: FC<ButtonProps> = ({
  onClick,
  text,
  disabled = false,
  variant = ButtonVariant.CONTAINED,
  fullWidth = false,
  children,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  const linkStyleStrategy = {
    [ButtonVariant.CONTAINED]: styles.containedLink,
    [ButtonVariant.OUTLINED]: styles.outlinedLink,
  };

  const buttonContainerStyleStrategy = {
    [ButtonVariant.CONTAINED]: styles.containedButtonContainer,
    [ButtonVariant.OUTLINED]: styles.outlinedButtonContainer,
  };

  return (
    <div
      className={`${buttonContainerStyleStrategy[variant]} ${
        fullWidth && styles.fullWidth
      } ${children && !text && styles.onlyIconButtonContainer}`}
    >
      <div
        className={`${linkStyleStrategy[variant]} ${
          disabled && styles.disabled
        }`}
        aria-disabled={disabled}
        onClick={handleClick}
      >
        {children && <div className={styles.childrenContent}>{children}</div>}
        {text && <div className={styles.textLink}>{text}</div>}
      </div>
    </div>
  );
};

export default Button;
