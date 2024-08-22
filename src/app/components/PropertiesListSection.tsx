import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { getAllProperties } from '@/lib/getAllProperties';
import { Property } from '@/lib/types/types';
import AnimatedPropertyCard from './AnimatedPropertyCard';

export default async function PropertiesListSection() {
  const properties: Property[] | undefined = await getAllProperties();
  return (
    <Box py='3em'>
      <Text as='h2' fontSize='34px' fontWeight='600' textAlign='center'>
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
  );
}
