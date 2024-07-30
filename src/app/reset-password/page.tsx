// This is the component that upates de password. Not the one that sends the email.
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
import Loader from '@/app/components/Loader';
import { toast } from 'react-toastify';

export default function ResetPassword() {
  const PageContent = () => {
    const [dupePass, setDupePass] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const params = useSearchParams();
    const router = useRouter();

    const notify = (string: string) =>
      toast(string, { theme: 'dark', hideProgressBar: true });
    const handleSubmit = async () => {
      setLoading(true);
      const token = params.get('token');
      try {
        const response = await axios.post('/api/request-reset', {
          password,
          token
        });
        setMessage(response.data.message);
        notify('Contraseña actualizada!');
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
                  <FormLabel>Nueva contraseña</FormLabel>

                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    placeholder='*******'
                  />
                </FormControl>
                <FormControl id='email'>
                  <FormLabel>Repetir contraseña</FormLabel>

                  <Input
                    onChange={(e) => setDupePass(e.target.value)}
                    type='password'
                    placeholder='*******'
                  />
                </FormControl>

                <Button
                  onClick={handleSubmit}
                  backgroundColor='#1C1E24'
                  color='white'
                  isDisabled={password === '' || dupePass !== password}
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
      <PageContent />
    </Suspense>
  );
}
