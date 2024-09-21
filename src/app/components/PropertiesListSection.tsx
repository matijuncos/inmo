import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { getAllProperties } from '@/lib/getAllProperties';
import { Property } from '@/lib/types/types';
import AnimatedPropertyCard from './AnimatedPropertyCard';

export default async function PropertiesListSection() {
  const properties: Property[] | undefined = await getAllProperties();
  return (
    <Box
      py='0'
      position='relative'
      overflow='hidden'
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "url('/house-render.jpg')",
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        filter: 'grayscale(100%) brightness(1.2) contrast(1) blur(2px)',
        zIndex: -1
      }}
    >
      <Box position='relative' zIndex={1}>
        <Text
          as='h2'
          fontSize='34px'
          fontWeight='600'
          textAlign='center'
          color='white'
          backgroundColor='rgba(0,0,0,0.6)'
          p='16px'
        >
          Conocé nuestras propiedades
        </Text>
        <Box
          py='2rem'
          display='grid'
          gridTemplateColumns={{
            base: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)'
          }}
          gap='18px'
          px={{ base: '5vw', md: '10vw' }}
          margin='auto'
        >
          {properties?.map((item, idx) => (
            <AnimatedPropertyCard key={idx} property={item} index={idx} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
