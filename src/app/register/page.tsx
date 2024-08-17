'use client';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Text,
  useColorModeValue,
  FormControl,
  FormLabel,
  Heading,
  Stack
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loader from '../components/Loader';
import { useInmoCtx } from '../context/InmoContext';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useInmoCtx();
  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/createUser', {
        email,
        password,
        fullName,
        phone
      });
      if (res.status === 201) {
        setUser(res.data);
        router.push('/match');
      }
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Box
        display='flex'
        height='100%'
        alignItems='center'
        justifyContent='center'
        p={6}
      >
        <Box
          maxW='md'
          w='full'
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow='xl'
          rounded='lg'
          p={6}
        >
          {loading ? (
            <Box m='auto' display='grid' placeItems='center'>
              <Loader />
            </Box>
          ) : (
            <>
              <Heading as='h2' size='lg' textAlign='center' mb={6}>
                Registrate
              </Heading>
              <Stack spacing={4}>
                <FormControl id='fullName'>
                  <FormLabel>Nombre Completo</FormLabel>
                  <Input
                    onChange={(e) => setFullName(e.target.value)}
                    type='text'
                  />
                </FormControl>
                <FormControl id='phone'>
                  <FormLabel>Teléfono</FormLabel>
                  <Input
                    onChange={(e) => setPhone(e.target.value)}
                    type='tel'
                  />
                </FormControl>
                <FormControl id='email'>
                  <FormLabel>Dirección de correo electrónico</FormLabel>
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                  />
                </FormControl>
                <FormControl id='password'>
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                  />
                </FormControl>
                {errorMessage && (
                  <Text fontSize={12} color='red'>
                    {errorMessage}
                  </Text>
                )}
                <Button onClick={handleLogin} size='lg' fontSize='md'>
                  Registrate
                </Button>
              </Stack>
              <Text mt={4} textAlign='center'>
                {`Ya tenés cuenta?`} <Link href='/login'>Inicià sesiòn</Link>
              </Text>
            </>
          )}
        </Box>
      </Box>
    </main>
  );
}
