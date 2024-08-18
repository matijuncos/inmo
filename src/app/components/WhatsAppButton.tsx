'use client';
import { Box } from '@chakra-ui/react';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useInmoCtx } from '../context/InmoContext';

const WhatsAppButton = () => {
  const { setIsWhatsappModalOpen } = useInmoCtx();

  const openModal = () => {
    setIsWhatsappModalOpen(true);
  };

  return (
    <Box
      onClick={openModal}
      p='12px'
      background='white'
      cursor='pointer'
      borderRadius='100%'
      className='whats-app'
    >
      <FaWhatsapp size={36} />
    </Box>
  );
};

export default WhatsAppButton;
