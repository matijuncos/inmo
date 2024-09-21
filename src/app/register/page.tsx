'use client';
import React, { useState, useCallback } from 'react';
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
  FormErrorMessage,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loader from '../components/Loader';
import { useInmoCtx } from '../context/InmoContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    repeatPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const router = useRouter();
  const { setUser } = useInmoCtx();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (name === 'repeatPassword') {
        setPasswordMatch(value === formData.password);
        setErrorMessage('');
      }
    },
    [formData.password]
  );

  const handleRegister = async () => {
    const { email, password, fullName, phone, repeatPassword } = formData;
    const isFormComplete =
      email && password && fullName && phone && repeatPassword;
    const hasErrors = !passwordMatch || !isFormComplete;

    if (!isFormComplete) {
      setErrorMessage('Complete todos los campos');
    } else if (!passwordMatch) {
      setErrorMessage('Las contraseñas no coinciden');
    }
    if (hasErrors) return;

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
      setErrorMessage(error.response?.data?.message || 'Error al registrar');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleRegister();
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
                {['fullName', 'phone', 'email'].map((field) => (
                  <FormControl key={field} id={field} isRequired>
                    <FormLabel>
                      {field === 'fullName'
                        ? 'Nombre Completo'
                        : field === 'phone'
                        ? 'Teléfono'
                        : 'Dirección de correo electrónico'}
                    </FormLabel>
                    <Input
                      name={field}
                      onChange={handleInputChange}
                      type={
                        field === 'email'
                          ? 'email'
                          : field === 'phone'
                          ? 'tel'
                          : 'text'
                      }
                    />
                  </FormControl>
                ))}
                {['password', 'repeatPassword'].map((field, index) => (
                  <FormControl
                    key={field}
                    id={field}
                    isRequired
                    isInvalid={field === 'repeatPassword' && !passwordMatch}
                  >
                    <FormLabel>
                      {field === 'password'
                        ? 'Contraseña'
                        : 'Repetir Contraseña'}
                    </FormLabel>
                    <InputGroup>
                      <Input
                        name={field}
                        onKeyDown={handleKeyPress}
                        onChange={handleInputChange}
                        type={showPassword ? 'text' : 'password'}
                      />
                      {index === 0 && (
                        <InputRightElement width='4.5rem'>
                          <Button
                            h='1.75rem'
                            size='sm'
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        </InputRightElement>
                      )}
                    </InputGroup>
                    {field === 'repeatPassword' && !passwordMatch && (
                      <FormErrorMessage>
                        Las contraseñas no coinciden
                      </FormErrorMessage>
                    )}
                  </FormControl>
                ))}
                {errorMessage && (
                  <Text fontSize={12} color='red'>
                    {errorMessage}
                  </Text>
                )}
                <Button
                  _disabled={{
                    cursor: 'not-allowed',
                    bg: 'grey'
                  }}
                  _hover={{
                    bg: 'rgb(189, 2, 20)'
                  }}
                  fontSize='md'
                  color='white'
                  bg='gray'
                  onClick={handleRegister}
                  size='lg'
                >
                  Registrate
                </Button>
              </Stack>
              <Text mt={4} textAlign='center'>
                {`Ya tenés cuenta?`} <Link href='/login'>Iniciá sesión</Link>
              </Text>
            </>
          )}
        </Box>
      </Box>
    </main>
  );
}
