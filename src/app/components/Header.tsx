'use client';
import { Box, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaList, FaSignOutAlt } from 'react-icons/fa';
import { FaBlog } from 'react-icons/fa6';
import { FaHome, FaHeart, FaPhone } from 'react-icons/fa';
import axios from 'axios';
const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLogged, setIsLogged] = useState(false);

  const signOut = async () => {
    await axios.post('/api/logout');
    localStorage.removeItem('token');
    setIsLogged(false);
    router.push('/');
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogged(!!token);
  }, []);

  const pathsToExcludeSignOut = [
    // '/',
    // '/home',
    // '/contact',
    // '/about',
    '/login',
    '/register',
    '/pass-recover'
  ];
  const admindLinks = ['/admin', '/create-propery', '/admin/edit'];
  const isPathAdminLink = (path: string) =>
    admindLinks.some((adminPath) => path.startsWith(adminPath));
  return (
    <Flex
      as='header'
      width='100%'
      padding='16px'
      justifyContent='space-between'
    >
      <Flex alignItems='center' justifyContent='space-between' w='100%'>
        <Flex alignItems='center' gap='18px'>
          <Box
            border='5px solid whitesmoke'
            borderRadius='100%'
            padding='8px 8px'
            display='grid'
            width='60px'
            height='60px'
            placeItems='center'
          >
            <FaBlog color='whitesmoke' size='20px' />
          </Box>
          <Text fontSize={24} fontWeight={700} color='whitesmoke'>
            Real State H
          </Text>
        </Flex>
        <Flex as='nav' color='whitesmoke' gap='24px' mr='12px'>
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
      {!pathsToExcludeSignOut.includes(pathname) && isLogged && (
        <Flex
          mx='12px'
          cursor='pointer'
          alignItems='center'
          gap='6px'
          onClick={signOut}
          minWidth='fit-content'
          color='whitesmoke'
        >
          <FaSignOutAlt />
          <Text fontWeight={600}>Cerrar Sesión</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
