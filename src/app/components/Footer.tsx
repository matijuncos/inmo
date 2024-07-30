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
      bg={useColorModeValue('gray.800', 'gray.900')}
      color={useColorModeValue('gray.200', 'gray.200')}
      py={10}
    >
      <Container as={Stack} maxW='calc(100vw - 10rem)' spacing={4}>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={'space-between'}
          align={'center'}
        >
          <Text fontSize={'lg'} fontWeight={'bold'}>
            Real Estate Company
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam.
          </Text>
          <Stack direction={'row'} spacing={6}>
            <IconButton
              as={Link}
              href={'#'}
              aria-label='Facebook'
              icon={<FaFacebook />}
              bg={useColorModeValue('gray.700', 'gray.600')}
              color={'white'}
              _hover={{ bg: useColorModeValue('gray.600', 'gray.500') }}
            />
            <IconButton
              as={Link}
              href={'#'}
              aria-label='Twitter'
              icon={<FaTwitter />}
              bg={useColorModeValue('gray.700', 'gray.600')}
              color={'white'}
              _hover={{ bg: useColorModeValue('gray.600', 'gray.500') }}
            />
            <IconButton
              as={Link}
              href={'#'}
              aria-label='LinkedIn'
              icon={<FaLinkedin />}
              bg={useColorModeValue('gray.700', 'gray.600')}
              color={'white'}
              _hover={{ bg: useColorModeValue('gray.600', 'gray.500') }}
            />
            <IconButton
              as={Link}
              href={'#'}
              aria-label='Instagram'
              icon={<FaInstagram />}
              bg={useColorModeValue('gray.700', 'gray.600')}
              color={'white'}
              _hover={{ bg: useColorModeValue('gray.600', 'gray.500') }}
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
              href={'https://www.linkedin.com/in/matiasjuncos/'}
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
