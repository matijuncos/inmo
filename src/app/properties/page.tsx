import { Box, Flex, Text } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { getAllProperties } from '@/lib/getAllProperties';
import { Property } from '@/lib/types/types';
import AnimatedPropertyCard from '../components/AnimatedPropertyCard';

export default async function PropertiesPage() {
  const properties: Property[] | undefined = await getAllProperties();
  return (
    <Suspense fallback='Cargando...'>
      <Box width={{ base: '95%', md: '80%' }} pt='1rem' m='auto'>
        <Text as='h2' fontWeight='700' fontSize={24}>
          Conocé nuestras propiedades.
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
          margin='auto'
        >
          {properties?.map((item, idx) => {
            return (
              <AnimatedPropertyCard key={idx} property={item} index={idx} />
            );
          })}
        </Box>
      </Box>
    </Suspense>
  );
}
