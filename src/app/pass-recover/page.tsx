// This is the coponent that send the email, not the one that updates de password
'use client';
import React, { Suspense, useState } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Stack
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

export default function PassRecover() {
  const PAgeContent = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();
    const params = useSearchParams();

    const notify = (string: string) =>
      toast(string, { theme: 'dark', hideProgressBar: true });
    const handleSend = async () => {
      const token = params.get('token');
      try {
        setLoading(true);
        const response = await axios.post('/api/passwordReset', {
          email,
          token
        });
        setMessage(response.data.message);
        notify('Te enviamos un email para cambiar tu contraseña :)');
        router.push('/login');
      } catch (error: any) {
        setMessage(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
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
            <Box
              maxW='md'
              w='full'
              bg='white'
              boxShadow='xl'
              rounded='lg'
              p={6}
            >
              <Heading as='h2' size='lg' textAlign='center' mb={6}>
                Recuperar contraseña
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

                <Button
                  onClick={handleSend}
                  backgroundColor='#1C1E24'
                  color='white'
                  isDisabled={email === ''}
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
                  Enviar
                </Button>
                {message}
              </Stack>
            </Box>
          )}
        </Box>
      </main>
    );
  };

  return (
    <Suspense fallback='Loading...'>
      <PAgeContent />
    </Suspense>
  );
}
