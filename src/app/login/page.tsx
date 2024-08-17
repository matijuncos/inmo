'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Input,
  Text,
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
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Loader from '../components/Loader';
import Link from 'next/link';
import { useInmoCtx } from '../context/InmoContext';

export default function Home() {
  const { setUser } = useInmoCtx();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/login', { email, password });
      setUser(res.data);
      setTimeout(() => {
        router.push('/match');
        console.log('deberia estar navegando');
      }, 500);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      console.log(error);
    }
  };

  const isDisabled = password === '' || email === '';
  useEffect(() => {
    return () => setLoading(false);
  }, []);
  return (
    <main>
      <Box
        display='flex'
        height='100%'
        minHeight='calc(100vh - 280px)'
        alignItems='center'
        justifyContent='center'
      >
        {loading ? (
          <Loader />
        ) : (
          <Box maxW='md' w='full' bg='white' boxShadow='xl' rounded='lg' p={6}>
            <Heading
              as='h2'
              color='rgb(181, 2, 2)'
              size='lg'
              textAlign='center'
              mb='14px'
            >
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
              {errorMessage && (
                <Text fontSize={12} color='red'>
                  {errorMessage}
                </Text>
              )}
              <Button
                onClick={handleLogin}
                backgroundColor='rgb(181, 2, 2)'
                color='white'
                isDisabled={isDisabled}
                size='lg'
                _disabled={{
                  cursor: 'not-allowed',
                  bg: 'grey'
                }}
                _hover={{
                  bg: 'rgb(189, 2, 20)'
                }}
                fontSize='md'
              >
                Iniciá sesión
              </Button>
            </Stack>
            <Text mt={4} textAlign='center'>
              No tenés cuenta?{' '}
              <Link href='/register' style={{ color: '#1C1E24' }}>
                Registrate
              </Link>
            </Text>
            <Text mt={4} textAlign='center'>
              <Link href='/pass-recover'>Olvidé mi contraseña</Link>
            </Text>
          </Box>
        )}
      </Box>
    </main>
  );
}
