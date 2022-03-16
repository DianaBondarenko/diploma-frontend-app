import * as Styled from './ControlButton.styles';

interface ControlButtonProps {
  active: boolean;
  onClick: () => void;
  title: string;
}

const ControlButton = ({ active, onClick, title }: ControlButtonProps) => {
  return (
    <Styled.ControlButtonContainer
      className={`${active && 'active'}`}
      onClick={onClick}
    >
      {title}
    </Styled.ControlButtonContainer>
  );
};

export default ControlButton;
