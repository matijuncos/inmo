import React from 'react';
import {
  Box,
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
          maxW='884px'
          // height='540px'
          w='884px'
          m='0 auto'
          display='grid'
          placeItems='center'
        >
          <div
            style={{
              borderRadius: '6px',
              backgroundImage: 'url(' + imageUrl + ')',
              backgroundPosition: '0% 0%',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              margin: 'auto',
              overflow: 'hidden',
              width: '100%',
              height: '540px'
            }}
          >
            <Box
              backgroundColor='white'
              width='fit-content'
              ml='auto'
              borderRadius='0 0 0 50% '
            >
              <CloseButton
                outline='white'
                marginLeft='auto'
                onClick={onClose}
              />
            </Box>
          </div>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default ImageModal;
