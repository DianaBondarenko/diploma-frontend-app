import React from 'react';
import * as Styled from './ModalWindow.styles';
import closeIcon from '../../global/media/modal-close-icon.svg';

interface ModalWindowProps {
  onClose: () => void;
}

const ModalWindow: React.FC<ModalWindowProps> = ({ onClose, children }) => {
  return (
    <>
      <Styled.ModalWindowBackdrop />
      <Styled.ModalWindowContainer>
        <Styled.ModalWindowHeader>
          <Styled.ModalCloseIconContainer onClick={onClose}>
            <img src={closeIcon} alt="close icon" />
          </Styled.ModalCloseIconContainer>
        </Styled.ModalWindowHeader>
        <Styled.ModalWindowContent>{children}</Styled.ModalWindowContent>
      </Styled.ModalWindowContainer>
    </>
  );
};

export default ModalWindow;
