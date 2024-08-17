'use client';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import { FaList, FaSignOutAlt } from 'react-icons/fa';
import { FaBlog } from 'react-icons/fa6';
import { FaHome, FaHeart, FaPhone } from 'react-icons/fa';
import axios from 'axios';
import { useInmoCtx } from '../context/InmoContext';
const Header = () => {
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
  return (
    <Flex
      as='header'
      width='100%'
      padding='8px'
      boxShadow='xl'
      justifyContent='space-between'
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
              src='santamarina.jpeg'
              objectFit='cover'
              width='100%'
              alt='logo - santamarina inmuebles'
              height='100%'
            />
          </Box>
          <Text fontSize={20} fontWeight={700} color='#B50202'>
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
};

export default Header;
