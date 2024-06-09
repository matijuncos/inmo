'use client';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  useColorModeValue,
  FormControl,
  FormLabel,
  Heading,
  Stack
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.post('/api/login', { email, password });
      if (res.status === 200) {
        router.push('/home');
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.userId);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <main>
      <Box
        display='flex'
        height='100%'
        alignItems='center'
        justifyContent='center'
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Box
          maxW='md'
          w='full'
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow='xl'
          rounded='lg'
          p={6}
        >
          <Heading as='h2' size='lg' textAlign='center' mb={6}>
            Inicia sesión
          </Heading>
          <Stack spacing={4}>
            <FormControl id='email'>
              <FormLabel>Dirección de correo electrónico</FormLabel>
              <Input onChange={(e) => setEmail(e.target.value)} type='email' />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Contraseña</FormLabel>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type='password'
              />
            </FormControl>
            <Button
              onClick={handleLogin}
              colorScheme='teal'
              size='lg'
              fontSize='md'
            >
              Iniciá sesión
            </Button>
          </Stack>
          <Text mt={4} textAlign='center'>
            {`No tenés cuenta?`}{' '}
            <a href='/register' style={{ color: 'teal' }}>
              Registrate
            </a>
          </Text>
        </Box>
      </Box>
    </main>
  );
}
