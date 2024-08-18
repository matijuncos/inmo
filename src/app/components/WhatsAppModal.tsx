'use client';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useInmoCtx } from '../context/InmoContext';

const WhatsAppModal = () => {
  const { isWhatsappModalOpen, setIsWhatsappModalOpen } = useInmoCtx();
  const [message, setMessage] = useState('');
  const [messageEmpetyError, setMessageEmptyError] = useState(false);
  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (message.length < 1) {
      setMessageEmptyError(true);
      setTimeout(() => setMessageEmptyError(false), 3000);
    } else {
      // Regex expression to remove all characters which are NOT alphanumeric
      let number = '3512011794';

      // Appending the phone number to the URL
      let url = `https://wa.me/${number}`;
      url += `&text=${encodeURI(message)}`;
      window.open(url);
      setIsWhatsappModalOpen(false);
    }
  };
  return (
    <>
      <Modal
        isOpen={isWhatsappModalOpen}
        onClose={() => setIsWhatsappModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Gracias por contactarte</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              onChange={handleChange}
              placeholder='Escribì tu mensaje...'
            />
          </ModalBody>
          {messageEmpetyError && (
            <Text color='red'>Debes escribir un mensaje para enviar</Text>
          )}
          <ModalFooter>
            <Button
              variant='ghost'
              mr={3}
              onClick={() => setIsWhatsappModalOpen(false)}
            >
              Cerrar
            </Button>
            <Button
              onClick={onSubmit}
              color='white'
              backgroundColor='#4EC95C'
              variant='ghost'
            >
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WhatsAppModal;
