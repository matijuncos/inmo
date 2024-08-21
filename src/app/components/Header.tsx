'use client';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  MenuIcon,
  Text
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { FaHamburger, FaList, FaSignOutAlt } from 'react-icons/fa';
import { FaHome, FaHeart, FaPhone } from 'react-icons/fa';
import axios from 'axios';
import { useInmoCtx } from '../context/InmoContext';
import { BiMenu } from 'react-icons/bi';
const Header = ({ className }: { className: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser } = useInmoCtx();
  const signOut = async () => {
    await axios.post('/api/logout');
    setUser(null);
    router.push('/');
  };

  const pathsToExcludeSignOut = ['/login', '/register', '/pass-recover'];
  const admindLinks = ['/admin', '/create-propery', '/admin/edit'];
  const isPathAdminLink = (path: string) =>
    user?.admin && admindLinks.some((adminPath) => path.startsWith(adminPath));
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  if (className === 'desktop-header')
    return (
      <Flex
        as='header'
        width='100%'
        padding='8px'
        boxShadow='xl'
        justifyContent='space-between'
        className={className}
      >
        <Flex alignItems='center' justifyContent='space-between' w='100%'>
          <Flex
            alignItems='center'
            gap='18px'
            overflow='hidden'
            cursor='pointer'
            onClick={() => router.push('/')}
          >
            <Box
              borderRadius='100%'
              display='grid'
              width='60px'
              height='60px'
              placeItems='center'
            >
              <Image
                src='/santamarina.jpeg'
                objectFit='cover'
                width='100%'
                alt='logo - santamarina inmuebles'
                height='100%'
              />
            </Box>
            <Text
              fontSize={20}
              fontWeight={700}
              color='#B50202'
              className='navbar-brand-name'
            >
              Inmobiliaria Santamarina & Asoc.
            </Text>
          </Flex>
          <Flex as='nav' color='#B50202' gap='24px' mr='12px'>
            <Link
              style={{
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                textDecoration: pathname === '/' ? 'underline' : 'none',
                textDecorationThickness: '2px',
                textUnderlineOffset: '3px'
              }}
              href='/'
            >
              <FaHome style={{ marginRight: '8px' }} />
              Inicio
            </Link>
            <Link
              style={{
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                textDecoration: pathname === '/match' ? 'underline' : 'none',
                textDecorationThickness: '2px',
                textUnderlineOffset: '3px'
              }}
              href='/match'
            >
              <FaHeart style={{ marginRight: '8px' }} />
              Match!
            </Link>
            <Link
              style={{
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                textDecoration: pathname === '/contact' ? 'underline' : 'none',
                textDecorationThickness: '2px',
                textUnderlineOffset: '3px'
              }}
              href='/contact'
            >
              <FaPhone style={{ marginRight: '8px' }} />
              Contacto
            </Link>
            {isPathAdminLink('/admin') && (
              <Link
                style={{
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: pathname === '/admin' ? 'underline' : 'none',
                  textDecorationThickness: '2px',
                  textUnderlineOffset: '3px'
                }}
                href='/admin'
              >
                <FaList style={{ marginRight: '8px' }} />
                Admin
              </Link>
            )}
          </Flex>
        </Flex>
        {!pathsToExcludeSignOut.includes(pathname) && user && (
          <Flex
            mx='12px'
            cursor='pointer'
            alignItems='center'
            gap='6px'
            onClick={signOut}
            minWidth='fit-content'
            color='#B50202'
          >
            <FaSignOutAlt />
            <Text fontWeight={600}>Cerrar Sesión</Text>
          </Flex>
        )}
      </Flex>
    );
  return (
    <Flex
      as='header'
      width='100%'
      padding='8px'
      boxShadow='xl'
      alignItems='center'
      justifyContent='space-between'
      className={className}
    >
      <Box
        borderRadius='100%'
        display='grid'
        width='30px'
        height='30px'
        placeItems='center'
      >
        <Image
          src='/santamarina.jpeg'
          objectFit='cover'
          width='100%'
          alt='logo - santamarina inmuebles'
          height='100%'
        />
      </Box>

      <Drawer isOpen={isDrawerOpen} placement='left' onClose={toggleDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex gap='12px'>
              <Box
                borderRadius='100%'
                display='grid'
                width='30px'
                height='30px'
                placeItems='center'
              >
                <Image
                  src='/santamarina.jpeg'
                  objectFit='cover'
                  width='100%'
                  alt='logo - santamarina inmuebles'
                  height='100%'
                />
              </Box>
              <Text color='#B50202' fontSize='12px'>
                Inmobiliaria Santamarina <br />& Asoc.
              </Text>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Flex direction='column' height='100%' gap='24px'>
              <Link href='/' onClick={toggleDrawer}>
                <Flex color='#B50202' alignItems='center' gap='2'>
                  <FaHome color='#B50202' />
                  Inicio
                </Flex>
              </Link>
              <Link href='/match' onClick={toggleDrawer}>
                <Flex color='#B50202' alignItems='center' gap='2'>
                  <FaHeart color='#B50202' />
                  Match!
                </Flex>
              </Link>
              <Link href='/contact' onClick={toggleDrawer}>
                <Flex color='#B50202' alignItems='center' gap='2'>
                  <FaPhone color='#B50202' />
                  Contacto
                </Flex>
              </Link>
              {isPathAdminLink('/admin') && (
                <Link href='/admin' onClick={toggleDrawer}>
                  <Flex color='#B50202' alignItems='center' gap='2'>
                    <FaList color='#B50202' />
                    Admin
                  </Flex>
                </Link>
              )}
              {!pathsToExcludeSignOut.includes(pathname) && user && (
                <Flex
                  alignItems='center'
                  mt='auto'
                  mb='8px'
                  gap='6px'
                  onClick={() => {
                    signOut();
                    toggleDrawer();
                  }}
                  minWidth='fit-content'
                >
                  <FaSignOutAlt color='#B50202' />
                  <Text fontWeight={600} color='#B50202'>
                    Cerrar Sesión
                  </Text>
                </Flex>
              )}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <IconButton
        aria-label='Open Menu'
        backgroundColor='transparent'
        icon={<BiMenu color='#B50202' size={28} />}
        display={{ base: 'flex', md: 'none' }} // Adjust breakpoints as needed
        onClick={toggleDrawer}
      />
    </Flex>
  );
};

export default Header;
