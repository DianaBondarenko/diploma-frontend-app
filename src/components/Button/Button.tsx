import React from 'react';
import * as Styled from './Button.styles';

interface ButtonProps {
  onClick: () => void;
  text: string;
  disabled?: boolean;
  variant?: 'contained' | 'outlined';
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  disabled,
  variant,
  children,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  const buttonContent = (
    <>
      {children && <div className="children-content">{children}</div>}
      {text && <div className="text-link">{text}</div>}
    </>
  );

  return variant === 'contained' ? (
    <Styled.ContainedButtonContainer>
      <Styled.ContainedLink
        aria-disabled={disabled}
        onClick={handleClick}
        className={`${disabled && 'disabled'}`}
      >
        {buttonContent}
      </Styled.ContainedLink>
    </Styled.ContainedButtonContainer>
  ) : (
    <Styled.OutlinedButtonContainer>
      <Styled.OutlinedLink
        aria-disabled={disabled}
        onClick={handleClick}
        className={`${disabled && 'disabled'}`}
      >
        {buttonContent}
      </Styled.OutlinedLink>
    </Styled.OutlinedButtonContainer>
  );
};

Button.defaultProps = {
  disabled: false,
  variant: 'contained',
};

export default Button;
