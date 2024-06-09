import React from 'react';
import {
  CloseButton,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
const ImageModal = ({
  isOpen,
  onClose,
  imageUrl
}: {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}) => {
  return (
    <Modal
      blockScrollOnMount
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick
      size='3xl'
    >
      <ModalOverlay>
        <ModalContent
          maxW='1084px'
          w='884px'
          m='0 auto'
          display='grid'
          placeItems='center'
        >
          <CloseButton outline='none' marginLeft='auto' onClick={onClose} />
          <div
            style={{
              borderRadius: '6px',
              backgroundImage: 'url(' + imageUrl + ')',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              margin: 'auto',
              overflow: 'hidden',
              width: '400px',
              height: '500px'
            }}
          />
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default ImageModal;
