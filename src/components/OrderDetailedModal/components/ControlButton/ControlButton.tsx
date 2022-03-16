import * as Styled from './ControlButton.styles';

interface ControlButtonProps {
  active: boolean;
  onClick: () => void;
  title: string;
  disabled: boolean;
}

const ControlButton = ({
  active,
  onClick,
  title,
  disabled,
}: ControlButtonProps) => {
  return (
    <Styled.ControlButtonContainer
      className={`${active && 'active'} ${disabled && 'disabled'}`}
      onClick={() => {
        if (!disabled) {
          onClick();
        }
      }}
    >
      {title}
    </Styled.ControlButtonContainer>
  );
};

export default ControlButton;
