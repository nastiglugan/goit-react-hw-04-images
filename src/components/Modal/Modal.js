import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const LargeImgModal = ({ onClose, largeImg, tags }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <Modal>
        <img src={largeImg} alt={tags} />
      </Modal>
    </Overlay>,
    modalRoot
  );
};

LargeImgModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
