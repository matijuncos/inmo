import React, { useState } from 'react';
import {
  Box,
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  Text
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const GuestModal = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/createGuest', {
        email,
        phone,
        fullName
      });
      if (res.status === 200 || res.status === 201) {
        router.push('/match');
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.userId);
        localStorage.setItem(
          'user',
          JSON.stringify({ email: res.data.email, fullName: res.data.name })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isDisabled = email === '' || fullName === '';
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
        <CloseButton outline='none' marginLeft='auto' onClick={onClose} />
        <ModalContent
          // maxW='1084px'
          minHeight='80vh'
          w='884px'
          m='0 auto'
          display='grid'
          placeItems='center'
        >
          <Box maxW='md' w='full' bg='white' boxShadow='xl' rounded='lg' p={6}>
            <Heading as='h2' size='lg' textAlign='center' mb={2}>
              Completa con tus datos
            </Heading>
            <Stack spacing={4}>
              <FormControl id='email'>
                <FormLabel>Dirección de correo electrónico</FormLabel>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  type='email'
                  placeholder='yourmail@mail.com'
                />
              </FormControl>
              <FormControl>
                <FormLabel>Contraseña</FormLabel>
                <InputGroup>
                  <Input
                    placeholder='Juan García'
                    onChange={(e) => setFullName(e.target.value)}
                    type='text'
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Teléfono</FormLabel>
                <InputGroup>
                  <Input
                    placeholder='xxx-xxxxxxx'
                    onChange={(e) => setPhone(e.target.value)}
                    type='tel'
                  />
                </InputGroup>
              </FormControl>
              <Button
                onClick={handleLogin}
                backgroundColor='#1C1E24'
                color='white'
                isDisabled={isDisabled}
                size='lg'
                _disabled={{
                  cursor: 'not-allowed',
                  bg: 'grey'
                }}
                _hover={{
                  bg: '#1C1E24'
                }}
                fontSize='md'
              >
                Entrar como invitado
              </Button>
            </Stack>
            <Text mt={4} textAlign='center'>
              <Link href='/register' style={{ color: '#1C1E24' }}>
                Registrate
              </Link>
            </Text>
          </Box>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default GuestModal;
