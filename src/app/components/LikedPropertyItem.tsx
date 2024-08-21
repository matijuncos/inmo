'use client';
import { Property } from '@/lib/types/types';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const LikedPropertyItem = ({ item }: { item: Property }) => {
  const router = useRouter();
  return (
    <Flex
      width='100%'
      height='85px'
      my='6px'
      border='solid grey 1px'
      borderRadius='3px'
      transition='all ease 0.2s'
      cursor='pointer'
      _hover={{
        transform: 'scale(1.02)'
      }}
      onClick={() => router.push(`/property/${item._id}`)}
    >
      <Box
        backgroundImage={`url(${item.images?.[0]})`}
        width='80px'
        backgroundPosition='center'
        height='100%'
        backgroundSize='cover'
      />
      <Box padding='3px'>
        <Text fontSize='14px' fontWeight={600}>
          {item.title}
        </Text>
        <Text fontSize='12px'>U$D{item.price}</Text>
        <Text fontSize='12px'>Habitaciones: {item.rooms}</Text>
      </Box>
    </Flex>
  );
};

export default LikedPropertyItem;
