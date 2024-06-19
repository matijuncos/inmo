'use client';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import { FaCircle, FaSignOutAlt } from 'react-icons/fa';
import { FaBlog, FaCircleUser } from 'react-icons/fa6';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const signOut = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <Flex width='100%' padding='16px' justifyContent='space-between'>
      <Box
        border='5px solid green'
        borderRadius='100%'
        padding='12px'
        display='grid'
        placeItems='center'
      >
        <FaBlog color='green' size='32px' />
      </Box>
      {pathname !== '/' && (
        <Flex
          mr='14px'
          cursor='pointer'
          alignItems='center'
          gap='6px'
          onClick={signOut}
        >
          <FaSignOutAlt />
          <Text>Cerrar Sesión</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
