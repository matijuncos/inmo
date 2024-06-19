'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Input,
  Text,
  useColorModeValue,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Loader from './components/Loader';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const color = useColorModeValue('white', 'gray.700');

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/login', { email, password });
      if (res.status === 200) {
        router.push('/home');
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken && 'exp' in decodedToken && decodedToken.exp) {
        const isExpired = decodedToken.exp * 1000 < Date.now();
        if (!isExpired) {
          router.push('/home');
        }
      }
    }
  }, [router]);

  const isDisabled = password === '' || email === '';

  return (
    <main>
      <Box
        display='flex'
        height='100%'
        alignItems='center'
        justifyContent='center'
      >
        {loading ? (
          <Loader />
        ) : (
          <Box maxW='md' w='full' bg={color} boxShadow='xl' rounded='lg' p={6}>
            <Heading as='h2' size='lg' textAlign='center' mb={6}>
              Inicia sesión
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
              <FormControl id='password'>
                <FormLabel>Contraseña</FormLabel>
                <InputGroup>
                  <Input
                    placeholder='********'
                    onChange={(e) => setPassword(e.target.value)}
                    type={show ? 'text' : 'password'}
                  />
                  {password !== '' && (
                    <InputRightElement>
                      <IconButton
                        bg='transparent'
                        borderRadius='100%'
                        aria-label={show ? 'Hide password' : 'Show password'}
                        icon={show ? <FaEyeSlash /> : <FaEye />}
                        onClick={() => setShow(!show)}
                        size='sm'
                      />
                    </InputRightElement>
                  )}
                </InputGroup>
              </FormControl>
              <Button
                onClick={handleLogin}
                backgroundColor='#D8C3A5'
                color='white'
                isDisabled={isDisabled}
                size='lg'
                _disabled={{
                  cursor: 'not-allowed',
                  bg: 'grey'
                }}
                _hover={{
                  bg: '#D8C499'
                }}
                fontSize='md'
              >
                Iniciá sesión
              </Button>
            </Stack>
            <Text mt={4} textAlign='center'>
              {`No tenés cuenta?`}{' '}
              <a href='/register' style={{ color: '#D8C3A5' }}>
                Registrate
              </a>
            </Text>
          </Box>
        )}
      </Box>
    </main>
  );
}
