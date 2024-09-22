'use client';

import { Property } from '@/lib/types/types';
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  VStack,
  Spinner,
  Text,
  FormErrorMessage
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { mailTemplateFour, mailTemplateThree } from '../match/utils';
import { toast } from 'react-toastify';

const SendEmailbtn = ({ property }: { property: Property }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [challenge, setChallenge] = useState({ num1: 0, num2: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    challenge: ''
  });
  const notify = (string: string) =>
    toast(string, { theme: 'dark', hideProgressBar: true });

  const generateChallenge = () => {
    setChallenge({
      num1: Math.floor(Math.random() * 10),
      num2: Math.floor(Math.random() * 10)
    });
    setUserAnswer('');
  };

  useEffect(() => {
    if (isOpen) generateChallenge();
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'challenge') {
      setUserAnswer(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const validateForm = () => {
    const newErrors = {
      name: formData.name ? '' : 'Nombre es requerido',
      email: formData.email ? '' : 'Email es requerido',
      phone: formData.phone ? '' : 'Teléfono es requerido',
      challenge:
        Number(userAnswer) === challenge.num1 + challenge.num2
          ? ''
          : 'Respuesta incorrecta'
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await axios.post('/api/emailSender', {
        name: formData?.name,
        email: formData?.email,
        message: mailTemplateThree(property.title, formData?.name || ''),
        message2: mailTemplateFour(
          property.title,
          formData?.name || '',
          formData?.phone,
          formData?.email
        )
      });
      notify('Tu solicitud fue exitosa!');
    } catch (error) {
      console.log(error);
      notify('Algo salió mal y estamos trabajando para corregirlo!');
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Coordinar una visita</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired isInvalid={!!errors.name}>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder='Tu nombre'
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder='tu@email.com'
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.phone}>
                  <FormLabel>Teléfono</FormLabel>
                  <Input
                    name='phone'
                    type='tel'
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder='Tu número de teléfono'
                  />
                  <FormErrorMessage>{errors.phone}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.challenge}>
                  <FormLabel>Pregunta de seguridad</FormLabel>
                  <Flex align='center'>
                    <Text mr={2}>
                      ¿Cuánto es {challenge.num1} + {challenge.num2}?
                    </Text>
                    <Input
                      name='challenge'
                      type='number'
                      value={userAnswer}
                      onChange={handleInputChange}
                      width='60px'
                    />
                  </Flex>
                  <FormErrorMessage>{errors.challenge}</FormErrorMessage>
                </FormControl>
              </VStack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={handleSubmit}
              disabled={loading || !userAnswer}
            >
              {loading ? <Spinner size='sm' /> : 'Enviar'}
            </Button>
            <Button
              variant='ghost'
              onClick={() => setIsOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex p='16px' w='100%' gap='18px' direction={['column', 'row']}>
        <Button
          bgGradient='linear(to-r, blue.400, purple.500)'
          color='white'
          onClick={() => setIsOpen(true)}
          type='button'
          fontWeight='bold'
          py='6'
          px='8'
          borderRadius='full'
          _hover={{
            bgGradient: 'linear(to-r, blue.500, red.600)',
            transform: 'translateY(-2px)',
            boxShadow: 'xl'
          }}
          _active={{
            transform: 'translateY(0)',
            boxShadow: 'md'
          }}
          transition='all 0.2s'
        >
          Contactate para coordinar una visita
        </Button>
      </Flex>
    </>
  );
};

export default SendEmailbtn;
