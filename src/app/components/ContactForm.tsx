'use client';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  Text,
  Spinner
} from '@chakra-ui/react';
import { FiPhone, FiMail } from 'react-icons/fi';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const ContactForm = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipoPropiedad, setTipoPropiedad] = useState('');
  const [domicilioPropiedad, setDomicilioPropiedad] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoConsulta, setTipoConsulta] = useState('Quiero Alquilar');
  const [error, setError] = useState<{ nombre: string; email: string }>({
    nombre: '',
    email: ''
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const notify = (string: string) =>
    toast(string, { theme: 'dark', hideProgressBar: true });

  const isDisabled =
    nombre === '' || email === '' || !/^\S+@\S+\.\S+$/.test(email);

  const submitForm = async () => {
    setError({ nombre: '', email: '' });
    if (nombre === '') {
      setError((prev) => ({ ...prev, nombre: 'El nombre es obligatorio' }));
      return;
    }
    if (email === '' || !/^\S+@\S+\.\S+$/.test(email)) {
      setError((prev) => ({
        ...prev,
        email: 'El email ingresado no es válido'
      }));
      return;
    }
    if (isDisabled) return;
    try {
      setLoading(true);

      await axios.post('/api/contactForm', {
        nombre,
        email,
        telefono,
        tipoPropiedad,
        domicilioPropiedad,
        mensaje,
        tipoConsulta
      });
      notify('Su consulta fue enviada!');
      router.push('/');
    } catch (error) {
      notify('Hubo un error y estamos trabajando para resolverlo');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const ErrorSpan = ({ text }: { text: string }) => {
    return (
      <Text as='span' fontWeight={500} fontSize={10} color='#E53E3E'>
        {text}
      </Text>
    );
  };

  return (
    <Flex direction={['column', 'row']} p={8}>
      <Box
        flex='1'
        p={5}
        backgroundSize='cover'
        backgroundImage="url('/house-render.jpg')"
      >
        <Box bg='rgba(250,250,250, 0.65)' p='12px'>
          <Text fontSize='2xl' fontWeight='bold'>
            ¿NOS COMUNICAMOS?
          </Text>
          <Text gap='6px' alignItems='center' as={Flex}>
            <FiPhone /> +54 9 3515 77-7777
          </Text>
          <Text gap='6px' alignItems='center' as={Flex}>
            <FiMail /> info@inmobiliaria.com.ar
          </Text>
        </Box>
      </Box>
      <Box flex='2' p={5} pb={0}>
        <Text fontSize='2xl' fontWeight='bold'>
          ¿NECESITA ASESORAMIENTO?
        </Text>
        <Stack spacing={4} mt={4}>
          <Flex flexDirection={['column', 'column', 'row']} gap={4}>
            <FormControl isRequired>
              <FormLabel>Nombre y apellido</FormLabel>
              <Input
                placeholder='Nombre y apellido'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              {error?.nombre && <ErrorSpan text={error.nombre} />}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Dirección de correo electrónico</FormLabel>
              <Input
                type='email'
                placeholder='Correo electrónico'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error?.email && <ErrorSpan text={error.email} />}
            </FormControl>
          </Flex>
          <Flex flexDirection={['column', 'column', 'row']} gap={4}>
            <FormControl>
              <FormLabel>Teléfono</FormLabel>
              <Input
                placeholder='Teléfono'
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Tipo de propiedad</FormLabel>
              <Input
                placeholder='Tipo de propiedad'
                value={tipoPropiedad}
                onChange={(e) => setTipoPropiedad(e.target.value)}
              />
            </FormControl>
          </Flex>
          <FormControl>
            <FormLabel>Domicilio de la propiedad</FormLabel>
            <Input
              placeholder='Domicilio de la propiedad'
              value={domicilioPropiedad}
              onChange={(e) => setDomicilioPropiedad(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Mensaje</FormLabel>
            <Textarea
              placeholder='Mensaje'
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
          </FormControl>
          <RadioGroup
            defaultValue='Quiero Alquilar'
            value={tipoConsulta}
            onChange={setTipoConsulta}
          >
            <Stack spacing={5} direction={{ base: 'column', md: 'row' }}>
              <Radio value='Quiero Alquilar'>Quiero Alquilar</Radio>
              <Radio value='Quiero Comprar'>Quiero Comprar</Radio>
              <Radio value='Quiero Vender'>Quiero Vender</Radio>
              <Radio value='Permuta'>Quiero Permutar</Radio>
            </Stack>
          </RadioGroup>
          <Button
            bg='rgb(189, 2, 20)'
            color='white'
            disabled={loading}
            onClick={submitForm}
            size='lg'
          >
            {loading ? <Spinner /> : 'ENVIAR CONSULTA'}
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default ContactForm;
