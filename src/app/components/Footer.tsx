'use client';
import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box
      className='footer'
      bg={useColorModeValue('white', 'white')}
      color={useColorModeValue('white', 'white')}
      py={10}
      boxShadow='xl'
      backgroundColor='rgb(181, 2, 2)'
    >
      <Container
        as={Stack}
        maxW={{ base: '90vw', md: 'calc(100vw - 10rem)' }}
        spacing={4}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={'space-between'}
          align={'center'}
        >
          <Text fontSize={'lg'} fontWeight={'bold'}>
            Inmobiliaria Santamarina & Asoc.
          </Text>
          <Stack direction={'row'} spacing={6}>
            <Link href={'/'}>Inicio</Link>
            <Link href={'/contact'}>Contacto</Link>
          </Stack>
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={'space-between'}
          align={'center'}
        >
          <Text fontSize={'sm'}>
            Este footer hay que mejorarlo porque el diseño esta bastante fulero,
            pero no tanto como los alrededores de la casa de don bosco
          </Text>
          <Stack direction={'row'} spacing={1}>
            <IconButton
              as={Link}
              href={'#'}
              aria-label='Facebook'
              icon={<FaFacebook />}
              bg={useColorModeValue('rgb(181, 2, 2)', 'rgb(181, 2, 2)')}
              color={'white'}
              _hover={{
                bg: useColorModeValue(
                  'rgba(181, 2, 2, 0.9)',
                  'rgba(181, 2, 2, 0.9)'
                )
              }}
            />
            <IconButton
              as={Link}
              href={'#'}
              aria-label='Twitter'
              icon={<FaTwitter />}
              bg={useColorModeValue('rgb(181, 2, 2)', 'rgb(181, 2, 2)')}
              color={'white'}
              _hover={{
                bg: useColorModeValue(
                  'rgba(181, 2, 2, 0.9)',
                  'rgba(181, 2, 2, 0.9)'
                )
              }}
            />
            <IconButton
              as={Link}
              href={'#'}
              aria-label='LinkedIn'
              icon={<FaLinkedin />}
              bg={useColorModeValue('rgb(181, 2, 2)', 'rgb(181, 2, 2)')}
              color={'white'}
              _hover={{
                bg: useColorModeValue(
                  'rgba(181, 2, 2, 0.9)',
                  'rgba(181, 2, 2, 0.9)'
                )
              }}
            />
            <IconButton
              as={Link}
              href={'#'}
              aria-label='Instagram'
              icon={<FaInstagram />}
              bg={useColorModeValue('rgb(181, 2, 2)', 'rgb(181, 2, 2)')}
              color={'white'}
              _hover={{
                bg: useColorModeValue(
                  'rgba(181, 2, 2, 0.9)',
                  'rgba(181, 2, 2, 0.9)'
                )
              }}
            />
          </Stack>
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={'space-between'}
          align={'center'}
        >
          <Text fontSize='12px'>
            Desarrollado por{' '}
            <Link
              href='https://www.linkedin.com/in/matiasjuncos/'
              target='_blank'
              style={{ textDecoration: 'underline' }}
            >
              Matías Juncos
            </Link>
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
